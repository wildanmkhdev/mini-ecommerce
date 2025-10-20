import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "nhxrnrrkuyznrfdvfzfn.supabase.co",
			},
		],
	},
	turbopack: {
		root: __dirname, // pastikan sesuai root project kamu
	},
};

export default nextConfig;
