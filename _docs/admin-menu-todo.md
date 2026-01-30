# Admin Menu TODO (Dev)
Scope tambahan: semua konten Admin membaca/menyimpan data melalui API (bukan hardcoded).
Sumber kebenaran kebutuhan data: `_docs/admin-menu.md`.
Urutan checklist = prioritas pengerjaan. Kerjakan dari atas ke bawah.

## 0) Akses & Keamanan
- [ ] Pastikan halaman Admin hanya bisa diakses user ber-role ADMIN (guard + route protection).
- [ ] Pastikan token admin tersimpan aman dan otomatis attach ke semua request admin.
- [ ] Tangani token expired (redirect login + pesan yang jelas).
- [ ] Pastikan logout membersihkan token dan state.

## 1) Fondasi Data & API
- [ ] Definisikan struktur menu Admin untuk semua public pages (Beranda, Tentang, Ibadah, Warta, Kegiatan, Kegiatan Detail, Pelayanan, Persembahan, Kontak, Album).
- [ ] Tentukan model data dan validasi minimal untuk tiap halaman sesuai `_docs/admin-menu.md`.
- [ ] Rancang kontrak API (public + admin) berdasarkan `_docs/admin-menu.md`.
- [ ] Implementasi service layer FE untuk API (public + admin).
- [ ] Siapkan caching sederhana per halaman (stale-while-revalidate jika memungkinkan).
- [ ] Standarisasi error state (toast/banner + retry) dan loading state per halaman.
- [ ] Pastikan fallback saat data kosong (empty state yang jelas).

## 2) UX Admin Global
- [ ] Layout Admin konsisten (sidebar, header, breadcrumbs jika perlu).
- [ ] Tombol Simpan/Cancel konsisten di semua form.
- [ ] Validasi form client-side (required, format, batas karakter/angka).
- [ ] Tampilkan status sukses/gagal setelah simpan.
- [ ] Konfirmasi sebelum menghapus data.

## 3) Beranda (Home)
Data sesuai `_docs/admin-menu.md`:
- hero: judul, deskripsi, CTA ke Ibadah/Warta
- ringkasan jadwal: 3 kartu (hari, nama ibadah, jam, lokasi)
- highlight tema minggu ini: judul tema, tanggal/jam, ayat, pelayan firman, lokasi
- blok ibadah online: placeholder embed + CTA cepat
- akses cepat ke halaman publik lainnya

Checklist:
- [ ] Model data Home lengkap.
- [ ] Form Admin: hero (judul/deskripsi/CTA), 3 kartu jadwal (add/remove), highlight tema, blok online, quick links.
- [ ] Validasi: maksimal 3 kartu ringkasan jadwal, CTA wajib url + label.
- [ ] Integrasi GET/PUT `/admin/home`.
- [ ] Halaman public Home membaca dari `GET /public/home`.

## 4) Tentang Jemaat
Data sesuai `_docs/admin-menu.md`:
- ringkasan profil jemaat
- sejarah singkat, tahun berdiri, wilayah pelayanan, catatan
- visi, misi (list)
- struktur pelayan

Checklist:
- [ ] Model data Tentang lengkap.
- [ ] Form Admin: profil, sejarah (text + tahun + wilayah + catatan), visi, misi (list add/remove), struktur pelayan (list role+nama).
- [ ] Validasi: tahun berdiri numeric, list minimal 1 misi.
- [ ] Integrasi GET/PUT `/admin/about`.
- [ ] Halaman public Tentang membaca dari `GET /public/about`.

## 5) Ibadah
Data sesuai `_docs/admin-menu.md`:
- jadwal ibadah (kartu: hari, nama ibadah, jam, lokasi)
- tata ibadah (tautan ke warta)
- ibadah online (status live, placeholder embed, tombol channel)
- tema minggu ini (judul, ayat, pelayan firman)

Checklist:
- [ ] Model data Ibadah lengkap.
- [ ] Form Admin: jadwal ibadah (list), link warta, online (isLive, embed url, channel url), tema minggu ini.
- [ ] Validasi: link warta harus URL, jadwal minimal 1 item.
- [ ] Integrasi GET/PUT `/admin/worship`.
- [ ] Halaman public Ibadah membaca dari `GET /public/worship`.

## 6) Warta Jemaat
Data sesuai `_docs/admin-menu.md`:
- warta mingguan: tanggal, tema, preview PDF (placeholder), aksi unduh/buka/cetak
- daftar warta terbaru
- tema minggu ini + ringkasan
- arsip warta per bulan

Checklist:
- [ ] Model data Warta lengkap.
- [ ] Form Admin untuk warta mingguan (tanggal, tema, pdfUrl).
- [ ] Form Admin untuk list warta terbaru (CRUD item: tanggal, tema, pdfUrl).
- [ ] Form Admin tema minggu ini + ringkasan.
- [ ] Form Admin arsip per bulan (list bulan).
- [ ] Integrasi CRUD `/admin/bulletins`.
- [ ] Halaman public Warta membaca dari `GET /public/bulletins`.

