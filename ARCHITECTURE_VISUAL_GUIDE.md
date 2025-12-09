# Language System - Visual Architecture Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    LANGUAGE SYSTEM ARCHITECTURE                 │
└─────────────────────────────────────────────────────────────────┘

                          ┌──────────────────┐
                          │  User Component  │
                          │   (e.g., Hero)   │
                          └────────┬─────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
            ┌───────▼──────────┐      ┌──────────▼────────┐
            │ useLanguage()    │      │ useTranslation() │
            │ (LanguageContext)│      │(TranslationContext)
            └───────┬──────────┘      └──────────┬────────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼───────────────┐
                    │  Translation Function: t()   │
                    │  Returns: Translated String  │
                    └──────────────┬───────────────┘
                                   │
                    ┌──────────────▼───────────────┐
                    │ src/translations/index.ts    │
                    │                              │
                    │ • en (English)       🇺🇸    │
                    │ • vi (Vietnamese)    🇻🇳    │
                    │ • fr (French)        🇫🇷    │
                    │ • es (Spanish)       🇪🇸    │
                    │ • zh (Chinese)       🇨🇳    │
                    │                              │
                    │ 100+ keys per language       │
                    └──────────────────────────────┘
```

## Data Flow Diagram

```
User Selects Language
        │
        ▼
┌──────────────────────────┐
│ setLanguage('fr')        │
└────────────┬─────────────┘
             │
             ├─→ Update React State
             │
             ├─→ Save to localStorage
             │   localStorage.setItem('language', 'fr')
             │
             ├─→ Update HTML lang attribute
             │   document.documentElement.lang = 'fr'
             │
             └─→ Dispatch Event
                 new CustomEvent('languageChanged')
                       │
                       ▼
             Re-render all components
             using t('key') function
                       │
                       ▼
             Display French translations
                       │
                       ▼
              UI Updates in Real-time
```

## File Structure & Relationships

```
src/
├── translations/
│   └── index.ts ◄─────────────────────┐
│       ├── en: { ... }                │ Imports
│       ├── vi: { ... }                │
│       ├── fr: { ... }  ← NEW          │
│       ├── es: { ... }  ← NEW          │
│       ├── zh: { ... }                │
│       └── getTranslation() function  │
│                                       │
├── contexts/                          │
│   ├── LanguageContext.tsx ◄──────────┤
│   │   ├── useLanguage() hook         │
│   │   ├── LanguageProvider           │
│   │   └── Event dispatching          │
│   │                                  │
│   └── TranslationContext.tsx ◄───────┤
│       ├── useTranslation() hook      │
│       └── TranslationProvider        │
│                                      │
└── components/
    ├── LanguageSwitcher.tsx ──► uses useLanguage()
    ├── FloatingLanguageSwitcher.tsx ──► uses useTranslation()
    ├── LanguageSelector.tsx ──► uses useLanguage()
    │
    └── Other Components
        ├── Hero.tsx ──► uses t('hero.title1')
        ├── Services.tsx ──► uses t('services.heading')
        ├── Contact.tsx ──► uses t('contact.form.name')
        └── etc...
```

## Translation Lookup Flow

```
Component renders: {t('services.classicManicure.title')}
        │
        ▼
┌─────────────────────────────────────────┐
│ t('services.classicManicure.title')    │
│ translation('key') function called     │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ getTranslation('fr', key, defaultValue)│
│ Splits key by '.' → ['services',      │
│                       'classicManicure',│
│                       'title']          │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ Navigate nested object:                 │
│ translations['fr']                      │
│   ▼                                     │
│ ['services']                            │
│   ▼                                     │
│ ['classicManicure']                     │
│   ▼                                     │
│ ['title']                               │
│   ▼                                     │
│ "Manucure Classique"                    │
└────────────┬────────────────────────────┘
             │
             ▼
        Return String ✓
```

## Language Switching Sequence

```
Timeline of Language Change:

1. User clicks 🇫🇷 French button
   │
   ├─ LanguageSwitcher Component
   │  └─ handleLanguageChange('fr') called
   │
2. React State Update
   │
   ├─ setLanguage('fr') executed
   │  └─ Component re-renders with new language
   │
