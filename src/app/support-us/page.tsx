"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import type React from "react";
import Waves from "@/components/reactbits/Waves";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface FormData {
  // Base Fields
  fullName: string;
  email: string;
  phone: string;
  userRole: string;

  // Investor/Expert Fields
  companyName?: string;
  investorType?: "individual" | "firm";
  investmentInterest?: string;
  investmentRange?: string;
  fieldOfExpertise?: string;
  mentorCollaboration?: boolean;
  linkedinUrl?: string;

  // Game Developer Fields
  developerType?: "indie" | "studio";
  gameType?: string;
  customTags: string[];
  otherNeeds?: string;

  // Gamer/Visitor Fields
  interests?: string[];
  otherInterests?: string;
  improvementSuggestions?: string;

  // Common Fields
  preferredContact: string;
  heardAboutUs: string;
  message: string;
  customBadge: string;
}

export default function SupportPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    userRole: "",
    preferredContact: "",
    heardAboutUs: "",
    message: "",
    customBadge: "",
    customTags: [],
  });
  const [mounted, setMounted] = useState(false);
  const [customTagInput, setCustomTagInput] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "customTagInput") {
      setCustomTagInput(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const [arrayName, value] = name.split(".");

    if (arrayName === "needs" || arrayName === "interests") {
      setFormData((prev) => ({
        ...prev,
        [arrayName]: checked
          ? [...((prev[arrayName as keyof FormData] as string[]) || []), value]
          : ((prev[arrayName as keyof FormData] as string[]) || []).filter(
              (item) => item !== value
            ),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to your backend
  };

  const handleAddCustomTag = () => {
    if (customTagInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        customTags: [...prev.customTags, customTagInput.trim()],
      }));
      setCustomTagInput("");
    }
  };

  const handleRemoveCustomTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customTags: prev.customTags.filter((_, i) => i !== index),
    }));
  };

  const renderInvestorExpertFields = () => (
    <motion.div className="space-y-6" variants={stagger}>
      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Company/Organization Name *
        </label>
        <input
          type="text"
          name="companyName"
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          onChange={handleInputChange}
          value={formData.companyName || ""}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Investor Type *
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="investorType"
              value="individual"
              className="form-radio h-5 w-5 text-primary border-gray-600 bg-gray-800/60 checked:bg-primary focus:ring-primary focus:ring-offset-gray-900"
              onChange={handleInputChange}
              checked={formData.investorType === "individual"}
            />
            <span className="ml-2 text-white">Individual</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="investorType"
              value="firm"
              className="form-radio h-5 w-5 text-primary border-gray-600 bg-gray-800/60 checked:bg-primary focus:ring-primary focus:ring-offset-gray-900"
              onChange={handleInputChange}
              checked={formData.investorType === "firm"}
            />
            <span className="ml-2 text-white">Firm</span>
          </label>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Investment Interest Level *
        </label>
        <select
          name="investmentInterest"
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          onChange={handleInputChange}
          value={formData.investmentInterest || ""}
        >
          <option value="">Select interest level</option>
          <option value="exploring">Exploring</option>
          <option value="interested">Interested</option>
          <option value="ready">Ready to Invest</option>
        </select>
      </motion.div>

      {selectedRole !== "expert" && (
        <motion.div variants={fadeInUp}>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Preferred Investment Range *
          </label>
          <select
            name="investmentRange"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            onChange={handleInputChange}
            value={formData.investmentRange || ""}
          >
            <option value="">Select range</option>
            <option value="<10k">Less than $10K</option>
            <option value="10k-50k">$10K - $50K</option>
            <option value="50k-100k">$50K - $100K</option>
            <option value="100k+">$100K+</option>
          </select>
        </motion.div>
      )}

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Field of Expertise *
        </label>
        <select
          name="fieldOfExpertise"
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          onChange={handleInputChange}
          value={formData.fieldOfExpertise || ""}
        >
          <option value="">Select field</option>
          <option value="marketing">Marketing</option>
          <option value="development">Game Development</option>
          <option value="monetization">Monetization</option>
          <option value="blockchain">Blockchain</option>
          <option value="strategy">Business Strategy</option>
          <option value="other">Other</option>
        </select>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="mentorCollaboration"
            className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded-sm bg-gray-800/60 checked:bg-primary focus:ring-primary focus:ring-offset-gray-900"
            onChange={handleCheckboxChange}
            checked={formData.mentorCollaboration || false}
          />
          <span className="ml-2 text-white">Willing to Collaborate/Mentor</span>
        </label>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          LinkedIn/Portfolio URL
        </label>
        <input
          type="url"
          name="linkedinUrl"
          className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          onChange={handleInputChange}
          value={formData.linkedinUrl || ""}
        />
      </motion.div>
    </motion.div>
  );

  const renderGameDeveloperFields = () => (
    <motion.div className="space-y-6" variants={stagger}>
      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Developer Type *
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="developerType"
              value="indie"
              className="form-radio h-5 w-5 text-primary border-gray-600 bg-gray-800/60 checked:bg-primary focus:ring-primary focus:ring-offset-gray-900"
              onChange={handleInputChange}
              checked={formData.developerType === "indie"}
            />
            <span className="ml-2 text-white">Indie</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="developerType"
              value="studio"
              className="form-radio h-5 w-5 text-primary border-gray-600 bg-gray-800/60 checked:bg-primary focus:ring-primary focus:ring-offset-gray-900"
              onChange={handleInputChange}
              checked={formData.developerType === "studio"}
            />
            <span className="ml-2 text-white">Studio</span>
          </label>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Type of Game Development *
        </label>
        <select
          name="gameType"
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          onChange={handleInputChange}
          value={formData.gameType || ""}
        >
          <option value="">Select type</option>
          <option value="mobile">Mobile</option>
          <option value="pc">PC</option>
          <option value="console">Console</option>
          <option value="web">Web</option>
          <option value="ar-vr">AR/VR</option>
          <option value="nft">NFT-Based</option>
          <option value="other">Other</option>
        </select>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Need Help With
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            name="customTagInput"
            className="flex-grow px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            placeholder="Enter a custom tag"
            value={customTagInput}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={handleAddCustomTag}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all duration-300"
          >
            Add
          </button>
        </div>
        {formData.customTags.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-200 mb-2">Added:</p>
            <div className="flex flex-wrap gap-2">
              {formData.customTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-primary text-white text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomTag(index)}
                    className="ml-2 text-white hover:text-red-300 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Other Needs
        </label>
        <input
          type="text"
          name="otherNeeds"
          className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          onChange={handleInputChange}
          value={formData.otherNeeds || ""}
        />
      </motion.div>
    </motion.div>
  );

  const renderGamerVisitorFields = () => (
    <motion.div className="space-y-6" variants={stagger}>
      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Interest in Xylo *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {[
            ["playing", "Playing new indie games"],
            ["feedback", "Providing feedback"],
            ["supporting", "Supporting developers"],
            ["other", "Other"],
          ].map(([value, label]) => (
            <label key={value} className="inline-flex items-center">
              <input
                type="checkbox"
                name={`interests.${value}`}
                className="form-checkbox h-5 w-5 text-primary border-gray-600 rounded-sm bg-gray-800/60 checked:bg-primary focus:ring-primary focus:ring-offset-gray-900"
                onChange={handleCheckboxChange}
                checked={(formData.interests || []).includes(value)}
              />
              <span className="ml-2 text-white">{label}</span>
            </label>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Other Interests
        </label>
        <input
          type="text"
          name="otherInterests"
          className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          onChange={handleInputChange}
          value={formData.otherInterests || ""}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Suggestions for Improvement
        </label>
        <textarea
          name="improvementSuggestions"
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          onChange={handleInputChange}
          value={formData.improvementSuggestions || ""}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {mounted && (
        <ParallaxProvider>
          <div className="relative bg-black min-h-screen">
            <Waves
              lineColor="rgba(255, 255, 255, 0.2)"
              backgroundColor="rgba(0, 0, 0, 0.8)"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={40}
              waveAmpY={20}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
              xGap={12}
              yGap={36}
            />
            <AnimatePresence>
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-14 relative z-10"
              >
                {mounted && (
                  <>
                    {/* Hero Section */}
                    <section className="relative py-10 overflow-hidden">
                      <div className="container mx-auto px-4">
                        <Parallax translateY={[-20, 20]}>
                          <motion.div
                            initial="initial"
                            animate="animate"
                            variants={stagger}
                            className="max-w-3xl mx-auto text-center"
                          >
                            <motion.h1
                              className="text-4xl md:text-5xl font-bold text-white mb-6"
                              variants={fadeInUp}
                            >
                              Let&apos;s Shape the Future of Gaming Together
                            </motion.h1>
                            <motion.p
                              className="text-lg text-gray-300 mb-8"
                              variants={fadeInUp}
                            >
                              Whether you&apos;re a game developer, investor,
                              industry expert, or gaming enthusiast, we&apos;re
                              here to support your journey in the gaming
                              industry. Share your needs and let&apos;s create
                              something extraordinary.
                            </motion.p>
                          </motion.div>
                        </Parallax>
                      </div>
                    </section>

                    {/* Form Section */}
                    <section id="support-form" className="py-8">
                      <div className="container mx-auto px-4">
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="max-w-4xl mx-auto bg-black backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                          style={{
                            background: "rgba(255, 255, 255,0.01)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Base Fields */}
                            <div className="grid gap-6 md:grid-cols-2">
                              <motion.div variants={fadeInUp}>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                  Full Name *
                                </label>
                                <input
                                  type="text"
                                  name="fullName"
                                  required
                                  className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                  placeholder="Enter your full name"
                                  onChange={handleInputChange}
                                  value={formData.fullName}
                                />
                              </motion.div>
                              <motion.div variants={fadeInUp}>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                  placeholder="Enter your email"
                                  onChange={handleInputChange}
                                  value={formData.email}
                                />
                              </motion.div>
                            </div>

                            <motion.div variants={fadeInUp}>
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                placeholder="Enter your phone number"
                                onChange={handleInputChange}
                                value={formData.phone}
                              />
                            </motion.div>

                            {/* Role Selection */}
                            <motion.div variants={fadeInUp}>
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                I am a... *
                              </label>
                              <select
                                name="userRole"
                                required
                                value={selectedRole}
                                onChange={(e) => {
                                  setSelectedRole(e.target.value);
                                  handleInputChange(e);
                                }}
                                className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                              >
                                <option value="">Select your role</option>
                                <option value="investor">
                                  Investor/Incubator
                                </option>
                                <option value="expert">Industry Expert</option>
                                <option value="developer">
                                  Game Developer
                                </option>
                                <option value="gamer">
                                  Gamer/General Visitor
                                </option>
                              </select>
                            </motion.div>

                            {/* Dynamic Role-Specific Fields */}
                            <AnimatePresence mode="wait">
                              {selectedRole === "investor" && (
                                <motion.div
                                  key="investor"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {renderInvestorExpertFields()}
                                </motion.div>
                              )}
                              {selectedRole === "expert" && (
                                <motion.div
                                  key="expert"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {renderInvestorExpertFields()}
                                </motion.div>
                              )}
                              {selectedRole === "developer" && (
                                <motion.div
                                  key="developer"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {renderGameDeveloperFields()}
                                </motion.div>
                              )}
                              {selectedRole === "gamer" && (
                                <motion.div
                                  key="gamer"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {renderGamerVisitorFields()}
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Common Fields */}
                            <motion.div
                              variants={fadeInUp}
                              className="space-y-6"
                            >
                              <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                  Preferred Contact Method *
                                </label>
                                <select
                                  name="preferredContact"
                                  required
                                  className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                  onChange={handleInputChange}
                                  value={formData.preferredContact}
                                >
                                  <option value="">
                                    Select contact method
                                  </option>
                                  <option value="email">Email</option>
                                  <option value="phone">Phone</option>
                                  <option value="whatsapp">WhatsApp</option>
                                  <option value="linkedin">LinkedIn</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                  How did you hear about us? *
                                </label>
                                <select
                                  name="heardAboutUs"
                                  required
                                  className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                  onChange={handleInputChange}
                                  value={formData.heardAboutUs}
                                >
                                  <option value="">Select option</option>
                                  <option value="social">Social Media</option>
                                  <option value="website">Website</option>
                                  <option value="word">Word of Mouth</option>
                                  <option value="events">Events</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                  Message *
                                </label>
                                <textarea
                                  name="message"
                                  required
                                  rows={4}
                                  className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                  placeholder="Tell us how we can help you..."
                                  onChange={handleInputChange}
                                  value={formData.message}
                                />
                              </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                              className="flex justify-center"
                              variants={fadeInUp}
                            >
                              <button
                                type="submit"
                                className="inline-flex items-center justify-center space-x-2 px-8 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
                              >
                                <span>Submit Request</span>
                                <Send className="w-4 h-4" />
                              </button>
                            </motion.div>
                          </form>
                        </motion.div>
                      </div>
                    </section>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ParallaxProvider>
      )}
    </>
  );
}
