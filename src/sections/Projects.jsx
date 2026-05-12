import { useEffect, useRef, useState } from "react"

const PROJECTS = [
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

// Reusable hook for intersection observer
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold }
    )

    const current = ref.current
    if (current) observer.observe(current)
    return () => current && observer.unobserve(current)
  }, [threshold])

  return [ref, isVisible]
}

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useInView()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${project.title} project card`}
      style={{
       ...styles.card,
       ...(isHovered && styles.cardHover),
        opacity: isVisible? 1 : 0,
        transform: isVisible? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div style={{
       ...styles.accentBar,
       ...(isHovered && styles.accentBarHover)
      }} />

      {isHovered && <div style={styles.glow} />}

      <div style={{
       ...styles.number,
       ...(isHovered && styles.numberHover)
      }}>
        {project.num}
      </div>

      <h3 style={{
       ...styles.title,
       ...(isHovered && styles.titleHover)
      }}>
        {project.title}
      </h3>

      <p style={styles.desc}>{project.desc}</p>

      <div style={{
       ...styles.tag,
       ...(isHovered && styles.tagHover)
      }}>
        <span style={{
         ...styles.tagDot,
         ...(isHovered && styles.tagDotHover)
        }} />
        {project.tag}
      </div>

      <div style={{
       ...styles.arrow,
       ...(isHovered && styles.arrowHover)
      }}>
        ↗
      </div>
    </div>
  )
}

function Projects() {
  const [headerRef, headerVisible] = useInView(0.1)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;600&display=swap');

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms!important;
            transition-duration: 0.01ms!important;
          }
        }
      `}</style>

      <section id="projects" style={styles.section}>
        <div style={styles.gridBg} />
        <div style={styles.topGlow} />

        <div style={styles.container}>
          <div
            ref={headerRef}
            style={{
             ...styles.header,
              opacity: headerVisible? 1 : 0,
              transform: headerVisible? "none" : "translateY(20px)",
            }}
          >
            <div style={styles.headerLabel}>Selected work</div>
            <h2 style={styles.headerTitle}>
              Projects<span style={styles.headerDot}>.</span>
            </h2>
            <div style={styles.headerLine} />
          </div>

          <div style={styles.grid}>
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.num} project={project} index={index} />
            ))}
          </div>

          <div style={{
           ...styles.footer,
            opacity: headerVisible? 1 : 0,
          }}>
            <div style={styles.footerLine} />
            <span style={styles.footerText}>
              {PROJECTS.length} projects
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

// All styles in one place
const styles = {
  section: {
    padding: "5rem 0 6rem",
    background: "#0a0e14",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  gridBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(30,58,92,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30,58,92,0.07) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  topGlow: {
    position: "absolute",
    top: "-200px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "600px",
    height: "400px",
    background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 1.5rem",
    position: "relative",
  },
  header: {
    marginBottom: "3.5rem",
    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  headerLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    color: "#60a5fa",
    textTransform: "uppercase",
    marginBottom: "0.75rem",
  },
  headerTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    color: "#e8f0fe",
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    margin: 0,
  },
  headerDot: { color: "#3b82f6" },
  headerLine: {
    marginTop: "1rem",
    width: "40px",
    height: "2px",
    background: "linear-gradient(to right, #3b82f6, transparent)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
    gap: "1px",
    background: "#0d1420",
    border: "1px solid #0d1420",
    borderRadius: "4px",
    overflow: "hidden",
  },
  footer: {
    marginTop: "2.5rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "opacity 0.8s ease 0.5s",
  },
  footerLine: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(to right, #1e2a3a, transparent)",
  },
  footerText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.65rem",
    color: "#1e3a5f",
    letterSpacing: "0.1em",
  },
  card: {
    position: "relative",
    background: "#090d13",
    border: "1px solid #1e2a3a",
    borderRadius: "2px",
    padding: "2rem 2rem 2rem 2.5rem",
    cursor: "default",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
  },
  cardHover: {
    background: "#0d1117",
    borderColor: "#3b82f6",
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    background: "linear-gradient(to bottom, #1e3a5f, #0f2035)",
    transition: "background 0.35s ease",
  },
  accentBarHover: {
    background: "linear-gradient(to bottom, #3b82f6, #60a5fa)",
  },
  glow: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  number: {
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    color: "#2d4a6a",
    marginBottom: "0.75rem",
    transition: "color 0.3s ease",
  },
  numberHover: { color: "#3b82f6" },
  title: {
    fontFamily: "'Syne', 'Clash Display', sans-serif",
    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
    fontWeight: 700,
    color: "#c8d8ec",
    marginBottom: "0.5rem",
    letterSpacing: "-0.01em",
    transition: "color 0.3s ease",
    lineHeight: 1.2,
  },
  titleHover: { color: "#f0f6ff" },
  desc: {
    fontSize: "0.88rem",
    color: "#4a6080",
    lineHeight: 1.65,
    marginBottom: "1.25rem",
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.72rem",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.04em",
    color: "#2d4a6a",
    border: "1px solid #131e2b",
    borderRadius: "2px",
    padding: "3px 10px",
    transition: "all 0.3s ease",
  },
  tagHover: {
    color: "#60a5fa",
    borderColor: "#1e3a5f",
  },
  tagDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#1e3a5f",
    transition: "background 0.3s ease",
  },
  tagDotHover: { background: "#3b82f6" },
  arrow: {
    position: "absolute",
    right: "1.5rem",
    bottom: "1.5rem",
    fontSize: "1rem",
    color: "#1a2d42",
    transform: "translate(0,0)",
    transition: "all 0.3s ease",
    fontWeight: 300,
  },
  arrowHover: {
    color: "#3b82f6",
    transform: "translate(3px, -3px)",
  },
}

export default Projects