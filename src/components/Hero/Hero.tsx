"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { getSliders } from "../Hero/fetcher/fetcher";
import type { Slider } from "../Hero/type/type";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero: React.FC = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSliders()
      .then((data) => setSliders(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative w-full py-5 h-[600px] sm:h-[650px] lg:h-[500px] overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
    <div className="h-full grid lg:grid-cols-2 gap-8 items-center relative">
      
      
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-20
                      absolute inset-0 lg:static bg-black/30 lg:bg-transparent p-6 lg:p-0 rounded-lg lg:rounded-none">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white lg:text-gray-900 drop-shadow-lg leading-tight">
          Innovative <span className="text-blue-400 lg:text-blue-600">Software</span>
          <br />
          Solutions
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-white lg:text-gray-600 max-w-lg drop-shadow-md">
          First ICT is your trusted partner in digital transformation. We craft cutting-edge software solutions that drive business growth and innovation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
          <button 
          onClick={() => navigate("/service")}
          className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center group">
            Explore Our Service
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
          </button>
         
        </div>
      </div>

      
      <div className="relative w-full h-full overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full bg-gray-200">Loading...</div>
        ) : sliders.length > 0 ? (
          <>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              loop
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="h-full w-full"
            >
              {sliders.map((slide) => (
                <SwiperSlide key={slide.id} className="h-full w-full">
                  <img
                    src={slide.image.url}
                    alt={`Slide ${slide.id}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

           
            
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">No sliders available</div>
        )}
      </div>
    </div>
  </div>
</section>

  );
};

export default Hero;
