# Hướng dẫn Tạo Conversion Tracking trên Google Ads

Hướng dẫn chi tiết để thiết lập conversion tracking cho nail salon landing page trên Google Ads.

---

## Bước 1: Truy cập Google Ads

1. Đi tới [Google Ads](https://ads.google.com)
2. Đăng nhập bằng tài khoản Google của bạn
3. Nếu chưa có tài khoản, click **"Tạo tài khoản"** → Chọn **"Expert mode"**

---

## Bước 2: Thiết lập Conversion Tracking

### 2.1: Truy cập Tools → Conversions

1. Click nút **☰ Menu** (góc trái)
2. Chọn **Tools and settings** → **Tools** 
3. Chọn **Conversions**

![Step: Go to Conversions](https://support.google.com/ads/images/8.png)

### 2.2: Tạo Conversion Action Mới

Click nút **🔴 + New conversion action** (hoặc **+ Conversion**)

---

## Bước 3: Chọn Loại Conversion

Chọn **Website** vì bạn đang track trên website

```
┌─────────────────────────────────┐
│ CHOOSE YOUR CONVERSION SOURCE   │
│                                 │
│ ☑ Website                       │
│ ☐ App                           │
│ ☐ Phone calls                   │
│ ☐ Import                        │
│ ☐ Lead form extension           │
└─────────────────────────────────┘
```

Click **Continue**

---

## Bước 4: Tạo Conversion Action cho Booking

### Conversion #1: Booking Submission

**Điền thông tin:**

| Trường | Giá trị |
|--------|---------|
| **Conversion name** | Booking Submission |
| **Conversion category** | Purchase/Sale |
| **Conversion value** | Use different values for each conversion ✓ |
| **Default value** | 35.00 |
| **Currency** | USD |
| **Count only one** | Every conversion |
| **Attribution model** | Last click |

**Chọn:**
- ☑ **Include in "Conversions"** 
- ☑ **Include in conversion-based bidding**

Click **Create and continue**

---

## Bước 5: Cài đặt Tracking Tag

Google Ads sẽ hiển thị hai option:

### Option A: Google Analytics (RECOMMENDED) ✅

**Nếu bạn đã linked Google Analytics:**

1. Chọn **Use Google Analytics**
2. Select your GA4 property: **Queens Nails Hair Skincare**
3. Select the event: **booking_submission**
4. Click **Use this event**

✅ **Lợi ích:**
- Tự động link với GA4
- Không cần cài thêm code
- Real-time tracking

### Option B: Google Tag Manager (CURRENT SETUP)

1. Chọn **Use Google Tag Manager**
2. Copy Container ID: **GT-NCGSXH43** (đã cấu hình)
3. Follow instructions to create GTM tag
4. Click **Mark as complete** khi done

### Option C: Global Site Tag (gọi là gtag)

1. Chọn **Install the Google tag**
2. Copy conversion ID (format: `AW-XXXXXXXXX`)
3. Paste vào `.env.local`:
   ```env
   NEXT_PUBLIC_GTAG_ID=AW-XXXXXXXXX
   ```

---

## Bước 6: Tạo Thêm 2 Conversion Actions

### Conversion #2: Contact Form Submission

| Trường | Giá trị |
|--------|---------|
| **Conversion name** | Contact Form Submission |
| **Conversion category** | Lead |
| **Conversion value** | Do not use conversion value |
| **Count only one** | Every conversion |
| **Attribution model** | Last click |

**Event name để track**: `contact_form_submission`

### Conversion #3: Phone Call Click

| Trường | Giá trị |
|--------|---------|
| **Conversion name** | Phone Call Click |
| **Conversion category** | Lead |
| **Conversion value** | Do not use conversion value |
| **Count only one** | Every conversion |
| **Attribution model** | Last click |

**Event name để track**: `phone_call_initiated`

---

## Bước 7: Xác Nhận Tracking Hoạt Động

### Kiểm tra trong Google Ads:

1. Vào **Tools and settings** → **Conversions**
2. Tìm **Booking Submission**
3. Click vào tên conversion
4. Chọn tab **Code snippet**
5. Validate tracking:
   - Trạng thái: **Tracking tag is installed**
   - Status: **Recording conversions**

### Kiểm tra trong Google Analytics:

1. Vào [Google Analytics 4](https://analytics.google.com)
2. Chọn property: **queensobnail.com**
3. Click **Admin** → **Events**
4. Tìm:
   - `booking_submission`
   - `contact_form_submission`
   - `phone_call_initiated`

---

## Bước 8: Link Google Ads ↔ Google Analytics

**Để xem chi tiết conversions từ GA vào Ads:**

### Trong Google Analytics:

1. **Admin** → **Google Ads links**
2. Click **Link Google Ads account**
3. Select your Google Ads account
4. Chọn **Booking Submission** để link

### Trong Google Ads:

1. **Tools and settings** → **Linked accounts**
2. Connect Google Analytics property
3. Enable auto-tagging ✓

---

## Bước 9: Cấu Hình Bidding Strategy (Optional)

Để Google Ads tối ưu chi phí dựa trên conversions:

1. Vào **Campaigns**
2. Chọn campaign
3. **Settings** → **Bidding**
4. Chọn **Target CPA** hoặc **Maximize conversions**
5. Set target: **$35** (average booking value)

---

## Test Conversion Tracking

### Phương pháp 1: Google Tag Assistant

1. Cài [Tag Assistant](https://chrome.google.com/webstore) extension
2. Truy cập website
3. Click **Tag Assistant** icon
4. Perform action: Book → Submit
5. Kiểm tra tags fired

### Phương pháp 2: Google Tag Manager Debug Mode

1. Cài [GTM Preview & Debug](https://chrome.google.com/webstore)
2. Vào site, click **Tag Assistant**
3. Scroll down → **Enable Debug Mode**
4. Perform booking submission
5. Check console for events

### Phương pháp 3: Google Ads Conversion Tracking Tag Helper

1. Download [Conversion Tracking Tag Helper](https://chrome.google.com/webstore)
2. Click icon trên site
3. Kiểm tra conversion pixels firing

---

## Troubleshooting

### ❌ Conversions không ghi nhận?

**Kiểm tra:**
- [ ] Tracking tag cài đúng (`NEXT_PUBLIC_GTAG_ID` set)
- [ ] Event name khớp với GA4 event name
- [ ] Google Ads conversion view không bị lọc
- [ ] Chờ 24 giờ để dữ liệu xử lý
- [ ] Check browser console: `window.gtag('config', 'AW-...')`

**Debug:**
```javascript
// Kiểm tra trong browser console
window.gtag('event', 'booking_submission', {
  value: 35.00,
  currency: 'USD'
});
```

### ❌ Tracking tag installed nhưng không ghi?

- Xóa cache browser (Ctrl + Shift + Delete)
- Test trên browser khác
- Disable ad blocker
- Chờ 24-48 giờ để GA4 process

### ❌ Conversions dính với impressions?

- Google Ads không phân biệt view vs click
- Set attribution model → **First click** hoặc **Data-driven**

---

## Google Ads Conversion Setup Checklist

- [ ] Truy cập Google Ads account
- [ ] Tạo **Booking Submission** conversion
- [ ] Tạo **Contact Form Submission** conversion
- [ ] Tạo **Phone Call Click** conversion
- [ ] Cài tracking tag (Google Analytics hoặc GTM)
- [ ] Copy Conversion ID → `.env.local`
- [ ] Test tracking hoạt động
- [ ] Link Google Ads ↔ Google Analytics
- [ ] Chờ 24 giờ để data process
- [ ] Xem report: **Tools** → **Conversions** → **Conversion actions**

---

## Xem Report Conversions

### Trong Google Ads:

1. **Campaigns** → chọn campaign
2. **Columns** → **Conversions**
3. Kiểm tra: Conv., Conv. rate, Conv. value

### Custom Reports:

1. **Reports** → **Create new report**
2. Select: **Campaigns** / **Ad groups**
3. Metrics: 
   - Conversions
   - Conversion rate
   - Cost per conversion
   - Conversion value
4. Dimensions:
   - Campaign
   - Ad group
   - Keyword

---

## ROI Calculation

**Công thức:**

```
Booking Conversions: 10
Average Booking Value: $35
Total Revenue: 10 × $35 = $350

Ads Spend: $100
ROAS (Return on Ad Spend) = $350 / $100 = 3.5x

Profit: $350 - $100 = $250
Cost per Booking: $100 / 10 = $10
```

---

## Advanced: Auto-tagging URLs

Để tự động thêm tracking parameters:

### Enable Auto-tagging:

1. **Tools and settings** → **Account settings**
2. Scroll to **Tracking**
3. ☑ **Auto-tagging**
4. Save

### UTM Parameters (Manual):

```
URL: https://queensobnail.com/services

utm_source=google_ads
utm_medium=cpc
utm_campaign=nail_salon_bookings
utm_content=booking_button
utm_term=manicure+nail+salon

Full URL:
https://queensobnail.com/services?utm_source=google_ads&utm_medium=cpc&utm_campaign=nail_salon_bookings
```

---

## Tài liệu Tham Khảo

- [Google Ads Conversion Tracking Guide](https://support.google.com/google-ads/answer/1722054)
- [Set up conversion events in GA4](https://support.google.com/analytics/answer/9267568)
- [Link Google Ads & GA4](https://support.google.com/analytics/answer/9028101)
- [Conversion Tag Helper Troubleshooting](https://support.google.com/google-ads/answer/7647218)

---

## Quick Links

- 🔗 [Google Ads](https://ads.google.com)
- 🔗 [Google Analytics](https://analytics.google.com)
- 🔗 [Google Tag Manager](https://tagmanager.google.com)
- 🔗 [Google Ads Account Settings](https://ads.google.com/aw/settings/account)

---

## Liên hệ Hỗ Trợ

Nếu gặp vấn đề:

1. **Google Ads Support**: https://support.google.com/google-ads/
2. **Analytics Support**: https://support.google.com/analytics/
3. **Check Implementation**: [CONVERSION_TRACKING_SETUP.md](CONVERSION_TRACKING_SETUP.md)

