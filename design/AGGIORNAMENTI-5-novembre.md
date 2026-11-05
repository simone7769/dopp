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
