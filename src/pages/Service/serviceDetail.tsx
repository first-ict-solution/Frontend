// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getServiceDetails,
  getRelatedServices,
} from "../Service/fetcher/fetcher";
import type { Service } from "../Service/type/type";
import ServiceCard from "../Service/serviceCard";
import Footer from "@/components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
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

  if (loading) return <p className="text-center mt-20">Loading service...</p>;
  if (!service) return <p className="text-center mt-20">Service not found.</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <h1
          className="text-4xl font-bold text-dark text-center pb-5"
          data-aos="fade-down"
        >
          {service.name}
        </h1>

        {/* Proposal + Features right, Image left (slider only) */}
        {(service.proposal || service.features) && (
          <section
            className="flex flex-col md:flex-row gap-10"
            data-aos="fade-up"
          >
            {/* Left: Image Slider */}
            <div className="md:w-1/2">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 4000 }}
                spaceBetween={10}
                slidesPerView={1}
              >
                {service.images && service.images.length > 0
                  ? service.images.map((img) => (
                      <SwiperSlide key={img.id}>
                        <img
                          src={img.image.url}
                          alt={`${service.name} ${img.id}`}
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      </SwiperSlide>
                    ))
                  : service.default_image && (
                      <SwiperSlide>
                        <img
                          src={service.default_image}
                          alt={service.name}
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      </SwiperSlide>
                    )}
              </Swiper>
            </div>

            {/* Right: Proposal + Features */}
            <div className="md:w-1/2 flex flex-col gap-6">
              {service.features && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Features</h2>
                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: service.features }}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-8"
          data-aos="fade-up"
        >
          {service.proposal && (
            <section>
              <h2 className="text-2xl font-semibold mb-2 mt-8 lg:mt-1">Proposal</h2>
              <div
                className="text-gray-700 text-justify"
                dangerouslySetInnerHTML={{ __html: service.proposal }}
              />
            </section>
          )}

          {service.terms && (
            <section>
              <h2 className="text-2xl font-semibold mb-2">Terms</h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: service.terms }}
              />
            </section>
          )}
        </div>

        {/* Contact button */}
        <div className="text-center" data-aos="fade-up">
          <button
            onClick={() => navigate("/contact")}
            className="px-6 mb-20 py-3 bg-[#0067c2] hover:bg-[#1381dcff] text-white font-semibold transition-colors duration-200 mt-7 rounded-sm"
          >
            Contact for Service
          </button>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="mt-16">
            <h2
              className="text-2xl font-bold mb-12 text-gray-800 text-center"
              data-aos="fade-up"
            >
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
