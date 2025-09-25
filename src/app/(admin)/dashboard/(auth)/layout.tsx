import "../../../globals.css";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body suppressHydrationWarning={true}>{children}</body>
		</html>
	);
}
