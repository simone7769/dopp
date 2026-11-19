# Aggiornamenti 19 novembre — ritocchi al menu e alias font

Integra `AGGIORNAMENTI-17-novembre.md`: dove i due testi divergono vale questo.

## Alias font (`bb73bab`)

Gli alias `--fs-NN` non esistono più: CSS e `account.html` usano i token semantici `--text-*` (11 / 12 / 13 / 15 / 18 / clamp 20-24 / clamp 28-38). In `tokens.css` restano solo i token per componente (`--fs-card-title`, `--fs-pdp-title`, `--fs-page-title` ...), che puntano ai `--text-*`.

## Menu desktop (`b3f445d`)

- **Misure**: categorie 15px (`--text-body`), sottocategorie 13px (`--text-ui`). Prima avevano la stessa regola.
- **Distanza tra le colonne**: `--mm-sub-x` 232 → 280px. La colonna minima di `.mm-fixed-body` passa da 432 a 480px (200 + 280): i due valori vanno cambiati sempre insieme, altrimenti le sottocategorie finiscono sulle immagini.
- **Immagini**: con una categoria che ha sottocategorie attiva, le immagini sfumano (opacity + visibility, la griglia non si muove). Regola CSS: `.mm-fixed-body:has(.mm-cat.is-active > .mm-subs) .mm-images`. Tornano quando si passa su una voce senza sottocategorie (Gilet, Vedi tutti), quando il mouse esce dall'elenco, o cambiando tab. In Accessori e Outlet nessuna voce ha sottocategorie: lì le immagini restano sempre visibili.
- **JS toccato**: `js/nav.js` ha un nuovo listener `pointerout` che toglie la categoria attiva all'uscita del mouse dall'elenco (non col focus da tastiera). Questa modifica corregge il testo del 17 nov, secondo cui le immagini non cambiavano mai.
- **Accessori**: le card sono ora Novità, Must Have, Best Seller (`images/ac1.webp`, `ac2.webp`, `ac3.webp`, 3:4 salvo `ac2`, un po' più stretta, ritagliata di circa il 6% in altezza). I link sono `#` provvisori. Derby, Cravatta macro e Calze non sono più nel menu; le immagini `ce3`, `ce4` e `ba3` restano perché le usano le schede prodotto di Cerimonia ed Essential.

## Barra categorie delle collezioni

`.category-bar-item` (Tutti, Cappotti, Giacche ...) da 13 a 12px (`--text-label`), su ai-2026, cerimonia, essential e outlet-abbigliamento.

## Quick-add (`c4a8c5c`)

Il `+` delle schede (`.product-info .plus`, `.vt-card .plus`) usa `--text-lead` (18px) al posto di 20px fisso.

## Browser

`:has()` si aggiunge a `subgrid` e `cqh` tra le cose da provare oltre Chrome (supporto: Chrome 105+, Safari 15.4+, Firefox 121+). Collaudo visivo fatto solo su Chrome.
