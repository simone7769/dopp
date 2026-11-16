/* ============================================================
   GUIDA-TAGLIE.JS — popola la lista categorie e apre il modale
   con immagine + tabella misure per ogni categoria.

   I dati delle tabelle stanno in js/guida-taglie-dati.js (fonte
   unica, condivisa con il drawer delle schede prodotto): per
   aggiornare una tabella o aggiungere un'immagine modifica quel file.
   ============================================================ */
(function () {
  'use strict';

  /* DATI — per ogni categoria: id, nome, immagine, colonne, righe
     (definiti in js/guida-taglie-dati.js, da caricare prima di questo file) */
  var MISURE = window.DG_MISURE || [];

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
