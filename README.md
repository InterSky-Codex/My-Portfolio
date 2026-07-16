# Portfolio Website — Diarra Alifa Pratama

Website portfolio satu halaman (single-page) untuk menampilkan profil, pengalaman, proyek, dan repository GitHub secara otomatis. Dibangun dengan HTML, CSS, dan JavaScript murni, memakai Bootstrap 5 untuk komponen UI, dan di-hosting gratis lewat GitHub Pages.

## ✨ Fitur

- **Navbar sticky** dengan link ke setiap section (Home, About, Projects, Repositories, Contact)
- **Route line** — navigasi vertikal ala "peta transit" di sisi kiri (desktop) yang otomatis menyorot section aktif saat scroll
- **Hero section** — perkenalan singkat + ilustrasi SVG kota
- **About** — fokus di Web Development, minat di PC hardware, dan riwayat magang di Honda Siap Motor
- **Featured Projects** — kartu statis untuk proyek unggulan (termasuk Aplikasi Pengaduan Sekolah)
- **GitHub Repositories** — diambil otomatis dari GitHub REST API lewat Fetch API, lengkap dengan status loading (skeleton) dan penanganan error + tombol retry
- **Footer/Contact** — link ke GitHub, email, dan media sosial
- Responsif penuh, mendukung keyboard navigation, dan menghormati preferensi `prefers-reduced-motion`

## 🛠️ Tech Stack

- HTML5 & CSS3 (custom properties / CSS variables)
- JavaScript (Vanilla, ES6+, Fetch API)
- [Bootstrap 5](https://getbootstrap.com/) (via CDN)
- [Bootstrap Icons](https://icons.getbootstrap.com/) (via CDN)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono
- GitHub REST API (`/users/{username}/repos`)

## 📁 Struktur File

```
.
├── index.html    # Struktur halaman & semua section
├── style.css     # Styling custom di luar Bootstrap
├── script.js     # Fetch GitHub API, navigasi aktif, animasi scroll, dll.
└── README.md
```

## ⚙️ Konfigurasi Sebelum Deploy

Sebelum di-publish, sesuaikan bagian berikut:

1. **Username GitHub** — di `script.js`, ganti:
   ```js
   const GITHUB_USERNAME = "GITHUB_USERNAME"; // ganti dengan username GitHub kamu
   ```

2. **Email & media sosial** — di `index.html`, cari komentar `<!-- TODO -->` untuk:
   - Alamat email (mailto)
   - Link GitHub, LinkedIn, Instagram di section Contact

3. **Link proyek** — di section Projects, ganti `href="#"` pada tombol *Code*/*Live* dengan link repository/demo yang sesuai, dan lengkapi 2 kartu proyek placeholder (Project 2 & 3) sesuai proyek kamu.

## 🚀 Menjalankan Secara Lokal

Karena website ini murni statis, cukup buka `index.html` langsung di browser, atau gunakan local server sederhana (opsional, untuk menghindari masalah CORS pada beberapa browser):

```bash
# Python
python3 -m http.server 8000

# atau Node.js
npx serve .
```

Lalu buka `http://localhost:8000`.

## 🌐 Deploy ke GitHub Pages

1. Push repository ini ke GitHub (branch `main`).
2. Buka **Settings → Pages** di repository.
3. Pada bagian **Branch**, pilih `main` dan folder `/ (root)`, lalu **Save**.
4. Tunggu 1–2 menit, situs akan tersedia di:
   ```
   https://<username-github>.github.io/<nama-repo>/
   ```
   atau `https://<username-github>.github.io/` jika nama repo adalah `<username-github>.github.io`.

## 📄 Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan pribadi/portfolio.
