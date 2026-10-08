# MODIFICHE AL PDF "SPECIFICHE PER L'AGENZIA"
Data: 8 ottobre 2026
Stato: da applicare al PDF attuale (versionato ottobre 2024)

---

## PAG. 1 — COPERTINA

**Modifica 1.1** — Colore inchiostro
- Da: `INCHIOSTRO #282B2B`
- A: `INCHIOSTRO #2B2B2B`

**Modifica 1.2** — Data in fondo
- Da: `SPECIFICHE PER L'AGENZIA - OTTOBRE 2024`
- A: `SPECIFICHE PER L'AGENZIA - OTTOBRE 2026`

**Modifica 1.3** — Sottotitolo (invariato, va bene com'è)
- `Riferimento per riportare la demo statica sulla piattaforma di Doppelgänger Roma`

---

## PAG. 2 — "COSA È QUESTO DOCUMENTO"

**Modifica 2.1** — Sostituire interamente il blocco "COSA È STATO LETTO" con:

> Valori ricavati dai file della demo e ricontrollati riga per riga:
> `base.css`, `home.css`, `collezione.css`, `category.css`, `filtri.css`, `journal.css`, `looks.css`, `prodotto.css`, `carrello.css`, `checkout.css`, `conferma.css`, `club.css`, `legale.css`, `tokens.css`;
> `nav.js`, `layout.js`, `filtri.js`, `prodotto.js`, `carrello.js`, `checkout.js`, `conferma.js`, `articoli.js`, `boutiques.js`, `prodotti.js`;
> tutte le 21 pagine HTML.
> I dati di esempio (`prodotti.js`, `boutiques.js`, `articoli.js`) sono segnalati come tali.
> I design token sono in `css/tokens.css` e `design/token.json`.
> I font sono quelli veri del marchio, Cormorant Garamond e Jost, descritti a pagina 4.

---

## PAG. 3 — PALETTE

**Modifica 3.1** — Aggiungere in fondo alla sezione "COME SI USANO":

> I valori sono definiti una sola volta in `css/tokens.css` (variabili CSS) e replicati in `design/token.json` per l'agenzia. Modifiche future: cambia lì, non nei singoli file.

**Modifica 3.2** — Confermare la palette (nessuna modifica ai colori).

---

## PAG. 4 — TIPOGRAFIA (pesi)

**Nessuna modifica.** I pesi caricati sono corretti:
- Cormorant Garamond: 300, 400, 500
- Jost: 300, 400, 500, 600, 700

---

## PAG. 5 — SCALA TIPOGRAFICA (RISCRIVERE LA TABELLA)

**Modifica 5.1** — Sostituire la tabella "La scala, dal bottone all'hero" con:

| DIMENSIONE | ESEMPIO | DOVE SI USA |
|---|---|---|
| 10 px | SCOPRI DI PIÙ | Bottoni (maiuscolo, spaziatura 3 px) |
| 11 px | Etichette | Link, didascalie, titoli colonna megamenu, badge |
| 12 px | Navigazione · € 29,99 | Navigazione, topbar, prezzi nelle card, intestazioni footer |
| 13 px | Voci del menu mobile | Menu mobile, eyebrow, FAQ summary, testo footer |
| 14 px | Maglia girocollo | Titoli card prodotto, nomi Cerimonia e Essential (maiuscolo), titoli Journal, campo di ricerca, descrizione PDP |
| 17 px | € 139,00 | Prezzo nella scheda prodotto (grassetto) |
| 18 px | Corpo editoriale | Testi editoriali (Journal, Club, legali, carrello). H2 delle pagine legali e di sezione |
| clamp(20px, 1.6vw, 24px) | Privacy Policy | Hero pagine interne (Journal, Club, legali) |
| clamp(24px, 2.2vw, 32px) | Home hero · conferma | Titolo principale di pagina (home, conferma) |
| clamp(27px, 2vw, 30px) | Abito uomo monopetto | Titolo scheda prodotto, "Il tuo carrello" |
| 38–56 px | Numeri step | Elementi decorativi (step Sartoria, ×2 Club) |

**Modifica 5.2** — Sostituire la nota sotto la tabella con:

> **Gerarchia visiva**: h1 > h2 = corpo. La distinzione tra h2 e corpo non è dimensionale (entrambi 18 px) ma affidata a: serif maiuscolo, linea oro sotto, spaziatura sopra e sotto. L'hero h1 usa peso 500, l'h2 peso 400.

---

## PAG. 6 — MISURE

**Modifica 6.1** — Nella tabella breakpoint, **eliminare la riga duplicata** "fino a 640" (è scritta due volte identica).

**Modifica 6.2** — Nella colonna "MISURE RICORRENTI", aggiungere queste voci:

| Elemento | Valore |
|---|---|
| Area di tocco minima | 44×44 px |
| Raggio cerchi colore (PDP) | 22 px |
| Immagine carrello (drawer) | 90×110 px |
| Immagine carrello (drawer, mobile ≤520) | 76×94 px |
| Proporzioni immagine PDP | 3:4 |
| Proporzioni card mobile | 4:5 |
| Proporzioni hero video | 16:9 |
| Proporzioni correlati PDP | 3:4.5 |

**Modifica 6.3** — Aggiungere nota finale:

> Tutte le misure sono definite in `css/tokens.css`. Modifiche future: cambia lì.

---

## PAG. 7 — COMPONENTI

**Modifica 7.1** — Confermare la sezione. Aggiungere:

> Il bottone "PayPal" nel drawer è 18 px (allineato al corpo editoriale). Le aree di tocco rispettano il minimo 44×44 px anche nelle icone dell'header mobile.

---

## PAG. 8 — NAVIGAZIONE DESKTOP

**Nessuna modifica sostanziale.** Il comportamento descritto è confermato.

---

## PAG. 9 — NAVIGAZIONE MOBILE

**Modifica 9.1** — Spostare la riga "Da correggere: le icone dell'header mobile hanno area di tocco di 36 px" nella sezione "corretto":

> **Corretto**: le icone dell'header mobile ora hanno area di tocco 44 px, come tutto il resto.

**Modifica 9.2** — Riscrivere la riga "Footer desktop":

> **Footer desktop**: newsletter + 4 colonne (**Corporate**, **Informazioni utili**, **Servizio clienti**, **Seguici**) con **18 voci totali**, **4 social linkati** (Instagram, Facebook, TikTok, LinkedIn). Il sito reale ha 32 voci; la demo ne ha 18, snellite. Voci di nicchia (Whistleblowing, Parità di genere, Istruzione riciclo, SiteMap, Klarna, Doppelgänger APP) tolte.

**Modifica 9.3** — Riga "Footer mobile": confermare.

---

## PAG. 10 — PANNELLI LATERALI

**Modifica 10.1** — Nella riga della tabella "Carrello", aggiungere:

> Il carrello **persiste** in `sessionStorage` (chiave `dg_cart`): il contenuto sopravvive al cambio pagina e al refresh del browser.

**Modifica 10.2** — Nella riga "Ricerca", confermare.

---

## PAG. 11 — DATI E STATO (RISCRIVERE INTERAMENTE LA TABELLA)

**Modifica 11.1** — Sostituire la tabella con:

| Funzione | Nella demo | Sul sito vero |
|---|---|---|
| **Preferiti** | Salvati in `sessionStorage` (chiave `dg_wishlist`); i cuori di tutte le card restano sincronizzati; badge sull'icona | Legati all'account |
| **Carrello** | Persiste in `sessionStorage` (chiave `dg_cart`); contatore condiviso tra badge, drawer, pagina carrello e scheda prodotto | Ordine reale, totale dal sistema |
| **Checkout** | Visivo, in una pagina. Nessun pagamento reale. Salva l'ordine in `sessionStorage` (chiave `dg_order`) per la pagina di conferma | Integrazione con il sistema di pagamento |
| **Conferma ordine** | Pagina con header e footer completi. Legge `dg_order`. Svuota `dg_cart` a ordine concluso | Ordine reale dal sistema |
| **Paese e lingua** | Cambia solo l'etichetta nel footer; catalogo, prezzi e lingua restano uguali | Catalogo, prezzi e lingua per Paese |
| **Ricerca** | Filtra un elenco locale di prodotti demo (25), attesa di 120 ms mentre si scrive; prezzo in euro | Catalogo vero e suggerimenti |
| **Boutique** | 10 boutique di esempio in 8 Paesi (indirizzi ed e-mail fittizi), filtro per città o Paese, senza mappa; "Indicazioni" apre Google Maps | Dati reali e mappa |
| **Journal** | **9 articoli** in un solo elenco condiviso tra home e archivio, 5 categorie filtrabili. Include la card **Doppelgänger Club** in cima | Contenuti da un sistema di gestione |
| **Club** | Pagina statica: **4 fasce** (Bronze, Silver, Gold, Platinum), **5 benefici con icone oro**, **7 FAQ** | Area riservata dinamica |
| **Link "#"** | Non fanno nulla (non riportano in cima alla pagina). Molti ora puntano a pagine reali (Club, Chi Siamo, Shop Experience, legali, social) | Da sostituire con gli indirizzi veri |
| **Header, pannelli, footer** | Componenti condivisi, caricati su ogni pagina da uno script comune (`js/layout.js`) | Modelli riusabili della piattaforma |
| **Account e Registrazione** | 2 pagine statiche: `account.html` (dashboard con 4 tab: Ordini, Indirizzi, Dati personali, Preferiti) e `registrazione.html` (form iscrizione). Il drawer login del sito punta a queste pagine | Area riservata con backend |

---

## PAG. 12 — MOVIMENTO E ACCESSIBILITÀ

**Modifica 12.1** — Nella sezione "Accessibilità", **cancellare la riga**:

> ~~Area di tocco di almeno 44 px. Eccezioni da sistemare: icone dell'header mobile (36 px), pulsante «aggiungi» nelle card dei preferiti, molto piccolo, e cuori delle card a 3 colonne su telefono (24—28 px).~~

**Sostituirla con:**

> Area di tocco di almeno 44 px, rispettata in tutto il sito.

**Modifica 12.2** — Confermare il resto.

---

## PAG. 13 — HOME STRUTTURA

**Modifica 13.1** — Punto **7 Journal**, sostituire:

> ~~Carosello degli 8 articoli (4 visibili, 3:4) con titolo maiuscolo e testo breve, generato da un elenco.~~

**Con:**

> Carosello dei **9 articoli** (4 visibili, 3:4) con titolo maiuscolo e testo breve, generato da un elenco condiviso con l'archivio Journal. Include la card **Doppelgänger Club** in cima.

**Modifica 13.2** — Punto **8 Footer**, sostituire:

> ~~Newsletter, quattro colonne (Mettiti in contatto, Azienda, Servizi, Area legale), riga con Paese e lingua, logo testuale, social.~~

**Con:**

> Newsletter, quattro colonne (**Corporate, Informazioni utili, Servizio clienti, Seguici**), riga con Paese e lingua, logo testuale, 4 social linkati. Vedi pagina 15 per i contenuti.

---

## PAG. 14 — COLLEZIONE E SCHEDA PRODOTTO

**Modifica 14.1** — Sezione "SCHEDA PRODOTTO", aggiornare la riga "Testi":

> ~~Testi: collezione in oro 11 px maiuscolo; titolo serif 27—30 px; prezzo 15 px grassetto; descrizione 13 px, peso 300, interlinea 1,75, larghezza massima 46 caratteri.~~

**Con:**

> Testi: collezione in oro 11 px maiuscolo; titolo serif 27—30 px; **prezzo 17 px grassetto**; **descrizione 14 px**, peso 300, interlinea 1,75, larghezza massima 46 caratteri.

**Modifica 14.2** — Sezione "SCHEDA PRODOTTO", sostituire la riga "Prodotti correlati":

> ~~Dettagli in fisarmonica (11 px maiuscolo). Sotto i 900 px una colonna. Prodotti correlati: titolo serif 26 px.~~

**Con:**

> Dettagli in fisarmonica (11 px maiuscolo). Sotto i 900 px una colonna. **Prodotti correlati: carosello in formato Must Have** (4 card, 3.5 visibili su desktop, 2.3 su tablet, 1.1 su mobile). Immagini 3:4.5. Titolo serif 18 px. Frecce ai bordi su desktop, drag col mouse, swipe su touch.

---

## PAG. 15 — PAGINE (RISCRIVERE INTERAMENTE)

**Modifica 15.1** — Sostituire il blocco "NELLA DEMO" con:

> Home; collezioni Al 2026, Cerimonia, Essential; 3 schede prodotto complete; archivio Journal (4 colonne, filtri); 5 pagine Journal (Looks AW26, Den Haag, Sartoria, Chi siamo, Esperienza); **Doppelgänger Club** (4 fasce, 5 benefici con icone, 7 FAQ); **carrello come pagina intera**; **checkout in una pagina**; **conferma ordine** con header e footer; **4 pagine legali con testi reali Doppelgänger**: Privacy+Cookie (unificate), Termini e Condizioni, Spedizioni e Resi, Dichiarazione di Accessibilità. **Account** (`account.html`) con dashboard a 4 tab (Ordini, Indirizzi, Dati personali, Preferiti); **Registrazione** (`registrazione.html`).

**Modifica 15.2** — Sostituire il blocco "FOOTER: QUATTRO MODELLI DI PAGINA" con:

> **FOOTER STRUTTURA DOPPELGÄNGER (demo)** — 4 colonne, 18 voci totali:
>
> **01 · Corporate** (5)
> Doppelgänger Club · Chi Siamo · Shop Experience · Lavora con noi · Franchising
>
> **02 · Informazioni utili** (6)
> Store Locator · Guida alle Taglie · Gift Card · Cookie e Privacy Policy · Dichiarazione accessibilità · Termini e condizioni di vendita
>
> **03 · Servizio clienti** (4)
> Contattaci · Resi e Rimborsi · Ordini e Spedizioni · Metodi di Pagamento
>
> **04 · Seguici** (4)
> Instagram · Facebook · TikTok · LinkedIn
>
> Il sito reale ha 32 voci in 4 colonne (Corporate, Informazioni utili, Servizio clienti, Seguici). La demo ne ha 18: le voci di nicchia (Whistleblowing, Parità di genere, Istruzione riciclo, SiteMap, Klarna, Doppelgänger APP) sono state tolte e restano da confermare con il cliente.

---

## PAG. 16 — PERIMETRO (AGGIORNARE)

**Modifica 16.1** — Nella sezione "DA DECIDERE CON IL CLIENTE", aggiungere:

- **Testi delle pagine legali**: la demo usa i testi reali del sito Doppelgänger (Privacy+Cookie unificati, Termini, Spedizioni, Accessibilità). Va confermato con il cliente che siano aggiornati.
- **Sezione "Misure adottate" in `accessibilita.html`**: opzionale. Il testo reale di Doppelgänger non elenca le misure tecniche adottate; aggiungerle richiede conferma del cliente.
- **Test manuali finali** prima del push: mobile reale, wishlist, filtri, console del browser, cross-browser (Safari).

**Modifica 16.2** — Nella sezione "FUORI DALLA DEMO", confermare l'elenco attuale, con una modifica:

- ~~Account, accesso e Doppelgänger Club~~ → **Account e accesso** (il Club è ora **nella demo**, come pagina statica)
- ~~Checkout e pagamenti reali (carte, PayPal, Klarna)~~ → **Checkout e pagamenti reali** (il checkout visivo è ora nella demo)

**Elenco aggiornato "FUORI DALLA DEMO":**

- **Account e accesso** (login, registrazione, dashboard)
- **Pagamenti reali** (carte, PayPal, Klarna)
- **Catalogo, filtri reali, taglie e disponibilità**
- **Paesi, lingue e prezzi per Paese**
- **Store locator con mappa e dati reali**
- **SEO**: titoli, indirizzi, dati strutturati
- **Sistema di gestione dei contenuti per il Journal**
- **Newsletter, consensi, cookie e tracciamento**
- **Dati di esempio**: nomi, prezzi e foto della demo non sono coerenti tra home, ricerca e collezioni; vanno sostituiti con il catalogo reale, non riportati
- **Misure di velocità**: ripetere sul sito vero. La demo è più leggera anche perché fa meno cose

---

## PAG. 17 — CHIUSURA

**Modifica 17.1** — Data
- Da: `OTTOBRE 2024`
- A: `OTTOBRE 2026`

---

## CHECKLIST FINALE (dopo aver applicato le modifiche)

- [ ] Pag. 1: colore `#2B2B2B` e data `2026`
- [ ] Pag. 2: blocco "Cosa è stato letto" aggiornato (14 CSS, 10 JS, 21 HTML)
- [ ] Pag. 3: nota sui token aggiunta
- [ ] Pag. 5: scala tipografica riscritta (18px per h2, 17px PDP prezzo, 14px PDP desc)
- [ ] Pag. 6: riga duplicata "fino a 640" eliminata, nuove misure aggiunte
- [ ] Pag. 7: nota PayPal 18px aggiunta
- [ ] Pag. 9: footer aggiornato (18 voci, 4 social), icone header 44px
- [ ] Pag. 10: riga carrello aggiornata (persiste)
- [ ] Pag. 11: tabella riscritta (Club, checkout, conferma, 9 articoli)
- [ ] Pag. 12: eccezioni aree di tocco cancellate
- [ ] Pag. 13: Journal 9 articoli, footer aggiornato
- [ ] Pag. 14: PDP prezzo 17px, descrizione 14px, correlati carosello
- [ ] Pag. 15: "nella demo" + footer riscritti
- [ ] Pag. 16: perimetro aggiornato (Club e checkout ora dentro)
- [ ] Pag. 17: data 2026

---

## NOTE PER IL CLIENTE

- Il PDF attuale dice "8 articoli nel Journal" → ora sono **9** (aggiunta card Club).
- Il PDF attuale dice "carrello non salvato" → ora **persiste** in `sessionStorage`.
- Il PDF attuale dice "Doppelgänger Club fuori dalla demo" → ora è **nella demo** (pagina statica).
- Il PDF attuale dice "footer 4 colonne (Mettiti in contatto, Azienda, Servizi, Area legale)" → ora è **Corporate, Informazioni utili, Servizio clienti, Seguici**, 18 voci, come il sito reale.

---

Fine documento.