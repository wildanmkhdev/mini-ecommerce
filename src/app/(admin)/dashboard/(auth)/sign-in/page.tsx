import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInPage() {
	return (
		<main className="w-full h-screen overflow-hidden relative">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<Card>
					<CardHeader>
						<CardTitle>Login to your account</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<div className="flex flex-col gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<a
											href="#"
											className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
											Forgot your password?
										</a>
									</div>
									<Input id="password" type="password" required />
								</div>
								<div className="flex flex-col gap-3">
									<Button type="submit" className="w-full">
										Sign in
									</Button>
								</div>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
export default SignInPage;
