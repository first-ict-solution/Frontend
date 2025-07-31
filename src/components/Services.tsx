import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Smartphone, 
  Database, 
  Cloud, 
  Shield, 
  Cog,
  ArrowRight 
} from 'lucide-react';

interface Feature {
  id: number;
  feature: string;       
  [key: string]: any;    
}

interface Service {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;          
  features: Feature[];
}

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Cog,
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/services')  
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data: Service[]) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      purple: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      green: 'text-green-600 bg-green-50 hover:bg-green-100',
      orange: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
      red: 'text-red-600 bg-red-50 hover:bg-red-100',
      indigo: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (loading) {
    return <p className="text-center py-20">Loading services...</p>;
  }

  if (error) {
    return <p className="text-center py-20 text-red-600">Error: {error}</p>;
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive software development services to help your business thrive in the digital age.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Globe; 

            return (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-lg ${getColorClasses(service.color)} flex items-center justify-center mb-6 transition-colors duration-300`}>
                  <IconComponent size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((featureObj, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {featureObj.features}
                    </li>
                  ))}
                </ul>
                
                <button className="text-blue-600 font-semibold flex items-center group-hover:text-blue-700 transition-colors duration-200">
                  Learn More
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={16} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Need a custom solution? We'd love to discuss your project.</p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Get Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
