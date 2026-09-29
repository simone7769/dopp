/* ============================================================
   NAV.JS — Script unificato per tutte le pagine
   Contiene: nav, megamenu, drawer, caroselli, ricerca, menu mobile,
   carrello, cuori, video. I moduli si attivano solo se gli elementi
   esistono nella pagina (guard-rail).
   ============================================================ */

/* ---------- EVITA IL RITORNO IN CIMA AL CLICK SU href="#" ---------- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href="#"]');
  if (link) e.preventDefault();
});

/* ============================================================
   GESTORE CENTRALE DEI PANNELLI
   ============================================================ */
const PanelManager = (function () {
  const panels = [];
  function register(closeFn) {
    panels.push(closeFn);
    return function closeOthers() {
      panels.forEach((fn) => { if (fn !== closeFn) fn(); });
    };
  }
  return { register };
})();

/* ============================================================
   DURATE DELLE TRANSIZIONI
   ============================================================ */
function cssDurationMs(name, fallbackMs) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const num = parseFloat(v);
  if (isNaN(num)) return fallbackMs;
  return v.endsWith('ms') ? num : num * 1000;
}



/* ============================================================
   MEGA-MENU DELLA NAV
   ============================================================ */
const header = document.getElementById('header');

const headerHolds = new Set();
function releaseHeaderIfFree() {
  if (!header || headerHolds.size > 0) return;
  header.classList.remove('menu-open');
  header.classList.toggle('scrolled', window.scrollY > 120);
}

const MEGA_MENUS = [
  { link: 'linkAbbigliamento', panel: 'megaAbbigliamento' },
  { link: 'linkAccessori',     panel: 'megaAccessori' },
  { link: 'linkOutlet',        panel: 'megaOutlet' }
].map((m) => ({
  link: document.getElementById(m.link),
  panel: document.getElementById(m.panel)
})).filter((m) => m.link && m.panel);

const HOVER_ONLY_LINKS = [
  '.nav-center a[href="#"]',
  '.nav-left .nav-icon-link',
  '.nav-right .nav-icon-link',
  '.header-actions .nav-icon-link'
].flatMap(sel => Array.from(document.querySelectorAll(sel)))
 .filter(a => !MEGA_MENUS.some(m => m.link === a));

