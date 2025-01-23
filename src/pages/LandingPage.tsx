import React from "react";
import Navbar from "../components/Navbar";
import Hero from "@/components/Landing/Hero";
import {Service} from "@/components/Landing/Service";
import SubscriptionPlans from "@/components/Landing/SubscriptionPlans";
import Footer from "@/components/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto pt-14">
        <Hero />
        <Service />
        <SubscriptionPlans />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
