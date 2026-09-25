/* ============================================================
   NAV.JS — Script unificato per tutte le pagine
   Contiene: nav, megamenu, drawer, caroselli, ricerca, menu mobile.
   I caroselli (Must Have, Journal) e il video-showcase si attivano
   solo se gli elementi esistono nella pagina (guard-rail).
   ============================================================ */

/* ---------- EVITA IL RITORNO IN CIMA AL CLICK SU href="#" ---------- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href="#"]');
  if (link) e.preventDefault();
});

/* ============================================================
   GESTORE CENTRALE DEI PANNELLI (drawer laterali, overlay di
   ricerca, menu mobile). Ogni pannello si registra con la sua
   funzione di chiusura: prima di aprirsi chiude tutti gli altri,
   così non restano mai due pannelli aperti insieme e lo scroll
   del body non si sblocca finché uno di loro è ancora visibile.
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
   Legge le durate definite in base.css (--t-fast, --t-base, --t-slow),
   così i timer JS restano sincronizzati con il CSS.
   ============================================================ */
function cssDurationMs(name, fallbackMs) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const num = parseFloat(v);
  if (isNaN(num)) return fallbackMs;
  return v.endsWith('ms') ? num : num * 1000;
}

// true quando menu e ricerca sono pannelli a tutto schermo
// (mobile e tablet verticale, sotto 1024px).
function isFullscreenPanelLayout() {
  return window.matchMedia('(max-width: 1024px)').matches;
}

/* ============================================================
   MEGA-MENU DELLA NAV (Abbigliamento, Accessori e Scarpe, Outlet)
   Le voci senza pannello (New in, Gift Card) mantengono comunque
   l'header in stato "menu-open" quando il mouse ci passa sopra.
   ============================================================ */
const header = document.getElementById('header');

// Pannelli a tutto schermo (menu mobile, ricerca) che tengono l'header chiaro
// ("menu-open") finché sono aperti o si stanno ancora chiudendo.
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
  // Tempo entro cui un "click" successivo a un "pointerdown" touch
  // viene considerato il click sintetico emesso dal browser (e ignorato).
  const TAP_ECHO_WINDOW = 500;

  function isSearchOpen() {
    const s = document.getElementById('searchMegamenu');
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

    /* Traccia l'ultimo pointerdown touch su questo link, così
       il click sintetico che il browser emette subito dopo
       può essere ignorato (era lui a chiudere il menu appena aperto). */
    let lastPointerDownWasTouch = 0;

    /* ---------- CLICK (desktop con mouse) ---------- */
    m.link.addEventListener('click', (e) => {
      // Se subito prima è arrivato un pointerdown touch (tap),
      // questo click è l'eco sintetica del browser: ignorala.
      if (Date.now() - lastPointerDownWasTouch < TAP_ECHO_WINDOW) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      clearTimeout(hideTimer);
      if (current === m) chiudiTuttoOra();
      else apriMenu(m);
    });

    /* ---------- TOUCH / PEN (tablet orizzontale) ----------
       Su tablet il click viene spesso "mangiato" dal browser per
       simulare l'hover. Intercettiamo pointerdown con pointerType
       touch/pen, che arriva PRIMA e in modo affidabile.            */
    m.link.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        lastPointerDownWasTouch = Date.now();
        e.preventDefault();
        clearTimeout(hideTimer);
        if (current === m) chiudiTuttoOra();
        else apriMenu(m);
      }
    }, { passive: false });

    /* ---------- FOCUS da tastiera ---------- */
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

  window.addEventListener('scroll', () => {
    if (current || header.classList.contains('menu-open')) return;
    if (window.scrollY > 120) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

/* ============================================================
   RICERCA: allinea l'altezza della ricerca a quella del megamenu
   Abbigliamento (solo desktop largo, ≥ 1201px).
   ============================================================ */
(function () {
  const search = document.getElementById('searchMegamenu');
  const abb = document.getElementById('megaAbbigliamento');
  if (!search || !abb) return;

  function allineaAltezzaRicerca() {
    search.style.minHeight = '';
    if (window.innerWidth <= 1400) return;
    const h = abb.getBoundingClientRect().height;
    if (h > 0) search.style.minHeight = h + 'px';
  }

  allineaAltezzaRicerca();
  window.addEventListener('load', allineaAltezzaRicerca);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(allineaAltezzaRicerca);
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(allineaAltezzaRicerca, 120);
  });
})();

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
   MEGAMENU RICERCA
   ============================================================ */