if (header && (MEGA_MENUS.length || HOVER_ONLY_LINKS.length)) {

  let hideTimer;
  let current = null;
  const CLOSE_DELAY = 120;
  const TOLERANCE = 12;
  const TAP_ECHO_WINDOW = 500;

  function isSearchOpen() {
    const s = document.getElementById('searchDrawer');
    return !!(s && s.classList.contains('open'));
  }

  function accendi(m) {
    m.panel.classList.add('open');
    m.link.classList.add('active');
    m.link.setAttribute('aria-expanded', 'true');
  }

  function spegni(m) {
    m.panel.classList.remove('open');
    m.link.classList.remove('active');
    m.link.setAttribute('aria-expanded', 'false');
  }

  function apriMenu(m) {
    clearTimeout(hideTimer);
    if (current === m) return;
    if (isSearchOpen()) return;
    if (current) spegni(current);
    current = m;
    accendi(m);
    header.classList.add('menu-open');
  }

  function chiudiPannelloMaTieniHeader() {
    clearTimeout(hideTimer);
    if (current) spegni(current);
    current = null;
  }

  function chiudiTuttoOra() {
    clearTimeout(hideTimer);
    if (current) spegni(current);
    current = null;
    if (!isSearchOpen() && headerHolds.size === 0) {
      header.classList.remove('menu-open');
      header.classList.toggle('scrolled', window.scrollY > 120);
    }
  }

  const closeOtherPanels = PanelManager.register(chiudiTuttoOra);

  function puntatoreDentroAreeSicure(x, y) {
    if (current) {
      const r1 = current.link.getBoundingClientRect();
      const r2 = current.panel.getBoundingClientRect();
      const dentroLink = x >= r1.left - TOLERANCE && x <= r1.right + TOLERANCE &&
                         y >= r1.top - TOLERANCE && y <= r1.bottom + TOLERANCE;
      const dentroMega = x >= r2.left && x <= r2.right &&
                         y >= r2.top - TOLERANCE && y <= r2.bottom + TOLERANCE;
      if (dentroLink || dentroMega) return true;
    }
    for (const a of HOVER_ONLY_LINKS) {
      const r = a.getBoundingClientRect();
      if (x >= r.left - TOLERANCE && x <= r.right + TOLERANCE &&
          y >= r.top - TOLERANCE && y <= r.bottom + TOLERANCE) return true;
    }
    const navAreas = [
      document.querySelector('.nav-left'),
      document.querySelector('.nav-center'),
      document.querySelector('.nav-right')
    ].filter(Boolean);
    for (const area of navAreas) {
      const r = area.getBoundingClientRect();
      const t = 24;
      if (x >= r.left - t && x <= r.right + t &&
          y >= r.top - t && y <= r.bottom + t) return true;
    }
    return false;
  }

  function programmaChiusura() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!puntatoreDentroAreeSicure(mouseX, mouseY)) chiudiTuttoOra();
    }, CLOSE_DELAY);
  }

  let mouseX = -1, mouseY = -1;

  document.addEventListener('mousemove', (e) => {
    if (isSearchOpen()) return;
    if (document.body.style.overflow === 'hidden') return;

    mouseX = e.clientX;
    mouseY = e.clientY;

    const hover = MEGA_MENUS.find((m) => {
      const r = m.link.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right &&
             e.clientY >= r.top && e.clientY <= r.bottom;
    });
    if (hover) {
      if (hover !== current) apriMenu(hover);
      else clearTimeout(hideTimer);
      return;
    }

    const hoverOnly = HOVER_ONLY_LINKS.some((a) => {
      const r = a.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right &&
             e.clientY >= r.top && e.clientY <= r.bottom;
    });
    if (hoverOnly) {
      chiudiPannelloMaTieniHeader();
      header.classList.add('menu-open');
      return;
    }

    if (puntatoreDentroAreeSicure(e.clientX, e.clientY)) {
      clearTimeout(hideTimer);
      return;
    }

    if (!current && !header.classList.contains('menu-open')) return;
    programmaChiusura();
  }, { passive: true });

  MEGA_MENUS.forEach((m) => {

    let lastPointerDownWasTouch = 0;

    m.link.addEventListener('click', (e) => {
      if (Date.now() - lastPointerDownWasTouch < TAP_ECHO_WINDOW) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      clearTimeout(hideTimer);
      if (current === m) chiudiTuttoOra();
      else apriMenu(m);
    });

    m.link.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        lastPointerDownWasTouch = Date.now();
        e.preventDefault();
        clearTimeout(hideTimer);
        if (current === m) chiudiTuttoOra();
        else apriMenu(m);
      }
    }, { passive: false });

    m.link.addEventListener('focus', () => {
      if (m.link.matches(':focus-visible')) apriMenu(m);
    });

  });

  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) chiudiTuttoOra();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') chiudiTuttoOra();
  });

  header.classList.toggle('scrolled', window.scrollY > 120);

  window.addEventListener('scroll', () => {
    if (current || header.classList.contains('menu-open')) return;
    if (window.scrollY > 120) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

/* ============================================================
   CAROSELLO TOPBAR
   ============================================================ */
const topbarMessages = document.querySelectorAll('.topbar-message');
if (topbarMessages.length) {
  let topbarIndex = 0;
  function mostraMessaggio(index) {
    topbarMessages.forEach((m, i) => m.classList.toggle('active', i === index));
    topbarIndex = index;
  }
  function messaggioAvanti() {
    mostraMessaggio((topbarIndex + 1) % topbarMessages.length);
  }
  mostraMessaggio(0);
  setInterval(messaggioAvanti, 6000);
}

/* ============================================================
   MENU MOBILE
   ============================================================ */
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

if (navBurger && mobileMenu) {
  function closeMobileMenu() { setMobileMenu(false); }
  const closeOtherPanels = PanelManager.register(closeMobileMenu);

  let menuCloseTimer = null;

  function setMobileMenu(willOpen) {
    const wasOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', willOpen);
    navBurger.setAttribute('aria-expanded', String(willOpen));
    mobileMenu.setAttribute('aria-hidden', String(!willOpen));
    document.body.style.overflow = willOpen ? 'hidden' : '';

    if (header && willOpen !== wasOpen) {
      clearTimeout(menuCloseTimer);
      if (willOpen) {
        headerHolds.add('menu');
        header.classList.add('menu-open');
      } else {
        menuCloseTimer = setTimeout(() => {
          if (mobileMenu.classList.contains('open')) return;
          headerHolds.delete('menu');
          releaseHeaderIfFree();
        }, cssDurationMs('--t-base', 400));
      }
    }
  }

  function toggleMobileMenu(force) {
    const willOpen = typeof force === 'boolean' ? force : !mobileMenu.classList.contains('open');
    if (willOpen) closeOtherPanels();
    setMobileMenu(willOpen);
  }

  navBurger.addEventListener('click', () => toggleMobileMenu());

  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => toggleMobileMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMobileMenu(false);
  });
}

/* ============================================================
   MENU MOBILE — Accordion sottomenu
   ============================================================ */
(function () {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;

  const toggles = mobileMenu.querySelectorAll('.mobile-sub-toggle');

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      toggles.forEach((other) => {
        if (other !== btn) other.setAttribute('aria-expanded', 'false');
      });
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  const observer = new MutationObserver(() => {
    const isMenuOpen = mobileMenu.classList.contains('open');
    if (!isMenuOpen) {
      toggles.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
    }
  });
  observer.observe(mobileMenu, { attributes: true, attributeFilter: ['class'] });
})();

/* ============================================================
   SEARCH DRAWER
   ============================================================ */
(function () {
  const drawer = document.getElementById('searchDrawer');
  const overlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('closeSearchDrawer');
  const searchInput = document.getElementById('searchInput');
  const searchIcons = document.querySelectorAll('a[aria-label="Cerca"]');

  const resultsBox = document.getElementById('searchResults');
  const resultsCount = document.getElementById('searchResultsCount');
  const resultsGrid = document.getElementById('searchResultsGrid');
  const resultsEmpty = document.getElementById('searchResultsEmpty');

  if (!drawer || !overlay) return;

  const closeOtherPanels = PanelManager.register(closeSearch);

  function openSearch(e) {
    if (e) e.preventDefault();
    closeOtherPanels();
    drawer.classList.add('open');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (searchInput) setTimeout(() => searchInput.focus(), 200);
  }

  function closeSearch() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (resultsBox) resultsBox.hidden = true;
  }

  searchIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      if (drawer.classList.contains('open')) closeSearch();
      else openSearch();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeSearch();
  });

  function normalizza(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  function formattaPrezzo(n) {
    return '€ ' + Number(n).toFixed(2).replace('.', ',');
  }

  function renderRisultati(query) {
    const q = normalizza(query);

    if (!q) {
      if (resultsBox) resultsBox.hidden = true;
      return;
    }

    const lista = window.PRODOTTI || [];
    const items = lista.filter((p) => {
      return normalizza([p.nome, p.categoria, p.sub].join(' ')).indexOf(q) !== -1;
    });

    if (resultsCount) {
      resultsCount.textContent = items.length + ' risultat' + (items.length === 1 ? 'o' : 'i') + ' per "' + query + '"';
    }

    if (resultsGrid) resultsGrid.textContent = '';

    if (!items.length) {
      if (resultsEmpty) resultsEmpty.hidden = false;
      if (resultsBox) resultsBox.hidden = false;
      return;
    }
    if (resultsEmpty) resultsEmpty.hidden = true;

    const frag = document.createDocumentFragment();
    items.forEach((p) => {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'search-result-card';
      a.innerHTML =
        '<div class="search-result-thumb"><img src="' + p.img + '" alt="' + p.nome + '" loading="lazy"></div>' +
        '<h6>' + p.nome + '</h6>' +
        '<p>' + formattaPrezzo(p.prezzo) + '</p>';
      frag.appendChild(a);
    });
    if (resultsGrid) resultsGrid.appendChild(frag);

    if (resultsBox) resultsBox.hidden = false;
  }

  let debounceTimer = null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        renderRisultati(searchInput.value);
      }, 120);
    });
  }
})();

/* ============================================================
   COUNTRY DRAWER
   ============================================================ */
