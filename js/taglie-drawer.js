/* ============================================================
   TAGLIE-DRAWER.JS — drawer «Guida alle taglie» nelle schede prodotto
   ------------------------------------------------------------
   Si apre dal bottone .pdp-size-guide sotto le taglie.
   · Mostra solo la tabella del capo: categoria = attributo
     data-guide sul bottone (id di js/guida-taglie-dati.js,
     es. data-guide="pantaloni"). Se manca o non esiste si usa
     la prima categoria. Le altre categorie: link alla guida completa.
   · Se l'utente ha già scelto una taglia nella scheda, la riga
     corrispondente è evidenziata.
   · cm / in: conversione reale (1 decimale) di tutte le misure.
   · Il drawer è creato qui e appeso al <body> (come quick-add.js):
     nessun markup da duplicare nelle schede.
   · Dati: js/guida-taglie-dati.js (stessa fonte della pagina
     guida-taglie.html). Stile: fondo di css/prodotto.css.

   Da caricare DOPO nav.js (usa PanelManager per chiudere gli
   altri pannelli) e DOPO guida-taglie-dati.js.
   ============================================================ */
(function () {
  'use strict';

  var MISURE = window.DG_MISURE || [];
  var triggers = document.querySelectorAll('.pdp-size-guide');
  if (!MISURE.length || !triggers.length) return;

  var CM_TO_IN = 0.393701;
  var unit = 'cm';
  var current = MISURE[0];
  var lastFocused = null;

  /* ---------- Costruzione del drawer ---------- */
  var ICON_CLOSE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';

  var overlay = document.createElement('div');
  overlay.className = 'sg-overlay';
  overlay.id = 'sgOverlay';

  var drawer = document.createElement('aside');
  drawer.className = 'sg-drawer';
  drawer.id = 'sgDrawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-labelledby', 'sgTitle');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.inert = true;
  drawer.innerHTML =
    '<div class="sg-header">' +
      '<h3 id="sgTitle">Guida alle taglie</h3>' +
      '<button type="button" class="sg-close" id="sgClose" aria-label="Chiudi">' + ICON_CLOSE + '</button>' +
    '</div>' +
    '<div class="sg-body">' +
      '<h4 class="sg-cat" id="sgCat"></h4>' +
      '<p class="sg-intro">Confronta le tue misure con la tabella per trovare la taglia giusta.</p>' +
      '<div class="sg-tools">' +
        '<span class="sg-caption" id="sgCaption"></span>' +
        '<div class="sg-units" role="radiogroup" aria-label="Unità di misura">' +
          '<button type="button" class="active" role="radio" aria-checked="true" data-unit="cm">cm</button>' +
          '<button type="button" role="radio" aria-checked="false" data-unit="in">in</button>' +
        '</div>' +
      '</div>' +
      '<div class="sg-table-wrap" tabindex="0" role="region" aria-label="Tabella misure" id="sgTableWrap">' +
        '<table class="sg-table" id="sgTable"></table>' +
      '</div>' +
      '<p class="sg-legend" id="sgLegend" hidden>La riga evidenziata è la taglia che hai scelto.</p>' +
      '<p class="sg-legend" id="sgHint" hidden>Scorri di lato per vedere tutte le misure.</p>' +
      '<div class="sg-note">' +
        '<p>Le misure sono indicative e possono variare in base al modello, al tessuto e alla vestibilità del capo.</p>' +
        '<p><a href="#" id="sgContact">Contatta il Servizio Clienti</a> <span aria-hidden="true">·</span> <a href="guida-taglie.html">Tutte le categorie</a></p>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  var closeBtn = drawer.querySelector('#sgClose');
  var catTitle = drawer.querySelector('#sgCat');
  var caption = drawer.querySelector('#sgCaption');
  var tableEl = drawer.querySelector('#sgTable');
  var legend = drawer.querySelector('#sgLegend');
  var hint = drawer.querySelector('#sgHint');
  var tableWrap = drawer.querySelector('#sgTableWrap');
  var unitBtns = drawer.querySelectorAll('.sg-units button');

  /* ---------- Utilità ---------- */
  function findCategory(id) {
    for (var i = 0; i < MISURE.length; i++) {
      if (MISURE[i].id === id) return MISURE[i];
    }
    return null;
  }

  /* "90 – 94" → "35,4 – 37,0"; "41,5" → "16,3" */
  function toInches(txt) {
    return txt.replace(/\d+(?:,\d+)?/g, function (n) {
      var v = parseFloat(n.replace(',', '.')) * CM_TO_IN;
      return v.toFixed(1).replace('.', ',');
    });
  }

  function cleanHeader(txt) {
    return txt.replace(/\s*\((cm|in)\)\s*$/i, '');
  }

  function selectedSize() {
    var b = document.querySelector('.pdp-sizes button.selected');
    return b ? b.textContent.trim() : '';
  }

  /* ---------- Rendering tabella ---------- */
  function render() {
    var cat = current;
    var size = selectedSize();
    var hasCurrent = false;

    caption.textContent = unit === 'cm' ? 'Misure del corpo in centimetri' : 'Misure del corpo in pollici';

    tableEl.textContent = '';

    var cap = document.createElement('caption');
    cap.className = 'sg-visually-hidden';
    cap.textContent = cat.nome + ' — misure in ' + (unit === 'cm' ? 'centimetri' : 'pollici');
    tableEl.appendChild(cap);

    var thead = document.createElement('thead');
    var trh = document.createElement('tr');
    cat.colonne.forEach(function (c) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.textContent = cleanHeader(c);
      trh.appendChild(th);
    });
    thead.appendChild(trh);
    tableEl.appendChild(thead);

    var tbody = document.createElement('tbody');
    cat.righe.forEach(function (riga) {
      var tr = document.createElement('tr');
      riga.forEach(function (cella, i) {
        var cell;
        if (i === 0) {
          cell = document.createElement('th');
          cell.scope = 'row';
          cell.textContent = cella;
        } else {
          cell = document.createElement('td');
          cell.textContent = unit === 'in' ? toInches(cella) : cella;
        }
        tr.appendChild(cell);
      });
      if (size && riga[0] === size) {
        tr.className = 'is-current';
        tr.setAttribute('aria-current', 'true');
        hasCurrent = true;
      }
      tbody.appendChild(tr);
    });
    tableEl.appendChild(tbody);

    legend.hidden = !hasCurrent;
    tableWrap.scrollLeft = 0;
    updateHint();
  }

  /* Mostra il suggerimento solo se la tabella non sta nella larghezza */
  function updateHint() {
    hint.hidden = !(tableWrap.scrollWidth > tableWrap.clientWidth + 1);
  }

  function setCategory(cat) {
    current = cat;
    catTitle.textContent = cat.nome;
    render();
  }

  function setUnit(u) {
    unit = u;
    unitBtns.forEach(function (b) {
      var on = b.getAttribute('data-unit') === u;
      b.classList.toggle('active', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    render();
  }

  /* ---------- Apertura / chiusura ---------- */
  var closeOtherPanels = (typeof PanelManager !== 'undefined')
    ? PanelManager.register(closeDrawer)
    : function () {};

  function openDrawer(trigger) {
    closeOtherPanels();
    lastFocused = trigger || document.activeElement;

    var startCat = findCategory(trigger && trigger.getAttribute('data-guide')) || current;
    setCategory(startCat);

    drawer.inert = false;
    drawer.classList.add('open');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { closeBtn.focus(); }, 200);
  }

  function closeDrawer() {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    if (drawer.contains(document.activeElement)) document.activeElement.blur();
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus({ preventScroll: true });
    }
  }

  /* ---------- Eventi ---------- */
  triggers.forEach(function (btn) {
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.addEventListener('click', function () { openDrawer(btn); });
  });

  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  unitBtns.forEach(function (b) {
    b.addEventListener('click', function () { setUnit(b.getAttribute('data-unit')); });
  });

  /* «Contatta il Servizio Clienti»: chiude la guida e apre il drawer
     contatti già presente nella pagina (gestito da nav.js) */
  drawer.querySelector('#sgContact').addEventListener('click', function (e) {
    e.preventDefault();
    lastFocused = null;
    closeDrawer();
    var opener = document.querySelector('#openContactDrawer, [data-open-contact]');
    if (opener) opener.click();
  });

  window.addEventListener('resize', updateHint);

  document.addEventListener('keydown', function (e) {
    if (!drawer.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }
    if (e.key === 'Tab') {
      /* focus trap: resta dentro il drawer */
      var f = Array.prototype.filter.call(
        drawer.querySelectorAll('button, a[href], [tabindex="0"]'),
        function (el) { return !el.disabled && el.offsetParent !== null; }
      );
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
})();
