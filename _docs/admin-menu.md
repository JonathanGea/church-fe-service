# Admin Menu Requirements (Public Pages Only)

Dokumen ini disusun berdasarkan kode halaman public di `src/app/public/**`.
Hanya mencatat fitur dan data yang benar-benar dipakai/dirender di template atau TS.
Jika halaman masih statis (hardcoded), maka tidak ada data dinamis yang dibutuhkan.

## 1) Beranda (Home)
Lokasi kode: `src/app/public/home/home.html`
- Fitur:
  - Hero dengan judul, deskripsi, dan CTA ke Ibadah/Warta.
  - Ringkasan jadwal (3 kartu).
  - Highlight tema minggu ini (judul tema, tanggal/jam, ayat, pelayan firman, lokasi).
  - Blok ibadah online (placeholder embed) dan CTA cepat.
  - Akses cepat ke halaman publik lainnya.
- Data:
  - Tidak ada binding data; seluruh konten saat ini hardcoded di HTML.

## 2) Tentang Jemaat
Lokasi kode: `src/app/public/tentang/tentang.html`
- Fitur:
  - Ringkasan profil jemaat.
  - Sejarah singkat, tahun berdiri, wilayah pelayanan, catatan.
  - Visi, misi (list), dan struktur pelayan.
- Data:
  - Tidak ada binding data; seluruh konten saat ini hardcoded di HTML.

## 3) Ibadah
Lokasi kode: `src/app/public/ibadah/ibadah.html`
- Fitur:
  - Jadwal ibadah (kartu-kartu: hari, nama ibadah, jam, lokasi).
  - Tata ibadah (tautan ke warta).
  - Ibadah online (status live, placeholder embed, tombol channel).
  - Tema minggu ini (judul, ayat, pelayan firman).
- Data:
  - Tidak ada binding data; seluruh konten saat ini hardcoded di HTML.

## 4) Warta Jemaat
Lokasi kode: `src/app/public/warta/warta.html`
- Fitur:
  - Warta mingguan: tanggal, tema, preview PDF (placeholder), aksi unduh/buka/cetak.
  - Daftar warta terbaru.
  - Tema minggu ini + ringkasan.
  - Arsip warta per bulan (list).
- Data:
  - Tidak ada binding data; seluruh konten saat ini hardcoded di HTML.

## 5) Kegiatan Jemaat
Lokasi kode: `src/app/public/kegiatan/kegiatan.html`
- Fitur:
  - Filter (bulan, kategori, pencarian) — hanya UI, belum terhubung data.
  - Kegiatan terdekat (list kartu kegiatan + CTA detail/daftar).
  - Kalender bulanan (list ringkas).
  - Arsip kegiatan (list bulan).
  - CTA ke kontak admin.
- Data:
  - Tidak ada binding data; seluruh konten saat ini hardcoded di HTML.

## 6) Kegiatan Detail
Lokasi kode: `src/app/public/kegiatan-detail/kegiatan-detail.html` dan `.ts`
- Fitur:
  - Menampilkan detail kegiatan berdasarkan route param `id`.
  - Menampilkan agenda (list) dan highlight (list).
  - Menampilkan kontak penanggung jawab.
  - State “kegiatan tidak ditemukan”.
- Data (sesuai interface di TS):
  - ActivityDetail:
    - id: string
    - title: string
    - category: string
    - dateLabel: string
    - timeLabel: string
    - location: string
    - status: string
    - summary: string
    - highlights: string[]
    - agenda: string[]
    - contactName: string
    - contactPhone: string

## 7) Pelayanan Jemaat
Lokasi kode: `src/app/public/pelayanan/pelayanan.html`
- Fitur:
  - Daftar pelayanan kategorial (nama, deskripsi, jadwal).
  - Daftar pelayanan fungsional (label, nama, deskripsi).
  - CTA menuju kontak/kegiatan.
- Data:
  - Tidak ada binding data; seluruh konten saat ini hardcoded di HTML.

## 8) Persembahan
Lokasi kode: `src/app/public/persembahan/persembahan.html`
- Fitur:
  - Informasi metode persembahan (transfer bank, QRIS, onsite).
  - Panduan singkat (list).
  - Form konfirmasi persembahan (UI statis, belum submit).
  - Blok “Transparansi” (opsional) dengan aksi unduh/arsip.
- Data:
  - Tidak ada binding data; seluruh konten saat ini hardcoded di HTML.

## 9) Kontak
Lokasi kode: `src/app/public/kontak/kontak.html`
- Fitur:
  - Alamat, patokan, kontak kantor.
  - Embed peta (placeholder) + CTA WhatsApp/Maps.
  - Jam layanan (list).
  - Layanan pastoral (opsional) + CTA form.
- Data:
  - Tidak ada binding data; seluruh konten saat ini hardcoded di HTML.

## 10) Album
Lokasi kode: `src/app/public/album/album.html` dan `.ts`
- Fitur:
  - Filter tag album (pill buttons).
  - Grid album berdasarkan tag terpilih.
  - Label “Baru” untuk tag tertentu.
- Data (sesuai TS):
  - tags: string[]
  - selectedTag: string
  - photos: { title: string; count: number; tag: string }[]
