"use client";

import dynamic from "next/dynamic";
import "flickity/css/flickity.css";

const Flickity = dynamic(() => import("react-flickity-component"), {
   ssr: false,
});

interface CarouselImagesProps {
   images: string[];
}

export default function CarouselImages({ images }: CarouselImagesProps) {
   const options = {
      cellAlign: "left",
      contain: true,
      pageDots: false,
      prevNextButtons: false,
   };

   return (
      <div className="main-carousel mt-[30px] overflow-hidden">
         <Flickity options={options}>
            {images.map((item, id) => (
               <div key={item + id} className="px-5 first-of-type:pl-[max(20px,calc((100vw-1130px)/2))]">
                  <div className="bg-white w-[470px] h-[350px] border border-[#E5E5E5] p-10 flex rounded-[30px] overflow-hidden shrink-0 justify-center items-center">
                     <img src={item} className="w-full h-full object-contain" alt="thumbnail" />
                  </div>
               </div>
            ))}
         </Flickity>
      </div>
   );
}
