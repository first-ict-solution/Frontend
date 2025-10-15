import React, { useEffect, useState } from "react";
import { getLatestServices } from "./fetcher/fetcher";
import type { Service } from "./type/type";
import ServiceCard from "./serviceCard";
import Footer from "@/components/Footer";

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getLatestServices(20);
        setServices(data.services);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading services...</p>;
  }

  const groupedServices = services.reduce((groups: Record<string, Service[]>, service) => {
    const categoryName = service.category_name || "Uncategorized";
    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }
    groups[categoryName].push(service);
    return groups;
  }, {});

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-8">
          {/* <h2 className="text-3xl font-bold text-black">Our Services</h2>
          <p className="text-gray-500 mt-2 mb-20">
            Explore our wide range of professional services tailored to your needs.
          </p> */}
        </div>

        {Object.entries(groupedServices).map(([categoryName, categoryServices]) => (
          <div key={categoryName} className="mb-16">
            <h1 className="text-2xl font-bold text-center mb-10">{categoryName}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {categoryServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default ServiceList;
