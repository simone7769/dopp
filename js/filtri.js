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

  openers.forEach(btn => btn.addEventListener('click', openDrawer));
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  document.querySelectorAll('#filtersSizes button').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('active'));
  });
  document.querySelectorAll('#filtersColors button').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('active'));
  });

  function prezzoNumerico(card) {
    const el = card.querySelector('.price');
    if (!el) return 0;
    return parseFloat(el.textContent.replace('€', '').replace('.', '').replace(',', '.').trim()) || 0;
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
    return { sort, availableOnly, priceMin, priceMax, sizes, colors };
  }

  function applica() {
    const stato = leggiStato();
    assegnaOrdineOriginale();
    const cards = Array.from(grid.querySelectorAll('.product-card'));

    /* 1. Filtri */
    cards.forEach(card => {
      const prezzo = prezzoNumerico(card);
      const disponibile = card.dataset.available !== 'false';
      const taglie = (card.dataset.size || '').split(/\s+/).filter(Boolean);
      const colori = (card.dataset.color || '').split(/\s+/).filter(Boolean);

      let ok = true;
      if (stato.availableOnly && !disponibile) ok = false;
      if (prezzo < stato.priceMin || prezzo > stato.priceMax) ok = false;
      if (stato.sizes.length && taglie.length && !stato.sizes.some(s => taglie.includes(s))) ok = false;
      if (stato.colors.length && colori.length && !stato.colors.some(c => colori.includes(c))) ok = false;

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
    ordinate.forEach(c => grid.appendChild(c));

    aggiornaBadge(stato);
    closeDrawer();
  }

  function reset() {
    document.querySelector('input[name="sort"][value="relevance"]').checked = true;
    document.getElementById('filtersAvailableOnly').checked = false;
    document.getElementById('filterPriceMin').value = '';
    document.getElementById('filterPriceMax').value = '';
    document.querySelectorAll('#filtersSizes button.active').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('#filtersColors button.active').forEach(b => b.classList.remove('active'));
    applica();
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

  applyBtn.addEventListener('click', applica);
  resetBtn.addEventListener('click', reset);

  aggiornaBadge({ sort: 'relevance', availableOnly: false, priceMin: 0, priceMax: Infinity, sizes: [], colors: [] });
})();
