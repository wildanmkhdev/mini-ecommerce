"use client";
import { useFilter } from "@/hooks/use-filter";
import { ProductStock } from "@prisma/client";
import { ChangeEvent } from "react";

interface FilterCheckboxItemProps {
   id: string;
   value: string;
   type?: "stock" | "brand" | "location" | "category";
}

export default function FilterCheckBoxItem({ id, value, type }: FilterCheckboxItemProps) {
   const { filter, setFilter } = useFilter();

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      switch (type) {
         case "stock":
            if (e.target.checked) {
               setFilter({
                  stock: [...(filter?.stock ?? []), value as ProductStock],
               });
            } else {
               setFilter({
                  stock: filter?.stock?.filter((val) => val !== value),
               });
            }
            break;

         case "brand":
            if (e.target.checked) {
               setFilter({
                  brands: [...(filter?.brands ?? []), Number(value)],
               });
            } else {
               setFilter({
                  brands: filter?.brands?.filter((val) => val !== Number(value)),
               });
            }
            break;

         case "category":
            if (e.target.checked) {
               setFilter({
                  categories: [...(filter?.categories ?? []), Number(value)],
               });
            } else {
               setFilter({
                  categories: filter?.categories?.filter((val) => val !== Number(value)),
               });
            }
            break;

         case "location":
            if (e.target.checked) {
               setFilter({
                  locations: [...(filter?.locations ?? []), Number(value)],
               });
            } else {
               setFilter({
                  locations: filter?.locations?.filter((val) => val !== Number(value)),
               });
            }
            break;
      }
   };

   return (
      <label className="font-semibold flex items-center gap-3" htmlFor={id + value}>
         <input
            type="checkbox"
            name={type}
            value={value}
            id={id + value}
            onChange={onChange}
            className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
         />
         <span>{value}</span>
      </label>
   );
}
