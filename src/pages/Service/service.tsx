import React, { useEffect, useState } from "react";
import { getLatestServices } from "./fetcher/fetcher";
import type { Service } from "@/types";
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
    return <p className="mt-10 text-center">Loading services...</p>;
  }

  const groupedServices = services.reduce(
    (groups: Record<string, Service[]>, service) => {
      const categoryName = service.category_name || "Uncategorized";
      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(service);
      return groups;
    },
    {},
  );

  return (
    <>
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          {/* <h2 className="text-3xl font-bold text-black">Our Services</h2>
          <p className="mt-2 mb-20 text-gray-500">
            Explore our wide range of professional services tailored to your needs.
          </p> */}
        </div>

        {Object.entries(groupedServices).map(
          ([categoryName, categoryServices]) => (
            <div key={categoryName} className="mb-16">
              <h1 className="mb-10 text-2xl font-bold text-center">
                {categoryName}
              </h1>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2">
                {categoryServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      <Footer />
    </>
  );
};

export default ServiceList;
