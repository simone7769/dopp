# Aggiornamenti alle Specifiche — 5 novembre 2026

Postilla al documento `Doppelganger_Specifiche_per_agenzia.html` (fermo al 4 novembre 2026).
Le note che seguono integrano o modificano le specifiche originali; la tabella delle dimensioni (pag. 5), la card componente (pag. 7) e la card collezione (pag. 15) sono già allineate.

---

## 1. Didascalie delle card: scala, pesi, interlinea

**Cosa è cambiato**

| | Prima | Dopo |
|---|---|---|
| Titolo desktop / tablet / mobile | 15 / 14 / 14 px | **15 / 14 / 14 px** |
| Prezzo desktop / tablet / mobile | 14 / 13 / 12 px | **13 / 12 / 12 px** |
| Titolo e prezzo ≤380 px | 13 / 11 px | rimosso (resta 14 / 12) |
| Titolo e prezzo ≤340 px | entrambi 11 px | rimosso |
| Peso prezzo | 600 (account, correlati, popup simili: 700) | **500**, token `--fw-card-price` |
| Prezzo scontato (`.price-now`, `.price-off`) | 700 / nessun peso | 500 (rosso e barrato lo distinguono) |
| Interlinea titolo / prezzo | 1,4 / 1,6 ereditata | **1,28 / 1,28** |
| Spazio titolo–prezzo | 4 px (2 px su mobile) | **2 px** ovunque |

**Perché**: scala più netta tra nome e prezzo (2 px invece di 1 px su desktop), prezzo meno pesante del nome, niente valori fuori scala a schermi stretti, righe di testo più compatte.

**File**: `css/tokens.css` (token e breakpoint), `css/collezione.css`, `css/vetrina.css`, `css/home.css`, `css/account.css`, `css/prodotto.css`, `css/similar-modal.css`, `design/token.json`, `index.html` (vedi sotto).

**Non toccato**: prezzi del carrello, dei preferiti nel drawer e del checkout e prezzo della scheda prodotto (*superato dal § 2: ora tutti a 500*); dimensioni nel popup «Articoli simili» su desktop (12 / 11 px, popup compatto a 4 colonne).

**Causa dell'interlinea larga**: il prezzo è uno `<span>` (inline) dentro `.details`, che eredita l'interlinea 1,6 del body (~25px). Da inline la sua riga restava alta ~25px qualunque `line-height` avesse. Ora `.price` è `display: block` in `collezione.css`, `vetrina.css` e `account.css`. Distanze misurate a 1440 / 820 / 390 px: titolo→prezzo 2 px; immagine→titolo 14 / 14 / 8 px (mobile più stretto, come già in `collezione.css`).

**Attenzione**: nome e prezzo restano basati sul breakpoint, non sulla larghezza della card (a differenza di cuore e badge). A 1 colonna su mobile il prezzo è 12 px su una card da ~390 px: se in agenzia sembra piccolo, alzare `--fs-card-price` a 13 px (come desktop) solo con `[data-cols="1"]`.

**`index.html`**: la home aveva una copia inline di `tokens.css` nel `<style>` del `<head>`, rimasta indietro (mancavano i valori tablet e mobile delle card, quindi il carosello Must Have mostrava 15/14 anche su mobile invece di 14/12, e mancava `--t-page`). Rimossa: ora `index.html` carica `css/tokens.css` prima di `base.css`, come le altre pagine, e i token hanno una sola fonte. Confronto dei valori calcolati prima/dopo a 1440, 820 e 390 px: cambiano solo i token card (voluti) e `--t-page`, che in home era indefinito e ora vale 0,1 s come altrove (dissolvenza di ingresso pagina).


---

## 2. Pulizia CSS, fase 1: una sola fonte per valori e didascalie

Interventi senza cambi di layout, tranne i tre voluti elencati sotto.

**Token nuovi** (`css/tokens.css`, `design/token.json`)

| Token | Valore | Uso |
|---|---|---|
| `--fs-18` | 18 px | simboli + / − / × nei controlli, citazione della vetrina |
| `--fw-price` | 500 | prezzo di un articolo, ovunque |

`--fw-card-price` resta come alias di `--fw-price`, così i fogli che lo usano non cambiano.

**Font-size scritti a mano → token**: 13 occorrenze di 16, 18 e 26 px in `base.css`, `boutique.css`, `carrello.css`, `checkout.css`, `filtri.css`, `prodotto.css`, `similar-modal.css`, `vetrina.css`. Restano a mano solo quattro misure display usate una volta (`club.css` 48 px, `looks.css` 56 / 44 / 38 px) e i due valori in `em` di `home.css`, relativi al contesto.

**Pesi dei prezzi unificati a 500** (`--fw-price`)

