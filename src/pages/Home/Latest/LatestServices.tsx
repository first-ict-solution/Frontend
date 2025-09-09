"use client";

import { useEffect, useState } from "react";
import { getLatestServices } from "@/pages/Service/fetcher/fetcher";
import type { Service, ServicePaginatedResponse } from "@/pages/Service/type/type";
import ServiceCard from "@/pages/Service/serviceCard";

// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

export default function LatestServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const fetchServices = async () => {
      try {
        const data: ServicePaginatedResponse = await getLatestServices(6);
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
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Latest Services</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non ratione quis eligendi error.
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={service.id} data-aos="fade-up" data-aos-delay={index * 100}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}
