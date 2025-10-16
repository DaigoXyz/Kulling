
# Kulling - 🚚 FoodTruck System

Proyek ini merupakan sistem pemesanan & manajemen **Food Truck / Kuliner Keliling** yang terdiri dari 3 bagian utama:

- 🍔 **API (Backend)** — Dibangun dengan Express.js  
- 💻 **Web App (Frontend)** — Dibangun dengan React + TypeScript + Vite + Tailwind CSS  
- 📱 **Mobile App** — Dibangun dengan React Native + TypeScript

## 📂 Struktur Folder

```
FoodTruck/
├── api/                     # Backend (Express.js)
│   ├── server.js
│   ├── package.json
│   └── ...
├── web/                     # Frontend (React + Vite + Tailwind)
│   ├── src/
│   ├── package.json
│   └── ...
├── mobile/                  # Mobile App (React Native)
│   ├── App.tsx
│   ├── package.json
│   └── ...
└── README.md
````

---

## ⚙️ Persiapan Awal

Pastikan kamu sudah menginstall:

* 🟢 [Node.js](https://nodejs.org/) (disarankan versi **18+**)
* 📦 npm (sudah termasuk dalam Node.js)
* (Opsional) [Git](https://git-scm.com/)

---

## 🚀 Cara Menjalankan Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/DaigoXyz/FoodTruck.git
cd FoodTruck
```

### 2️⃣ Jalankan Backend (API)

Masuk ke folder api dan install dependency:

```bash
cd api
npm install
```

Lalu jalankan server-nya:

```bash
npm start
```

Server akan berjalan di:
👉 [http://localhost:3000](http://localhost:3000)

Coba akses di browser:

```bash
http://localhost:3000/api/foodtrucks
```

### 3️⃣ Jalankan Web App (Frontend)

Masuk ke folder web dan install dependency:

```bash
cd ../web
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka di browser (biasanya):
👉 [http://localhost:5173](http://localhost:5173)

### 4️⃣ Jalankan Mobile App (React Native)

Masuk ke folder mobile:

```bash
cd ../mobile
npm install
```

Lalu debug apk dengan perintah:

```bash
npx react-native run-android
```

> 📝 **Note:**
> Jika aplikasi di Android stuck loading, ubah IP sesuai jaringan kamu di file `mobile/App.tsx`
>
> ```js
> const base = 'http://[ip_jaringan_kamu]:3000/api/foodtrucks';
> ```
