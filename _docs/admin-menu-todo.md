# Admin Menu TODO (Dev)
Scope tambahan: semua konten Admin membaca/menyimpan data melalui API (bukan hardcoded).
Sumber kebenaran kebutuhan data: `_docs/admin-menu.md`.
Urutan checklist = prioritas pengerjaan. Kerjakan dari atas ke bawah.

## 0) Akses & Keamanan
- [x] Pastikan halaman Admin hanya bisa diakses user ber-role ADMIN (guard + route protection). (2026-01-30)
- [x] Pastikan token admin tersimpan aman dan otomatis attach ke semua request admin. (2026-01-30)
- [x] Tangani token expired (redirect login + pesan yang jelas). (2026-01-30)
- [x] Pastikan logout membersihkan token dan state. (2026-01-30)

## 1) Fondasi Data & API
- [x] Definisikan struktur menu Admin untuk semua public pages (Beranda, Tentang, Ibadah, Warta, Kegiatan, Kegiatan Detail, Pelayanan, Persembahan, Kontak, Album). (2026-01-30)
- [x] Tentukan model data dan validasi minimal untuk tiap halaman sesuai `_docs/admin-menu.md`. (2026-01-30)
- [x] Rancang kontrak API (public + admin) berdasarkan `_docs/admin-menu.md`. (2026-01-30)
- [x] Implementasi service layer FE untuk API (public + admin). (2026-01-30)
- [x] Siapkan caching sederhana per halaman (stale-while-revalidate jika memungkinkan). (2026-01-30)
- [x] Standarisasi error state (toast/banner + retry) dan loading state per halaman. (2026-01-30)
- [x] Pastikan fallback saat data kosong (empty state yang jelas). (2026-01-30)

## 2) UX Admin Global
- [x] Layout Admin konsisten (sidebar, header, breadcrumbs jika perlu). (2026-01-30)
- [x] Tombol Simpan/Cancel konsisten di semua form. (2026-01-30)
- [x] Validasi form client-side (required, format, batas karakter/angka). (2026-01-30)
- [x] Tampilkan status sukses/gagal setelah simpan. (2026-01-30)
- [x] Konfirmasi sebelum menghapus data. (2026-01-30)

## 3) Beranda (Home)
Data sesuai `_docs/admin-menu.md`:
- hero: judul, deskripsi, CTA ke Ibadah/Warta
- ringkasan jadwal: 3 kartu (hari, nama ibadah, jam, lokasi)
- highlight tema minggu ini: judul tema, tanggal/jam, ayat, pelayan firman, lokasi
- blok ibadah online: placeholder embed + CTA cepat
- akses cepat ke halaman publik lainnya

Checklist:
- [x] Model data Home lengkap. (2026-01-30)
- [x] Form Admin: hero (judul/deskripsi/CTA), 3 kartu jadwal (add/remove), highlight tema, blok online, quick links. (2026-01-30)
- [x] Validasi: maksimal 3 kartu ringkasan jadwal, CTA wajib url + label. (2026-01-30)
- [x] Integrasi GET/PUT `/admin/home`. (2026-01-30)
- [x] Halaman public Home membaca dari `GET /public/home`. (2026-01-30)

## 4) Tentang Jemaat
Data sesuai `_docs/admin-menu.md`:
- ringkasan profil jemaat
- sejarah singkat, tahun berdiri, wilayah pelayanan, catatan
- visi, misi (list)
- struktur pelayan

Checklist:
- [x] Model data Tentang lengkap. (2026-01-30)
- [x] Form Admin: profil, sejarah (text + tahun + wilayah + catatan), visi, misi (list add/remove), struktur pelayan (list role+nama). (2026-01-30)
- [x] Validasi: tahun berdiri numeric, list minimal 1 misi. (2026-01-30)
- [x] Integrasi GET/PUT `/admin/about`. (2026-01-30)
- [x] Halaman public Tentang membaca dari `GET /public/about`. (2026-01-30)

## 5) Ibadah
Data sesuai `_docs/admin-menu.md`:
- jadwal ibadah (kartu: hari, nama ibadah, jam, lokasi)
- tata ibadah (tautan ke warta)
- ibadah online (status live, placeholder embed, tombol channel)
- tema minggu ini (judul, ayat, pelayan firman)

Checklist:
- [x] Model data Ibadah lengkap. (2026-01-30)
- [x] Form Admin: jadwal ibadah (list), link warta, online (isLive, embed url, channel url), tema minggu ini. (2026-01-30)
- [x] Validasi: link warta harus URL, jadwal minimal 1 item. (2026-01-30)
- [x] Integrasi GET/PUT `/admin/worship`. (2026-01-30)
- [x] Halaman public Ibadah membaca dari `GET /public/worship`. (2026-01-30)

## 6) Warta Jemaat
Data sesuai `_docs/admin-menu.md`:
- warta mingguan: tanggal, tema, preview PDF (placeholder), aksi unduh/buka/cetak
- daftar warta terbaru
- tema minggu ini + ringkasan
- arsip warta per bulan

Checklist:
- [x] Model data Warta lengkap. (2026-01-30)
- [x] Form Admin untuk warta mingguan (tanggal, tema, pdfUrl). (2026-01-30)
- [x] Form Admin untuk list warta terbaru (CRUD item: tanggal, tema, pdfUrl). (2026-01-30)
- [x] Form Admin tema minggu ini + ringkasan. (2026-01-30)
- [x] Form Admin arsip per bulan (list bulan). (2026-01-30)
- [x] Integrasi CRUD `/admin/bulletins`. (2026-01-30)
- [x] Halaman public Warta membaca dari `GET /public/bulletins`. (2026-01-30)

