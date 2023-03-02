# Instructions

1. Ni har fått en stor uppsättning interfaces givna för ett serversystem som skall kunna hantera hiscores för olika leaderboards. Systemet innehåller en definition av poäng, spelare, ranker.
2. Er uppgift är att implementera systemet. Det finns given startkod i och **src/lib/do_not_modify** och **src/lib/implementations**. Den givna koden är inte färdig. Ni skall endast göra ändringar i **src/lib/implementations** och om ni vill snygga till testsidan kan ni snygga till **src/routes/page.svelte**
3. Servern skall kunna svara på alla requests som finns beskrivna i **requests.ts**. Kommentarerna där specifierar vilken typ av requests det är och för vilken _ändpunkt_ på servern.
4. Informationen behövs lagras i databas för att informationen skall persistera mellan körningar.
5. Ni kommer implementera samma lösning i SQLite, MongoDB, och en variant som vi kallar _inmemory_. Den som lagras inmemory är simplast, där lagrar ni informationen i en datastruktur på servern. t.ex. i en map, denna behöver alltså inte persisterad lagring, den återställs bara man startar om servern.
6. Ni får programmera och utföra denna uppgift i grupper om två. Ta en titt på [parprogrammering](https://en.wikipedia.org/wiki/Pair_programming). Se till att turas om och att diskutera tillsammans lösningar på uppgiften.
7. Er klient skall kunna bevisa att ni kan använda alla operationer som servern exponerar.
8. För att bli godkänd måste ni demonstrera tillsammans en annan grupp att systemen kan kommunicera med varandra. Detta illustrerar kraften i att använda interfaces vilket skapar interoperabilitet mellan olika system som utvecklats av olika utvecklare.
   - Turas om att köra varandras klientprogram mot varandras serverprogram.
