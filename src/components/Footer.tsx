"use client"
import type React from "react"
import { motion } from "framer-motion"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa"

const services = [
  "Game Creation",
  "Marketing & Publishing",
  "Secure Distribution",
  "Monetization",
  "Resource Marketplace",
  "Freelance Hub",
  "Backend as a Service",
  "NFT Integration",
]

const socialLinks = [
  { icon: <FaTwitter />, url: "https://twitter.com" },
  { icon: <FaFacebook />, url: "https://facebook.com" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaGithub />, url: "https://github.com" },
]

const Footer: React.FC = () => {
  return (
    <ParallaxProvider>
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Parallax translateY={[20, -20]}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold mb-4">Xylo</h2>
                <p className="text-gray-400">Empowering game developers with cutting-edge tools and services.</p>
              </motion.div>
            </Parallax>

            <Parallax translateY={[30, -30]}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4">Our Services</h3>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {service}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </Parallax>

            <Parallax translateY={[40, -40]}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4">Developers</h3>
                <ul className="space-y-2 text-gray-400">
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    Krushna Rothe
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    Smit Patel 
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    Nirant Chavda
                  </motion.li>
                </ul>
              </motion.div>
            </Parallax>

            <Parallax translateY={[50, -50]}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </Parallax>
          </div>

          <Parallax translateY={[60, -60]}>
            <motion.div
              className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p>&copy; 2025   Xylo. All rights reserved.</p>
            </motion.div>
          </Parallax>
        </div>
      </footer>
    </ParallaxProvider>
  )
}

export default Footer

