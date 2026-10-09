# Doppelgänger — Guida per l'agenzia

Documento di accompagnamento al pacchetto demo + specifiche. Per chi svilupperà il sito vero sulla piattaforma dinamica.

## Cosa c'è nel pacchetto

| File / cartella | Cosa contiene |
|---|---|
| `*.html`, `css/`, `js/`, `images/` | Demo statica navigabile (21 pagine) |
| `design/Doppelgänger — Proposta nuovo sito.pdf` | Direzione strategica del progetto |
| `design/Doppelganger_Specifiche_per_agenzia.pdf` | Specifiche tecniche dettagliate |
| `design/CHANGELOG.html` | Elenco dei 84 commit con descrizione |
| `design/DIFF-FILES.html` | File toccati, con righe aggiunte/rimosse |
| `design/BADGE.html` | Regole e codice per le etichette prodotto |
| `design/NOVITA-SITO.html` | Riepilogo delle novità (per il cliente) |
| `design/token.json` | Design token in formato JSON |
| `design/CREDITI.md` | Autore e contatti |

## Struttura del progetto

ls -la README.md design/LEGGIMI-AGENZIA.md
open README.md
open design/LEGGIMI-AGENZIA.md
git add README.md design/LEGGIMI-AGENZIA.md
git commit -m "README cliente + guida agenzia + 36px confermato"
git --no-pager log --oneline -3
git status
ls -la README.md design/LEGGIMI-AGENZIA.md 2>/dev/null
git status
git --no-pager log --oneline -5
