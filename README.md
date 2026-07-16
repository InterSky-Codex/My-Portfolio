# My Portfolio — Diarra Alifa Pratama

Portfolio web statis satu halaman yang memperkenalkan profil, pengalaman, proyek, dan repositori GitHub secara ringkas dan modern.

Dibangun dengan HTML, CSS, dan JavaScript vanilla, menggunakan Bootstrap 5 untuk tata letak responsif, serta GitHub Pages untuk hosting gratis.

## 🌟 Ringkasan

- Halaman landing portfolio satu halaman yang ramah mobile dan desktop
- Navigasi atas plus sidebar route line untuk pengalaman scroll yang interaktif
- Data repositori GitHub ditarik otomatis dari GitHub API
- Sidebar route line otomatis bersembunyi setelah 5 detik untuk tampilan lebih bersih
- Animasi sederhana dengan `IntersectionObserver`, transisi, dan skeleton loader

## ✨ Fitur Utama

- Sticky navbar dengan navigasi internal ke setiap section
- Sidebar route line desktop yang menyorot section aktif
- Auto-hide sidebar setelah 5 detik untuk tampilan yang lebih rapi
- Hero section profil personal dengan ilustrasi SVG custom
- Bagian About, Projects, Repositories, dan Contact
- Pengambilan data repo GitHub secara otomatis dengan fallback error handling
- Responsif penuh dan mendukung preferensi `prefers-reduced-motion`

## 🧩 Teknologi

- HTML5
- CSS3 (custom properties, responsive layout)
- JavaScript (ES6+, Fetch API)
- Bootstrap 5 (via CDN)
- Bootstrap Icons (via CDN)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono
- GitHub REST API

## 📁 Struktur Repository

```
.
├── index.html    # Struktur halaman utama dan konten portfolio
├── style.css     # Styling custom untuk tampilan dan animasi
├── script.js     # Logika interaktif, fetch GitHub API, auto-hide sidebar
└── README.md     # Dokumentasi proyek
```

## ✅ Pengaturan yang Perlu Diperbarui

1. **Username GitHub**
   - Buka `script.js`
   - Ubah nilai `GITHUB_USERNAME` menjadi `InterSky-Codex`

2. **Link kontak**
   - Di `index.html`, sesuaikan tautan email dan tautan media sosial di bagian Contact

3. **Detail proyek**
   - Perbarui teks dan tombol pada bagian Projects agar sesuai dengan proyek nyata kamu

## 🚀 Menjalankan di Lokal

Website bisa dijalankan langsung tanpa server, tapi untuk pengalaman terbaik gunakan server lokal:

```bash
cd c:\laragon\www\portfolio-diarra
python -m http.server 8000
```

Lalu buka:

```text
http://localhost:8000
```

## 🌐 Deploy ke GitHub Pages

1. Pastikan semua perubahan sudah di-push ke branch `main`
2. Buka repo GitHub: `https://github.com/InterSky-Codex/My-Portfolio`
3. Pergi ke `Settings → Pages`
4. Pilih source:
   - Branch: `main`
   - Folder: `/ (root)`
5. Klik `Save`

Setelah beberapa menit, GitHub Pages akan menerbitkan situs di:

```text
https://intersky-codex.github.io/My-Portfolio/
```

## 📌 Catatan

- Pastikan `index.html` berada di root repository.
- Jika ingin pakai custom domain, tambahkan file `CNAME` dengan nama domain kamu.

## 📄 Lisensi

Lisensi bebas. Gunakan, pelajari, dan modifikasi sesuai kebutuhan portfolio kamu.
