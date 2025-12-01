import { getBrands } from "@/app/(admin)/dashboard/(main)/brands/lib/data";
import FilterCheckBoxItem from "./filter-checkbox";

export default async function FilterBrand() {
  const brands = await getBrands();

  return (
    <>
      <div className="flex flex-col gap-[14px]">
        <p className="font-semibold leading-[22px]">Brands</p>
        {brands.map((brand) => (
          // <label
          //   className="font-semibold flex items-center gap-3"
          //   key={`${brand.id + brand.name}`}
          //   htmlFor={`${brand.id + brand.name}`}
          // >
          //   <input
          //     type="checkbox"
          //     name="brand"
          //     value={brand.id}
          //     className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
          //   />
          //   <span>{brand.name}</span>
          // </label>
          <FilterCheckBoxItem type="brand" key={brand.id + brand.name} id={brand.id.toString()} value={brand.name}></FilterCheckBoxItem>
        ))}
      </div>
    </>
  );
}
