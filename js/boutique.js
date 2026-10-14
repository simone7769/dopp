/* ============================================================
   BOUTIQUE.JS — Store Locator (boutique.html)
   Legge window.BOUTIQUES e disegna la lista con:
   - ricerca testuale (città, CAP, nome, indirizzo, telefono)
   - card con rating, servizi, metodi di pagamento, telefono
   Stesso pattern del drawer "Boutique" in nav.js.
   ============================================================ */
(function () {
  'use strict';

  var list = document.getElementById('boutiqueList');
  var search = document.getElementById('boutiqueSearch');
  var countrySelect = document.getElementById('boutiqueCountry');
  var count = document.getElementById('boutiqueCount');
  var intro = document.getElementById('boutiqueIntro');
  if (!list || !search || !count || !countrySelect) return;

  var data = window.BOUTIQUES || [];

  /* Popola il select dei Paesi (una volta sola) */
  (function popolaPaesi() {
    var paesi = [];
    data.forEach(function (b) {
      if (paesi.indexOf(b.country) === -1) paesi.push(b.country);
    });
    paesi.sort(function (a, b) {
      if (a === 'Italia') return -1;
      if (b === 'Italia') return 1;
      return a.localeCompare(b, 'it');
    });
    paesi.forEach(function (p) {
      var opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      countrySelect.appendChild(opt);
    });
  })();

  if (intro && data.length) {
    intro.textContent = 'Scegli tra le ' + data.length + ' Boutique Doppelgänger — utilizza lo Store Locator per trovare quella più vicina a te.';
  }

  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function renderStars(rating) {
    if (!rating) return '';
    var full = Math.floor(rating);
    var half = rating - full >= 0.5 ? 1 : 0;
    var empty = 5 - full - half;
    var s = '';
    for (var i = 0; i < full; i++) s += '★';
    if (half) s += '½';
    for (var j = 0; j < empty; j++) s += '☆';
    return s;
  }

  function render() {
    var q = norm(search.value).trim();
    var paese = countrySelect.value;

    var items = data.filter(function (b) {
      if (paese && b.country !== paese) return false;
      if (!q) return true;
      return norm([b.name, b.city, b.country, b.address, b.phone].join(' ')).indexOf(q) !== -1;
    });

    list.textContent = '';

    if (!items.length) {
      list.appendChild(el('p', 'boutique-empty',
        'Nessuna boutique trovata. Prova con un\'altra città o un altro filtro.'));
    } else {
      items.forEach(function (b) {
        var item = el('article', 'boutique-item');

        item.appendChild(el('h3', null, b.name));

        if (b.rating) {
          var rating = el('div', 'boutique-rating');
          rating.appendChild(el('span', 'boutique-rating-stars', renderStars(b.rating)));
          rating.appendChild(el('span', 'boutique-rating-value', b.rating.toFixed(1)));
          if (b.reviews) rating.appendChild(el('span', 'boutique-rating-reviews', '(' + b.reviews + ')'));
          item.appendChild(rating);
        }

        item.appendChild(el('p', 'boutique-address', b.address));
        item.appendChild(el('p', 'boutique-city', b.city + ', ' + b.country));
        if (b.hours) item.appendChild(el('p', 'boutique-hours', b.hours));

        if (b.services && b.services.indexOf('sartoria') !== -1) {
          item.appendChild(el('p', 'boutique-service', 'Offre il servizio di sartoria'));
        }

        if (b.payments && b.payments.length) {
          item.appendChild(el('p', 'boutique-payments', 'Paga con: ' + b.payments.join(', ')));
        }

        if (b.phone) {
          var tel = b.phone.replace(/\s/g, '');
          var a = el('a', 'boutique-phone', b.phone);
          a.href = 'tel:' + tel;
          item.appendChild(a);
        }

        list.appendChild(item);
      });
    }

    count.textContent = items.length + ' boutique';
  }

  var debounce;
  search.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(render, 120);
  });
  countrySelect.addEventListener('change', render);

  render();
})();
