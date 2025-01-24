import type React from "react"
import { useRef, useState, useEffect } from "react"

interface PlanFeature {
  text: string
  included: boolean
}

interface Plan {
  name: string
  price: string
  description: string
  features: PlanFeature[]
  buttonText: string
  spotlightColor: string
  gradientFrom: string
  gradientTo: string
}

const plans: Plan[] = [
  {
    name: "Free Plan",
    price: "$0/month",
    description: "Beginners or indie developers testing the platform.",
    features: [
      { text: "Host 1 game with basic storage", included: true },
      { text: "Basic tools for game publishing and community access", included: true },
      { text: "NFT functionality for up to 1 asset", included: true },
      { text: "Access to Xylo's platform for visibility", included: true },
    ],
    buttonText: "Get Started",
    spotlightColor: "rgba(75, 75, 75, 0.2)",
    gradientFrom: "from-gray-600",
    gradientTo: "to-gray-800",
  },
  {
    name: "Growth Plan",
    price: "$19/month",
    description: "Small teams starting to scale.",
    features: [
      { text: "Host up to 3 games with 10GB storage each", included: true },
      { text: "Secure distribution with piracy protection", included: true },
      { text: "Access to monetization tools", included: true },
      { text: "NFT integration for up to 5 assets per game", included: true },
      { text: "Full access to Xylo's resource marketplace", included: true },
    ],
    buttonText: "Choose Growth",
    spotlightColor: "rgba(0, 229, 255, 0.2)",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600",
  },
  {
    name: "Pro Plan",
    price: "$49/month",
    description: "Studios or advanced developers scaling operations.",
    features: [
      { text: "Host up to 10 games with 50GB storage each", included: true },
      { text: "Advanced piracy protection for all games", included: true },
      { text: "Access to global monetization tools", included: true },
      { text: "Unlimited NFT integration for unique game assets", included: true },
      { text: "Backend APIs for multiplayer, leaderboards, and analytics", included: true },
      { text: " marketing and promotional support", included: true },
    ],
    buttonText: "Go Pro",
    spotlightColor: "rgba(255, 215, 0, 0.2)",
    gradientFrom: "from-yellow-400",
    gradientTo: "to-yellow-600",
  },
  {
    name: "Custom Studio Plan",
    price: "Custom",
    description: "Large studios or enterprises needing tailored solutions.",
    features: [
      { text: "Unlimited games and storage tailored to specific needs", included: true },
      { text: "Fully customized API integrations", included: true },
      { text: "Dedicated account manager with 24/7 priority support", included: true },
      { text: "Bespoke marketing strategies and launch campaigns", included: true },
      { text: "Flexible revenue-sharing agreements", included: true },
    ],
    buttonText: "Contact Us",
    spotlightColor: "rgba(255, 0, 255, 0.2)",
    gradientFrom: "from-purple-400",
    gradientTo: "to-purple-600",
  },
]

const SubscriptionPlans: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string; spotlightColor?: string; style?: React.CSSProperties }> = ({
    children,
    className = "",
    spotlightColor = "rgba(255, 255, 255, 0.25)",
  }) => {
    const divRef = useRef<HTMLDivElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current || isFocused) return

      const rect = divRef.current.getBoundingClientRect()
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleFocus = () => {
      setIsFocused(true)
      setOpacity(0.6)
    }

    const handleBlur = () => {
      setIsFocused(false)
      setOpacity(0)
    }

    const handleMouseEnter = () => {
      setOpacity(0.6)
    }

    const handleMouseLeave = () => {
      setOpacity(0)
    }

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 transition-all duration-300 ease-in-out hover:scale-105 ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
        {children}
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {plans.map((plan, index) => (
            <SpotlightCard
              key={index}
              className="flex flex-col h-full animate-fade-in-up"
              spotlightColor={plan.spotlightColor}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-3xl font-bold mb-4">{plan.price}</div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <svg
                      className={`w-4 h-4 mr-2 ${feature.included ? "text-green-500" : "text-red-500"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={feature.included ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12" }
                      />
                    </svg>
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button
                className={`bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-opacity-50 mt-auto`}
              >
                {plan.buttonText}
              </button>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SubscriptionPlans
