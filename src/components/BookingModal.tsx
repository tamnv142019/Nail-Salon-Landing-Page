import { X, Calendar, Clock, User, Mail, Phone, Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Calendar component
function CalendarSelector({ value, onChange, minDate }: { value: string; onChange: (date: string) => void; minDate: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(value || new Date()));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    const minDateObj = new Date(minDate);
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    if (newDate >= minDateObj) {
      setCurrentMonth(newDate);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleSelectDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateStr = date.toISOString().split('T')[0];
    onChange(dateStr);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const days: (number | null)[] = Array(firstDayOfMonth).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const monthName = currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const selectedDateObj = value ? new Date(value) : null;
  const minDateObj = new Date(minDate);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg text-gray-900 dark:text-white font-semibold">{monthName}</h4>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
          >
            <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
          >
            <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm text-gray-600 dark:text-gray-400 font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const dateStr = date.toISOString().split('T')[0];
          const isSelected = selectedDateObj && dateStr === value;
          const isDisabled = date < minDateObj;
          const isToday = dateStr === new Date().toISOString().split('T')[0];

          return (
            <button
              key={day}
              type="button"
              onClick={() => !isDisabled && handleSelectDate(day)}
              disabled={isDisabled}
              className={`py-2 px-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md'
                  : isToday
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700'
                  : isDisabled
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected date display */}
      {value && (
        <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Selected:</p>
          <p className="text-gray-900 dark:text-white font-semibold">
            {new Date(value).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  );
}

const services = [
  { id: 'classic', name: 'Classic Manicure', price: 35, duration: 45 },
  { id: 'gel', name: 'Gel Manicure', price: 55, duration: 60 },
  { id: 'pedicure', name: 'Spa Pedicure', price: 65, duration: 75 },
  { id: 'art', name: 'Nail Art Design', price: 75, duration: 90 },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM',
];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
      });
      onClose();
    }, 3000);
  };

  const selectedService = services.find(s => s.id === formData.service);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-rose-500 to-purple-600 px-8 py-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <X className="text-white" size={20} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-white" size={28} />
            <h2 className="text-3xl text-white">Book Your Appointment</h2>
          </div>
          <p className="text-white/90 mt-2">Experience luxury nail care</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 dark:bg-gray-800">
          <div className="flex">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 transition-all duration-500 ${
                  s <= step ? 'bg-gradient-to-r from-rose-500 to-purple-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
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
                Your appointment for {selectedService?.name} is scheduled for
              </p>
              <p className="text-gray-900 dark:text-white mt-2">
                {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {formData.time}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                A confirmation email has been sent to {formData.email}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                  <h3 className="text-xl text-gray-900 dark:text-white mb-6">Personal Information</h3>
                  
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

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Mail size={18} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

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
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Select Service */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                  <h3 className="text-xl text-gray-900 dark:text-white mb-6">Select Service</h3>
                  
                  <div className="grid gap-4">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.service === service.id
                            ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                            : 'border-gray-300 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-700 bg-white dark:bg-gray-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={formData.service === service.id}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <h4 className="text-gray-900 dark:text-white mb-1">{service.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {service.duration} min
                            </span>
                            <span className="text-rose-600 dark:text-rose-400">
                              ${service.price}
                            </span>
                          </div>
                        </div>
                        {formData.service === service.id && (
                          <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                            <Check className="text-white" size={16} />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-500">
                  <h3 className="text-xl text-gray-900 dark:text-white mb-6">Choose Date & Time</h3>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                      <Calendar size={18} />
                      Select Date
                    </label>
                    <CalendarSelector 
                      value={formData.date} 
                      onChange={(date) => setFormData({ ...formData, date })}
                      minDate={getTodayDate()}
                    />
                  </div>

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
                          onClick={() => setFormData({ ...formData, time })}
                          className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            formData.time === time
                              ? 'border-rose-500 bg-rose-500 text-white'
                              : 'border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-rose-300 dark:hover:border-rose-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                      (step === 2 && !formData.service)
                    }
                    className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData.date || !formData.time}
                    className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}