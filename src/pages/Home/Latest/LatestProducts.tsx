import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/pages/Product/fetcher/fetcher";
import type { Product } from "@/types";
import ProductCard from "@/pages/Product/productCard";

export default function LatestProducts({ onData }: { onData?: (v: boolean) => void }) {
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
        const data = await getLatestProducts(4);
        const list = data.products || [];
        setProducts(list);
        if (onData) onData(list.length > 0);
      } catch (error) {
        console.error("Failed to fetch latest products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="py-10 text-center">Loading products...</p>;
  if (products.length === 0)
    return <div></div>;

  return (
    <section className="relative w-full overflow-visible">
      <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="mb-12 text-center" data-aos="fade-up">
          <h2 className="mb-3 text-4xl font-bold text-gray-900">
            Our Latest Products
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Explore our latest categories and featured products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
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
