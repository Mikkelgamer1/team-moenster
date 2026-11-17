# Team Mønster – hjemmeside

Statisk site for Team Mønster og travtræner og kusk Knud Mønster (licens 41000). Ingen afhængigheder – kræver kun Node 20+.

```
node build.mjs            byg til dist/ med de gemte data
node build.mjs --hent     hent friske data fra Dansk Hestevæddeløb først
node build.mjs --serve    byg og vis på http://localhost:4173 (PORT=… for en anden port)
node build.mjs --test     selvtjek
```

## Det opdaterer sig selv

- **Heste i træning, resultater, kommende starter og statistik** for Knud som træner og kusk hentes fra Dansk Hestevæddeløbs åbne data (samme kilde som travinfo.dk) og gemmes i `data/travinfo.json`.
- **Michelle Mønsters tal** som kusk og rytter (licens 47327) hentes på samme måde og vises på forsiden, Stalden og Resultater.
- **År som selvstændig** regnes ud fra 1. maj 1993 ved hver opbygning.
- Skrevet ind i hånden (ingen datakilde): DM-medaljerne (`DM` i templates.mjs), karrierens milepæle (`KARRIERE`) og historien.
- `.github/workflows/opdater.yml` henter data hver morgen og ved hvert push til `main` og gemmer dem i repoet – så bygger Vercel en ny udgave. Fejler hentningen, bygges der videre med de gemte data.
- På Vercel får sitet projektets adresse automatisk. En `vercel.app`- eller `github.io`-adresse holdes ude af søgemaskinerne.

## Facebook-opslag på forsiden

De 5 seneste opslag fra staldens Facebook-**side** kan vises som kort under "Følg med". De hentes ved den daglige opdatering via Meta's Graph API, og billederne gemmes på sitet selv – ingen indlejring, ingen cookies og intet klik. Indtil da vises et fast kort, der linker til siden.

Opsætning (én gang, af en administrator af Facebook-siden):

1. developers.facebook.com → **Mine apps** → **Opret app** (type: Virksomhed).
2. **Graph API Explorer**: vælg appen og siden, giv tilladelserne `pages_show_list` og `pages_read_engagement`, hent et **sideadgangstoken** og forlæng det i **Access Token Debugger**.
3. Find sidens id (`me?fields=id,name` med sidetokenet).
4. GitHub-repoet → **Settings → Secrets and variables → Actions**: secret `FB_TOKEN` = sidetokenet, variable `FB_SIDE` = sidens id.
5. Kør workflowet "Opdater data" én gang.

## Ret indhold

Alt indhold står i `templates.mjs`: kontaktoplysninger i `SITE` øverst. Design i `assets/css/site.css` (farverne øverst: hvid, kalk, sort og rød – fra løbsfarverne, hvid med rødt). Skrift: Saira Condensed og Hanken Grotesk (begge SIL Open Font License).

## Kilder

Kilderne står her og ikke på siderne. Billedkreditter står i bunden af siden.

| Oplysning | Kilde |
| --- | --- |
| Træningsliste, resultater, kommende starter, statistik, licens, født 1967, hjemmebane, løbsfarver, adresse og telefon | Dansk Hestevæddeløb (licens 41000 og 47327), opdateres dagligt. Telefon og adresse står også på Facebook-siden |
| Firmanavn og CVR i bunden (Travtræner Knud Mønster, CVR 16892076, startdato 26.04.1993) | CVR-registret (datacvr.virk.dk), tjekket 17. november 2026 |
| Faren og amatørløbene, Brabrand og Jydsk Væddeløbsbane, skolepraktik hos Bent Madsen og Birger Jørgensen, Vagn "Futter" Lønborg, Stanley Dancer i vinteren 1986/87 (med Henrik Lund), Jørn Laursen, Birger Jørgensen og Seppo Kukkonen, egen stald i Skive 1. maj 1993 | travet.dk 5.9.2026 ("Knud Mønster dansk mester igen – 18 år efter det første DM-guld") og travservice.dk 22.10.2017 ("Knud Mønster, 50 år") |
| DM for professionelle travtrænere: guld 2008 (45 point foran Ken Ecce) og 2026 (51 point, tre afdelingssejre, Cardolan Byd i finalen); sølv 2000, 2006, 2011, 2013, 2019, 2021; bronze 2001, 2018 | travet.dk 5.9.2026; travservice.dk 5.9.2026 ("DM: Knud Mønster holdt føringen!") |
| Europamester for professionelle travkuske 2014 på Solänget og Umåker (75 point foran Tony Le Beller og Björn Goop), anden dansker efter Birger Jørgensen, VM for kuske i Australien året efter | travet.dk 5.9.2026 |
| Dansk Trav Derby 2012 med Repay Merci (Knud Mønster som kusk) | Travsportens Hall of Fame (thof.dk, derbyvinderne) |
| Repay Merci: 113 starter, 18 sejre, over 3,8 mio. kr., Jydsk 4-årings Grand Prix og Grand Circle 4-års Championat 2012, sejre i Norge og Frankrig | travet.dk 5.9.2026 og 1.10.2024 ("Knud Mønster over millionen") |
| Dansk Hoppe Derby med Mathilde Trøjborg, Dansk Trav Kriterium som kusk med Steen Juul-trænede Takethem, Juvel Trøjborg (over 2 mio. kr., Mesterskab for Danmark) | travet.dk 5.9.2026, travservice.dk 22.10.2017 |
| Bestyrelsesmedlem i Skive Trav | skive-trav.dk/om-os/bestyrelse/ og travet.dk ("Ny bestyrelsesformand for Skive Trav") |
| Michelle er Knuds datter, fem gange Årets Montérytter ved Hestesportens Galla, i sadlen som toårig, fuldtid i stalden efter 10. klasse; ridetræning som en del af hestenes program; gårdens sandbane | travet.dk 15.2.2026 ("Michelle Mønster kåret for femte gang") og 14.8.2026; travservice.dk 14.10.2018 |
| Michelle rider og kører i både monté og sulky | travservice.dk 8.7.2025 ("Vandt både i monté og i sulky": Tour Eiffel i monté og Knud-trænede Ludvig S i sulky samme dag) og startlisterne fra Dansk Hestevæddeløb |
| Skive Trav: åbnet 1948 som Nordvestjysk Væddeløbsbane, på Flyvej siden 1966, lysanlæg 2019–20 | skive-trav.dk/om-os |
| Facebook: facebook.com/teammoenster – starter før løbsdagene, billeder og videoer | Team Mønsters Facebook-side, aflæst 17. november 2026 |
