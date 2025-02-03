"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa"
import { Parallax } from "react-scroll-parallax"
import Nirant from "@/assets/ourTeam/Nirant.avif"
import Krushna from "@/assets/ourTeam/Krushna.avif"
import Smit from "@/assets/ourTeam/Smit.avif"

interface TeamMember {
  id: number
  name: string
  image: string
  description: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Nirant Chavda",
    image: Nirant.src,
    description: [
      "He’s a final-year CSE student with a strong passion for using technology to tackle real-world challenges. Over the years, he’s developed multiple solutions through coding, always focused on creating practical and impactful tools. With a deep understanding of the potential technology has to change industries, he was drawn to Xylo's mission to simplify game development.",
      "He believes in the power of collaboration and innovation, and with Xylo, he aims to help game developers overcome obstacles and focus more on their creative work."
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/orpheusdark/",
      github: "https://github.com/orpheusdark",
      twitter: "https://x.com/orpheusdark_26",
    },
  },
  {
    id: 2,
    name: "Krushna Rothe",
    image: Krushna.src,
    description: [
      "I’m a final-year CSE student with a passion for using technology to solve real-world problems. I’ve built several web applications and now, with Xylo, I’m turning my hackathon project into a platform that makes game development easier for developers. ",
      "I believe technology can bridge the gap between creativity and development, allowing creators to focus on what matters—bringing their ideas to life. With Xylo, I aim to create tools that shape the future of the gaming industry.",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/krishnarothe-devel0per/",
      github: "https://github.com/krishna0rothe",
    },
  },
  {
    id: 3,
    name: "Smit Patel",
    image: Smit.src,
    description: [
      "I'm a final-year CSE student passionate about coding and solving real-world problems. I started programming at 14 and have since worked on various projects aimed at making a real impact. When I discovered Xylo, I saw an opportunity to help game developers focus on what they do best—creating great games—while we handle the complexities.",
      "I believe technology has the power to simplify development and empower creators to bring their ideas to life. That's why I joined Xylo's mission to change the game development landscape for the better.",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/smit-patel-476286292/",
      github: "https://github.com/gabuPatel0",
    },
  },
];

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleExpand = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <motion.div
      className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-lg shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={toggleExpand}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <Image
        src={member.image || "/placeholder.svg"}
        alt={member.name}
        width={500}
        height={500}
        className={`object-cover w-full h-full transition-all duration-300 ease-in-out ${
          isExpanded ? "scale-110 blur-sm" : ""
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-300 ${
          isExpanded ? "opacity-90" : "opacity-70"
        }`}
      ></div>
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
        <motion.div className="z-10">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{member.name}</h3>
        </motion.div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-end"
            >
              {member.description.map((description, index) => (
                <p key={index} className="text-white text-sm sm:text-base md:text-lg mb-4">
                  {description}
                </p>
              ))}

              <div className="flex space-x-4 mt-2">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform hover:scale-110 transition-transform duration-200"
                    aria-label={`${member.name}'s LinkedIn`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaLinkedin className="text-white text-2xl sm:text-3xl hover:text-blue-400 transition-colors duration-200" />
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform hover:scale-110 transition-transform duration-200"
                    aria-label={`${member.name}'s Twitter`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaTwitter className="text-white text-2xl sm:text-3xl hover:text-blue-400 transition-colors duration-200" />
                  </a>
                )}
                {member.socialLinks.github && (
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform hover:scale-110 transition-transform duration-200"
                    aria-label={`${member.name}'s GitHub`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub className="text-white text-2xl sm:text-3xl hover:text-gray-400 transition-colors duration-200" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const OurTeam: React.FC = () => {
  return (
    <div className="min-h-screen py-8 sm:py-16 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4">
        <Parallax translateY={[-20, 20]}>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-center text-white mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Team
          </motion.h2>
        </Parallax>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Parallax key={member.id} translateY={[20, -20]} scale={[0.9, 1.1]}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
              >
                <TeamMemberCard member={member} />
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurTeam

