/* ============================================================
   CARD SLIDER — foto della scheda prodotto sfogliabili nella card
   ------------------------------------------------------------
   Card con scheda prodotto collegata: l'HTML della card porta in
   data-slides le foto della galleria della scheda in versione 3:4
   (la prima della scheda è omessa: equivale alla foto della card).
     data-slides="images/b.webp 1380x2070, images/d.webp 1380x2070"
   Card senza data-slides: scorrono foto e still-life (.img-hover).
   Tutte le card hanno quindi frecce e barretta.

   Desktop: frecce al passaggio del mouse, niente cambio foto
   automatico. Touch: scorrimento col dito, freccia sempre visibile,
   barretta di avanzamento in basso.

   La foto della card (.img-main) diventa la prima slide e resta
   .img-main, così nav.js, quick-add.js e il popup «Articoli simili»
   continuano a trovarla. La still-life (.img-hover) resta nel DOM
   ma nascosta: il popup «Articoli simili» la usa ancora.
   ============================================================ */
(function () {
  'use strict';

  var CHEVRON_L = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var CHEVRON_R = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  var riduci = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function leggiSlides(attr) {
    return attr.split(',').map(function (x) {
      var p = x.trim().split(/\s+/);
      var wh = (p[1] || '').split('x');
      return { src: p[0], w: wh[0], h: wh[1] };
    }).filter(function (x) { return x.src; });
  }

  function init(wrap) {
    if (wrap.classList.contains('has-slider')) return;
    var link = wrap.querySelector('.product-link');
    var main = wrap.querySelector('.img-main');
    if (!link || !main) return;
    var slides = leggiSlides(wrap.getAttribute('data-slides') || '');
    var hover = wrap.querySelector('.img-hover');
    /* Card senza scheda collegata: scorrono la foto e la still-life (.img-hover),
       le stesse due foto che prima si alternavano al passaggio del mouse. */
    if (!slides.length && hover) {
      slides = [{ src: hover.getAttribute('src'), w: hover.getAttribute('width'),
                  h: hover.getAttribute('height'), alt: hover.getAttribute('alt') }];
    }
    if (!slides.length) return;

    var nome = (main.getAttribute('alt') || '').replace(/\s+-\s+vista alternativa$/, '');
    var track = document.createElement('div');
    track.className = 'card-track';
    link.insertBefore(track, main);
    track.appendChild(main);
    slides.forEach(function (s, i) {
      var img = document.createElement('img');
      img.src = s.src;
      if (s.w && s.h) { img.width = +s.w; img.height = +s.h; }
      img.alt = s.alt || (nome + ' – foto ' + (i + 2));
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      track.appendChild(img);
    });
    main.draggable = false;
    var n = slides.length + 1;

    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'card-arrow card-arrow--prev';
    prev.setAttribute('aria-label', 'Foto precedente');
    prev.innerHTML = CHEVRON_L;
    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'card-arrow card-arrow--next';
    next.setAttribute('aria-label', 'Foto successiva');
    next.innerHTML = CHEVRON_R;

    var bar = document.createElement('div');
    bar.className = 'card-progress';
    bar.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < n; i++) bar.appendChild(document.createElement('span'));

    wrap.appendChild(prev);
    wrap.appendChild(next);
    wrap.appendChild(bar);
    wrap.classList.add('has-slider');

    /* Larghezza intera: con card larghe 474,66 px lo scorrimento si ferma su px
       interi e ai bordi resterebbe visibile 1 px della foto vicina. La striscia
       viene arrotondata per eccesso; il riquadro (overflow: hidden) taglia
       l'eventuale frazione in più. */
    function misura() {
      track.style.width = Math.ceil(wrap.getBoundingClientRect().width) + 'px';
    }
    misura();

    var attuale = -1;
    function aggiorna() {
      var w = track.clientWidth || 1;
      var idx = Math.max(0, Math.min(n - 1, Math.round(track.scrollLeft / w)));
      if (idx === attuale) return;
      attuale = idx;
      prev.hidden = idx === 0;
      next.hidden = idx === n - 1;
      [].forEach.call(bar.children, function (s, k) { s.classList.toggle('on', k === idx); });
    }
    function vai(delta) {
      var idx = Math.max(0, Math.min(n - 1, attuale + delta));
      track.scrollTo({ left: idx * track.clientWidth, behavior: riduci ? 'auto' : 'smooth' });
    }
    prev.addEventListener('click', function (e) { e.preventDefault(); vai(-1); });
    next.addEventListener('click', function (e) { e.preventDefault(); vai(1); });

    var raf = 0;
    track.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; aggiorna(); });
    }, { passive: true });
    /* La card cambia larghezza anche senza che cambi la finestra: switch delle
       colonne, filtri che nascondono card, griglia che si ricompone. Si segue
       quindi la card stessa, non la finestra. */
    function ricalcola() {
      misura();
      track.scrollLeft = Math.max(attuale, 0) * track.clientWidth;
    }
    if (window.ResizeObserver) new ResizeObserver(ricalcola).observe(wrap);
    else window.addEventListener('resize', ricalcola);
    aggiorna();
  }

  function avvia() {
    document.querySelectorAll('.product-card:not(.featured) .img-wrap').forEach(init);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia);
  else avvia();
})();
