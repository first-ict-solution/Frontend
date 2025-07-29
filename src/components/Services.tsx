import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Database, 
  Cloud, 
  Shield, 
  Cog,
  ArrowRight 
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks like React, Vue, and Angular.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Cross-browser Compatible'],
      color: 'blue',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps for iOS and Android devices.',
      features: ['Native Performance', 'Cross-platform', 'App Store Ready', 'Push Notifications'],
      color: 'purple',
    },
    {
      icon: Database,
      title: 'Database Solutions',
      description: 'Scalable database design and optimization for high-performance applications.',
      features: ['Data Modeling', 'Performance Tuning', 'Backup Solutions', 'Migration Services'],
      color: 'green',
    },
    {
      icon: Cloud,
      title: 'Cloud Services',
      description: 'Cloud infrastructure setup, migration, and management services.',
      features: ['AWS/Azure/GCP', 'DevOps', 'Auto Scaling', 'Cost Optimization'],
      color: 'orange',
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security audits and implementation of security best practices.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Risk Assessment'],
      color: 'red',
    },
    {
      icon: Cog,
      title: 'System Integration',
      description: 'Seamless integration of existing systems and third-party services.',
      features: ['API Development', 'Legacy Modernization', 'Data Synchronization', 'Workflow Automation'],
      color: 'indigo',
    },
  ];

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
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-lg ${getColorClasses(service.color)} flex items-center justify-center mb-6 transition-colors duration-300`}>
                <service.icon size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="text-blue-600 font-semibold flex items-center group-hover:text-blue-700 transition-colors duration-200">
                Learn More
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={16} />
              </button>
            </div>
          ))}
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