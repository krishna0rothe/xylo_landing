//component/Landing
import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useAnimationFrame, type PanInfo } from "framer-motion"
import { services } from "../../data/service-whell"

export default function WheelSelector() {
  const [selectedService, setSelectedService] = useState(services[0])
  const wheelRef = useRef<HTMLDivElement>(null)
  const rotation = useMotionValue(0)
  const springRotation = useSpring(rotation, { stiffness: 100, damping: 30 })

  useAnimationFrame(() => {
    const currentRotation = springRotation.get()
    const normalizedRotation = ((currentRotation % 360) + 360) % 360
    const index = Math.floor(normalizedRotation / 45) % 8
    const selectedIndex = (8 - index - 1 + 8) % 8

    if (selectedService !== services[selectedIndex]) {
      setSelectedService(services[selectedIndex])
    }
  })

  useEffect(() => {
    const wheelElement = wheelRef.current
    if (wheelElement) {
      const handleWheelEvent = (e: WheelEvent) => {
        e.preventDefault()
        rotation.set(rotation.get() - e.deltaY * 0.5)
      }

      let lastTouchX: number | null = null
      const handleTouchStart = (e: TouchEvent) => {
        lastTouchX = e.touches[0].clientX
      }
      const handleTouchMove = (e: TouchEvent) => {
        if (lastTouchX !== null) {
          const deltaX = lastTouchX - e.touches[0].clientX
          rotation.set(rotation.get() + deltaX * 0.5)
          lastTouchX = e.touches[0].clientX
        }
      }

      wheelElement.addEventListener("wheel", handleWheelEvent, { passive: false })
      wheelElement.addEventListener("touchstart", handleTouchStart)
      wheelElement.addEventListener("touchmove", handleTouchMove)

      return () => {
        wheelElement.removeEventListener("wheel", handleWheelEvent)
        wheelElement.removeEventListener("touchstart", handleTouchStart)
        wheelElement.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [rotation])

  const handlePan = (_: TouchEvent | MouseEvent | PointerEvent, info: PanInfo) => {
    const sensitivity = 0.5
    rotation.set(rotation.get() - info.delta.x * sensitivity)
  }

  return (
    <div
      className="services flex flex-col items-center justify-center min-h-[50vh] p-4 lg:p-8 overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        background: `linear-gradient(-165deg, ${selectedService.oppositeColor}22, #000000 30%)`,
      }}
    >
      <h1 className="text-4xl lg:text-4xl font-bold text-white mb-4 lg:mb-8">Services</h1>
      <div className="relative flex flex-col lg:flex-row justify-center items-center max-w-[1400px] mx-auto w-full">
        {/* Wheel Container */}
        <div className="relative w-full max-w-[500px] h-[500px] mb-4 lg:mb-0 lg:translate-y-0 translate-y-1/2">
          <motion.div
            ref={wheelRef}
            style={{ rotate: springRotation }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
            onPan={handlePan}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                {services.map((service) => (
                  <radialGradient
                    key={`gradient-${service.id}`}
                    id={`gradient-${service.id}`}
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="50%"
                    fy="50%"
                  >
                    <stop offset="0%" stopColor={`${service.color}22`} />
                    <stop offset="100%" stopColor="#00000000" />
                  </radialGradient>
                ))}
              </defs>
              <circle cx="50" cy="50" r="49" className="fill-none stroke-white/10" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="18" className="fill-none stroke-white/10" strokeWidth="0.5" />

              {services.map((service, index) => {
                const angle = index * 45
                const startAngle = (angle * Math.PI) / 180
                const endAngle = ((angle + 45) * Math.PI) / 180
                const x1 = 50 + 50 * Math.cos(startAngle)
                const y1 = 50 + 50 * Math.sin(startAngle)
                const x2 = 50 + 50 * Math.cos(endAngle)
                const y2 = 50 + 50 * Math.sin(endAngle)
                const textAngle = angle + 22.5

                return (
                  <g key={service.id}>
                    <path
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                      fill={`url(#gradient-${service.id})`}
                      className="stroke-white/10"
                      strokeWidth="0.2"
                    />
                    <g transform={`rotate(${textAngle} 50 50)`}>
                      <text
                        x="50"
                        y="22"
                        textAnchor="middle"
                        className="select-none font-medium fill-white/60"
                        fontSize="2.5"
                      >
                        {service.title.split(" ").map((word, i) => (
                          <tspan key={i} x="50" dy={i ? "3" : "0"} className="tracking-wider">
                            {word}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  </g>
                )
              })}

              <circle cx="50" cy="50" r="15" className="fill-black/50 stroke-white/10 stroke-[0.5]" />
            </svg>
          </motion.div>
          {/* Selection indicator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-white rounded-b-full pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
        </div>

        {/* Details Card */}
        <div
          className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 lg:p-16 w-full lg:w-[800px] min-h-[400px] lg:min-h-[500px] lg:-ml-48 relative z-10 border border-white/10 shadow-2xl transition-all duration-500 ease-in-out"
          style={{
            background: `linear-gradient(135deg, ${selectedService.color}22, ${selectedService.color}11 30%, #000000 60%)`,
          }}
        >
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-2">
              {selectedService.title}
            </h2>
            <h3 className="text-2xl lg:text-3xl font-semibold text-white/80 mb-6 lg:mb-10">
              {selectedService.subheading}
            </h3>
            {selectedService.description.map((description, index) => (
              <div key={index}>
                <p className="text-xl lg:text-xl text-neutral-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}