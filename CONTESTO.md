---

## AGGIORNAMENTO 17 OTTOBRE 2026

### Commit pushati

c7eac67 - design: header mobile+desktop (icone 20px, logo fluido 12-18px, touch 36px, min-height 72px)

### Modifiche header (css/base.css + css/prodotto.css)

- Icone header mobile: 18 → 20px
- Icone header desktop: 17 → 20px
- Logo mobile: fisso 18px → clamp fluido 12-18px (ratio logo 11.04)
- Touch target icone: 36px (invariato, standard mobile)
- Header mobile min-height: 72px
- Padding header mobile: 14px 16px → 0 16px
- Gap icone: 4 → 2px
- Badge wishlist/cart: top 2px/right 0 → top 4px/right 2px
- Header scrolled: min-height 60px + logo clamp 12-16px
- Header menu-open: min-height 72px + padding 0 16px
- Icone drawer: wishlist-header, search-drawer-bar, stores-search-field 18 → 20px
- PDP wish button: 19 → 20px (css/prodotto.css)
- Rimossi: @media 640px .logo { height: 16px } e header.scrolled .logo { height: 14px }

### Test effettuato

- DevTools: ok fino a 285px (margine su iPhone SE 320px)
- 320/360/375/390/430px: tutti ok
- Header normale, scrolled, menu aperto: coerenti
- Logo centrato correttamente (griglia 1fr auto 1fr)

### TODO prossima sessione

**1. Nav center desktop: 12 → 13px (commit separato)**

3 regole da toccare INSIEME (se cambi solo una, salto visivo):
- `.nav-center a { font-size: var(--fs-12); }` (base, riga ~278)
- `header.scrolled .nav-center a { font-size: var(--fs-12); }` (riga ~136-138)
- `@media (max-width: 1200px) { .nav-center a { font-size: var(--fs-12); } }` (riga ~1528)

Verifica obbligatoria a 1025px (gap ridotto a 14px, nav center ~630px su ~730px disponibili).

Alternativa: letter-spacing 1 → 1.5px (solo sopra 1200px, non tocca scrolled).

**2. Riordino font (branch feature/riordino-font)**

Problemi trovati (analisi esterna):
- Troppi gradini vicini: 10/11/12/13/14 (5 misure in 4px)
- Token e valori fissi convivono (clamp PDP title, PDP price 17px, PayPal 18px, close 26px hardcoded)
- clamp(27px, 2vw, 30px) non fa niente (intervallo inutile)
- Testo < 12px con font-weight 300 su mobile da alzare
- Nomi token legati al valore (--fs-12 → meglio --fs-nav o simili)

Proposta: scala ridotta 12/14/16/20/24/32.

### Note

- La modifica nav center desktop è lavoro separato (non mescolare con header mobile)
- Il riordino font merita branch dedicato (impatta più CSS: base, home, collezione, prodotto, looks, legale)
- Token NON vanno toccati per fix locali (effetto domino su tutto il sito)

### Stato finale 17 ottobre

- HEAD = origin/main = c7eac67
- Working tree: pulito
- ZIP in consegne/: aggiornati (09:31) — Doppelganger_demo_*_2026-10-17.zip
- Branch attivo: main


---

## AGGIORNAMENTO 17 OTTOBRE 2026 (sessione 2)

### Commit pushati

0ad2988 - design: nav center desktop 12→13px (3 regole insieme)
c7eac67 - design: header mobile+desktop (icone 20px, logo fluido 12-18px, touch 36px, min-height 72px)

### Modifiche header (css/base.css + css/prodotto.css)

Mobile:
- Icone header: 18 → 20px
- Logo: fisso 18px → clamp fluido 12-18px (ratio 11.04)
- Touch target: 36px (invariato)
- Header min-height: 72px, padding 0 16px
- Gap icone: 4 → 2px
- Badge wishlist/cart: top 2/right 0 → top 4/right 2
- Header scrolled: min-height 60px + logo clamp 12-16px
- Header menu-open: min-height 72px coerente
- 4 icone drawer: wishlist-header (18→20), search-drawer-bar (18→20), stores-search-field (18→20), PDP wish (19→20, in prodotto.css)
- PDP wish button: 19→20px (css/prodotto.css)

Desktop:
- Icone header: 17 → 20px
- Nav center font: 12 → 13px (3 regole insieme: base, scrolled, media 1200px)

### Test effettuato

- Header mobile: ok fino a 285px (margine su iPhone SE 320px)
- Nav desktop: testato a 1025/1200/1440px, entra correttamente
- Simmetria nav 1025-1200px: problema preesistente (3 icone sx vs 4 dx), accettato come design

### TODO prossima sessione: RIORDINO FONT

**Branch:** feature/riordino-font

**Problemi trovati (analisi esterna):**
- Troppi gradini vicini: 10/11/12/13/14 (5 misure in 4px, 13 vs 14 indistinguibili)
- Token e valori fissi convivono (clamp PDP title, PDP price 17px, PayPal 18px, close 26px hardcoded)
- clamp(27px, 2vw, 30px) non fa niente (intervallo 1350-1500px irrilevante)
- Testo < 12px con font-weight 300 su mobile da alzare
- Nomi token legati al valore (--fs-12 mente se diventa 14px)