(function () {
  const drawer = document.getElementById('countryDrawer');
  const overlay = document.getElementById('countryOverlay');
  const openBtns = [
    document.getElementById('openCountryDrawer'),
    document.getElementById('openCountryDrawerFooter')
  ].filter(Boolean);
  const closeBtn = document.getElementById('closeCountryDrawer');
  const confirmBtn = document.getElementById('confirmCountry');
  const countrySelect = document.getElementById('countrySelect');
  const languageSelect = document.getElementById('languageSelect');
  const countryLabel = document.getElementById('countryLabel');

  if (!drawer) return;

  const closeOtherPanels = PanelManager.register(closeDrawer);

  function openDrawer(e) {
    if (e) e.preventDefault();
    closeOtherPanels();
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  if (countrySelect && languageSelect) {
    countrySelect.addEventListener('change', () => {
      const selected = countrySelect.options[countrySelect.selectedIndex];
      const lang = selected.getAttribute('data-lang');
      if (lang) {
        for (let i = 0; i < languageSelect.options.length; i++) {
          if (languageSelect.options[i].value === lang) {
            languageSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const country = countrySelect ? countrySelect.value : '';
      const language = languageSelect ? languageSelect.value : '';
      if (countryLabel) countryLabel.textContent = `${country} (${language})`;
      closeDrawer();
    });
  }
})();

/* ============================================================
   CONTATORE CARRELLO (con persistenza in sessionStorage)
   ============================================================ */
window.CartCounter = (function () {
  const STORAGE_KEY = 'dg_cart_count';
  const cartCountEl = document.getElementById('cartCount');
  const badges = document.querySelectorAll('.cart-badge');
  const cartDrawerEl = document.getElementById('cartDrawer');

  function totalFromDrawer() {
    if (!cartDrawerEl) return null;
    const righe = cartDrawerEl.querySelectorAll('.cart-item');
    if (!righe.length) return 0;
    let sum = 0;
    righe.forEach((riga) => {
      const q = riga.querySelector('.qty-value');
      sum += parseInt(q ? q.textContent : '1', 10) || 0;
    });
    return sum;
  }

  let total = parseInt(sessionStorage.getItem(STORAGE_KEY), 10);
  if (isNaN(total)) {
    const daDrawer = totalFromDrawer();
    total = daDrawer !== null ? daDrawer : parseInt(cartCountEl ? cartCountEl.textContent : '0', 10) || 0;
  }

  function render() {
    if (cartCountEl) cartCountEl.textContent = total;
    badges.forEach((b) => {
      b.textContent = total;
      b.hidden = total === 0;
      b.classList.add('bump');
      setTimeout(() => b.classList.remove('bump'), cssDurationMs('--t-fast', 250));
    });
  }

  function salva() {
    try { sessionStorage.setItem(STORAGE_KEY, String(total)); } catch (e) {}
  }

  function set(n) {
    total = Math.max(0, n);
    salva();
    render();
  }

  render();

  return {
    add(n) { set(total + n); },
    recalcFromDrawer() {
      const t = totalFromDrawer();
      if (t === null) return;
      /* Non azzera mai verso il basso gli "aggiunti" con +:
         tiene il massimo tra contatore corrente e somma drawer. */
      if (t > total) set(t);
    }
  };
})();

/* ============================================================
   CART DRAWER
   ============================================================ */
(function () {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const closeBtn = document.getElementById('closeCartDrawer');
  const openBtns = document.querySelectorAll('a[aria-label="Carrello"]');
  const totalEl = document.getElementById('cartTotal');

  if (!drawer) return;

  const closeOtherPanels = PanelManager.register(closeCart);

  function aggiornaTotale() {
    if (!totalEl) return;
    const righe = drawer.querySelectorAll('.cart-item');
    let somma = 0;
    righe.forEach((riga) => {
      const prezzoEl = riga.querySelector('.cart-item-price');
      const qtyEl = riga.querySelector('.qty-value');
      if (!prezzoEl) return;
      const prezzo = parseFloat(
        prezzoEl.textContent.replace('€', '').replace('.', '').replace(',', '.').trim()
      ) || 0;
      const qty = parseInt(qtyEl ? qtyEl.textContent : '1', 10) || 1;
      somma += prezzo * qty;
    });
    totalEl.textContent = '€ ' + somma.toFixed(2).replace('.', ',');
  }

  function openCart(e) {
    if (e) e.preventDefault();
    closeOtherPanels();
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    aggiornaTotale();
  }

  function closeCart() {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openCart));
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart();
  });

  /* --- Quantità +/− su ogni riga --- */
  drawer.querySelectorAll('.cart-qty').forEach((qtyBox) => {
    const valueEl = qtyBox.querySelector('.qty-value');
    if (!valueEl) return;
    qtyBox.querySelectorAll('.qty-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        let val = parseInt(valueEl.textContent, 10) || 1;
        if (btn.dataset.action === 'plus') val++;
        else if (btn.dataset.action === 'minus' && val > 1) val--;
        valueEl.textContent = val;
        aggiornaTotale();
        if (window.CartCounter) window.CartCounter.recalcFromDrawer();
      });
    });
  });

  /* --- Rimuovi riga --- */
  drawer.querySelectorAll('.cart-item-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const riga = btn.closest('.cart-item');
      if (!riga) return;
      riga.remove();
      aggiornaTotale();
      if (window.CartCounter) window.CartCounter.recalcFromDrawer();
      const rimaste = drawer.querySelectorAll('.cart-item').length;
      if (rimaste === 0) {
        const body = drawer.querySelector('.cart-body');
        if (body && !body.querySelector('.cart-empty')) {
          const p = document.createElement('p');
          p.className = 'cart-empty';
          p.textContent = 'Il carrello è vuoto.';
          body.appendChild(p);
        }
        if (totalEl) totalEl.textContent = '€ 0,00';
      }
    });
  });

  aggiornaTotale();
})();

