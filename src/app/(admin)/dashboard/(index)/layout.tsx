import "../../../globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import Header from "./_components/Header";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session } = await getUser();

	if (!session) {
		return redirect("/dashboard/sign-in");
	}
	return (
		<main>
			<div>
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						<Header></Header>
						<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
							{children}
						</div>
					</SidebarInset>
				</SidebarProvider>
			</div>
		</main>
	);
}
