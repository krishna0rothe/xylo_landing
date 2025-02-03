"use client"

import type React from "react"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
  outlineWidth?: number
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  className = "",
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 8,
  outlineWidth = 2,
  ...props
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  }

  return (
    <button
      className={`gradient-button ${className}`}
      style={
        {
          "--outline-width": `${outlineWidth}px`,
          "--animation-duration": `${animationSpeed}s`,
        } as React.CSSProperties
      }
      {...props}
    >
      <span className="gradient-outline" style={gradientStyle} />
      <span className="gradient-text" style={gradientStyle}>
        {children}
      </span>
      <style jsx>{`
        .gradient-button {
          position: relative;
          padding: 10px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          overflow: hidden;
        }
        .gradient-outline {
          position: absolute;
          inset: 0;
          border-radius: 4px;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          padding: var(--outline-width);
        }
        .gradient-text {
          position: relative;
          z-index: 1;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        .gradient-outline,
        .gradient-text {
          animation: gradient var(--animation-duration) linear infinite;
          background-size: 200% auto;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </button>
  )
}

export default GradientButton

