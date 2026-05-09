import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Book Store",
    desc: "Django Book Store Application",
    tag: "Python · Django",
    num: "01",
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio built with React",
    tag: "React · CSS",
    num: "02",
  },
  {
    title: "Todo App",
    desc: "Task management app built with React",
    tag: "React · Hooks",
    num: "03",
  },
  {
    title: "Form Validation",
    desc: "Client-side form validation system",
    tag: "JavaScript · HTML",
    num: "04",
  },
  {
    title: "Calculator",
    desc: "Fully functional calculator app",
    tag: "React · CSS Grid",
    num: "05",
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "#0d1117" : "#090d13",
        border: "1px solid",
        borderColor: hovered ? "#3b82f6" : "#1e2a3a",
        borderRadius: "2px",
        padding: "2rem 2rem 2rem 2.5rem",
        cursor: "default",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${index * 80}ms`,
        overflow: "hidden",
      }}
    >
      {/* left accent bar */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "3px",
        background: hovered
          ? "linear-gradient(to bottom, #3b82f6, #60a5fa)"
          : "linear-gradient(to bottom, #1e3a5f, #0f2035)",
        transition: "background 0.35s ease",
      }} />

      {/* glow on hover */}
      {hovered && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
      )}

      {/* number */}
      <div style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        color: hovered ? "#3b82f6" : "#2d4a6a",
        marginBottom: "0.75rem",
        transition: "color 0.3s ease",
      }}>
        {project.num}
      </div>

      {/* title */}
      <h3 style={{
        fontFamily: "'Syne', 'Clash Display', sans-serif",
        fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
        fontWeight: 700,
        color: hovered ? "#f0f6ff" : "#c8d8ec",
        marginBottom: "0.5rem",
        letterSpacing: "-0.01em",
        transition: "color 0.3s ease",
        lineHeight: 1.2,
      }}>
        {project.title}
      </h3>

      {/* desc */}
      <p style={{
        fontSize: "0.88rem",
        color: "#4a6080",
        lineHeight: 1.65,
        marginBottom: "1.25rem",
        transition: "color 0.3s ease",
      }}>
        {project.desc}
      </p>

      {/* tag */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.72rem",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.04em",
        color: hovered ? "#60a5fa" : "#2d4a6a",
        border: "1px solid",
        borderColor: hovered ? "#1e3a5f" : "#131e2b",
        borderRadius: "2px",
        padding: "3px 10px",
        transition: "all 0.3s ease",
      }}>
        <span style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: hovered ? "#3b82f6" : "#1e3a5f",
          transition: "background 0.3s ease",
        }} />
        {project.tag}
      </div>

      {/* arrow */}
      <div style={{
        position: "absolute",
        right: "1.5rem",
        bottom: "1.5rem",
        fontSize: "1rem",
        color: hovered ? "#3b82f6" : "#1a2d42",
        transform: hovered ? "translate(3px, -3px)" : "translate(0,0)",
        transition: "all 0.3s ease",
        fontWeight: 300,
      }}>
        ↗
      </div>
    </div>
  )
}

function Projects() {
  const headerRef = useRef(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.1 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;600&display=swap');
      `}</style>
      <section
        id="projects"
        style={{
          padding: "5rem 0 6rem",
          background: "#060a0f",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle grid bg */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(30,58,92,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,58,92,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        {/* top glow */}
        <div style={{
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
        }}>
          {/* header */}
          <div
            ref={headerRef}
            style={{
              marginBottom: "3.5rem",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "none" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "#3b82f6",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              Selected work
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#e8f0fe",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
            }}>
              Projects
              <span style={{ color: "#3b82f6" }}>.</span>
            </h2>
            <div style={{
              marginTop: "1rem",
              width: "40px",
              height: "2px",
              background: "linear-gradient(to right, #3b82f6, transparent)",
            }} />
          </div>

          {/* grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: "1px",
            background: "#0d1420",
            border: "1px solid #0d1420",
            borderRadius: "4px",
            overflow: "hidden",
          }}>
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* footer line */}
          <div style={{
            marginTop: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #1e2a3a, transparent)" }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#1e3a5f",
              letterSpacing: "0.1em",
            }}>
              {projects.length} projects
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects