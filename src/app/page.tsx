"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Hero from "@/components/Landing/Hero"
import SubscriptionPlans from "@/components/Landing/SubscriptionPlans"
import ServicesWheel from "@/components/Landing/ServiceWhell"
import OurTeam from "@/components/Landing/OurTeam"
import { services } from "@/data/services"
import { ParallaxProvider } from "react-scroll-parallax"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const images = services.map((service) => {
      const img = new Image()
      img.src = service.image
      img.onload = () => {}
      img.onerror = () => {
        setError(true)
      }
      return img
    })

    // Check if all images are loaded
    const checkImagesLoaded = () => {
      if (images.every((img) => img.complete)) {
        setLoading(false)
      }
    }

    // Add event listeners to check if images are loaded
    images.forEach((img) => {
      img.onload = checkImagesLoaded
      img.onerror = checkImagesLoaded
    })

    // Initial check in case images are cached
    checkImagesLoaded()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        {error ? "Failed to load resources. Please try again later." : "Loading..."}
      </div>
    )
  }

  return (
    <ParallaxProvider>
      <div className="bg-black text-white min-h-screen">
        <div className="pt-14">
          <Hero />
          <div id="services-wheel">
            <ServicesWheel />
          </div>
          <SubscriptionPlans />
          <OurTeam />
        </div>
      </div>
      </ParallaxProvider>
  )
}
