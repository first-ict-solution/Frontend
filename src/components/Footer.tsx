import { Mail, Phone, Linkedin, Twitter, Github, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '#services' },
      { name: 'Mobile Development', href: '#services' },
      { name: 'Cloud Services', href: '#services' },
      { name: 'Database Solutions', href: '#services' },
      { name: 'Cybersecurity', href: '#services' },
      { name: 'System Integration', href: '#services' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#' },
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Help Center', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Github, href: '#', color: 'hover:text-gray-400' },
    { icon: Facebook, href: '#', color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        {/* Top Branding + Description */}
        <div className="mb-12 flex flex-col md:flex-row md:justify-between gap-8">
          {/* Left Section */}
          <div className="max-w-md text-center md:text-left">
            <h1 className="font-bold text-white text-xl">FIRST ICT</h1>
            <p className="text-gray-400 mt-2">
              Transforming businesses through innovative software solutions.
              We're your trusted partner in digital transformation.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-center md:justify-start items-center space-x-3">
                <Mail size={14} className="text-blue-400" />
                <span>info@firstict.com</span>
              </div>
              <div className="flex justify-center md:justify-start items-center space-x-3">
                <Phone size={14} className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Right Section: Button */}
          <div className="flex justify-center md:justify-start items-start md:items-center">
            <a
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-semibold transition-colors"
            >
              PITCH YOUR PROJECT
            </a>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">

          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/public/image.png"
              alt="First ICT Logo"
              className="h-60 w-auto"
            />
          </div>

          {/* Company */}
          <div className="md:ms-20">
            <h3 className="text-sm tracking-widest text-gray-400 mb-6">/ COMPANY /</h3>
            <ul className="space-y-3 text-white mb-4">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-blue-500 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Follow Us */}
            <h3 className="text-sm tracking-widest text-gray-400 mb-4 mt-10">/ FOLLOW US /</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
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
            <h3 className="text-sm tracking-widest text-gray-400 mb-6">/ SERVICES /</h3>
            <ul className="space-y-3 text-white">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-blue-500 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:ms-20 md:ps-8">
            <h3 className="text-sm tracking-widest text-gray-400 mb-6">/ SUPPORT /</h3>
            <ul className="space-y-3 text-white">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-blue-500 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          © {currentYear} First ICT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
