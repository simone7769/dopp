# Aggiornamenti alle Specifiche — 4 novembre 2026

> **Integrata il 4 novembre 2026** nelle Specifiche (`Doppelganger_Specifiche_per_agenzia.html`, 20 pagine). Questo file resta come storico; in caso di differenze valgono le Specifiche.

Postilla al documento `Doppelganger_Specifiche_per_agenzia.html` (fermo al 3 novembre 2026).
Le note che seguono integrano o modificano le specifiche originali.

---

## 1. Cuore e badge proporzionali alla card

**Cosa è cambiato**: il cuore preferiti (`.wish`) e il badge prodotto (`.badge`) non usano più media query fisse per breakpoint. Si dimensionano sulla **larghezza reale della card** (container query + `cqw`).

- **Cuore**: `clamp(16px, 7cqw, 26px)`, distanza dall'angolo = metà del lato. Area di tocco 44×44 invisibile (`.wish::after`).
- **Badge**: `--badge-fs: clamp(9px, calc(8.2px + 0.6cqw), 11px)`, `--badge-h: clamp(19px, calc(15px + 2.6cqw), 27px)`.
- **Rimosso**: breakpoint 1024/520 (cuore), breakpoint 641-1024/≤640 (badge), override `[data-cols="1"]`.

**Perché**: proporzione costante a qualunque larghezza di card (1, 2, 3, 4 colonne, carosello, mobile), senza "salti" al cambio di breakpoint.

**Attenzione**: `container-type: inline-size` deve restare su `.product-card`, `.product`, `.pdp-item`, `.vt-card`. Se l'agenzia rimuove `container-type`, cuore e badge tornano a misura fissa.

## 2. Terza opzione colonne su mobile

**Cosa è cambiato**: `filtri.js` espone `opts: [1, 2, 3]` su mobile (era `[1, 2]`). Con `data-cols="3"` su ≤640px, la card mostra solo foto, cuore e (per saldi/outlet) un quadratino `%`.

- **Titolo e prezzo** invisibili a video, ma presenti per screen reader (`visually-hidden`, non `display: none`).
- **Badge**: solo `sale` e `outlet` come quadratino `%` (colore del badge). Gli altri (Bestseller, New in, Ultimi pezzi, Esclusiva) spariscono.
- **Cuore**: visibile e cliccabile.

**Perché**: vista "muro di foto" su mobile, quando l'utente vuole esplorare per immagine senza il rumore di titoli e prezzi.

**Attenzione**: l'opzione 3 colonne è **solo su mobile** (≤640px). Su tablet e desktop lo switch resta 2/3 (tablet) e 3/4 (desktop).

## 3. Quick-add: pulsante `×` e `+` a 1 colonna

**Cosa è cambiato**:

- **Pulsante `×`** in alto a destra del pannellino quick-add (44×44). Al click chiude e **riporta il focus al `+`** che lo aveva aperto (se visibile). Esc e click fuori continuano a funzionare.
- **`+` a 1 colonna**: su mobile, con `[data-cols="1"]` il `+` (quick-add) torna visibile. Prima era nascosto su mobile (≤640px) a prescindere dalle colonne.

**Perché**: chiusura esplicita del pannellino (prima solo click fuori o Esc) e coerenza: a 1 colonna la card è a tutta larghezza, quindi il quick-add è usabile.

**File**: `js/quick-add.js` (creazione `×`, handler), `css/collezione.css` (`.quick-add-close`, `[data-cols="1"] .plus`).

## 4. Area di tocco 44px (WCAG 2.5.5 AA)

**Cosa è cambiato**:

- **Cuore preferiti**: area di tocco 44×44 garantita da `.wish::after` (pseudo-elemento invisibile, non sposta il cuore visibile).
- **Switch colonne**: `.grid-switch button` da 40×40 a 44×44.
- **Quick-add `×`**: 44×44 tramite `--touch-target`.
- **Badge popup simili**: 10px (era 9px, unico testo del sito sotto i 10px).

**Perché**: WCAG 2.5.5 AA richiede area di tocco minima 44×44 CSS px.

## 5. Fix minori e deleghe

**Fix applicati**:

- **Alt**: in `vetrina.html`, `bomber-capsule-dettaglio.webp` ha `alt="Dettaglio del bomber in jersey laminato"` (era "dell'Impermeabile").
- **README**: 38 pagine (era 35).
- **`documents/whistleblowing.pdf`** incluso nello ZIP AGENZIA (prima mancava, il link era rotto).
- **`aria-label` su `<ul>`**: spostato su `h2.visually-hidden` in `pagamenti.html` e `riciclo.html` (tecnica corretta).
- **Linee-guida badge**: intro e §8 allineate (badge attivi su 4 collezioni). PDF rigenerato con immagini e testo aggiornato. `print-color-adjust: exact` per i colori in stampa.
- **`defer`**: documentato con precisione (solo `index.html`; le altre pagine usano script a fine body).

**Tentativi revertati**: menu mobile, chiusura istantanea (`aac6552`) e 150ms (`278402a`). Su device reale non convincevano: revertito con `cd0344f`. Documentato come delega all'agenzia.

**Delegato all'agenzia** (invariato): focus trap negli 8 drawer, code-splitting `nav.js`/`layout.js` (60KB su ogni pagina), scala font 12/14/16/20/24/32, breakpoint 900px residui (~29), vetrina 16 immagini senza `width`/`height` (scelta consapevole), test cross-browser.

---

**Riferimento**: commit da `4415774` a `e4be8c2`. Vedi `CHANGELOG.html` (Sezione 45) e `DIFF-FILES.html` (Sezione 45).
