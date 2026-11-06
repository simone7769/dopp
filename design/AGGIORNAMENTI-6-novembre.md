# Aggiornamenti alle Specifiche — 6 novembre 2026

Postilla a `Doppelganger_Specifiche_per_agenzia.html` (fermo al 4 novembre) e a `AGGIORNAMENTI-5-novembre.md`.

## Quick-add dal «+»: da pannellino nella card a drawer a due colonne (stile COS)

**Cosa è cambiato**

| | Prima | Dopo |
|---|---|---|
| Contenitore | pannellino in fondo alla card | drawer da destra, `position: fixed`, appeso al `<body>` |
| Larghezza desktop (>900px) | larghezza della card | `clamp(720px, 50vw, 960px)` |
| Layout desktop | colore, taglie, CTA in colonna | due colonne 50/50: foto a sinistra, info a destra |
| Tablet e mobile (≤900px) | come desktop | una colonna a tutta larghezza: foto in striscia orizzontale sopra, info sotto |
| Sfondo | nessuno | overlay scuro (come carrello e login), scroll della pagina bloccato |

**Colonna sinistra** (`.quick-add-gallery`): le foto della scheda, prese dalla striscia dello slider della card (`card-slider.js`; senza slider: foto + still-life). Scorrono in verticale a tutta altezza; su ≤900px sono una striscia orizzontale con scroll-snap.

**Colonna destra** (`.quick-add-info`): titolo, prezzo (con barrato e sconto per l'outlet), colore con nome, griglia taglie a 4 colonne, «Aggiungi al carrello», link «Dettagli del prodotto». Ha il proprio `overflow-y: auto`.

**Accessibilità**: `role="dialog"` con `aria-modal` e `aria-labelledby` sul titolo; focus trap (Tab e Maiusc+Tab restano nel drawer); chiusura con Esc, con ×, con clic sull'overlay e dopo «Aggiunto ✓»; il focus torna al «+» che aveva aperto il drawer; messaggio «Seleziona una taglia» (`role="alert"`) se si aggiunge senza taglia; la colonna foto è raggiungibile da tastiera.

**Invariato**: `Cart.add()` e il formato dell'articolo, `data-colors`, lettura di nome, prezzo e foto dalla card, `.img-main` per `card-slider.js` e popup «Articoli simili». Carrello, login e gli altri drawer non cambiano. Il «+» resta nascosto a 2 e 3 colonne su mobile (≤640px) e visibile a 1 colonna, dove il drawer è a una colonna.

**File**: `css/quick-add.css` (nuovo, unica fonte), `js/quick-add.js` (riscritto), `css/collezione.css` e `css/vetrina.css` (tolte le regole `.quick-add*` copiate in entrambi), `<link>` a `quick-add.css` in `ai-2026.html`, `cerimonia.html`, `essential.html`, `outlet-abbigliamento.html`, `vetrina.html`.
