import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Home/Home";
import ProductsPage from "@/pages/Product/product";
import ProductDetail from "@/pages/Product/detailProduct";
import ServiceList from "@/pages/Service/service";
import ServiceDetail from "@/pages/Service/serviceDetail";
import ContentPage from "@/pages/content/content";
import ContentDetailPage from "@/pages/content/contentDetail";
import Resource from "@/pages/Resource/Resource";
import Contact from "@/pages/Contact/contact";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/contents" element={<ContentPage />} />
      <Route path="/contents/:slug" element={<ContentDetailPage />} />
      <Route path="/resources" element={<Resource />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