/* ============================================================
   LOGIN DRAWER
   ============================================================ */
(function () {
  const drawer = document.getElementById('loginDrawer');
  const overlay = document.getElementById('loginOverlay');
  const closeBtn = document.getElementById('closeLoginDrawer');
  const togglePwd = document.getElementById('togglePassword');
  const pwdInput = document.getElementById('loginPassword');
  const openBtns = document.querySelectorAll('a[aria-label="Profilo"]');

  if (!drawer) return;

  const closeOtherPanels = PanelManager.register(closeLogin);

  function openLogin(e) {
    if (e) e.preventDefault();
    closeOtherPanels();
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLogin() {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openLogin));
  if (closeBtn) closeBtn.addEventListener('click', closeLogin);
  if (overlay) overlay.addEventListener('click', closeLogin);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeLogin();
  });

  if (togglePwd && pwdInput) {
    togglePwd.addEventListener('click', () => {
      const isPwd = pwdInput.type === 'password';
      pwdInput.type = isPwd ? 'text' : 'password';
      togglePwd.setAttribute('aria-label', isPwd ? 'Nascondi password' : 'Mostra password');
    });
  }
})();

/* ============================================================
   WISHLIST DRAWER
   ============================================================ */
(function () {
  const drawer = document.getElementById('wishlistDrawer');
  const overlay = document.getElementById('wishlistOverlay');
  const closeBtn = document.getElementById('closeWishlistDrawer');
  const openBtns = document.querySelectorAll('a[aria-label="Preferiti"]');
  const body = document.getElementById('wishlistBody');
  const emptyState = document.getElementById('wishlistEmpty');
  const countLabel = document.getElementById('wishlistCount');
  const badges = document.querySelectorAll('.wishlist-badge');

  if (!drawer) return;

  const closeOtherPanels = PanelManager.register(closeWishlist);

  function openWishlist(e) {
    if (e) e.preventDefault();
    closeOtherPanels();
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlist() {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openWishlist));
  if (closeBtn) closeBtn.addEventListener('click', closeWishlist);
  if (overlay) overlay.addEventListener('click', closeWishlist);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeWishlist();
  });

  function updateCount() {
    if (!body) return;
    const remaining = body.querySelectorAll('.wishlist-card').length;
    if (countLabel) countLabel.textContent = remaining;
    badges.forEach(b => {
      b.textContent = remaining;
      b.hidden = remaining === 0;
      b.classList.add('bump');
      setTimeout(() => b.classList.remove('bump'), cssDurationMs('--t-fast', 250));
    });
    body.hidden = remaining === 0;
    if (emptyState) emptyState.hidden = remaining !== 0;
  }

  if (body) {
    body.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.wishlist-remove');
      if (!removeBtn) return;
      const card = removeBtn.closest('.wishlist-card');
      if (!card) return;
      card.classList.add('removing');
      card.addEventListener('transitionend', () => {
        card.remove();
        updateCount();
      }, { once: true });
    });

    body.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.wishlist-add-cart');
      if (!addBtn) return;
      const originalText = addBtn.textContent;
      addBtn.classList.add('added');
      addBtn.textContent = 'Aggiunto ✓';
      addBtn.disabled = true;
      if (window.CartCounter) window.CartCounter.add(1);
      setTimeout(() => {
        addBtn.classList.remove('added');
        addBtn.textContent = originalText;
        addBtn.disabled = false;
      }, 1600);
    });

    updateCount();
  }
})();

/* ============================================================
   MUST HAVE: carosello infinito continuo
   ============================================================ */
