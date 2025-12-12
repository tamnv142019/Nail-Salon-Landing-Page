import { X, Calendar, Clock, User, Phone, Check, Sparkles, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 3000);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg bg-card/85 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-border/60 ring-1 ring-inset ring-white/10 dark:ring-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - iOS Glass Style */}
        <div className="relative bg-linear-to-r from-brand-gold to-brand-gold-muted px-8 py-6">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <X className="text-brand-dark" size={20} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-brand-dark" size={28} />
            <h2 className="text-2xl text-brand-dark">{t('booking.title', 'Book Appointment')}</h2>
          </div>
          {preSelectedService && (
            <p className="text-brand-dark/90 mt-1 text-sm">
              {t('booking.selectService', 'Service')}: <span className="font-semibold">{preSelectedService}</span>
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-brand-emerald/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-emerald/20">
                <Check className="text-brand-emerald" size={40} />
              </div>
              <h3 className="text-2xl mb-4 text-foreground">{t('booking.successTitle', 'Booking Confirmed!')}</h3>
              <p className="text-muted-foreground mb-2">
                {t('common.thankYou', 'Thank you')}, {formData.name}!
              </p>
              <p className="text-muted-foreground">
                {t('booking.successMessage', 'Your appointment has been successfully booked.')}
              </p>
              <p className="text-foreground mt-2">
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}
              </p>
              <p className="text-sm text-muted-foreground mt-6">
                We'll call you at {formData.phone} to confirm
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-foreground mb-2 flex items-center gap-2">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/60 focus:outline-none focus:border-brand-gold/60 text-foreground placeholder:text-muted-foreground transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-foreground mb-2 flex items-center gap-2">
                  <Mail size={18} />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/60 focus:outline-none focus:border-brand-gold/60 text-foreground placeholder:text-muted-foreground transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-foreground mb-2 flex items-center gap-2">
                  <Phone size={18} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/60 focus:outline-none focus:border-brand-gold/60 text-foreground placeholder:text-muted-foreground transition-all duration-300"
                  placeholder="(619) 224-5050"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-foreground mb-2 flex items-center gap-2">
                  <Calendar size={18} />
                  Select Date
                </label>
                <input
                  type="date"
                  required
                  min={getTodayDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/60 focus:outline-none focus:border-brand-gold/60 text-foreground transition-all duration-300"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-foreground mb-2 flex items-center gap-2">
                  <Clock size={18} />
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 text-sm backdrop-blur-xl cursor-pointer ${
                        selectedTime === time
                          ? 'border-brand-gold bg-brand-gold-soft text-brand-dark'
                          : 'border-border/60 bg-background/50 text-foreground hover:border-brand-gold/40'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.phone || !selectedDate || !selectedTime}
                className="w-full px-6 py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl backdrop-blur-xl cursor-pointer bg-brand-gold-soft hover:bg-brand-gold-muted text-brand-dark dark:bg-brand-gold-soft dark:hover:bg-brand-gold dark:text-white"
              >
                Confirm Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}