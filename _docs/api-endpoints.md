# Backend API Requirements

Dokumen ini merangkum kebutuhan endpoint backend berdasarkan fitur yang ada di UI saat ini.
Semua response mengikuti format `BaseResponse<T>`:

```json
{
  "isSuccess": true,
  "errors": null,
  "data": {},
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

## Auth

### POST /auth/login
Request
```json
{
  "username": "jane.doe",
  "password": "secret"
}
```
Response `BaseResponse<AuthPayload>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "accessToken": "token",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "user": {
      "id": "user-1",
      "name": "Jane Doe",
      "roles": ["ADMIN"]
    }
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### POST /auth/logout
Request
```json
{}
```
Response `BaseResponse<{}>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {},
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

## Public Content

### GET /public/about
Response `BaseResponse<AboutContent>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "churchName": "BNKP Jemaat ...",
    "tagline": "Tagline jemaat",
    "history": "Ringkasan sejarah",
    "vision": "Gereja yang memuridkan dan melayani.",
    "mission": [
      "Penguatan iman dan persekutuan",
      "Pelayanan kasih dan kesaksian",
      "Pembinaan jemaat lintas generasi"
    ],
    "leaders": [
      { "role": "Pendeta", "name": "Pdt. Nama" },
      { "role": "Majelis", "name": "Nama-nama" }
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/worship/schedule
Response `BaseResponse<WorshipSchedule>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "weekly": [
      {
        "day": "Minggu",
        "title": "Ibadah Raya",
        "time": "08.00 & 10.30",
        "location": "Onsite & Online"
      },
      {
        "day": "Rabu",
        "title": "Doa Bersama",
        "time": "19.00",
        "location": "Ruang Utama"
      }
    ],
    "categories": [
      {
        "label": "Kategorial",
        "title": "Pemuda / Kaum Ibu",
        "note": "Sesuai pengumuman"
      }
    ],
    "liturgyPdfUrl": "https://.../tata-ibadah.pdf"
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/worship/online
Response `BaseResponse<OnlineWorship>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "isLive": true,
    "streamUrl": "https://youtube.com/...",
    "channelUrl": "https://youtube.com/...",
    "theme": {
      "title": "Kasih yang Mengubah Hidup",
      "verse": "Yohanes 3:16",
      "preacher": "Pdt. Nama"
    }
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/bulletins
Query params: `page`, `limit`
Response `BaseResponse<BulletinList>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "current": {
      "title": "Warta Minggu 28 Jan 2026",
      "theme": "Kasih yang Mengubah Hidup",
      "pdfUrl": "https://.../warta-2026-01-28.pdf"
    },
    "items": [
      {
        "id": "warta-2026-01-28",
        "title": "Warta Minggu 28 Jan 2026",
        "theme": "Kasih yang Mengubah Hidup",
        "pdfUrl": "https://.../warta-2026-01-28.pdf"
      }
    ],
    "archives": [
      { "month": "Januari 2026", "count": 4 },
      { "month": "Desember 2025", "count": 5 }
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/activities
Query params: `month`, `category`, `q`
Response `BaseResponse<ActivityList>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "upcoming": [
      {
        "id": "katekisasi-batch-1",
        "title": "Kelas Katekisasi (Batch 1)",
        "category": "Kategorial",
        "date": "2026-01-27",
        "time": "16.00",
        "location": "Ruang Kelas",
        "status": "Terbuka"
      }
    ],
    "calendar": [
      {
        "date": "2026-01-28",
        "title": "Ibadah Raya",
        "time": "08.00 & 10.30"
      }
    ],
    "archives": [
      { "month": "Desember 2025" },
      { "month": "November 2025" }
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/activities/{id}
Response `BaseResponse<ActivityDetail>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "id": "katekisasi-batch-1",
    "title": "Kelas Katekisasi (Batch 1)",
    "category": "Kategorial",
    "dateLabel": "Sabtu, 27 Jan 2026",
    "timeLabel": "16.00 - 18.00",
    "location": "Ruang Kelas Utama",
    "status": "Terbuka",
    "summary": "Pembinaan iman untuk calon sidi/katekisasi.",
    "highlights": ["Materi dasar iman", "Sesi tanya jawab"],
    "agenda": ["16.00 - Registrasi", "16.20 - Materi"],
    "contactName": "Admin Katekisasi",
    "contactPhone": "+62 0 0000 0000"
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/ministry
Response `BaseResponse<MinistryContent>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "kategorial": [
      { "name": "Sekolah Minggu", "schedule": "Minggu - 08.00" },
      { "name": "Remaja", "schedule": "Sabtu - 17.00" }
    ],
    "fungsional": [
      { "name": "Diakonia", "description": "Pelayanan kasih" },
      { "name": "Multimedia", "description": "Live streaming" }
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/offerings
Response `BaseResponse<OfferingInfo>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "bankAccounts": [
      { "bank": "BCA", "number": "1234567890", "name": "BNKP Jemaat ..." }
    ],
    "qrisImageUrl": "https://.../qris.png",
    "notes": [
      "Tulis keterangan persembahan",
      "Gunakan nama lengkap"
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### POST /public/offerings/confirm
Request
```json
{
  "fullName": "Nama",
  "date": "2026-01-28",
  "amount": 100000,
  "method": "TRANSFER",
  "category": "PERSEMBAHAN",
  "note": "Catatan"
}
```
Response `BaseResponse<{}>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {},
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/contact
Response `BaseResponse<ContactInfo>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "address": "Jl. Contoh No. 10, Kota",
    "phone": "+62 0 0000 0000",
    "email": "info@bnkpjemaat.org",
    "whatsapp": "+62 0 0000 0000",
    "mapUrl": "https://maps.google.com/...",
    "officeHours": [
      { "day": "Senin-Jumat", "time": "09.00-17.00" },
      { "day": "Sabtu", "time": "09.00-13.00" },
      { "day": "Minggu", "time": "06.30-12.00" }
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/albums
Query params: `tag`
Response `BaseResponse<AlbumList>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "tags": ["Ibadah", "Kegiatan", "Pelayanan", "Pelatihan"],
    "items": [
      {
        "id": "album-ibadah-2026-01-28",
        "title": "Ibadah Minggu",
        "tag": "Ibadah",
        "photoCount": 24,
        "coverUrl": "https://.../cover.jpg"
      }
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/albums/{id}
Response `BaseResponse<AlbumDetail>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "id": "album-ibadah-2026-01-28",
    "title": "Ibadah Minggu",
    "tag": "Ibadah",
    "photoCount": 24,
    "photos": [
      { "url": "https://.../photo-1.jpg", "caption": "" },
      { "url": "https://.../photo-2.jpg", "caption": "" }
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```
