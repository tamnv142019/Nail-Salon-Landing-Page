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
			{ source: '/logo.:ext', destination: '/images/logos/logo.:ext', permanent: true },
			{ source: '/og-home.png', destination: '/images/misc/og-home.png', permanent: true },
		];
	},
};

module.exports = nextConfig;