**Proposta scala ridotta:** 12/14/16/20/24/32

**File da toccare:** base, home, collezione, prodotto, looks, legale + tokens.css

**Principio:** Token NON vanno toccati per fix locali (effetto domino). Per fix specifici usare token esistenti o valori espliciti.

### Note

- Il padding nav 12→16px (+8px header) NON è stato fatto: nav 13px è sufficiente (standard luxury)
- Se in futuro serve: misura `document.querySelector('header').offsetHeight`, aggiorna `--header-h` di conseguenza (oggi 170px)
- `--header-h` è usato da `.page`, `.pdp-wrap`, colonna sticky PDP

### Stato finale 17 ottobre (sessione 2)

- HEAD = origin/main = 0ad2988
- Working tree: pulito
- ZIP in consegne/: aggiornati (09:53) - Doppelganger_demo_*_2026-10-17.zip
- Branch attivo: main


---

## AGGIORNAMENTO 17 OTTOBRE 2026 (pomeriggio)

### Commit pushati

8f16a62 - refactor: 25 font-size px sostituiti con token di ruolo (--fs-body-editorial, --fs-section-title, --fs-16, --fs-pdp-price) + --fs-16 aggiunto
d78223b - refactor: 28 font-size px sostituiti con token esistenti
d5827f0 - refactor: rimossi 34 token duplicati da base.css (fonte unica: tokens.css)
0ad2988 - design: nav center desktop 12→13px (3 regole insieme)

### Cosa è stato fatto

**Dedup token (d5827f0):**
- Rimosso il :root di base.css (34 token duplicati di tokens.css)
- :root di base.css ora ha solo --header-h: 170px
- Zero cambi visivi (verificato con test visivo)

**28 font-size → token esistenti (d78223b):**
- 11px, 12px, 13px, 14px, 20px, 22px, 26px, 16px (legale) → var(--fs-*)
- 14 file CSS, 28 righe
- Zero cambi visivi

**25 font-size → token di ruolo (8f16a62):**
- --fs-body-editorial (18px), --fs-section-title (18px), --fs-16 (nuovo, 16px), --fs-pdp-price (17px)
- 9 file CSS, 25 righe + aggiunta --fs-16 a tokens.css
- Zero cambi visivi

### Stato attuale

- HEAD = origin/main = 8f16a62
- Working tree: pulito
- Branch: main (font-ruoli punta a 8f16a62)
- ZIP in consegne/: aggiornati (11:04) - Doppelganger_demo_*_2026-10-17.zip

### Valori font RIMASTI HARDCODED (da valutare a occhio, Fase 2)

| Valore | Occorrenze | Note |
|--------|-----------|------|
| 10px | 2 | collezione.css:392, filtri.css:316 - badge? |
| 11px | 3 | collezione.css:272, 351 (prezzi griglia 3 col), home.css:709 |
| 12px | 1 | traccia-ordine.css:266 - icona step |
| 15px | 3 | app.css:48, looks.css:405, traccia-ordine.css:179 |
| 16px | 3 | input iOS (base.css:1850, 2395, checkout.css:66) - DA NON TOCCARE |
| 17px | 2 | faq.css:155, lavora-con-noi.css:359 |
| 18px | 2 | base.css:1266 (PayPal), prodotto.css:330 (summary::after) - DA NON TOCCARE |
| 26px | 3 | base.css:691, 1805 (close drawer), filtri.css:66 - DA NON TOCCARE |
| 38-56px | 4 | hero decorativi (looks, club) - DA NON TOCCARE |

### TODO prossima sessione

**1. Padding nav 12→16px (+8px header)**
- Misura: document.querySelector('header').offsetHeight in console
- Se 170px → aggiornare --header-h a 178px in tokens.css
- Test sticky PDP (colonna "Aggiungi al carrello")
- Commit separato

**2. Unificazione pattern Q&A (FAQ + Club) - RIMANDATA**
- Obiettivo: stesso stile per domande/risposte su faq.html (25) e club.html (7)
- Base: stile Club (bordi oro first/last, summary uppercase 500, body serif 18px)
- Aggiungere: hover oro (dal FAQ) + marker reset (::-webkit-details-marker + ::marker)
- ERRORE FATTO: ho modificato HTML (classi) + CSS, ma il risultato era rotto (triangoli visibili, hover non funzionante, righe attaccate). Rollback con git restore + branch cancellato.
- LEZIONE: non toccare il markup HTML. Aggiungere solo CSS condiviso. Testare PRIMA su club.html (che è la base), poi applicare a faq.html.

**3. Valutare a occhio i valori hardcoded rimasti** (tabella sopra)

### Note importanti

- Non toccare il markup HTML per refactor CSS (troppo rischio)
- I 3 input a 16px servono per iOS anti-zoom
- I 26px su close drawer e PayPal sono glifi, non testo
- Il pattern .club-faq details NON è da rimuovere, è la base di partenza


