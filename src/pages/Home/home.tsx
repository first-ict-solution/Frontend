"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/about"; 
import Contact from "@/components/contact";
import LatestProducts from "../Home/Latest/LatestProducts";
import LatestServices from "../Home/Latest/LatestServices";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      
      <Hero />

    
      <AboutSection />

      {/* Latest Products */}
      <section className="px-6 py-12">
        <LatestProducts />
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/product")}
            className="px-6 py-2 px-10 bg-[#0067c2] text-white hover:bg-[#0051a3] transition"
          >
            SEE MORE 
          </button>
        </div>
      </section>

      {/* Latest Services */}
      <section className="px-6 py-12">
        <LatestServices />
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/service")}
            className="px-6 py-2 px-10 bg-[#0067c2] text-white hover:bg-[#0051a3] transition"
          >
            SEE MORE
          </button>
        </div>
      </section>

      
      <Contact />  

      
      <Footer />  
    </>
  );
}
