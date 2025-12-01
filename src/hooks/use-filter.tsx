import { ProductStock } from "@prisma/client";
import { create } from "zustand";

// step buat zustand definisiakan dulu typeny karena pkek tsx
export type TFilter = {
   search?: string;
   minPrice?: number;
   maxPrice?: number;
   stock?: ProductStock[] | null;
   brands?: number[] | null;
   locations?: number[] | null;
   categories?: number[] | null;
};
//interface buat storenya
export interface FilterState {
   filter: TFilter;
   setFilter: (filter: TFilter) => void;
}
// membuat zustand store
export const useFilter = create<FilterState>()((set) => ({
   filter: {
      search: "",
      minPrice: 0,
      maxPrice: 0,
      stock: null,
      brands: null,
      locations: null,
      categories: null,
   },
   setFilter: (filter) =>
      set((state) => ({
         // dia akan membuat array baru bersamaan dnegan apa yg di filter misal price,categories location
         filter: {
            ...state.filter,
            ...filter,
         },
      })),
}));