(function () {
  const searchMegamenu = document.getElementById('searchMegamenu');
  const searchInput = document.getElementById('searchInput');
  const closeSearchBtn = document.getElementById('closeSearch');
  const searchIcons = document.querySelectorAll('a[aria-label="Cerca"]');

  if (!searchMegamenu || !header) return;

  const closeOtherPanels = PanelManager.register(closeSearchFn);

  function openSearch(e) {
    if (e) e.preventDefault();
    closeOtherPanels();
    searchMegamenu.classList.add('open');
    headerHolds.add('search');
    header.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    if (searchInput) setTimeout(() => searchInput.focus(), 150);
  }

  let searchCloseTimer = null;

  function closeSearchFn() {
    const wasOpen = searchMegamenu.classList.contains('open');
    searchMegamenu.classList.remove('open');
    document.body.style.overflow = '';
    if (!wasOpen) return;
    clearTimeout(searchCloseTimer);

    const release = () => {
      if (searchMegamenu.classList.contains('open')) return;
      headerHolds.delete('search');
      releaseHeaderIfFree();
    };

    if (isFullscreenPanelLayout()) {
      searchCloseTimer = setTimeout(release, cssDurationMs('--t-base', 400));
    } else {
      release();
    }
  }

  searchIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchMegamenu.classList.contains('open')) closeSearchFn();
      else openSearch();
    });
  });

  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearchFn);

  document.addEventListener('click', (e) => {
    if (searchMegamenu.classList.contains('open') &&
        !searchMegamenu.contains(e.target) &&
        !e.target.closest('a[aria-label="Cerca"]')) {
      closeSearchFn();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchMegamenu.classList.contains('open')) closeSearchFn();
  });
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
   CONTATORE CARRELLO
   ============================================================ */
window.CartCounter = (function () {
  const cartCountEl = document.getElementById('cartCount');
  const badges = document.querySelectorAll('.cart-badge');
  const cartDrawerEl = document.getElementById('cartDrawer');

  function totalFromDrawer() {
    if (!cartDrawerEl) return null;
    const qtyEls = cartDrawerEl.querySelectorAll('.qty-value');
    if (!qtyEls.length) return null;
    let sum = 0;
    qtyEls.forEach((q) => { sum += parseInt(q.textContent, 10) || 0; });
    return sum;
  }

  let total = totalFromDrawer();
  if (total === null) total = parseInt(cartCountEl ? cartCountEl.textContent : '0', 10) || 0;

  function render() {
    if (cartCountEl) cartCountEl.textContent = total;
    badges.forEach((b) => {
      b.textContent = total;
      b.hidden = total === 0;
      b.classList.add('bump');
      setTimeout(() => b.classList.remove('bump'), cssDurationMs('--t-fast', 250));
    });
  }

  function set(n) {
    total = Math.max(0, n);
    render();
  }

  render();

  return {
    add(n) { set(total + n); },
    recalcFromDrawer() {
      const t = totalFromDrawer();
      if (t !== null) set(t);
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

  if (!drawer) return;

  const closeOtherPanels = PanelManager.register(closeCart);

  function openCart(e) {
    if (e) e.preventDefault();
    closeOtherPanels();
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
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

  const qtyValue = document.getElementById('qtyValue');
  if (qtyValue) {
    drawer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        let val = parseInt(qtyValue.textContent, 10) || 1;
        if (btn.dataset.action === 'plus') val++;
        else if (btn.dataset.action === 'minus' && val > 1) val--;
        qtyValue.textContent = val;
        if (window.CartCounter) window.CartCounter.recalcFromDrawer();
      });
    });
  }
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