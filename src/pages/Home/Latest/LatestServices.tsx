import { useEffect, useState } from "react";
import { getLatestServices } from "@/pages/Service/fetcher/fetcher";
import type { Service } from "@/types";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "@/styles/swiper.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LatestServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
    const fetchServices = async () => {
      try {
        const data = await getLatestServices(3);
        setServices(data.services || []);
      } catch (error) {
        console.error("Failed to fetch latest services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <p className="py-10 text-center">Loading services...</p>;
  if (services.length === 0)
    return <p className="py-10 text-center">No services found.</p>;

  return (
    <section className="relative max-w-6xl px-6 py-12 mx-auto">
      <div className="mb-16 text-center" data-aos="fade-up">
        <h2 className="mb-4 text-4xl font-bold text-gray-900">
          Our Latest Services
        </h2>
        <p className="max-w-3xl mx-auto text-xl text-gray-600">
          Explore our top-notch services crafted for your business success.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev"
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
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white md:px-8">
                <h3 className="mb-5 text-3xl font-bold md:text-4xl">
                  {service.name}
                </h3>
                <p className="mb-8 text-sm md:text-base">
                  {service.proposal && (
                    <span>
                      {service.proposal
                        .replace(/<[^>]+>/g, "")
                        .split(" ")
                        .slice(0, 50)
                        .join(" ")}
                      ...
                    </span>
                  )}
                </p>
                <Link
                  to={`/services/${service.slug}`}
                  className="px-10 py-2 font-semibold transition bg-blue-600 rounded-sm hover:bg-blue-700 w-max"
                >
                  See Detail
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button className="absolute z-10 p-3 text-gray-800 transition -translate-y-1/2 rounded-full shadow-md custom-prev top-1/2 left-4 bg-white/40 hover:bg-white">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute z-10 p-3 text-gray-800 transition -translate-y-1/2 rounded-full shadow-md custom-next top-1/2 right-4 bg-white/40 hover:bg-white">
          <ChevronRight size={24} />
        </button>
      </Swiper>
    </section>
  );
}
