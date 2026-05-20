# Muscrypt

Muscrypt adalah microsite statis untuk menyembunyikan dan menginterpretasikan teks dengan pola cipher sederhana, dengan visual yang selaras dengan identitas blog MuS.

## Preview Lokal

Buka `index.html` langsung di browser, atau jalankan server statis lokal.

Contoh:

- VS Code Live Server
- `python -m http.server`
- `npx serve`

## Struktur File

- `index.html` — struktur halaman utama
- `style.css` — styling, dark mode, footer, dan custom cursor
- `script.js` — logika cipher, copy output, dan inisialisasi cursor
- `favicon/` — favicon site
- `mus-symbol.svg` — simbol footer
- `og-image.png` — thumbnail Open Graph untuk preview share

## Publish

Project ini ditujukan untuk dipublish sebagai site statis di subdomain terpisah.

Contoh target:

`https://muscrypt.musnotes.my.id/`

Pastikan metadata di `index.html` sesuai dengan domain final sebelum deploy.

## License

Copyright (c) 2026 MuS  
All rights reserved.
