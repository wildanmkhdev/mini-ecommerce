import React, { ChangeEvent, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

export default function UploadImages() {
	//ref disini itu ibarat referesni bauat ngambi inputan pengguna
	const ref = useRef<HTMLInputElement>(null);
	const thumbnailRef = useRef<HTMLImageElement>(null);
	const imageFirstRef = useRef<HTMLImageElement>(null);
	const imageSecondRef = useRef<HTMLImageElement>(null);
	//jika input refreni ad jalanka fungsi itu
	// fngsu cek pop up untuk pillih filder
	const openFolder = () => {
		if (ref.current) {
			ref.current.click();
		}
	};
	// jika tidak ad data thumnail kembaikan return kosong
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (
			!thumbnailRef.current ||
			!imageFirstRef.current ||
			!imageSecondRef.current
		) {
			return;
		}
		// cek jika input panjangny alebih dari 3 bsa maskkan gambar
		if (e.target.files && e.target.files.length >= 3) {
			//jika ad masukkan ke variable
			thumbnailRef.current.src = URL.createObjectURL(e.target.files[0]);
			imageFirstRef.current.src = URL.createObjectURL(e.target.files[1]);
			imageSecondRef.current.src = URL.createObjectURL(e.target.files[2]);
		}
	};

	// ref untuk input
	return (
		<Card className="bg-[#0a0a0f] border-neutral-800 text-white">
			{/* Header */}
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Product Images</CardTitle>
				<CardDescription className="text-neutral-400 text-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit
				</CardDescription>
			</CardHeader>

			{/* Content */}
			<CardContent className="space-y-4">
				{/* Main Image */}
				<div className="aspect-square bg-[#0a0a0f] rounded-lg border border-neutral-800 flex items-center justify-center overflow-hidden">
					<img
						ref={thumbnailRef}
						src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
						alt="Main product"
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Thumbnail Images */}
				<div className="grid grid-cols-3 gap-3">
					{/* Thumbnail 1 */}
					<div className="aspect-square bg-[#0a0a0f] rounded-lg border border-neutral-800 overflow-hidden">
						<img
							ref={imageFirstRef}
							src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
							alt="Product thumbnail"
							className="w-full h-full object-cover"
						/>
					</div>

					{/* Thumbnail 2 */}
					<div className="aspect-square bg-[#0a0a0f] rounded-lg border border-neutral-800 overflow-hidden">
						<img
							ref={imageSecondRef}
							src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
							alt="Product thumbnail"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>

				{/* Upload Field */}
				<div className="space-y-2">
					<input
						id="image"
						ref={ref}
						type="file"
						name="images"
						accept="image/*"
						multiple
						className="hidden"
						onChange={onChange}
					/>

					<Button
						type="button"
						variant="outline"
						className="w-full border-neutral-800 text-white hover:bg-neutral-800"
						onClick={openFolder}>
						<Upload className="w-4 h-4 mr-2" />
						Upload Images
					</Button>

					<p className="text-xs text-neutral-500">
						Format: JPG, PNG, atau WEBP (Max 5MB)
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
