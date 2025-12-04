"use client";

import { useQuery } from "@tanstack/react-query";
import CardProduct from "../../components/CardProduct";
import { fetchProduct } from "../lib/data";
import { useFilter } from "@/hooks/use-filter";

export default function ProductListing() {
   const { filter } = useFilter();

   const { data, isLoading } = useQuery({
      queryKey: ["products", filter],
      queryFn: async () => {
         const res = await fetchProduct(filter);
         console.log("RESULT:", res); // cek disini
         return res;
      },
   });

   if (isLoading) {
      return (
         <div className="grid grid-cols-1 gap-[30px]">
            <span>loading....</span>
         </div>
      );
   }

   // 🔥 kalau bukan array, hentikan error
   if (!Array.isArray(data)) {
      return <div className="text-red-500">❌ fetchProduct tidak mengembalikan array! Cek console!</div>;
   }

   return (
      <div>
         <div className="grid grid-cols-3 gap-[30px]">
            {data.map((product) => (
               <CardProduct key={product.id + product.name} item={product} />
            ))}
         </div>
      </div>
   );
}
