"use client";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/pages/Product/fetcher/fetcher";
import type { Product, PaginatedResponse } from "@/pages/Product/type/type";
import ProductCard from "@/pages/Product/productCard";

export default function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false, 
      offset: 100, 
    });

    const fetchProducts = async () => {
      try {
        const data: PaginatedResponse<Product> = await getLatestProducts(4);
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch latest products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;
  if (products.length === 0)
    return <p className="text-center py-10">No products found.</p>;

  return (
    <section className="relative w-full overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Our Latest Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our latest categories and featured products.
          </p>
        </div>

        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-6 
            place-items-center
          "
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="w-full max-w-[270px] flex justify-center overflow-visible" // overflow-visible for AOS animations
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
