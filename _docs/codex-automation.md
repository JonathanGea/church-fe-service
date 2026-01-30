# Cara Otomatis Lanjut Task di Codex CLI

Dokumen ini menjelaskan alur end-to-end agar Codex CLI selalu lanjut ke task berikutnya setelah task sebelumnya selesai.

## 1) Siapkan driver prompt
Buat file driver prompt (contoh sudah siap di bawah) agar Codex bekerja berurutan dari TODO teratas.

Buat file: `_docs/codex-driver.md`

```md
# Codex Driver

Tujuan: Selesaikan semua TODO secara berurutan.

Aturan:
1) Baca `_docs/admin-menu-todo.md`.
2) Kerjakan item TODO paling atas yang masih [ ].
3) Setelah selesai, update statusnya ke [x] + catatan tanggal.
4) Ulangi ke item berikutnya sampai semua selesai.
5) Jangan lompat ke task lain sebelum item sebelumnya selesai.
6) Jangan menambah dependency baru.
7) Ikuti @design_guide dan token admin.
```

## 2) Jalankan Codex dengan driver prompt
Di terminal:

```bash
codex "$(cat _docs/codex-driver.md)"
```

Codex akan membaca checklist, menyelesaikan item pertama yang belum selesai, update status, lalu lanjut ke item berikutnya.

## 3) Jika TODO punya sub-task/agent
Tambahkan aturan berikut di driver prompt agar Codex menyelesaikan sub-task secara urut:

```
4) Jika sebuah TODO punya sub-agent task, selesaikan semuanya dari atas ke bawah.
```

## 4) Jalankan berulang sampai selesai (opsional)
Jika ingin auto-loop sampai semua `[ ]` selesai, gunakan loop sederhana:

```bash
while true; do
  codex "$(cat _docs/codex-driver.md)"
  rg "\\[ \\]" _docs/admin-menu-todo.md || break
done
```

Catatan: Jika tidak ada `rg`, ganti dengan `grep`.

## 5) Pastikan urutan TODO jelas
Codex mengerjakan item [ ] teratas, jadi urutan checklist sangat menentukan. Rapikan urutan terlebih dahulu jika perlu.

---

Jika kamu mau, tambahkan juga file `README` singkat di root repo untuk mengingatkan tim tentang alur ini.
