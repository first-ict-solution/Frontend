import React from "react";
import AppRouter from "./lib/router/routes"; 
import Navbar from "@/components/Navbar";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
