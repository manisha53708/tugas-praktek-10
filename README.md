# WeatherFinder — Pertemuan 10 Praktikum

Aplikasi cuaca real-time React Native + Expo yang
mendemonstrasikan useEffect, debounce, dan integrasi API.

## Fitur
- Cari cuaca berdasarkan nama kota
- Debounce 500ms (hemat request)
- 4 kondisi UI: kosong / loading / error / sukses
- Data dari Open-Meteo (gratis, tanpa API key)

## Konsep yang Dipakai
- useState (4 state), useEffect (dependency array)
- Debounce dengan setTimeout + clearTimeout
- AbortController untuk cleanup & anti race-condition
- Conditional rendering dengan operator &&

## Cara Menjalankan
1. npm install
2. npx expo start
3. Scan QR dengan Expo Go

## Link
- Expo Snack: [tempel link di sini]

## Screenshot
![Kosong](https://github.com/manisha53708/tugas-praktek-10/blob/main/assets/kosong.jpeg)
![Loading](https://github.com/manisha53708/tugas-praktek-10/blob/main/assets/loading.jpeg)
![Sukses](https://github.com/manisha53708/tugas-praktek-10/blob/main/assets/sukses.jpeg)
![Error](https://github.com/manisha53708/tugas-praktek-10/blob/main/assets/error.jpeg)

## Author
[Manishaa Rajs Kaur] - [243303620221] - Universitas Prima Indonesia
