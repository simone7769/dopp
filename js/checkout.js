/* ============================================================
   CHECKOUT.JS — checkout in una pagina (demo)
   Legge il carrello da sessionStorage ('dg_cart', scritto da nav.js),
   calcola i totali, valida il modulo e salva l'ordine in 'dg_order'
   per la pagina di conferma. Nessun pagamento reale.
   ============================================================ */
(function () {
  'use strict';

  var CART_KEY = 'dg_cart';
  var ORDER_KEY = 'dg_order';
  var SOGLIA_GRATIS = 99;
  var SPEDIZIONE = 5.99;
  var ALIQUOTA_IVA = 0.22;

  function leggi() {
    try { return JSON.parse(sessionStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }
  function num(t) { return parseFloat(String(t).replace('€', '').replace(/\./g, '').replace(',', '.')) || 0; }
  function eur(n) { return '€ ' + n.toFixed(2).replace('.', ','); }
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(id) { return document.getElementById(id); }

  var lista = leggi();
  if (!lista.length) { location.replace('carrello.html'); return; }

  var form = $('coForm');
  var subtotale = 0;
  $('coItems').innerHTML = lista.map(function (p) {
    var qty = p.qty || 1;
    var tot = num(p.prezzo) * qty;
    subtotale += tot;
    var attr = [p.colore, p.taglia ? 'Taglia ' + p.taglia : ''].filter(Boolean).map(esc).join(' · ');
    return '<div class="co-line">' +
      '<div class="co-thumb"><img src="' + esc(p.img) + '" alt="' + esc(p.nome) + '"><b>' + qty + '</b></div>' +
      '<div><p class="co-line-name">' + esc(p.nome) + '</p><p class="co-line-attr">' + attr + '</p></div>' +
      '<p class="co-line-price">' + eur(tot) + '</p></div>';
  }).join('');

  function consegna() { return form.querySelector('input[name="consegna"]:checked').value; }

  var totali = {};
  function aggiornaTotali() {
    var boutique = consegna() === 'boutique';
    var spedizione = (boutique || subtotale >= SOGLIA_GRATIS) ? 0 : SPEDIZIONE;
    var totale = subtotale + spedizione;
    totali = { subtotale: subtotale, spedizione: spedizione, totale: totale, iva: totale / (1 + ALIQUOTA_IVA) * ALIQUOTA_IVA };
    $('coSub').textContent = eur(subtotale);
    $('coShip').textContent = spedizione === 0 ? 'Gratuita' : eur(spedizione);
    $('coIva').textContent = eur(totali.iva);
    $('coTotal').textContent = eur(totale);
    $('coSubmit').textContent = 'Paga ora · ' + eur(totale);
  }

  /* --- Boutique: elenco da boutiques.js se disponibile --- */
  (function popolaBoutique() {
    var sel = $('coBoutique');
    var src = window.BOUTIQUES || window.BOUTIQUE || window.boutiques;
    var righe = src ? (Array.isArray(src) ? src : Object.keys(src).map(function (k) { return src[k]; })) : [];
    righe.forEach(function (b) {
      if (!b || typeof b !== 'object') return;
      var nome = b.nome || b.name || b.titolo || b.title;
      if (!nome) return;
      var citta = b.citta || b['città'] || b.city;
      var o = document.createElement('option');
      o.textContent = citta && String(nome).indexOf(citta) === -1 ? nome + ' — ' + citta : nome;
      o.value = o.textContent;
      sel.appendChild(o);
    });
    if (sel.options.length === 1) {
      var o = document.createElement('option');
      o.value = o.textContent = 'Doppelgänger Roma';
      sel.appendChild(o);
    }
  })();

  /* --- Cambio metodo di consegna --- */
  function aggiornaConsegna() {
    var boutique = consegna() === 'boutique';
    $('coAddress').hidden = boutique;
    $('coAddress').disabled = boutique;
    $('coBoutiqueBox').hidden = !boutique;
    $('coBoutique').disabled = !boutique;
    aggiornaTotali();
  }
  form.querySelectorAll('input[name="consegna"]').forEach(function (r) { r.addEventListener('change', aggiornaConsegna); });

  /* --- Cambio metodo di pagamento: i campi carta solo per "Carta di credito" --- */
  function aggiornaPagamento() {
    var carta = form.querySelector('input[name="pagamento"]:checked').value === 'Carta di credito';
    form.querySelectorAll('.co-pay-opt').forEach(function (opt) {
      opt.classList.toggle('open', !!opt.querySelector('input:checked') && carta);
    });
    $('coCard').querySelectorAll('input').forEach(function (i) { i.disabled = !carta; });
  }
  form.querySelectorAll('input[name="pagamento"]').forEach(function (r) { r.addEventListener('change', aggiornaPagamento); });

  /* --- Validazione + invio --- */
  form.addEventListener('input', function (e) {
    var f = e.target.closest('.co-field');
    if (f) f.classList.remove('invalid');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var primo = null;
    form.querySelectorAll('input[required], select[required]').forEach(function (el) {
      if (el.matches(':disabled')) return;
      var v = el.value.trim();
      var ok = v !== '' && (el.type !== 'email' || /^\S+@\S+\.\S+$/.test(v));
      var box = el.closest('.co-field');
      if (box) box.classList.toggle('invalid', !ok);
      if (!ok && !primo) primo = el;
    });
    $('coError').hidden = !primo;
    if (primo) { primo.focus(); return; }

    var boutique = consegna() === 'boutique';
    var ordine = {
      numero: 'DG-' + String(Math.floor(100000 + Math.random() * 900000)),
      data: new Date().toISOString(),
      email: $('coEmail').value.trim(),
      consegna: consegna(),
      boutique: boutique ? $('coBoutique').value : '',
      indirizzo: boutique ? null : {
        nome: $('coNome').value.trim(),
        cognome: $('coCognome').value.trim(),
        via: $('coInd').value.trim(),
        interno: $('coInd2').value.trim(),
        cap: $('coCap').value.trim(),
        citta: $('coCitta').value.trim(),
        provincia: $('coProv').value.trim(),
        paese: $('coPaese').value,
        telefono: $('coTel').value.trim()
      },
      pagamento: form.querySelector('input[name="pagamento"]:checked').value,
      articoli: lista,
      totali: totali
    };
    try {
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(ordine));
      sessionStorage.removeItem(CART_KEY);   /* carrello svuotato a ordine concluso */
    } catch (err) {}
    location.href = 'conferma.html';
  });

  aggiornaConsegna();
  aggiornaPagamento();
})();
