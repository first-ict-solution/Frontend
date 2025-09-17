"use client";
import { useEffect, useState } from "react";
import { getLatestServices } from "@/pages/Service/fetcher/fetcher";
import type { Service, ServicePaginatedResponse } from "@/pages/Service/type/type";
import { Link } from "react-router-dom";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LatestServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
    const fetchServices = async () => {
      try {
        const data: ServicePaginatedResponse = await getLatestServices(3);
        setServices(data.services || []);
      } catch (error) {
        console.error("Failed to fetch latest services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <p className="text-center py-10">Loading services...</p>;
  if (services.length === 0) return <p className="text-center py-10">No services found.</p>;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 relative">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Latest Services</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our top-notch services crafted for your business success.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <div
              className="relative h-96 md:h-[500px] lg:h-[300px] rounded-lg overflow-hidden"
              style={{
                backgroundImage: `url(${service.default_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              
              <div className="absolute inset-0 bg-black/50"></div>

              
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8 text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-5">{service.name}</h3>
                <p className="mb-8 text-sm md:text-base">
                  {service.proposal && (
                    <div dangerouslySetInnerHTML={{ __html: service.proposal }} />
                  )}
                </p>
                <Link
                  to={`/service/${service.slug}`}
                  className="px-10 py-2 bg-blue-600 hover:bg-blue-700 font-semibold w-max transition"
                >
                  See Detail
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        
        <button className="custom-prev absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/40 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition">
          <ChevronLeft size={24} />
        </button>
        <button className="custom-next absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/40 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition">
          <ChevronRight size={24} />
        </button>
      </Swiper>
    </section>
  );
}
