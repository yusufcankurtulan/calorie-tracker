# Kalori Takip - Calorie Tracker

React + Vite ile geliştirilmiş günlük kalori takip uygulaması.

## Özellikler

- ✅ **Ekle** - Yeni öğün ekleme
- ✅ **Listeleme** - Tüm öğünleri görüntüleme
- ✅ **Güncelleme** - Öğün düzenleme
- ✅ **Silme** - Öğün silme
- 📊 Günlük toplam kalori hesabı
- 💾 localStorage ile veri saklama

## Teknolojiler

- React 18
- Vite
- Tailwind CSS

## Kurulum

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Netlify ile Yayına Alma

1. Projeyi GitHub'a yükleyin
2. [Netlify](https://netlify.com) hesabı açın
3. "Add new site" → "Import an existing project"
4. GitHub repo'nuzu seçin
5. Build command: `npm run build`
6. Publish directory: `dist`

veya `netlify.toml` dosyası projede hazır olduğu için otomatik algılanacaktır.

## Proje Yapısı

```
src/
├── Components/     # Bileşenler
│   ├── AddMealForm.jsx
│   ├── MealList.jsx
│   ├── MealItem.jsx
│   └── UpdateMealModal.jsx
├── Pages/          # Sayfalar
│   └── HomePage.jsx
└── Interfaces/     # Veri modelleri
    └── Meal.js
```
