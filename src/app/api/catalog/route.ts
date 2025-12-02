import { TFilter } from "@/hooks/use-filter";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { Tproduct } from "@/types";
import { getImageUrl } from "@/lib/supabase";

export async function POST(request: Request) {
   try {
      const res = (await request.json()) as TFilter;
      const ORQuery: Prisma.ProductWhereInput[] = [];

      if (res.search !== "") {
         ORQuery.push({
            name: {
               contains: res.search,
               mode: "insensitive",
            },
         });
      }

      if (res.minPrice && res.minPrice > 0) {
         ORQuery.push({ price: { gte: res.minPrice } });
      }

      if (res.maxPrice && res.maxPrice > 0) {
         ORQuery.push({ price: { lte: res.maxPrice } });
      }

      if (res.stock && res.stock.length > 0) {
         ORQuery.push({ stock: { in: res.stock } });
      }

      if (res.brands && res.brands.length > 0) {
         ORQuery.push({
            brand: { id: { in: res.brands } },
         });
      }

      if (res.categories && res.categories.length > 0) {
         ORQuery.push({
            category: { id: { in: res.categories } },
         });
      }

      if (res.locations && res.locations.length > 0) {
         ORQuery.push({
            location: { id: { in: res.locations } },
         });
      }

      const product = await prisma.product.findMany({
         where: ORQuery.length > 0 ? { OR: ORQuery } : undefined,
         select: {
            id: true,
            images: true,
            name: true,
            category: {
               select: { name: true },
            },
            price: true,
         },
      });

      const response: Tproduct[] = product.map((item) => ({
         id: item.id,
         category_name: item.category?.name ?? "",
         image_url: getImageUrl(item.images[0], "products"),
         name: item.name,
         price: Number(item.price),
      }));

      return Response.json(response);
   } catch (error) {
      console.log(error);
      return Response.json({ status: false }, { status: 500 });
   }
}
