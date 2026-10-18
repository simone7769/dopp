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
| `design/Doppelganger-Proposta-nuovo-sito.pdf` | Direzione strategica del progetto |
| `design/Doppelganger_Specifiche_per_agenzia.html` | Specifiche tecniche dettagliate (sorgente HTML editabile) |
| `design/CHANGELOG.html` | Elenco dei commit con descrizione |
| `design/DIFF-FILES.html` | File toccati, con righe aggiunte/rimosse |
| `design/BADGE.html` | Regole e codice per le etichette prodotto |
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
- **Footer ristrutturato**: trust bar, 3 colonne, 5 link legali in basso, 7 voci nuove
- **Uniformazione "Boutique"**: era "Store Locator" / "Negozi"
- **Ancore `#spedizioni` e `#resi`** funzionanti

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
- **`token.json`** allineato a `tokens.css` (header 169 px, bottoni telefono 44 px, `--fs-16`, spaziature griglia e carosello).

## Contatti

Vedi `design/CREDITI.md`.
