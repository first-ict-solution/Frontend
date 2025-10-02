"use client";

import React from "react";
import Roadmap from "../Resource/roadmap"; 
import Footer from "@/components/Footer";
import PaperPage from "./paper";

const Resource: React.FC = () => {
  return (
    <>
      
      <section className="text-center py-16 ">
        <h2 className="text-4xl font-bold text-dark">Resource</h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non ratione quis eligendi error.
        </p>
      </section>

      
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <Roadmap />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <PaperPage />
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Resource;
