// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceDetails, getRelatedServices } from "../Service/fetcher/fetcher";
import type { Service } from "../Service/type/type";
import ServiceCard from "../Service/serviceCard";
import Footer from "@/components/Footer";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
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
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
               
                <h1 className="text-4xl font-bold text-[#0067c2] text-center" data-aos="fade-down">
                    {service.name}
                </h1>

              
                {service.proposal && (
                    <section data-aos="fade-up">
                        <h2 className="text-2xl font-semibold mb-2">Proposal</h2>
                        <p className="text-gray-700">{service.proposal}</p>
                    </section>
                )}

               
                {service.category_name && (
                    <section data-aos="fade-up">
                        <h2 className="text-2xl font-semibold mb-2">Category</h2>
                        <p className="text-gray-700">{service.category_name}</p>
                    </section>
                )}

                
                {service.features && (
                    <section data-aos="fade-up">
                        <h2 className="text-2xl font-semibold mb-2">Features</h2>
                        <p className="text-gray-700">{service.features}</p>
                    </section>
                )}

                
                <section data-aos="fade-up">
                    <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000 }}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="rounded-lg border"
                    >
                        {service.images?.map((img) => (
                            <SwiperSlide key={img.id}>
                                <img
                                    src={img.image.url}
                                    alt={`${service.name} ${img.id}`}
                                    className="w-full h-96 object-contain rounded-lg"
                                />
                            </SwiperSlide>
                        ))}

                        
                        {(!service.images || service.images.length === 0) && service.default_image && (
                            <SwiperSlide>
                                <img
                                    src={service.default_image}
                                    alt={service.name}
                                    className="w-full h-96 object-contain rounded-lg"
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </section>

               
                {service.terms && (
                    <section data-aos="fade-up">
                        <h2 className="text-2xl font-semibold mb-2">Terms</h2>
                        <p className="text-gray-700">{service.terms}</p>
                    </section>
                )}

                
                <div className="text-center" data-aos="fade-up">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 mb-20 py-3 bg-[#0067c2] hover:bg-[#1381dcff] text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        Contact for Service
                    </button>
                </div>

                
                {relatedServices.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold mb-12 text-gray-800 text-center" data-aos="fade-up">
                            Related Services
                        </h2>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6"
                        >
                            {relatedServices.map((rs, index) => (
                                <div key={rs.id} data-aos="fade-up" data-aos-delay={index * 100}>
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
