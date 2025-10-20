import React, { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { getSliders } from "../Hero/fetcher/fetcher";
import type { Slider } from "@/types";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "@/styles/swiper.css";

const Hero: React.FC = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getSliders()
      .then((data) => setSliders(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative w-full py-5 h-[600px] sm:h-[650px] lg:h-[500px] overflow-hidden max-w-full overflow-x-hidden">
      <div className="h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative grid items-center w-full h-full grid-cols-1 gap-6 mx-auto overflow-hidden lg:grid-cols-2">
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center rounded-lg lg:items-start lg:text-left lg:static bg-black/30 lg:bg-transparent lg:p-0 lg:rounded-none">
            <h1
              className="text-4xl font-bold leading-tight text-white sm:text-4xl lg:text-4xl lg:text-gray-900 drop-shadow-lg"
              style={{ fontFamily: "ConthraxBold" }}
            >
              Innovative{" "}
              <span className="text-blue-400 lg:text-blue-600">Software</span>
              <br />
              Solutions
            </h1>

            <p className="max-w-lg mt-4 text-lg text-white sm:text-xl lg:text-gray-600 drop-shadow-md">
              First ICT is your trusted partner in digital transformation. We
              craft cutting-edge software solutions that drive business growth
              and innovation.
            </p>

            <div className="flex flex-col justify-center gap-4 mt-6 sm:flex-row lg:justify-start">
              <Link
                to={"/services"}
                className="flex items-center justify-center px-6 py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-sm sm:px-8 sm:py-4 hover:bg-blue-700 group"
              >
                Explore Our Service
                <ArrowRight
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                  size={20}
                />
              </Link>
            </div>
          </div>

          <div className="relative w-full h-full overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full bg-gray-200">
                Loading...
              </div>
            ) : sliders.length > 0 ? (
              <>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  loop
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current
                  }}
                  onBeforeInit={(swiper) => {
                    // @ts-expect-error nothing
                    swiper.params.navigation.prevEl = prevRef.current;
                    // @ts-expect-error nothing
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                  className="w-full h-full"
                >
                  {sliders.map((slide) => (
                    <SwiperSlide key={slide.id} className="w-full h-full">
                      <img
                        src={slide.image.url}
                        alt={`Slide ${slide.id}`}
                        className="object-cover w-full h-full"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                No sliders available
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
