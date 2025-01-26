import React from "react";
import Navbar from "../components/Navbar";
import Hero from "@/components/Landing/Hero";
import SubscriptionPlans from "@/components/Landing/SubscriptionPlans";
import Footer from "@/components/Footer";
import ServicesWheel from "@/components/Landing/ServiceWhell";
import OurTeam from "@/components/Landing/OurTeam";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-14">
        <Hero />
        <ServicesWheel />
        <SubscriptionPlans />
        <OurTeam />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
