# Aggiornamenti alle Specifiche — 7 novembre 2026

Postilla a `AGGIORNAMENTI-6-novembre.md`.

## Header stile Bottega Veneta: bottone MENU e pannello con tab

**Cosa è cambiato**

| | Prima | Dopo |
|---|---|---|
| Header desktop (≥1025px) | due righe: logo in `.header-main`, sotto `.nav` con icone di servizio, nav centrale e icone | una riga: `MENU` a sinistra, logo al centro, cerca/preferiti/profilo/carrello a destra |
| Nav centrale | Nuovi Arrivi, Abbigliamento, Accessori, Outlet, Journal (`.nav-center`) | tolta dall'header; le stesse cinque voci, nello stesso ordine, sono la riga in alto del pannello MENU |
| Megamenu | tre dropdown sotto l'header, aperti al passaggio del mouse | tre pannelli di un unico pannello laterale (`#megamenuFixed`), aperto con il clic su `MENU` |
| Icone di servizio in `nav-left` (globo, cuffie, location) | presenti | tolte; le stesse funzioni sono in fondo al pannello |
| Mobile e tablet (≤1024px) | due righe, burger | invariato |

**Pannello** (`#megamenuFixed`, `.mm-fixed`): fisso a sinistra, `width: min(1200px, 85vw)`, entra da sinistra con `transform`. Sta **fuori** da `<header>`: l'header ha `z-index: 1000` e crea un contesto di sovrapposizione, quindi dentro l'header il pannello sarebbe finito sotto l'overlay. Pannello `z-index: 1201`, overlay `#megamenuOverlay` riusato con `z-index: 1200` (prima 998) e `pointer-events: auto` quando è attivo, così il clic lo chiude.

- In alto la riga **Nuovi Arrivi | Abbigliamento | Accessori | Outlet | Journal** (13px, maiuscolo, tracking 1px) e la × (44×44, trasparente, `var(--ink)`). Abbigliamento, Accessori e Outlet sono tab (sottolineatura oro sul tab attivo) e cambiano il contenuto sotto; Nuovi Arrivi e Journal sono link alle loro pagine (`.mm-nav-link`, fuori dal `tablist`), con lo stesso aspetto, sottolineatura oro al passaggio e sulla pagina corrente (`aria-current="page"`, impostato da `layout.js`).
- Al centro il contenuto dei tre megamenu esistenti (`#megaAbbigliamento`, `#megaAccessori`, `#megaOutlet`), invariato; i pannelli non attivi hanno `hidden`.
- In fondo **Contattaci**, **Boutique**, **Italia (Italiano)** (stessi `data-open-*` del menu mobile; sostituiscono le icone tolte da `nav-left`). Sono un'aggiunta rispetto al brief: si tolgono cancellando `.mm-fixed-foot` in `layout.js`.
- Sfondo `var(--crema-pannelli)`, come menu mobile e drawer.

**Logo**: due `a.logo-link` con la stessa struttura (`img.logo`, stesso `href` e `alt`). Quello nuovo (`.logo-link--nav`) sta al centro di `.nav` e vale su desktop; quello esistente resta in `.header-main` e vale su mobile. Su desktop `.header-main` è `display: none` (conteneva solo il logo: cuore e carrello di `.header-actions` erano già nascosti), sotto 1025px `.nav` è già `display: none`. Nessuno dei due loghi nascosti è letto dagli screen reader.

**Comportamento** (`nav.js`)
- Clic su `MENU`: apre il pannello, attiva l'overlay, blocca lo scroll della pagina, `aria-expanded="true"`, focus sul tab attivo.
- Chiusura con ×, Esc, clic sull'overlay; il focus torna su `MENU`.
- Si chiude da solo se si apre un altro pannello (ricerca, carrello, preferiti, login, boutique, contatti, paese: registrato in `PanelManager`) o se la finestra scende sotto 1025px.
- Tab: clic, frecce ←/→, Home/Fine (roving tabindex).
- Accessibilità come il drawer quick-add del 6 novembre: `role="dialog"`, `aria-modal`, `aria-label="Menu principale"`; `role="tablist"`/`tab`/`tabpanel` con `aria-selected`, `aria-controls`, `aria-labelledby`; focus trap con Tab e Maiusc+Tab. Da chiuso il pannello è `visibility: hidden`, quindi i suoi link non sono raggiungibili da tastiera.

