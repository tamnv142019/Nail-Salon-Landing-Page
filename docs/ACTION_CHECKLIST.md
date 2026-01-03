# 🎯 Google Search SEO - Action Checklist

## ✅ Đã Hoàn Thành

- [x] Thêm WebSite Schema (JSON-LD) vào `src/config/seo.config.ts`
- [x] Cấu hình `metadataBase` trong `src/app/layout.tsx`
- [x] Thêm `applicationName` vào metadata
- [x] Cấu hình favicon đầy đủ (>= 48x48px)
- [x] Build thành công không lỗi
- [x] Tạo tài liệu hướng dẫn

---

## 📋 Bạn Cần Làm Ngay

### 1. Deploy to Production
```bash
# Option 1: Vercel (recommended for Next.js)
npm run build
vercel --prod

# Option 2: Custom server
npm run build
npm start
```

### 2. Test Rich Results (5 phút)
1. Truy cập: https://search.google.com/test/rich-results
2. Nhập URL: `https://queensobnail.com`
3. Click "Test URL"
4. Kiểm tra:
   - ✅ "WebSite" schema detected
   - ✅ No errors
   - ✅ Valid markup

### 3. Validate Schema (5 phút)
1. Mở: https://queensobnail.com
2. Right-click → View Page Source
3. Tìm: `<script type="application/ld+json">`
4. Copy JSON content
5. Paste vào: https://validator.schema.org
6. Fix any errors nếu có

---

## 📅 Timeline Actions

### Ngày 1-3: Setup Google Search Console
```
⏰ Ưu tiên cao - Làm ngay!
```

1. **Verify Ownership**
   - Truy cập: https://search.google.com/search-console
   - Add property: `https://queensobnail.com`
   - Chọn verification method:
     - [ ] HTML file upload
     - [ ] HTML tag (recommended)
     - [ ] Google Analytics
     - [ ] Google Tag Manager ✅ (bạn đang dùng)
     - [ ] DNS record
   - Complete verification

2. **Submit Sitemap**
   - Trong Search Console → Sitemaps
   - Add new sitemap: `https://queensobnail.com/sitemap.xml`
   - Submit
   - Status should show "Success"

3. **Request Indexing**
   - URL Inspection tool
   - Enter: `https://queensobnail.com`
   - Click "Request indexing"
   - Repeat for important pages:
     - [ ] `/services`
     - [ ] `/gallery`
     - [ ] `/book`
     - [ ] `/contact`

### Tuần 1: Monitor Initial Results
```
⏰ Check 2-3 lần/tuần
```

- [ ] Check Search Console → Coverage
  - Indexed pages should increase
  - Watch for errors
- [ ] Check Search Console → Enhancements
  - Look for "Logo" enhancement
  - Look for structured data enhancements
- [ ] Monitor crawler activity
  - Performance → Crawl stats
- [ ] Test Rich Results again
  - Any new features detected?

### Tuần 2: Verify Display
```
⏰ Kiên nhẫn chờ Google
```

- [ ] Search "queensobnail.com" trên Google
- [ ] Check favicon có hiển thị chưa
- [ ] Check site name có hiển thị chưa
- [ ] Screenshot results (for comparison)
- [ ] Search Console → Performance
  - Check impressions
  - Check clicks
  - Check average position

### Tuần 3-4: Optimization
```
⏰ Nếu chưa thấy kết quả
```

- [ ] Re-check Schema với Rich Results Test
- [ ] Verify favicon size >= 48x48px
- [ ] Check robots.txt không block Google
- [ ] Review Search Console errors
- [ ] Request re-indexing if needed
- [ ] Check if competitors have similar setup

---

## 🔍 Testing Commands

### Local Testing
```bash
# Start dev server
npm run dev

# Test in browser
http://localhost:3000

# View source and check schemas
curl http://localhost:3000 | grep 'application/ld+json' -A 30
```

### Production Testing
```bash
# Check homepage
curl https://queensobnail.com

# Check favicon
curl -I https://queensobnail.com/favicon/android-chrome-192x192.png
# Should return: HTTP/2 200

# Check sitemap
curl https://queensobnail.com/sitemap.xml

# Check robots.txt
curl https://queensobnail.com/robots.txt
```

### Schema Validation
```bash
# Extract JSON-LD
curl https://queensobnail.com | grep -o '<script type="application/ld\+json">.*</script>'

# Or use online tools:
# - https://search.google.com/test/rich-results
# - https://validator.schema.org
# - https://search.google.com/structured-data/testing-tool
```

