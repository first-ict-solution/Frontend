import { Mail, Phone, Linkedin, Twitter, Github, Facebook } from "lucide-react";
import image from "../assets/Artboard 3.png";
import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    pages: [
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: "Services", href: "/services" },
      { name: "Contents", href: "/contents" },
      { name: "Resources", href: "/resources" },
      { name: "Contact Us", href: "/contact" }
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Github, href: "#", color: "hover:text-gray-400" },
    { icon: Facebook, href: "#", color: "hover:text-blue-700" }
  ];

  return (
    <footer className="relative text-gray-300 bg-gray-800">
      <div className="relative px-6 py-16 mx-auto max-w-7xl lg:px-8">
        <div className="z-50 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img
              src={image}
              alt="First ICT Logo"
              className="-mt-20 h-60 scale-175"
            />
            <h1 className="-mt-16 text-xl font-bold text-white">FIRST ICT</h1>
            <p className="max-w-md mt-2 text-gray-400">
              Transforming businesses through innovative software solutions.
              We're your trusted partner in digital transformation.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-3">
                <Mail size={14} className="text-blue-400" />
                <span>info@firstict.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={14} className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
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
          <div>
            <h3 className="mb-6 text-sm tracking-widest text-gray-400">
              / USEFUL LINKS /
            </h3>
            <ul className="space-y-3 text-white">
              {footerLinks.pages.map((link, index) => (
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
          <div>
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

        <div className="mt-12 text-sm text-center text-gray-500 border-t border-gray-800 ">
          © {currentYear} First ICT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
