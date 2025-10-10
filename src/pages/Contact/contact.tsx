"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Clock,
  Send,
  Plus,
  Minus,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../components/Footer";
import { sendContactMessage } from "../Contact/fetcher/fetcher";
import type { ContactMessage } from "./type/type";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Technology service?",
    answer: "Technology service is the use of technology to help people or businesses work efficiently and solve problems. It includes IT support, software development, cloud services, and cybersecurity to ensure smooth and secure operations."
  },
  {
    question: "Who uses technology services?",
    answer:
      "Both individuals and organizations—such as schools, businesses, and government offices—use technology services to manage and improve their technological operations.",
  },
  {
    question: "How can I choose the right technology service provider?",
    answer:
      "When choosing a technology service provider, consider their expertise, experience, and client reviews. It's important to assess their understanding of your industry and their ability to deliver tailored solutions.",
  },
  {
    question: "How To contact for services?",
    answer:
      "You can contact us through our website's contact form, email us at info@firstict.com, or call us at +1 (555) 123-4567.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await sendContactMessage(formData);
      toast.success(result.message || "Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(
        error.message || "Something went wrong. Please try again later."
      );
      console.error(error);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@firstict.com",
      subDetails: "support@firstict.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subDetails: "+1 (555) 987-6543",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM",
      subDetails: "Sat: 10:00 AM - 4:00 PM",
    },
  ];

  return (
    <>
      <section id="contact" className="py-20 bg-white">
        <ToastContainer position="top-right" autoClose={4000} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-h1 font-bold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-body text-gray-600 max-w-3xl mx-auto">
              Ready to start your next project? We'd love to hear from you. Send
              us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8" data-aos="fade-right">
              <h2 className="text-h2 mt-10 font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <info.icon className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-h3 font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-body text-gray-600">{info.details}</p>
                      <p className="text-caption text-gray-500">
                        {info.subDetails}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-xl p-8" data-aos="fade-left">
              <h2 className="text-h2 font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-caption font-medium text-gray-700 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-body"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-caption font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-body"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-caption font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-body"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-caption font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-body"
                    >
                      <option value="">Select a subject</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-development">
                        Mobile Development
                      </option>
                      <option value="cloud-services">Cloud Services</option>
                      <option value="consultation">Consultation</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-caption font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-body"
                    placeholder="Tell us about your project or how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center group text-body"
                >
                  Send Message
                  <Send
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                    size={20}
                  />
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-h2 font-bold text-gray-900 mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFAQ(openFAQ === index ? null : index)
                    }
                    className="w-full px-6 py-4 flex justify-between items-center bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <span className="text-body font-medium text-gray-900">{`#${index + 1} ${faq.question}`}</span>
                    {openFAQ === index ? <Minus /> : <Plus />}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 py-4 bg-blue-50 text-gray-700 text-body">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