| Prezzo | Prima | Dopo |
|---|---|---|
| Card (collezioni, vetrina, home, account, correlati) | 500 | 500 |
| Carrello, preferiti nel drawer, righe del checkout | 700 | **500** |
| Scheda prodotto, normale e in saldo (`.pdp-price`, `.pdp-price-now`) | 700 | **500** |
| Prodotto in evidenza nella vetrina | 500 | 500 |

Il **totale** del checkout resta a 700: è un riepilogo, non il prezzo di un articolo. Nota: le Specifiche e la postilla del 5 novembre indicavano 600 per la scheda prodotto, ma il CSS applicava 700.

**Didascalia delle card in una regola unica**: nome e prezzo sono definiti una volta in `base.css` (sezione «Didascalia card prodotto») e valgono per collezioni, vetrina, preferiti in account, Must Have in home e correlati in scheda prodotto. Dai fogli di pagina sono state tolte le copie; restano solo padding e allineamento propri di ogni contesto. Nel Must Have il barrato e il prezzo in saldo ora usano `--price-strike` e `--danger` invece di `#999` e `#a32638` scritti a mano (stessi colori). Resta fuori il popup «Articoli simili», che ha una scala compatta propria.

**Cosa cambia a schermo** (confronto degli stili calcolati di tutte le 38 pagine a 1440, 820 e 390 px, prima e dopo)

- Must Have (home e conferma ordine): spazio nome→prezzo da 1 a **2 px**, come tutte le altre card. La sezione cresce di 1 px.
- Scheda prodotto: prezzo da 700 a **500**.
- Vetrina su mobile: immagine→nome da 14 a **8 px**, come le collezioni. Ogni card si accorcia di 6 px.

Carrello, preferiti e checkout sono generati al momento e nella demo statica partono vuoti: il passaggio da 700 a 500 è verificato sul CSS, non a schermo. Nessun'altra proprietà cambia su nessuna pagina.

**File**: `css/tokens.css`, `css/base.css`, `css/collezione.css`, `css/vetrina.css`, `css/account.css`, `css/home.css`, `css/prodotto.css`, `css/checkout.css`, `css/carrello.css`, `css/boutique.css`, `css/filtri.css`, `css/similar-modal.css`, `design/token.json`, questo file.

---

## 3. Pulizia CSS, fase 2: breakpoint

**Regola** (scritta anche in `css/tokens.css`, sezione «Preferenze del dispositivo»)

- **1024 / 640** per tutto: spaziature, rientri, carousel, cuore preferiti, dettagli tipografici.
- **900 px solo come soglia di contenuto**, nei blocchi in cui il layout passa a meno colonne. Ognuno è preceduto da un commento che lo spiega.

**Perché non tutto a 1024.** Portando tutte le 29 media query a 1024, a 901–1024 px (iPad orizzontale) la scheda prodotto diventava una colonna sola, con «Aggiungi al carrello» a metà pagina. La vetrina impilava capitoli e capo in evidenza con immagini a tutta larghezza (+2.400 px di pagina). Il journal passava a 2 colonne giganti, con un articolo da solo in fondo. In quella fascia c'è ancora spazio per la versione desktop.

**Come è stato fatto.** Ogni blocco `max-width: 900px` è stato diviso in due:

| Va a 1024 | Resta a 900 (cambio di colonne) |
|---|---|
| Rientri di pagina (account, boutique, club, FAQ, legali, journal, looks, lavora con noi, riciclo, carrello) | Scheda prodotto: due colonne, info sticky, azioni |
| Carousel Must Have, Journal e correlati in scheda (2,3 card visibili) | Vetrina: capitoli, capo in evidenza, griglia prodotti a scorrimento, rientro del manifesto |
| Frecce dei carousel a 44 px | Carrello: riepilogo sotto, vantaggi in colonna |
| Titolo della collezione (segue la toolbar tablet, già a 1024) | Journal 3→2 colonne, Club 4→2 fasce, app, traccia ordine, guida taglie, form lavora con noi, indirizzi e preferiti in account, articoli di looks |
| Cuore preferiti sempre visibile sotto 1025 px (prima sotto 901) | Popup «Articoli simili» 4 / 3 colonne |

In totale: 29 media query, di cui 13 interamente a 1024, 8 interamente a 900 e 8 divise.

**Verifica**

- Stili calcolati di tutte le 38 pagine a 1440, 820, 700 e 390 px: identici a prima.
- Cambia solo la fascia 901–1024 px, controllata a schermo a 960 e 1024 px. Le pagine si accorciano di 20–180 px per i rientri tablet. Le schede prodotto si allungano di circa 60 px per il carousel dei correlati a 2,3 card, come in home.
- In vetrina il rientro del manifesto è stato riportato a 900 dopo il controllo a schermo: a 1024 si disallineava dai capitoli, che restano a due colonne.

**Restano a mano** le cinque larghezze massime a 900 px (`app.css`, `club.css`, `faq.css` ×2, `looks.css` ×3): sono misure di contenitore, non breakpoint.

