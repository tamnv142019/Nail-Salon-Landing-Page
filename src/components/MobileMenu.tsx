import { X, Calendar } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment?: () => void;
  onNavigateToServices?: () => void;
}

export function MobileMenu({ isOpen, onClose, onBookAppointment, onNavigateToServices }: MobileMenuProps) {
  if (!isOpen) return null;

  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[99] md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <X className="text-gray-900 dark:text-white" size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 mb-8">
            {[
              { label: 'Services', href: '#services' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'Reviews', href: '#testimonials' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="w-full text-left px-6 py-4 rounded-2xl text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Book Button */}
          <button
            onClick={() => {
              onClose();
              onBookAppointment?.();
              onNavigateToServices?.();
            }}
            className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
          >
            <Calendar size={20} />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
}