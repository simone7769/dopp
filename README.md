# Doppelgänger — Demo sito

Una demo navigabile del nuovo sito Doppelgänger. Il design, i contenuti e i comportamenti sono pronti per essere mostrati e passati all'agenzia che svilupperà il sito vero.

## Sito online

https://doppelga-nger-proposal.vercel.app/

Apri il link dal telefono o dal computer. È la versione più aggiornata, sempre disponibile.

## Cosa vedere

Un giro di 5 minuti:

1. Home — hero, video, collezioni, La Selezione, Journal
2. Collezioni — Autunno/Inverno 2026, Cerimonia, Essential (filtri funzionanti, quick-add dal «+»)
3. Scheda prodotto — scegli taglia e colore, aggiungi al carrello, galleria con lightbox
4. Carrello — drawer (icona in alto a destra) + pagina intera
5. Checkout — compila i campi, arriva alla conferma
6. Doppelgänger Club — 4 fasce, 5 benefici, 7 FAQ
7. Area personale — login, dashboard con ordini, indirizzi, dati, preferiti
8. Boutique — 83 negozi reali con ricerca live
9. Journal — 9 articoli editoriali con filtri per categoria
10. Guida alle Taglie — 18 categorie con tabelle ufficiali
11. FAQ — 22 domande in 12 gruppi
12. Gift Card — selettore taglio in stile PDP

Sul telefono, l'esperienza è pensata per il pollice: menu a tutto schermo, card su due colonne, drawer a tutta larghezza.

## Cosa c'è nella demo

35 pagine totali:

- Home (hero, video showcase, La Selezione, Duo Outlet, Journal)
- Autunno/Inverno 2026, Cerimonia, Essential (griglie prodotto con filtri)
- 3 schede prodotto complete (Abito monopetto, Pantalone denim, Impermeabile)
- Carrello (drawer + pagina intera)
- Checkout in una pagina (contatti, consegna, pagamento, riepilogo)
- Conferma ordine
- Account personale (4 tab: Ordini, Indirizzi, Dati, Preferiti)
- Registrazione
- Doppelgänger Club (4 fasce, 5 benefici con icone, 7 FAQ)
- Journal (archivio con filtri + 5 articoli completi: Looks AW26, Den Haag, Sartoria, Chi Siamo, Esperienza in Boutique)
- Boutique (83 negozi reali, ricerca live, rating, servizi)
- Guida alle Taglie (18 categorie, tabelle in modale)
- FAQ (22 domande in 12 gruppi)
- Gift Card (selettore taglio, accordion informativo)
- Pagamenti (metodi, sicurezza, rimborsi)
- Traccia Ordine, Monitora Reso
- Lavora con Noi (2 tab, 17 posizioni, form candidatura)
- Doppelgänger App (3 sezioni, badge store ufficiali)
- Istruzioni per il Riciclo (47 voci con pallini differenziata)
- Whistleblowing (+ PDF procedura)
- Politica di Parità di Genere
- 4 pagine legali: Privacy e Cookie, Termini e Condizioni, Spedizioni e Resi, Dichiarazione di Accessibilità

Funzionalità:

- Carrello e preferiti persistono durante la visita (sessionStorage)
- Ricerca prodotti live mentre si scrive
- Filtri per categoria, prezzo, taglia, colore (funzionanti)
- Quick-add dal «+» sulle card (colore + taglia, senza aprire la scheda)
- Store locator con 83 boutique reali
- Design system completo (colori, tipografia, spaziature)
- Layout responsive: desktop, tablet, mobile (375px testato)

## Cosa non è incluso

La demo è un prototipo statico: mostra il design e i comportamenti, ma non è ancora un sito funzionante. Sono a carico dell'agenzia che costruirà il sito vero:

- Catalogo prodotti reale e ricerca collegata a un database
- Checkout e pagamenti reali (carte, PayPal, Klarna)
- Area personale con login funzionante e ordini reali
- Doppelgänger Club dinamico, collegato all'account
- Store locator con mappa vera
- Newsletter, cookie banner, SEO avanzato
- Sistema di gestione per il Journal (CMS)

## Documenti di riferimento

Nella cartella design/:

- Doppelganger-Proposta-nuovo-sito.pdf — la direzione del progetto
- Doppelganger_Specifiche_per_agenzia.html — le specifiche tecniche dettagliate (17 pagine, editabile)
- LEGGIMI-AGENZIA.md — guida rapida per chi sviluppa
- NOVITA-SITO.html — riepilogo delle novità (per il cliente)
- CHANGELOG.html — elenco dei commit con descrizione
- DIFF-FILES.html — file modificati
- BADGE.html — regole per le etichette prodotto
- token.json — design token in formato standard
- CREDITI.md — autore e contatti

## Come aprire la demo in locale

Da terminale, nella cartella del progetto, esegui:

    python3 -m http.server 8000

Poi apri http://localhost:8000/ nel browser.

## Autore

Simone Giordano
E-mail: simonegiordano77@gmail.com
Telefono: 347 7492922

## Nota

Doppelgänger è un marchio dei rispettivi titolari. Questo è un progetto dimostrativo, non commerciale.
