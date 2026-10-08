/* ============================================================
   PRODOTTO.JS — interazioni scheda prodotto
   ============================================================ */
(function () {
  'use strict';

  /* --- Selezione taglia --- */
  document.querySelectorAll('.pdp-sizes button:not(.disabled)').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.pdp-sizes button').forEach(function (b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
      var avviso = document.querySelector('.pdp-size-warning');
      if (avviso) avviso.remove();
    });
  });

  /* --- Selezione colore --- */
  document.querySelectorAll('.pdp-colors button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.pdp-colors button').forEach(function (b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
    });
  });

  /* --- Aggiungi al carrello (con taglia obbligatoria) --- */
  var pdpAddCart = document.querySelector('.pdp-add-cart');
  if (pdpAddCart) {
    var originalLabel = pdpAddCart.textContent;

    pdpAddCart.addEventListener('click', function () {
      var tagliaSelezionata = document.querySelector('.pdp-sizes button.selected');
      var haTaglie = document.querySelectorAll('.pdp-sizes button:not(.disabled)').length > 0;

      if (haTaglie && !tagliaSelezionata) {
        var avviso = document.querySelector('.pdp-size-warning');
        if (!avviso) {
          avviso = document.createElement('p');
          avviso.className = 'pdp-size-warning';
          avviso.textContent = 'Seleziona una taglia prima di aggiungere al carrello.';
          var sizesBlock = document.querySelector('.pdp-sizes');
          if (sizesBlock) sizesBlock.insertAdjacentElement('afterend', avviso);
        }
        return;
      }

      if (window.Cart) {
        var imgEl = document.querySelector('.pdp-gallery img');
        var coloreBtn = document.querySelector('.pdp-colors button.selected');
        var nomeColore = coloreBtn ? (coloreBtn.getAttribute('aria-label') || '') : '';
        var nomeTaglia = tagliaSelezionata ? tagliaSelezionata.textContent.trim() : '';
        var srcImg = imgEl ? imgEl.getAttribute('src') : '';
        var nome = document.querySelector('.pdp-title');
        var prezzo = document.querySelector('.pdp-price');

        window.Cart.add({
          id: srcImg + '|' + nomeTaglia + '|' + nomeColore,
          img: srcImg,
          nome: nome ? nome.textContent.trim() : '',
          prezzo: prezzo ? prezzo.textContent.trim() : '',
          taglia: nomeTaglia,
          colore: nomeColore
        });
      }
      pdpAddCart.textContent = 'Aggiunto ✓';
      pdpAddCart.disabled = true;
      setTimeout(function () {
        pdpAddCart.textContent = originalLabel;
        pdpAddCart.disabled = false;
      }, 1600);
    });
  }

  /* --- Lightbox: zoom immagine a schermo intero --- */
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.pdp-gallery img'));
  if (thumbs.length) {
    var current = 0;
    var lastFocus = null;
    var touchX = null;

    var ICON_CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';
    var ICON_PREV  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8"/></svg>';
    var ICON_NEXT  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg>';

    var box = document.createElement('div');
    box.className = 'pdp-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Immagine ingrandita');
    box.innerHTML =
      '<button type="button" class="pdp-lightbox-close" aria-label="Chiudi">' + ICON_CLOSE + '</button>' +
      '<button type="button" class="pdp-lightbox-prev" aria-label="Immagine precedente">' + ICON_PREV + '</button>' +
      '<img class="pdp-lightbox-img" alt="">' +
      '<button type="button" class="pdp-lightbox-next" aria-label="Immagine successiva">' + ICON_NEXT + '</button>' +
      '<span class="pdp-lightbox-count" aria-live="polite"></span>';
    document.body.appendChild(box);

    var bigImg = box.querySelector('.pdp-lightbox-img');
    var counter = box.querySelector('.pdp-lightbox-count');
    var btnClose = box.querySelector('.pdp-lightbox-close');
    var btnPrev = box.querySelector('.pdp-lightbox-prev');
    var btnNext = box.querySelector('.pdp-lightbox-next');

    function show(i) {
      current = (i + thumbs.length) % thumbs.length;
      bigImg.src = thumbs[current].currentSrc || thumbs[current].src;
      bigImg.alt = thumbs[current].alt;
      counter.textContent = (current + 1) + ' / ' + thumbs.length;
      /* precarica la vicina successiva */
      var next = thumbs[(current + 1) % thumbs.length];
      if (next) { var pre = new Image(); pre.src = next.currentSrc || next.src; }
    }

    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.classList.add('open');
      document.body.classList.add('pdp-lightbox-open');
      btnClose.focus();
    }

    function close() {
      box.classList.remove('open');
      document.body.classList.remove('pdp-lightbox-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }

    thumbs.forEach(function (img, i) {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.addEventListener('click', function () { open(i); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });

    /* click sullo sfondo (non su immagine/bottoni) chiude */
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
      else if (e.key === 'Tab') {
        /* focus trap tra i tre bottoni */
        var f = [btnClose, btnPrev, btnNext].filter(function (b) { return b.offsetParent !== null; });
        var idx = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });

    /* swipe su touch */
    box.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }
})();