---

## AGGIORNAMENTO 17 OTTOBRE 2026 (sera)

### Commit pushati

2025268 - design: allineato pattern Q&A FAQ al Club (bordi oro, uppercase 500, hover oro, marker reset, body 18px) + faq-intro 13px

### Cosa è stato fatto

**Pattern Q&A unificato (CSS-only, zero HTML):**
- FAQ: `.faq-item:first-of-type` border-top → `--gold`
- FAQ: aggiunto `.faq-item:last-of-type` border-bottom → `--gold`
- FAQ: `.faq-item > summary` font-weight 400→500 + text-transform uppercase
- FAQ: aggiunto `.faq-item > summary::marker { content: "" }` (triangoli Firefox/Safari)
- FAQ: `.faq-body` max-width 900px, padding 24px
- FAQ: `.faq-body p` font-size --fs-16 → --fs-body-editorial (18px), line-height 1.75 → 1.7
- FAQ: rimosso border-bottom oro da `.faq-group-title` (evitava doppia linea)
- FAQ: `.faq-intro` font-size --fs-11 → --fs-13 (era troppo piccolo)
- Club: aggiunto hover oro (`color: var(--gold)` su summary e ::after)
- Club: aggiunto `summary::marker { content: "" }`

**Risultato:** Q&A di FAQ e Club visivamente identiche. Gruppi FAQ (titoli "Ordini", "Spedizioni") invariati (stile sezione).

### ERRORE FATTO e RISOLTO (lezione appresa)

**Primo tentativo fallito:**
- Ho provato a unificare riscrivendo il markup HTML (rinomina classi `faq-item` → `qa-item`) + spostando CSS in `base.css`
- Risultato: triangoli visibili, hover non funzionante, righe attaccate
- Rollback con `git restore .` + `git branch -D qa-unificato`

**Lezione appresa:**
- NON toccare il markup HTML per refactor CSS (troppo rischio)
- Aggiungere/modificare SOLO CSS, mantenendo le classi esistenti
- Testare le modifiche su UNA pagina prima di applicare all'altra
- Piccoli passi: prima FAQ, poi Club, poi verifica

### Stato attuale

- HEAD = origin/main = 2025268
- Working tree: pulito
- Branch: main
- ZIP in consegne/: aggiornati (11:38) - Doppelganger_demo_*_2026-10-17.zip

### TODO prossima sessione

**1. Padding nav 12→16px (+8px header)**
- Misura: document.querySelector('header').offsetHeight
- Se 170px → aggiornare --header-h a 178px in tokens.css
- Test sticky PDP

**2. Valutare a occhio valori hardcoded rimasti** (15px, 17px, 11px prezzi, 10px badge)

**3. Verificare se altri pattern (gift-card, prodotto) hanno bisogno di uniformazione** (probabilmente no: sono accordion informativi, pattern diverso)


---

## AGGIORNAMENTO 17 OTTOBRE 2026 (sera - sessione 2)

### Commit pushati

fc18531 - design: nav padding 12→16px (desktop) e 6/12→12/12px (≤1200px) + --header-h 170→169px
66fcad3 - design: 3 testi 15px→16px e 2 testi 17px→18px
2025268 - design: allineato pattern Q&A FAQ al Club + faq-intro 13px
8f16a62 - refactor: 25 font-size → token di ruolo + --fs-16
d78223b - refactor: 28 font-size → token esistenti
d5827f0 - refactor: rimossi 34 token duplicati da base.css

### Dettagli nav padding

**Problema:** --header-h era 170px, ma header reale era 161px (buco 9px sotto header).
**Causa:** padding nav 12px (doveva essere 16px) + media query 1200px con padding asimmetrico 6/12px.
**Fix:**
- Desktop (>1200px): padding nav 12→16px (simmetrico)
- Tablet (≤1200px): padding nav 6/12→12/12px (simmetrico)
- --header-h: 170 → 169px (valore reale)
- Rimosso stile inline --header-h: 105px da DevTools (residuo)

**Risultato:** header 167px (era 161), nav 50px (era 44), allineamento perfetto.

### Dettagli font-residui

- `.app-section-text` (app.css:48): 15px → --fs-16 (16px)
- `.sartoria-cta-wrap p` (looks.css:405): 15px → --fs-16
- `.track-steps li p` (traccia-ordine.css:179): 15px → --fs-16
- `.faq-cta` (faq.css:159): 17px → --fs-body-editorial (18px)
- `.lavora-success p` (lavora-con-noi.css:359): 17px → --fs-body-editorial

**Commit separato** perché sono cambi visivi (+1px), non solo sostituzioni token.

### Stato attuale

- HEAD = origin/main = fc18531
- Working tree: pulito
- Branch: main
- ZIP in consegne/: aggiornati (12:05)

### TODO prossima sessione

