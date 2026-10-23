# Aggiornamenti del 23 ottobre 2026

Postilla alle **Specifiche per l'agenzia** (`Doppelganger_Specifiche_per_agenzia.html`, ferme al 20 ottobre). Le modifiche sotto sono già applicate nella demo ma non compaiono nel documento di presentazione, perché le pagine a dimensione fissa non accettano testo aggiuntivo.

La documentazione **completa** delle modifiche del 20-23 ottobre resta in `CHANGELOG.html`, `DIFF-FILES.html`, `NOVITA-SITO.html` e `LEGGIMI-AGENZIA.md`. Questo file raccoglie solo i **dettagli tecnici** emersi il 23 ottobre.

---

## 1. Banner carrello `.cp-ship`

**Dove**: `carrello.html`, sopra il riepilogo ordine.

- Rettangolo con bordo oro (`1px solid var(--gold)`).
- Altezza **52 px**, allineata al bottone «Concludi ordine» (`.cp-checkout`, stesso `height: 52px`).
- Testo centrato via `display: flex; align-items: center; justify-content: center`.
- Su mobile, se il testo va a capo, il contenitore cresce grazie a `min-height` (non `height`).
- CSS in `css/carrello.css`.

---

## 2. Lazy images con `width`/`height` espliciti (fix CLS)

**Dove**: tutte le `<img loading="lazy">` del sito.

- Ogni immagine lazy ha `width` e `height` espliciti, letti dalle dimensioni reali del file `.webp`.
- Serve a evitare il **Cumulative Layout Shift** (CLS): il browser riserva lo spazio corretto prima del caricamento.
- Il CSS continua a controllare il layout (`width: 100%; height: auto` vince comunque), quindi **non cambia nulla visivamente**.
- Copertura attuale: **93 immagini su 111**.
- **Eccezione voluta**: le 2 immagini della feature di `vetrina.html` (`3.webp`, `3b.webp`) non hanno dimensioni esplicite, perché il contenitore è in una griglia con `height: 100%` e le dimensioni causerebbero zoom anomalo. Il fix CLS per quelle 2 immagini è rinviato a quando l'agenzia rifarà la vetrina.

---

## 3. Video `az.mp4` con SAR errato

**Dove**: `images/az.mp4` (video sorgente della collezione Cerimonia).

- Il video ha **SAR errato**: `1080x1080 [SAR 2:3 DAR 2:3]`. In pratica è un quadrato che i player mostrano come verticale, con i pixel "allungati".
- I frame estratti **senza correzione** appaiono **stirati in verticale**.
- **Comando corretto** per estrarre i frame:
  `ffmpeg -y -ss 00:00:02 -i images/az.mp4 -vf "scale=1380:2070" -frames:v 1 images/output.jpg`
- Il parametro `scale=1380:2070` forza il formato verticale **senza stirare** il soggetto.
- Poi convertire in WebP: `cwebp -q 90 images/output.jpg -o images/output.webp`.
- **Già sistemato**: `ce1.webp` (Smoking uomo in tessuto twill). Le altre immagini della sezione (`ce2`, `ce3`, `ce4`, `2.webp`) sono state verificate corrette.

---

## Nota finale

Quando l'agenzia rifarà il documento di presentazione, queste 3 note potranno essere integrate nel layout (pagine a dimensione fissa, `overflow: hidden`). Nel frattempo, questo file è la fonte di verità per i dettagli tecnici del 23 ottobre.
