/* ============================================================
   CONFERMA.JS — conferma ordine (demo)
   Legge l'ordine salvato da checkout.js ('dg_order').
   ============================================================ */
(function () {
  'use strict';

  var ordine = null;
  try { ordine = JSON.parse(sessionStorage.getItem('dg_order')); } catch (e) {}
  if (!ordine || !ordine.articoli) { location.replace('index.html'); return; }

  function $(id) { return document.getElementById(id); }
  function num(t) { return parseFloat(String(t).replace('€', '').replace(/\./g, '').replace(',', '.')) || 0; }
  function eur(n) { return '€ ' + n.toFixed(2).replace('.', ','); }
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  $('cfEmail').textContent = ordine.email;
  $('cfNum').textContent = ordine.numero;
  $('cfPagamento').textContent = ordine.pagamento;

  if (ordine.consegna === 'boutique') {
    $('cfConsegnaLabel').textContent = 'Ritiro in boutique';
    $('cfConsegna').textContent = ordine.boutique || 'Doppelgänger Roma';
    $('cfNext').textContent = 'Ti invieremo una e-mail non appena l’ordine sarà pronto per il ritiro. Porta con te un documento d’identità.';
  } else {
    var a = ordine.indirizzo || {};
    $('cfConsegnaLabel').textContent = 'Consegna a domicilio';
    $('cfConsegna').innerHTML = [
      esc((a.nome || '') + ' ' + (a.cognome || '')).trim(),
      esc(a.via) + (a.interno ? ', ' + esc(a.interno) : ''),
      esc((a.cap || '') + ' ' + (a.citta || '') + (a.provincia ? ' (' + a.provincia + ')' : '')).trim(),
      esc(a.paese)
    ].filter(Boolean).join('<br>');
    $('cfNext').textContent = 'Ti invieremo una e-mail con il numero di tracciamento appena l’ordine sarà affidato al corriere.';
  }

  $('cfItems').innerHTML = ordine.articoli.map(function (p) {
    var qty = p.qty || 1;
    var attr = [p.colore, p.taglia ? 'Taglia ' + p.taglia : ''].filter(Boolean).map(esc).join(' · ');
    return '<div class="co-line">' +
      '<div class="co-thumb"><img src="' + esc(p.img) + '" alt="' + esc(p.nome) + '"><b>' + qty + '</b></div>' +
      '<div><p class="co-line-name">' + esc(p.nome) + '</p><p class="co-line-attr">' + attr + '</p></div>' +
      '<p class="co-line-price">' + eur(num(p.prezzo) * qty) + '</p></div>';
  }).join('');

  var t = ordine.totali || {};
  $('cfSub').textContent = eur(t.subtotale || 0);
  $('cfShip').textContent = t.spedizione ? eur(t.spedizione) : 'Gratuita';
  $('cfIva').textContent = eur(t.iva || 0);
  $('cfTotal').textContent = eur(t.totale || 0);
})();
