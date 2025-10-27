import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getServiceDetails,
  getRelatedServices
} from "../Service/fetcher/fetcher";
import type { Service } from "@/types";
import ServiceCard from "../Service/serviceCard";
import Footer from "@/components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "@/styles/swiper.css";

import { Autoplay } from "swiper/modules";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug?: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchService = async () => {
      try {
        const data: Service = await getServiceDetails(slug);
        setService(data);

        if (data?.id && data?.category_id) {
          const related = await getRelatedServices(data.id, data.category_id);
          setRelatedServices(related);
        }
      } catch (err) {
        console.error("Failed to fetch service:", err);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) return <p className="mt-20 text-center">Loading service...</p>;
  if (!service) return <p className="mt-20 text-center">Service not found.</p>;

  return (
    <>
      <div className="max-w-6xl px-6 py-20 mx-auto space-y-12">
        <h1
          className="pb-5 text-4xl font-bold text-center text-dark"
          data-aos="fade-down"
        >
          {service.name}
        </h1>

        <section className="gap-12 columns-1 md:columns-2">
          <div>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 4000 }}
              spaceBetween={10}
              slidesPerView={1}
            >
              {service.images && service.images.length > 0
                ? service.images.map((img) => (
                    <SwiperSlide key={img.image.id}>
                      <img
                        src={img.image.url}
                        alt={`${service.name}`}
                        className="object-cover w-full rounded-lg aspect-square"
                        style={{ transform: "scale(1.75)" }}
                      />
                    </SwiperSlide>
                  ))
                : service.default_image && (
                    <SwiperSlide>
                      <img
                        src={service.default_image}
                        alt={service.name}
                        className="object-cover w-full h-auto rounded-lg"
                      />
                    </SwiperSlide>
                  )}
            </Swiper>
          </div>
          <div className="py-4">
            {service.features && (
              <div>
                <h2 className="mb-2 text-2xl font-semibold">Features</h2>
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: service.features }}
                />
              </div>
            )}
          </div>
          {service.proposal && (
            <section className="py-4">
              <h2 className="mb-2 text-2xl font-semibold">Proposal</h2>
              <div
                className="text-justify text-gray-700"
                dangerouslySetInnerHTML={{ __html: service.proposal }}
              />
            </section>
          )}
          {service.terms && (
            <section className="py-4">
              <h2 className="mb-2 text-2xl font-semibold">Terms</h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: service.terms }}
              />
            </section>
          )}
        </section>

        {/* Contact button */}
        <div className="text-center" data-aos="fade-up">
          <Link
            to={"/contact"}
            className="px-6 mb-20 py-3 bg-[#0067c2] hover:bg-[#1381dcff] text-white font-semibold transition-colors duration-200 mt-7 rounded-sm"
          >
            Contact for Service
          </Link>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="mt-16">
            <h2
              className="mb-12 text-2xl font-bold text-center text-gray-800"
              data-aos="fade-up"
            >
              Related Services
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((rs, index) => (
                <div
                  key={rs.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <ServiceCard service={rs} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}
