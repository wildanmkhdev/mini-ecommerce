import "../../../globals.css";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
				{children}
			</div>
		</main>
	);
}