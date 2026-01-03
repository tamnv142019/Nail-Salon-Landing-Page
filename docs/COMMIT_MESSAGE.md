✨ feat: Add Google Search SEO optimization with Site name & Favicon

## Changes

### Core Implementation
- ✅ Added WebSite Schema (JSON-LD) for Google Site name display
- ✅ Configured Next.js Metadata API with metadataBase and applicationName
- ✅ Enhanced favicon configuration for Google Search (>= 48x48px)
- ✅ Improved SEO metadata with comprehensive Open Graph and Twitter Card

### Files Modified
1. **src/app/layout.tsx**
   - Added `metadataBase: new URL('https://queensobnail.com')`
   - Added `applicationName: "Queen's Nails Hair & Skincare"`
   - Imported and integrated `generateWebSiteSchema()`
   - Enhanced metadata with title template, keywords, robots config
   - Improved favicon configuration with all required sizes

2. **src/config/seo.config.ts**
   - Added `generateWebSiteSchema()` function
   - Added `enableWebSiteSchema: true` flag
   - WebSite Schema includes publisher, logo, and search action

### Documentation Added
1. **docs/GOOGLE_SEARCH_SEO_GUIDE.md**
   - Complete guide for Google Search optimization
   - Validation steps and troubleshooting
   - Timeline expectations (1-2 weeks for Site name)
   - Rich Results testing instructions

2. **docs/SEO_IMPLEMENTATION_SUMMARY.md**
   - Quick summary of changes
   - Next steps and validation commands
   - Expected results preview

3. **docs/PAGES_ROUTER_EXAMPLE.tsx.example**
   - Reference implementation for Pages Router
   - Alternative approach for non-App Router projects

4. **docs/SEO_QUICK_REFERENCE.ts.example**
   - Quick reference with testing commands
   - Troubleshooting guide
   - Monitoring checklist

## What This Enables

### Google Search Results Will Display:
```
┌─────────────────────────────────────────┐
│ [🌸] Queen's Nails Hair & Skincare      │ ← Site name + Favicon
│ https://queensobnail.com                │
│                                         │
│ Best Nail Salon in Ocean Beach, San... │ ← Title
│ Best nail salon in Ocean Beach offering │ ← Description
│ luxury manicures, pedicures...          │
│                                         │
│ Services · Gallery · Book · Contact     │ ← Sitelinks (auto)
└─────────────────────────────────────────┘
```

## Validation

✅ Build successful: `npm run build` passes
✅ No TypeScript errors
✅ Schema markup properly formatted
✅ All favicon files present and configured

## Next Steps

1. Deploy to production
2. Test with Rich Results: https://search.google.com/test/rich-results
3. Submit to Google Search Console
4. Wait 1-2 weeks for full indexing

## SEO Schemas Implemented

1. ✅ WebSite Schema → Site name in Google
2. ✅ BeautySalon Schema → Business info
3. ✅ Service Schema → Services offered
4. ✅ FAQ Schema → FAQ snippets
5. ✅ Breadcrumb Schema → Navigation

## References

- Google Search Central: https://developers.google.com/search
- Schema.org WebSite: https://schema.org/WebSite
- Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
