/* ============================================================
   LAVORA-CON-NOI.JS — 2 tab + form candidatura demo
   - Cambio tab (Posizioni aperte / Candidatura spontanea)
   - Gestione file input (mostra nome file scelto)
   - Submit: controlla email=conferma + privacy + mostra successo
   ============================================================ */
(function () {
  'use strict';

  /* --- Tab --- */
  var tabs = document.querySelectorAll('.lavora-tab');
  var panels = {
    posizioni: document.getElementById('panel-posizioni'),
    spontanea: document.getElementById('panel-spontanea')
  };

  function attivaTab(name) {
    tabs.forEach(function (t) {
      var active = t.dataset.tab === name;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    Object.keys(panels).forEach(function (k) {
      if (!panels[k]) return;
      var active = (k === name);
      panels[k].classList.toggle('active', active);
      if (active) panels[k].removeAttribute('hidden');
      else panels[k].setAttribute('hidden', '');
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { attivaTab(t.dataset.tab); });
  });

  /* Link "candidatura spontanea" dentro il testo */
  document.querySelectorAll('[data-goto-tab]').forEach(function (el) {
    el.addEventListener('click', function () {
      attivaTab(el.dataset.gotoTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* --- File input: mostra nome file --- */
  [['cv', 'cvLabel'], ['lettera', 'letteraLabel']].forEach(function (pair) {
    var input = document.getElementById(pair[0]);
    var label = document.getElementById(pair[1]);
    if (!input || !label) return;
    input.addEventListener('change', function () {
      if (input.files && input.files.length) {
        label.textContent = input.files[0].name;
        label.classList.add('filled');
      } else {
        label.textContent = 'Scegli il file/upload';
        label.classList.remove('filled');
      }
    });
  });

  /* --- Submit --- */
  var form = document.getElementById('lavoraForm');
  var success = document.getElementById('lavoraSuccess');
  var errorEl = document.getElementById('lavoraError');
  if (!form || !success || !errorEl) return;

  function mostraErrore(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.hidden = true;

    var email = document.getElementById('email').value.trim();
    var email2 = document.getElementById('email2').value.trim();
    var privacy = document.getElementById('privacy').checked;
    var cv = document.getElementById('cv');

    if (email !== email2) {
      return mostraErrore('Le due email non coincidono. Controlla e riprova.');
    }
    if (!privacy) {
      return mostraErrore('Devi accettare la Privacy Policy per procedere.');
    }
    if (!cv.files || !cv.files.length) {
      return mostraErrore('Allega il tuo CV per procedere.');
    }

    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
