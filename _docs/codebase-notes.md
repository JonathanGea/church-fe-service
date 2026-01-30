# Catatan Codebase

Dokumen ini merangkum hal-hal yang saya pelajari dari codebase saat ini.

## Ringkasan Arsitektur
- Aplikasi frontend berbasis Angular dengan pendekatan standalone component (tanpa NgModule).
- Routing utama di `src/app/app.routes.ts` dengan tiga layout: public, auth, dan admin.
- Styling memakai Tailwind CSS v4 lewat `@import "tailwindcss"` di `src/styles.css` dan token warna/typography lewat `@theme`.

## Struktur Folder Utama
- `src/app/public/`: Halaman publik (home, album, ibadah, kegiatan, warta, kontak, pelayanan, persembahan, tentang).
- `src/app/admin/`: Area admin (saat ini hanya analytics page).
- `src/app/auth/`: Halaman login dan register admin.
- `src/app/layouts/`: Tiga layout (public, auth, admin) untuk membungkus halaman.
- `src/app/core/`: Shared core (guards, services, models, tokens).
- `src/app/shared/`: Shared UI components dan directives.

## Routing dan Layout
- Public routes berada di `src/app/public.routes.ts` dan dilayani oleh `PublicLayoutComponent`.
- Login dan register admin ada di `/admin/login` dan `/admin/register` dengan `AuthLayoutComponent`.
- Area admin di `/admin` menggunakan `AdminLayoutComponent`, dijaga `adminGuard` dan `adminChildGuard`.
- Route `**` mengarah balik ke root.

## Auth dan Guard
- `AuthService` mengelola login/logout, menyimpan token dan user ke `localStorage`.
  - Key penyimpanan: `fe_service_access_token` dan `fe_service_user`.
- `adminGuard` memeriksa autentikasi dan role `ADMIN`, jika gagal redirect ke `/admin/login`.
- Base URL API disuplai lewat `API_BASE_URL` dari `environment.apiBaseUrl`.

## UI dan Komponen Bersama
- Public layout menampilkan `PublicHeaderComponent` dan `PublicFooterComponent`.
- Admin layout menggunakan `AdminNavbarComponent`, `AdminSidebarComponent`, dan `OverlayBackdropComponent`.
- Ada directive `ClickOutsideDirective` untuk menangani klik di luar elemen (menu dropdown, dsb).

## Gaya dan Token Visual
- Token warna dan font didefinisikan di `src/styles.css` lewat `@theme`.
- Token brand BNKP (navy, gold, slate, dll) disediakan dan dipakai di UI publik.
- Ada helper background `paper-grain` dan `nias-motif` untuk tekstur.

## Hal yang Perlu Diingat
- Semua komponen menggunakan `standalone: true` dan `imports` di decorator.
- Admin layout mengatur state UI seperti sidebar collapse, configurator panel, dan navbar fixed.
- Scroll restoration diaktifkan pada router dengan `scrollPositionRestoration: 'top'`.
