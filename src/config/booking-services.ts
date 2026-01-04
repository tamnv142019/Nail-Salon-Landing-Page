export type BookingServiceCategory =
  | 'Combo'
  | 'Consultation'
  | 'Manicure'
  | 'Pedicure'
  | 'Waxing'
  | 'Powder'
  | 'Add-ons';

export type BookingService = {
  name: string;
  price?: string;
  duration?: string;
  bestSeller?: boolean;
  sale?: boolean;
  category: BookingServiceCategory;
};

export const bookingServices: BookingService[] = [
  // Combo Specials
  { category: 'Combo', name: 'Combo Pedicure + Manicure Signature', price: '$85', duration: '120 min', sale: true },

  { category: 'Consultation', name: 'Consultation' },

  // Manicure
  { category: 'Manicure', name: 'Regular Manicure', price: '$20', duration: '20 min' },
  { category: 'Manicure', name: 'European Manicure', price: '$25', duration: '30 min' },
  { category: 'Manicure', name: 'Deluxe Manicure', price: '$30', duration: '35 min', bestSeller: true },
  { category: 'Manicure', name: 'Signature Spa Manicure', price: '$35', duration: '45 min' },

  // Pedicure
  { category: 'Pedicure', name: 'Regular Spa Pedicure', price: '$25', duration: '30 min', bestSeller: true },
  { category: 'Pedicure', name: 'BOMB GEL PEDICURE', price: '$53' },
  { category: 'Pedicure', name: 'VOLCANO SPA PEDICURE', price: '$63' },
  { category: 'Pedicure', name: 'COLLAGEN SPA PEDICURE', price: '$69' },

  // Waxing
  { category: 'Waxing', name: 'Eyebrows', price: '$15', duration: '10 min' },
  { category: 'Waxing', name: 'Upper Lip', price: '$8', duration: '10 min' },
  { category: 'Waxing', name: 'Chin', price: '$10', duration: '10 min' },
  { category: 'Waxing', name: 'Side Burns', price: '$10', duration: '10 min' },
  { category: 'Waxing', name: 'Under Arms', price: '$20', duration: '15 min' },
  { category: 'Waxing', name: 'Full Face', price: '$40', duration: '30 min' },
  { category: 'Waxing', name: 'Bikini', price: '$35', duration: '25 min' },
  { category: 'Waxing', name: 'Brazilian', price: '$60', duration: '35 min' },
  { category: 'Waxing', name: 'Chest', price: '$35', duration: '20 min' },
  { category: 'Waxing', name: 'Stomach', price: '$15', duration: '15 min' },
  { category: 'Waxing', name: 'Full Back', price: '$45', duration: '40 min' },
  { category: 'Waxing', name: 'Half Arms', price: '$30', duration: '20 min' },
  { category: 'Waxing', name: 'Full Arms', price: '$45', duration: '30 min' },
  { category: 'Waxing', name: 'Half Legs', price: '$35', duration: '25 min' },
  { category: 'Waxing', name: 'Full Legs', price: '$60', duration: '45 min' },

  // Powder / enhancements
  { category: 'Powder', name: 'Dipping Color', price: '$45', duration: '55 min', bestSeller: true },
  { category: 'Powder', name: 'French Tip Powder', price: '$55', duration: '60 min' },
  { category: 'Powder', name: 'Ombre 2 Color Powder', price: '$50', duration: '60 min' },
  { category: 'Powder', name: 'Hybrid Gel', price: '$60', duration: '75 min' },
  { category: 'Powder', name: 'Gel X', price: '$60', duration: '75 min' },

  // Add-ons
  { category: 'Add-ons', name: 'French', price: '$5', duration: '10 min' },
  { category: 'Add-ons', name: 'Two Designs', price: '$5', duration: '15 min' },
  { category: 'Add-ons', name: 'Natural Buff Shine', price: '$5', duration: '10 min' },
  { category: 'Add-ons', name: '15 Minutes Massage Foots', price: '$20', duration: '15 min' },
  { category: 'Add-ons', name: '15 Minutes Massage Neck Shoulder', price: '$20', duration: '15 min' },
];

export function formatBookingServiceLabel(service: BookingService) {
  return service.price ? `${service.name} — ${service.price}` : service.name;
}

export function findBookingServiceByName(name?: string | null) {
  if (!name) return undefined;
  const normalized = name.trim().toLowerCase();
  return bookingServices.find((s) => s.name.trim().toLowerCase() === normalized);
}

export function parseBookingServicePrice(price?: string) {
  if (!price) return null;
  const normalized = price.replace(/[^0-9.]/g, '');
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function estimateBookingServicesTotal(services: BookingService[]) {
  const values = services
    .map((s) => parseBookingServicePrice(s.price))
    .filter((v): v is number => typeof v === 'number');

  if (values.length === 0) return null;
  return values.reduce((acc, v) => acc + v, 0);
}
