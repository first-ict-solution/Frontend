"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/About"; 
// import Contact from "@/components/contact";
import LatestProducts from "../Home/Latest/LatestProducts";
import LatestServices from "../Home/Latest/LatestServices";
import LatestContents from "./Latest/LatestContent";
import { useNavigate } from "react-router-dom";
import TeamSection from "./Team/team";
import WorkingProcess from "./WorkingProcess/working";

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
            className="px-10 py-2 bg-[#0067c2] text-white hover:bg-[#0051a3] transition"
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
            className="px-10 py-2 bg-[#0067c2] text-white hover:bg-[#0051a3] transition"
          >
            SEE MORE
          </button>
        </div>
      </section>

      {/* Latest Contents */}
      <section className="px-6 py-12">
        <LatestContents />
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/content")}
            className="px-10 py-2 bg-[#0067c2] text-white hover:bg-[#0051a3] transition"
          >
            SEE MORE
          </button>
        </div>
      </section>

      {/* Working Process */}
      <section className="px-6 py-12">
        <WorkingProcess />
      </section>

      <TeamSection />

      <Footer />
    </>
  );
}
