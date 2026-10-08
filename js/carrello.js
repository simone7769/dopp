/* ============================================================
   CARRELLO.JS — pagina carrello
   Legge le righe salvate da nav.js (sessionStorage 'dg_cart').
   +/−/rimuovi passano dal drawer (già gestito da nav.js), poi
   la pagina si ridisegna: un'unica fonte di verità.
   ⚠️  DIPENDENZA: questo file richiede che nav.js sia caricato
   PRIMA di carrello.js nell'HTML. Il click sui pulsanti della
   pagina è delegato ai pulsanti del drawer in #cartDrawer, i cui
   listener sono installati da nav.js. Non cambiare l'ordine.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'dg_cart';
  var SOGLIA_GRATIS = 99;
  var SPEDIZIONE = 5.99;
  var ALIQUOTA_IVA = 0.22;

  var elItems = document.getElementById('cpItems');
  var elLayout = document.getElementById('cpLayout');
  var elEmpty = document.getElementById('cpEmpty');
  var elShip = document.getElementById('cpShip');
  var elSub = document.getElementById('cpSub');
  var elShipCost = document.getElementById('cpShipCost');
  var elIva = document.getElementById('cpIva');
  var elTotal = document.getElementById('cpTotal');
  if (!elItems) return;

  function leggi() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function num(t) {
    return parseFloat(String(t).replace('€', '').replace(/\./g, '').replace(',', '.')) || 0;
  }
  function eur(n) { return '€ ' + n.toFixed(2).replace('.', ','); }
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render() {
    var lista = leggi();
    var vuoto = lista.length === 0;
    elLayout.hidden = vuoto;
    elEmpty.hidden = !vuoto;
    elShip.hidden = vuoto;
    if (vuoto) { elItems.innerHTML = ''; return; }

    var subtotale = 0;
    elItems.innerHTML = lista.map(function (p) {
      var unit = num(p.prezzo);
      var qty = p.qty || 1;
      subtotale += unit * qty;
      var attr = '';
      if (p.colore) attr += 'Colore: ' + esc(p.colore) + '<br>';
      if (p.taglia) attr += 'Taglia: ' + esc(p.taglia);
      return '' +
        '<article class="cp-item" data-id="' + esc(p.id) + '">' +
          '<div class="cp-item-img"><img src="' + esc(p.img) + '" alt="' + esc(p.nome) + '"></div>' +
          '<div class="cp-item-body">' +
            '<h2 class="cp-item-name">' + esc(p.nome) + '</h2>' +
            '<p class="cp-item-attr">' + attr + '</p>' +
            '<div class="cp-item-cols">' +
              '<div><span class="cp-label">Prezzo unitario</span><span class="cp-val">' + eur(unit) + '</span></div>' +
              '<div><span class="cp-label">Quantità</span>' +
                '<div class="cp-qty">' +
                  '<button type="button" data-act="minus" aria-label="Riduci quantità"' + (qty <= 1 ? ' disabled' : '') + '>−</button>' +
                  '<span>' + qty + '</span>' +
                  '<button type="button" data-act="plus" aria-label="Aumenta quantità">+</button>' +
                '</div></div>' +
              '<div><span class="cp-label">Totale</span><span class="cp-val"><strong>' + eur(unit * qty) + '</strong></span></div>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="cp-remove" data-act="remove" aria-label="Rimuovi dal carrello">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 6l12 12M6 18L18 6"/></svg><span>Rimuovi</span>' +
          '</button>' +
        '</article>';
    }).join('');

    var gratis = subtotale >= SOGLIA_GRATIS;
    var spedizione = gratis ? 0 : SPEDIZIONE;
    var totale = subtotale + spedizione;

    elShip.textContent = gratis
      ? 'Hai diritto alla spedizione gratuita'
      : 'Acquista ' + eur(SOGLIA_GRATIS - subtotale) + ' o più e ottieni la spedizione gratuita';
    elSub.textContent = eur(subtotale);
    elShipCost.textContent = gratis ? 'Gratuita' : eur(spedizione);
    elIva.textContent = eur(totale / (1 + ALIQUOTA_IVA) * ALIQUOTA_IVA);   /* IVA già inclusa */
    elTotal.textContent = eur(totale);
  }

  /* +/−/rimuovi: si clicca il pulsante corrispondente nel drawer, poi si ridisegna */
  elItems.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn || btn.disabled) return;
    var row = btn.closest('.cp-item');
    if (!row) return;
    var drawerRow = document.querySelector('#cartDrawer .cart-item[data-cart-id="' + CSS.escape(row.dataset.id) + '"]');
    if (!drawerRow) return;
    var sel = {
      plus: '.qty-btn[data-action="plus"]',
      minus: '.qty-btn[data-action="minus"]',
      remove: '.cart-item-remove'
    }[btn.dataset.act];
    var target = sel && drawerRow.querySelector(sel);
    if (target) target.click();
    render();
  });

  /* Codice promozionale: demo, nessun codice è valido */
  var promoBtn = document.getElementById('cpPromoBtn');
  var promoMsg = document.getElementById('cpPromoMsg');
  if (promoBtn) {
    promoBtn.addEventListener('click', function () {
      promoMsg.hidden = !document.getElementById('cpPromo').value.trim();
    });
  }

  render();
})();