## 7) Kegiatan Jemaat
Data sesuai `_docs/admin-menu.md`:
- filter (bulan, kategori, pencarian) — hanya UI
- kegiatan terdekat (list kartu + CTA detail/daftar)
- kalender bulanan (list ringkas)
- arsip kegiatan (list bulan)
- CTA ke kontak admin

Checklist:
- [x] Model data Kegiatan lengkap. (2026-01-30)
- [x] Form Admin untuk daftar kegiatan (title, category, dateLabel, timeLabel, location, status, CTA). (2026-01-30)
- [x] Form Admin untuk kalender bulanan (dateLabel, title, timeLabel). (2026-01-30)
- [x] Form Admin arsip bulan. (2026-01-30)
- [x] Form Admin CTA kontak (label + url). (2026-01-30)
- [x] Integrasi CRUD `/admin/activities`. (2026-01-30)
- [x] Halaman public Kegiatan membaca dari `GET /public/activities`. (2026-01-30)

## 8) Kegiatan Detail
Data sesuai `_docs/admin-menu.md`:
- ActivityDetail: id, title, category, dateLabel, timeLabel, location, status, summary, highlights[], agenda[], contactName, contactPhone

Checklist:
- [x] Pastikan model ActivityDetail sesuai interface TS. (2026-01-30)
- [x] Form Admin detail kegiatan (semua field + list highlights + list agenda). (2026-01-30)
- [x] Integrasi GET/PUT `/admin/activities/{id}`. (2026-01-30)
- [x] Halaman public Kegiatan Detail membaca dari `GET /public/activities/{id}`. (2026-01-30)
- [x] Empty state “kegiatan tidak ditemukan” tetap muncul bila 404. (2026-01-30)

## 9) Pelayanan Jemaat
Data sesuai `_docs/admin-menu.md`:
- kategorial (label, nama, deskripsi, jadwal)
- fungsional (label, nama, deskripsi)
- CTA ke kontak/kegiatan

Checklist:
- [x] Model data Pelayanan lengkap. (2026-01-30)
- [x] Form Admin untuk list kategorial (CRUD item). (2026-01-30)
- [x] Form Admin untuk list fungsional (CRUD item). (2026-01-30)
- [x] Form Admin CTA. (2026-01-30)
- [x] Integrasi GET/PUT `/admin/ministry`. (2026-01-30)
- [x] Halaman public Pelayanan membaca dari `GET /public/ministry`. (2026-01-30)

## 10) Persembahan
Data sesuai `_docs/admin-menu.md`:
- metode persembahan (transfer bank, QRIS, onsite)
- panduan singkat (list)
- form konfirmasi (UI statis, belum submit)
- blok transparansi (opsional) dengan aksi unduh/arsip

Checklist:
- [x] Model data Persembahan lengkap. (2026-01-30)
- [x] Form Admin untuk metode persembahan (list per metode + detail). (2026-01-30)
- [x] Form Admin untuk panduan singkat (list). (2026-01-30)
- [x] Toggle aktif/nonaktif form konfirmasi. (2026-01-30)
- [x] Toggle aktif/nonaktif blok transparansi + list file. (2026-01-30)
- [x] Integrasi GET/PUT `/admin/offerings`. (2026-01-30)
- [x] Halaman public Persembahan membaca dari `GET /public/offerings`. (2026-01-30)

## 11) Kontak
Data sesuai `_docs/admin-menu.md`:
- alamat, patokan
- kontak kantor
- embed peta (placeholder) + CTA WhatsApp/Maps
- jam layanan (list)
- layanan pastoral (opsional) + CTA form

Checklist:
- [x] Model data Kontak lengkap. (2026-01-30)
- [x] Form Admin untuk alamat/patokan + kontak kantor. (2026-01-30)
- [x] Form Admin untuk peta (embedUrl + mapUrl) + CTA WhatsApp/Maps. (2026-01-30)
- [x] Form Admin untuk jam layanan (list). (2026-01-30)
- [x] Toggle layanan pastoral + CTA label/url. (2026-01-30)
- [x] Integrasi GET/PUT `/admin/contact`. (2026-01-30)
- [x] Halaman public Kontak membaca dari `GET /public/contact`. (2026-01-30)

## 12) Album
Data sesuai `_docs/admin-menu.md`:
- tags
- selectedTag (default)
- photos: title, count, tag

Checklist:
- [x] Model data Album lengkap. (2026-01-30)
- [x] Form Admin untuk CRUD tag. (2026-01-30)
- [x] Form Admin untuk CRUD album (title, count, tag). (2026-01-30)
- [x] Validasi: selectedTag harus ada di tags. (2026-01-30)
- [x] Integrasi CRUD `/admin/albums`. (2026-01-30)
- [x] Halaman public Album membaca dari `GET /public/albums`. (2026-01-30)

## 13) Pengujian & Kesiapan Rilis
- [ ] Tes manual setiap halaman public setelah data admin diisi.
- [ ] Pastikan semua form Admin bisa create/update/delete tanpa error.
- [ ] Pastikan empty state tampil rapi ketika data belum ada.
- [ ] Pastikan UX loading/error konsisten di semua halaman.
- [ ] Dokumentasikan cara input data awal (seed) untuk admin.
