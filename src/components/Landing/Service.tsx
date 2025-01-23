import type React from "react"
import { motion } from "framer-motion"
import { FaGamepad, FaAd, FaShieldAlt, FaChartLine, FaStore, FaUsers, FaCode, FaPuzzlePiece } from "react-icons/fa"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"

const services = [
  {
    title: "Game Creation",
    description: "Simplify your game development process with our comprehensive tools and resources.",
    icon: <FaGamepad />,
    color: "#00FFFF", // Cyan
  },
  {
    title: "Marketing & Publishing",
    description: "Promote and publish your games with ease using our integrated marketing tools.",
    icon: <FaAd />,
    color: "#FF00FF", // Magenta
  },
  {
    title: "Secure Distribution",
    description: "Distribute your games securely with built-in piracy protection measures.",
    icon: <FaShieldAlt />,
    color: "#FFFF00", // Yellow
  },
  {
    title: "Monetization",
    description: "Easily integrate in-game purchases and ads to monetize your creations.",
    icon: <FaChartLine />,
    color: "#00FF00", // Green
  },
  {
    title: "Resource Marketplace",
    description: "Access a wide range of game development resources in our marketplace.",
    icon: <FaStore />,
    color: "#FF0000", // Red
  },
  {
    title: "Freelance Hub",
    description: "Connect with talented freelancers to enhance your game development process.",
    icon: <FaUsers />,
    color: "#0000FF", // Blue
  },
  {
    title: "Backend as a Service",
    description: "Utilize our APIs for multiplayer, leaderboards, and data management.",
    icon: <FaCode />,
    color: "#FFA500", // Orange
  },
  {
    title: "NFT Integration",
    description: "Seamlessly integrate NFTs into your games for unique player experiences.",
    icon: <FaPuzzlePiece />,
    color: "#800080", // Purple
  },
]

const StarBorder: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => {
  return (
    <div className="relative inline-block py-[1px] overflow-hidden rounded-[20px] w-full h-full">
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
        }}
      ></div>
      {children}
    </div>
  )
}

const ServiceCard: React.FC<{ service: (typeof services)[0] }> = ({ service }) => {
  return (
    <Parallax translateY={[0, -20]}>
      <StarBorder color={service.color}>
        <motion.div
          className="relative z-1 bg-black border border-white/10 rounded-[20px] p-6 transition-all duration-300 ease-in-out hover:bg-white group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="text-4xl mb-4 text-white group-hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-black transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-700 transition-colors duration-300">
              {service.description}
            </p>
          </div>
        </motion.div>
      </StarBorder>
    </Parallax>
  )
}

export const Service: React.FC = () => {
  return (
    <ParallaxProvider>
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <Parallax translateY={[-20, 20]}>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-center mb-12 text-white"
            >
              Our Services
            </motion.h2>
          </Parallax>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>
    </ParallaxProvider>
  )
}

