import { X, Calendar, Clock, User, Phone, Check, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const [formData, setFormData] = useState({
    name: '',
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

  const handleClose = () => {
    setSelectedDate('');
    setSelectedTime('');
    setIsSubmitted(false);
    setFormData({ name: '', phone: '' });
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-rose-500 to-purple-600 px-8 py-6">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <X className="text-white" size={20} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-white" size={28} />
            <h2 className="text-2xl text-white">Book Appointment</h2>
          </div>
          {preSelectedService && (
            <p className="text-white mt-1 text-sm">
              Service: <span className="font-semibold">{preSelectedService}</span>
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-600 dark:text-green-400" size={40} />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900 dark:text-white">Booking Confirmed!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Thank you, {formData.name}!
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Your appointment for <span className="font-semibold">{preSelectedService}</span> is scheduled for
              </p>
              <p className="text-gray-900 dark:text-white mt-2">
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                We'll call you at {formData.phone} to confirm
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Phone size={18} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="(619) 224-5050"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Calendar size={18} />
                  Select Date
                </label>
                <input
                  type="date"
                  required
                  min={getTodayDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 text-gray-900 dark:text-white transition-all duration-300"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Clock size={18} />
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 text-sm ${
                        selectedTime === time
                          ? 'border-rose-500 bg-rose-500 text-white'
                          : 'border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-rose-300 dark:hover:border-rose-700'
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
                disabled={!formData.name || !formData.phone || !selectedDate || !selectedTime}
                className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
