/* ============================================================
   GIFT-CARD.JS — selettore taglio + "Aggiungi al carrello"
   Riusa le classi .pdp-* del PDP (prodotto.css).
   ============================================================ */
(function () {
  'use strict';

  var grid = document.getElementById('giftSizes');
  var priceEl = document.getElementById('giftPrice');
  var addBtn = document.getElementById('giftAdd');
  if (!grid || !priceEl || !addBtn) return;

  var IMG = 'images/gift-card.webp';
  var NOME = 'Gift Card Doppelgänger';

  var currentValue = 50;
  var currentLabel = '50 €';

  function formattaPrezzo(v) {
    return '€ ' + v.toFixed(2).replace('.', ',');
  }

  grid.querySelectorAll('button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      grid.querySelectorAll('button').forEach(function (b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');

      currentValue = parseInt(btn.dataset.value, 10);
      currentLabel = btn.dataset.label;

      priceEl.textContent = formattaPrezzo(currentValue);
    });
  });

  addBtn.addEventListener('click', function () {
    if (window.Cart) {
      window.Cart.add({
        id: 'gift-card-' + currentValue,
        img: IMG,
        nome: NOME,
        prezzo: formattaPrezzo(currentValue),
        taglia: currentLabel,
        colore: ''
      });
    } else if (window.CartCounter) {
      window.CartCounter.add(1);
    }

    var originale = addBtn.textContent;
    addBtn.disabled = true;
    addBtn.textContent = 'Aggiunto';

    setTimeout(function () {
      addBtn.textContent = originale;
      addBtn.disabled = false;
    }, 1600);
  });
})();
