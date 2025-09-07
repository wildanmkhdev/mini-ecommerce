import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	turbopack: {
		root: __dirname, // pastikan sesuai root project kamu
	},
};

export default nextConfig;
