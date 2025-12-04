import { TFilter } from "@/hooks/use-filter";
import { Tproduct } from "@/types";

export async function fetchProduct(body: TFilter): Promise<Tproduct[]> {
   const res = await fetch("/api/catalog", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // <-- WAJIB!
      body: JSON.stringify(body ?? {}),
   });

   const data = await res.json();

   console.log("🔍 FETCH RESPONSE:", data);

   if (!res.ok) {
      throw new Error(data?.message || "API Error");
   }

   return data ?? [];
}
