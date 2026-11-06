# Doppelgänger — Guida per l'agenzia

Documento di accompagnamento al pacchetto demo + specifiche. Per chi svilupperà il sito vero sulla piattaforma dinamica.

## Cosa c'è nel pacchetto

| File / cartella | Cosa contiene |
|---|---|
| `*.html`, `css/`, `js/` | Demo statica navigabile (**38 pagine**) |
| `images/` | Immagini del sito (WebP ottimizzate) |
| `images/guida-taglie/` | **18 immagini** per la guida taglie (WebP, ~3,4 MB totali) |
| `fonts/` | Font self-hosted (Cormorant Garamond + Jost) |
| `js/quick-add.js` | Pannellino quick-add sul «+» delle card: colore + taglia, aggiunge al carrello demo |
| `../Doppelganger-Proposta-nuovo-sito.pdf` | Direzione strategica del progetto (fuori dal repo, in `doppelganger-sito PROVA/`) |
| `design/Doppelganger_Specifiche_per_agenzia.html` | Specifiche tecniche dettagliate (sorgente HTML editabile) |
| `design/CHANGELOG.html` | Elenco dei commit con descrizione |
| `design/DIFF-FILES.html` | File toccati, con righe aggiunte/rimosse |
| `design/linee-guida-badge.html` | Regole e codice per le etichette prodotto |
| `design/NOVITA-SITO.html` | Riepilogo delle novità (per il cliente) |
| `design/token.json` | Design token in formato JSON |
| `design/CREDITI.md` | Autore e contatti |

## Secondo aggiornamento di ottobre 2026

### Nuove pagine (12)
- **`boutique.html`** — Store locator con 83 boutique reali, ricerca live
- **`pagamenti.html`** — Metodi di pagamento (carte, PayPal, Klarna, Apple Pay, Google Pay)
- **`guida-taglie.html`** — 18 categorie con modale a popup (dati reali)
- **`traccia-ordine.html`** — Traccia ordine (form + risultato demo)
- **`monitora-reso.html`** — Traccia reso (stessa struttura)
- **`gift-card.html`** — Gift Card in stile PDP con selettore taglio
- **`lavora-con-noi.html`** — 2 tab + 17 posizioni + form candidatura
- **`faq.html`** — 22 domande in 12 gruppi
- **`riciclo.html`** — Istruzioni riciclo imballaggi (47 voci)
- **`whistleblowing.html`** — Procedura Whistleblowing (+ PDF)
- **`parita-genere.html`** — Politica di Parità di Genere
- **`doppelganger-app.html`** — Pagina Doppelgänger App: hero, 3 sezioni con mockup iPhone (Boutique/Acquista/Esplora), badge ufficiali App Store e Google Play

