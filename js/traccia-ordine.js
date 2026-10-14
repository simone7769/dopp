/* ============================================================
   TRACCIA-ORDINE.JS — demo del form "Traccia il tuo ordine"
   - Submit: mostra risultato demo con lo stato di esempio
   - Il numero ordine viene riportato nel risultato
   - Se i campi sono vuoti: errore
   Nessun backend: è una demo statica.
   ============================================================ */
(function () {
  'use strict';

  var form = document.getElementById('trackForm');
  var result = document.getElementById('trackResult');
  var error = document.getElementById('trackError');
  var numberEl = document.getElementById('trackResultNumber');
  var inputNumber = document.getElementById('trackOrderNumber');
  var inputEmail = document.getElementById('trackEmail');
  if (!form || !result || !error || !numberEl) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var num = (inputNumber.value || '').trim();
    var mail = (inputEmail.value || '').trim();

    if (!num || !mail) {
      error.hidden = false;
      result.hidden = true;
      return;
    }

    error.hidden = true;
    // Riconosce se siamo su traccia-ordine o monitora-reso
    var isReso = location.pathname.indexOf('monitora-reso') !== -1;
    numberEl.textContent = (isReso ? 'Reso ordine ' : 'Ordine ') + num;

    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
