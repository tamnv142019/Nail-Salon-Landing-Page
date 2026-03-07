# Google Analytics Conversion Tracking Setup Guide

This guide explains how conversion tracking is set up for the nail salon landing page.

## Overview

Conversion tracking has been implemented for all major user actions on the landing page, enabling you to measure:
- **Primary Conversions**: Booking submissions, contact form submissions, phone calls
- **Engagement Events**: Service views, gallery interactions, social media clicks, directions

---

## Environment Configuration

### 1. Set Up Environment Variables

Create or update `.env.local` with your tracking IDs:

```env
# Required: Google Tag Manager Container ID (replaces GTM)
NEXT_PUBLIC_GTM_ID=GT-NCGSXH43

# Required: Google Analytics Conversion ID (for Ads/GA4)
NEXT_PUBLIC_GTAG_ID=AW-17818536782
```

**To get these IDs:**

1. **Google Tag Manager ID**:
   - Go to [Google Tag Manager](https://tagmanager.google.com)
   - Select your container
   - Copy the Container ID (format: `GT-XXXXXXXXX`)

2. **Google Analytics Conversion ID**:
   - Go to [Google Analytics](https://analytics.google.com)
   - Create a GA4 property if needed
   - In GA4 settings, copy the Measurement ID (format: `AW-XXXXXXXXXX`)
   - Or use your Google Ads conversion ID

### 2. Configure Google Tag Manager

In your GTM container, set up the following tags to capture events:

**Tag: GA4 Events**
- Configuration tag tied to your GA4 property
- Trigger: All Pages

**Event Tags** (create tags for these conversions):
- `booking_submission` - Track completed booking
- `contact_form_submission` - Track contact form
- `phone_call_initiated` - Track phone calls
- `service_detail_view` - Track service interest
- `gallery_image_click` - Track gallery engagement
- `review_click` - Track review engagement
- `social_follow_click` - Track social media engagement

---

## Primary Conversions Tracked

### 1. Booking Submission
**Event Name**: `booking_submission`
**Triggers When**: User completes booking form

**Tracked Data**:
```
- event_category: "conversion"
- event_label: "booking"
- services: [array of service names]
- appointment_date: "YYYY-MM-DD"
- appointment_time: "HH:MM AM/PM"
- customer_name: string
- customer_email: string
- customer_phone: string
- timestamp: ISO timestamp
```

**Location**: [BookingModal.tsx](src/components/BookingModal.tsx) - `handleSubmit` function

---

### 2. Contact Form Submission
**Event Name**: `contact_form_submission`
**Triggers When**: User submits contact form

**Tracked Data**:
```
- event_category: "conversion"
- event_label: "contact_form"
- customer_name: string
- customer_email: string
- customer_phone: string
- message_length: number
- source: "contact_page"
- timestamp: ISO timestamp
```

**Location**: [Contact.tsx](src/components/Contact.tsx) - `handleSubmit` function

---

### 3. Phone Call Click
**Event Name**: `phone_call_initiated`
**Triggers When**: User clicks to make phone call

**Tracked Data**:
```
- event_category: "conversion"
- event_label: "phone_call"
- source: "floating_button" | "contact_card"
- phone_number: "(619) 224-5050"
- timestamp: ISO timestamp
```

**Locations**:
- [FloatingCallButton.tsx](src/components/FloatingCallButton.tsx) - Floating phone button
- [Contact.tsx](src/components/Contact.tsx) - Contact card phone link

---

## Engagement Events Tracked

### 1. Booking Modal Open
**Event Name**: `booking_modal_open`
- Tracks when users open booking modal
- Records source: `service_cta` or `main_cta`

### 2. Service Detail View
**Event Name**: `service_detail_view`
- Tracks when users click "Book Now" on services
- Records service name

**Location**: [Services.tsx](src/components/Services.tsx) - Service tier and card click handlers

### 3. Gallery Image Click
**Event Name**: `gallery_image_click`
- Tracks when users click gallery images to open lightbox
- Records image index

**Location**: [Gallery.tsx](src/components/Gallery.tsx) - GalleryImage component click

### 4. Other Engagement Events
```
- review_click: When users click to view reviews
- review_source: google | yelp | other
- gallery_interaction: Gallery navigation events
- social_follow_click: Social media button clicks
- directions_click: Google Maps direction clicks
- scroll_depth: User scroll percentage
- testimonial_view: When testimonials come into view
```

---

## Track Custom Events in Code

Import the tracking utilities:

```typescript
import { 
  trackBookingConversion,
  trackPhoneCallClick,
  trackServiceDetailOpen,
  trackGalleryImageClick,
  trackEvent 
} from '../utils/gtag';
```

### Usage Examples

**Track custom event:**
```typescript
trackEvent('event_name', {
  event_category: 'engagement',
  custom_param: 'value',
});
```

**Track specific conversions:**
```typescript
// Booking
trackBookingConversion({
  services: ['Manicure', 'Pedicure'],
  date: '2024-01-15',
  time: '2:00 PM',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerPhone: '(619) 224-5050',
});

// Contact form
trackContactFormConversion({
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '(619) 224-5050',
  message: 'I would like to book...',
  source: 'contact_page',
});

// Phone call
trackPhoneCallClick('floating_button');

// Service detail
trackServiceDetailOpen('Deluxe Manicure');

// Gallery
trackGalleryImageClick(0); // image index
```

---

## Testing & Implementation

### 1. Test Events Locally

**Using Google Tag Manager Debug Mode:**
1. Install [GTM Preview & Debug extension](https://chrome.google.com/webstore)
2. Click the extension and enable Debug Mode
3. Visit your site and perform actions
4. Check the debug console for events firing

### 2. Verify in Google Analytics

1. Go to Google Analytics 4 property
2. Navigate to **Real-time** → **Events**
3. Perform conversions on your site
4. You should see events appear in real-time

### 3. Set Up Conversion Goals

In Google Analytics:
1. Go to **Admin** → **Conversions**
2. Create new conversion events:
   - `booking_submission`
   - `contact_form_submission`
   - `phone_call_initiated`
3. Mark importance: **High** for primary conversions

---

## Advanced: Add Conversion Value

To track monetary value (revenue):

```typescript
trackBookingConversion({
  services: ['Deluxe Manicure'],
  date: '2024-01-15',
  time: '2:00 PM',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerPhone: '(619) 224-5050',
  // Add this for revenue tracking:
  value: 35.00,  // total amount
  currency: 'USD',
});
```

---

## Implementation Checklist

- [ ] Set `NEXT_PUBLIC_GTM_ID` environment variable
- [ ] Set `NEXT_PUBLIC_GTAG_ID` environment variable
- [ ] Deploy with environment variables
- [ ] Enable GTM Debug Mode and test conversions
- [ ] Verify events in Google Analytics Real-time
- [ ] Set up conversion goals in GA4
- [ ] Create custom reports in GA4 dashboard
- [ ] Set up alerts for conversion spikes/drops
- [ ] Test on mobile devices

---

## Files Modified

1. **src/utils/gtag.ts** - Added conversion tracking functions
2. **src/components/BookingModal.tsx** - Booking conversion tracking
3. **src/components/Contact.tsx** - Contact form & phone call tracking
4. **src/components/FloatingCallButton.tsx** - Phone call tracking
5. **src/components/Gallery.tsx** - Gallery engagement tracking
6. **src/components/Services.tsx** - Service detail view tracking

---

## Troubleshooting

**Events not appearing in GA4?**
- Check environment variables are set correctly
- Verify GTM container ID is correct
- Check browser console for errors: `window.dataLayer`
- Ensure JavaScript is enabled
- Wait 24-48 hours for GA4 to process historical data

**Wrong conversion attribution?**
- Check that event timestamps are correct
- Verify custom parameters match your GA4 configuration
- Ensure user consent is handled (if GDPR applies)

**Need to modify tracking?**
- Edit utility functions in `src/utils/gtag.ts`
- Update component event calls
- Restart development server: `npm run dev`

---

## Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics)
- [Google Tag Manager Documentation](https://support.google.com/tagmanager)
- [GA4 Conversion Setup Guide](https://support.google.com/analytics/answer/9267568)
- [Event Measurement Best Practices](https://support.google.com/analytics/answer/10071969)

---

## Support

For questions about tracking implementation, refer to the conversion tracking utility functions in [src/utils/gtag.ts](src/utils/gtag.ts).
