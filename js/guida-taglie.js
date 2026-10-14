/* ============================================================
   GUIDA-TAGLIE.JS — popola la lista categorie e apre il modale
   con immagine + tabella misure per ogni categoria.

   Per aggiornare una tabella: modifica l'array MISURE qui sotto.
   Per aggiungere un'immagine: carica il file in
   images/guida-taglie/<id>.webp e imposta il campo "img".
   ============================================================ */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     DATI — per ogni categoria: id, nome, immagine, colonne, righe
     I dati sono quelli reali pubblicati sul sito Doppelgänger.
     ---------------------------------------------------------- */
  var MISURE = [
    {
      id: 'abiti', nome: 'Abiti', img: 'images/guida-taglie/abiti.webp',
      colonne: ['Taglia', 'Altezza', 'Interno gamba', 'Torace', 'Vita', 'Fianchi'],
      righe: [
        ['44', '179', '83', '90 – 94', '76 – 80', '92 – 96'],
        ['46', '179', '84', '94 – 98', '80 – 84', '96 – 100'],
        ['48', '180', '84', '98 – 102', '84 – 88', '100 – 104'],
        ['50', '181', '84', '102 – 106', '88 – 92', '104 – 108'],
        ['52', '182', '85', '106 – 110', '92 – 96', '108 – 112']
      ]
    },
    {
      id: 'giacche', nome: 'Giacche', img: 'images/guida-taglie/giacche.webp',
      colonne: ['Taglia', 'Altezza', 'Torace', 'Vita', 'Braccio'],
      righe: [
        ['S', '179', '90 – 96', '76 – 82', '84'],
        ['M', '180', '96 – 102', '82 – 88', '86'],
        ['L', '182', '102 – 108', '88 – 94', '87'],
        ['XL', '183', '108 – 114', '94 – 100', '89']
      ]
    },
    {
      id: 'cappotti', nome: 'Cappotti', img: 'images/guida-taglie/cappotti.webp',
      colonne: ['Taglia', 'Altezza', 'Torace', 'Vita', 'Braccio'],
      righe: [
        ['S', '179', '90 – 96', '76 – 82', '84'],
        ['M', '180', '96 – 102', '82 – 88', '86'],
        ['L', '182', '102 – 108', '88 – 94', '87'],
        ['XL', '183', '108 – 114', '94 – 100', '89']
      ]
    },
    {
      id: 'impermeabili', nome: 'Impermeabili', img: 'images/guida-taglie/impermeabili.webp',
      colonne: ['Taglia', 'Altezza', 'Torace', 'Vita', 'Braccio'],
      righe: [
        ['S', '179', '90 – 96', '76 – 82', '84'],
        ['M', '180', '96 – 102', '82 – 88', '86'],
        ['L', '182', '102 – 108', '88 – 94', '87'],
        ['XL', '183', '108 – 114', '94 – 100', '89']
      ]
    },
    {
      id: 'gilet', nome: 'Gilet', img: 'images/guida-taglie/gilet.webp',
      colonne: ['Taglia', 'Altezza', 'Torace', 'Vita', 'Braccio'],
      righe: [
        ['S', '179', '90 – 96', '76 – 82', '84'],
        ['M', '180', '96 – 102', '82 – 88', '86'],
        ['L', '182', '102 – 108', '88 – 94', '87'],
        ['XL', '183', '108 – 114', '94 – 100', '89'],
        ['XXL', '184', '114 – 120', '100 – 107', '90']
      ]
    },
    {
      id: 'camicie-classiche-regular', nome: 'Camicie classiche regular fit', img: 'images/guida-taglie/camicie-classiche-regular.webp',
      colonne: ['Taglia', 'Torace', 'Vita', 'Braccio', 'Lungh. prodotto', 'Spalla a spalla'],
      righe: [
        ['37', '96', '86', '65', '75', '41,5'],
        ['38', '100', '90', '66', '76', '43'],
        ['39', '104', '94', '67', '77', '44,5'],
        ['40', '108', '98', '68', '78', '46'],
        ['41', '112', '102', '69', '79', '47,5']
      ]
    },
    {
      id: 'camicie-classiche-slim', nome: 'Camicie classiche slim fit', img: 'images/guida-taglie/camicie-classiche-slim.webp',
      colonne: ['Taglia', 'Torace', 'Vita', 'Braccio', 'Lungh. prodotto', 'Spalla a spalla'],
      righe: [
        ['37', '96', '90', '65', '75', '41,5'],
        ['38', '100', '94', '66', '76', '43'],
        ['39', '104', '98', '67', '77', '44,5'],
        ['40', '108', '102', '68', '78', '46'],
        ['41', '112', '106', '69', '79', '47,5']
      ]
    },
    {
      id: 'camicie-casual-regular', nome: 'Camicie casual regular fit', img: 'images/guida-taglie/camicie-casual-regular.webp',
      colonne: ['Taglia', 'Torace', 'Vita', 'Braccio', 'Lungh. prodotto', 'Spalla a spalla'],
      righe: [
        ['S', '104', '94', '67', '77', '44,5'],
        ['M', '108', '98', '68', '78', '46'],
        ['L', '112', '102', '69', '79', '47,5'],
        ['XL', '116', '106', '70', '80', '49'],
        ['XXL', '120', '110', '70,5', '81', '50,5']
      ]
    },
    {
      id: 'camicie-casual-slim', nome: 'Camicie casual slim fit', img: 'images/guida-taglie/camicie-casual-slim.webp',
      colonne: ['Taglia', 'Torace', 'Vita', 'Braccio', 'Lungh. prodotto', 'Spalla a spalla'],
      righe: [
        ['XS', '100', '94', '66', '76', '43'],
        ['S', '104', '98', '67', '77', '44,5'],
        ['M', '108', '102', '68', '78', '46'],
        ['L', '112', '106', '69', '79', '47,5'],
        ['XL', '116', '110', '70', '80', '49']
      ]
    },
    {
      id: 'giubbotti', nome: 'Giubbotti', img: 'images/guida-taglie/giubbotti.webp',
      colonne: ['Taglia', 'Altezza', 'Torace', 'Vita', 'Braccio'],
      righe: [
        ['S', '179', '90 – 96', '76 – 82', '84'],
        ['M', '180', '96 – 102', '82 – 88', '86'],
        ['L', '182', '102 – 108', '88 – 94', '87'],
        ['XL', '183', '108 – 114', '94 – 100', '89']
      ]
    },
    {
      id: 'pantaloni', nome: 'Pantaloni', img: 'images/guida-taglie/pantaloni.webp',
      colonne: ['Taglia', 'Altezza', 'Vita', 'Fianchi', 'Interno gamba'],
      righe: [
        ['44', '179', '76 – 80', '92 – 96', '83'],
        ['46', '179', '80 – 84', '96 – 100', '84'],
        ['48', '180', '84 – 88', '100 – 104', '84'],
        ['50', '181', '88 – 92', '104 – 108', '84'],
        ['52', '182', '92 – 96', '108 – 112', '85']
      ]
    },
    {
      id: 'bermuda', nome: 'Bermuda', img: 'images/guida-taglie/bermuda.webp',
      colonne: ['Taglia', 'Altezza', 'Vita', 'Fianchi', 'Interno gamba'],
      righe: [
        ['XS', '178', '70 – 76', '86 – 92', '83'],
        ['S', '179', '76 – 82', '92 – 98', '83'],
        ['M', '180', '82 – 88', '98 – 104', '84'],
        ['L', '182', '88 – 94', '104 – 110', '84'],
        ['XL', '183', '94 – 100', '110 – 116', '85']
      ]
    },
    {
      id: 'cappelli', nome: 'Cappelli', img: 'images/guida-taglie/cappelli.webp',
      colonne: ['Taglia', 'Testa (cm)'],
      righe: [
        ['1', '56'],
        ['2', '58'],
        ['3', '60']
      ]
    },
    {
      id: 'maglie', nome: 'Maglie', img: 'images/guida-taglie/maglie.webp',
      colonne: ['Taglia', 'Altezza', 'Torace', 'Vita', 'Braccio'],
      righe: [
        ['S', '179', '90 – 96', '76 – 82', '84'],
        ['M', '180', '96 – 102', '82 – 88', '86'],
        ['L', '182', '102 – 108', '88 – 94', '87'],
        ['XL', '183', '108 – 114', '94 – 100', '89'],
        ['XXL', '184', '114 – 120', '100 – 107', '90']
      ]
    },
    {
      id: 'polo-tshirt', nome: 'Polo e T-shirt', img: 'images/guida-taglie/polo-tshirt.webp',
      colonne: ['Taglia', 'Altezza', 'Torace', 'Vita', 'Braccio'],
      righe: [
        ['S', '179', '90 – 96', '76 – 82', '84'],
        ['M', '180', '96 – 102', '82 – 88', '86'],
        ['L', '182', '102 – 108', '88 – 94', '87'],
        ['XL', '183', '108 – 114', '94 – 100', '89'],
        ['XXL', '184', '114 – 120', '100 – 107', '90']
      ]
    },
    {
      id: 'guanti', nome: 'Guanti', img: 'images/guida-taglie/guanti.webp',
      colonne: ['Taglia', 'Lunghezza palmo', 'Circonferenza palmo'],
      righe: [
        ['X/S', '25,5', '11'],
        ['M/XL', '26,5', '11,8']
      ]
    },
    {
      id: 'costumi', nome: 'Costumi', img: 'images/guida-taglie/costumi.webp',
      colonne: ['Taglia', 'Vita', 'Fianchi'],
      righe: [
        ['S', '76 – 82', '92 – 98'],
        ['M', '82 – 88', '98 – 104'],
        ['L', '88 – 94', '104 – 110'],
        ['XL', '94 – 100', '110 – 116'],
        ['XXL', '100 – 107', '116 – 122']
      ]
    },
    {
      id: 'scarpe', nome: 'Scarpe', img: 'images/guida-taglie/scarpe.webp',
      colonne: ['Taglia', 'Circonferenza', 'Lunghezza del piede'],
      righe: [
        ['36', '21,4', '21,8'],
        ['37', '21,9', '22,7'],
        ['38', '22,4', '23,6'],
        ['39', '22,9', '24,5'],
        ['40', '23,4', '25,4']
      ]
    }
  ];

  /* ----------------------------------------------------------
     Costruzione lista
     ---------------------------------------------------------- */
  var listEl = document.getElementById('guideList');
  if (!listEl) return;

  var frag = document.createDocumentFragment();
  MISURE.forEach(function (cat) {
    var li = document.createElement('li');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = cat.nome;
    btn.dataset.id = cat.id;
    if (cat.comingSoon) {
      btn.disabled = true;
    } else {
      btn.addEventListener('click', function () { apriModale(cat); });
    }
    li.appendChild(btn);
    frag.appendChild(li);
  });
  listEl.appendChild(frag);

  /* ----------------------------------------------------------
     Modale
     ---------------------------------------------------------- */
  var overlay = document.getElementById('sizeModal');
  var closeBtn = document.getElementById('sizeModalClose');
  var titleEl = document.getElementById('sizeModalTitle');
  var imgEl = document.getElementById('sizeModalImage');
  var placeholderEl = document.getElementById('sizeModalImagePlaceholder');
  var tableEl = document.getElementById('sizeModalTable');
  if (!overlay || !closeBtn || !titleEl || !tableEl) return;

  var lastFocused = null;

  function apriModale(cat) {
    lastFocused = document.activeElement;

    titleEl.textContent = 'Confronta le tue misure con questa tabella.';

    /* Immagine */
    imgEl.alt = cat.nome;
    imgEl.src = cat.img || '';

    /* Tabella */
    tableEl.textContent = '';

    var thead = document.createElement('thead');
    var trh = document.createElement('tr');
    cat.colonne.forEach(function (c) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.textContent = c;
      trh.appendChild(th);
    });
    thead.appendChild(trh);
    tableEl.appendChild(thead);

    var tbody = document.createElement('tbody');
    cat.righe.forEach(function (riga) {
      var tr = document.createElement('tr');
      riga.forEach(function (cella) {
        var td = document.createElement('td');
        td.textContent = cella;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tableEl.appendChild(tbody);

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(function () { closeBtn.focus(); }, 200);
  }

  function chiudiModale() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  closeBtn.addEventListener('click', chiudiModale);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) chiudiModale();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) chiudiModale();
  });

  /* Bottoni cm / in (placeholder, non cambiano i dati) */
  overlay.querySelectorAll('.size-modal-units button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      overlay.querySelectorAll('.size-modal-units button').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });
})();