3. Side Effects (useEffect in LanguageContext)
   │
   ├─ localStorage.setItem('language', 'fr') ✓
   │  └─ Preference saved
   │
   ├─ document.documentElement.lang = 'fr' ✓
   │  └─ HTML updated: <html lang="fr">
   │
   ├─ window.dispatchEvent(languageChanged) ✓
   │  └─ Other components notified
   │
4. Translation Function Updates
   │
   ├─ t('hero.title1') now returns French text ✓
   │
5. UI Re-renders
   │
   ├─ All components using t() function update ✓
   │  └─ Display French content
   │
6. Browser Detects Change
   │
   ├─ Serializes layout for French (RTL aware)
   │  └─ Displays correctly
   │
7. Complete
   │
   └─ Page now fully in French ✓
```

## Storage Structure

```
Browser Storage
├── LocalStorage
│   └── language: "fr"
│       (Persists across browser sessions)
│
└── sessionStorage
    └── (Not used, but could be for temporary preference)

Browser State
├── document.documentElement.lang = "fr"
├── React State: language = 'fr'
└── Event Listeners: languageChanged event
```

## Translation Object Structure

```
translations = {
  en: {
    nav: {
      services: 'Services',
      gallery: 'Gallery',
      reviews: 'Reviews',
      contact: 'Contact'
    },
    hero: {
      badge: '✨ Premium...',
      title1: 'Discover Your',
      title2: 'Elegance',
      ...
    },
    services: {
      chapter: 'Chapter One',
      title: 'Your Perfect Service Awaits',
      classicManicure: {
        title: 'Classic Manicure',
        description: '...',
        price: '$35',
        duration: '45 min'
      },
      ...more services...
    },
    contact: {
      location: 'Location',
      phone: 'Phone',
      form: {
        name: 'Your Name',
        email: 'Email Address',
        ...
      }
    },
    booking: { ... },
    footer: { ... },
    common: { ... }
  },
  
  vi: { ...same structure in Vietnamese... },
  fr: { ...same structure in French... },  ◄── NEW
  es: { ...same structure in Spanish... }, ◄── NEW
  zh: { ...same structure in Chinese... }
}
```

## Type System

```typescript
// Language Type Definition
type Language = 'en' | 'zh' | 'vi' | 'fr' | 'es';

// Context Type
interface LanguageContextType {
  language: Language;           // Current language
  setLanguage: (lang: Language) => void;  // Change language
  t: (key: string) => string;   // Translation function
}

// Translation Keys are strings like:
// 'nav.services'
// 'hero.title1'
// 'services.classicManicure.title'
// 'contact.form.email'
```

## Component Integration Example

```tsx
// Before (Hard-coded text)
function Hero() {
  return (
    <h1>Discover Your Beauty</h1>
  );
}

// After (Multilingual)
function Hero() {
  const { t } = useLanguage();
  return (
    <h1>
      {t('hero.title1')}
      <span className="gradient">
        {t('hero.word1')}  // Changes: Beauty→Vẻ Đẹp→Beauté→Belleza→美丽
      </span>
    </h1>
  );
}

// Result:
// English 🇺🇸: "Discover Your Beauty"
// Vietnamese 🇻🇳: "Khám Phá Vẻ Đẹp"
// French 🇫🇷: "Découvrez Votre Beauté"
// Spanish 🇪🇸: "Descubre Tu Belleza"
// Chinese 🇨🇳: "发现您的美丽"
```

## Error Handling Flow

```
User requests translation: t('invalid.key')
        │
        ▼
┌──────────────────────────────┐
│ getTranslation() function    │
│ Navigates object tree        │
└────────────┬─────────────────┘
             │
     Key not found? ▼
        │
        └─→ Return defaultValue (if provided)
        └─→ Return key itself as fallback
        └─→ No error thrown ✓

Example:
t('invalid.key') → 'invalid.key'
t('invalid.key', 'Default Text') → 'Default Text'
```

## Performance Considerations

```
Memory Usage:
├── translations object: ~200KB (all 5 languages in memory)
├── localStorage: ~2KB (just the language preference)
└── React context: ~50B (just the current language string)

Render Performance:
├── Language switch: Single re-render of tree
├── t() lookup: O(key_depth) - typically 3-4 levels
├── Memoization: Could be added for frequently used keys
└── Overall impact: Negligible

Build Time:
├── No compile overhead from translations
├── Translation data loaded at runtime
└── No performance penalty during build
```

---

**This visual guide shows how your complete multilingual system works together!** 🌍✨
