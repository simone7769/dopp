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
})();