# Aggiornamenti 17 novembre — menu a tre colonne

Obiettivo: un menu che si legga come quello di Bottega Veneta (voci in frase, immagini grandi su due colonne appoggiate in fondo, sottocategorie a fianco), con la tassonomia reale di doppelganger.it e la scala tipografica nostra. Bottega è il riferimento di struttura, non un modello da copiare.

## Struttura

```
[categorie]   [sottocategorie]   ..........   [img] [img]
 Abiti  >      Vedi tutti                      [img] [img]
 Giacche       Componibili
 …             Monopetto …
 Vedi tutti
                                               [img] [img]
[Contattaci  Boutique  Italia]  ............   didascalie
```

L'ultima riga di didascalie sta sulla stessa linea dei link del piede.

- Cinque voci nella riga in alto: Nuovi Arrivi, Abbigliamento, Accessori, Outlet, Journal. Gift Card resta fuori dal menu.
- **Abbigliamento**: Abiti, Giacche, Giubbotti e Cappotti, Camicie, Maglie, Pantaloni, Polo e T-shirt, Gilet. Le prime sette hanno sottocategorie.
- **Accessori**: 12 voci senza sottocategorie (Scarpe, Profumi, Cravatte, Cinture, Pochette, Cappelli, Papillon, Sciarpe e foulard, Calze, Borse e zaini, Bretelle, Gemelli).
- **Outlet**: nessun albero proprio. Stesse categorie di Abbigliamento più «Accessori e scarpe», tutte verso `outlet-abbigliamento.html`.

### Pulizia rispetto a doppelganger.it

- Camicie divise per stile (Classiche, Casual, Denim, Non stiro); via «Camicie in Cotone», che è un materiale.
- Cappotti non più sotto Giubbotti: un solo gruppo «Giubbotti e Cappotti».
- Capi in maglia solo in Maglie (Giacche in maglia e Polo in maglia spostate lì).
- Tolti «Linea Doppiopetto», «In Evidenza» e «-50% sul secondo».
- Costumi, Bermuda e Guanti esistono solo nell'Outlet del sito vero: per ora fuori.

## Comportamento

- All'apertura e a ogni cambio di tab: nessuna categoria attiva.
- **Immagini fisse per tab**: 4 in Abbigliamento, 3 in Accessori, 4 in Outlet. Non cambiano passando sulle voci.
- Passaggio o focus su una categoria: compaiono le sue sottocategorie nella seconda colonna (allineate in alto). Freccia e sottolineatura segnano la voce attiva.
- **Ritardo di 120 ms** col mouse quando un'altra categoria è già attiva: andando in diagonale verso la seconda colonna non si attivano le voci attraversate. Con tastiera e touch il cambio è immediato.
- **Ordine di tabulazione**: categoria → sue sottocategorie → categoria successiva. Le sottocategorie stanno nel DOM subito dopo la loro categoria; il CSS le sposta nella seconda colonna (`position: absolute` dentro `.mm-cats`).
- Le immagini sono `loading="lazy"` (il pannello è in tutte le pagine); alla prima apertura si scaricano anche quelle degli altri tab, così il cambio tab è immediato.
- **Finestra bassa**: scorre solo il corpo del pannello (`.mm-fixed-body`), la pagina sotto resta ferma; niente viene tagliato.

## Misure

| Elemento | Valore | Token |
|---|---|---|
| Categoria e sottocategoria | 15 px, 400, in frase, spaziatura 0,2 px | `--text-body`, `--tr-05` |
| Passo tra le righe | circa 32 px (interlinea 1,2 + 14 px) | `--mm-step` |
| Colonna categorie | 200 px; sottocategorie da 232 px | `--mm-col`, `--mm-sub-x` |
| Immagini | 2 colonne, 3:4. Come Bottega, la larghezza segue l'altezza del pannello così le due righe stanno sempre dentro: da 130 a 280 px (circa 150 px a 630 px di finestra, 250 px a 900, 280 px da 1080); se il pannello è stretto si stringono. Distanza 14 px in orizzontale, 28 px in verticale | `--mm-card-min`, `--mm-card-max`, `--mm-fit`, `--mm-gap-img` |
| Griglia del corpo | 2 colonne (categorie almeno 432 px, immagini) × 2 righe (voci, piede); ogni tab la riusa con `subgrid` | `.mm-fixed-body`, `.mm-grid` |
| Didascalia | 12 px, 400, allineata a sinistra, 10 px sotto l'immagine | `--text-label` |
| Tab | invariati (13 px maiuscolo) | `--text-ui` |

