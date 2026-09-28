/* ============================================================
   ARTICOLI JOURNAL — fonte unica condivisa tra:
   - il carosello "Journal" della home (index.html, #wTrack)
   - la griglia archivio di journal.html (#journalGrid)

   Aggiungere/modificare/rimuovere una riga qui aggiorna
   automaticamente entrambe le pagine: non serve più tenere
   sincronizzate a mano due liste separate.

   Campi: id, href, img, alt, title, desc, category
   (category deve combaciare con uno dei data-filter della
   barra filtri di journal.html: eventi, dietro-le-quinte,
   looks, magazine, boutique)
   ============================================================ */
window.ARTICOLI_JOURNAL = [
  {
    id: 'aw26',
    href: 'looks.html',
    img: 'images/l9b.webp',
    alt: 'Collezione Autunno/Inverno 2026',
    title: 'Collezione Autunno/Inverno 2026',
    desc: 'Tessuti heritage e linee contemporanee per un guardaroba che vive la stagione, non la insegue.',
    category: 'looks'
  },
  {
    id: 'den-haag',
    href: 'journal-den-haag.html',
    img: 'images/2dh.webp',
    alt: 'Nuova Apertura, Den Haag',
    title: 'Nuova Apertura, Den Haag',
    desc: 'Un nuovo spazio sofisticato e accogliente nel cuore dell\u2019Europa, per vivere l\u2019esperienza Doppelg\u00e4nger.',
    category: 'eventi'
  },
  {
    id: 'sartoria-boutique',
    href: 'journal-sartoria.html',
    img: 'images/sartoria.webp',
    alt: 'Sartoria in Boutique',
    title: 'Sartoria in Boutique',
    desc: 'Un servizio su misura per chi cerca l\u2019abito perfetto: prenota il tuo appuntamento nelle nostre boutique.',
    category: 'eventi'
  },
  {
    id: 'chi-siamo',
    href: 'journal-chi-siamo.html',
    img: 'images/tt.webp',
    alt: 'Chi Siamo',
    title: 'Chi Siamo',
    desc: 'Sartorialit\u00e0 anglosassone e tradizione italiana: un lusso accessibile per l\u2019uomo contemporaneo.',
    category: 'dietro-le-quinte'
  },
  {
    id: 'esperienza-boutique',
    href: 'journal-esperienza-boutique.html',
    img: 'images/yu.webp',
    alt: 'Esperienza in Boutique',
    title: 'Esperienza in Boutique',
    desc: 'Entrare in una nostra boutique significa vivere un\u2019esperienza d\u2019acquisto unica, dove l\u2019eleganza \u00e8 accessibile a tutti.',
    category: 'boutique'
  },
  {
    id: 'cappotti-stagione',
    href: '#',
    img: 'images/coa.webp',
    alt: 'Cappotti uomo',
    title: 'I Cappotti della Stagione',
    desc: 'Doppiopetto, monopetto, cammello: i capispalla che definiscono il guardaroba invernale.',
    category: 'magazine'
  },
  {
    id: 'cinema',
    href: '#',
    img: 'images/gia.webp',
    alt: 'Look da cinema in Doppelg\u00e4nger',
    title: 'Cinema &amp; Doppelg\u00e4nger',
    desc: 'Dal set alla vita di tutti i giorni: sartorialit\u00e0 essenziale, tagli puliti e una naturalezza che davanti alla macchina da presa fa la differenza.',
    category: 'looks'
  },
  {
    id: 'guida-scarpe',
    href: '#',
    img: 'images/ac1.webp',
    alt: 'Scarpe eleganti',
    title: 'Guida alle Scarpe Eleganti',
    desc: 'Derby, mocassini, stringate: come scegliere il modello giusto per ogni occasione.',
    category: 'magazine'
  }
];