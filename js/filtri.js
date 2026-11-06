/* ============================================================
   FILTRI.JS — Drawer laterale "Filtra e ordina"
   ============================================================ */
(function () {
  'use strict';

  const drawer   = document.getElementById('filtersDrawer');
  const overlay  = document.getElementById('filtersOverlay');
  const closeBtn = document.getElementById('closeFiltersDrawer');
  const resetBtn = document.getElementById('filtersReset');
  const applyBtn = document.getElementById('filtersApply');
  const openers  = document.querySelectorAll('.filtri-bar');
  const grid     = document.querySelector('.products-grid');

  /* ---- Scelta griglia (colonne) ----
     Mobile  <=640px      : 1 / 2 / 3 colonne, default 2 (3 = solo foto, vedi collezione.css)
     Tablet  641-1024px   : 2 / 3 colonne, default 3
     Desktop >=1025px     : 3 / 4 colonne, default 3
     Lo switch è sempre visibile. Al cambio di breakpoint (resize, rotazione)
     si mostrano solo i bottoni validi e si torna al default di quel breakpoint.
     A ogni caricamento si riparte dal default: la scelta vale solo sulla pagina. */
  (function () {
    const g  = document.querySelector('.products-grid');
    const sw = document.querySelector('.grid-switch');
    if (!g || !sw) return;

    const mqMobile = window.matchMedia('(max-width: 640px)');
    const mqTablet = window.matchMedia('(min-width: 641px) and (max-width: 1024px)');

    function config() {
      if (mqMobile.matches) return { opts: [1, 2, 3], def: 2 };
      if (mqTablet.matches) return { opts: [2, 3], def: 3 };
      return { opts: [3, 4], def: 3 };
    }

    function icona(n) {
      const NS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 20 20');
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('aria-hidden', 'true');
      const rects = [];
      if (n === 1) {
        rects.push([2, 2, 16, 7], [2, 11, 16, 7]);
      } else {
        const gap = n === 4 ? 4 / 3 : (n === 3 ? 2.5 : 2);
        const s = (16 - gap * (n - 1)) / n;
        for (let r = 0; r < n; r++)
          for (let c = 0; c < n; c++)
            rects.push([2 + c * (s + gap), 2 + r * (s + gap), s, s]);
      }
      rects.forEach(function (v) {
        const el = document.createElementNS(NS, 'rect');
        el.setAttribute('x', v[0].toFixed(2));
        el.setAttribute('y', v[1].toFixed(2));
        el.setAttribute('width', v[2].toFixed(2));
        el.setAttribute('height', v[3].toFixed(2));
        svg.appendChild(el);
      });
      return svg;
    }

    function imposta(n) {
      g.dataset.cols = String(n);
      sw.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b.dataset.cols === String(n) ? 'true' : 'false');
      });
    }

    function costruisci() {
      const cfg = config();
      sw.textContent = '';
      cfg.opts.forEach(function (n) {
        const b = document.createElement('button');
        b.type = 'button';
        b.dataset.cols = String(n);
        b.setAttribute('aria-label', n === 1 ? 'Griglia a 1 colonna' : 'Griglia a ' + n + ' colonne');
        b.appendChild(icona(n));
        b.addEventListener('click', function () { imposta(n); });
        sw.appendChild(b);
      });
      imposta(cfg.def);
    }

    /* Pulisce la preferenza salvata da versioni precedenti */
    try { localStorage.removeItem('dg-grid-cols'); } catch (e) {}
    costruisci();
    [mqMobile, mqTablet].forEach(function (mq) {
      if (mq.addEventListener) mq.addEventListener('change', costruisci);
      else mq.addListener(costruisci);
    });
  })();

  if (!drawer || !overlay || !grid) return;

  /* Memorizza l'ordine originale delle card (una sola volta, al caricamento).
     Le card aggiunte in seguito (es. "Altri prodotti") ricevono un numero
     progressivo in coda. */
  function assegnaOrdineOriginale() {
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    let max = -1;
    cards.forEach(c => {
      if (c.dataset.order !== undefined) max = Math.max(max, parseInt(c.dataset.order, 10));
    });
    cards.forEach(c => {
      if (c.dataset.order === undefined) c.dataset.order = ++max;
    });
  }
  assegnaOrdineOriginale();

  function openDrawer(e) {
    if (e) e.preventDefault();
    drawer.inert = false;
    drawer.classList.add('open');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    if (drawer.contains(document.activeElement)) document.activeElement.blur();
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;
    document.body.style.overflow = '';
  }

  openers.forEach(btn => btn.addEventListener('click', openDrawer));
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  document.querySelectorAll('#filtersSizes button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    });
  });
  document.querySelectorAll('#filtersColors button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    });
  });

  function prezzoNumerico(card) {
    const el = card.querySelector('.price');
    if (!el) return 0;
    return parseFloat(el.textContent.replace('€', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
  }
  function nome(card) {
    const el = card.querySelector('.details h3');
    return el ? el.textContent.trim().toLowerCase() : '';
  }
  function ordineOriginale(card) {
    return parseInt(card.dataset.order, 10) || 0;
  }

  function leggiStato() {
    const sortEl = document.querySelector('input[name="sort"]:checked');
    const sort = sortEl ? sortEl.value : 'relevance';
    const availableOnly = document.getElementById('filtersAvailableOnly').checked;
    const priceMin = parseFloat(document.getElementById('filterPriceMin').value) || 0;
    const priceMax = parseFloat(document.getElementById('filterPriceMax').value) || Infinity;
    const sizes = Array.from(document.querySelectorAll('#filtersSizes button.active')).map(b => b.dataset.size);
    const colors = Array.from(document.querySelectorAll('#filtersColors button.active')).map(b => b.dataset.color);
    const types = Array.from(document.querySelectorAll('#filtersTypes button.active')).map(b => b.dataset.type);
    return { sort, availableOnly, priceMin, priceMax, sizes, colors, types };
  }

  function applica() {
    const stato = leggiStato();
    assegnaOrdineOriginale();
    const tutte = Array.from(grid.querySelectorAll('.product-card'));
    /* La card "featured" è editoriale: resta sempre visibile e ferma
       (la sua posizione è decisa dal CSS), fuori da filtri e ordinamento. */
    const featured = tutte.filter(c => c.classList.contains('featured'));
    const cards = tutte.filter(c => !c.classList.contains('featured'));
    featured.forEach(c => { c.style.display = ''; });

    /* 1. Filtri */
    cards.forEach(card => {
      const prezzo = prezzoNumerico(card);
      const disponibile = card.dataset.available !== 'false';
      const taglie = (card.dataset.size || '').split(/\s+/).filter(Boolean);
      const colori = (card.dataset.color || '').split(/\s+/).filter(Boolean);
      const tipi = card.dataset.type ? [card.dataset.type] : [];

      let ok = true;
      if (stato.availableOnly && !disponibile) ok = false;
      if (prezzo < stato.priceMin || prezzo > stato.priceMax) ok = false;
      if (stato.sizes.length && taglie.length && !stato.sizes.some(s => taglie.includes(s))) ok = false;
      if (stato.colors.length && colori.length && !stato.colors.some(c => colori.includes(c))) ok = false;
      if (stato.types.length && tipi.length && !stato.types.some(t => tipi.includes(t))) ok = false;

      card.style.display = ok ? '' : 'none';
    });

    /* 2. Ordinamento: parte sempre dall'ordine originale.
          "relevance" e i casi di parità tornano all'ordine di partenza. */
    const ordinate = cards.slice();
    ordinate.sort((a, b) => {
      let r = 0;
      if (stato.sort === 'price-asc')  r = prezzoNumerico(a) - prezzoNumerico(b);
      if (stato.sort === 'price-desc') r = prezzoNumerico(b) - prezzoNumerico(a);
      if (stato.sort === 'name-asc')   r = nome(a).localeCompare(nome(b), 'it');
      return r || (ordineOriginale(a) - ordineOriginale(b));
    });
    featured.concat(ordinate).forEach(c => grid.appendChild(c));

    aggiornaBadge(stato);
    aggiornaConteggio();
    closeDrawer();
    /* Avvisa chi deve seguire lo stato dei filtri (es. js/category-bar.js) */
    document.dispatchEvent(new CustomEvent('dg:filtri-applicati', { detail: stato }));
  }

  function reset() {
    document.querySelector('input[name="sort"][value="relevance"]').checked = true;
    document.getElementById('filtersAvailableOnly').checked = false;
    document.getElementById('filterPriceMin').value = '';
    document.getElementById('filterPriceMax').value = '';
    document.querySelectorAll('#filtersSizes button.active').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('#filtersColors button.active').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('#filtersTypes button.active').forEach(b => b.classList.remove('active'));
    applica();
  }

  function aggiornaConteggio() {
    var grid = document.querySelector('.products-grid');
    if (!grid) return;
    var tutte = Array.prototype.slice.call(grid.querySelectorAll('.product-card'));
    var visibili = tutte.filter(function (c) {
      return !c.classList.contains('featured') && c.style.display !== 'none';
    });
    var n = visibili.length;
    var testo = n + (n === 1 ? ' prodotto' : ' prodotti');
    document.querySelectorAll('.products-count').forEach(function (el) {
      el.textContent = testo;
    });
    var inlineTesto = ' (' + n + ')';
    document.querySelectorAll('.filtri-bar-count').forEach(function (el) {
      el.textContent = inlineTesto;
    });
    grid.classList.toggle('grid-empty', n === 0);
  }

  function aggiornaBadge(stato) {
    let n = 0;
    if (stato.sort !== 'relevance') n++;
    if (stato.availableOnly) n++;
    if (stato.priceMin > 0 || stato.priceMax < Infinity) n++;
    n += stato.sizes.length;
    n += stato.colors.length;

    document.querySelectorAll('.filtri-bar').forEach(btn => {
      let badge = btn.querySelector('.filtri-count');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'filtri-count';
        btn.appendChild(badge);
      }
      badge.textContent = n;
      badge.hidden = n === 0;
    });
  }

  /* API pubblica: usata da js/category-bar.js */
  window.DGFiltri = { applica: applica, reset: reset, stato: leggiStato };

  applyBtn.addEventListener('click', applica);
  resetBtn.addEventListener('click', reset);

  aggiornaBadge({ sort: 'relevance', availableOnly: false, priceMin: 0, priceMax: Infinity, sizes: [], colors: [] });
  aggiornaConteggio();

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#filtersTypes button');
    if (!btn) return;
    var pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', pressed ? 'false' : 'true');
    btn.classList.toggle('active', !pressed);
  });
})();
