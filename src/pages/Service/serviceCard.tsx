import React from "react";
import { Link } from "react-router-dom";
import type { Service } from "./type/type";
import { CheckCircle } from "lucide-react"; 

interface Props {
    service: Service;
}

const ServiceCard: React.FC<Props> = ({ service }) => {
    const imageUrl = service.default_image || "https://via.placeholder.com/300";

    return (
        <div className="flex bg-[#414864] shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100">

            <div className="w-1/2">
                <img
                    src={imageUrl}
                    alt={service.name}
                    loading="lazy"
                    className="object-cover w-full h-full"
                />
            </div>


            <div className="w-2/3 p-4 flex flex-col justify-between">


                <h3 className="text-lg text-white font-bold">{service.name}</h3>


                {service.category_name && (
                    <p className="text-sm font-medium text-gray-700 mt-5">
                        <span className="text-white">{service.category_name}</span>
                    </p>
                )}


                <div className="flex justify-between items-center mt-4">

                    <CheckCircle size={24} className="text-green-500" />


                    <Link
                        to={`/service/${service.slug}`}
                        className="px-4 py-2 bg-[#0067c2] hover:bg-[#1381dcff] text-white text-sm  transition-colors duration-200"
                    >
                        See More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
