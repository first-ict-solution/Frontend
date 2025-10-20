import React from "react";
import Roadmap from "../Resource/roadmap";
import Footer from "@/components/Footer";
import PaperPage from "./paper";

const Resource: React.FC = () => {
  return (
    <>
      <section className="py-16 text-center ">
        <h2 className="text-4xl font-bold text-dark">Resource</h2>
        <p className="max-w-2xl mx-auto mt-4 text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non ratione
          quis eligendi error.
        </p>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl px-4 mx-auto">
          <Roadmap />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl px-4 mx-auto">
          <PaperPage />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Resource;