**Tolto**
- `nav.js`: tutto il vecchio megamenu al passaggio del mouse (`MEGA_MENUS`, `HOVER_ONLY_LINKS`, timer di apertura/chiusura, aree di tolleranza, schiarimento dell'header al passaggio sulle icone). Resta, invariato, il cambio `scrolled` dell'header allo scroll.
- `base.css`: tutte le regole `.nav-center` (base, `header.scrolled`, `header.menu-open`, `body.header-light`, blocchi ≤1200 e 1025–1200; dal blocco ≤1024 tolto solo il selettore `.nav-center`); gli stili del vecchio dropdown di `.megamenu` (posizione assoluta, opacità, `.megamenu.open`). Il layout interno dei megamenu (`#megaAbbigliamento .megamenu-inner` ecc.) non è cambiato.

**File**: `js/layout.js`, `css/base.css`, `js/nav.js`. Nessun HTML di pagina toccato (l'header arriva tutto da `layout.js`).

## Cosa non è stato toccato

Fix CLS `aspect-ratio: 2/3` in `prodotto.css`; badge verticale in `collezione.css`; `card-slider.js` e ordine degli script (prima di `nav.js`); filtro colore (`data-colors`); barra categorie «TUTTI»; drawer filtri; gerarchia tipografica della toolbar (13/13/12); topbar 36px; menu mobile e drawer; `openCountryDrawerFooter` nel footer; `tokens.css`; nient'altro in `design/` oltre a questa nota. `!important`: 14 attivi (1 base, 3 category, 4 home, 1 prodotto, 5 vetrina) più quello nel commento di `base.css`, nessuno aggiunto.

## Test eseguiti

Chromium headless, su `index.html`, `ai-2026.html`, `prodotto.html`.

| Larghezza | Esito |
|---|---|
| 1440px | header a una riga: MENU a sinistra, logo centrato, 4 icone a destra; `.header-main` e burger nascosti |
| 1440px, MENU | riga Nuovi Arrivi, Abbigliamento, Accessori, Outlet, Journal; Journal sottolineato su `journal.html`; pannello largo 1200px con overlay a destra; focus sul tab Abbigliamento; tab al clic e con le frecce; focus trap (40 Tab restano nel pannello); chiusura con ×, Esc, clic sull'overlay; focus di ritorno su MENU; scroll ripristinato; chiusura automatica scendendo a 900px |
| 768px | due righe, logo in `.header-main`, MENU assente, il burger apre il menu mobile |
| 390px | due righe, logo in `.header-main`, il burger apre il menu mobile |

Nessun errore JS in console (solo 404 sulle immagini, assenti nella copia di prova).

## Vetrina (Capsule): titoli, hero e chiusura

- Un solo titolo prima della griglia: tolto "Intorno al bomber", il paragrafo ora sta sotto "Il resto della Capsule" (`.vt-products-head p`). Rimossi gli stili `.vt-intro-section`, non più usati.
- Hero: link "Scopri la selezione" (stile `.vt-hero-link` già presente) che scende alla griglia (`#selezione`).
- Banner finale: il bottone "Vedi tutti i capi" è passato dalla fine della griglia al banner (`.vt-btn--light`), con un velo scuro al centro per il contrasto. Rimosso `.vt-products-more`. Il blocco è un `div`, non più un `blockquote`: è una frase di servizio, non una citazione.
- Capo in evidenza (desktop): le maiuscole del titolo ora partono dal bordo alto della foto (prima 6px sotto); il bordo basso del still-life era già allineato.

**File**: `vetrina.html`, `css/vetrina.css`.