(function () {
  const track = document.getElementById('mhTrack');
  if (!track) return;
  const prev = document.querySelector('.mh-prev');
  const next = document.querySelector('.mh-next');
  const section = document.querySelector('.must-have');
  if (!prev || !next) return;

  const originals = Array.from(track.querySelectorAll('.product'));
  if (!originals.length) return;

  function cardStep() {
    const card = track.querySelector('.product');
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function originalsWidth() {
    return cardStep() * originals.length;
  }

  originals.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('mh-clone');
    track.appendChild(clone);
  });
  originals.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('mh-clone');
    track.appendChild(clone);
  });

  let isJumping = false;

  function checkLoop() {
    if (isJumping) return;
    const ow = originalsWidth();
    if (track.scrollLeft >= ow) {
      isJumping = true;
      track.scrollLeft -= ow;
      requestAnimationFrame(() => { isJumping = false; });
    }
  }

  track.addEventListener('scroll', checkLoop, { passive: true });

  function scrollNext() {
    track.scrollBy({ left: cardStep() * 2, behavior: 'smooth' });
  }

  function scrollPrev() {
    const ow = originalsWidth();
    if (track.scrollLeft < ow * 0.5) {
      track.scrollLeft += ow;
    }
    track.scrollBy({ left: -cardStep() * 2, behavior: 'smooth' });
  }

  next.addEventListener('click', scrollNext);
  prev.addEventListener('click', scrollPrev);

  let down = false, moved = false, startX = 0, startLeft = 0;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true;
    moved = false;
    startX = e.clientX;
    startLeft = track.scrollLeft;
  });

  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 5) {
      moved = true;
      track.classList.add('dragging');
    }
    if (moved) track.scrollLeft = startLeft - dx;
  });

  function endDrag() {
    if (!down) return;
    down = false;
    track.classList.remove('dragging');
  }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  track.addEventListener('click', (e) => {
    if (moved) { e.preventDefault(); moved = false; }
  }, true);

  const EDGE_ZONE = 200;
  if (section) {
    section.addEventListener('mousemove', (e) => {
      const fromLeft = e.clientX;
      const fromRight = window.innerWidth - e.clientX;
      if (fromLeft < EDGE_ZONE) {
        prev.style.opacity = '1';
        prev.style.visibility = 'visible';
      } else {
        prev.style.opacity = '0';
        prev.style.visibility = 'hidden';
      }
      if (fromRight < EDGE_ZONE) {
        next.style.opacity = '1';
        next.style.visibility = 'visible';
      } else {
        next.style.opacity = '0';
        next.style.visibility = 'hidden';
      }
    });
    section.addEventListener('mouseleave', () => {
      prev.style.opacity = '0';
      prev.style.visibility = 'hidden';
      next.style.opacity = '0';
      next.style.visibility = 'hidden';
    });
  }
})();

/* ============================================================
   JOURNAL: fonte dati condivisa (articoli.js)
   ============================================================ */
function creaJournalCard(articolo, variante) {
  const a = document.createElement('a');
  a.href = articolo.href;
  a.setAttribute('draggable', 'false');
  if (variante === 'home') {
    a.className = 'w-item';
    a.innerHTML =
      '<div class="w-image"><img loading="lazy" src="' + articolo.img + '" alt="' + articolo.alt + '" draggable="false"></div>' +
      '<h3>' + articolo.title + '</h3>' +
      '<p class="w-desc">' + articolo.desc + '</p>';
  } else {
    a.className = 'journal-card';
    a.dataset.category = articolo.category;
    a.innerHTML =
      '<div class="journal-card-image"><img src="' + articolo.img + '" alt="' + articolo.alt + '"></div>' +
      '<h3>' + articolo.title + '</h3>' +
      '<p>' + articolo.desc + '</p>';
  }
  return a;
}

(function () {
  const track = document.getElementById('wTrack');
  const articoli = window.ARTICOLI_JOURNAL;
  if (!track || !articoli) return;
  const frag = document.createDocumentFragment();
  articoli.forEach((art) => frag.appendChild(creaJournalCard(art, 'home')));
  track.textContent = '';
  track.appendChild(frag);
})();

(function () {
  const grid = document.getElementById('journalGrid');
  const articoli = window.ARTICOLI_JOURNAL;
  if (!grid || !articoli) return;

  const filterLinks = document.querySelectorAll('.journal-filters a[data-filter]');

  function render(filtro) {
    grid.textContent = '';
    const items = filtro === 'all' ? articoli : articoli.filter((a) => a.category === filtro);
    if (!items.length) {
      const p = document.createElement('p');
      p.className = 'journal-empty';
      p.textContent = 'Nessun articolo in questa categoria per ora.';
      grid.appendChild(p);
      return;
    }
    const frag = document.createDocumentFragment();
    items.forEach((art) => frag.appendChild(creaJournalCard(art, 'grid')));
    grid.appendChild(frag);
  }

  filterLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      filterLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      render(link.dataset.filter);
    });
  });

  render('all');
})();

/* ============================================================
   JOURNAL: carosello semplice
   ============================================================ */
