"use client";

import { useState, useEffect } from "react";
import { Search, X, Menu } from "lucide-react";
import Logo from "../assets/Artboard 6.png";
import { Product, Service } from "@/pages/search/type/type";
import { searchItems } from "@/pages/search/fetcher/fetcher";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ products: Product[]; services: Service[] }>({
    products: [],
    services: [],
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setResults({ products: [], services: [] });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchItems(query);

        const matchedProduct = data.products.find((p: Product) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        const matchedService = data.services.find((s: Service) =>
          s.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults({
          products: matchedProduct ? [matchedProduct] : [],
          services: matchedService ? [matchedService] : [],
        });
      } catch (err) {
        console.error(err);
        setResults({ products: [], services: [] });
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <header className="sticky top-0 z-50  w-full shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/product" className="hover:text-gray-300">Product</a>
            <a href="/service" className="hover:text-gray-300">Service</a>
            <a href="/content" className="hover:text-gray-300">Content</a>
            <a href="/resource" className="hover:text-gray-300">Resource</a>
            <a href="/contact" className="hover:text-gray-300">Contact Us</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-sm text-md"
            >
              Get a Quote
            </button>

            <button onClick={() => setShowSearch(true)} className="hover:text-gray-300">
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover:text-gray-300"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 text-white px-6 py-4 space-y-2">
            <a href="/" className="block py-2 hover:text-gray-300">Home</a>
            <a href="/product" className="block py-2 hover:text-gray-300">Product</a>
            <a href="/service" className="block py-2 hover:text-gray-300">Service</a>
            <a href="/content" className="block py-2 hover:text-gray-300">Content</a>
            <a href="/resource" className="block py-2 hover:text-gray-300">Resource</a>
            <a href="/contact" className="hover:text-gray-300">Contact Us</a>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed top-0 left-0 w-full h-[100] bg-gray-100 z-50 p-6 overflow-auto">
          <button
            onClick={() => setShowSearch(false)}
            className="absolute right-6 top-6 text-black hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products and services..."
              className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-4 bg-white rounded-md shadow-lg max-h-80 overflow-y-auto">
              {loading && <p className="p-4 text-gray-500">Searching...</p>}

              {!loading && query && results.products.length === 0 && results.services.length === 0 && (
                <p className="p-4 text-gray-500">No results found.</p>
              )}

              {!loading && results.products.length > 0 && (
                <div className="border-b px-4 py-2">
                  <h4 className="font-bold mb-2">Products</h4>
                  {results.products.map((item) => (
                    <a
                      key={item.id}
                      href={`/product/${item.slug}`}
                      className="block px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}

              {!loading && results.services.length > 0 && (
                <div className="px-4 py-2">
                  <h4 className="font-bold mb-2">Services</h4>
                  {results.services.map((item) => (
                    <a
                      key={item.id}
                      href={`/service/${item.slug.trim()}`}
                      className="block px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