### Modifiche strutturali
- **Footer ristrutturato**: trust bar con 3 voci (Spedizioni e resi con icona pacco, Pagamento, Assistenza), 3 colonne di link, 5 link legali in basso
- **Uniformazione "Boutique"**: era "Store Locator" / "Negozi"
- **Link a pagina, non a sezione**: i link con `#ancora` sono stati rimossi. Spedizioni e Resi sono una voce unica nel footer; "Dati societari" porta alla pagina privacy completa.
- **Header mobile**: 60px fisso, `scroll-padding-top: 105px`, `--header-h: 93px` (evita lo spostamento dei contenuti al primo caricamento)
- **Featured card 3/2 su tablet**: era 2.63:1 (solo busto). Su mobile resta 4:3
- **Soglia scroll header**: da 120px a 20px (l'header si comprime prima, liberando spazio visivo)

### Qualità e performance
- **Validazione**: 0 errori su HTML (html-validate), CSS (csstree-validator), JS (node -c), JSON (json.load) — 41 HTML, 25 CSS, 16 JS, 1 JSON
- **Lighthouse DevTools** (ultimo test documentato, 3 novembre 2026, home in produzione):
  - **Desktop**: Performance 100/100, Accessibilità 100/100, Best Practices 100/100, SEO 100/100
  - **Mobile**: Performance 98/100, Accessibilità 100/100, Best Practices 100/100, SEO 100/100
  - **Storico**: il test del 18 ottobre dava 93/100 mobile (LCP 3,2 s, video 2,4 MB). Dopo l’ottimizzazione del video (1,3 MB) e delle immagini, il valore è salito a 98/100. Il `defer` è applicato solo a `index.html` (script nel `<head>`); le altre pagine usano script a fine `<body>`. I preload dei 4 font restano strategici: non rimuoverli.
- **Immagini home** ottimizzate WebP q80 (-47%, da 3,2 MB a 1,7 MB)
- **Video hero** con `preload="none"` + poster per LCP ottimale
- **Meta description** su tutte le 38 pagine
- **Validazione finale**: HTML (`html-validate`), CSS (`csstree-validator`), JS (`node -c`), JSON (`json.load`) — 0 errori su tutti i file
- **Test browser** (Chrome desktop, emulazione mobile 375 px): menu mobile, aree di tocco 44 px, boutique iOS (16 px), chip `aria-pressed`, filtro prezzo 1–2000 €, filtro taglia 46 (2 card nascoste su 15), totale carrello, icone header desktop (padding 6 px)

## Come aprire la demo

Da terminale, nella cartella del progetto:
- `python3 -m http.server 8000` → apri `http://localhost:8000/`
- Oppure apri `index.html` direttamente nel browser

## Come leggere il codice

- **HTML**: una pagina per file, struttura chiara. Header/footer/drawer sono **iniettati da `js/layout.js`** (non duplicati su ogni pagina).
- **CSS**: `css/tokens.css` (variabili di design system), `css/base.css` (header, footer, drawer, bottoni comuni), poi un CSS per pagina.
- **JS**: `js/nav.js` gestisce tutti i comportamenti interattivi (menu, drawer, carrello, wishlist, ricerca, filtri). `js/layout.js` inietta header/footer. Il resto sono moduli per singola funzionalità. `js/quick-add.js` gestisce il pannellino dal «+» sulle card.

### Pattern e stati

- **Skip-link «Vai al contenuto»**: iniettato da `layout.js`, appare al focus da tastiera. Punta a `<main id="main">` (presente su 37 pagine su 38; escluso `checkout.html`, pagina senza header/footer iniettati).
- **Accessibilità dei form**: `aria-invalid` sui campi in errore (checkout, candidatura), `role="alert"` sui banner errore. Rimossi automaticamente quando l'utente corregge.
- **Carrello**: `aria-live="polite"` su totale e messaggio spedizione. Il drawer aggiorna i valori a ogni modifica e gli screen reader li annunciano.
- **Chip taglia/colori del drawer filtri**: `aria-pressed` dinamico, `filtri.js` lo aggiorna a ogni click (iniziale `aria-pressed="false"` nel markup di `layout.js`).
- **Tablist accessibile**: in `account.html` e `lavora-con-noi.html`, frecce ←/→ spostano il focus tra tab, Home/End vanno al primo/ultimo.
- **Journal**: l'`<h1>` è visivamente nascosto (non `display: none`), quindi leggibile da screen reader e SEO.
- **Toggle password**: `aria-label` dinamico tra «Mostra password» e «Nascondi password» (account, registrazione).
- **Filtro taglia funzionante**: `data-size="46 48 50 52 54 56"` sulle card di collezione. Card «in evidenza» escluse (non sono prodotti). Nella demo 3 card di Autunno/Inverno 2026 hanno taglie differenziate per rendere il filtro dimostrabile.
- **`overflow-x: clip`** su `html, body`: previene barra orizzontale da elementi full-bleed su Windows.
- **Parsing prezzi (`nav.js`)**: `.replace(/\./g, '')` per gestire correttamente importi sopra 999 €.
- **`token.json`** allineato a `tokens.css` (header 155 px, bottoni telefono 44 px, `--fs-16`, spaziature griglia e carosello).
- **Header mobile fisso a 60 px**: non cambia scrollando. Il logo è stabile (clamp 12-18 px) e non si rimpicciolisce più. Topbar (33 px) sparisce dopo 20 px di scroll. `scroll-padding-top: 105 px` come ripiego CSS, ma i link non usano più `#ancora`: puntano a pagina, e il blocco ANCORE di `nav.js` è stato rimosso.

- **Megamenu unificato (3 voci)**: i tre menu (`Abbigliamento`, `Accessori`, `Outlet`) condividono la stessa griglia `1fr 4fr` (voci sx, card dx), card a `1fr` (4 colonne), gap 16px, padding allineato a `nav` (50px). Sopra il menu si apre un **overlay scuro** `rgba(0,0,0,0.45)` (come drawer/popup). `pointer-events: none` perché la chiusura è gestita da `mousemove` + timer (`nav.js`). Abbigliamento: 4 card (La Capsule in 1ª posizione, AI 2026, Essential, Cerimonia). Accessori: 3 card (Novità, Must Have, Best Seller). Outlet: 4 card + link "Vedi tutto" a sinistra.
- **Pop-up Articoli Simili con still-life**: il popup clona le card della pagina e sostituisce `img-main` (figura intera) con `img-hover` (still-life). CSS in `css/similar-modal.css` (condiviso). Script inline in `cerimonia.html`, `outlet-abbigliamento.html`, `ai-2026.html`, `essential.html`.
- **Form iscrizione Club**: stesso pattern del form newsletter del footer. Il submit nasconde il form e mostra un messaggio di conferma in serif italic. L'utente riceve un feedback immediato senza ricaricare la pagina.
- **Checkout standalone**: niente header/footer del sito (pattern standard e-commerce). Il logo è allineato visivamente alle altre pagine via `padding: 65px 20px 67px` (155px totali, come `--header-h`). La riga legale (privacy/termini) è stata rimossa: i link restano accessibili dal footer globale delle altre pagine.
- **PDP taglia non preselezionata**: nessuna taglia ha `class="selected"` all'apertura. L'utente sceglie; se clicca "Aggiungi" senza taglia, riceve un avviso `.pdp-size-warning`. I colori invece restano preselezionati (colore principale del prodotto, standard e-commerce).
- **Favicon bianca**: i 3 file (`favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico`) hanno ora sfondo bianco (erano RGBA trasparente). Risultato: −94% di peso (286B vs 6KB), visibile anche nelle tab scure.
- **Immagini JPG → WebP**: i 4 JPG residui sono stati convertiti: `a.jpg`→`megamenu-ai-2026.webp`, `ag.jpg`→`ag.webp`, `boiserie-bg1.jpg`→`boiserie-bg1.webp`, `dd1.jpg`→`dd1.webp`. Risparmio ~480 KB. Nessun JPG di contenuto rimasto (solo favicon `.png`).

- **Outlet Hero (home)**: banner full-width al posto del blocco `.duo`. Immagine B/N `uno-outlet.webp`, testo a destra: "OUTLET / Fino al / 80% / di sconto / Entra nell'Outlet". CSS: `font-variant-numeric: lining-nums` (cifre dritte, no "8o"), numero 70px, `%` 0.5em, blocco centrato al 75% della larghezza (allineato al blocco Capsule). Solo il bottone è cliccabile (`pointer-events: none` sull'immagine, no tap highlight su mobile).
- **La Capsule (home)**: sezione split (immagine `capsule-gocce.webp` a sinistra, testo crema a destra). Copy: "La Capsule / Con qualsiasi tempo / Pochi capi per uscire quando piove...". Bottone "Scopri la Capsule" (`.capsule-text .btn` con color ink, perché `.btn` globale è bianco). Mobile: immagine 40vh, padding ridotto.
- **Similar hover**: il pulsante "Articoli simili" (`.similar` in `collezione.css`) è visibile in hover su desktop (come il cuore `.wish`). Su touch (iPad, iPhone, Android) è **nascosto** con `@media (hover: none)`: la funzione non è essenziale e su touch occupava spazio permanente sulla card. `:focus-within` per accessibilità da tastiera. `pointer-events: none` quando invisibile.
- **Badge griglia 3 colonne**: regole specifiche per `[data-cols="3"]`. Desktop: altezza 20px, font 9px, padding 5px, letter-spacing 0.5px. Mobile (≤520px): altezza 16px, font 8px, padding 4px, letter-spacing 0.3px. I badge "Bestseller" e "Ultimi pezzi" stanno dentro la card senza sbordare.

- **Griglia collezioni edge-to-edge + toolbar allineata**: padding laterale `.products-wrap` ridotto a 8px (era 50px) su desktop, per un look più moderno. Gap griglia 16/8 (desktop), 20/12 (mobile, invariato). La toolbar `.products-toolbar` compensa il diverso padding dell'header (50px) con `padding-right: 42px` (desktop), `16px` (901-1200), `4px` (≤900) per allineare "Filtra e ordina" alle icone dell'header. Se in futuro si cambia il padding dell'header o della griglia, va ricalcolata la compensazione.
- **Immagine narrativa "Scegliere" (vetrina)**: `capsule-impermeabile-pioggia.webp` sostituita con una nuova immagine (uomo con ombrello che guarda in alto, 1080x1349). Più narrativa del precedente scatto laterale. Il `<img>` ha `width="1080" height="1349"` per il CLS.

- **Contatore prodotti + counter inline (collezioni)**: `.products-count` (a sinistra, desktop) mostra "N prodotti". Su mobile (≤900px) è nascosto, e il conteggio è integrato in `.filtri-bar` come `.filtri-bar-count`: "Filtra e ordina (N)". Aggiornato da `aggiornaConteggio()` in `filtri.js`, chiamata in `applica()` e all'init. Icona di `.filtri-bar` a sinistra del testo su mobile (stile Barena), a destra su desktop.
- **Token `--t-page` (dissolvenza pagina)**: `0.1s` in `tokens.css`, usato da `page-enter` in `base.css`. Sostituisce `--t-fast` (0.25s) solo per l'ingresso pagina. Le altre 79 transizioni che usano `--t-fast` restano a 0.25s. Anche `0.01s` in `prefers-reduced-motion`.
- **Filtro Tipo prodotto**: nel drawer filtri (generato da `layout.js`) c'è un gruppo di chip `#filtersTypes` con 9 categorie. Le card nei 4 file di collezione hanno `data-type="..."`. La logica è in `filtri.js` (stessa struttura di taglia/colore). Se una combinazione di filtri restituisce 0 card, la griglia riceve la classe `.grid-empty`: la card `featured` viene nascosta e compare un messaggio centrato via CSS.
- **Allineamento toolbar/header (`--nav-pad`/`--wrap-pad`)**: in `base.css` ci sono due variabili (`--nav-pad: 50px` desktop, `24px` ≤1200, `20px` in touch landscape; `--wrap-pad: 0px` da ottobre 2026, era 8px). La toolbar delle collezioni calcola il proprio allineamento come `calc(var(--nav-pad) - var(--wrap-pad))` (con micro-compensazioni `+7.5px`/`+2px` per il margine interno delle icone SVG). Se in futuro l'agenzia cambia il padding dell'header, basta aggiornare `--nav-pad`: la toolbar si allinea da sola. Niente più valori hardcoded 42/16/4.
- **Capsule home (full-bleed overlay)**: la sezione `.capsule-section` in home è un blocco full-width con immagine di sfondo e testo in overlay. Desktop usa `aspect-ratio: 2833/1322` (stesso dell'Outlet), mobile `4/5`. Il testo è centrato in basso con `padding-bottom` di 80px desktop / 60px mobile. Immagine orizzontale `bomber-capsule-copia.webp` (962×412), con `object-fit: cover`.
- **Allineamento pulsanti home**: i 4 pulsanti CTA della home (Video AI, Capsule, Sartoria, Outlet) sono allineati alla stessa distanza dal fondo della loro sezione: 80px desktop, 60px mobile. Video e Outlet usano `bottom`, Capsule e Sartoria usano `padding-bottom` sul contenitore. Se in futuro si cambia uno, vanno cambiati tutti per mantenere l'allineamento.
- **Outlet mobile (overlay 4/5)**: su mobile l'Outlet usa `aspect-ratio: 4/5` con testo in overlay e `justify-content: flex-end` (testo in basso). Desktop resta `aspect-ratio: 2833/1322` con testo al 75% orizzontale, allineato al centro verticale del blocco.
- **Topbar scura**: la barra messaggi rotanti in cima ha sfondo `var(--notte)` e testo `var(--paper)` centrato. `header.scrolled .topbar` mantiene il colore chiaro sul fondo scuro; `header.menu-open .topbar` ha testo `var(--ink)` su sfondo crema (perché lì il menu aperto cambia il fondo). Se in futuro si cambia `--notte`, la topbar si adegua.
- **Griglia edge-to-edge**: `.products-wrap` non ha più padding laterale (usa `max(0px, env(safe-area-inset))` per il notch). Le card toccano i bordi su tutti i breakpoint. La toolbar `.products-toolbar` calcola il proprio padding come `calc(var(--nav-pad) - var(--wrap-pad))` (>900px) o `24px` (≤900px) per allinearsi alle icone header. Se si cambia il padding dell'header, va ricalcolato anche questo.
- **Mobile menu a drawer**: `.mobile-menu` è ora un drawer laterale da sinistra (come country/cart), non più fullscreen verticale. `width: 100vw` su mobile, `480px` su desktop. Overlay `.mobile-menu-overlay` (z-index 998) chiude al click. Il pattern ricalca `.country-drawer`: apertura/chiusura via `setMobileMenu()` in `nav.js`.
- **Feature vetrina (single-image)**: `.vt-feature-img` è un `<div>` (non più un `<a>`), contiene solo `3.webp`, non è cliccabile. Il link a `prodotto-saldi.html` sta solo sul bottone della feature. Stesso pattern dell'Outlet Hero (solo il bottone è cliccabile).

## Contatti

Vedi `design/CREDITI.md`.

### Claim unificato (Hero e Capsule)
I titoli dell'Hero e della Capsule condividono la stessa regola CSS (`.hero-content h1, .capsule-text h2`). Usano il token `--fs-claim`, con `text-wrap: balance` per evitare parole orfane e `text-shadow` per garantire il contrasto su qualsiasi immagine di sfondo.

### Video in Home (Mobile)
Su mobile (`max-width: 640px`), il blocco video usa `height: 100svh` e `aspect-ratio: auto`. Mantiene il formato naturale del video, evitando tagli laterali o zoom innaturali, e occupa l'intero schermo per massimizzare l'impatto visivo.

### Padding video -> Collection (Tablet e Mobile)
Il blocco `.collection` non ha `padding-top` su tablet e mobile (allineato al desktop). Il video a tutto schermo "scivola" direttamente nella sezione successiva per mantenere un ritmo visivo cinematografico ed evitare buchi bianchi.

### Padding didascalie e prezzi (Selezione)
Nella home (`.must-have`), i contenitori `.product h3` e `.product-price` hanno `padding: 0 12px` per allineare il testo al margine delle immagini, esattamente come avviene su `.product-info` nelle pagine di collezione.

### Dimensioni card (Titolo e Prezzo)
I token `--fs-card-title` e `--fs-card-price` sono stati portati rispettivamente a 15px e 13px (vedi anche l'aggiornamento del 5 novembre: prezzo a peso 500, interlinea 1,28). Su tablet e mobile restano a 14px e 12px.

### Refactoring collezione.css
Il file `collezione.css` è stato ripulito dai duplicati. Inoltre, il pulsante "+" (`.product-info .plus`) ha ora un'area di tocco di 44x44px (WCAG) per migliorare l'accessibilità su touch.

### Dettagli prodotto (Prezzo e Pulsante "+")
Il prezzo nelle card (Home e Collezioni) ha ora un peso di 500 (invece di 700) per un aspetto più elegante e meno "urlato" (vedi anche l'aggiornamento del 5 novembre). Il pulsante "+" (Quick Add) è stato ingrandito per essere più visibile e facilmente cliccabile su touch.


### Hero (Immagine statica)
La home usa l'immagine `hero-ai26.webp` come sfondo principale, con il claim testuale. Il video `doppelganger-uomo-intro.mp4` è una sezione separata sotto l'hero. (Nota: un esperimento con il video come hero è stato testato e poi abbandonato).

### Ottimizzazione Media (LCP)
Per migliorare il Largest Contentful Paint (LCP), sono state ottimizzate le immagini principali (`cerimonia-featured`, `basic-featured`, `bomber-capsule`) con `cwebp` e il video hero è stato compresso (da 2.4M a 1.3M). I preload dei font nel `<head>` sono strategici: non rimuoverli.

## Aggiornamento del 3 novembre 2026

Riferimento: `CHANGELOG.html` e `DIFF-FILES.html`, sezione 44.

### Breakpoint collezioni unificati a 1024px
`collezione.css` usa ora gli stessi tre scalini dell'header: **desktop >=1025px**, **tablet 641-1024px**, **mobile <=640px**. I vecchi blocchi a 1200px e 900px per griglia e toolbar sono stati rimossi.

### Griglia collezioni: tre scalini
| | Desktop | Tablet | Mobile |
|---|---|---|---|
| Gap (righe / colonne) | 16 / 8px | 12 / 6px | 2 / 2px |
| Padding `.products-wrap` (sopra / sotto) | 4 / 90px | 6 / 50px | 6 / 30px |
| Font card (titolo / prezzo) | 16 / 14px | 14 / 12px | 14 / 12px |

I font card sono token (`--fs-card-title`, `--fs-card-price` in `tokens.css`): prima tablet e desktop erano identici.

### Badge responsive
Scala unica per breakpoint, senza `!important`: desktop 11px/27px/0 14px, tablet 10px/22px/0 10px, mobile 9px/19px/0 6px. Il vecchio blocco `[data-cols="3"]` e il blocco 520px (non più raggiunto) sono stati rimossi.

### Featured card sempre a destra
In `category.css`, `.layout-featured-right .product-card.featured` usa `grid-column: -3 / -1`: occupa sempre le ultime due colonne, sia con 3 sia con 4 colonne. Prima era `2 / span 2` (con 4 colonne la lasciava a metà riga).

### Icona switch unificata (`js/filtri.js`)
Le icone griglia sono generate dalla stessa funzione `icona(n)` (quadratini n x n). Rimosso il caso speciale per `n === 2`. Ogni bottone ha `aria-pressed` e `aria-label` ("Griglia a N colonne").

### Fix frammenti HTML (`CHANGELOG.html` e `DIFF-FILES.html`)
Le sezioni 32-43 erano fuori dal `<body>`, sopra il DOCTYPE. Spostate dentro `.wrap`, validati.

### Commit di riferimento
- `b168839` refactor(collezioni): 3 scalini griglia, breakpoint 1024, font tablet 14/13, icona switch unificata, toolbar allineata
- `5005bf2` fix(collezioni): featured card sempre nelle ultime 2 colonne (3 e 4 colonne)
- `ac7bdfb` chore(collezioni): badge responsive pulito
- `b11e530` fix(design): frammenti sezione 32-43 spostati dentro `.wrap`


## Aggiornamento del 4 novembre 2026

Riferimento: `CHANGELOG.html` e `DIFF-FILES.html`, sezione 45.

### Cuore proporzionale alla card (`base.css`)

Il cuore (`.wish`) non usa più media query fisse. La card è un **container** (`container-type: inline-size`) e il cuore si dimensiona sulla larghezza della card:

    .product-card, .product, .pdp-item, .vt-card { container-type: inline-size; }
    .wish {
      --wish-icon: clamp(16px, 7cqw, 26px);
      --wish-inset: calc(var(--wish-icon) * 0.5);
      top: var(--wish-inset);
      right: var(--wish-inset);
      width: var(--wish-icon);
      height: var(--wish-icon);
    }

- Cuore 16–26px, distanza dall'angolo = metà del lato. A qualunque larghezza di card resta proporzionale.
- Area di tocco 44×44 garantita da `.wish::after` (invisibile, non sposta il cuore).
- Rimossi i breakpoint 1024/520 e l'override `[data-cols="1"]`.

### Badge proporzionale alla card (`collezione.css`)

Stesso approccio: `clamp()` in `cqw` al posto dei breakpoint 641-1024/≤640.

    .product-card .badge {
      --badge-fs: clamp(9px, calc(8.2px + 0.6cqw), 11px);
      --badge-h:  clamp(19px, calc(15px + 2.6cqw), 27px);
      font-size: var(--badge-fs);
      height: var(--badge-h);
      padding: 0 clamp(9px, calc(6px + 1.7cqw), 14px);
      letter-spacing: clamp(1.1px, calc(0.8px + 0.22cqw), 1.8px);
    }

- 9→11px testo, 19→27px altezza, 9→14px padding, 1.1→1.8px tracking.
- Riferimenti: card ~460px (desktop 3 col) = 11/27px; ~176px (mobile 2 col) = ~9/~20px.
- `--badge-h` riusato per il quadratino `%`.

### Terza opzione colonne su mobile (`filtri.js` + `collezione.css`)

`filtri.js` espone `opts: [1, 2, 3]` su mobile. Con `data-cols="3"` su ≤640px: titolo e prezzo `visually-hidden` (restano per screen reader), solo `sale`/`outlet` come `%`, cuore visibile.

### Quick-add: pulsante `×` (`quick-add.js` + `collezione.css`)

`×` in alto a destra (44×44). Al click chiude il pannellino e riporta il focus al `+` che lo aveva aperto. Esc e click fuori continuano a funzionare.

### `+` a 1 colonna su mobile

Con `[data-cols="1"]` su ≤640px il `+` torna visibile. Padding extra sotto il testo per `gap: 2px`.

### Area di tocco 44px (WCAG 2.5.5 AA)

Cuore: `.wish::after` 44×44. Switch colonne: 40→44px. Quick-add `×`: 44×44.

### Audit e piccoli fix

- Alt: `bomber-capsule-dettaglio.webp` in `vetrina.html` = "Dettaglio del bomber in jersey laminato".
- README: 38 pagine (era 35).
- Badge popup simili: 10px (era 9px, unico testo sotto i 10px).
- `documents/whistleblowing.pdf` incluso nello ZIP AGENZIA.
- `aria-label` su `<ul>` spostato su `h2.visually-hidden` in `pagamenti.html` e `riciclo.html`.
- Linee-guida badge: intro e §8 allineate, PDF rigenerato, `print-color-adjust: exact`.
- `defer`: solo `index.html`; altre pagine usano script a fine body.

### Menu mobile (tentativi revertati)

Tentato chiusura istantanea (`aac6552`) e 150ms (`278402a`). Su device reale non convinceva: revertito con `cd0344f`. Documentato come delega all'agenzia.

### Delegato all'agenzia (invariato)

Focus trap negli 8 drawer, code-splitting `nav.js`/`layout.js`, scala font 12/14/16/20/24/32, breakpoint 900px residui (~29), vetrina 16 immagini senza `width`/`height`, test cross-browser.

### Commit di riferimento
- `4415774` badge mobile 9→10px
- `8ace4f8` cuore breakpoint 900→1024 + 15→16px su ≤520
- `e355eac` switch 40→44px (WCAG 2.5.5 AA)
- `2467c77` copy vetrina bomber (75→36 parole)
- `cd0344f` revert fix menu mobile
- `1499106` 5 fix dal report consulente
- `3232c64` doc defer corretta
- `f5f6104` linee-guida badge HTML
- `42a2bfa` banner + PDF badge
- `c4e8d44` cuore proporzionale (container-type + cqw)
- `2fe6bd1` badge proporzionale (clamp + cqw)
- `f1c2a24` `+` visibile a 1 colonna su mobile
- `86a4e1c` quick-add: pulsante × + focus
- `e4be8c2` 3 colonne mobile (solo foto + cuore + %)

### Allineamento schede in vetrina (`vetrina.css`)

Le card della vetrina (`vetrina.html`) sono state allineate a quelle delle collezioni:
- `.vt-card .product-info`: `padding: 14px 12px 0` (prima `padding-top: 0`).
- Prezzo: peso `600` (era `700`), allineato a `.product-card .price`.
- `+` (quick-add): `font-size: var(--fs-26)`, area di tocco 44×44 con margini negativi (identico a `.product-card .plus`).
- `.vt-card-img`: rimosso `margin-bottom: 14px` (lo spazio lo dà il `padding-top` del testo, come nelle collezioni).
- Aggiunto `.quick-add-close` (mancava in `vetrina.css`): `×` in alto a destra del pannellino, 44×44, senza bordo di default.

### Pulsanti di chiusura (coerenza e a11y)

- `focus-visible` (outline `1px solid var(--ink)`, `outline-offset: -4px`) aggiunto a: drawer (country, cart, login, wishlist, stores, contact), search, filters, PV, size modal. Prima mancava.
- Similar modal: `font-size` del `×` da 32 a 26px, per coerenza con gli altri pulsanti testuali.
- Similar modal: `z-index: 1` su `.similar-modal-close`. L'`h2` con `position: relative` copriva metà pulsante e catturava i click (area cliccabile spostata rispetto alla `×`).

## Aggiornamento del 5 novembre 2026

Riferimento: `AGGIORNAMENTI-5-novembre.md`.

### Didascalie delle card prodotto (scala, pesi, interlinea)

| | Desktop ≥1025 | Tablet 641–1024 | Mobile ≤640 |
|---|---|---|---|
| Titolo (`--fs-card-title`), peso 400 | 16px | 14px | 14px |
| Prezzo (`--fs-card-price`), peso `--fw-card-price` (500) | 14px | 12px | 12px |

- Prezzo a peso **500** ovunque (prima 600 in collezioni, home e vetrina, 700 in account, correlati e popup simili). Nuovo token `--fw-card-price`.
- Prezzo scontato (`.price-now`, `.price-off`) allo stesso peso (era 700); il rosso e il barrato bastano a distinguerlo. `.price-old` resta 300.
- Interlinea 1,3 (era 1,4 sul titolo e 1,6 ereditata dal prezzo); spazio titolo–prezzo 2px (era 4px su desktop e tablet).
- Rimossi i valori 13/11 a ≤380px e l'override a 11px a ≤340px: sotto i 640px la scala resta 14/12.
- Il token è condiviso da collezioni, vetrina, home (Must Have), preferiti dell'account, correlati della scheda prodotto e popup simili: tutte seguono la stessa scala.

## Aggiornamento del 6 novembre 2026

Riferimento: `CHANGELOG.html` e `DIFF-FILES.html`, sezione 33.

### Drawer del &laquo;+&raquo; (quick-add)
Il pannello di aggiunta rapida &egrave; stato completamente ridisegnato:
- **Desktop (>900px)**: layout a due colonne, larghezza `clamp(720px, 50vw, 960px)`. Foto a sinistra, informazioni a destra con scroll indipendente. Titolo serif, prezzo `--fs-pdp-price`, taglie 44&times;44 con filetti, bottone 52px.
- **Mobile/Tablet (<=900px)**: bottom sheet dal basso, altezza 85vh. Due foto affiancate (grid 50/50), CTA fisso in fondo. Tablet: `aspect-ratio: 4/3` per non tagliare le foto verticali.
- **CSS centralizzato** in `css/quick-add.css` (rimosse le copie da `collezione.css` e `vetrina.css`).
- **Fix CLS**: `width`/`height` espliciti e `aspect-ratio` inline sulle immagini.
- **X coerente** con il &laquo;+&raquo; delle card (font 26px, weight 300, nessuno sfondo).

### Articoli Simili (eliminato)
Rimosso completamente:
- Pulsante `<button class="similar">` da tutte le card.
- Popup `#similarModal` e overlay da tutti gli HTML.
- File `css/similar-modal.css`, `css/cerimonia.css`, `js/similar-popup.js`.
- Regole `.similar` residue in `collezione.css`.
Totale: **-814 righe** di codice rimosso.

### Vetrina: slider condiviso
- CSS dello slider spostato da `collezione.css` a `base.css` (disponibile ovunque).
- Struttura card uniformata: `<a>` dentro `.img-wrap` (come nelle collezioni).
- Rimosso hover opacity: ora le frecce appaiono su tutte le card.
- T-shirt: invertite `cap1`↔`cap2` (fronte/retro).

### Riduzione uso oro
- 13 linee decorative &rarr; `var(--line)` (grigio neutro): FAQ, Club, Lavora con noi, Boutique, Journal, Traccia ordine, Legale, Riciclo, Guida taglie.
- Rimaste oro: focus input, link, step attivi, header, footer, PDP, filtri, badge Bestseller, carrello.
- Rimossa barra di progresso scroll (`#scrollProgress`, -45 righe).
- Rimossa linea oro sotto la boiserie (`.collection`).
- Menu mobile: rimosse le 3 linee oro (voci principali pulite, secondarie con linee grigie).

### Topbar
- Altezza: 33px &rarr; 36px (+3px).
- Padding: `7px 20px 8px` (centratura perfetta).
- Testo: `--fs-12` weight 400.
- `--topbar-h` in `tokens.css` aggiornato a 36px per coerenza con drawer/filtri/PDP.

### Commit di riferimento (6 novembre)
- `fafc953` style(badge): badge verticali stile COS
- `29755cc` feat(slider): slider su tutte le card delle collezioni
- `eb410fc` feat(quick-add): drawer a 2 colonne
- `e9ba473` refactor: eliminato Articoli Simili
- `e96eafd` fix(quick-add): CLS immagini drawer
- `3644880` style(quick-add): drawer mobile/tablet definitivo
- `be2f2b0` chore(quick-add): pulizia CSS
- `e2fe58a` feat(vetrina): slider condiviso
- `3476267` fix(quick-add): allineamento foto affiancate
- `23fd45d` fix(quick-add): desktop tutte le foto, mobile solo 2
- `45bb4f2` fix(nav): img-hover nascosto invece di rimosso
- `d60b0f1` fix(vetrina): T-shirt fronte/retro
- `58fda83` style: ridotto uso oro
- `511bdc3` refactor: rimossa barra scroll
- `952b6a0` style(home): rimossa linea oro boiserie
- `194b1cb` style(menu): rimosse linee oro mobile
- `099621d` style(topbar): altezza 36px, testo centrato
