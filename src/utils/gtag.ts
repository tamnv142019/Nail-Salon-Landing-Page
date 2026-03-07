type EventParams = Record<string, any>;

export const gtag = (...args: any[]) => {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  // @ts-ignore
  if (typeof (window as any).gtag === 'function') {
    // @ts-ignore
    (window as any).gtag(...args);
  } else {
    // push to dataLayer as fallback
    // @ts-ignore
    window.dataLayer.push(args);
  }
};

export const trackEvent = (action: string, params: EventParams = {}) => {
  gtag('event', action, params);
};

/* ============================================
   CONVERSION TRACKING FUNCTIONS
   ============================================ */

/**
 * Track booking submission (Primary Conversion)
 */
export const trackBookingConversion = (data: {
  services?: string[];
  date?: string;
  time?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}) => {
  trackEvent('booking_submission', {
    event_category: 'conversion',
    event_label: 'booking',
    services: data.services?.join(',') || 'unknown',
    appointment_date: data.date,
    appointment_time: data.time,
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track booking modal open (Interaction)
 */
export const trackBookingModalOpen = (source?: string) => {
  trackEvent('booking_modal_open', {
    event_category: 'interaction',
    source: source || 'unknown',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track contact form submission (Primary Conversion)
 */
export const trackContactFormConversion = (data: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
}) => {
  trackEvent('contact_form_submission', {
    event_category: 'conversion',
    event_label: 'contact_form',
    customer_name: data.name,
    customer_email: data.email,
    customer_phone: data.phone,
    message_length: data.message?.length || 0,
    source: data.source || 'contact_page',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track phone call click (Primary Conversion)
 */
export const trackPhoneCallClick = (source?: string) => {
  trackEvent('phone_call_initiated', {
    event_category: 'conversion',
    event_label: 'phone_call',
    source: source || 'floating_button',
    phone_number: '(619) 224-5050',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track service view
 */
export const trackServiceView = (serviceName: string, serviceType?: string) => {
  trackEvent('service_view', {
    event_category: 'engagement',
    event_label: serviceName,
    service_type: serviceType,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track service detail modal open
 */
export const trackServiceDetailOpen = (serviceName: string) => {
  trackEvent('service_detail_view', {
    event_category: 'engagement',
    event_label: serviceName,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track gallery interaction
 */
export const trackGalleryInteraction = (action: 'view' | 'lightbox_open' | 'image_scroll') => {
  trackEvent('gallery_interaction', {
    event_category: 'engagement',
    event_label: action,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track gallery image click (Lightbox open)
 */
export const trackGalleryImageClick = (imageIndex?: number) => {
  trackEvent('gallery_image_click', {
    event_category: 'engagement',
    image_index: imageIndex,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track review click/expansion
 */
export const trackReviewClick = (reviewSource: 'google' | 'yelp' | 'other', sentiment?: 'positive' | 'negative') => {
  trackEvent('review_click', {
    event_category: 'engagement',
    review_source: reviewSource,
    sentiment: sentiment,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track "View All Reviews" click
 */
export const trackViewAllReviewsClick = (platform: string) => {
  trackEvent('view_all_reviews_click', {
    event_category: 'engagement',
    platform: platform,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track Map/Directions click
 */
export const trackDirectionsClick = () => {
  trackEvent('directions_click', {
    event_category: 'engagement',
    event_label: 'map_directions',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track Social media follow button click
 */
export const trackSocialFollowClick = (platform: 'facebook' | 'instagram' | 'tiktok' | 'yelp') => {
  trackEvent('social_follow_click', {
    event_category: 'engagement',
    platform: platform,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track CTA banner click
 */
export const trackCTABannerClick = (ctaType: string, position?: string) => {
  trackEvent('cta_banner_click', {
    event_category: 'engagement',
    cta_type: ctaType,
    position: position,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track page scroll depth
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    scroll_percentage: depth,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track testimonial/story view
 */
export const trackTestimonialView = (testimonialType: 'story' | 'review' | 'testimonial') => {
  trackEvent('testimonial_view', {
    event_category: 'engagement',
    testimonial_type: testimonialType,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track page views with custom dimensions
 */
export const trackPageView = (pageName: string, pageType?: string) => {
  trackEvent('page_view', {
    event_category: 'navigation',
    page_name: pageName,
    page_type: pageType,
    timestamp: new Date().toISOString(),
  });
};
