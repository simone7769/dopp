# Aggiornamenti alle Specifiche — 9 novembre 2026

Postilla alle Specifiche (`Doppelganger_Specifiche_per_agenzia.html`). Raccoglie le modifiche del 9 novembre 2026, da integrare nelle pagine specifiche in una prossima revisione. Le Specifiche cartacee restano ferme all'8 novembre (con il callout aggiornato).

## 1. Vetrina: video full-screen e header trasparente (9 nov)
La pagina `vetrina.html` ora si comporta come la home:
- Video hero a `100svh`, parte dietro l'header. Rimossi `class="header-light"` dal body e `class="page"` dal main (il `.page` aggiungeva padding-top che creava una banda bianca).
- Header trasparente sopra il video, con logo e icone in chiaro.
- **Hover**: passando il mouse sull'header trasparente (solo desktop, non in home) diventa `--paper` con logo/icone neri. Vale per home e vetrina. Non si attiva se `scrolled` o `menu-open`.
- **Capsule e Outlet più alte su desktop**: `aspect-ratio: 16/9` + `max-height: 90vh` (erano `2833/1322` + `85vh`). A 1440px passano da ~672px a ~810px. Mobile/tablet invariati (già `4/5`).
- File: `vetrina.html`, `css/base.css`, `css/home.css`.

## 2. Home: layout Barena (9 nov)
La home è stata rifatta per essere più solida e coerente.
- **Hero e Video**: rimossi da `100svh`. Ora hanno un rapporto fisso (desktop ~1.54:1, tablet 4:3, mobile 4:5). Non c'è più stacco tra hero e video.
- **Caroselli (Must-Have / Journal)**: tornati alle dimensioni originali (2.2 / 1.44 / 1.15), con gap unificato a 20px su tablet.
- **Collection e Duo**: su tablet (768-1024px) affiancati in 3:4 (con `object-position: center top` per Essential). Sotto 768px impilati in 4:5.
- **Banner Outlet/Capsule**: rapporti a gradini (1,65:1 sopra 1400px, 1,45:1 fino a 1400, 5:4 su tablet, 1:1 tra 561-767, 3:4 sotto 560).
- **Gradiente Outlet**: su tablet/mobile il velo nero uniforme diventa un gradiente scuro (72% in basso) per far leggere meglio testo e bottone.
- File: `css/home.css`.

## 3. Card prodotto: formato unificato 3/4 e didascalie uniformi (9 nov)
- **Formato card**: `--ratio-card` in `tokens.css` portato a `3/4` (era 4/5). Home Must Have e PDP correlati aggiornati. Le 4 immagini della selezione sono state ritagliate a 3/4.
- **Padding didascalie**: desktop 14px tra immagine e titolo (Home prima era 18px). Mobile: 8px top, 12px laterale, 0 bottom per tutte (Home, Collezioni, Vetrina).
- **Video home sostituiti**: `az.mp4` → `a.mp4` (1MB → 110KB), `qw.mp4` → `c.mp4` (1.5MB → 204KB). Aggiunta classe `mh-video--c` con `scale(1.05)` per compensare l'inquadratura diversa. Didascalia card c.mp4 aggiornata a "Impermeabile uomo doppiopetto € 149,00".
- File: `css/tokens.css`, `css/home.css`, `css/collezione.css`, `css/vetrina.css`, `index.html`, `js/prodotti.js`, `images/a.mp4`, `images/a-poster.jpg`, `images/c.mp4`, `images/c-poster.jpg`.

## 4. Outlet: immagine verticale su mobile + inquadratura tablet (9 nov)
- **Nuova immagine** `images/uno-outlet-mobile.webp` (1080×1440, 3:4, 85 KB). Ricavata dall'originale orizzontale, con estensione del muro sopra le teste. Servita via `<picture>` sotto 768px.
- **index.html**: sezione Outlet con `<picture>`. `<source media="(max-width: 767px)" srcset="images/uno-outlet-mobile.webp" width="1080" height="1440">`; `<img>` orizzontale (2350×1322) invariato sopra 768px.
- **CSS** (`home.css`):
  - 768-1024px: `object-position: left center` (l'uomo a sinistra non viene più tagliato nel riquadro 5:4).
  - ≤767px: `object-position: center bottom` (tiene i volti nel riquadro 1:1).
- File: `index.html`, `css/home.css`, `images/uno-outlet-mobile.webp`.

## Cosa resta all'agenzia (invariato)
Backend, pagamenti, checkout, account, Club, catalogo reale, CMS Journal, newsletter/cookie/SEO, store locator con mappa, focus trap drawer, code-splitting, scala font globale, CSP/COOP/XFO, minificazione, test cross-browser.

## Cosa resta al cliente
- Capsule: chiedere un file più grande (962px reali, ma steso a tutta larghezza su desktop).
- Foto 2:3 forzate a 3:4: ritaglio ~11% accettato (card, looks, correlati).
