"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"
import type React from "react" // Added import for React

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

interface FormData {
  // Base Fields
  fullName: string
  email: string
  phone: string
  userRole: string

  // Investor/Expert Fields
  companyName?: string
  investorType?: "individual" | "firm"
  investmentInterest?: string
  investmentRange?: string
  fieldOfExpertise?: string
  mentorCollaboration?: boolean
  linkedinUrl?: string

  // Game Developer Fields
  developerType?: "indie" | "studio"
  gameType?: string
  customTags: string[]
  otherNeeds?: string

  // Gamer/Visitor Fields
  interests?: string[]
  otherInterests?: string
  improvementSuggestions?: string

  // Common Fields
  preferredContact: string
  heardAboutUs: string
  message: string
  customBadge: string
}

export default function SupportForm() {
  const [selectedRole, setSelectedRole] = useState("")
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
  })

  const [customTagInput, setCustomTagInput] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "customTagInput") {
      setCustomTagInput(value)
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the form data to your backend
  }



  const handleAddCustomTag = () => {
    if (customTagInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        customTags: [...prev.customTags, customTagInput.trim()],
      }))
      setCustomTagInput("")
    }
  }

  const handleRemoveCustomTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customTags: prev.customTags.filter((_, i) => i !== index),
    }))
  }

  const renderInvestorExpertFields = () => (
    <motion.div className="space-y-6" variants={stagger}>
      {/* ... (investor/expert fields) ... */}
    </motion.div>
  )

  const renderGameDeveloperFields = () => (
    <motion.div className="space-y-6" variants={stagger}>
      {/* ... (game developer fields) ... */}
    </motion.div>
  )

  const renderGamerVisitorFields = () => (
    <motion.div className="space-y-6" variants={stagger}>
      {/* ... (gamer/visitor fields) ... */}
    </motion.div>
  )

  return (
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
            <label className="block text-sm font-medium text-gray-200 mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter your full name"
              onChange={handleInputChange}
              value={formData.fullName}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className="block text-sm font-medium text-gray-200 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </motion.div>
        </div>

        <motion.div variants={fadeInUp}>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter your phone number"
          />
        </motion.div>

        {/* Role Selection */}
        <motion.div variants={fadeInUp}>
          <label className="block text-sm font-medium text-gray-200 mb-2">I am a... *</label>
          <select
            name="userRole"
            required
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value)
              handleInputChange(e)
            }}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select your role</option>
            <option value="investor">Investor/Incubator</option>
            <option value="expert">Industry Expert</option>
            <option value="developer">Game Developer</option>
            <option value="gamer">Gamer/General Visitor</option>
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
        <motion.div variants={fadeInUp} className="space-y-6">
          <div>
            <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-200 mb-2">
              Preferred Contact Method
            </label>
            <select
              id="preferredContact"
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select your preferred contact method</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <div>
            <label htmlFor="heardAboutUs" className="block text-sm font-medium text-gray-200 mb-2">
              How did you hear about us?
            </label>
            <select
              id="heardAboutUs"
              name="heardAboutUs"
              value={formData.heardAboutUs}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select an option</option>
              <option value="google">Google</option>
              <option value="socialMedia">Social Media</option>
              <option value="referral">Referral</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-32"
              placeholder="Enter your message"
              required
            />
          </div>

          <div>
            <label htmlFor="customBadge" className="block text-sm font-medium text-gray-200 mb-2">
              Custom Badge (Optional)
            </label>
            <input
              type="text"
              id="customBadge"
              name="customBadge"
              value={formData.customBadge}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter a custom badge"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Custom Tags (Optional)</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter a tag"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap mt-2">
              {formData.customTags.map((tag, index) => (
                <div key={index} className="bg-gray-700 text-white px-3 py-1 rounded mr-2 mb-2">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomTag(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div className="flex justify-center" variants={fadeInUp}>
          <button
            type="submit"
            className="inline-flex items-center justify-center space-x-2 px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            <span>Submit Request</span>
            <Send className="w-4 h-4" />
          </button>
        </motion.div>
      </form>
    </motion.div>
  )
}