(function () {
  const track = document.getElementById('wTrack');
  if (!track) return;
  const prev = document.querySelector('.w-prev');
  const next = document.querySelector('.w-next');
  const section = document.querySelector('.world');
  if (!prev || !next) return;

  function cardStep() {
    const card = track.querySelector('.w-item');
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function scrollNext() {
    track.scrollBy({ left: cardStep() * 2, behavior: 'smooth' });
  }

  function scrollPrev() {
    track.scrollBy({ left: -cardStep() * 2, behavior: 'smooth' });
  }

  next.addEventListener('click', scrollNext);
  prev.addEventListener('click', scrollPrev);

  let down = false, moved = false, startX = 0, startLeft = 0;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true;
    moved = false;
    startX = e.clientX;
    startLeft = track.scrollLeft;
  });

  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 5) {
      moved = true;
      track.classList.add('dragging');
    }
    if (moved) track.scrollLeft = startLeft - dx;
  });

  function endDrag() {
    if (!down) return;
    down = false;
    track.classList.remove('dragging');
  }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  track.addEventListener('click', (e) => {
    if (moved) { e.preventDefault(); moved = false; }
  }, true);

  const EDGE_ZONE = 200;
  if (section) {
    section.addEventListener('mousemove', (e) => {
      const fromLeft = e.clientX;
      const fromRight = window.innerWidth - e.clientX;
      if (fromLeft < EDGE_ZONE) {
        prev.style.opacity = '1';
        prev.style.visibility = 'visible';
      } else {
        prev.style.opacity = '0';
        prev.style.visibility = 'hidden';
      }
      if (fromRight < EDGE_ZONE) {
        next.style.opacity = '1';
        next.style.visibility = 'visible';
      } else {
        next.style.opacity = '0';
        next.style.visibility = 'hidden';
      }
    });
    section.addEventListener('mouseleave', () => {
      prev.style.opacity = '0';
      prev.style.visibility = 'hidden';
      next.style.opacity = '0';
      next.style.visibility = 'hidden';
    });
  }
})();

/* ============================================================
   VIDEO SHOWCASE: dissolvenza all'ingresso
   ============================================================ */
(function () {
  const videoShowcase = document.querySelector('.video-showcase');
  if (!videoShowcase) return;
  const showcaseObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        videoShowcase.classList.add('in-view');
      }
    });
  }, { threshold: 0.4 });
  showcaseObserver.observe(videoShowcase);
})();

/* ============================================================
   REVEAL
   ============================================================ */
(function () {
  const targets = document.querySelectorAll('.collection, .duo, .reveal, .reveal-scale');
  if (!targets.length) return;
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  targets.forEach((t) => revealObserver.observe(t));
})();

/* ============================================================
   STORE LOCATOR DRAWER
   ============================================================ */
(function () {
  const drawer = document.getElementById('storesDrawer');
  const overlay = document.getElementById('storesOverlay');
  const closeBtn = document.getElementById('closeStoresDrawer');
  const list = document.getElementById('storesList');
  const search = document.getElementById('storesSearch');
  const count = document.getElementById('storesCount');
  if (!drawer || !overlay || !closeBtn || !list) return;

  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function link(text, href, external) {
    const a = el('a', null, text);
    a.href = href;
    if (external) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }

  function render(query) {
    const data = window.BOUTIQUES || [];
    const q = norm(query).trim();
    const items = data.filter((b) => {
      if (!q) return true;
      return norm([b.name, b.city, b.country, b.address].join(' ')).indexOf(q) !== -1;
    });

    const groups = {};
    items.forEach((b) => { (groups[b.country] = groups[b.country] || []).push(b); });
    const countries = Object.keys(groups).sort((a, b) => {
      if (a === 'Italia') return -1;
      if (b === 'Italia') return 1;
      return a.localeCompare(b, 'it');
    });

    list.textContent = '';
    if (!items.length) {
      list.appendChild(el('p', 'stores-empty', 'Nessuna boutique trovata. Prova con un’altra città o un altro Paese.'));
    }
    countries.forEach((country) => {
      list.appendChild(el('h4', 'stores-country', country));
      groups[country]
        .sort((a, b) => a.city.localeCompare(b.city, 'it'))
        .forEach((b) => {
          const item = el('article', 'stores-item');
          item.appendChild(el('h5', null, b.name));
          item.appendChild(el('p', null, b.address));
          item.appendChild(el('p', null, b.city));
          if (b.hours) item.appendChild(el('p', 'stores-hours', b.hours));
          const actions = el('div', 'stores-actions');
          const dest = encodeURIComponent([b.address, b.city, b.country].join(', '));
          actions.appendChild(link('Indicazioni', 'https://www.google.com/maps/dir/?api=1&destination=' + dest, true));
          if (b.email) actions.appendChild(link('E-mail', 'mailto:' + b.email));
          item.appendChild(actions);
          list.appendChild(item);
        });
    });
    count.textContent = items.length + ' boutique';
  }

  const closeOtherPanels = PanelManager.register(closeDrawer);

  function openDrawer() {
    closeOtherPanels();
    drawer.classList.add('open');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('#openStoresDrawer, a[aria-label="Negozi"], [data-open-stores]').forEach((a) => {
    a.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
  });
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
  if (search) search.addEventListener('input', () => render(search.value));

  render('');
})();

/* ============================================================
   CONTACT DRAWER
   ============================================================ */
(function () {
  const drawer = document.getElementById('contactDrawer');
  const overlay = document.getElementById('contactOverlay');
  const closeBtn = document.getElementById('closeContactDrawer');
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (!drawer || !overlay || !closeBtn) return;

  const closeOtherPanels = PanelManager.register(closeDrawer);

  function openDrawer() {
    closeOtherPanels();
    drawer.classList.add('open');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('#openContactDrawer, a[aria-label="Assistenza"], [data-open-contact]').forEach((el) => {
    el.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
  });
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.hidden = true;
      success.hidden = false;
    });
  }
})();

