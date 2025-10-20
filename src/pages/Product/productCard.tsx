import React from "react";
import type { Product } from "@/types";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const currentPrice = Number(product.price);
  const discount = Number(product.discount) || 0;
  const originalPrice = currentPrice + discount;
  const discountPercent =
    originalPrice > 0 ? Math.round((discount / originalPrice) * 100) : 0;

  return (
    <div className="relative bg-[#303650] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group w-64">
      {discountPercent > 0 && (
        <div className="absolute top-0 right-0 z-10 w-16 h-16 overflow-hidden">
          <div
            className="w-full h-full bg-[#0067C2] relative"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
          >
            <span className="absolute top-3 right-1 text-white font-bold text-[10px] rotate-45">
              {discountPercent}% Off
            </span>
          </div>
        </div>
      )}

      {product.default_image ? (
        <img
          src={product.default_image}
          alt={product.name}
          className="object-cover w-full h-36"
        />
      ) : (
        <div className="flex items-center justify-center w-full bg-gray-200 h-36">
          <span className="text-sm text-gray-400">No Image</span>
        </div>
      )}

      <div className="p-4 text-white">
        <h3 className="mb-1 text-lg font-semibold min-h-[56px]">
          {product.name}
        </h3>
        <p className="mb-2 text-xs text-gray-300">
          {product.category?.name || product.category_name}
        </p>

        <div className="flex items-center gap-2 mb-2">
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              Ks {originalPrice}
            </span>
          )}
          <span className="text-base font-bold">Ks {currentPrice}</span>
        </div>

        <p className="mb-2 text-sm font-medium text-teal-400">
          {product.instock ? "Instock" : "Out of Stock"}
        </p>

        <Link
          to={`/products/${product.slug}`}
          className="w-full bg-[#0067c2] text-white py-1.5 rounded-md hover:bg-[#1381dcff] transition-colors duration-200 font-semibold text-sm flex justify-center items-center"
        >
          Show Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
