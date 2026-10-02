# Doppelgänger — Proposta di redesign (demo non commerciale)

## Link utili

- Sito online: https://doppelga-nger-proposal.vercel.app
- Repository GitHub: https://github.com/simone7769/dopp

## Contenuto

- `index.html` — Home
- `ai-2026.html`, `essential.html`, `cerimonia.html` — Collezioni
- `journal.html`, `looks.html`, `journal-*.html` — Journal e articoli
- `prodotto*.html` — Schede prodotto
- `css/` — Fogli di stile
- `js/` — Script (layout, nav, filtri, dati)
- `images/` — Immagini, video, loghi

## Come modificare e pubblicare

1. Modifica i file sul tuo Mac
2. Da terminale, nella cartella del progetto:

   ```bash
   cd ~/Desktop/doppelganger-sito
   git status                          # controlla cosa è cambiato
   git add -A
   git reset HEAD *.pdf                # esclude eventuali PDF grandi
   git commit -m "descrizione modifica"
   git push origin main
   ```

3. **Vercel aggiorna automaticamente** il sito online in ~30 secondi — **ma solo se il badge "Production" è blu pieno sulla dashboard Vercel**.

### ⚠️ Se hai fatto un rollback su Vercel

Dopo un `Instant Rollback` o un `Promote` su un vecchio deploy, **Vercel smette di auto-promuovere** i nuovi commit. In quel caso:

1. Vai su [vercel.com/dashboard](https://vercel.com/dashboard) → progetto `doppelga-nger-proposal`
2. Tab **Deployments**
3. Trova l'ultimo deploy con il messaggio del tuo commit
4. Clicca `...` → **Promote** (badge Production diventa blu pieno)

**Regola d'oro:** dopo ogni push, **controlla il badge "Production"** in Vercel. Se è grigio (outline), il sito online è fermo a un deploy vecchio.

### 💡 Se devi annullare una modifica

- **Meglio** `git revert <commit>` + push (Vercel auto-aggiorna)
- **Evita** `Instant Rollback` / `Promote` su un deploy vecchio (blocca l'auto-deploy)

## Autore

SG — Concept, design e sviluppo

## Cosa è incluso nella demo

- 3 pagine collezione (AI 2026, Essential, Cerimonia)
- 3 pagine prodotto dettagliate (prodotto, prodotto1, prodotto2)
- Carrello funzionante (aggiungi da PDP e wishlist, +/−, rimozione)
- Wishlist dinamica con drawer
- Ricerca prodotti, drawer filtri, store locator
- Layout responsive (desktop, tablet, mobile)
- Journal con articoli
- Header mobile ristrutturato (burger + search a sinistra, cuore + carrello a destra)
- Footer accordion su mobile (4 sezioni apribili)
- Search drawer da sinistra su mobile
- Griglia prodotti selezionabile 2/3 colonne su mobile

## Cosa NON è incluso (da sviluppare)

- Backend / CMS per gestire prodotti e contenuti
- Checkout reale e integrazione pagamenti
- Login utente e area personale
- Gestione ordini e magazzino
- Multi-lingua / multi-valuta

## Ultime modifiche (ottobre 2026)

- Header mobile: icone tornano a 36px (44px rendevano l'header più alto)
- Header mobile ristrutturato: burger + search a sinistra, cuore + carrello a destra
- Menu mobile: "Negozi" al posto di "Preferiti"
- Footer accordion su mobile (4 sezioni apribili)
- Search drawer da sinistra su mobile (come Country/Stores/Contact)
- Hero padding ridotto: 60→45 desktop, 40→30 tablet, 28→21 mobile
- Grid 2/3 colonne selezionabile su mobile (≤900px)
- Fix CSS duplicato `@media 640px` in `collezione.css`
- Fix touch target WCAG: pulsante +/− carrello a 44px

## Note legali

Doppelgänger è un marchio dei rispettivi titolari.
Questo è un progetto dimostrativo, non commerciale.