**1. Valutare a occhio valori hardcoded rimasti (Fase 2)**
- 11px prezzi (collezione.css:272, 351, home.css:709): griglie compatte, lasciare
- 10px badge (collezione.css:392, filtri.css:316): etichette, lasciare
- 16px input (base.css:1850, 2395, checkout.css:66): iOS anti-zoom, DA NON TOCCARE
- 26px close drawer + PayPal: glifi, DA NON TOCCARE

**2. Verificare se gift-card/prodotto hanno bisogno di uniformazione**
- Probabilmente no: sono accordion informativi (pattern diverso da Q&A)

**3. Test finale su Vercel** (deploy fc18531)
- Home, categoria, PDP, FAQ, Club, legale
- Mobile 375px + desktop 1440px

**4. Aggiornare design/Doppelganger_Specifiche_per_agenzia.html** (se demo va a Doppelgänger Roma)
- --header-h: 169px (era 170)
- --logo-h-mobile: 18px (ora logo fluido 12-18px)
- Icone header: 20px
- Nav: 13px desktop
- FAQ/Club: pattern Q&A unificato

**5. Pulizia branch residui**
- `font-residui`, `nav-padding` (mergiati, cancellabili)
- `feature/pagina-app` (vecchio, da valutare)
- `font-ruoli` (mergiato)

### Note

- Il padding nav è stato oggetto di discussione in 3 sessioni. Ora risolto.
- Il pattern Q&A è visivamente identico tra FAQ e Club. Gruppi FAQ (titoli sezione) restano con stile diverso (corretto: sono contesti diversi).
- Nessun cambio visivo nelle 53 sostituzioni font→token (solo sintassi CSS).


---

## AGGIORNAMENTO 17 OTTOBRE 2026 (sessione completa - 7 commit)

### Commit pushati (in ordine cronologico)

1. d5827f0 - refactor: rimossi da base.css i 34 token duplicati di tokens.css
2. d78223b - refactor: sostituiti 28 font-size px con token esistenti
3. 8f16a62 - refactor: 25 font-size → token di ruolo + --fs-16
4. 2025268 - design: pattern Q&A FAQ + Club unificato + faq-intro 13px
5. 66fcad3 - design: 3 testi 15→16px + 2 testi 17→18px
6. fc18531 - design: nav padding 12→16px + --header-h 170→169px
7. 02a4159 - docs: CHANGELOG, DIFF-FILES, NOVITA-SITO aggiornati

### Cosa è stato fatto (in sintesi)

**Architettura CSS:**
- base.css :root ripulito (solo --header-h)
- 53+ font-size migrati a token (zero cambi visivi)
- --fs-16 aggiunto a tokens.css
- 34 token duplicati rimossi da base.css

**Design Q&A:**
- FAQ e Club ora visivamente identici (bordi oro, uppercase 500, hover oro, marker reset, body 18px)
- Rimosso border-bottom da .faq-group-title (evitava doppia linea)
- .faq-intro 11→13px

**Nav e header:**
- Nav padding: 12→16px (desktop), 6/12→12/12px (≤1200px)
- --header-h: 170→169px (valore reale)
- Rimosso stile inline --header-h: 105px (residuo DevTools)

**Font rimasti:**
- 3 testi 15→16px (--fs-16)
- 2 testi 17→18px (--fs-body-editorial)

**Documentazione:**
- CHANGELOG: 266 commit, 13142 righe, 59 commit sezione 14
- DIFF-FILES: 84 file sezione 14, 13142 righe +, 884 righe -
- NOVITA-SITO: nuova sezione "Ottimizzazione font e Q&A"
- Tutti validati con html-validate (0 errori)

### Stato finale 17 ottobre (sessione 2)

- HEAD = origin/main = 02a4159
- Working tree: pulito
- ZIP in consegne/: aggiornati (12:19) - Doppelganger_demo_*_2026-10-17.zip
- Branch attivi: main (unico)
- Branch cancellati: nav-padding, font-residui, font-ruoli, riordino-font, token-duplicati, feature/riordino-font, feature/pagina-app

### Note

- Pattern Q&A: FAQ (25 domande in 12 gruppi) e Club (7 domande in lista piatta) ora condividono stesso stile visivo
- Gruppi FAQ (titoli "Ordini", "Spedizioni") restano con stile sezione (corretto: contesti diversi)
- Il padding nav è stato oggetto di discussione in 3 sessioni. Ora risolto.


---

## AGGIORNAMENTO 17 OTTOBRE 2026 (sessione completa - 8 commit)

### Commit pushati (in ordine cronologico)

1. d5827f0 - refactor: rimossi da base.css i 34 token duplicati di tokens.css
2. d78223b - refactor: sostituiti 28 font-size px con token esistenti
3. 8f16a62 - refactor: 25 font-size → token di ruolo + --fs-16
4. 2025268 - design: pattern Q&A FAQ + Club unificato + faq-intro 13px
5. 66fcad3 - design: 3 testi 15→16px + 2 testi 17→18px
6. fc18531 - design: nav padding 12→16px + --header-h 170→169px
7. 02a4159 - docs: CHANGELOG, DIFF-FILES, NOVITA-SITO aggiornati
8. 0d5564d - design: header mobile min-height 72→84px (più respiro, logo invariato)

### Cosa è stato fatto (in sintesi)

**Architettura CSS:**
- base.css :root ripulito (solo --header-h)
- 53+ font-size migrati a token (zero cambi visivi)
- --fs-16 aggiunto a tokens.css
- 34 token duplicati rimossi da base.css

**Design Q&A:**
- FAQ e Club ora visivamente identici (bordi oro, uppercase 500, hover oro, marker reset, body 18px)
- Rimosso border-bottom da .faq-group-title (evitava doppia linea)
- .faq-intro 11→13px

**Nav e header:**
- Nav padding: 12→16px (desktop), 6/12→12/12px (≤1200px)
- --header-h: 170→169px (valore reale)
- Header mobile: min-height 72→84px (+12px respiro)
- Logo mobile: invariato (15px a 375px)

**Font rimasti:**
- 3 testi 15→16px (--fs-16)
- 2 testi 17→18px (--fs-body-editorial)

**Documentazione:**
- CHANGELOG: 268 commit, 13203 righe, 60 commit sezione 14
- DIFF-FILES: 85 file sezione 14, 13203 righe +, 884 righe -
- NOVITA-SITO: sezione "Ottimizzazione font e Q&A" + "Header mobile più respiro"
- Tutti validati con html-validate (0 errori)

### Stato finale 17 ottobre

- HEAD = origin/main = 0d5564d
- Working tree: pulito
- ZIP in consegne/: aggiornati (12:52) - Doppelganger_demo_*_2026-10-17.zip
- Branch attivi: main (unico)

### Note

- Pattern Q&A: FAQ (25 domande in 12 gruppi) e Club (7 domande in lista piatta) ora condividono stesso stile visivo
- Gruppi FAQ (titoli "Ordini", "Spedizioni") restano con stile sezione (corretto: contesti diversi)
- Il padding nav è stato oggetto di discussione in 3 sessioni. Ora risolto.
- Header mobile: +12px di respiro (117px totale), logo invariato


---

## AGGIORNAMENTO 17 OTTOBRE 2026 (fix logo centratura)

### Commit pushati

1526fe0 - fix: centratura ottica logo desktop (header padding 29px simmetrico + translateY 8px per compensare spazio SVG)

### Cosa è stato fatto (css/base.css)

- **Padding header desktop simmetrico**: `.header-main` e `header.menu-open .header-main` da `padding: 32px 20px 26px` a `padding: 29px 20px` (altezza totale 84px invariata).
- **Correzione ottica logo**: Aggiunto in fondo al file `@media (min-width: 1025px) { .logo { transform: translateY(8px); } }`.

### Logica della soluzione

- Il padding asimmetrico (32px sopra, 26px sotto) rendeva il box del logo matematicamente sbilanciato di 6px.
- Una volta reso simmetrico (29/29), visivamente il logo sembrava comunque "alto" a causa dei due puntini sulla "Ä" e dello spazio trasparente all'interno del file SVG.
- Il `translateY(8px)` sposta solo il logo (non il layout) verso il basso, compensando perfettamente l'illusione ottica.

### Test effettuato

- **Desktop (≥1025px)**: Spazio visivo misurato in Console = 37px sopra / 37px sotto. Perfettamente bilanciato a occhio e a pixel.
- **Menu aperto**: Logo centrato anche con il drawer del menu aperto.
- **Mobile/Tablet (≤1024px)**: Invariati. La regola del padding mobile (`padding: 0 16px`) e il `translateY` bloccato dentro la media query desktop non li toccano.

### Stato finale 17 ottobre (fix logo)

- HEAD = origin/main = 9c74812
- Working tree: pulito
- ZIP in consegne/: aggiornati (13:34) - Doppelganger_demo_AGENZIA_2026-10-17.zip e Doppelganger_demo_COMPLETO_2026-10-17.zip
- Branch attivo: main

---

## AGGIORNAMENTO 17 OTTOBRE 2026 (copy outlet luxury)

### Commit pushati

92e6167 - copy: uniformati testi outlet e prodotti (rimosse percentuali fisse, tono luxury)

### Cosa è stato fatto

**Coerenza posizionamento luxury**: eliminati termini "da volantino" ("sconti", "ribassi", "acquista ora!") mantenendo il vantaggio commerciale (la percentuale) in forma elegante.

**index.html (card Home):**
- Card Outlet: `Sconti fino all'80%` → `Fino all'80% in meno`
- Card Primavera Estate: `Ulteriori ribassi` → `Ultimi ribassi`
- Card Primavera Estate: `Vedi i ribassi` → `Scopri la selezione`

**js/layout.js (menu, megamenu, topbar):**
- Menu outlet (desktop + mobile + megamenu): `Abbigliamento -80%` → `Abbigliamento`, `Accessori -80%` → `Accessori` (4+4 occorrenze)
- Topbar: `Outlet -80%: Acquista ora!` → `Outlet: fino al -80%` (niente apostrofo per non rompere JS)

