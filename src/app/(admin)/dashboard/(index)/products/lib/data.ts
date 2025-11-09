import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";

export async function getProducts() {
	try {
		const products = await prisma.product.findMany({
			orderBy: { name: "asc" },
			select: {
				id: true,
				_count: { select: { orderItems: true } },
				name: true,
				created_at: true,
				price: true,
				stock: true,
				category: { select: { name: true } },
				brand: { select: { name: true } },
				location: { select: { name: true } },
				images: true,
			},
		});

		const response_products: TColumn[] = products.map((product) => ({
			id: product.id,
			name: product.name,
			price: Number(product.price) || 0,
			stock: product.stock ?? 0,
			total_sales: product._count.orderItems ?? 0,
			brand_name: product.brand?.name || "-",
			category_name: product.category?.name || "-",
			image_url: Array.isArray(product.images)
				? product.images[0]
				: product.images || "",

			createdAt: product.created_at,
		}));

		return response_products;
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return [];
	}
}
export async function getProductById(id: number) {
	try {
		const product = await prisma.product.findFirst({
			where: {
				id: id,
			},
		});
		return product;
	} catch (error) {
		console.log(error);
		return null;
	}
}
