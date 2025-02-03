import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styled, { createGlobalStyle } from "styled-components"
import { services } from "@/data/services"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
`

const HeroContainer = styled.div<{ $color: string }>`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${(props) => `linear-gradient(to top right, rgba(0, 0, 0, 0.6) 40%, ${props.$color}60 100%)`};
  
  @media (max-width: 768px) {   
    min-height: 100vh;
  }
`

const ShapesContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`

const ElegantShapeWrapper = styled(motion.div)<{ $width: number; $height: number }>`
  position: absolute;

  .shape-container {
    position: relative;
    width: ${(props) => props.$width}px;
    height: ${(props) => props.$height}px;
  }

  .shape {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    backdrop-filter: blur(2px);
    border: 2px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.1);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%);
    }
  }
`

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  padding: 0 24px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`

const ContentColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }

  .title-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to bottom, white, rgba(255, 255, 255, 0.8));
  }

  .stylized {
    font-family: 'Pacifico', cursive;
    background-image: linear-gradient(to right, #333, rgba(255, 255, 255, 0.9), #1E1E1E);
  }
`

const HeroDescription = styled(motion.p)`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 32rem;
`

const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`

const Button = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &.primary {
    background-color: white;
    color: black;

    &:hover {
      background-color: #e5e5e5;
    }
  }

  &.secondary {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  .arrow-icon {
    margin-left: 8px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover .arrow-icon {
    transform: translateX(4px);
  }
`

const Disclaimer = styled(motion.p)`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.4);
`

const PreviewColumn = styled(motion.div)`
  position: relative;
`

const PreviewContainer = styled.div`
  position: relative;
`

const DashboardPreview = styled(motion.div)`
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`

const FeatureCard = styled(motion.div)`
  position: absolute;
  bottom: -16px;
  left: -16px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 18rem;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    margin-bottom: 6px;
  }

  p {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.8);
  }
`

const OverlayGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #030303, transparent, rgba(3, 3, 3, 0.8));
  pointer-events: none;
`

const ElegantShape: React.FC<{
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}> = ({ className, delay = 0, width = 400, height = 100, rotate = 0, gradient = "rgba(255,255,255,0.08)" }) => {
  return (
    <ElegantShapeWrapper
      $width={width}
      $height={height}
      className={className}
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
    >
      <motion.div
        className="shape-container"
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div
          className="shape"
          style={{
            background: `linear-gradient(to right, ${gradient}, transparent)`,
          }}
        />
      </motion.div>
    </ElegantShapeWrapper>
  )
}

const HeroGeometric: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>([])

  useEffect(() => {
    services.map((service) => {
      const img = new Image()
      img.src = service.image
      img.onload = () => {
        setPreloadedImages((prevImages) => [...prevImages, img])
      }
      return img
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentService = services[currentIndex]

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const handleExploreServicesClick = () => {
    const servicesWheelSection = document.getElementById("services-wheel")
    if (servicesWheelSection) {
      const yOffset = -56 // Adjust this value if pt-14 is different
      const y = servicesWheelSection.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <>
      <GlobalStyle />
      <HeroContainer $color={currentService.color}>
        <ShapesContainer>
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="rgba(99, 102, 241, 0.15)"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="rgba(244, 114, 182, 0.15)"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="rgba(139, 92, 246, 0.15)"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />
          <ElegantShape
            delay={0.6}
            width={200}
            height={60}
            rotate={20}
            gradient="rgba(251, 191, 36, 0.15)"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />
          <ElegantShape
            delay={0.7}
            width={150}
            height={40}
            rotate={-25}
            gradient="rgba(6, 182, 212, 0.15)"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          />
        </ShapesContainer>

        <ContentContainer>
          <GridContainer>
            <ContentColumn initial="hidden" animate="visible" variants={fadeUpVariants}>
              <motion.div custom={0} variants={fadeUpVariants}>
                <HeroTitle>
                  <span className="title-gradient">Your Partner in</span>
                  <br />
                  <span className="title-gradient stylized">Building the Next</span>
                  <br />
                  <span className="title-gradient">Gaming Masterpiece</span>
                </HeroTitle>
              </motion.div>

              <HeroDescription custom={1} variants={fadeUpVariants}>
                Take your game to the next level with Xylo. From seamless publishing and marketing to easy monetization
                options, our platform takes care of the rest, letting you focus on what truly matters creating
                unforgettable games.
              </HeroDescription>

              <ButtonContainer custom={2} variants={fadeUpVariants}>
                <Button className="primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Get Started Free
                  <span className="arrow-icon">→</span>
                </Button>
                <Button
                  className="secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExploreServicesClick}
                >
                  Explore Services
                </Button>
              </ButtonContainer>

              <Disclaimer custom={3} variants={fadeUpVariants}>
                No credit card required • Free tier available
              </Disclaimer>
            </ContentColumn>

            <PreviewColumn
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PreviewContainer>
                <AnimatePresence mode="wait">
                  <DashboardPreview
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.img
                      src={preloadedImages[currentIndex]?.src || currentService.image}
                      alt={`${currentService.title} Preview`}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </DashboardPreview>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <FeatureCard
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentService.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentService.oneLiner}
                    </motion.p>
                  </FeatureCard>
                </AnimatePresence>
              </PreviewContainer>
            </PreviewColumn>
          </GridContainer>
        </ContentContainer>

        <OverlayGradient />
      </HeroContainer>
    </>
  )
}

export default HeroGeometric

