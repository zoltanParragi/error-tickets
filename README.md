# Hibajegy kezelő app

## Felhasznált technológiák
- Laravel 8.83.27
- React.js
- Bootstrap 5.3.0

## Használatba vétel
- klónozni kell a repo-t, 
- composer i
- env.example átnevezése: .env, az adatbázis neve: error-tickets
- php artisan key:generate
- létre kell hozni egy MySQL iadatbázist, név: error-tickets
- php artisan migrate (Létrejönnek a clients, users, tickets táblák.)  
- php artisan db:seed (A clients és users táblákban létrejönnek a fake adatok.) 
- npm i
- php artisan serve
