/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		// Temporarily ignore ESLint errors during production builds so we can
		// proceed with diagnosing runtime/type errors. Developers should fix
		// lint problems and re-enable this for CI.
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