## 7) Kegiatan Jemaat
Data sesuai `_docs/admin-menu.md`:
- filter (bulan, kategori, pencarian) — hanya UI
- kegiatan terdekat (list kartu + CTA detail/daftar)
- kalender bulanan (list ringkas)
- arsip kegiatan (list bulan)
- CTA ke kontak admin

Checklist:
- [ ] Model data Kegiatan lengkap.
- [ ] Form Admin untuk daftar kegiatan (title, category, dateLabel, timeLabel, location, status, CTA).
- [ ] Form Admin untuk kalender bulanan (dateLabel, title, timeLabel).
- [ ] Form Admin arsip bulan.
- [ ] Form Admin CTA kontak (label + url).
- [ ] Integrasi CRUD `/admin/activities`.
- [ ] Halaman public Kegiatan membaca dari `GET /public/activities`.

## 8) Kegiatan Detail
Data sesuai `_docs/admin-menu.md`:
- ActivityDetail: id, title, category, dateLabel, timeLabel, location, status, summary, highlights[], agenda[], contactName, contactPhone

Checklist:
- [ ] Pastikan model ActivityDetail sesuai interface TS.
- [ ] Form Admin detail kegiatan (semua field + list highlights + list agenda).
- [ ] Integrasi GET/PUT `/admin/activities/{id}`.
- [ ] Halaman public Kegiatan Detail membaca dari `GET /public/activities/{id}`.
- [ ] Empty state “kegiatan tidak ditemukan” tetap muncul bila 404.

## 9) Pelayanan Jemaat
Data sesuai `_docs/admin-menu.md`:
- kategorial (nama, deskripsi, jadwal)
- fungsional (label, nama, deskripsi)
- CTA ke kontak/kegiatan

Checklist:
- [ ] Model data Pelayanan lengkap.
- [ ] Form Admin untuk list kategorial (CRUD item).
- [ ] Form Admin untuk list fungsional (CRUD item).
- [ ] Form Admin CTA.
- [ ] Integrasi GET/PUT `/admin/ministry`.
- [ ] Halaman public Pelayanan membaca dari `GET /public/ministry`.

## 10) Persembahan
Data sesuai `_docs/admin-menu.md`:
- metode persembahan (transfer bank, QRIS, onsite)
- panduan singkat (list)
- form konfirmasi (UI statis, belum submit)
- blok transparansi (opsional) dengan aksi unduh/arsip

Checklist:
- [ ] Model data Persembahan lengkap.
- [ ] Form Admin untuk metode persembahan (list per metode + detail).
- [ ] Form Admin untuk panduan singkat (list).
- [ ] Toggle aktif/nonaktif form konfirmasi.
- [ ] Toggle aktif/nonaktif blok transparansi + list file.
- [ ] Integrasi GET/PUT `/admin/offerings`.
- [ ] Halaman public Persembahan membaca dari `GET /public/offerings`.

## 11) Kontak
Data sesuai `_docs/admin-menu.md`:
- alamat, patokan
- kontak kantor
- embed peta (placeholder) + CTA WhatsApp/Maps
- jam layanan (list)
- layanan pastoral (opsional) + CTA form

Checklist:
- [ ] Model data Kontak lengkap.
- [ ] Form Admin untuk alamat/patokan + kontak kantor.
- [ ] Form Admin untuk peta (embedUrl + mapUrl) + CTA WhatsApp/Maps.
- [ ] Form Admin untuk jam layanan (list).
- [ ] Toggle layanan pastoral + CTA label/url.
- [ ] Integrasi GET/PUT `/admin/contact`.
- [ ] Halaman public Kontak membaca dari `GET /public/contact`.

## 12) Album
Data sesuai `_docs/admin-menu.md`:
- tags
- selectedTag (default)
- photos: title, count, tag

Checklist:
- [ ] Model data Album lengkap.
- [ ] Form Admin untuk CRUD tag.
- [ ] Form Admin untuk CRUD album (title, count, tag).
- [ ] Validasi: selectedTag harus ada di tags.
- [ ] Integrasi CRUD `/admin/albums`.
- [ ] Halaman public Album membaca dari `GET /public/albums`.

## 13) Pengujian & Kesiapan Rilis
- [ ] Tes manual setiap halaman public setelah data admin diisi.
- [ ] Pastikan semua form Admin bisa create/update/delete tanpa error.
- [ ] Pastikan empty state tampil rapi ketika data belum ada.
- [ ] Pastikan UX loading/error konsisten di semua halaman.
- [ ] Dokumentasikan cara input data awal (seed) untuk admin.