/* ============================================================
   SCROLL PROGRESS
   ============================================================ */
(function () {
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  let raf = null;
  function update() {
    raf = null;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    bar.style.width = pct + '%';
  }
  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(update);
  }

  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
})();

/* ============================================================
   ALTEZZA HEADER DINAMICA
   Espone --header-h = altezza reale dell'header visibile.

   Sulle pagine con body.header-light l'header si accorcia allo
   scroll: se aggiornassimo --header-h a ogni scroll, il padding
   di .page cambierebbe e il contenuto salterebbe. Quindi sulle
   pagine header-light misuriamo l'altezza UNA VOLTA SOLA.
   ============================================================ */
(function () {
  const headerEl = document.getElementById('header');
  if (!headerEl) return;

  const isHeaderLight = document.body.classList.contains('header-light');
  let raf = null;

  function misura() {
    raf = null;
    const h = headerEl.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }

  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(misura);
  }

  misura();

  /* Sulle pagine header-light l'altezza resta quella iniziale:
     non ascoltiamo scroll né resize, così .page non salta. */
  if (isHeaderLight) return;

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('load', schedule);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(schedule);
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(schedule).observe(headerEl);
  }
})();

/* ============================================================
   CUORI — toggle preferiti sulle card e nella scheda prodotto
   ============================================================ */
(function () {
  const wishBadges = document.querySelectorAll('.wishlist-badge');

  function contaPreferiti() {
    return document.querySelectorAll('.wish.active, .pdp-wish-btn.active').length;
  }

  function aggiornaBadge() {
    const n = contaPreferiti();
    wishBadges.forEach((b) => {
      b.textContent = n;
      b.hidden = n === 0;
      b.classList.add('bump');
      setTimeout(() => b.classList.remove('bump'), cssDurationMs('--t-fast', 250));
    });
  }

  document.querySelectorAll('.product-card .wish').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
      aggiornaBadge();
    });
  });

  document.querySelectorAll('.pdp-wish-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
      aggiornaBadge();
    });
  });

  aggiornaBadge();
})();

/* ============================================================
   VIDEO — autoplay quando visibili, pausa quando fuori schermo.
   Rispetta prefers-reduced-motion (nessun autoplay).
   ============================================================ */
(function () {
  const videos = document.querySelectorAll('video[preload="none"], video[preload="metadata"], video.video-showcase-media');
  if (!videos.length) return;

  function play(v) {
    const p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  const riduciMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (riduciMovimento) return;

  const showcase = document.querySelector('video.video-showcase-media');
  function preloadShowcase() {
    if (showcase && showcase.paused) { showcase.preload = 'auto'; showcase.load(); }
  }
  if (document.readyState === 'complete') preloadShowcase();
  else window.addEventListener('load', preloadShowcase);

  if (!('IntersectionObserver' in window)) {
    videos.forEach(function (v) { v.preload = 'auto'; play(v); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) play(e.target);
      else e.target.pause();
    });
  }, { rootMargin: '300px 300px' });
  videos.forEach(function (v) { io.observe(v); });
})();