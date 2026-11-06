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

---

## Barra categorie nella toolbar (stile COS)

**Cosa è cambiato**

| | Prima | Dopo |
|---|---|---|
| Toolbar collezioni | `[15 prodotti] [icone] \| [Filtra e ordina]` | `[≡ Filtra e ordina] — [categorie] — [icone]` (classe `.products-toolbar--cos`) |
| Contatore "15 prodotti" | Visibile a sinistra | Solo screen reader (`.visually-hidden`), `filtri.js` continua ad aggiornarlo |
| Categorie | Solo nel drawer `#filtersTypes` | In linea, tra filtro e icone, generate da `js/category-bar.js` |
| Frecce `‹ ›` | — | Compaiono quando la barra trabocca, scorrono il contenuto |
| Tablet | — | Categorie centrate quando entrano tutte |
| Smartphone | — | Categorie su riga sopra, `[≡ Filtra e ordina]` + icone sotto |

**Comportamento**: click su una categoria → attiva solo quel tipo nel drawer e chiama `window.DGFiltri.applica()`. Gli altri filtri restano attivi. Prima voce (label via `data-reset-label`) resetta il filtro tipo. La barra si sincronizza anche quando i filtri vengono cambiati dal drawer (evento `dg:filtri-applicati`).

**Allineamenti** (misurati sull'inchiostro delle icone):
- Icona filtro = prima icona header (globo/hamburger)
- Ultima icona griglia = carrello

**File**: `js/category-bar.js` (nuovo, 184 righe), `css/collezione.css` (blocco `.products-toolbar--cos`), `ai-2026.html`, `cerimonia.html`, `essential.html`, `outlet-abbigliamento.html` (classe + script), `js/filtri.js` (`window.DGFiltri`, evento `dg:filtri-applicati`).

---

## Filtro colore (data-colors)

**Bug risolti**

1. `filtri.js` leggeva `card.dataset.color` (singolare) → le card hanno `data-colors` (plurale). Il filtro era inerte (nessun colore veniva mai nascosto).
2. `card.dataset.type` veniva splittato con `.split(/\s+/)` → "T-shirt & Polo" diventava `["T-shirt", "&", "Polo"]`. Ora è `[card.dataset.type]` (valore singolo).

**Dati completati**

- 12 card in `ai-2026.html` senza `data-colors` → aggiunti.
- "cammello" → "beige" (uniforme al chip del drawer).
- Chip "bianco" aggiunto in `js/layout.js`.
- Colori nelle card (6: beige, bianco, blu, grigio, marrone, nero) = chip nel drawer (6).

**File**: `js/filtri.js` (2 righe: `dataset.colors`, `dataset.type`), `js/layout.js` (1 chip), `ai-2026.html` (12 data-colors + 1 rename), `outlet-abbigliamento.html` (1 rename).

---

## Toolbar più vicina alla griglia

**Modifica**: `padding-bottom` di `.products-toolbar` ridotto.

| Breakpoint | Prima | Dopo |
|---|---|---|
| Desktop (>1024px) | 24px | 10px |
| Tablet (≤1024px) | 14px | 6px |
| Mobile (≤640px) | 10px | 4px |

Solo CSS, nessun cambio strutturale. La griglia è più vicina alla barra categorie, la pagina è più compatta.

**File**: `css/collezione.css`.

---

## Filtro colore completato su tutte le collezioni

**Dati completati**

| Pagina | Card con data-colors |
|---|---|
| `ai-2026.html` | 15 / 15 (già fatto) |
| `cerimonia.html` | 7 / 7 (nuovi) |
| `essential.html` | 7 / 7 (nuovi) |
| `outlet-abbigliamento.html` | 15 / 15 (12 nuovi) |

Colori nelle card (6: beige, bianco, blu, grigio, marrone, nero) = chip nel drawer (6). Nessun colore orfano.

**File**: `cerimonia.html` (7 data-colors), `essential.html` (7), `outlet-abbigliamento.html` (12).

---

## Titolo hero collezioni: letter-spacing ridotto

`.hero h1`: `letter-spacing: var(--tr-4)` → `var(--tr-2)` (4px → 2px). Il titolo resta serif, centrato, uppercase, ma meno "barocco". Coerente con la scala dei tracking del sito (bottoni `--tr-15`, badge `--tr-1`).

**File**: `css/collezione.css`.

---

## Drawer quick-add: padding interni mobile/tablet

Rivisti i padding interni su mobile e tablet (≤900px):

| Elemento | Prima | Dopo |
|---|---|---|
| Title margin-bottom | 6px | 10px |
| Price margin-bottom | 12px | 16px |
| Label margin-top (gap prezzo→colore) | 16px | 6px |
| Label margin-bottom | 6px | 8px |
| Details margin | 16px | 20px |
| CTA height | 60px | 56px |
| Info padding top (tablet) | 20px | 24px |

L'altezza del drawer è invariata: 80vh mobile, 90vh tablet. Solo il respiro interno è cambiato.

**File**: `css/quick-add.css`.

---

## Gerarchia tipografica toolbar collezioni

**Modifica**: `.category-bar-item` da 14px a 13px, `.filtri-bar` da 14px a 12px. Anche `.hero h1` in `looks.css` allineato a tracking 2px (era 4px).

| Elemento | Font-size | Ruolo |
|---|---|---|
| Menu principale | 13px | Navigazione top-level |
| Categorie | 13px | Contenuto (navigazione filtro) |
| "Filtra e ordina" | 12px | Azione utility |

**File**: `css/collezione.css` (2 righe), `css/looks.css` (1 riga).
