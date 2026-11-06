/* ============================================================
   CATEGORY-BAR.JS — Barra orizzontale categorie nella toolbar
   (stile COS). Va caricato DOPO js/filtri.js.

   Markup richiesto dentro .products-toolbar, tra contatore e switch:
     <div class="category-bar" role="group" aria-label="Categorie"
          data-reset-label="Abbigliamento"></div>

   - Le voci sono i tipi del drawer (#filtersTypes), nello stesso
     ordine, mostrati solo se almeno una card della pagina li ha.
   - Click su una voce: attiva solo quel tipo nel drawer e chiama
     window.DGFiltri.applica(). Gli altri filtri (taglia, prezzo…)
     restano come sono.
   - Prima voce (data-reset-label): toglie il filtro tipo.
   - Frecce ‹ › visibili solo se la barra trabocca da quel lato.
   - Se i tipi si cambiano dal drawer, la barra si aggiorna
     (evento dg:filtri-applicati emesso da filtri.js).
   ============================================================ */
(function () {
  'use strict';

  var bar  = document.querySelector('.products-toolbar .category-bar');
  var grid = document.querySelector('.products-grid');
  var chipsBox = document.getElementById('filtersTypes');
  if (!bar || !grid || !chipsBox) return;

  var resetLabel = bar.getAttribute('data-reset-label') || 'Abbigliamento';

  /* ---- Struttura: track scorrevole + due frecce ---- */
  bar.textContent = '';
  var track = document.createElement('div');
  track.className = 'category-bar-track';

  function freccia(dir) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'category-bar-arrow category-bar-arrow--' + dir;
    b.tabIndex = -1;                       /* da tastiera si scorre con Tab sulle voci */
    b.setAttribute('aria-hidden', 'true');
    b.hidden = true;
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.4');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', dir === 'next' ? 'M6 3l5 5-5 5' : 'M10 3L5 8l5 5');
    svg.appendChild(path);
    b.appendChild(svg);
    b.addEventListener('click', function () {
      var passo = Math.max(120, track.clientWidth * 0.7);
      track.scrollBy({ left: dir === 'next' ? passo : -passo, behavior: 'smooth' });
    });
    return b;
  }
  var prev = freccia('prev');
  var next = freccia('next');
  bar.appendChild(prev);
  bar.appendChild(track);
  bar.appendChild(next);

  /* ---- Dati ---- */
  function tipiCard(card) {
    /* Stessa regola di filtri.js: un tipo per card, valore intero */
    return card.dataset.type ? [card.dataset.type] : [];
  }
  function tipiPresenti() {
    var set = {};
    grid.querySelectorAll('.product-card:not(.featured)').forEach(function (c) {
      tipiCard(c).forEach(function (t) { set[t] = true; });
    });
    return set;
  }
  function chipsDrawer() {
    return Array.prototype.slice.call(chipsBox.querySelectorAll('button[data-type]'));
  }
  function tipiAttivi() {
    return chipsDrawer().filter(function (b) { return b.classList.contains('active'); })
                        .map(function (b) { return b.dataset.type; });
  }

  /* ---- Costruzione voci ---- */
  var firma = null;
  function costruisci() {
    var presenti = tipiPresenti();
    var voci = chipsDrawer().filter(function (b) { return presenti[b.dataset.type]; });
    var nuovaFirma = voci.map(function (b) { return b.dataset.type; }).join('|');
    if (nuovaFirma === firma) return;
    firma = nuovaFirma;

    track.textContent = '';
    track.appendChild(voce('', resetLabel));
    voci.forEach(function (b) { track.appendChild(voce(b.dataset.type, b.textContent.trim())); });
    sincronizza();
    aggiornaFrecce();
  }

  function voce(tipo, etichetta) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'category-bar-item';
    b.dataset.type = tipo;
    b.textContent = etichetta;
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () { scegli(tipo); });
    return b;
  }

  /* ---- Click: un solo tipo attivo nel drawer, poi applica ---- */
  function scegli(tipo) {
    chipsDrawer().forEach(function (b) {
      var on = tipo !== '' && b.dataset.type === tipo;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (window.DGFiltri && typeof window.DGFiltri.applica === 'function') {
      window.DGFiltri.applica();      /* emette dg:filtri-applicati → sincronizza() */
    } else {
      sincronizza();
    }
  }

  /* ---- Stato visivo: riflette i tipi attivi nel drawer ---- */
  function sincronizza() {
    var attivi = tipiAttivi();
    var corrente = null;
    track.querySelectorAll('.category-bar-item').forEach(function (b) {
      var on = b.dataset.type === '' ? attivi.length === 0 : attivi.indexOf(b.dataset.type) !== -1;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on && !corrente) corrente = b;
    });
    if (corrente) mostraVoce(corrente);
    /* il contatore cambia larghezza dopo applica(): ricontrolla al frame dopo */
    requestAnimationFrame(aggiornaFrecce);
  }

  /* Porta la voce attiva dentro l'area visibile, scorrendo solo la barra
     (scrollIntoView sposterebbe anche la pagina). */
  function mostraVoce(b) {
    var margine = 40;  /* spazio per la freccia */
    var sx = b.offsetLeft - margine;
    var dx = b.offsetLeft + b.offsetWidth + margine - track.clientWidth;
    if (track.scrollLeft > sx) track.scrollLeft = Math.max(0, sx);
    else if (track.scrollLeft < dx) track.scrollLeft = dx;
  }

  /* ---- Frecce: visibili solo se c'è overflow da quel lato ---- */
  function aggiornaFrecce() {
    var max = track.scrollWidth - track.clientWidth;
    var trabocca = max > 1;
    bar.classList.toggle('is-overflowing', trabocca);
    prev.hidden = !trabocca || track.scrollLeft <= 1;
    next.hidden = !trabocca || track.scrollLeft >= max - 1;
  }

  track.addEventListener('scroll', aggiornaFrecce, { passive: true });
  /* Tab da tastiera: la voce con il focus entra sempre nell'area visibile */
  track.addEventListener('focusin', function (e) {
    if (e.target.classList.contains('category-bar-item')) mostraVoce(e.target);
  });
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(aggiornaFrecce);
    ro.observe(track);
    ro.observe(bar);
  }
  window.addEventListener('resize', aggiornaFrecce);

  document.addEventListener('dg:filtri-applicati', sincronizza);

  /* Card aggiunte dopo (es. "Carica altri prodotti"): ricalcola le voci.
     applica() riordina le card con appendChild: la firma evita ricostruzioni inutili. */
  var attesa = 0;
  new MutationObserver(function () {
    cancelAnimationFrame(attesa);
    attesa = requestAnimationFrame(costruisci);
  }).observe(grid, { childList: true });

  costruisci();
  /* I font web cambiano la larghezza delle voci: ricontrolla le frecce */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(aggiornaFrecce);
})();
