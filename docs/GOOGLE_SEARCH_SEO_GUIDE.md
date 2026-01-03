# 🔍 Hướng dẫn SEO cho Google Search

## ✅ Đã Cấu Hình

### 1. **WebSite Schema (JSON-LD)** - Quan trọng nhất cho Site Name

```typescript
// Trong src/config/seo.config.ts
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Queen\'s Nails Hair & Skincare',
    url: 'https://queensobnail.com',
    // ... thông tin khác
  };
}
```

**Tác dụng:**
- ✅ Google hiển thị **tên doanh nghiệp** trong kết quả tìm kiếm
- ✅ Hỗ trợ search box trực tiếp trong Google
- ✅ Liên kết với Organization schema

### 2. **Metadata Chuẩn Next.js**

```typescript
// Trong src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://queensobnail.com'), // BẮT BUỘC
  applicationName: "Queen's Nails Hair & Skincare",   // Site name
  title: {
    default: "Queen's Nails Hair & Skincare | Best Nail Salon...",
    template: "%s | Queen's Nails Hair & Skincare",
  },
  // ...
};
```

**metadataBase:**
- 🔑 **BẮT BUỘC** để Google xác định đúng domain
- Tự động thêm domain vào tất cả relative URLs

**applicationName:**
- Tên doanh nghiệp xuất hiện trong Google Search
- Kết hợp với WebSite Schema

### 3. **Favicon Chuẩn Google**

✅ Đã có đầy đủ các file:
- `/favicon/favicon.ico` (legacy browsers)
- `/favicon/favicon-16x16.png` (16x16px)
- `/favicon/favicon-32x32.png` (32x32px) 
- `/favicon/android-chrome-192x192.png` (192x192px) ✨
- `/favicon/android-chrome-512x512.png` (512x512px) ✨
- `/favicon/apple-touch-icon.png` (180x180px)

**Yêu cầu Google:**
- ✅ Favicon phải >= 48x48 pixels
- ✅ Format: .ico, .png, .jpg
- ✅ Tỷ lệ 1:1 (vuông)

### 4. **Cấu trúc Schema Đầy Đủ**

```
1. WebSite Schema        → Site name
2. BeautySalon Schema    → Business info
3. Service Schema        → Services offered
4. FAQ Schema            → FAQs
5. Breadcrumb Schema     → Navigation
```

---

## 📋 Kiểm Tra & Validation

### 1. **Google Rich Results Test**
🔗 https://search.google.com/test/rich-results

1. Nhập URL: `https://queensobnail.com`
2. Chờ Google crawl
3. Kiểm tra các schema được nhận diện

### 2. **Google Search Console**
🔗 https://search.google.com/search-console

**Bước 1: Xác minh quyền sở hữu**
```typescript
// Thêm vào src/app/layout.tsx
export const metadata: Metadata = {
  // ...
  verification: {
    google: 'your-google-verification-code',
  },
};
```

**Bước 2: Submit Sitemap**
- Upload sitemap: `https://queensobnail.com/sitemap.xml`
- Chờ Google index (3-7 ngày)

**Bước 3: Kiểm tra**
- Coverage → Indexed pages
- Enhancements → Logo, Sitelinks

### 3. **Schema Markup Validator**
🔗 https://validator.schema.org

1. View page source: `https://queensobnail.com`
2. Copy JSON-LD trong `<script type="application/ld+json">`
3. Paste vào validator
4. Fix any errors

---

## 🎯 Cách Google Hiển Thị

### ✅ Kết quả mong muốn:

```
┌─────────────────────────────────────────┐
│ [FAVICON] Queen's Nails Hair & Skincare │ ← Site name
│ https://queensobnail.com                │
│                                         │
│ Best Nail Salon in Ocean Beach, San... │ ← Title
│ Best nail salon in Ocean Beach offering │ ← Description
│ luxury manicures, pedicures, nail art...│
│                                         │
│ Sitelinks:                              │
│ Services | Gallery | Book | Contact     │ ← Auto-generated
└─────────────────────────────────────────┘
```

### 📌 Các yếu tố ảnh hưởng:

1. **WebSite Schema** → Site name
2. **Favicon >= 48px** → Icon
3. **title + description** → Snippet
4. **Sitelinks** → Auto (nếu site đủ uy tín)

---

## ⏱️ Timeline

| Thời gian | Kỳ vọng |
|-----------|---------|
| **1-3 ngày** | Google crawl và index |
| **3-7 ngày** | Favicon xuất hiện |
| **1-2 tuần** | Site name xuất hiện |
| **2-4 tuần** | Sitelinks xuất hiện (nếu đủ điều kiện) |

---

## 🔧 Troubleshooting

### ❌ Favicon không hiển thị

**Nguyên nhân:**
- File không đúng kích thước (< 48px)
- Chưa được Google index
- Cache cũ

**Giải pháp:**
```bash
# 1. Kiểm tra file tồn tại
https://queensobnail.com/favicon/favicon.ico
https://queensobnail.com/favicon/android-chrome-192x192.png

# 2. Force Google re-crawl
Google Search Console → URL Inspection → Request indexing

# 3. Đợi 3-7 ngày
```

### ❌ Site name không hiển thị

**Nguyên nhân:**
- Thiếu WebSite Schema
- Thiếu metadataBase
- Google chưa tin tưởng site

**Giải pháp:**
```typescript
// ✅ Đã có WebSite Schema
// ✅ Đã có metadataBase
// ⏰ Đợi Google index (1-2 tuần)
```

### ❌ Schema errors

**Kiểm tra:**
```bash
# 1. View page source
curl https://queensobnail.com

# 2. Tìm <script type="application/ld+json">
# 3. Copy JSON và test tại validator.schema.org

# 4. Fix errors trong src/config/seo.config.ts
```

---

## 🚀 Tối Ưu Thêm

### 1. **Open Graph Images**
```typescript
// Tạo OG image 1200x630px
// Đặt tại: public/images/og-image.jpg

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

### 2. **Structured Data cho từng trang**

**Services Page:**
```typescript
// app/services/page.tsx
export async function generateMetadata() {
  return {
    title: 'Services',
    // ... custom schema cho services
  };
}
```

**Gallery Page:**
```typescript
// app/gallery/page.tsx
// Thêm ImageGallery schema
```

### 3. **Local SEO**
```typescript
// Đã có BeautySalon schema với:
// - Address
// - Phone
// - Opening hours
// - Geo coordinates

// ➕ Thêm vào Google My Business
// ➕ Consistency: Name, Address, Phone (NAP)
```

---

## 📝 Checklist

### Bắt buộc ✅
- [x] WebSite Schema với name + url
- [x] metadataBase trong metadata
- [x] Favicon >= 48x48px
- [x] apple-touch-icon.png
- [x] title + description
- [x] BeautySalon Schema với logo

### Khuyến nghị ⭐
- [ ] Google Search Console verification
- [ ] Submit sitemap.xml
- [ ] Validate schemas (validator.schema.org)
- [ ] Request indexing
- [ ] Monitor Search Console
- [ ] OG image 1200x630

### Nâng cao 🎯
- [ ] Review schema với ratings
- [ ] Event schema (promotions)
- [ ] Video schema (gallery)
- [ ] Local Business schema refinement
- [ ] Multi-language hreflang

---

## 🔗 Resources

- **Google Search Central:** https://developers.google.com/search
- **Schema.org:** https://schema.org
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Search Console:** https://search.google.com/search-console
- **Favicon Guidelines:** https://developers.google.com/search/docs/appearance/favicon-in-search

---

## 💡 Tips

1. **Đợi Google index:** Không có cách nào làm Google index nhanh hơn. Be patient!
2. **Consistency:** Đảm bảo thông tin (name, url, phone) nhất quán trên tất cả schema
3. **Quality content:** Google ưu tiên site có nội dung chất lượng
4. **Mobile-first:** Google index mobile version trước
5. **Page speed:** Core Web Vitals ảnh hưởng đến ranking

---

**✅ Setup hoàn tất! Giờ đợi Google index trong 1-2 tuần.**

Nếu có vấn đề, kiểm tra lại:
1. Google Search Console
2. Rich Results Test
3. Schema Validator