**js/prodotti.js (card prodotto):**
- Etichette `sub` dei prodotti outlet: `Abbigliamento -80%` / `Accessori -80%` → `Abbigliamento` / `Accessori` (3 occorrenze)

### Errore fatto e risolto

**Primo tentativo**: la sostituzione della topbar con `"Outlet: fino all'80% in meno"` ha rotto la sintassi JS (l'apostrofo in `all'80%` chiudeva prematuramente la stringa tra apici singoli). Risultato: header e footer spariti.
**Fix**: sostituito con `"Outlet: fino al -80%"` (senza apostrofo). Verificato con `node --check js/layout.js && node --check js/prodotti.js` (nessun errore).

**Lezione**: nei file JS con stringhe tra apici singoli, mai inserire apostrofi nel testo sostitutivo. Oppure usare escape `\'`.

### Stato finale 17 ottobre (copy outlet)

- HEAD = origin/main = 92e6167
- Working tree: pulito
- ZIP in consegne/: aggiornati (14:12) - Doppelganger_demo_AGENZIA_2026-10-17.zip e Doppelganger_demo_COMPLETO_2026-10-17.zip
- Branch attivo: main

---

## AGGIORNAMENTO 18 OTTOBRE 2026

### Commit pushati

- 68860b0 - fix: ancore senza scatto (calcolo stato header + transizioni off)

### Problema risolto: ancore mobile/tablet

**Sintomo:** cliccando "Resi" dal footer su mobile, il paragrafo precedente restava visibile sopra il titolo.

**Causa:** `scroll-padding-top: 160px` fisso, ma l'header mobile ha due altezze (84px normale, 60px scrolled). Un valore unico non può funzionare per entrambe le ancore.

**Soluzione (in `js/nav.js`, blocco ANCORE):**
- Calcola la posizione finale provando entrambi gli stati dell'header (`scrolled: true/false`) e sceglie quello coerente con la posizione finale
- Disattiva le transizioni durante il posizionamento (classe `.ancora-fix`), poi le riattiva
- Scrolla una volta sola al punto esatto (niente scatti)
- Annulla i riposizionamenti se l'utente tocca, scrolla o preme tasti
- Copre: arrivo da altra pagina (`load`), cambio ancora (`hashchange`), stessa ancora cliccata 2 volte (listener su `click`)

**Test:** funziona su mobile, tablet, desktop. Verificato anche sul telefono vero.

### Stato finale 18 ottobre

- HEAD = origin/main = 68860b0
- Working tree: pulito
- ZIP in consegne/: aggiornati (`AGENZIA` e `COMPLETO` del 2026-10-18)
- Branch attivi: main (unico)
- Sito pronto per la consegna

### Note

- Il blocco ANCORE in `nav.js` è ~80 righe. Se in futuro cambia il comportamento dell'header (es. un terzo stato), va rivisto.
- Le modifiche del 17 ottobre (token, colori, font, header 84px) sono intatte.
- Il problema delle ancore è chiuso. Non toccare `nav.js` fino a dopo la consegna.

---

## CHECKLIST CHIUSURA SESSIONE

Prima di chiudere, nell'ordine:

1. **Test in locale** (server + browser, mobile/desktop)
   `python3 -m http.server 8000`

2. **Validazione sintassi JS** (se nav.js o altri JS modificati)
   `node -c js/nav.js`

3. **Validazione HTML** (se HTML modificato)
   `npx html-validate file.html`

4. **Verifica working tree pulito**
   `git status --short` → deve essere vuoto

5. **Commit e push**
   `git add . && git commit -m "..." && git push origin main`

6. **Genera ZIP di consegna**
   `bash build.sh`
   Verifica: `ls -lh ../consegne/*$(date +%Y-%m-%d)*`

7. **Aggiorna CONTESTO.md** (sezione "AGGIORNAMENTO [data]")
   Commit e push

8. **Aggiorna documentazione design/** (se richiesto)
   design/CHANGELOG.html, DIFF-FILES.html, NOVITA-SITO.html

---

## AGGIORNAMENTO 18 OTTOBRE 2026 (revisione finale + pulizia)

### Commit pushati
5db997c - revisione 18 ottobre: sync pacchetto + 5 fix residui
(da pushere: commit "pulizia e a11y: blocchi 1-7")

### Sync da Doppelganger_aggiornato_2026-10-18
51 file sincronizzati (HTML, CSS, JS, design/*) senza toccare images/, fonts/, documents/.
`nav.js` era gia' aggiornato in root (fix ancore 68860b0).

### Fix residui (chiusi)
- mobile-menu padding-top 105px -> calc(var(--header-h, 117px) + 12px)
- nav-burger 36px -> 44px (WCAG 2.5.5)
- boutique-search input 16px su <=1024px (iOS anti-zoom)
- aria-pressed dinamico chip taglia/colori (filtri.js + layout.js)
- nav.js aggiornaTotale(): .replace(/\./g, '') per prezzi > 999

### Pulizia e a11y (blocchi 1-7)
**Blocco 1 — pulizia banale**
- Rimosso script morto `data-css="ready"` da 36 HTML
- `.footer-copy` color #8a8680 -> #a8a49c (WCAG AA)
- `.visually-hidden` rimosso da checkout.css (resta in base.css)
- `.pdp-size-warning` rimosso da prodotto.css (resta in base.css)
- `.hero color: #2b2b2b` -> `var(--ink)` in collezione.css

**Blocco 2 — token cleanup**
- `.pdp-title` usa `var(--fs-pdp-title)` (non piu' clamp hardcoded)
- Rimossi `--logo-h-mobile` e `--logo-h-phone` da tokens.css (mai usati)
- Rimossi `logoMobile`, `logoPhone` da token.json (fuorvianti)
- `logoDesktop` mantenuto

**Blocco 3 — guida taglie**
- `.size-modal-units` e `.size-modal-cta` nascosti (`display: none !important`)
- Erano placeholder non funzionanti (toggle cm/in, CTA disabled)
- Commento in CSS spiega che vanno riattivati con l'implementazione reale

**Blocco 4 — form lavora-con-noi**
- `aria-invalid` su email/email2/privacy/cv in caso di errore
- Listener `input` spegne `aria-invalid` quando l'utente corregge

**Blocco 5 — tablist accessibile**
- account.html: frecce, Home, End sul `.account-tabs`
- lavora-con-noi.html: frecce, Home, End sul `.lavora-tabs`
- Script inline in coda ai due HTML (non in nav.js)

**Blocco 6 — icone header desktop**
- `@media (min-width: 1025px) { .nav-icon-link { padding: 6px; } }`
- Click area 32x32 (WCAG 2.5.8 AA, non AAA 44px)
- Testato a 375, 1024, 1025, 1200, 1440 px: layout invariato

**Blocco 7 — data-size sulle card**
- `data-size="46 48 50 52 54 56"` su 29 card (`ai-2026`, `cerimonia`, `essential`)
- Featured card escluse (non sono prodotti)
- 3 card differenziate in ai-2026 per rendere il filtro dimostrabile:
  - Abito monopetto: `48 50 52`
  - Impermeabile doppiopetto: `46 48 50`
  - Abito monopetto in lana: `50 52 54`
- Test: filtro 46 nasconde 2 card, restano 13 visibili. OK

### Test effettuato (DevTools, 375px + 1440px)
- Menu mobile: primo link visibile
- Burger 44x44px
- Boutique input 16px
- aria-pressed chip: false -> true -> false
- Filtro prezzo 1-2000: prodotti visibili
- Totale carrello: corretto
- Filtro taglia 46: 2 card spariscono, 13 restano
- Icone header padding 6px a 1025-1440px, layout invariato

### Debiti tecnici residui (per agenzia)
- Focus trap nei drawer (8 pannelli) — rimandato all'agenzia che rifa' i drawer
- Filtro "solo disponibili" — funziona ma nessun prodotto ha `data-available`, quindi non esclude nulla (i dati demo sono tutti disponibili)
- Test su Safari iPhone vero, Firefox, screen reader (fatti solo su Chrome)
- `Doppelganger_Specifiche_per_agenzia.html` da aggiornare (vedi nota sotto)

### Nota su Doppelganger_Specifiche_per_agenzia.html
Non ancora aggiornato con: `--fs-16`, quick-add, fix ancore, `overflow-x: clip`, skip-link + id="main", pattern Q&A unificato. **Va fatto prima di consegnare all'agenzia**, altrimenti lavora su specifiche incomplete.

### Correzione importante
CONTESTO.md diceva "86 boutique": ora sono **83** (array reale). Documenti aggiornati.

### Stato finale 18 ottobre (sessione 2)
- HEAD = origin/main = 5db997c
- Working tree: modificato (blocchi 1-7 in attesa di commit)
- Branch attivo: main
- Branch revisione-18-ottobre: mergiato
- ZIP in consegne/: 18 ott 15:25 (da rigenerare dopo commit blocchi)
- Backup: doppelganger-sito_BACKUP_20261018_1502 (200M, 276 file)

---

## AGGIORNAMENTO 18 OTTOBRE 2026 (sera - chiusura finale)

### Commit pushati (dalla revisione precedente a oggi)

1. a1d842d - pulizia e a11y: blocchi 1-8 (fix minori, token, tablist, data-size, docs)
2. fefabdd - build: rimuove zip esistente prima di ricrearlo (evita file orfani)
3. bee1aa5 - a11y: section con aria-label in carrello, aria-hidden dinamico in guida-taglie
4. f4b058c - css: env() avvolto in max() per padding safe-area
5. 69f32ce - build: esclude *.bak e .DS_Store dagli ZIP di consegna
6. e26f277 - docs: riscritti NOVITA-SITO, Specifiche, LEGGIMI senza appendici e date
7. c986d1f - css: contrasto tab account, pulizia token orfani e CSS morto
8. 15edc36 - a11y + sicurezza: escape HTML in nav.js, badge vicino alle icone, filtro disponibilita

### Blocchi 1-8 (commit a1d842d)

- Blocco 1: data-css morto (36 HTML), contrasto footer, duplicati CSS
- Blocco 2: token cleanup (--fs-pdp-title usato, --logo-h-* rimossi)
- Blocco 3: toggle cm/in guida-taglie nascosto
- Blocco 4: aria-invalid lavora-con-noi
- Blocco 5: tablist frecce tastiera (account + lavora-con-noi)
- Blocco 6: icone header desktop padding 6px (32x32 WCAG AA)
- Blocco 7: data-size su 29 card + 3 differenziate per filtro dimostrabile
- Blocco 8: CONTESTO aggiornato, Specifiche +2 pagine (poi rimosse nella riscrittura)

### Risultato test (DevTools 375px + 1440px)

- Menu mobile: primo link visibile
- Burger 44x44
- Boutique input 16px (iOS no zoom)
- aria-pressed chip filtri: false -> true -> false
- Filtro prezzo 1-2000: prodotti visibili
- Totale carrello: corretto
- Filtro taglia 46: 2 card spariscono, 13 restano
- Icone header padding 6px: layout invariato a 1025, 1200, 1440px

### Punti rimandati (consapevoli)

- Focus trap nei drawer (8 pannelli): delegato all'agenzia che rifara i drawer
- Test su Safari iPhone vero, Firefox, screen reader: fatti solo su Chrome simulato
- Lighthouse finale post-fix: **93 mobile / 100 desktop** (18 ottobre, dopo tutte le ottimizzazioni). Il 14 ottobre era 100/100 su home prima dei fix — la differenza dipende dal video hero (2,4 MB) e dai 4 font caricati, non da regressioni. Le ottimizzazioni del 18 ottobre hanno migliorato FCP (1,2s -> 1,1s), Speed Index (1,3s -> 1,2s), percorso critico (222ms -> 197ms).
- .filtri-count contrasto ~3:1: scelta visiva (bianco su oro), documentato come debito minore

### Punti rimandati (architetturali, da agenzia)

- Scala font ridotta 12/14/16/20/24/32 (proposta in CONTESTO da 3 sessioni, richiede test visivo approfondito)
- Carosello triplicato in nav.js (refactor estetico, delegato)
- Code-splitting nav.js/layout.js (refactor architetturale, delegato)

### Documenti riscritti in modo corretto

Invece di appendici con date e note "uniscile tu" (errore fatto e corretto), i tre documenti sono stati riscritti integrando i contenuti nelle sezioni esistenti:

- Doppelganger_Specifiche_per_agenzia.html: 17 pagine (era 19 con 2 appendici). Integrazioni in p5 (16px), p6 (icone header), p7 (Q&A), p8 (hamburger 44), p12 (a11y completa), p14 (data-size). Zero date nei titoli, zero "vanno integrate".
- NOVITA-SITO.html: "Terzo aggiornamento di ottobre 2026" unico (raccoglie le 3 sezioni datate precedenti), closing spostato in fondo, div sbilanciato corretto.
- LEGGIMI-AGENZIA.md: sezione "Revisione finale del 18 ottobre" eliminata. Contenuti integrati in "Pattern e stati" (10 voci) sotto "Come leggere il codice". "Qualita e performance" arricchita con validazione e test browser.

### Pulizia disco

- Cancellati ~798 MB (backup grande del 14 ottobre, 792 MB)
- Cancellati file .DS_Store (3), .bak (3 in design/), deepseek_bash orfano
- Cancellata cartella Doppelganger_aggiornato_2026-10-18 (sorgente sync, ridondante)
- Cancellato CONTESTO.md orfano in ~/Downloads (era fermo al 17 ottobre)
- Backup 18 ottobre spostato in backup/ insieme al pre-rewrite del 14 ottobre
- build.sh: rm -f prima di ogni zip (niente file orfani futuri)

### Validazione finale (100%)

- HTML: 41 file (35 pagine + 6 design/*.html) - 0 errori con html-validate
- CSS: 25 file - 0 errori con csstree-validator
- JS: 16 file - 0 errori con node -c
- JSON: 1 file (design/token.json) - parse OK
- Conteggio parentesi: tutti i 16 JS bilanciati
- Fix a11y durante validazione: section con aria-label in carrello, aria-hidden rimosso da overlay statico guida-taglie

### Fix sicurezza

- nav.js escNav(): escape HTML in tutte le iniezioni via innerHTML (search results, cart item, journal card home/grid, wishlist, DGMedia.markup). Prima i dati venivano iniettati raw: nella demo e innocuo (dati statici da prodotti.js), ma in produzione sarebbe un rischio XSS.

### Stato finale 18 ottobre (sera)

- HEAD = origin/main = 15edc36
- Working tree: pulito
- Branch attivo: main
- Branch revisione-18-ottobre: cancellato (mergiato in main)
- ZIP in consegne/: 18 ott 17:13 (AGENZIA 4.8M, COMPLETO 42M)
- Backup: backup/ contiene pre-rewrite 14 ott (191M) + doppelganger-sito_BACKUP_20261018_1502 (200M, da tenere 2-3 giorni)
