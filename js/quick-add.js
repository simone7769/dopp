/* ============================================================
   QUICK-ADD — drawer taglia (+ colore) dal "+" sulle card
   Desktop: drawer da destra a due colonne (foto | info), stile COS.
   Tablet/mobile: una colonna (vedi css/quick-add.css).
   Legge: card.dataset.colors (opzionale), nome, prezzo, foto, link scheda
   Chiama: window.Cart.add() per aggiungere al carrello demo
   Accessibilità: role=dialog, focus trap, Esc, focus di ritorno sul "+" 
   ============================================================ */
(function () {
  'use strict';

  var COLORI = {
    blu:      { nome: 'Blu',      hex: '#2b3546' },
    nero:     { nome: 'Nero',     hex: '#2b2b2b' },
    grigio:   { nome: 'Grigio',   hex: '#8a8680' },
    marrone:  { nome: 'Marrone',  hex: '#5a4633' },
    beige:    { nome: 'Beige',    hex: '#c9b898' },
    cammello: { nome: 'Cammello', hex: '#a68a5b' }
  };
  var TAGLIE = ['46', '48', '50', '52', '54', '56'];

  var pannelloAperto = null;
  var overlayAperto = null;
  var cardAperta = null;
  var apertoDa = null;
  var overflowPrima = '';

  function chiudi(ripristinaFocus) {
    if (!pannelloAperto) return;
    var p = pannelloAperto, ov = overlayAperto, opener = apertoDa;
    pannelloAperto = null;
    overlayAperto = null;
    cardAperta = null;
    apertoDa = null;

    p.classList.remove('open');
    ov.classList.remove('active');
    document.body.style.overflow = overflowPrima;

    /* Il drawer esce con la transizione, poi viene rimosso dal DOM */
    var fatto = false;
    function rimuovi() {
      if (fatto) return;
      fatto = true;
      p.remove();
      ov.remove();
    }
    p.addEventListener('transitionend', function (e) { if (e.target === p) rimuovi(); });
    setTimeout(rimuovi, 600);

    /* il focus torna al "+" che aveva aperto il drawer (se visibile) */
    if (ripristinaFocus && opener && opener.offsetParent !== null) opener.focus();
  }

  /* Foto della scheda: la striscia dello slider della card (card-slider.js),
     altrimenti foto + still-life. Senza duplicati. */
  function fotoCard(card) {
    var nodi = card.querySelector('.card-track')
      ? card.querySelectorAll('.card-track > img, .card-track > video')
      : card.querySelectorAll('.img-main, .img-hover');
    var viste = {}, out = [];
    [].forEach.call(nodi, function (el) {
      var src = window.DGMedia ? window.DGMedia.srcDa(el) : (el.getAttribute('src') || '');
      if (!src || viste[src]) return;
      viste[src] = true;
      out.push({ src: src, alt: el.getAttribute('alt') || '', w: el.getAttribute('width'), h: el.getAttribute('height') });
    });
    
    // Su mobile/tablet: solo le ultime 2 (still-life)
    // Su desktop: tutte le immagini della galleria
    if (window.matchMedia('(max-width: 900px)').matches && out.length > 2) {
      return out.slice(-2);
    }
    return out;
  }

  function creaFoto(f, i, nome) {
    var isVideo = window.DGMedia && window.DGMedia.isVideo(f.src);
    var el = document.createElement(isVideo ? 'video' : 'img');
    el.src = f.src;
    if (isVideo) {
      el.muted = true;
      el.loop = true;
      el.autoplay = true;
      el.setAttribute('playsinline', '');
      el.setAttribute('aria-label', f.alt || nome);
    } else {
      if (f.w && f.h) {
        el.setAttribute('width', f.w);
        el.setAttribute('height', f.h);
        el.style.aspectRatio = f.w + ' / ' + f.h;
      }
      el.alt = f.alt || (nome + ' \u2013 foto ' + (i + 1));
      el.decoding = 'async';
      if (i > 0) el.loading = 'lazy';
      el.draggable = false;
    }
    return el;
  }

  function creaPannello(card) {
    var nomeEl = card.querySelector('.details h3') || card.querySelector('h3');
    var nome = nomeEl ? nomeEl.textContent.trim() : '';

    var p = document.createElement('aside');
    p.className = 'quick-add';
    p.setAttribute('role', 'dialog');
    p.setAttribute('aria-modal', 'true');
    p.setAttribute('aria-labelledby', 'quick-add-title');

    var x = document.createElement('button');
    x.type = 'button';
    x.className = 'quick-add-close';
    x.setAttribute('aria-label', 'Chiudi');
    x.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';
    p.appendChild(x);

    var body = document.createElement('div');
    body.className = 'quick-add-body';
    p.appendChild(body);

    /* ---- Colonna sinistra: foto ---- */
    var gal = document.createElement('div');
    gal.className = 'quick-add-gallery';
    gal.setAttribute('role', 'region');
    gal.setAttribute('aria-label', 'Foto del prodotto');
    gal.tabIndex = 0;
    var foto = fotoCard(card);
    foto.forEach(function (f, i) { gal.appendChild(creaFoto(f, i, nome)); });
    if (foto.length < 2) gal.classList.add('quick-add-gallery--single');
    body.appendChild(gal);

    /* ---- Colonna destra: informazioni ---- */
    var info = document.createElement('div');
    info.className = 'quick-add-info';
    body.appendChild(info);

    var h = document.createElement('h2');
    h.className = 'quick-add-title';
    h.id = 'quick-add-title';
    h.textContent = nome;
    info.appendChild(h);

    var prezzoBlocco = card.querySelector('.details .price-block');
    var prezzoEl = card.querySelector('.details .price, .details .price-now') || card.querySelector('.price, .product-price');
    var pr = document.createElement('p');
    pr.className = 'quick-add-price';
    if (prezzoBlocco) pr.appendChild(prezzoBlocco.cloneNode(true));
    else pr.textContent = prezzoEl ? prezzoEl.textContent.trim() : '';
    info.appendChild(pr);

    var colori = (card.dataset.colors || '').split(/\s+/).filter(function (c) { return COLORI[c]; });
    if (colori.length) {
      var lblC = document.createElement('p');
      lblC.className = 'quick-add-label';
      lblC.textContent = 'Colore: ' + COLORI[colori[0]].nome;
      info.appendChild(lblC);
      var ulC = document.createElement('ul');
      ulC.className = 'quick-add-colors';
      colori.forEach(function (c, i) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.type = 'button';
        b.dataset.color = c;
        b.setAttribute('aria-label', COLORI[c].nome);
        b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        if (i === 0) b.classList.add('selected');
        var s = document.createElement('span');
        s.style.background = COLORI[c].hex;
        b.appendChild(s);
        li.appendChild(b);
        ulC.appendChild(li);
      });
      info.appendChild(ulC);
    }

    var lblT = document.createElement('p');
    lblT.className = 'quick-add-label';
    lblT.textContent = 'Seleziona la taglia';
    info.appendChild(lblT);
    var ulT = document.createElement('ul');
    ulT.className = 'quick-add-sizes';
    TAGLIE.forEach(function (t) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.size = t;
      b.textContent = t;
      li.appendChild(b);
      ulT.appendChild(li);
    });
    info.appendChild(ulT);

    var err = document.createElement('p');
    err.className = 'quick-add-error';
    err.setAttribute('role', 'alert');
    err.hidden = true;
    err.textContent = 'Seleziona una taglia';
    info.appendChild(err);

    var link = card.querySelector('a.details[href], .product-link[href], a[href]');
    var href = link ? link.getAttribute('href') : '';
    if (href) {
      var det = document.createElement('a');
      det.className = 'quick-add-details';
      det.href = href;
      det.textContent = 'Dettagli del prodotto';
      info.appendChild(det);
    }

    var cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'quick-add-cta';
    cta.textContent = 'Aggiungi al carrello';
    info.appendChild(cta);

    return p;
  }

  function focusabili(p) {
    return [].filter.call(
      p.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; }
    );
  }

  function apri(card, plus) {
    chiudi();
    var ov = document.createElement('div');
    ov.className = 'quick-add-overlay';
    var p = creaPannello(card);
    document.body.appendChild(ov);
    document.body.appendChild(p);
    overflowPrima = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pannelloAperto = p;
    overlayAperto = ov;
    cardAperta = card;
    apertoDa = plus;
    void p.offsetWidth; /* parte la transizione d'ingresso */
    p.classList.add('open');
    ov.classList.add('active');
    var first = p.querySelector('.quick-add-colors button, .quick-add-sizes button');
    if (first) first.focus({ preventScroll: true });
  }

  function aggiungiAlCarrello(card, p) {
    var tagliaBtn = p.querySelector('.quick-add-sizes button.selected');
    if (!tagliaBtn) {
      var ulT = p.querySelector('.quick-add-sizes');
      if (ulT) ulT.classList.add('has-error');
      var err = p.querySelector('.quick-add-error');
      if (err) err.hidden = false;
      return;
    }
    var coloreBtn = p.querySelector('.quick-add-colors button.selected');
    var colore = coloreBtn ? COLORI[coloreBtn.dataset.color].nome : '';

    var media = card.querySelector('.img-main') || card.querySelector('img') || card.querySelector('video');
    var nome = card.querySelector('.details h3') || card.querySelector('h3');
    var prezzo = card.querySelector('.details .price, .details .price-now') || card.querySelector('.price, .product-price');

    if (!window.Cart) return;

    var src = media ? (window.DGMedia ? window.DGMedia.srcDa(media) : media.getAttribute('src')) : '';

    window.Cart.add({
      id: src + '|' + tagliaBtn.textContent + '|' + colore,
      img: src,
      nome: nome ? nome.textContent.trim() : '',
      prezzo: prezzo ? prezzo.textContent.trim() : '',
      taglia: tagliaBtn.textContent,
      colore: colore
    });

    var cta = p.querySelector('.quick-add-cta');
    if (cta) {
      cta.textContent = 'Aggiunto \u2713';
      cta.disabled = true;
      setTimeout(function () { if (pannelloAperto === p) chiudi(true); }, 900);
    }
  }

  document.addEventListener('click', function (e) {
    var plus = e.target.closest('.plus');
    if (plus) {
      e.preventDefault();
      var card = plus.closest('.product-card');
      if (!card) return;
      apri(card, plus);
      return;
    }

    var closeBtn = e.target.closest('.quick-add-close');
    if (closeBtn) {
      chiudi(true);
      return;
    }

    /* click fuori dal drawer (cioè sull'overlay) */
    if (!e.target.closest('.quick-add')) {
      if (pannelloAperto) chiudi(true);
      return;
    }

    var colB = e.target.closest('.quick-add-colors button');
    if (colB) {
      var pc = colB.closest('.quick-add');
      pc.querySelectorAll('.quick-add-colors button').forEach(function (b) {
        var on = b === colB;
        b.classList.toggle('selected', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var lbl = pc.querySelector('.quick-add-colors').previousElementSibling;
      if (lbl) lbl.textContent = 'Colore: ' + COLORI[colB.dataset.color].nome;
      return;
    }

    var sizeB = e.target.closest('.quick-add-sizes button');
    if (sizeB) {
      var ps = sizeB.closest('.quick-add');
      ps.querySelectorAll('.quick-add-sizes button').forEach(function (b) {
        b.classList.toggle('selected', b === sizeB);
      });
      var ulT = ps.querySelector('.quick-add-sizes');
      if (ulT) ulT.classList.remove('has-error');
      var err = ps.querySelector('.quick-add-error');
      if (err) err.hidden = true;
      return;
    }

    var cta = e.target.closest('.quick-add-cta');
    if (cta) {
      if (cardAperta) aggiungiAlCarrello(cardAperta, cta.closest('.quick-add'));
      return;
    }

    /* link «Dettagli del prodotto» con href "#" (card di demo senza scheda): non risale in cima */
    var det = e.target.closest('.quick-add-details');
    if (det && det.getAttribute('href') === '#') e.preventDefault();
  });

  document.addEventListener('keydown', function (e) {
    if (!pannelloAperto) return;
    if (e.key === 'Escape') {
      chiudi(true);
      return;
    }
    if (e.key === 'Tab') {
      /* focus trap: Tab e Maiusc+Tab restano dentro il drawer */
      var f = focusabili(pannelloAperto);
      if (!f.length) return;
      var primo = f[0], ultimo = f[f.length - 1];
      var attivo = document.activeElement;
      if (!pannelloAperto.contains(attivo)) {
        e.preventDefault();
        primo.focus();
      } else if (e.shiftKey && attivo === primo) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && attivo === ultimo) {
        e.preventDefault();
        primo.focus();
      }
    }
  });
})();
