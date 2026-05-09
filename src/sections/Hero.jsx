import { useEffect, useRef, useState } from "react"

const ROLES = [
  "Python Full Stack Developer",
  "React Developer",
  "Django Developer",
  "UI/UX Enthusiast",
]

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setWordIdx(w => (w + 1) % words.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

function FloatingOrb({ style }) {
  return (
    <div style={{
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(80px)",
      pointerEvents: "none",
      ...style,
    }} />
  )
}

function Hero() {
  const role = useTypewriter(ROLES)
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setMounted(true), 80)
  }, [])

  // Particle dots background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let raf
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${p.o})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  const handleScroll = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const fadeUp = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 14px rgba(59,130,246,0); }
          100% { transform: scale(0.95); }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero-btn-primary:hover { background: #2563eb !important; transform: translateY(-2px) !important; box-shadow: 0 0 28px rgba(59,130,246,0.45) !important; }
        .hero-btn-secondary:hover { border-color: #3b82f6 !important; color: #93c5fd !important; transform: translateY(-2px) !important; }
        .hero-btn-primary, .hero-btn-secondary { transition: all 0.25s cubic-bezier(0.4,0,0.2,1) !important; }
        .scroll-arrow:hover { color: #60a5fa !important; }
      `}</style>

      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "#060a0f",
        color: "#fff",
        padding: "0 1.5rem",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Canvas particles */}
        <canvas ref={canvasRef} style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none",
        }} />

        {/* Ambient orbs */}
        <FloatingOrb style={{ width: 500, height: 500, top: "-180px", left: "50%", transform: "translateX(-50%)", background: "rgba(29,78,216,0.12)" }} />
        <FloatingOrb style={{ width: 300, height: 300, bottom: "10%", right: "-80px", background: "rgba(59,130,246,0.08)" }} />
        <FloatingOrb style={{ width: 200, height: 200, bottom: "20%", left: "-60px", background: "rgba(96,165,250,0.06)" }} />

        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(30,58,92,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,92,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px", pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", width: "100%" }}>

          {/* Badge */}
          <div style={{ ...fadeUp(0), display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1px solid #1e3a5f",
              borderRadius: "100px",
              padding: "6px 18px",
              background: "rgba(59,130,246,0.06)",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", animation: "pulse-ring 2s ease-out infinite" }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem", letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#60a5fa",
              }}>
                Available for opportunities
              </span>
            </div>
          </div>

          {/* Heading */}
          <div style={fadeUp(120)}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#2d4a6a",
              marginBottom: "0.85rem",
            }}>
              Welcome to my portfolio
            </p>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: "0 0 0.25rem",
              color: "#e8f0fe",
            }}>
              Hi, I'm{" "}
              <span style={{
                color: "#3b82f6",
                position: "relative",
                display: "inline-block",
              }}>
                Satheesh
                <span style={{
                  position: "absolute", bottom: "4px", left: 0, right: 0,
                  height: "3px", borderRadius: "2px",
                  background: "linear-gradient(to right, #3b82f6, #60a5fa, transparent)",
                }} />
              </span>
            </h1>
          </div>

          {/* Typewriter role */}
          <div style={{ ...fadeUp(240), margin: "1.25rem 0 1.5rem", minHeight: "2rem" }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "#4a7ab5",
              letterSpacing: "0.02em",
            }}>
              {role}
              <span style={{ animation: "blink 1s step-end infinite", color: "#3b82f6" }}>|</span>
            </span>
          </div>

          {/* Bio */}
          <p style={{
            ...fadeUp(320),
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "#4a6080",
            lineHeight: 1.75,
            maxWidth: "580px",
            margin: "0 auto 2.75rem",
          }}>
            Passionate about building <span style={{ color: "#60a5fa", fontWeight: 500 }}>modern</span>,{" "}
            <span style={{ color: "#60a5fa", fontWeight: 500 }}>responsive</span>, and{" "}
            <span style={{ color: "#60a5fa", fontWeight: 500 }}>scalable</span> web applications
            using React, Django, and Tailwind CSS.
          </p>

          {/* Tech pills */}
          <div style={{ ...fadeUp(400), display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {["React", "Django", "Python", "Tailwind CSS"].map(tech => (
              <span key={tech} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem", letterSpacing: "0.06em",
                padding: "4px 12px",
                border: "1px solid #1a2d42",
                borderRadius: "2px",
                color: "#2d4a6a",
                background: "rgba(59,130,246,0.04)",
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ ...fadeUp(480), display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={handleScroll}
              className="hero-btn-primary"
              style={{
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                padding: "13px 32px",
                borderRadius: "3px",
                fontSize: "0.95rem",
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              View Projects ↗
            </button>

            <a
              href="#contact"
              className="hero-btn-secondary"
              style={{
                border: "1px solid #1e3a5f",
                color: "#4a7ab5",
                padding: "13px 32px",
                borderRadius: "3px",
                fontSize: "0.95rem",
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: "none",
                letterSpacing: "0.01em",
                display: "inline-block",
              }}
            >
              Contact Me
            </a>
          </div>

          {/* Scroll indicator */}
          <div style={{ ...fadeUp(600), marginTop: "4.5rem" }}>
            <a
              href="#about"
              className="scroll-arrow"
              style={{
                color: "#1e3a5f",
                fontSize: "1.4rem",
                textDecoration: "none",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                animation: "float-y 2.5s ease-in-out infinite",
                transition: "color 0.2s ease",
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem", letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}>
                scroll
              </span>
              ↓
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero