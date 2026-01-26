# Admin Menu Requirements (Detailed)

Dokumen ini merinci fitur admin yang diperlukan untuk mengelola konten publik dan operasional.

## 1) Auth & Access
- Login admin (username + password)
- Logout
- (Opsional) Registrasi admin
- Role & permission (ADMIN, EDITOR)

## 2) Dashboard
- Ringkasan statistik:
  - Total warta aktif
  - Kegiatan minggu ini
  - Album terbaru
  - Pengunjung (opsional, jika ada analytics)
- Quick actions:
  - Upload warta baru
  - Tambah kegiatan
  - Tambah album

## 3) Tentang Jemaat
- Edit profil jemaat:
  - Nama jemaat
  - Tagline
  - Sejarah singkat
  - Visi & misi (list)
  - Struktur pelayan (list: role + name)
- Upload logo jemaat

## 4) Jadwal Ibadah
- Jadwal mingguan (CRUD):
  - Hari, nama ibadah, jam, lokasi, tipe (onsite/online)
- Jadwal kategorial (CRUD)
- Upload tata ibadah PDF

## 5) Ibadah Online & Tema Mingguan
- Link streaming (YouTube/Zoom)
- Status live (on/off)
- Tema minggu ini:
  - Judul tema
  - Ayat
  - Nama pelayan firman

## 6) Warta Jemaat
- Upload PDF warta
- Metadata:
  - Judul
  - Tema
  - Tanggal
- Arsip per bulan (auto-grouping)
- Set warta sebagai “aktif” (utama)

## 7) Kegiatan Jemaat
- CRUD kegiatan:
  - Judul
  - Kategori
  - Tanggal & waktu
  - Lokasi
  - Status (Terbuka/Pelayanan/Undangan)
  - Deskripsi
  - Agenda (list)
  - Highlight (list)
  - Kontak penanggung jawab
- Filter kegiatan per bulan/kategori

## 8) Pelayanan Jemaat
- Kategorial (CRUD)
  - Nama kategori
  - Jadwal
  - Deskripsi singkat
- Fungsional (CRUD)
  - Nama pelayanan
  - Deskripsi

## 9) Persembahan
- Kelola rekening persembahan
- Upload/ubah QRIS
- Catatan persembahan (list)
- Konfirmasi persembahan (view list)
  - Nama, tanggal, nominal, metode, keterangan

## 10) Kontak & Lokasi
- Alamat gereja
- Nomor telepon
- WhatsApp admin
- Email
- Link Google Maps
- Jam operasional (list)

## 11) Album / Media
- CRUD album:
  - Judul
  - Tag/kategori
  - Cover image
- Upload foto ke album (multiple)
- Set album highlight

## 12) User Management
- CRUD admin
- Reset password
- Assign role

## 13) Settings Umum
- Identitas jemaat (nama, logo, tagline)
- Warna tema (opsional)
- SEO metadata (title, description)

## 14) Audit Log (Opsional)
- Log aktivitas admin

## Navigasi Minimal (MVP)
- Dashboard
- Warta
- Kegiatan
- Ibadah
- Album
- Kontak
