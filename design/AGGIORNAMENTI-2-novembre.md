# Aggiornamenti alle Specifiche — 2 novembre 2026

> **Integrata il 3 novembre 2026** nelle Specifiche (`Doppelganger_Specifiche_per_agenzia.html`, 20 pagine). Questo file resta come storico; in caso di differenze valgono le Specifiche.

Postilla al documento `Doppelganger_Specifiche_per_agenzia.html` (fermo al 23 ottobre 2026).
Le note che seguono integrano o modificano le specifiche originali.

---

## 1. Hero: Immagine statica (video sperimentato e abbandonato)

**Decisione**: Si è sperimentato il video come hero (a tutto schermo, senza claim), ma dopo il test si è deciso di tornare all'immagine statica originale. La home usa l'immagine `hero-ai26.webp` con il claim "Vestire bene non è un lusso / È un'abitudine". Il video `doppelganger-uomo-intro.mp4` resta come sezione separata sotto l'hero, con il bottone "Autunno/Inverno 2026".

**Perché**: l'impatto visivo dell'immagine e la coerenza con il claim originale sono stati valutati superiori. Il video, come blocco autonomo, funziona meglio.

---

## 2. Ottimizzazione Media (LCP)

**Cosa è cambiato**: Per migliorare le prestazioni (Lighthouse), sono stati ottimizzati i media principali:
- **Video hero**: da 2.4 MB a 1.3 MB (compresso con `ffmpeg -crf 28`).
- **Immagini principali** (`cerimonia-featured`, `basic-featured`, `bomber-capsule`): ridotte del ~50% con `cwebp`.
- **Script**: `defer` applicato a `index.html` (i 5 `<script src>` nel `<head>` della home, dove bloccherebbero il rendering). Le altre pagine usano script a fine `<body>`, senza `defer`: a fine body non bloccano il rendering, quindi il beneficio sarebbe nullo. Se in futuro servisse `defer` altrove, va prima verificato che gli inline dipendenti (popup, tab) non si rompano.

**Risultato Lighthouse**:
- Desktop: 94/100 (era 76). **Superato** — valore di una prova poi abbandonata: dopo il ripristino dell’immagine statica e le ottimizzazioni successive, il valore attuale è 100 desktop / 98 mobile (Specifiche p17).
- Mobile: 87/100 (era 81). **Superato** — stesso motivo.
- Accessibilità, Best Practice, SEO: 100/100 su entrambi.

> **Nota (3 novembre 2026).** Questi valori si riferiscono a una configurazione poi abbandonata (video come hero). Il valore attuale è **100 desktop / 98 mobile** (Specifiche p17).

**Nota critica**: i preload dei font nel `<head>` (`cormorant-500`, `cormorant-regular`, `jost-regular`, `jost-300`) sono **strategici**. Non rimuoverli: un esperimento di rimozione ha fatto crollare il punteggio da 81 a 55.

---

## 3. Sottolineature

**Cosa è cambiato**:
- **Link testuali** (footer, FAQ, checkout, legale): sottolineatura uniformata con `text-decoration-thickness: 1px` e `text-underline-offset: 3px` (regola globale in `base.css`).
- **Titoli boiserie** (Cerimonia, Essential): sottolineatura fine (1px, offset 4px) applicata a `.card h3`.

**Motivo**: coerenza visiva e migliore leggibilità dei link, senza appesantire il design.

---

## 4. Boiserie

**Cosa è cambiato**:
- **Immagine**: aggiornata a proporzioni `1616 / 777` (era `1616 / 899`). Il file `boiserie-bg1.webp` è stato ritagliato.
- **Card (Cerimonia / Essential)**: riallineate alle nuove proporzioni con valori millimetrici:
  - `.card`: `top: 12.48%`, `height: 74.39%`.
  - `.card:nth-child(1)`: `left: 7.05%`, `width: 36.51%`.
  - `.card:nth-child(2)`: `left: 57.12%`, `width: 36.51%`, `top: 12.36%`.
  - `.card-media`: `width: 100%`, `height: 100%` (per far toccare l'immagine con il pannello).

**Attenzione**: le percentuali sono calibrate sull'immagine 1616x777. Se l'immagine cambia, vanno ricalcolate.

---

## 5. Fix Vari

- **Poster AZ in JPG**: il poster del video nella Selezione (`az-poster`) è stato convertito da WebP a JPG (`az-poster.jpg`) per correggere le proporzioni (era un quadrato 1080x1080, ora è 1380x2070).
- **Titolo popup similar**: ridotto a 22px desktop / 20px mobile (era 26px).
- **Prezzo prodotto**: peso ridotto da 700 a 600 (più elegante, meno "urlato").
- **Pulsante "+"**: ingrandito (font-size a `--fs-26` desktop, `--fs-24` mobile) con area di tocco 44x44px (WCAG).
- **Pulizia `collezione.css`**: rimossi duplicati (-162 righe).

---

**Riferimento**: commit da `a460f06` a `f8fbd59`. Vedi anche `CHANGELOG.html` (Sezione 38) e `DIFF-FILES.html` (Sezione 38).
