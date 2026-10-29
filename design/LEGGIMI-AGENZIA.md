# Doppelgänger — Guida per l'agenzia

Documento di accompagnamento al pacchetto demo + specifiche. Per chi svilupperà il sito vero sulla piattaforma dinamica.

## Cosa c'è nel pacchetto

| File / cartella | Cosa contiene |
|---|---|
| `*.html`, `css/`, `js/` | Demo statica navigabile (**35 pagine**) |
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
- **Lighthouse DevTools** (Chrome 153, v13.4.1, 18 ottobre 2026, home in produzione):
  - **Desktop** (nessuna emulazione): Performance 100/100, Accessibilità 100/100, Best Practices 100/100, SEO 100/100
  - **Mobile** (Moto G Power + 4G lenta): Accessibilità 100/100, Best Practices 100/100, SEO 100/100, **Performance 93/100**
  - Il limite del 93 mobile è il LCP (3,2s), dovuto al video hero da 2,4 MB e ai 4 font caricati. L'agenzia potrà intervenire con `srcset` responsive sull'immagine hero, video `.webm`, formati AVIF, e build system per la minificazione di CSS/JS.
  - Nota: i punteggi possono variare leggermente (±5) tra una misurazione e l'altra perché dipendono dal carico del dispositivo e della rete. Le metriche stabili sono: FCP (1,1s), Speed Index (1,2s), TBT (0ms), CLS (0).
- **Immagini home** ottimizzate WebP q80 (-47%, da 3,2 MB a 1,7 MB)
- **Video hero** con `preload="none"` + poster per LCP ottimale
- **Meta description** su tutte le 35 pagine
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

- **Skip-link «Vai al contenuto»**: iniettato da `layout.js`, appare al focus da tastiera. Punta a `<main id="main">` (presente su 34 pagine su 35; escluso `checkout.html`, pagina senza header/footer iniettati).
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

## Contatti

Vedi `design/CREDITI.md`.
