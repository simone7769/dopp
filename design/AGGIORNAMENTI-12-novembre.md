# Aggiornamenti alle Specifiche — 12 novembre 2026

Postilla alle Specifiche (`Doppelganger_Specifiche_per_agenzia.html`). Raccoglie le modifiche del 10-12 novembre 2026, da integrare nelle pagine specifiche in una prossima revisione. Le Specifiche cartacee restano ferme all'8 novembre (con il callout aggiornato al 12 novembre).

## 1. Toolbar collezioni a griglia e badge filtri (10 nov)
La toolbar delle collezioni (`.products-toolbar--cos`) usa ora CSS Grid `1fr auto 1fr` per centratura matematica delle categorie. Il contatore prodotti è nascosto visivamente (resta per screen reader). Il badge dei filtri attivi è un **puntino nero 6px** senza numero (era cerchio oro con numero). File: `css/collezione.css`, `css/filtri.css`, `js/filtri.js`, 4 HTML collezione.

## 2. Migrazione tipografica Jost → Work Sans (11 nov)
Il sito usa **Work Sans** al posto di Jost. Il serif Cormorant Garamond resta invariato.
- **Pesi per zona**: `--fw-body: 350` (testi, paragrafi, testi lunghi), `--fw-ui: 400` (menu, footer, form, tabelle), `--fw-emphasis: 500` (prezzi, tab attivi). Titoli sans ≥18px restano a 300.
- **Scala ridotta** (~-10%): `--fs-13` 12, `--fs-14` 13, `--fs-16` 15, `--fs-18` 17, `--fs-20` 18, `--fs-22` 20, `--fs-24` 22, `--fs-26` 24. Card title 14 desktop / 13 tablet. Link footer 11.
- **Eccezioni iOS**: campi form a `16px` fisso (anti-zoom).
- **Font self-hosted**: `fonts/work-sans-latin-wght-normal.woff2` (49K) + `fonts/work-sans-latin-ext-wght-normal.woff2` (35K). Rimossi i 5 file Jost.
- **Token serif** (`--fs-claim`, `--fs-hero-inner`, `--fs-related`) non toccati.
- File: `css/tokens.css`, `css/fonts.css`, `index.html`, 22 CSS delle pagine, `design/token.json`, `LEGGIMI-AGENZIA.md`, `design/NOVITA-SITO.html`.

## 3. Badge carrello e switch filtri neri (11-12 nov)
- Badge carrello/wishlist header: da cerchio oro con numero a **pallino nero con numero bianco**. File: `css/base.css`.
- Switch "Solo disponibili" (drawer filtri): da oro a **nero**. File: `css/filtri.css`.

## 4. Pulizia oro: menu, footer, hover (12 nov)
Tutti gli **hover testi** sono passati da oro (`--gold-text`) a **nero** (`--ink`) su fondo chiaro, **bianco** (`#fff`) su footer scuro. Rimangono oro solo gli elementi semantici/decorativi:
- Badge Bestseller (contrasto 5:1)
- Spunta conferma ordine (feedback positivo)
- Filo footer-copy e bordo topbar (decorativi, identità)
- Focus accessibilità (checkout, PDP, vetrina — WCAG)
- Fili decorativi drawer (identità)
- Club tier "Gold" (semantico)

**Menu desktop/mobile**: hover nero (non più oro). Voci megamenu e mobile con **grassetto 500** (era 600, ora uniformato). MENU bottone: sottolineatura nera animata da sinistra. Icone header: nessun effetto hover (solo cambio colore automatico con header scrolled).

**Sottolineature**: `text-underline-offset` uniformato a 3px (tranne hero grandi che restano 4-6px). File: `css/base.css`, `css/account.css`, `css/collezione.css`, `css/journal.css`, `css/filtri.css`, più 11 CSS per i 19 hover rimasti.

## 5. Menu mobile a drawer laterale (7 nov, già in postilla 8 nov — riconfermato)
Il menu mobile è un drawer laterale (non più fullscreen). Z-index 1300, riga titolo 60px con X, filo oro in cima. File: `css/base.css`, `js/layout.js`, `js/nav.js`.

## Cosa resta aperto per la prossima revisione delle Specifiche
- Pagina p5 (tabella scala): i valori sono ancora quelli vecchi (12/11/12/13/14/15-13/16/17/18/ecc.). Con la nuova scala Work Sans, la tabella va riscritta con: 11/12/13/14/15/17/18/20/22/24/ecc.
- Pagina p15 (scheda prodotto): prezzo "17px grassetto" → ora è `--fs-pdp-price` (17px ma weight 500), descrizione "14px weight 300" → ora 14px weight 350.
- Pagina p7 (Q&A): già aggiornata nel corpo, ma il footer potrebbe avere "corpo serif 18px" da correggere in "sans 15px".
- Pagina p4 (tipografia): già aggiornata dal consulente con Work Sans.
