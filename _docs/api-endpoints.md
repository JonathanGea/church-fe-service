# Backend API Requirements

Dokumen ini merangkum kebutuhan endpoint backend berdasarkan fitur yang ada di UI saat ini.
Sumber kebenaran kebutuhan data: `_docs/admin-menu.md`.
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

### GET /public/home
Response `BaseResponse<HomeContent>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "hero": {
      "title": "Selamat Datang di BNKP Jemaat ...",
      "description": "Ringkasan singkat",
      "ctaPrimary": { "label": "Lihat Ibadah", "url": "/ibadah" },
      "ctaSecondary": { "label": "Baca Warta", "url": "/warta" }
    },
    "scheduleSummary": [
      { "day": "Minggu", "title": "Ibadah Raya", "time": "08.00", "location": "Gereja" }
    ],
    "weeklyTheme": {
      "title": "Kasih yang Mengubah Hidup",
      "dateLabel": "Minggu, 28 Jan 2026",
      "verse": "Yohanes 3:16",
      "preacher": "Pdt. Nama",
      "location": "Gereja"
    },
    "onlineWorship": {
      "isLive": true,
      "embedUrl": "https://youtube.com/embed/...",
      "streamUrl": "https://youtube.com/...",
      "channelUrl": "https://youtube.com/..."
    },
    "quickLinks": [
      { "label": "Warta Jemaat", "url": "/warta" }
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/about
Response `BaseResponse<AboutContent>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "profileSummary": "Ringkasan profil jemaat",
    "history": {
      "summary": "Sejarah singkat",
      "establishedYear": 1980,
      "serviceArea": "Wilayah pelayanan",
      "notes": "Catatan tambahan"
    },
    "vision": "Visi jemaat",
    "missions": [
      "Misi 1",
      "Misi 2"
    ],
    "leaders": [
      { "role": "Pendeta", "name": "Pdt. Nama" },
      { "role": "Majelis", "name": "Nama-nama" }
    ]
  },
  "timestamp": "2026-01-28T10:20:30.000Z"
}
```

### GET /public/worship
Response `BaseResponse<WorshipContent>`
```json
{
  "isSuccess": true,
  "errors": null,
  "data": {
    "schedule": [
      {
        "day": "Minggu",
        "title": "Ibadah Raya",
        "time": "08.00 & 10.30",
        "location": "Onsite & Online"
      }
    ],
    "liturgy": {
      "wartaUrl": "https://.../tata-ibadah.pdf"
    },
    "online": {
      "isLive": true,
      "embedUrl": "https://youtube.com/embed/...",
      "streamUrl": "https://youtube.com/...",
      "channelUrl": "https://youtube.com/..."
    },
    "weeklyTheme": {
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
    "weekly": {
      "dateLabel": "Minggu, 28 Jan 2026",
      "theme": "Kasih yang Mengubah Hidup",
      "pdfUrl": "https://.../warta-2026-01-28.pdf"
    },
    "latest": [
      {
        "id": "warta-2026-01-28",
        "dateLabel": "Minggu, 28 Jan 2026",
        "theme": "Kasih yang Mengubah Hidup",
        "pdfUrl": "https://.../warta-2026-01-28.pdf"
      }
    ],
    "weeklyTheme": {
      "title": "Kasih yang Mengubah Hidup",
      "summary": "Ringkasan tema minggu ini"
    },
    "archives": [
      { "month": "Januari 2026" },
      { "month": "Desember 2025" }
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
    "filters": {
      "months": ["Januari 2026", "Februari 2026"],
      "categories": ["Kategorial", "Umum"]
    },
    "upcoming": [
      {
        "id": "katekisasi-batch-1",
        "title": "Kelas Katekisasi (Batch 1)",
        "category": "Kategorial",
        "dateLabel": "Sabtu, 27 Jan 2026",
        "timeLabel": "16.00",
        "location": "Ruang Kelas",
        "status": "Terbuka"
      }
    ],
    "calendar": [
      {
        "dateLabel": "Minggu, 28 Jan 2026",
        "title": "Ibadah Raya",
        "timeLabel": "08.00 & 10.30"
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
      { "name": "Sekolah Minggu", "description": "Deskripsi singkat", "schedule": "Minggu - 08.00" },
      { "name": "Remaja", "description": "Deskripsi singkat", "schedule": "Sabtu - 17.00" }
    ],
    "fungsional": [
      { "label": "Bidang", "name": "Diakonia", "description": "Pelayanan kasih" },
      { "label": "Bidang", "name": "Multimedia", "description": "Live streaming" }
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
    "methods": [
      {
        "type": "TRANSFER",
        "title": "Transfer Bank",
        "details": [
          { "label": "BCA", "value": "1234567890 a.n. BNKP Jemaat ..." }
        ]
      },
      {
        "type": "QRIS",
        "title": "QRIS",
        "details": [
          { "label": "QR Code", "value": "https://.../qris.png" }
        ]
      },
      {
        "type": "ONSITE",
        "title": "Onsite",
        "details": [
          { "label": "Lokasi", "value": "Kotak Persembahan" }
        ]
      }
    ],
    "guide": [
      "Tulis keterangan persembahan",
      "Gunakan nama lengkap"
    ],
    "confirmationForm": {
      "isEnabled": true
    },
    "transparency": {
      "isEnabled": false,
      "items": [
        { "label": "Laporan 2025", "url": "https://.../laporan-2025.pdf" }
      ]
    }
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
    "landmark": "Patokan dekat ...",
    "officeContacts": {
      "phone": "+62 0 0000 0000",
      "email": "info@bnkpjemaat.org",
      "whatsapp": "+62 0 0000 0000"
    },
    "map": {
      "embedUrl": "https://maps.google.com/...",
      "mapUrl": "https://maps.google.com/..."
    },
    "officeHours": [
      { "label": "Senin-Jumat", "time": "09.00-17.00" },
      { "label": "Sabtu", "time": "09.00-13.00" },
      { "label": "Minggu", "time": "06.30-12.00" }
    ],
    "pastoralService": {
      "isEnabled": true,
      "ctaLabel": "Ajukan Konseling",
      "ctaUrl": "/kontak"
    }
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
    "selectedTag": "Ibadah",
    "photos": [
      {
        "title": "Ibadah Minggu",
        "count": 24,
        "tag": "Ibadah"
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

## Admin Content (Protected)

### GET /admin/home
Response `BaseResponse<HomeContent>`

### PUT /admin/home
Request `HomeContent`
Response `BaseResponse<HomeContent>`

### GET /admin/about
Response `BaseResponse<AboutContent>`

### PUT /admin/about
Request `AboutContent`
Response `BaseResponse<AboutContent>`

### GET /admin/worship
Response `BaseResponse<WorshipContent>`

### PUT /admin/worship
Request `WorshipContent`
Response `BaseResponse<WorshipContent>`

### GET /admin/bulletins
Query params: `page`, `limit`
Response `BaseResponse<BulletinList>`

### POST /admin/bulletins
Request `BulletinPayload` (weekly warta item)
Response `BaseResponse<BulletinItem>`

### PUT /admin/bulletins/{id}
Request `BulletinPayload`
Response `BaseResponse<BulletinItem>`

### DELETE /admin/bulletins/{id}
Response `BaseResponse<{}>`

### GET /admin/activities
Query params: `month`, `category`, `q`
Response `BaseResponse<ActivityList>`

### POST /admin/activities
Request `ActivityPayload`
Response `BaseResponse<ActivityItem>`

### GET /admin/activities/{id}
Response `BaseResponse<ActivityDetail>`

### PUT /admin/activities/{id}
Request `ActivityPayload`
Response `BaseResponse<ActivityDetail>`

### DELETE /admin/activities/{id}
Response `BaseResponse<{}>`

### GET /admin/ministry
Response `BaseResponse<MinistryContent>`

### PUT /admin/ministry
Request `MinistryContent`
Response `BaseResponse<MinistryContent>`

### GET /admin/offerings
Response `BaseResponse<OfferingInfo>`

### PUT /admin/offerings
Request `OfferingInfo`
Response `BaseResponse<OfferingInfo>`

### GET /admin/contact
Response `BaseResponse<ContactInfo>`

### PUT /admin/contact
Request `ContactInfo`
Response `BaseResponse<ContactInfo>`

### GET /admin/albums
Query params: `tag`
Response `BaseResponse<AlbumList>`

### POST /admin/albums
Request `AlbumPayload`
Response `BaseResponse<AlbumItem>`

### GET /admin/albums/{id}
Response `BaseResponse<AlbumDetail>`

### PUT /admin/albums/{id}
Request `AlbumPayload`
Response `BaseResponse<AlbumDetail>`

### DELETE /admin/albums/{id}
Response `BaseResponse<{}>`

### POST /admin/albums/{id}/photos
Request `AlbumPhotoPayload`
Response `BaseResponse<AlbumDetail>`

### DELETE /admin/albums/{id}/photos/{photoId}
Response `BaseResponse<{}>`
