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
- **W3C**: 0 errori su HTML/CSS/JS (validator ufficiali W3C)
- **Lighthouse DevTools** (Chrome 153, v13.4.1, 14 ottobre 2026, home in produzione):
  - **Performance**: 100/100 (desktop, nessuna emulazione) — 100/100 (mobile, emulazione Moto G Power + 4G lenta)
  - **Accessibilità**: 100/100
  - **Best Practices**: 100/100
  - **SEO**: 100/100
  - Nota: i punteggi possono variare leggermente (±5) tra una misurazione e l'altra perché dipendono dal carico del dispositivo e della rete. Le metriche stabili sono: LCP, CLS, TBT.
- **Immagini home** ottimizzate WebP q80 (-47%, da 3,2 MB a 1,7 MB)
- **Video hero** con `preload="none"` + poster per LCP ottimale
- **Meta description** su tutte le 35 pagine

## Come aprire la demo

Da terminale, nella cartella del progetto:
- `python3 -m http.server 8000` → apri `http://localhost:8000/`
- Oppure apri `index.html` direttamente nel browser

## Come leggere il codice

- **HTML**: una pagina per file, struttura chiara. Header/footer/drawer sono **iniettati da `js/layout.js`** (non duplicati su ogni pagina).
- **CSS**: `css/tokens.css` (variabili di design system), `css/base.css` (header, footer, drawer, bottoni comuni), poi un CSS per pagina.
- **JS**: `js/nav.js` gestisce tutti i comportamenti interattivi (menu, drawer, carrello, wishlist, ricerca, filtri). `js/layout.js` inietta header/footer. Il resto sono moduli per singola funzionalità.

## Contatti

Vedi `design/CREDITI.md`.
