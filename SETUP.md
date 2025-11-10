# 🚀 Supabase + Prisma + Next.js Setup Guide

Panduan lengkap untuk menghubungkan **Supabase (PostgreSQL)** dengan **Prisma ORM** di proyek **Next.js (TypeScript)**.  
Dokumentasi ini mencakup semua langkah dari setup database hingga testing API.

---

## 🧱 1. Setup Database di Supabase

1. Buka [https://supabase.com](https://supabase.com)
2. Login → **Create New Project**
3. Masukkan:
   - **Nama Project**
   - **Password Database**
   - Pilih **Region**
4. Tunggu hingga database siap.
5. Pergi ke menu **Project Settings → Database → Connection Info**
6. Salin **Connection String (URI)** untuk nanti digunakan di `.env`

Contoh format URI Supabase:

```bash
postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres
```

---

## ⚙️ 2. Setup Next.js Project

Buka terminal dan jalankan:

```bash
npx create-next-app@latest my-app
cd my-app
npm install
```

Cek apakah project berhasil dibuat:

```bash
npm run dev
```

---

## 📦 3. Install Prisma dan Client

```bash
npm install prisma @prisma/client
```

Inisialisasi Prisma:

```bash
npx prisma init
```

Ini akan membuat folder dan file berikut:

```
prisma/
  schema.prisma
.env
```

---

## 🔑 4. Konfigurasi Environment (.env)

Edit file `.env` dan ubah menjadi seperti ini:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres"
```

⚠️ **Ganti `[PASSWORD]` dan `[PROJECT_ID]` dengan data milikmu di Supabase.**

---

## 🧩 5. Buat Model Prisma ORM

Edit file `prisma/schema.prisma` menjadi seperti ini:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

## 🗃️ 6. Migrasi Model ke Supabase

Jalankan perintah berikut untuk membuat tabel di database Supabase:

```bash
npx prisma migrate dev --name init
```

Jika berhasil, kamu akan melihat tabel baru di:  
👉 **Supabase → Table Editor → User**

---

## 🔌 7. Setup Prisma Client di Next.js

Buat file `lib/prisma.ts` agar Prisma Client hanya dibuat sekali:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ["query"],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## 🧠 8. Buat API Route untuk Mengakses Database

Buat file baru `app/api/users/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	const users = await prisma.user.findMany();
	return NextResponse.json(users);
}

export async function POST(request: Request) {
	const body = await request.json();
	const user = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
		},
	});
	return NextResponse.json(user);
}
```

---

## ⚒️ 9. CRUD Lengkap (Create, Read, Update, Delete)

Buat file `app/api/users/[id]/route.ts` untuk operasi berdasarkan ID:

```typescript
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET by ID
export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const user = await prisma.user.findUnique({
		where: { id: Number(params.id) },
	});
	return NextResponse.json(user);
}

// UPDATE
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const body = await req.json();
	const user = await prisma.user.update({
		where: { id: Number(params.id) },
		data: {
			name: body.name,
			email: body.email,
		},
	});
	return NextResponse.json(user);
}

// DELETE
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await prisma.user.delete({
		where: { id: Number(params.id) },
	});
	return NextResponse.json({ message: "User deleted successfully" });
}
```

Sekarang kamu punya API lengkap untuk:

- `GET /api/users` → Ambil semua user
- `POST /api/users` → Tambah user
- `GET /api/users/:id` → Ambil user by ID
- `PUT /api/users/:id` → Update user
- `DELETE /api/users/:id` → Hapus user

---

## 🧭 10. Jalankan Server Next.js

```bash
npm run dev
```

Buka browser:

```
http://localhost:3000/api/users
```

Jika muncul `[]`, berarti koneksi berhasil 👏

---

## 🧾 11. Cek Data di Supabase

Buka **Supabase Dashboard → Table Editor → User**

Data hasil API POST akan otomatis muncul di sana.

---

## 💻 12. Gunakan Prisma Studio (Optional)

Untuk melihat data dengan UI Prisma:

```bash
npx prisma studio
```

Buka di browser:

```
http://localhost:5555
```

---

## 🧪 13. Testing API dengan Thunder Client / Postman

1. Jalankan server Next.js (`npm run dev`)
2. Buka Thunder Client atau Postman
3. Tes endpoint berikut:

| Method | Endpoint         | Keterangan       |
| ------ | ---------------- | ---------------- |
| GET    | `/api/users`     | Ambil semua data |
| POST   | `/api/users`     | Tambah user baru |
| GET    | `/api/users/:id` | Ambil user by ID |
| PUT    | `/api/users/:id` | Update user      |
| DELETE | `/api/users/:id` | Hapus user       |

Contoh JSON Body untuk POST:

```json
{
	"name": "Wildan Mukhaladun",
	"email": "wildan@example.com"
}
```

---

## 📂 14. Struktur Folder Rekomendasi

```
my-app/
│
├── app/
│   └── api/
│       └── users/
│           ├── route.ts
│           └── [id]/
│               └── route.ts
│
├── lib/
│   └── prisma.ts
│
├── prisma/
│   └── schema.prisma
│
├── .env
└── README.md
```

---

## 💡 Tips

- Gunakan TypeScript agar autocomplete Prisma lebih akurat
- Jangan commit file `.env` ke GitHub
- Aktifkan log query Prisma untuk debugging
- Gunakan Vercel Environment Variables jika nanti deploy

---

## 🧠 Stack yang Digunakan

| Tool       | Fungsi                            |
| ---------- | --------------------------------- |
| Supabase   | Database PostgreSQL               |
| Prisma     | ORM untuk database                |
| Next.js    | Framework fullstack               |
| TypeScript | Bahasa pemrograman yang aman tipe |
| Node.js    | Runtime server                    |

---

## ✍️ Author

**Wildan Mukhaladun**  
🧑‍💻 Information Systems Student | Frontend & Data Enthusiast  
📍 UIN Sumatera Utara  
💬 Stack: Supabase · Prisma ORM · Next.js · TypeScript  
📅 Last Updated: 2025
