import { TFilter } from "@/hooks/use-filter";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { Tproduct } from "@/types";
import { getImageUrl } from "@/lib/supabase";

export async function POST(request: Request) {
   try {
      const res = (await request.json()) as TFilter;

      const where: Prisma.ProductWhereInput = {};

      // Search
      if (res.search?.trim()) {
         where.name = { contains: res.search, mode: "insensitive" };
      }

      // Price filter
      if (res.minPrice || res.maxPrice) {
         where.price = {};
         if (res.minPrice) where.price.gte = Number(res.minPrice);
         if (res.maxPrice) where.price.lte = Number(res.maxPrice);
      }

      // Stock ENUM filter (prevent wrong enum crash)
      if (Array.isArray(res.stock) && res.stock.length > 0) {
         where.stock = { in: res.stock.filter(Boolean) };
      }

      // Brand
      if (Array.isArray(res.brands) && res.brands.length > 0) {
         where.brand_id = { in: res.brands.filter(Boolean) };
      }

      // Category
      if (Array.isArray(res.categories) && res.categories.length > 0) {
         where.category_id = { in: res.categories.filter(Boolean) };
      }

      // Location
      if (Array.isArray(res.locations) && res.locations.length > 0) {
         where.location_id = { in: res.locations.filter(Boolean) };
      }

      console.log("🔥 WHERE:", where);

      const products = await prisma.product.findMany({
         where,
         select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            images: true,
            category: { select: { name: true } },
         },
      });

      const response: Tproduct[] = products.map((item) => ({
         id: item.id,
         category_name: item.category?.name ?? "",
         image_url: item.images?.[0] ? getImageUrl(item.images[0], "products") : "",
         name: item.name,
         price: Number(item.price),
      }));

      return Response.json(response);
   } catch (error: any) {
      console.error("❌ ERROR API:", error?.message ?? error);
      return Response.json({ status: false, error: error?.message }, { status: 500 });
   }
}
