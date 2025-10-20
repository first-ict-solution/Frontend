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
  return (
    <>
      <Hero />

      <section id="about">
        <AboutSection />
      </section>

      {/* Latest Products */}
      <section className="px-6 py-12">
        <LatestProducts />
        <div className="flex justify-center mt-6">
          <Link
            to={"/products"}
            className="px-10 py-2 bg-[#0067c2] text-white hover:bg-[#0051a3] transition rounded-sm"
          >
            SEE MORE
          </Link>
        </div>
      </section>

      {/* Latest Services */}
      <section className="px-6 py-12">
        <LatestServices />
        <div className="flex justify-center mt-6">
          <Link
            to={"/services"}
            className="px-10 py-2 bg-[#0067c2] text-white hover:bg-[#0051a3] transition rounded-sm"
          >
            SEE MORE
          </Link>
        </div>
      </section>

      {/* Latest Contents */}
      <section className="px-6 py-12">
        <LatestContents />
        <div className="flex justify-center mt-6">
          <Link
            to={"/contents"}
            className="px-10 py-2 bg-[#0067c2] text-white hover:bg-[#0051a3] transition rounded-sm"
          >
            SEE MORE
          </Link>
        </div>
      </section>

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
