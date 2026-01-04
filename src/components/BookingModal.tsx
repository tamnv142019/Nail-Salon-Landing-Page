"use client";

import { X, Calendar, Clock, User, Phone, Check, Sparkles, Mail, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { bookingServices, findBookingServiceByName, formatBookingServiceLabel, estimateBookingServicesTotal } from '../config/booking-services';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useIsMobile } from './ui/use-mobile';

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
  const isMobile = useIsMobile();
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [servicesOpen, setServicesOpen] = useState(true);
  const serviceSectionRef = useRef<HTMLDivElement | null>(null);
  const serviceDropdownRef = useRef<HTMLDivElement | null>(null);
  const contentScrollRef = useRef<HTMLDivElement | null>(null);
  const [mobileStep, setMobileStep] = useState<'details' | 'services'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedDate(getTodayDate());
      setSelectedTime('');
      setMobileStep('details');
      const pre = findBookingServiceByName(preSelectedService);
      const preName = (pre?.name || (preSelectedService || '')).trim();
      setSelectedServices(preName ? [preName] : []);
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

  useEffect(() => {
    if (!isOpen) return;
    if (isMobile) {
      setServicesOpen(mobileStep === 'services');
      return;
    }
    setServicesOpen(true);
  }, [isOpen, isMobile, mobileStep]);

  useEffect(() => {
    if (!isOpen) return;
    if (!servicesOpen) return;
    if (!isMobile) return;
    if (mobileStep !== 'services') return;

    const triggerEl = serviceSectionRef.current;
    const dropdownEl = serviceDropdownRef.current;
    const container = contentScrollRef.current;
    if (!triggerEl || !container) return;

    // Wait for Radix collapsible animation to lay out, then scroll within modal content.
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const triggerRect = triggerEl.getBoundingClientRect();
        const dropdownRect = dropdownEl?.getBoundingClientRect();

        const paddingTop = 12;
        const paddingBottom = 16;

        const triggerTop = triggerRect.top - containerRect.top;
        const triggerBottom = triggerRect.bottom - containerRect.top;
        const dropdownBottom = dropdownRect ? dropdownRect.bottom - containerRect.top : triggerBottom;

        // Only adjust scroll when the expanded dropdown would be clipped.
        if (dropdownBottom > containerRect.height - paddingBottom) {
          const deltaDown = dropdownBottom - (containerRect.height - paddingBottom);
          container.scrollTo({ top: container.scrollTop + deltaDown, behavior: 'smooth' });
          return;
        }

        if (triggerTop < paddingTop) {
          const deltaUp = paddingTop - triggerTop;
          container.scrollTo({ top: Math.max(0, container.scrollTop - deltaUp), behavior: 'smooth' });
        }
      });
    });

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [isOpen, servicesOpen, isMobile, mobileStep]);

  const selectedServiceObjs = bookingServices.filter((s) => selectedServices.includes(s.name));
  const total = estimateBookingServicesTotal(selectedServiceObjs);
  const selectedSummary = (() => {
    if (selectedServiceObjs.length === 0) return '';
    const firstTwo = selectedServiceObjs.slice(0, 2).map((s) => s.name);
    const remaining = selectedServiceObjs.length - firstTwo.length;
    return remaining > 0 ? `${firstTwo.join(', ')} +${remaining}` : firstTwo.join(', ');
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

  const handleClose = () => {
    setSelectedDate('');
    setSelectedTime('');
    setSelectedServices([]);
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  };

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
      setTimeout(() => {
        handleClose();
      }, 3000);
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
      className="fixed inset-0 z-10000 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/55 backdrop-blur-sm animate-in fade-in duration-200 overflow-hidden"
    >
      <div 
        className="relative w-full max-w-6xl sm:w-[min(96vw,72rem)] bg-background/80 dark:bg-card/70 backdrop-blur-xl rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border/40 ring-1 ring-inset ring-(--glass-ring) h-dvh supports-[height:100svh]:h-svh sm:h-[92vh] max-h-dvh sm:max-h-[98vh] flex flex-col min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Material / Clean */}
        <div className="sticky top-0 z-20 border-b border-border/40 bg-background/70 dark:bg-card/60 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-(--glass-top-from) via-(--glass-top-via) to-transparent" />
          <div className="relative flex items-start justify-between gap-3 px-4 sm:px-6 py-3 sm:py-5">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-9 sm:size-10 rounded-xl bg-background/60 dark:bg-card/40 backdrop-blur-xl border border-border/40 ring-1 ring-inset ring-(--glass-ring) shadow-sm shrink-0">
                  <Sparkles size={18} className="text-foreground/90" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-3xl font-semibold text-foreground leading-tight">
                    {t('booking.title', 'Book Appointment')}
                  </h2>
                  <p className="hidden sm:block text-sm sm:text-base text-foreground/70">
                    {t('booking.subtitle', 'Choose a service, date, and time. We will confirm by phone or email.')}
                  </p>
                </div>
              </div>

              {(selectedServiceObjs.length > 0 || preSelectedService) && (
                <p className="mt-2 hidden sm:block text-sm text-foreground/75">
                  {t('booking.selectService', 'Service')}: <span className="font-medium text-foreground">{selectedServiceObjs.length > 0 ? selectedSummary : preSelectedService}</span>
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClose}
              aria-label={t('booking.close', 'Close')}
              className="rounded-xl bg-background/40 dark:bg-card/30 backdrop-blur-xl border border-border/40 hover:bg-background/60 dark:hover:bg-card/45"
            >
              <X />
            </Button>
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
            <div ref={contentScrollRef} className="flex-1 min-h-0 overflow-y-auto sm:bg-background/35 sm:dark:bg-card/25 px-4 sm:px-8 py-4 sm:py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                <div className="rounded-xl sm:rounded-2xl border border-border bg-background p-4 sm:p-7 space-y-4 sm:space-y-5 shadow-sm">
                  <h3 className="text-sm sm:text-lg font-semibold text-foreground">{t('booking.yourDetails', 'Your Details')}</h3>

                  {/* Name */}
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

                  {/* Email */}
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

                  {/* Phone */}
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

                <div className="rounded-xl sm:rounded-2xl border border-border bg-background p-4 sm:p-7 space-y-4 sm:space-y-5 shadow-sm">
                  <h3 className="text-sm sm:text-lg font-semibold text-foreground">{t('booking.appointmentDetails', 'Appointment Details')}</h3>

                  {/* Service */}
                  <div className="space-y-2">
                    <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                      <div ref={serviceSectionRef} className="flex items-center justify-between gap-3 scroll-mt-24">
                        <CollapsibleTrigger asChild>
                          <button
                            type="button"
                            className="flex flex-1 items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-accent transition-colors"
                            aria-label={t('booking.selectService', 'Select Service')}
                          >
                            <span className="flex items-center gap-2 text-foreground/85 min-w-0">
                              <Sparkles className="text-rose-500 dark:text-rose-400" size={16} />
                              <span className="truncate">{t('booking.selectService', 'Select Service')}</span>
                              {selectedServices.length > 0 ? (
                                <span className="text-xs text-foreground/70 shrink-0">
                                  ({selectedServices.length})
                                </span>
                              ) : null}
                            </span>
                            <ChevronDown
                              className={`shrink-0 text-foreground/70 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                              size={18}
                              aria-hidden="true"
                            />
                          </button>
                        </CollapsibleTrigger>

                        {selectedServices.length > 0 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedServices([])}
                            className="h-8 px-2"
                          >
                            {t('booking.clear', 'Clear')}
                          </Button>
                        ) : null}
                      </div>

                      <CollapsibleContent>
                        <div ref={serviceDropdownRef} className="mt-2 rounded-xl border border-border bg-card">
                          <ScrollArea className="h-56 sm:h-96 w-full">
                            <div className="p-3 space-y-3">
                              {(['Consultation', 'Manicure', 'Pedicure', 'Waxing', 'Powder', 'Add-ons'] as const).map((category) => {
                                const items = bookingServices.filter((s) => s.category === category);
                                if (items.length === 0) return null;

                                return (
                                  <div key={category} className="space-y-2">
                                    <div className="text-xs font-semibold text-foreground/70 uppercase tracking-wide px-1">
                                      {category}
                                    </div>
                                    <div className="space-y-1">
                                      {items.map((service) => {
                                        const id = `booking-service-${category}-${service.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                        const checked = selectedServices.includes(service.name);
                                        return (
                                          <div
                                            key={service.name}
                                            className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-accent transition-colors"
                                          >
                                            <div className="flex items-start gap-3 min-w-0">
                                              <Checkbox
                                                id={id}
                                                checked={checked}
                                                onCheckedChange={(v) => toggleService(service.name, v === true)}
                                              />
                                              <Label
                                                htmlFor={id}
                                                className="min-w-0 cursor-pointer text-base text-foreground"
                                              >
                                                <span className="block truncate">{service.name}</span>
                                              </Label>
                                            </div>
                                            <div className="shrink-0 text-base text-foreground/70">
                                              {service.price || ''}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </ScrollArea>
                        </div>
                      </CollapsibleContent>

                      <div className="flex items-center justify-between text-xs text-foreground/75">
                        <span>
                          {t('booking.selected', 'Selected')}: <span className="font-medium text-foreground">{selectedServices.length}</span>
                        </span>
                        {typeof total === 'number' ? (
                          <span>
                            {t('booking.estimatedTotal', 'Estimated total')}: <span className="font-medium text-foreground">${total.toFixed(0)}</span>
                          </span>
                        ) : null}
                      </div>
                    </Collapsible>
                  </div>

                  {/* Date */}
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

                  {/* Time */}
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
                            className={`h-11 sm:h-12 px-3 rounded-lg border transition-colors text-sm sm:text-base ${
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
              </div>
            </div>

            {/* Fixed footer (always visible) */}
            <div className="shrink-0 border-t border-border/40 bg-background/70 dark:bg-card/60 backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-4 pb-[env(safe-area-inset-bottom)]">
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
                  <Button type="button" variant="outline" onClick={handleClose} className="w-full sm:w-auto h-11 sm:h-12 text-base">
                    {t('booking.close', 'Close')}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!formData.name || !formData.email || !formData.phone || !selectedDate || !selectedTime || isSending}
                    className="w-full sm:w-auto h-11 sm:h-12 text-base"
                  >
                    {isSending ? t('booking.sending', 'Sending...') : t('booking.bookBtn', 'Confirm Booking')}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}