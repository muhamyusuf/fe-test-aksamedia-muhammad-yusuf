# Frontend Developer Intern Test - Aksamedia

Link deployment [Check Here](https://fe-test-aksamedia-muhammad-yusuf.vercel.app)

## 🚀 Proyek: **Dashboard CRUD dengan Autentikasi dan Theming**

Proyek ini merupakan implementasi dari tes masuk magang **Frontend Developer** di **PT Aksamedia Mulia Digital**. Aplikasi ini dibuat menggunakan **Next.js** dengan **Tailwind CSS**, tanpa library UI tambahan.

---

## 🎯 **Fitur Utama**

### 🔐 **Autentikasi Tanpa API**

- Hanya memiliki fitur **login**, tidak ada fitur register.
- **User tetap login** meskipun halaman direfresh, menggunakan **cookie**.
- **Logout tersedia di dropdown** dalam navbar.
- **Proteksi halaman**, hanya pengguna yang login yang bisa mengakses halaman kecuali `/sign-in`.

### 📋 **CRUD Data dengan Local Storage**

- CRUD dilakukan tanpa API, menggunakan **Local Storage**.
- Data tetap tersimpan meskipun halaman direfresh.
- **Fitur pencarian (search/filter)** untuk mempermudah pencarian data.
- **Paginasi manual** tanpa library pihak ketiga.
- **State halaman dan filter tetap terjaga** saat refresh menggunakan **query string**.

### 🎨 **Dark Mode / Light Mode**

- **3 Mode Theme**: `Light`, `Dark`, `System (mengikuti OS)`.
- **Default** mengikuti tema OS.
- Jika sistem OS berubah, aplikasi secara otomatis akan menyesuaikan tema.

### 🏷️ **Edit Profil User**

- User dapat **mengedit nama profil** langsung dari halaman **Profile**.
- **Nama di navbar diperbarui secara otomatis** setelah diedit.
- Data tetap tersimpan meskipun halaman direfresh.

### 📱 **UI & UX yang Responsif**

- Dibangun dengan **Tailwind CSS**, **tanpa library UI** seperti Material UI atau Chakra UI.
- **Fully responsive**, dapat diakses dengan baik di **desktop, tablet, dan mobile**.

---

## 🏗 **Teknologi yang Digunakan**

| Teknologi         | Deskripsi                              |
| ----------------- | -------------------------------------- |
| **Next.js**       | Framework React untuk pengembangan web |
| **Tailwind CSS**  | Utility-first CSS framework            |
| **Local Storage** | Menyimpan data CRUD tanpa API          |
| **Cookies**       | Menyimpan status login user            |
| **Lucide Icons**  | Digunakan untuk ikon UI                |

---

## 📂 **Struktur Folder**

```
/src
 ├── app
 │   ├── layout.tsx           # Layout utama aplikasi
 │   ├── middleware.ts        # Middleware untuk proteksi halaman
 │   ├── page.tsx             # Halaman utama dashboard dengan CRUD
 │   ├── profile/page.tsx     # Halaman edit profil user
 │   ├── sign-in/page.tsx     # Halaman login
 │
 ├── components
 │   ├── navbar.tsx           # Navbar dengan dropdown user dan logout
 │   ├── toggle-theme.tsx     # Komponen untuk mengubah tema aplikasi
 │   ├── theme-provider.tsx   # Provider untuk mengelola tema
 │
 ├── utils
 │   ├── auth.ts              # Logic autentikasi menggunakan cookies
 │   ├── storage.ts           # CRUD data dengan Local Storage
 │
 ├── styles
 │   ├── globals.css          # File global styles Tailwind
```

---

## ⚡ **Instalasi dan Menjalankan Proyek**

### **1️⃣ Clone Repository**

```bash
git clone https://github.com/muhamyusuf/fe-test-aksamedia-muhammad-yusuf.git .
```

### **2️⃣ Install Dependencies**

```bash
npm install
# atau
yarn install
```

### **3️⃣ Jalankan Development Server**

```bash
npm run dev
# atau
yarn dev
```

Aplikasi dapat diakses di **http://localhost:3000**

---

## 🌍 **Deploy**

Proyek ini dapat di-deploy menggunakan **Vercel** atau **Netlify**.

### **Deploy di Vercel**

```bash
npm run build
vercel
```

---

## 🛠 **Penggunaan**

1. **Login dengan credential yang tersedia:**
   - `admin / admin123`
   - `user1 / password1`
   - `guest / guestpass`
2. Setelah login, user diarahkan ke halaman dashboard.
3. Dapat melakukan **CRUD data**, pencarian, dan paginasi.
4. User bisa mengedit nama profil di halaman **Profile**.
5. Logout melalui dropdown di navbar.

---

## 📜 **Lisensi**

Proyek ini dibuat untuk keperluan tes magang di PT Aksamedia Mulia Digital dan **tidak** memiliki lisensi khusus.

---
