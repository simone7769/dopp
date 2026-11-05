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

**Non toccato**: prezzi del carrello, dei preferiti nel drawer e del checkout (`.cart-item-price`, `.wishlist-card-price`, `.co-line-price`, peso 700, componenti diversi); prezzo della scheda prodotto (17 px, 600); dimensioni nel popup «Articoli simili» su desktop (12 / 11 px, popup compatto a 4 colonne).

**Causa dell'interlinea larga**: il prezzo è uno `<span>` (inline) dentro `.details`, che eredita l'interlinea 1,6 del body (~25px). Da inline la sua riga restava alta ~25px qualunque `line-height` avesse. Ora `.price` è `display: block` in `collezione.css`, `vetrina.css` e `account.css`. Distanze misurate a 1440 / 820 / 390 px: titolo→prezzo 2 px; immagine→titolo 14 / 14 / 8 px (mobile più stretto, come già in `collezione.css`).

**Attenzione**: nome e prezzo restano basati sul breakpoint, non sulla larghezza della card (a differenza di cuore e badge). A 1 colonna su mobile il prezzo è 12 px su una card da ~390 px: se in agenzia sembra piccolo, alzare `--fs-card-price` a 13 px (come desktop) solo con `[data-cols="1"]`.

**`index.html`**: la home aveva una copia inline di `tokens.css` nel `<style>` del `<head>`, rimasta indietro (mancavano i valori tablet e mobile delle card, quindi il carosello Must Have mostrava 15/14 anche su mobile invece di 14/12, e mancava `--t-page`). Rimossa: ora `index.html` carica `css/tokens.css` prima di `base.css`, come le altre pagine, e i token hanno una sola fonte. Confronto dei valori calcolati prima/dopo a 1440, 820 e 390 px: cambiano solo i token card (voluti) e `--t-page`, che in home era indefinito e ora vale 0,1 s come altrove (dissolvenza di ingresso pagina).
