"use client";

import { X, Calendar, Clock, User, Phone, Check, Sparkles, Mail } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { bookingServices, findBookingServiceByName, formatBookingServiceLabel, estimateBookingServicesTotal } from '../config/booking-services';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM',
];

const getBusinessWindowMinutes = (weekday: number): { start: number; end: number } | null => {
  // Business hours (San Diego):
  // - Mon–Fri: 09:00–19:00
  // - Sat:     09:00–18:00
  // - Sun:     10:00–17:00
  if (weekday >= 1 && weekday <= 5) return { start: 9 * 60, end: 19 * 60 };
  if (weekday === 6) return { start: 9 * 60, end: 18 * 60 };
  if (weekday === 0) return { start: 10 * 60, end: 17 * 60 };
  return null;
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function BookingModal({ isOpen, onClose, preSelectedService }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { t } = useLanguage();
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const categories = useMemo(
    () => (['Consultation', 'Combo', 'Manicure', 'Pedicure', 'Waxing', 'Powder', 'Add-ons'] as const),
    []
  );

  const getCategoryAccent = (category: (typeof categories)[number]) => {
    // Keep accents in sync with ServicesPage getServiceAccent()
    switch (category) {
      case 'Consultation':
        return {
          item: 'border-l-4 border-l-border',
          header: 'text-foreground/70',
          selected:
            'bg-btn-accent/25 dark:bg-btn-accent/15 border-brand-gold-muted/40 dark:border-brand-gold/40',
        };
      case 'Combo':
        return {
          item: 'border-l-4 border-l-lime-500',
          header: 'text-lime-700 dark:text-lime-300',
          selected:
            'bg-btn-accent/25 dark:bg-btn-accent/15 border-brand-gold-muted/40 dark:border-brand-gold/40',
        };
      case 'Manicure':
        return {
          item: 'border-l-4 border-l-rose-500',
          header: 'text-rose-600 dark:text-rose-300',
          selected:
            'bg-btn-accent/25 dark:bg-btn-accent/15 border-brand-gold-muted/40 dark:border-brand-gold/40',
        };
      case 'Pedicure':
        return {
          item: 'border-l-4 border-l-emerald-500',
          header: 'text-emerald-600 dark:text-emerald-300',
          selected:
            'bg-btn-accent/25 dark:bg-btn-accent/15 border-brand-gold-muted/40 dark:border-brand-gold/40',
        };
      case 'Powder':
        return {
          item: 'border-l-4 border-l-violet-500',
          header: 'text-violet-600 dark:text-violet-300',
          selected:
            'bg-btn-accent/25 dark:bg-btn-accent/15 border-brand-gold-muted/40 dark:border-brand-gold/40',
        };
      case 'Add-ons':
        return {
          item: 'border-l-4 border-l-amber-500',
          header: 'text-amber-700 dark:text-amber-300',
          selected:
            'bg-btn-accent/25 dark:bg-btn-accent/15 border-brand-gold-muted/40 dark:border-brand-gold/40',
        };
      case 'Waxing':
        return {
          item: 'border-l-4 border-l-sky-500',
          header: 'text-sky-600 dark:text-sky-300',
          selected:
            'bg-btn-accent/25 dark:bg-btn-accent/15 border-brand-gold-muted/40 dark:border-brand-gold/40',
        };
      default:
        return {
          item: 'border-l-4 border-l-border',
          header: 'text-foreground/70',
          selected:
            'bg-btn-accent/25 dark:bg-btn-accent/15 border-brand-gold-muted/40 dark:border-brand-gold/40',
        };
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedDate(getTodayDate());
      setSelectedTime('');
      const pre = findBookingServiceByName(preSelectedService);
      const preName = (pre?.name || (preSelectedService || '')).trim();
      setSelectedServices(preName ? [preName] : []);
      setStep(preName ? 2 : 1);
      // mark booking modal open for other UI to react (e.g., floating buttons)
      try {
        (document.body.dataset as any).bookingOpen = 'true';
        (document.body.dataset as any).modalOpen = 'true';
      } catch (e) {}
    } else {
      document.body.style.overflow = 'unset';
      try {
        delete (document.body.dataset as any).bookingOpen;
        delete (document.body.dataset as any).modalOpen;
      } catch (e) {}
    }
    return () => {
      document.body.style.overflow = 'unset';
      try {
        delete (document.body.dataset as any).bookingOpen;
        delete (document.body.dataset as any).modalOpen;
      } catch (e) {}
    };
  }, [isOpen, preSelectedService]);

  const isDetailsComplete = Boolean(
    formData.name &&
      formData.email &&
      formData.phone &&
      selectedDate &&
      selectedTime
  );

  const selectedServiceObjs = bookingServices.filter((s) => selectedServices.includes(s.name));
  const total = estimateBookingServicesTotal(selectedServiceObjs);
  const selectedSummary = (() => {
    if (selectedServiceObjs.length === 0) return '';
    const firstTwo = selectedServiceObjs.slice(0, 2).map((s) => s.name);
    const remaining = selectedServiceObjs.length - firstTwo.length;
    return remaining > 0 ? `${firstTwo.join(', ')} +${remaining}` : firstTwo.join(', ');
  })();

  const canGoNext = (() => {
    if (step === 1) return selectedServices.length > 0;
    if (step === 2) return Boolean(selectedDate && selectedTime);
    return isDetailsComplete;
  })();

  const toggleService = (name: string, checked?: boolean) => {
    setSelectedServices((prev) => {
      const exists = prev.includes(name);
      const shouldAdd = typeof checked === 'boolean' ? checked : !exists;
      if (shouldAdd && !exists) return [...prev, name];
      if (!shouldAdd && exists) return prev.filter((n) => n !== name);
      return prev;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setSelectedDate('');
    setSelectedTime('');
    setSelectedServices([]);
    setIsSubmitted(false);
    setStep(1);
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: selectedDate,
          time: selectedTime,
          // Backward-compatible single service (first selected)
          service: selectedServiceObjs[0]?.name || null,
          servicePrice: selectedServiceObjs[0]?.price || null,
          // Preferred multi-service payload
          services: selectedServiceObjs.map((s) => ({ name: s.name, price: s.price || null })),
          servicesTotal: typeof total === 'number' ? total : null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to send booking');
      }

      setIsSubmitted(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Booking submission error', error);
      alert('Could not complete booking. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => handleClose()}
      className="fixed inset-0 z-999999 flex items-stretch sm:items-center justify-center p-0 sm:p-4 bg-black/55 animate-in fade-in duration-200 overflow-hidden"
    >
      <div 
        className="relative w-full max-w-none sm:max-w-6xl sm:w-[min(96vw,72rem)] bg-background/95 dark:bg-card/90 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border-0 sm:border sm:border-border/40 ring-0 sm:ring-1 sm:ring-inset sm:ring-(--glass-ring) h-full sm:h-[92vh] max-h-full sm:max-h-[98vh] flex flex-col min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (green / wizard) */}
        <div className="sticky top-0 z-20">
          <div className="relative overflow-hidden border-b border-border/20">
            <div
              className="pointer-events-none absolute inset-0 opacity-95"
              style={{ background: 'var(--gradient-primary-action)' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/0 via-black/10 to-black/35" />

            <div className="relative px-4 sm:px-6 py-3 sm:py-6 text-(--on-image-foreground)">
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-3">
                <div className="flex items-start">
                  <div className="flex items-center justify-center size-8 sm:size-10 rounded-xl bg-(--glass-on-image-bg) backdrop-blur-xl border border-(--glass-on-image-border) ring-1 ring-inset ring-(--glass-ring) shadow-sm">
                    <Calendar size={16} className="text-(--on-image-foreground)" />
                  </div>
                </div>

                <div className="min-w-0 text-center">
                  <h2 className="text-xl sm:text-4xl font-semibold leading-tight tracking-tight">
                    {t('booking.title', 'Book Your Appointment')}
                  </h2>
                  <p className="mt-0.5 hidden sm:block text-base text-(--on-image-foreground-muted)">
                    {t('booking.subtitle', 'Experience luxury nail care')}
                  </p>
                </div>

                <div className="flex items-start justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label={t('booking.close', 'Close')}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-(--glass-on-image-bg) backdrop-blur-xl border border-(--glass-on-image-border) text-(--on-image-foreground) hover:bg-(--glass-on-image-bg-hover) transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Stepper */}
              <div className="mt-3 sm:mt-6 flex items-center gap-2 sm:gap-4 max-w-4xl mx-auto">
                {[1, 2, 3].map((n) => {
                  const isActive = step === n;
                  const isDone = step > n;
                  const label =
                    n === 1
                      ? t('booking.step1', 'Select Service')
                      : n === 2
                        ? t('booking.step2', 'Choose Date and Time')
                        : t('booking.step3', 'Your Information');

                  return (
                    <div key={n} className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div
                        className={
                          `size-8 sm:size-10 rounded-full flex items-center justify-center text-xs sm:text-base font-semibold border transition ` +
                          (isActive
                            ? 'bg-brand-gold text-brand-dark border-transparent'
                            : isDone
                              ? 'bg-(--glass-on-image-bg) text-(--on-image-foreground) border-(--glass-on-image-border)'
                              : 'bg-(--glass-on-image-bg) text-(--on-image-foreground-muted) border-(--glass-on-image-border)')
                        }
                      >
                        {n}
                      </div>
                      <div className="min-w-0">
                        <div
                          className={
                            `text-xs sm:text-sm leading-tight ` +
                            (isActive ? 'text-(--on-image-foreground)' : 'text-(--on-image-foreground-muted)')
                          }
                        >
                          {label}
                        </div>
                      </div>
                      {n < 3 ? (
                        <div className="h-0.5 flex-1 bg-(--glass-on-image-border) rounded-full opacity-80" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="flex-1 min-h-0 overflow-y-auto sm:bg-background/35 sm:dark:bg-card/25 px-4 sm:px-6 py-4 sm:py-6">
            <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-emerald/20">
                <Check className="text-brand-emerald" size={40} />
              </div>
              <h3 className="text-2xl mb-4 text-foreground">{t('booking.successTitle', 'Booking Confirmed!')}</h3>
              <p className="text-foreground mb-2">
                {t('common.thankYou', 'Thank you')}, {formData.name}!
              </p>
              <p className="text-foreground">
                {t('booking.successMessage', 'Your appointment has been successfully booked.')}
              </p>
              <p className="text-foreground mt-2">
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}
              </p>
              {selectedServiceObjs.length > 0 && (
                <p className="text-sm text-foreground mt-3">
                  {t('booking.selectService', 'Service')}: {selectedServiceObjs.map((s) => formatBookingServiceLabel(s)).join(', ')}
                </p>
              )}
              <p className="text-sm text-foreground mt-6">
                We'll call you at {formData.phone} to confirm
              </p>
            </div>
          </div>
        ) : (
          <form id="booking-form" onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col">
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain sm:bg-background/35 sm:dark:bg-card/25 px-4 sm:px-8 py-3 sm:py-8">
              {/* Step 1: Services */}
              {step === 1 ? (
                <div className="rounded-xl sm:rounded-2xl border border-border bg-background p-4 sm:p-7 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="text-brand-gold" size={18} />
                        {t('booking.selectService', 'Select Service')}
                      </h3>
                      <p className="mt-1 text-sm text-foreground/70">
                        {t('booking.selectServiceHint', 'Choose one or more services to book.')}
                      </p>
                    </div>
                    {selectedServices.length > 0 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedServices([])}
                        className="h-9"
                      >
                        {t('booking.clear', 'Clear')}
                      </Button>
                    ) : null}
                  </div>

                  <div className="mt-4 max-h-[min(72vh,44rem)] sm:max-h-[min(60vh,36rem)] overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable]">
                    {categories.map((category) => {
                      const items = bookingServices.filter((s) => s.category === category);
                      if (items.length === 0) return null;

                      const accent = getCategoryAccent(category);

                      return (
                        <div
                          key={category}
                          className="space-y-3 [content-visibility:auto] [contain-intrinsic-size:1px_280px]"
                        >
                          <div className={`text-xs font-semibold uppercase tracking-wide ${accent.header}`}>
                            {category}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {items.map((service) => {
                              const checked = selectedServices.includes(service.name);

                              return (
                                <button
                                  key={service.name}
                                  type="button"
                                  onClick={() => toggleService(service.name)}
                                  className={
                                    `group w-full flex items-center justify-between gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-left border transition-all duration-200 ${accent.item} ` +
                                    (checked
                                      ? `${accent.selected}`
                                      : 'bg-secondary/20 border-border/60 shadow-sm hover:bg-secondary/60 dark:hover:bg-secondary/60')
                                  }
                                  aria-pressed={checked}
                                >
                                  <span className="min-w-0">
                                    <span className="flex items-center gap-2 flex-wrap min-w-0">
                                      <span
                                        className={
                                          `text-sm sm:text-lg font-semibold truncate transition-colors duration-200 ` +
                                          (checked
                                            ? 'text-foreground'
                                            : 'text-foreground group-hover:text-brand-gold-muted dark:group-hover:text-brand-gold')
                                        }
                                      >
                                        {service.name}
                                      </span>

                                      {service.bestSeller ? (
                                        <img
                                          src="/images/badges/best-seller-badge.svg"
                                          alt={t('servicesPage.bestSellerTag', 'Best Seller')}
                                          className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                                          loading="lazy"
                                        />
                                      ) : null}

                                      {service.sale ? (
                                        <span className="bg-linear-to-r from-pink-500 to-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm animate-pulse">
                                          {t('servicesPage.saleTag', 'SALE')}
                                        </span>
                                      ) : null}
                                    </span>
                                  </span>
                                  <span className="shrink-0 flex items-center gap-2 sm:gap-3">
                                    <span className="text-right whitespace-nowrap shrink-0">
                                      {service.price ? (
                                        <div className="text-sm sm:text-lg font-bold" style={{ color: 'oklch(.592 .249 .584)' }}>
                                          {service.price}
                                        </div>
                                      ) : null}
                                      {service.duration ? (
                                        <div className="text-[11px] sm:text-sm text-foreground mt-0.5">{service.duration}</div>
                                      ) : null}
                                    </span>
                                    {checked ? (
                                      <span className="inline-flex items-center justify-center size-5 sm:size-6 rounded-full bg-btn-accent shadow-sm">
                                        <Check size={14} className="text-btn-theme-foreground" />
                                      </span>
                                    ) : null}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs sm:text-sm text-foreground/75">
                    <span>
                      {t('booking.selected', 'Selected')}: <span className="font-medium text-foreground">{selectedServices.length}</span>
                    </span>
                    {typeof total === 'number' ? (
                      <span>
                        {t('booking.estimatedTotal', 'Estimated total')}: <span className="font-medium text-foreground">${total.toFixed(0)}</span>
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* Step 2: Date and Time */}
              {step === 2 ? (
                <div className="rounded-xl sm:rounded-2xl border border-border bg-background p-4 sm:p-7 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-base sm:text-xl font-semibold text-foreground">
                      {t('booking.chooseDateTime', 'Choose Date and Time')}
                    </h3>
                    {selectedServiceObjs.length > 0 ? (
                      <p className="mt-1 text-sm text-foreground/70">
                        {t('booking.selectService', 'Service')}: <span className="font-medium text-foreground">{selectedSummary}</span>
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-foreground/85">
                      <Calendar className="text-brand-gold" size={18} />
                      {t('booking.selectDate', 'Select Date')}
                    </Label>
                    <div className="relative">
                      <Input
                        type="date"
                        required
                        min={getTodayDate()}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        ref={dateInputRef}
                        data-native-picker="date"
                        className="h-12 sm:h-14 rounded-xl pr-10 text-base"
                      />
                      <button
                        type="button"
                        aria-label={t('booking.openDatePicker', 'Open date picker')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-accent transition"
                        onClick={() => {
                          const input = dateInputRef.current;
                          if (!input) return;
                          (input as any).showPicker?.();
                          input.focus();
                        }}
                      >
                        <Calendar className="text-foreground/80" aria-hidden="true" size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-foreground/85">
                      <Clock className="text-brand-ruby" size={18} />
                      {t('booking.selectTime', 'Select Time')}
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.map((time) => {
                        const isDisabled = (() => {
                          if (!selectedDate) return false;
                          try {
                            const m = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
                            if (!m) return false;
                            let hr = parseInt(m[1], 10);
                            const min = parseInt(m[2], 10);
                            const ampm = m[3].toUpperCase();
                            if (ampm === 'PM' && hr !== 12) hr += 12;
                            if (ampm === 'AM' && hr === 12) hr = 0;
                            const parts = selectedDate.split('-').map(Number);
                            if (parts.length !== 3) return false;
                            const [y, mo, d] = parts;

                            const weekday = new Date(y, mo - 1, d).getDay();
                            const window = getBusinessWindowMinutes(weekday);
                            if (window) {
                              const timeInMinutes = hr * 60 + min;
                              if (timeInMinutes < window.start || timeInMinutes >= window.end) return true;
                            }

                            const slotDate = new Date(y, mo - 1, d, hr, min, 0, 0);
                            const now = new Date();
                            return slotDate <= now;
                          } catch (e) {
                            return false;
                          }
                        })();

                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => {
                              if (!isDisabled) setSelectedTime(time);
                            }}
                            disabled={isDisabled}
                            aria-disabled={isDisabled}
                            className={`h-11 sm:h-12 px-3 rounded-xl border transition-colors text-sm sm:text-base ${
                              isDisabled
                                ? 'opacity-50 cursor-not-allowed border-border bg-background text-foreground'
                                : selectedTime === time
                                  ? 'border-brand-gold bg-accent text-accent-foreground'
                                  : 'border-border bg-background text-foreground hover:bg-accent'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Step 3: Your Information */}
              {step === 3 ? (
                <div className="rounded-xl sm:rounded-2xl border border-border bg-background p-4 sm:p-7 shadow-sm space-y-5">
                  <div>
                    <h3 className="text-base sm:text-xl font-semibold text-foreground">
                      {t('booking.yourInfo', 'Your Information')}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/70">
                      {t('booking.infoHint', 'We will confirm your appointment by phone or email.')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-foreground/85">
                      <User className="text-blue-500" size={16} />
                      {t('booking.yourName', 'Your Name')}
                    </Label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 sm:h-14 rounded-xl text-base"
                      placeholder={t('booking.yourName', 'Your Name')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-foreground/85">
                      <Mail className="text-teal-500" size={16} />
                      {t('booking.yourEmail', 'Your Email')}
                    </Label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 sm:h-14 rounded-xl text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-foreground/85">
                      <Phone className="text-emerald-500" size={16} />
                      {t('booking.yourPhone', 'Your Phone')}
                    </Label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 sm:h-14 rounded-xl text-base"
                      placeholder="(619) 224-5050"
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Fixed footer (always visible) */}
            <div className="shrink-0 border-t border-border/40 bg-background/90 dark:bg-card/85 px-4 sm:px-8 py-3 sm:py-4 pb-[env(safe-area-inset-bottom)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                <div className="text-xs sm:text-base text-foreground/80">
                  {selectedServiceObjs.length > 0 ? (
                    <span>
                      {selectedSummary}
                      {selectedDate && selectedTime ? ` • ${selectedDate} • ${selectedTime}` : ''}
                    </span>
                  ) : (
                    <span>{selectedDate && selectedTime ? `${selectedDate} • ${selectedTime}` : t('booking.chooseDetails', 'Choose service, date, and time')}</span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
                      className="w-full sm:w-auto h-11 sm:h-12 text-base"
                    >
                      {t('booking.back', 'Back')}
                    </Button>
                  ) : null}

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={() => {
                        if (!canGoNext) return;
                        setStep((s) => ((s + 1) as 1 | 2 | 3));
                      }}
                      disabled={!canGoNext}
                      size="lg"
                      className="w-full sm:w-auto h-11 sm:h-12 text-base rounded-full shadow-lg hover:shadow-2xl ring-1 ring-inset ring-(--glass-ring) transition-[transform,filter,box-shadow] duration-300 ease-out hover:-translate-y-0.5"
                    >
                      {t('booking.next', 'Next')}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!isDetailsComplete || isSending}
                      className="w-full sm:w-auto h-11 sm:h-12 text-base"
                    >
                      {isSending ? t('booking.sending', 'Sending...') : t('booking.bookBtn', 'Confirm Booking')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}