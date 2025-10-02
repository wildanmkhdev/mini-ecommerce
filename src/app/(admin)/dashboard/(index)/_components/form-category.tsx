"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ActionResult } from "@/types";
import { Label } from "@radix-ui/react-label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import postCategory from "../categories/lib/actions";
const initialState: ActionResult = {
	error: "",
};
export default function FormCategory() {
	const [state, formAction] = useFormState(postCategory, initialState);
	return (
		<div>
			<form action={formAction}>
				<div className="min-h-screen bg-neutral-950 text-white p-6">
					<div className="max-w-4xl mx-auto">
						{/* Header */}
						<div className="flex items-center justify-between mb-8">
							<div className="flex items-center gap-4">
								<Button className="p-2 transition-colors">
									<Link href="/dashboard/categories">
										<ChevronLeft className="w-6 h-6" />
									</Link>
								</Button>
								<h1 className="text-2xl font-bold">Category</h1>
							</div>
							<Button variant="secondary" className="bg-blue-900" type="submit">
								Save Category
							</Button>
						</div>

						{/* Product Details Card */}
						<Card className="bg-neutral-900 border-neutral-800">
							<CardHeader>
								<CardTitle className="text-2xl">Category Details</CardTitle>
								<CardDescription className="text-neutral-400">
									Lipsum dolor sit amet, consectetur adipiscing elit
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Name Field */}
								<div className="space-y-2">
									<Label
										htmlFor="name"
										className="text-sm font-medium text-neutral-200 ">
										Name
									</Label>
									<Input
										id="name"
										name="name"
										className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2"
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</form>
		</div>
	);
}
