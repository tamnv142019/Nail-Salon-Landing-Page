"use client";

import { X, Calendar, Clock, User, Phone, Check, Sparkles, Mail } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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

export function BookingModal({ isOpen, onClose, preSelectedService }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { t } = useLanguage();
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
  }, [isOpen]);

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
          service: preSelectedService || null,
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

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => handleClose()}
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div 
        className="relative w-full max-w-md sm:max-w-lg bg-card/85 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-border/60 ring-1 ring-inset ring-white/10 dark:ring-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - iOS Glass Style */}
        <div className="relative bg-linear-to-r from-brand-gold-soft to-brand-gold-muted px-4 py-4 sm:px-8 sm:py-6">
          <button
            onClick={handleClose}
            aria-label="Close booking modal"
            className="absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20 z-50 pointer-events-auto"
          >
            <X className="text-foreground" size={20} />
          </button>

              <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 dark:bg-white/6 shadow-sm border border-white/10">
              <Sparkles className="text-rose-500 dark:text-rose-400" size={18} />
            </div>

            <div className="text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-rose-500 dark:text-rose-400 drop-shadow-sm">
                {t('booking.title', 'Book Appointment')}
              </h2>
              <p className="text-xs sm:text-sm text-foreground mt-1 opacity-90 max-w-[20rem]">
                {t('booking.subtitle', 'Choose a date and time. We will confirm via phone or email.')}
              </p>
            </div>
          </div>

          {preSelectedService && (
            <p className="text-brand-dark/90 mt-1 text-sm">
              {t('booking.selectService', 'Service')}: <span className="font-semibold">{preSelectedService}</span>
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-brand-emerald/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-emerald/20">
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
              <p className="text-sm text-foreground mt-6">
                We'll call you at {formData.phone} to confirm
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                  <label className="text-foreground mb-1 flex items-center gap-2 font-medium text-sm">
                    <User className="text-blue-500" size={16} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-background/60 backdrop-blur-xl border border-border/60 focus:outline-none focus:border-brand-gold/60 text-foreground placeholder:text-foreground transition-all duration-300 text-sm"
                    placeholder="Enter your name"
                  />
              </div>

              {/* Email */}
              <div>
                <label className="text-foreground mb-1 flex items-center gap-2 font-medium text-sm">
                  <Mail className="text-teal-500" size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-background/60 backdrop-blur-xl border border-border/60 focus:outline-none focus:border-brand-gold/60 text-foreground placeholder:text-foreground transition-all duration-300 text-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-foreground mb-1 flex items-center gap-2 font-medium text-sm">
                  <Phone className="text-emerald-500" size={16} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-background/60 backdrop-blur-xl border border-border/60 focus:outline-none focus:border-brand-gold/60 text-foreground placeholder:text-foreground transition-all duration-300 text-sm"
                  placeholder="(619) 224-5050"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-foreground mb-2 flex items-center gap-2 font-semibold">
                  <Calendar className="text-[color:var(--brand-gold)]" size={18} />
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={getTodayDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    ref={dateInputRef}
                    data-native-picker="date"
                    className="w-full px-4 py-3 pr-10 rounded-xl sm:rounded-2xl bg-background/60 hover:bg-background/70 backdrop-blur-xl border border-border/60 focus:outline-none focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/20 text-foreground transition-all duration-300 text-sm"
                  />
                  <button
                    type="button"
                    aria-label={t('booking.openDatePicker', 'Open date picker')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg text-foreground hover:bg-black/5 dark:text-brand-light/90 dark:hover:bg-white/10 transition"
                    onClick={() => {
                      const input = dateInputRef.current;
                      if (!input) return;
                      // Chrome/Edge support showPicker(); others will just focus.
                      (input as any).showPicker?.();
                      input.focus();
                    }}
                  >
                    <Calendar className="text-amber-500" aria-hidden="true" size={16} />
                  </button>
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="text-foreground mb-2 flex items-center gap-2 font-semibold">
                  <Clock className="text-[color:var(--brand-ruby)]" size={18} />
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
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
                        onClick={() => { if (!isDisabled) setSelectedTime(time); }}
                        disabled={isDisabled}
                        aria-disabled={isDisabled}
                        className={`px-3 py-2 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-xs sm:text-sm backdrop-blur-xl ${
                          isDisabled
                            ? 'opacity-50 cursor-not-allowed border-border/40 bg-background/40 text-foreground'
                            : selectedTime === time
                            ? 'border-brand-gold bg-btn-accent text-btn-theme-foreground shadow-sm'
                            : 'border-border/60 bg-background/50 text-foreground hover:border-brand-gold/40 hover:bg-background/60'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.phone || !selectedDate || !selectedTime || isSending}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-lg sm:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl backdrop-blur-xl cursor-pointer bg-[image:var(--gradient-primary-action)] text-[color:var(--gold-champagne)] hover:scale-102 active:brightness-95 text-sm"
              >
                {isSending ? 'Sending...' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}