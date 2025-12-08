export function SkipLinks() {
  return (
    <>
      {/* Skip Links - Hidden by default, visible on focus */}
      <div className="fixed top-0 left-0 z-[9999]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:px-6 focus:py-3 focus:bg-rose-600 focus:text-white focus:rounded-lg focus:z-[9999] focus:block focus:font-bold"
        >
          Skip to main content
        </a>
        <a
          href="#services"
          className="sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 focus:px-6 focus:py-3 focus:bg-rose-600 focus:text-white focus:rounded-lg focus:z-[9999] focus:block focus:font-bold"
        >
          Skip to services
        </a>
        <a
          href="#contact"
          className="sr-only focus:not-sr-only focus:absolute focus:top-28 focus:left-4 focus:px-6 focus:py-3 focus:bg-rose-600 focus:text-white focus:rounded-lg focus:z-[9999] focus:block focus:font-bold"
        >
          Skip to contact
        </a>
      </div>
    </>
  );
}
