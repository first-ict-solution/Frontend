import React, { useEffect, useState } from "react";
import { getLatestProducts } from "../Product/fetcher/fetcher"; 
import type { Product } from "../Product/type/type";
import ProductCard from "./productCard";
import Footer from "@/components/Footer";

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getLatestProducts(20);
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <>

    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#0067c2]">Products</h2>
        <p className="text-gray-500 mt-2 mb-20">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non ratione quis eligendi error.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      
    </div>

    
    <Footer />
  </>
);
  
};

export default ProductsList;
