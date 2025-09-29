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
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Our Latest Products
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non ratione
          quis eligendi error.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={product.id} data-aos="fade-up" data-aos-delay={index * 100}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
