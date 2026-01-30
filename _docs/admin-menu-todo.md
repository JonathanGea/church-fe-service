# Admin Menu TODO + Prompt (Untuk Multi-Agent)

Dokumen ini membagi pekerjaan admin menu menjadi tugas-tugas paralel. Semua agent **wajib** menjaga konsistensi desain dengan UI admin yang sudah ada dan mengikuti @design_guide (pakai token Tailwind admin: `bg-app`, `bg-surface`, `text-strong`, `text-primary`, `border-default`, `bg-primary`). Jangan menambah warna hex baru atau font baru. Gunakan pola layout admin (`AdminLayoutComponent`) dan komponen UI yang sudah tersedia.

Catatan umum:
- Fokus pada UI/UX admin; gunakan data mock sementara.
- Standalone component + template HTML seperti pola existing.
- Hindari perubahan desain publik.
- Perhatikan responsif dan state dasar (empty, loading, error).

## Todo Global
- [x] Definisikan struktur navigasi admin sesuai MVP + menu tambahan bertahap.
- [ ] Buat halaman admin untuk: Dashboard, Warta, Kegiatan, Ibadah, Album, Kontak.
- [ ] Siapkan form dan tabel list minimal untuk CRUD (tanpa backend).
- [x] Pastikan routing admin dan breadcrumbs sinkron dengan title data route.

## Tugas Agent (Paralel)

### Agent 1 — IA & Navigation
**Scope**: Struktur menu admin, routing, sidebar state.
**Prompt**:
"Buat update navigasi admin berbasis `admin-menu.md`. Pastikan menu minimal (Dashboard, Warta, Kegiatan, Ibadah, Album, Kontak). Tambahkan struktur untuk menu lanjutan (Tentang Jemaat, Pelayanan, Persembahan, User Management, Settings) tapi bisa diset sebagai placeholder route. Update routing agar tiap halaman memiliki `data.title` dan `data.breadcrumbs` konsisten. Pakai gaya admin yang sudah ada, jangan ubah design language. Ikuti @design_guide dan token admin (`bg-surface`, `text-strong`, `text-primary`). Output yang Diharapkan dari Tiap Agent: Komponen + template HTML/CSS sesuai area masing-masing; Routing admin terhubung dan breadcrumbs/title terisi; Menggunakan data mock lokal (tanpa API); Tidak menambah dependensi baru. Jika sudah done, update di `_docs/admin-menu-todo.md`."

Status: selesai pada 30 Jan 2026 (navigasi + routing admin + placeholder lanjutan).

### Agent 2 — Dashboard Admin
**Scope**: Halaman dashboard admin.
**Prompt**:
"Bangun halaman Dashboard admin (analytics) sesuai desain admin existing. Buat ringkasan statistik (warta aktif, kegiatan minggu ini, album terbaru, pengunjung opsional) dan quick actions (upload warta, tambah kegiatan, tambah album). Pakai komponen card sederhana dengan `bg-surface`, `text-strong`, `text-primary`, border halus. Jangan tambahkan font/warna baru. Ikuti @design_guide dan pola layout admin saat ini. Output yang Diharapkan dari Tiap Agent: Komponen + template HTML/CSS sesuai area masing-masing; Routing admin terhubung dan breadcrumbs/title terisi; Menggunakan data mock lokal (tanpa API); Tidak menambah dependensi baru. Jika sudah done, update di `_docs/admin-menu-todo.md`." 
**Status**: ✅ Done (dashboard analytics page + routing + breadcrumbs updated)

### Agent 3 — Warta & Kegiatan
**Scope**: Halaman list + form Warta dan Kegiatan (CRUD UI).
**Prompt**:
"Buat halaman admin untuk Warta dan Kegiatan. Sertakan list table dengan filter/search sederhana, tombol tambah, dan form modal/section untuk create/edit. Field Warta: judul, tema, tanggal, file PDF, status aktif. Field Kegiatan: judul, kategori, tanggal/waktu, lokasi, status, deskripsi, agenda, highlight, kontak. Gunakan layout admin existing, styling dengan token admin. Jangan ubah desain publik; ikuti @design_guide. Output yang Diharapkan dari Tiap Agent: Komponen + template HTML/CSS sesuai area masing-masing; Routing admin terhubung dan breadcrumbs/title terisi; Menggunakan data mock lokal (tanpa API); Tidak menambah dependensi baru. Jika sudah done, update di `_docs/admin-menu-todo.md`." 
**Status**: ✅ Done (Warta & Kegiatan pages + routing).

### Agent 4 — Ibadah & Kontak
**Scope**: Halaman Jadwal Ibadah dan Kontak & Lokasi.
**Prompt**:
"Buat halaman admin untuk Jadwal Ibadah (mingguan + kategorial) dan Kontak & Lokasi. Untuk Ibadah: tabel/list CRUD dan upload tata ibadah PDF. Untuk Kontak: form alamat, telepon, WA, email, link maps, jam operasional (list). Konsisten dengan styling admin (bg-surface, text-strong, text-primary). Ikuti @design_guide dan jangan pakai warna/komponen baru. Output yang Diharapkan dari Tiap Agent: Komponen + template HTML/CSS sesuai area masing-masing; Routing admin terhubung dan breadcrumbs/title terisi; Menggunakan data mock lokal (tanpa API); Tidak menambah dependensi baru. Jika sudah done, update di `_docs/admin-menu-todo.md`." 
**Status**: ✅ Done (ibadah + kontak page, routing, breadcrumbs)

### Agent 5 — Album
**Scope**: Halaman Album/Media admin.
**Prompt**:
"Buat halaman admin Album/Media: list album (judul, tag/kategori, cover, highlight), aksi CRUD, dan UI upload multiple foto per album. Gunakan card/list sederhana dan area upload mock. Konsisten dengan admin UI existing, token warna admin, dan @design_guide. Output yang Diharapkan dari Tiap Agent: Komponen + template HTML/CSS sesuai area masing-masing; Routing admin terhubung dan breadcrumbs/title terisi; Menggunakan data mock lokal (tanpa API); Tidak menambah dependensi baru. Jika sudah done, update di `_docs/admin-menu-todo.md`." 

Status: selesai pada 30 Jan 2026 (halaman album admin + upload mock).

## Output yang Diharapkan dari Tiap Agent
- Komponen + template HTML/CSS sesuai area masing-masing.
- Routing admin terhubung dan breadcrumbs/title terisi.
- Menggunakan data mock lokal (tanpa API).
- Tidak menambah dependensi baru.