Nessun valore nuovo nella scala: 15 e 12 px sono già gradini esistenti.

## Link con `?tipo=`

Le voci puntano alla collezione con il tipo già filtrato, per esempio `ai-2026.html?tipo=Giacche`. `filtri.js` legge il parametro all'arrivo e attiva il chip corrispondente; la barra categorie si allinea da sola. Se nessuna card della pagina ha quel tipo, la griglia resta intera invece di mostrarsi vuota.

I tipi dei filtri sono quelli già esistenti (Cappotti, Giacche, Abiti, Maglieria, Camicie, T-shirt & Polo, Pantaloni, Denim, Accessori): più sottocategorie puntano allo stesso tipo. Nel sito vero ogni sottocategoria avrà la sua pagina.

## Mobile

Stesso albero, generato dagli stessi dati: accordion a due livelli (Abbigliamento › Abiti › Monopetto). Aprire una voce chiude solo quelle dello stesso livello; chiudere una voce chiude anche quelle al suo interno. In fondo ad Abbigliamento restano le quattro collezioni come link.

## File

| File | Cosa |
|---|---|
| `js/menu-dati.js` | **Nuovo.** Fonte unica: immagini (`CARD`), tab con le loro immagini e voci (`TABS`), link semplici (`LINK`). Va caricato prima di `layout.js`. |
| `js/layout.js` | Pannello, tab e menu mobile generati dai dati (`MEGAMENUS`, `TABS_HTML`, `MOBILE_LIST`). Il piede (Contattaci, Boutique, Italia) sta dentro `.mm-fixed-body`. |
| `js/nav.js` | Attivazione categorie e sottocategorie, ritardo, precaricamento immagini degli altri tab; accordion mobile a due livelli. |
| `js/filtri.js` | Lettura di `?tipo=`. |
| `css/base.css` | Nuove regole `.mm-fixed-body` (griglia), `.mm-grid`, `.mm-cats`, `.mm-subs`, `.mm-images`; tolte le regole duplicate `#megaAbbigliamento / #megaAccessori / #megaOutlet`; secondo livello mobile. |
| 37 pagine HTML | `<script src="js/menu-dati.js">` prima di `layout.js`. |

## Da completare

- **Accessori**: quasi tutte le voci puntano a `#`, perché nella demo non c'è una pagina accessori. Funzionano Calze, Derby e Cravatta macro (verso Essential e Cerimonia). *Aggiornato il 19 nov: le tre card del menu sono ora Novità, Must Have, Best Seller (link `#` provvisori); vedi `AGGIORNAMENTI-19-novembre.md`.*
- **Cambiare un'immagine**: nuova chiave in `CARD`, poi la chiave nell'array `cards` del tab.
- **Dimensione immagini**: limiti in `--mm-card-min` e `--mm-card-max` (`base.css`). La formula usa `100cqh`, l'altezza utile del pannello (`container-type: size` su `.mm-fixed-body`). Sotto i 130 px (finestre più basse di circa 600 px) il pannello scorre.
- **Accessori** ha 13 voci: sotto i 650 px di finestra circa è l'elenco, non le immagini, a far scorrere il pannello.
- **Browser**: la griglia usa `subgrid` e le unità `cqh` (Chrome 117+, Safari 16+, Firefox 110+).
- Collaudo fatto a 1920×1080, 1440×900, 1440×780, 1210×630, 1100×640 e 1210×480: didascalia finale e «Italia (Italiano)» sulla stessa linea in tutti i casi, pagina sotto ferma, nessun contenuto irraggiungibile. Le immagini non sono nello zip: verificate con segnaposto.
