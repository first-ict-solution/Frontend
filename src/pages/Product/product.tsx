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

  // ✅ Group products by category name
  const groupedProducts = products.reduce((groups: Record<string, Product[]>, product) => {
    const categoryName = product.category?.name || "Uncategorized";
    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }
    groups[categoryName].push(product);
    return groups;
  }, {});

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-8">
          {/* <h2 className="text-3xl font-bold text-dark">Products</h2>
          <p className="text-gray-500 mt-2 mb-20">
            Explore our latest categories and featured products.
          </p> */}
        </div>

        {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
          <div key={categoryName} className="mb-16">
            <h1 className="text-2xl font-bold text-center mb-10">{categoryName}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default ProductsList;
