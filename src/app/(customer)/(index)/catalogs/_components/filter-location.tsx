import { getLocations } from "@/app/(admin)/dashboard/(main)/locations/lib/data";
import FilterCheckBoxItem from "./filter-checkbox";

export default async function FilterLocation() {
   const Location = await getLocations();

   return (
      <>
         <div className="flex flex-col gap-[14px]">
            <p className="font-semibold leading-[22px]">Location</p>
            {Location.map((location) => (
               <FilterCheckBoxItem
                  type="location"
                  key={location.id + location.name}
                  id={location.id.toString()}
                  value={location.name}
               ></FilterCheckBoxItem>
            ))}
         </div>
      </>
   );
}
