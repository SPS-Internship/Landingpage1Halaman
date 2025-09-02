framework backend (laravel) frontend admin dan user (react + vite)

versi
express backend,-- Laravel Framework 12.21.0
react admin, vite/7.0.6 win32-x64 node-v22.13.1
react user, vite/7.0.6 win32-x64 node-v22.13.1


intallation backend laravel
buka terminal 
install laravel (backend)
composer create-project laravel/laravel contend-service (enter)
cd contend-servis(enter)
composer require laravel/breeze --dev(enter)
php artisan breeze:install api(enter)
npm install axios
buat db di pgadmin contoh web_naratel
klik .env 
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=web_naratel (sesuai db yang dibuat di pgadmin)
DB_USERNAME=postgres
DB_PASSWORD=12345678 (sandi pg admin)
kembali buka terminal
cd contend-servis (jika belum berada di folder contend-servis)
php artisan migrate / php artisan migrate:fresh

intalation frontend react admin
buka terminal
install react vite (frontend)
npm create vite@latest kapten-naratel-adminfrontend (enter)
pilih framework: React
pilih variant: JavaScript

masuk ke folder project
cd kapten-naratel-adminfrontend (enter)
npm install react-router-dom

intalation frontend react user
buka terminal
install react vite (frontend)
npm create vite@latest kapten-naratel-frontend (enter)
pilih framework: React
pilih variant: JavaScript

masuk ke folder project
cd kapten-naratel-frontend (enter)

install dependency
npm install (enter)

install tambahan library 
npm install axios react-router-dom framer-motion (enter)
npm install -D tailwindcss postcss autoprefixer (enter)
npx tailwindcss init -p (enter)


perintah untuk menjalankan backend, admin, dan user
klik ... pada bagian kiri atas disebelah kan run lalu pilih terminal,new terminal
ketika sudah masuk terminal klik tombol + 2x untuk menambah 2 terminal lalu jalankan perintah dibawah untuk menjalankan server

backend
C:\xampp\htdocs\Landingpage1halaman> cmd
C:\xampp\htdocs\Landingpage1halaman> cd contend-servis (enter) /untuk masuk ke folder backend
C:\xampp\htdocs\contend-servis>\backend>php artisan serve --port=8002 (enter) /untuk menjalankan server

admin
C:\xampp\htdocs\Landingpage1halaman> cd kapten-naratel-adminfrontend (enter) /untuk masuk ke folder admin
C:\xampp\htdocs\Landingpage1halaman\kapten-naratel-adminfrontend> npm run dev (enter) /untuk menjalankan server

user
C:\xampp\htdocs\Landingpage1halaman> cd kapten-naratel-frontend (enter) /untuk masuk ke folder user
C:\xampp\htdocs\Landingpage1halaman\kapten-naratel-frontend> npm run dev (enter) /untuk menjalankan server


untuk masuk ke halaman admin loginnya/dashboard admin

Email Address=admin@gmail.com
Password=admin
