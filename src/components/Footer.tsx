import { Mail, Phone, Linkedin, Twitter, Github, Facebook } from "lucide-react";
import image from "../assets/Artboard 3.png";
import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Web Development", href: "/services" },
      { name: "Mobile Development", href: "/services" },
      { name: "Cloud Services", href: "/services" },
      { name: "Database Solutions", href: "/services" },
      { name: "Cybersecurity", href: "/services" },
      { name: "System Integration", href: "/services" },
    ],
    company: [
      { name: "About Us", href: "/#about" },
      { name: "Our Team", href: "/#team" },
      { name: "Careers", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Github, href: "#", color: "hover:text-gray-400" },
    { icon: Facebook, href: "#", color: "hover:text-blue-700" },
  ];

  return (
    <footer className="text-gray-300 bg-gray-800">
      <div className="px-6 py-16 mx-auto max-w-7xl lg:px-8">
        {/* Top Branding + Description */}
        <div className="flex flex-col gap-8 mb-12 md:flex-row md:justify-between">
          {/* Left Section */}
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-xl font-bold text-white">FIRST ICT</h1>
            <p className="mt-2 text-gray-400">
              Transforming businesses through innovative software solutions.
              We're your trusted partner in digital transformation.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-3 md:justify-start">
                <Mail size={14} className="text-blue-400" />
                <span>info@firstict.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3 md:justify-start">
                <Phone size={14} className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Right Section: Button */}
          <div className="flex items-start justify-center md:justify-start md:items-center">
            <Link
              to="/contact"
              className="px-8 py-4 font-semibold text-white transition-colors bg-blue-600 rounded-sm hover:bg-blue-700"
            >
              PITCH YOUR PROJECT
            </Link>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-4 md:text-left">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img src={image} alt="First ICT Logo" className="w-auto h-60" />
          </div>

          {/* Company */}
          <div className="md:ms-20">
            <h3 className="mb-6 text-sm tracking-widest text-gray-400">
              / COMPANY /
            </h3>
            <ul className="mb-4 space-y-3 text-white">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="transition-colors hover:text-blue-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Follow Us */}
            <h3 className="mt-10 mb-4 text-sm tracking-widest text-gray-400">
              / FOLLOW US /
            </h3>
            <div className="flex justify-center space-x-4 md:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  target="_blank"
                  href={social.href}
                  className={`flex items-center justify-center p-2 rounded-full text-white ${social.color}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:ms-20 md:ps-5">
            <h3 className="mb-6 text-sm tracking-widest text-gray-400">
              / SERVICES /
            </h3>
            <ul className="space-y-3 text-white">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="transition-colors hover:text-blue-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:ms-20 md:ps-8">
            <h3 className="mb-6 text-sm tracking-widest text-gray-400">
              / SUPPORT /
            </h3>
            <ul className="space-y-3 text-white">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="transition-colors hover:text-blue-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-12 text-sm text-center text-gray-500 border-t border-gray-800">
          © {currentYear} First ICT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
