// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Target, Users, Award, Lightbulb } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "We focus on delivering solutions that align with your business objectives and drive measurable results.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description:
        "Your success is our priority. We work closely with you throughout the entire development process.",
    },
    {
      icon: Award,
      title: "Quality First",
      description:
        "We maintain the highest standards in code quality, testing, and documentation for every project.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We stay ahead of technology trends to provide cutting-edge solutions for modern challenges.",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section id="about" className="py-20 bg-white">
      {/* container with more padding on mobile */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About First ICT
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-prose mx-auto">
            We are a dynamic software house dedicated to transforming ideas into
            powerful digital solutions. Our team combines technical expertise
            with creative thinking to deliver exceptional results.
          </p>
        </div>

        {/* Story + Stats */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16">
          <div className="space-y-6" data-aos="fade-right">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Our Story
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-prose mx-auto lg:mx-0">
              Founded with a vision to bridge the gap between technology and
              business needs, First ICT has grown into a trusted partner for
              companies seeking digital transformation. We specialize in
              creating custom software solutions that are not just functional,
              but truly transformative.
            </p>
            <p className="text-gray-600 leading-relaxed max-w-prose mx-auto lg:mx-0">
              Our approach combines agile methodologies with deep industry
              knowledge, ensuring that every project we undertake delivers real
              value to our clients. From startups to enterprise-level
              organizations, we've helped businesses across various industries
              achieve their digital goals.
            </p>
          </div>

          {/* Stats card */}
          <div className="relative" data-aos="fade-left">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                    100%
                  </div>
                  <div className="text-gray-700 text-sm sm:text-base">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                    24/7
                  </div>
                  <div className="text-gray-700 text-sm sm:text-base">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-700 text-sm sm:text-base">Uptime Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">
                    ISO
                  </div>
                  <div className="text-gray-700 text-sm sm:text-base">Certified Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center group"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors duration-300">
                <value.icon className="text-blue-600" size={32} />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h4>
              <p className="text-gray-600 max-w-xs mx-auto">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
