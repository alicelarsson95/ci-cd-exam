# Strajk Bowling – Examination

Det här projektet är min inlämningsuppgift i kursen CI/CD. 
Användaren kan välja datum, tid, antal spelare, antal banor och lägga till skostorlekar. När bokningen är klar sparas den i `sessionStorage` och visas på confirmations-sidan.

Jag har skrivit tester med Vitest, React Testing Library och MSW, och försökt hålla allting så tydligt och enkelt som möjligt. Alla tester ligger i `tests/` och täcker både grundfunktionaliteten och olika felmeddelanden (t.ex. om man inte fyller i allt, har fel antal skor eller försöker boka för många spelare på en bana).

Jag har också lagt till validering och fler tester för att sikta på **VG**, inklusive:
- felmeddelanden som inte fanns från början  
- mockat POST-anrop med MSW  
- test coverage på över 90%  
- GitHub Actions som kör tester automatiskt när jag pushar till `main`

## Struktur
- `src/views` – Booking och Confirmationsidorna  
- `src/components` – Återanvändbara komponenter (Input, Shoes, Navigation, BookingInfo m.m.)  
- `tests/` – Alla tester  
- `mocks/` – MSW handlers och server

https://github.com/alicelarsson95/ci-cd-exam



