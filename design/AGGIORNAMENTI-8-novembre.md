# Aggiornamenti alle Specifiche — 8 novembre 2026

Postilla alle Specifiche (`Doppelganger_Specifiche_per_agenzia.html`). Raccoglie le modifiche del 6-8 novembre 2026, da integrare nelle pagine specifiche in una prossima revisione. Le Specifiche cartacee restano ferme al 5 novembre (con il callout aggiornato).

## 1. Menu mobile: da fullscreen a drawer laterale (7 nov)
Il menu mobile non è più un pannello fullscreen sotto la topbar. È un **drawer laterale da sinistra** (come carrello, ricerca, preferiti), con:
- `z-index: 1300` (sopra l'header, che è 1000)
- `top: 0` (copre la topbar)
- Riga titolo alta 60px con filo oro in cima e X (riusa `.nav-burger` in stato `aria-expanded="true"`)
- Corpo scorrevole (`.mobile-menu-body`)
- Header non cambia più stato (`menu-open` rimosso): il menu copre l'header, non serve cambiarlo.
- File: `css/base.css`, `js/layout.js`, `js/nav.js`.

## 2. Topbar uniforme a 36px su tutti i dispositivi (8 nov)
Rimossa l'eccezione che su iPad (>1025px, touch) abbassava la topbar a 29px (padding 4px). Ora la topbar è **36px ovunque** (desktop, iPad, iPhone), coerente con `--topbar-h`. La linea oro dei drawer è allineata.
- File: `css/base.css` (rimossa `.topbar { padding: 4px 20px 4px }` nella media query touch).

## 3. Token ratio (A1, 8 nov)
Nuovi token in `tokens.css`:
- `--ratio-card: 3/4` (card prodotto, thumb, carrello, preferiti)
- `--ratio-pdp: 2/3` (scheda prodotto, foto 1380×2070)
- `--ratio-editorial: 4/5` (looks, journal, home mobile)
- `--ratio-banner: 16/9` (outlet, capsule)
Rimossi `--ratio-product` e `--ratio-hero` (non usati). 25 valori hardcoded sostituiti nei CSS. Allineato `design/token.json` (card era 4/5, ora 3/4).
Fuori dalla lista (proporzioni specifiche, non generiche): `3/2` e `4/3` (tablet), `1616/777` (collection frame), `860/500` (gift card).

## 4. H1 uniformati (7 nov)
Collezioni e Looks ora usano lo stesso token `--fs-hero-inner` (18-22px). Prima Collezioni aveva `clamp(18-22)`, Looks `clamp(20-24)`. L'H1 del Journal (13px) è nascosto di proposito (1px con clip) per screen reader e SEO.
- File: `css/tokens.css`, `css/collezione.css`.

## 5. Vetrina: layout desktop, tablet, mobile (8 nov)
- **Desktop**: immagine grande formato fisso `3/4` (non più elastica), allineata in basso (`align-items: end`), con `object-position: center top` per salvare la testa. Still-life ristretta a 3 colonne, formato `3/4`, allineata in basso.
- **Tablet (≤900px)**: griglia prodotti verticale a **2 colonne** (era carosello orizzontale, che andava in conflitto con lo slider interno delle card).
- **Mobile (≤640px)**: griglia prodotti verticale a **1 colonna**.
- **Tipografia**: nuova scala a 5 livelli. Hero `clamp(40-52)`, capitoli `clamp(36-44)`, capo in evidenza e quote `28px`, manifesto `26px`, testi/prezzo `17px`, caption `16px`, etichette `12px`.
- File: `css/vetrina.css`.

## 6. Crop Outlet e Capsule a 16:9 (8 nov)
Le due immagini erano state forzate a 16/9 via CSS, ma il browser tagliava in modo imprevedibile. Ora il taglio è fatto a monte, in modo controllato:
- `uno-outlet.webp`: 2833×1322 → **2350×1322** (taglio 17% in larghezza, centrato)
- `bomber-capsule-copia.webp`: 1000×429 → **762×428** (taglio 24% in larghezza, centrato)
- Originali in `backup/archivio/webp-originali-8nov/` (fuori repo, non in consegna).
- File: `images/uno-outlet.webp`, `images/bomber-capsule-copia.webp`, `index.html` (dimensioni aggiornate).

## 7. X coerenti in tutto il sito (7 nov)
Tutte le X di chiusura (drawer, quick-add, PDP, lightbox) ora usano SVG `stroke-width="1.3"`, 20×20, come quella del menu. Prima erano caratteri `&times;` (spessore dipendente dal font). File: `js/layout.js`, `js/quick-add.js`, `js/prodotto.js`, `css/base.css`, `css/prodotto.css`.

## 8. Dimensioni HTML immagini (CLS)
Tutte le immagini hanno `width`/`height` allineati ai file reali (controllo con `check-images.py`). In particolare:
- 4 immagini selezione in home: 1380×2070 → 1536×2048 (allineate ai file)
- 2 loghi SVG in header: aggiunti `width="544" height="49"` (come checkout.html)
- 24 immagini generate da JS (megamenu, carrello, checkout, conferma, ricerca): hanno già `aspect-ratio` sul contenitore, quindi non serve altro.

## 9. Pulizia 0.95em (A2, 8 nov)
Rimosse 26 righe `font-size: 0.95em` che erano codice morto: in ogni blocco un'altra `font-size` (token o clamp) le sovrascriveva. Il valore non veniva mai applicato. Nessun cambio visivo.

## Cosa resta all'agenzia (invariato)
Backend, pagamenti, checkout, account, Club, catalogo reale, CMS Journal, newsletter/cookie/SEO, store locator con mappa, focus trap drawer, code-splitting, scala font globale, CSP/COOP/XFO, minificazione, test cross-browser.

## Cosa resta al cliente
- Capsule: chiedere un file più grande (962px reali, ma steso a tutta larghezza su desktop).
- Foto 2:3 forzate a 3:4: ritaglio ~11% accettato (card, looks, correlati).
