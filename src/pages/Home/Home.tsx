import { useState } from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/pages/Home/Section/About";
import LatestProducts from "../Home/Latest/LatestProducts";
import LatestServices from "../Home/Latest/LatestServices";
import LatestContents from "./Latest/LatestContent";
import { Link } from "react-router-dom";
import TeamSection from "./Team/team";
import WorkingProcess from "./Section/working";

export default function HomePage() {
  const [hasContentData, setHasContentData] = useState(false);
  const [hasProductData, setHasProductData] = useState(false);
  const [hasServiceData, setHasServiceData] = useState(false);
  return (
    <>
      <Hero />

      <section id="about">
        <AboutSection />
      </section>

      {/* Latest Products */}
      {hasProductData && (
      <section className="px-6 py-12">
        <LatestProducts onData={(v) => setHasProductData(v)} />

        <div className="flex justify-center mt-6">
          <Link
            to={"/products"}
            className="px-10 py-2 bg-[#0067c2] text-white hover:bg-[#0051a3] transition rounded-sm"
          >
            SEE MORE
          </Link>
        </div>
      </section>
      )}  

      {/* Latest Services */}
      {hasServiceData && (
      <section className="px-6 py-12">
        <LatestServices onData={(v) => setHasServiceData(v)} />

        <div className="flex justify-center mt-6">
          <Link
            to={"/services"}
            className="px-10 py-2 bg-[#0067c2] text-white hover:bg-[#0051a3] transition rounded-sm"
          >
            SEE MORE
          </Link>
        </div>
      </section>
    )}
      {/* Latest Contents */}
      {hasContentData && (
      <section className="px-6 py-12">
        <LatestContents onData={(v) => setHasContentData(v)} />

        <div className="flex justify-center mt-6">
          <Link
            to={"/contents"}
            className="px-10 py-2 bg-[#0067c2] text-white hover:bg-[#0051a3] transition rounded-sm"
          >
            SEE MORE
          </Link>
        </div>
      </section>
      )}

      {/* Working Process */}
      <section className="px-6 py-12">
        <WorkingProcess />
      </section>

      <section id="team">
        <TeamSection />
      </section>

      <Footer />
    </>
  );
}
