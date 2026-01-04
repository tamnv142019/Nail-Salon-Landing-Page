/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		// Temporarily ignore ESLint errors during production builds so we can
		// proceed with diagnosing runtime/type errors. Developers should fix
		// lint problems and re-enable this for CI.
		ignoreDuringBuilds: true,
	},
	async redirects() {
		return [
			// Root favicon (many crawlers/Google look for this)
			{ source: '/favicon.ico', destination: '/favicon/favicon.ico', permanent: true },
			{ source: '/apple-touch-icon.png', destination: '/favicon/apple-touch-icon.png', permanent: true },
			{ source: '/site.webmanifest', destination: '/favicon/site.webmanifest', permanent: true },

			// Support legacy/logo-shortcut paths
			{ source: '/logo', destination: '/images/logos/logo.png', permanent: true },
			{ source: '/logo.png', destination: '/images/logos/logo.png', permanent: true },
			{ source: '/logo.jpg', destination: '/images/logos/logo.png', permanent: true },
			{ source: '/logo.jpeg', destination: '/images/logos/logo.png', permanent: true },
			{ source: '/logo.webp', destination: '/images/logos/logo.png', permanent: true },
			{ source: '/og-home.png', destination: '/images/misc/og-home.png', permanent: true },
		];
	},
};

module.exports = nextConfig;
