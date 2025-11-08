import {
  Mail,
  Phone,
  Linkedin,
  Facebook,
  Send,
  MessageCircle
} from "lucide-react";
import image from "../assets/Artboard 3.png";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const footerLinks = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Contents", href: "/contents" },
    { name: "Resources", href: "/resources" },
    { name: "Contact Us", href: "/contact" }
  ]
};

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/first-ict/",
    color: "hover:text-blue-600"
  },
  {
    icon: Send,
    href: "https://t.me/firstict",
    color: "hover:text-blue-400"
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1BQUgrQC8N/",
    color: "hover:text-blue-700"
  },
  {
    icon: MessageCircle,
    href: "viber://contact?number=+959976923404",
    color: "hover:text-violet-400"
  }
];

const Footer = () => {
  return (
    <footer className="relative text-gray-300 bg-gray-800">
      <div className="relative px-6 py-16 mx-auto max-w-7xl lg:px-8">
        <div className="z-50 grid grid-cols-1 gap-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
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
            <Link
              to={"/contact"}
              className="flex items-center justify-center px-4 pt-2 pb-3 mt-4 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-sm w-fit hover:bg-blue-700 group"
            >
              Pitch your idea
            </Link>
          </div>
          <div className="flex flex-col items-center md:block">
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
          <div className="flex flex-col items-center md:block">
            <div className="space-y-2 text-[1.1rem]">
              <a
                href="mailto:info@firstict.com"
                target="_blank"
                className="flex items-center space-x-3"
              >
                <Mail size={18} className="text-blue-400" />
                <span>info@firstict.com</span>
              </a>
              <a
                href="tel:+959752446774"
                target="_blank"
                className="flex items-center space-x-3"
              >
                <Phone size={18} className="text-blue-400" />
                <span>+959 752 446 774</span>
              </a>
              <a
                href="tel:+971558092243"
                target="_blank"
                className="flex items-center space-x-3"
              >
                <Phone size={18} className="text-blue-400" />
                <span>+971 558 092 243</span>
              </a>
            </div>
            <div className="flex gap-4 mt-6">
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
        </div>

        <div className="mt-12 text-sm text-center text-gray-500 border-t border-gray-800 ">
          © {currentYear} First ICT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
