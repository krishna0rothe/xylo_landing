"use client"
import { useState, useEffect } from "react"
import { ChevronDown, Menu, X, Circle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Types
interface NavItemProps {
  text: string
  hasDropdown?: boolean
  items?: DropdownItem[]
}

interface DropdownItem {
  title: string
  description: string
  longDescription: string
  status?: "stable" | "beta" | "alpha" | "new"
}

interface MobileNavItemProps {
  text: string
  items?: DropdownItem[]
}

// Status indicator component
function StatusDot({ status }: { status?: DropdownItem["status"] }) {
  if (!status) return null

  const colors = {
    stable: "bg-green-400",
    beta: "bg-yellow-400",
    alpha: "bg-red-400",
    new: "bg-blue-400",
  }

  return (
    <span
      className={`inline-flex h-2 w-2 rounded-full ${colors[status]} ring-2 ring-offset-2 ring-offset-black/95 ring-${colors[status]}/30`}
    />
  )
}

// Sample dropdown data
const productItems: DropdownItem[] = [
  {
    title: "Game Creation",
    description: "Build and deploy games easily",
    longDescription:
      "Comprehensive tools and services to streamline your game development process, from ideation to deployment.",
    status: "stable",
  },
  {
    title: "Marketing Tools",
    description: "Promote your games effectively",
    longDescription: "Advanced marketing solutions to help you reach your target audience and grow your player base.",
    status: "beta",
  },
  {
    title: "Distribution",
    description: "Secure game distribution",
    longDescription: "Protected distribution channels with built-in piracy prevention and analytics tracking.",
    status: "new",
  },
  {
    title: "Analytics Suite",
    description: "Testing and performance metrics",
    longDescription:
      "Comprehensive analytics tools to track game performance, user behavior, and monetization metrics in real-time.",
    status: "alpha",
  },
]

const solutionItems: DropdownItem[] = [
  {
    title: "For Indies",
    description: "Perfect for solo developers",
    longDescription:
      "Tailored solutions for independent developers, including resource management and community building tools.",
    status: "stable",
  },
  {
    title: "For Studios",
    description: "Scale your game studio",
    longDescription:
      "Enterprise-grade solutions to help gaming studios manage multiple projects and large teams effectively.",
    status: "new",
  },
  {
    title: "For Publishers",
    description: "Streamline publishing workflow",
    longDescription:
      "Complete publishing pipeline management with automated testing, deployment, and monitoring capabilities.",
    status: "beta",
  },
]

const resourceItems: DropdownItem[] = [
  {
    title: "Documentation",
    description: "Detailed guides and API docs",
    longDescription:
      "Comprehensive documentation covering all aspects of the platform, including tutorials and API references.",
    status: "stable",
  },
  {
    title: "Community",
    description: "Join the developer community",
    longDescription: "Connect with other game developers, share knowledge, and get help from our active community.",
    status: "beta",
  },
  {
    title: "Marketplace",
    description: "Assets and resources",
    longDescription: "Access a wide range of game assets, tools, and resources to accelerate your development process.",
    status: "new",
  },
]

// NavItem Component with Dropdown
function NavItem({ text, hasDropdown, items = [] }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(items[0])
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setIsOpen(false), 300)
    setHoverTimeout(timeout)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout)
    }
  }, [hoverTimeout])

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{text}</span>
        {hasDropdown && <ChevronDown size={16} />}
      </motion.button>

      {hasDropdown && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-[600px] p-4 bg-black/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/60 rounded-lg border border-gray-800 shadow-xl"
            >
              <div className="grid grid-cols-5  gap-4">
                <div className="col-span-2 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.title}
                      className="p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
                      onMouseEnter={() => setActiveItem(item)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <StatusDot status={item.status} />
                      </div>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="col-span-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white font-medium">{activeItem?.title}</h4>
                    <StatusDot status={activeItem?.status} />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{activeItem?.longDescription}</p>
                  {activeItem?.status && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                      <Circle size={8} className="fill-current" />
                      <span className="capitalize">{activeItem.status}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

// MobileNavItem Component
function MobileNavItem({ text, items = [] }: MobileNavItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
      >
        <span>{text}</span>
        {items.length > 0 && (
          <ChevronDown size={16} className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
        )}
      </button>
      {isOpen && items.length > 0 && (
        <div className="pl-6 space-y-2">
          {items.map((item) => (
            <a
              key={item.title}
              href="#"
              className="block py-1 text-sm text-gray-400 hover:text-white transition-colors"
            >
              {item.title}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// Button Component
function Button({
  variant = "default",
  className = "",
  children,
  ...props
}: {
  variant?: "default" | "ghost"
  className?: string
  children: React.ReactNode
  [key: string]: unknown
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  const variantStyles = {
    default: "bg-white text-black hover:bg-gray-100",
    ghost: "text-gray-300 hover:text-white",
  }

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Main Navbar Component
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo and Nav Items */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Xylo</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <NavItem text="Products" hasDropdown items={productItems} />
              <NavItem text="Solutions" hasDropdown items={solutionItems} />
              <NavItem text="Resources" hasDropdown items={resourceItems} />
              <NavItem text="Enterprise" />
              <NavItem text="Docs" />
              <NavItem text="Pricing" />
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href={"/"} >
            <Button variant="ghost" className="px-4 py-2">
              About Us
            </Button>
          </Link>
            <Link href="/support-us">
            <Button variant="default" className="px-4 py-2">
              Support Us
            </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              <MobileNavItem text="Products" items={productItems} />
              <MobileNavItem text="Solutions" items={solutionItems} />
              <MobileNavItem text="Resources" items={resourceItems} />
              <MobileNavItem text="Enterprise" />
              <MobileNavItem text="Docs" />
              <MobileNavItem text="Pricing" />
              <div className="pt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start px-3 py-2">
                  Log In
                </Button>
                <Button variant="ghost" className="w-full justify-start px-3 py-2">
                  Contact
                </Button>
                <Button variant="default" className="w-full px-3 py-2">
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