---

## 📊 Success Metrics

### Week 1
- [ ] Google crawled website
- [ ] Pages indexed in Search Console
- [ ] No critical errors in Coverage report
- [ ] Schema detected by Rich Results Test

### Week 2
- [ ] Favicon appears in Google Search
- [ ] Impressions > 0 in Performance report
- [ ] Some organic clicks

### Week 3-4
- [ ] Site name appears in search results
- [ ] Impressions increasing
- [ ] Average position improving
- [ ] Rich snippets appearing

### Month 2-3
- [ ] Sitelinks generated (if eligible)
- [ ] Consistent organic traffic
- [ ] Good CTR (> 2-3%)
- [ ] Ranking for target keywords

---

## ❌ Troubleshooting Checklist

### Favicon Not Showing
```
Timeline: Usually 3-7 days
```
- [ ] Verify file exists: `https://queensobnail.com/favicon/android-chrome-192x192.png`
- [ ] Check file size: >= 48x48px ✅
- [ ] Check file format: .ico or .png ✅
- [ ] Request re-indexing
- [ ] Clear browser cache
- [ ] Wait longer (up to 2 weeks)

### Site Name Not Showing
```
Timeline: Usually 1-2 weeks
```
- [ ] WebSite Schema in page source ✅
- [ ] metadataBase configured ✅
- [ ] applicationName in metadata ✅
- [ ] Rich Results Test detects schema ✅
- [ ] Site has some authority/traffic
- [ ] Consistent branding across pages
- [ ] Wait longer (up to 4 weeks)

### Not Indexed
```
Timeline: Usually 3-7 days
```
- [ ] Submitted sitemap ✅
- [ ] robots.txt allows crawling
- [ ] No noindex tags
- [ ] Request indexing via Search Console
- [ ] Check Coverage report for errors
- [ ] Site is accessible (not password protected)
- [ ] Wait longer

### Schema Errors
```
Action: Fix immediately
```
- [ ] Run Rich Results Test
- [ ] Copy error messages
- [ ] Fix in `src/config/seo.config.ts`
- [ ] Re-build and deploy
- [ ] Re-test
- [ ] Request re-indexing

---

## 📞 Support Resources

### Google Official
- Search Console: https://search.google.com/search-console
- Rich Results Test: https://search.google.com/test/rich-results
- Search Central: https://developers.google.com/search
- Community Forum: https://support.google.com/webmasters/community

### Schema.org
- WebSite: https://schema.org/WebSite
- Organization: https://schema.org/Organization
- Validator: https://validator.schema.org

### Next.js
- Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- SEO Guide: https://nextjs.org/learn/seo/introduction-to-seo

### Tools
- PageSpeed Insights: https://pagespeed.web.dev
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Lighthouse: Built into Chrome DevTools

---

## 💡 Pro Tips

1. **Be Patient**: Google needs time to index and trust your site
2. **Consistency**: Keep name, URL, phone consistent across all pages
3. **Quality Content**: Google prioritizes helpful, quality content
4. **Mobile First**: Ensure mobile version is perfect
5. **Page Speed**: Fast sites rank better
6. **Regular Updates**: Fresh content signals active site
7. **Monitor Weekly**: Check Search Console regularly
8. **Track Changes**: Screenshot your search results over time

---

## ✨ Optional Enhancements (Future)

### Short Term (Next Month)
- [ ] Add Review Schema with star ratings
- [ ] Create OG image (1200x630px)
- [ ] Add breadcrumb navigation
- [ ] Optimize Core Web Vitals

### Medium Term (2-3 Months)
- [ ] Add Event Schema for promotions
- [ ] Video Schema for gallery videos
- [ ] Multi-language support (Vietnamese)
- [ ] Local SEO optimization

### Long Term (3-6 Months)
- [ ] Build backlinks
- [ ] Guest posting
- [ ] Local directory listings
- [ ] Social media integration
- [ ] Blog with SEO content

---

## 🎉 You're Ready!

**All code is implemented and tested.**
**Now deploy and let Google do its magic.**

Timeline summary:
- Deploy: Today
- Setup Search Console: Day 1-3
- Initial indexing: Day 3-7
- Favicon appears: Week 1-2
- Site name appears: Week 2-4
- Full benefits: Month 2-3

**Good luck! 🚀**

---

**Questions?** Check [GOOGLE_SEARCH_SEO_GUIDE.md](./GOOGLE_SEARCH_SEO_GUIDE.md)
