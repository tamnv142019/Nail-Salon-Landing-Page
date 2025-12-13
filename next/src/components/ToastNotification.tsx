import { useEffect, useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export function ToastNotification({ message, type = 'success', duration = 2000 }: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  const Icon = type === 'success' ? Check : AlertCircle;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-3 rounded-full text-white shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300`}
      style={{ backgroundColor: type === 'success' ? '#ec4899' : type === 'error' ? '#ef4444' : '#3b82f6' }}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<ToastNotificationProps | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success', duration = 2000) => {
    setToast({ message, type, duration });
    setTimeout(() => setToast(null), duration);
  };

  return { toast, showToast };
}
