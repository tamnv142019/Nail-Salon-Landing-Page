import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Initial theme is applied by the inline script in RootLayout (before paint).
    // Here we only sync React state with the actual DOM class / persisted preference.
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.style.colorScheme = savedTheme;
      setTheme(savedTheme);
      setHasInitialized(true);
      return;
    }

    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme: Theme = systemPrefersLight ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    document.documentElement.style.colorScheme = initialTheme;
    setTheme(initialTheme);
    setHasInitialized(true);
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;

    // Enable smooth theme transitions only when the user changes theme.
    document.documentElement.classList.add('theme-transition');
    const timeout = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 200);

    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;

    return () => window.clearTimeout(timeout);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}