**Da decidere in seguito**: eliminare anche la soglia 900 richiede un layout tablet progettato per quelle pagine (per esempio la scheda prodotto a due colonne strette tra 641 e 1024 px). È lavoro di progettazione, non di pulizia.

**File**: `css/tokens.css`, `css/base.css`, `css/account.css`, `css/app.css`, `css/boutique.css`, `css/carrello.css`, `css/club.css`, `css/collezione.css`, `css/faq.css`, `css/guida-taglie.css`, `css/home.css`, `css/journal.css`, `css/lavora-con-noi.css`, `css/legale.css`, `css/looks.css`, `css/prodotto.css`, `css/riciclo.css`, `css/similar-modal.css`, `css/traccia-ordine.css`, `css/vetrina.css`, questo file.

---

## 4. Pulizia CSS, fase 3: contrasto dei colori

Obiettivo: testo informativo almeno a 4,5:1 (WCAG AA), testo grande (≥24 px) almeno a 3:1. I rapporti sono calcolati sullo sfondo carta `#FCFCFB` e verificati anche su crema `#FAF8F5` e grigio `#F5F5F5`; i valori tra parentesi sono sul fondo peggiore.

**Token cambiati o aggiunti** (`css/tokens.css`, `design/token.json`)

| Token | Prima | Dopo | Contrasto su carta |
|---|---|---|---|
| `--muted` | #8A7D63 (3,9:1) | **#7A6D54** | 4,9:1 (4,7:1) |
| `--price-strike` | #999999 (2,8:1) | **#6F6F6F** | 4,9:1 (4,6:1) |
| `--size-disabled` | #C9C3B8 (1,7:1) | **#938D83** | 3,2:1 (3,0:1) |
| `--gold-text` (nuovo) | — | **#8C6930** | 4,9:1 (4,6:1) |
| `--gold-text-large` (nuovo) | — | **#AB874E** | 3,2:1 (3,1:1) |
| `--gold` | #B8935A | invariato | 2,8:1: solo linee, fondi, bordi, icone |

Le tinte sono le stesse: cambia solo la luminosità, il minimo necessario per superare la soglia.

**L'oro**: `--gold` resta l'accento per tutto ciò che non è testo. Dove l'oro colora un testo ora si usa `--gold-text`: 46 regole tra occhielli (collezione in scheda prodotto, sartoria, conferma ordine), voce di menu attiva, filtri attivi del journal, «Vedi tutto» nel megamenu e link al passaggio del mouse. `--gold-text-large` vale per i numeri dei passaggi in sartoria (56 px), il «×2» del Club (48 px) e il nome della fascia Gold. Restano su `--gold` le 8 regole che colorano icone e segni grafici: cuore e cestino nei preferiti, icone del Club e di traccia ordine, spunta di conferma, stelle di valutazione delle boutique, trattini degli elenchi FAQ, icona «Vedi come ti sta».

**Badge** (`css/collezione.css`): ora sono pieni, non più semitrasparenti, così il contrasto non dipende dalla foto sotto.
- Bestseller: fondo `--gold` pieno, testo inchiostro `--ink` (5,0:1). Prima era bianco su oro al 92% (2,6:1 su foto chiara).
- Esclusiva: stesso bronzo #8C6F42, pieno (4,7:1). Prima era al 92% (4,0:1).
- New in, Saldi, Outlet, Ultimi pezzi superavano già 4,5:1 anche su foto bianca: invariati.

**Altri allineamenti**
- Taglia esaurita in scheda prodotto: `#c9c3b8` scritto a mano → `var(--size-disabled)`. Prima non seguiva il token.
- Segnaposto del codice promo nel carrello: `#999` → `var(--muted)`, come negli altri campi.
- Club, nome della fascia Silver: #A8A5A0 (2,3:1) → #8F8C87 (3,3:1). Bronze e Platinum erano già sopra 3:1.

**Verifica**: stili calcolati di tutte le 38 pagine a 1440 e 390 px. Cambiano solo i colori elencati sopra; nessuna misura, spaziatura o posizione si sposta.

**Ancora da fare in questa fase**: testi informativi sotto i 12 px. Fuori da questa fase: le icone in oro (2,8:1) sono sotto il 3:1 consigliato per gli elementi grafici che portano informazione, come il cuore attivo.

**Documenti da aggiornare** (fase 5): `linee-guida-badge.html` (Bestseller ed Esclusiva) e la tabella colori delle Specifiche.

**File**: `css/tokens.css`, `css/collezione.css`, `css/club.css`, `css/prodotto.css`, `css/carrello.css`, `css/account.css`, `css/base.css`, `css/boutique.css`, `css/conferma.css`, `css/faq.css`, `css/guida-taglie.css`, `css/journal.css`, `css/lavora-con-noi.css`, `css/legale.css`, `css/looks.css`, `css/similar-modal.css`, `css/traccia-ordine.css`, `design/token.json`, questo file.
