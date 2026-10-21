/* ============================================================
   QUICK-ADD — pannellino taglia (+ colore) dal "+" sulle card
   Legge: card.dataset.colors (opzionale), nome, prezzo, immagine
   Chiama: window.Cart.add() per aggiungere al carrello demo
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
  var cardAperta = null;

  function chiudi() {
    if (pannelloAperto) {
      pannelloAperto.remove();
      pannelloAperto = null;
      cardAperta = null;
    }
  }

  function creaPannello(card) {
    var p = document.createElement('div');
    p.className = 'quick-add';
    p.setAttribute('role', 'dialog');
    p.setAttribute('aria-label', 'Aggiungi al carrello');

    var colori = (card.dataset.colors || '').split(/\s+/).filter(function (c) { return COLORI[c]; });
    if (colori.length) {
      var lblC = document.createElement('p');
      lblC.className = 'quick-add-label';
      lblC.textContent = 'Colore';
      p.appendChild(lblC);
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
      p.appendChild(ulC);
    }

    var lblT = document.createElement('p');
    lblT.className = 'quick-add-label';
    lblT.textContent = 'Taglia';
    p.appendChild(lblT);
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
    p.appendChild(ulT);

    var cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'quick-add-cta';
    cta.textContent = 'Aggiungi al carrello';
    p.appendChild(cta);

    return p;
  }

  function aggiungiAlCarrello(card, p) {
    var tagliaBtn = p.querySelector('.quick-add-sizes button.selected');
    if (!tagliaBtn) {
      var ulT = p.querySelector('.quick-add-sizes');
      if (ulT) ulT.classList.add('has-error');
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
      setTimeout(chiudi, 900);
    }
  }

  document.addEventListener('click', function (e) {
    var plus = e.target.closest('.plus');
    if (plus) {
      e.preventDefault();
      var card = plus.closest('.product-card');
      if (!card) return;
      if (cardAperta === card) { chiudi(); return; }
      chiudi();
      var p = creaPannello(card);
      card.appendChild(p);
      pannelloAperto = p;
      cardAperta = card;
      var first = p.querySelector('.quick-add-colors button, .quick-add-sizes button');
      if (first) first.focus();
      return;
    }

    if (!e.target.closest('.quick-add')) {
      if (pannelloAperto) chiudi();
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
      return;
    }

    var cta = e.target.closest('.quick-add-cta');
    if (cta) {
      var card2 = cta.closest('.product-card');
      if (card2) aggiungiAlCarrello(card2, cta.closest('.quick-add'));
      return;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && pannelloAperto) chiudi();
  });
})();
