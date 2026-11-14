# Aggiornamenti 14 novembre — tipografia

Obiettivo: avvicinare peso e dimensioni dei caratteri a Prada, Barena Venezia e COS, ed eliminare il serif.

## Scala tipografica (7 gradini, solo Work Sans)

Scala propria, con salti sempre visibili tra un livello e l'altro. Prada, Barena e COS sono stati usati come spirito (piccolo, regolare, poca spaziatura, un solo registro grande per pagina), non come valori da copiare. Una misura su cos.com (home desktop) ha confermato l'ordine di grandezza: 13 px / 400 per quasi tutto, maiuscole a 0,04 em, un solo titolo a 20 px.

| Ruolo | Dimensione | Peso | Spaziatura | Dove |
|---|---|---|---|---|
| Caption | 11 px | 400 | 0,1 px | note, legali, badge |
| Label | 12 px | 400 | 0,7 px | MAIUSCOLO: nav, tab, bottoni, occhielli |
| UI | 13 px | 400 | 0,2 px | nomi prodotto, prezzi, form, footer |
| Body | 15 px, interlinea 1,6 | 400 | — | paragrafi, descrizioni |
| Lead | 18 px | 400 | — | sottotitoli, introduzioni, citazioni |
| Title | 20–24 px | 400 | −0,005 em | titoli di sezione e di scheda prodotto |
| Display | 28–38 px | 500 | −0,01 em | un solo claim per pagina (hero, vetrina) |

Regole di gerarchia:
- Le maiuscole spaziate sono solo per etichette e piccoli titoli (12–18 px, peso 500). I titoli grandi sono in frase, mai in maiuscolo.
- Peso 400 ovunque, 500 per ciò che deve emergere. Il 300 e il 600 non si usano nei titoli.
- Prezzi a 400, come il nome prodotto.

I token sono in `css/tokens.css` (`--text-caption` … `--text-display`). I vecchi `--fs-NN` restano per compatibilità e puntano a questi gradini.

## Cosa è cambiato

- **Serif eliminato.** Cormorant Garamond non è più usato: `--serif` rimosso da `tokens.css` e `token.json`, `@font-face` e preload tolti (anche in `index.html`), i tre `.woff2` cancellati da `fonts/`. Via anche il corsivo finto su didascalie, messaggi di conferma e segnaposto FAQ.
- **Titoli.** Passati da maiuscolo spaziato a frase (Title/Display). Restano in maiuscolo solo etichette, piccoli titoli e i titoli di pagina delle collezioni.
- **Numeri decorativi** (×2 del Club, passaggi Sartoria, sconto Outlet): ora Display, peso 500.
- **Spaziatura tra le lettere:** token `--tr-*` ridotti di circa il 60%, em fissi dimezzati.

## Da sapere

- Work Sans è più larga dei caratteri usati dai tre siti: a parità di px il testo occupa più spazio. Per una compattezza uguale il passo successivo è cambiare famiglia (per esempio Inter), non altre dimensioni.
- Verifica visiva fatta su collezione, scheda prodotto, vetrina, club e home; le altre pagine solo con controllo automatico di font e overflow. Le immagini non sono nello zip.
