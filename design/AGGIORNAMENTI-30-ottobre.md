# Aggiornamenti del 30 ottobre 2026

Postilla alle **Specifiche per l'agenzia** (`Doppelganger_Specifiche_per_agenzia.html`, ferme al 23 ottobre). Le modifiche sotto sono già applicate nella demo ma non compaiono nel documento di presentazione, perché le pagine a dimensione fissa non accettano testo aggiuntivo.

La documentazione **completa** delle modifiche del 29-30 ottobre resta in `CHANGELOG.html`, `DIFF-FILES.html`, `NOVITA-SITO.html` e `LEGGIMI-AGENZIA.md`. Questo file raccoglie solo i **dettagli tecnici** emersi il 30 ottobre.

---

## 1. Filtro "Tipo prodotto" (collezioni)

**Dove**: `cerimonia.html`, `ai-2026.html`, `essential.html`, `outlet-abbigliamento.html`.

- Nuovo gruppo di chip nel drawer filtri (generato da `js/layout.js`, funzione `FILTERS_DRAWER()`).
- ID del contenitore: `#filtersTypes`.
- 9 categorie: Cappotti, Giacche, Abiti, Maglieria, Camicie, T-shirt & Polo, Pantaloni, Denim, Accessori.
- Ogni card prodotto ha l'attributo `data-type="..."` (una sola categoria per card). 44 card totali taggate.
- Logica in `js/filtri.js`: `leggiStato()` esteso con `types`, `applica()` filtra con match su `card.dataset.type`, `reset()` svuota i chip.
- **Griglia vuota**: se i filtri restituiscono 0 card, il grid riceve la classe `.grid-empty`. La card `featured` viene nascosta (`display: none`) e compare un messaggio centrato "Nessun prodotto corrisponde ai filtri selezionati" via CSS `::after`.
- CSS in `css/category.css` (`.products-grid.grid-empty`).

---

## 2. Griglia collezioni edge-to-edge

**Dove**: `css/base.css`, `css/collezione.css`.

- Nuove variabili in `:root` (base.css): `--nav-pad` (50px desktop, 24px ≤1200, 20px touch landscape) e `--wrap-pad` (**0px**).
- `.nav` e `.products-wrap` usano `var(--nav-pad)` e `var(--wrap-pad)`.
- **Edge-to-edge pieno**: `.products-wrap` senza padding laterale su tutti i breakpoint (0px + `env(safe-area-inset)` per notch).
- **Toolbar `Filtra e ordina`**: allineata alle icone dell'header tramite `calc(var(--nav-pad) - var(--wrap-pad) + 7.5px)` (desktop, con micro-compensazione per il margine interno delle icone SVG), `+2px` a destra. Su ≤900px: `padding-left: 24px` (header mobile).
- Se in futuro si cambia il padding dell'header, vanno ricalcolate le compensazioni (documentato in CONTESTO).

---

## 3. Topbar scura

**Dove**: `css/base.css`.

- `.topbar`: sfondo `var(--notte)` (#1F1F1F), testo `var(--paper)` (#FCFCFB), centrato.
- `header.scrolled .topbar-message`: testo `var(--paper)` (chiaro su sfondo scuro).
- `header.menu-open .topbar`: sfondo crema (`--crema-pannelli`) e testo `var(--ink)` (perché il menu mobile apre su crema).
- `:where(body.header-light) header .topbar-message`: testo `var(--paper)`.
- **Nota**: `--notte` è usato anche dal footer. Topbar e footer sono lo stesso colore. Se in futuro si vuole il nero puro (`#000`), va cambiato `--notte` in `tokens.css` (impatto su topbar + footer).

---

## 4. Menu mobile a drawer laterale

**Dove**: `css/base.css`, `js/layout.js`, `js/nav.js`.

- `.mobile-menu`: da fullscreen verticale a **drawer laterale da sinistra** (come `.country-drawer`).
  - `width: 480px; max-width: 90vw` (desktop/tablet), `100vw` (mobile, via media query come gli altri drawer).
  - `transform: translateX(-100%)` → `translateX(0)` all'apertura.
- Nuovo elemento `#mobileMenuOverlay` (iniettato da `layout.js`): overlay scuro `rgba(0,0,0,0.45)`, z-index 998, chiude al click.
- `js/nav.js`: `setMobileMenu()` attiva/disattiva `.active` sull'overlay. Click sull'overlay → `toggleMobileMenu(false)`.
- Il drawer è sotto l'header (z-index 999), così l'hamburger in alto resta visibile e cliccabile.

---

## 5. Capsule e Outlet in home (full-bleed overlay)

**Dove**: `index.html`, `css/home.css`.

- **Capsule**: sezione full-bleed con immagine di sfondo e testo in overlay (bianco). Desktop `aspect-ratio: 2833/1322` (stesso dell'Outlet), mobile `4/5`. Immagine orizzontale `bomber-capsule-copia.webp` (962×412).
- **Outlet**: mobile in overlay con `aspect-ratio: 4/5` (testo bianco in basso). Desktop invariato (`2833/1322`, testo al 75%).
- **Pulsanti allineati**: i 4 pulsanti CTA della home (Video AI, Capsule, Sartoria, Outlet) sono alla stessa distanza dal fondo della loro sezione: **80px desktop / 60px mobile**. Video e Outlet usano `bottom`, Capsule e Sartoria usano `padding-bottom` sul contenitore.

---

## 6. Poster video coerente

**Dove**: `vetrina.html`, `images/poster-video.jpg`.

- Il poster del video in cima alla vetrina è ora **il primo frame del video stesso** (estratto con `ffmpeg -ss 0.1 -vframes 1`).
- Prima era un'immagine diversa (`bomber-capsule3.webp`), creava un "salto" visivo tra copertina e video.
- Formato: JPG (1024×576, 39 KB). Il browser accetta qualsiasi formato immagine nel `poster`, non serve WebP.

---

## 7. Token `--t-page`

**Dove**: `css/tokens.css`, `css/base.css`.

- Nuovo token `--t-page: 0.1s` (dissolvenza ingresso pagina).
- `base.css`: `page-enter` ora usa `var(--t-page)` invece di `var(--t-fast)` (0.25s).
- Le altre 79 transizioni che usano `--t-fast` restano a 0.25s.

---

## 8. Contatore prodotti in toolbar

**Dove**: `cerimonia.html`, `ai-2026.html`, `essential.html`, `outlet-abbigliamento.html`, `css/collezione.css`, `js/filtri.js`.

- `<span class="products-count">` in `.products-toolbar`: mostra "N prodotti" a sinistra.
- Su mobile (≤900px) è nascosto; il conteggio è integrato in `.filtri-bar` come `.filtri-bar-count`: "Filtra e ordina (N)" (stile Barena).
- Aggiornato da `aggiornaConteggio()` in `filtri.js`.

---

## Nota finale

Quando l'agenzia rifarà il documento di presentazione, queste 8 note potranno essere integrate nel layout (pagine a dimensione fissa, `overflow: hidden`). Nel frattempo, questo file è la fonte di verità per i dettagli tecnici del 30 ottobre.
