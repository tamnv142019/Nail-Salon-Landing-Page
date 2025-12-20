Google Tag (gtag.js) setup

This project injects the Google global site tag (gtag.js) from `src/app/layout.tsx`.

Configuration

- Set the environment variable `NEXT_PUBLIC_GTAG_ID` to your tag ID. If not set, the app falls back to `AW-17818536782`.

Example `.env.local`:

```
NEXT_PUBLIC_GTAG_ID=AW-17818536782
```

Usage

- The external script (`https://www.googletagmanager.com/gtag/js?id=...`) is loaded with `async`.
- The inline initialization sets up `window.dataLayer` and calls `gtag('config', '<ID>')`.

Client-side event tracking

Use the helper `src/utils/gtag.ts` to send events:

```ts
import { trackEvent } from './src/utils/gtag';
trackEvent('purchase', { value: 123 });
```

Notes

- The snippet comes from the standard Google global site tag implementation.
- If you previously added GTM, this implementation replaces the GTM snippet; remove GTM-specific tags from your container if you switch to gtag.js.
