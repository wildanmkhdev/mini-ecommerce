import React from "react";
import {
	Facebook,
	Twitter,
	Instagram,
	Youtube,
	Mail,
	Phone,
	MapPin,
	CreditCard,
	Shield,
	Truck,
	Headphones,
} from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-white">
			{/* Trust Badges Section */}
			<div className="border-y border-gray-200 bg-gray-50">
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
								<Truck className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h4 className="font-semibold text-gray-900 text-sm">
									Free Shipping
								</h4>
								<p className="text-xs text-gray-600">Orders over Rp 500.000</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
								<Shield className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h4 className="font-semibold text-gray-900 text-sm">
									Secure Payment
								</h4>
								<p className="text-xs text-gray-600">100% Protected</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
								<Headphones className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h4 className="font-semibold text-gray-900 text-sm">
									24/7 Support
								</h4>
								<p className="text-xs text-gray-600">Dedicated support</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
								<CreditCard className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h4 className="font-semibold text-gray-900 text-sm">
									Easy Returns
								</h4>
								<p className="text-xs text-gray-600">30 days return policy</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Footer Content */}
			<div className="bg-gradient-to-r from-blue-600 to-blue-700">
				<div className="max-w-7xl mx-auto px-6 py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
						{/* Company Info - Wider Column */}
						<div className="lg:col-span-2">
							<div className="flex items-center gap-2 mb-4">
								<div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
									<svg
										className="w-6 h-6 text-blue-600"
										fill="currentColor"
										viewBox="0 0 24 24">
										<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
									</svg>
								</div>
								<span className="text-2xl font-bold text-white">Belanja</span>
							</div>
							<p className="text-blue-100 text-sm mb-6 leading-relaxed max-w-md">
								Indonesia's most trusted online marketplace offering premium
								products with competitive prices, secure transactions, and
								reliable warranty protection for all your shopping needs.
							</p>

							{/* Contact Info */}
							<div className="space-y-3 mb-6">
								<div className="flex items-start gap-3">
									<MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
									<span className="text-blue-100 text-sm">
										Jl. Jenderal Sudirman Kav. 52-53
										<br />
										Jakarta Selatan 12190, Indonesia
									</span>
								</div>
								<div className="flex items-center gap-3">
									<Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
									<a
										href="tel:+622150888999"
										className="text-blue-100 hover:text-white text-sm transition-colors">
										+62 21 5088 8999
									</a>
								</div>
								<div className="flex items-center gap-3">
									<Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
									<a
										href="mailto:cs@belanja.co.id"
										className="text-blue-100 hover:text-white text-sm transition-colors">
										cs@belanja.co.id
									</a>
								</div>
							</div>

							{/* Social Media */}
							<div>
								<p className="text-white font-semibold text-sm mb-3">
									Follow Us
								</p>
								<div className="flex gap-2">
									<a
										href="#"
										className="w-10 h-10 bg-blue-500 hover:bg-yellow-400 hover:text-blue-600 rounded-lg flex items-center justify-center transition-all duration-300">
										<Facebook className="w-5 h-5" />
									</a>
									<a
										href="#"
										className="w-10 h-10 bg-blue-500 hover:bg-yellow-400 hover:text-blue-600 rounded-lg flex items-center justify-center transition-all duration-300">
										<Twitter className="w-5 h-5" />
									</a>
									<a
										href="#"
										className="w-10 h-10 bg-blue-500 hover:bg-yellow-400 hover:text-blue-600 rounded-lg flex items-center justify-center transition-all duration-300">
										<Instagram className="w-5 h-5" />
									</a>
									<a
										href="#"
										className="w-10 h-10 bg-blue-500 hover:bg-yellow-400 hover:text-blue-600 rounded-lg flex items-center justify-center transition-all duration-300">
										<Youtube className="w-5 h-5" />
									</a>
								</div>
							</div>
						</div>

						{/* Shop Categories */}
						<div>
							<h3 className="text-white text-base font-bold mb-4">Shop</h3>
							<ul className="space-y-2.5">
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Smartphones
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Tablets
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Laptops
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Electronics
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Accessories
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										New Releases
									</a>
								</li>
							</ul>
						</div>

						{/* Customer Care */}
						<div>
							<h3 className="text-white text-base font-bold mb-4">
								Customer Care
							</h3>
							<ul className="space-y-2.5">
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Help Center
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										How to Buy
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Track Your Order
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Returns & Refunds
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Shipping & Delivery
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Contact Us
									</a>
								</li>
							</ul>
						</div>

						{/* About & Legal */}
						<div>
							<h3 className="text-white text-base font-bold mb-4">
								About Belanja
							</h3>
							<ul className="space-y-2.5">
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										About Us
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Careers
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Blog
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Press & Media
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Investor Relations
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-blue-100 hover:text-yellow-400 text-sm transition-colors">
										Partnerships
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Footer */}
			<div className="bg-blue-800">
				<div className="max-w-7xl mx-auto px-6 py-6">
					<div className="flex flex-col lg:flex-row justify-between items-center gap-4">
						<div className="flex flex-col md:flex-row items-center gap-4">
							<p className="text-blue-200 text-sm">
								© 2024 PT Belanja Digital Indonesia. All rights reserved.
							</p>
							<div className="flex gap-4">
								<a
									href="#"
									className="text-blue-200 hover:text-white text-sm transition-colors">
									Privacy Policy
								</a>
								<span className="text-blue-600">|</span>
								<a
									href="#"
									className="text-blue-200 hover:text-white text-sm transition-colors">
									Terms of Service
								</a>
								<span className="text-blue-600">|</span>
								<a
									href="#"
									className="text-blue-200 hover:text-white text-sm transition-colors">
									Cookie Policy
								</a>
							</div>
						</div>

						{/* Payment Methods */}
						<div className="flex items-center gap-3">
							<span className="text-blue-200 text-sm font-medium">
								Payment Methods:
							</span>
							<div className="flex gap-2">
								<div className="w-12 h-8 bg-white rounded flex items-center justify-center">
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
										alt="Visa"
										className="h-4"
									/>
								</div>
								<div className="w-12 h-8 bg-white rounded flex items-center justify-center">
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
										alt="Mastercard"
										className="h-4"
									/>
								</div>
								<div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-blue-600">
									OVO
								</div>
								<div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-blue-600">
									DANA
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
