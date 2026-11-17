/* ============================================================
   MENU-DATI.JS — Fonte unica del menu (17 nov 2026)
   Da qui layout.js genera sia il pannello desktop sia il menu
   mobile: per cambiare una voce o un'immagine si tocca solo
   questo file. Va caricato PRIMA di js/layout.js.

   Tassonomia: categorie di doppelganger.it ripulite dalle
   ridondanze (camicie per stile, «Giubbotti e Cappotti» in un
   solo gruppo, capi in maglia solo in Maglie; via «Linea
   Doppiopetto», «In Evidenza», «-50%»). Costumi, Bermuda e
   Guanti esistono solo nell'Outlet del sito vero: per ora fuori.

   CARD   = immagini del pannello, per chiave
            { img, label, href }
   TABS   = i tre tab con pannello.
            cards = chiavi di CARD mostrate a destra, nell'ordine,
                    fisse per tab (non cambiano al passaggio):
                    4 Abbigliamento, 3 Accessori, 4 Outlet
            items = voci { label, href, subs? }
                    subs = sottocategorie { label, href }
            mobileHighlights = sul telefono mostra le card come
                    link in fondo all'accordion
   LINK   = voci della riga dei tab che sono solo link
   ============================================================ */
(function () {
  'use strict';

  /* Link alla collezione principale con il tipo già filtrato:
     filtri.js legge ?tipo= e attiva il filtro corrispondente. */
  function tipo(pagina, valore) {
    return pagina + '?tipo=' + encodeURIComponent(valore);
  }
  var AI = 'ai-2026.html';
  var OUT = 'outlet-abbigliamento.html';

  var CARD = {
    /* Abbigliamento: collezioni */
    capsule:         { img: 'images/bomber-capsule.webp',     label: 'La Capsule',             href: 'vetrina.html' },
    ai26:            { img: 'images/megamenu-ai-2026.webp',   label: 'Autunno/Inverno 2026',   href: AI },
    essential:       { img: 'images/bm.webp',                 label: 'Essential',              href: 'essential.html' },
    cerimonia:       { img: 'images/ceri.webp',               label: 'Cerimonia',              href: 'cerimonia.html' },

    /* Accessori */
    derby:           { img: 'images/ce3.webp', label: 'Derby in pelle',            href: tipo('cerimonia.html', 'Accessori') },
    cravattaMacro:   { img: 'images/ce4.webp', label: 'Cravatta macro fantasia',   href: tipo('cerimonia.html', 'Accessori') },
    calze:           { img: 'images/ba3.webp', label: 'Calze',                     href: tipo('essential.html', 'Accessori') },

    /* Outlet */
    outletAbb:       { img: 'images/z.webp',   label: 'Abbigliamento',             href: OUT },
    outletWork:      { img: 'images/bw.webp',  label: 'Back to Work',              href: OUT },
    outletAcc:       { img: 'images/a80.webp', label: 'Accessori',                 href: OUT },
    outletUltimi:    { img: 'images/ls1.webp', label: 'Ultimi pezzi',              href: OUT }
  };

  var ABBIGLIAMENTO = [
    { label: 'Abiti', href: tipo(AI, 'Abiti'), subs: [
      { label: 'Componibili', href: tipo(AI, 'Abiti') },
      { label: 'Monopetto',   href: tipo(AI, 'Abiti') },
      { label: 'Doppiopetto', href: tipo(AI, 'Abiti') },
      { label: 'Smoking',     href: tipo('cerimonia.html', 'Abiti') }
    ] },
    { label: 'Giacche', href: tipo(AI, 'Giacche'), subs: [
      { label: 'Monopetto',   href: tipo(AI, 'Giacche') },
      { label: 'Doppiopetto', href: tipo(AI, 'Giacche') }
    ] },
    { label: 'Giubbotti e Cappotti', href: tipo(AI, 'Cappotti'), subs: [
      { label: 'Tessuto tecnico', href: tipo(AI, 'Giacche') },
      { label: 'Cappotti',        href: tipo(AI, 'Cappotti') },
      { label: 'Impermeabili',    href: tipo(AI, 'Cappotti') },
      { label: 'Ecopelle',        href: tipo(AI, 'Giacche') },
      { label: 'Smanicati',       href: tipo(AI, 'Giacche') }
    ] },
    { label: 'Camicie', href: tipo(AI, 'Camicie'), subs: [
      { label: 'Classiche', href: tipo(AI, 'Camicie') },
      { label: 'Casual',    href: tipo(AI, 'Camicie') },
      { label: 'Denim',     href: tipo(AI, 'Camicie') },
      { label: 'Non stiro', href: tipo(AI, 'Camicie') }
    ] },
    { label: 'Maglie', href: tipo('essential.html', 'Maglieria'), subs: [
      { label: 'Girocollo',         href: tipo('essential.html', 'Maglieria') },
      { label: 'Cardigan',          href: tipo('essential.html', 'Maglieria') },
      { label: 'Giacche in maglia', href: tipo(AI, 'Giacche') },
      { label: 'Polo in maglia',    href: tipo(AI, 'T-shirt & Polo') }
    ] },
    { label: 'Pantaloni', href: tipo(AI, 'Pantaloni'), subs: [
      { label: 'Chino',    href: tipo(AI, 'Pantaloni') },
      { label: 'Classici', href: tipo(AI, 'Pantaloni') },
      { label: 'Jeans',    href: tipo(AI, 'Denim') }
    ] },
    { label: 'Polo e T-shirt', href: tipo(AI, 'T-shirt & Polo'), subs: [
      { label: 'Polo',    href: tipo(AI, 'T-shirt & Polo') },
      { label: 'T-shirt', href: tipo('essential.html', 'T-shirt & Polo') }
    ] },
    { label: 'Gilet', href: AI }
  ];

  var ACCESSORI = [
    { label: 'Scarpe',            href: '#' },
    { label: 'Profumi',           href: '#' },
    { label: 'Cravatte',          href: '#' },
    { label: 'Cinture',           href: '#' },
    { label: 'Pochette',          href: '#' },
    { label: 'Cappelli',          href: '#' },
    { label: 'Papillon',          href: '#' },
    { label: 'Sciarpe e foulard', href: '#' },
    { label: 'Calze',             href: tipo('essential.html', 'Accessori') },
    { label: 'Borse e zaini',     href: '#' },
    { label: 'Bretelle',          href: '#' },
    { label: 'Gemelli',           href: '#' }
  ];

  /* Outlet: nessun albero proprio, stesse categorie con il filtro
     della pagina outlet. Niente sottocategorie. */
  var OUTLET = ABBIGLIAMENTO.map(function (c) {
    var href = c.href.indexOf('?') > -1 ? OUT + c.href.slice(c.href.indexOf('?')) : OUT;
    return { label: c.label, href: href };
  });
  OUTLET.push({ label: 'Accessori e scarpe', href: OUT });

  window.DG_MENU = {
    CARD: CARD,
    LINK: {
      nuovi:   { label: 'Nuovi Arrivi', href: AI },
      journal: { label: 'Journal',      href: 'journal.html' }
    },
    TABS: [
      { id: 'Abbigliamento', label: 'Abbigliamento', all: AI, mobileHighlights: true,
        cards: ['capsule', 'ai26', 'essential', 'cerimonia'], items: ABBIGLIAMENTO },
      { id: 'Accessori', label: 'Accessori', all: '#',
        cards: ['derby', 'cravattaMacro', 'calze'], items: ACCESSORI },
      { id: 'Outlet', label: 'Outlet', all: OUT, allLabel: 'Vedi tutto l\u2019outlet',
        cards: ['outletAbb', 'outletWork', 'outletAcc', 'outletUltimi'], items: OUTLET }
    ]
  };
})();
