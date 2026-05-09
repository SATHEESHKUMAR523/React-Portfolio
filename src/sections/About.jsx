import { useEffect, useRef, useState } from "react"

const STATS = [
  { value: "5+", label: "Projects Built" },
  { value: "2+", label: "Years Coding" },
  { value: "3", label: "Core Stacks" },
]

const SKILLS = [
  { name: "React", level: 85 },
  { name: "Django", level: 80 },
  { name: "Python", level: 88 },
  { name: "Tailwind CSS", level: 82 },
  { name: "REST APIs", level: 78 },
]

const TRAITS = [
  { icon: "⬡", label: "Clean Code" },
  { icon: "⬡", label: "Problem Solver" },
  { icon: "⬡", label: "Fast Learner" },
  { icon: "⬡", label: "Team Player" },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function SkillBar({ name, level, visible, delay }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (visible) setTimeout(() => setWidth(level), delay)
  }, [visible, level, delay])

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        marginBottom: "6px",
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem", letterSpacing: "0.06em",
          color: "#4a7ab5",
        }}>{name}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.68rem", color: "#2d4a6a",
        }}>{level}%</span>
      </div>
      <div style={{
        height: "2px", background: "#0d1420",
        borderRadius: "2px", overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          background: "linear-gradient(to right, #1d4ed8, #60a5fa)",
          borderRadius: "2px",
          transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
        }}>
          <span style={{
            position: "absolute", right: 0, top: "50%",
            transform: "translateY(-50%)",
            width: "5px", height: "5px", borderRadius: "50%",
            background: "#60a5fa",
            boxShadow: "0 0 6px #60a5fa",
          }} />
        </div>
      </div>
    </div>
  )
}

function About() {
  const [secRef, secVisible] = useInView(0.1)
  const [skillsRef, skillsVisible] = useInView(0.2)

  const fadeUp = (delay = 0) => ({
    opacity: secVisible ? 1 : 0,
    transform: secVisible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .trait-pill:hover {
          border-color: #3b82f6 !important;
          color: #60a5fa !important;
          background: rgba(59,130,246,0.08) !important;
        }
        .stat-card:hover .stat-val {
          color: #60a5fa !important;
        }
      `}</style>

      <section
        id="about"
        ref={secRef}
        style={{
          padding: "6rem 0",
          background: "#060a0f",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(30,58,92,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,92,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px", pointerEvents: "none",
        }} />

        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: "1000px", margin: "0 auto",
          padding: "0 1.5rem", position: "relative",
        }}>

          {/* Section label */}
          <div style={fadeUp(0)}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#2d4a6a",
              marginBottom: "0.6rem",
            }}>
              Who I am
            </p>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800, letterSpacing: "-0.03em",
              color: "#e8f0fe", margin: "0 0 0.3rem",
              lineHeight: 1.05,
            }}>
              About Me
              <span style={{ color: "#3b82f6" }}>.</span>
            </h2>
            <div style={{
              width: "40px", height: "2px", borderRadius: "2px",
              background: "linear-gradient(to right, #3b82f6, transparent)",
              marginBottom: "3rem",
            }} />
          </div>

          {/* Main grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
            className="about-grid"
          >
            {/* LEFT — Bio + traits + stats */}
            <div>
              {/* Avatar + bio row */}
              <div style={{ ...fadeUp(100), display: "flex", gap: "1.25rem", alignItems: "flex-start", marginBottom: "2rem" }}>
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    width: "72px", height: "72px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)",
                    border: "1px solid #1e3a5f",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.6rem", fontWeight: 800, color: "#60a5fa",
                  }}>
                    S
                  </div>
                  {/* spinning ring */}
                  <div style={{
                    position: "absolute", inset: "-4px",
                    borderRadius: "50%",
                    border: "1px dashed #1e3a5f",
                    animation: "spin-slow 12s linear infinite",
                  }} />
                  {/* online dot */}
                  <div style={{
                    position: "absolute", bottom: "2px", right: "2px",
                    width: "12px", height: "12px", borderRadius: "50%",
                    background: "#22c55e",
                    border: "2px solid #060a0f",
                  }} />
                </div>

                {/* name + title */}
                <div>
                  <p style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.15rem", fontWeight: 700,
                    color: "#e8f0fe", margin: "0 0 4px",
                  }}>
                    Satheesh
                  </p>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem", color: "#3b82f6",
                    letterSpacing: "0.06em", margin: 0,
                  }}>
                    Python Full Stack Developer
                  </p>
                  <p style={{
                    fontSize: "0.75rem", color: "#2d4a6a",
                    marginTop: "4px",
                  }}>
                    Chennai, India
                  </p>
                </div>
              </div>

              {/* Bio text */}
              <div style={fadeUp(160)}>
                <p style={{
                  fontSize: "0.95rem", color: "#4a6080",
                  lineHeight: 1.85, marginBottom: "1rem",
                }}>
                  I'm a <span style={{ color: "#60a5fa", fontWeight: 500 }}>Python Full Stack Developer</span> with
                  a passion for crafting modern, responsive, and scalable web applications
                  that deliver real value.
                </p>
                <p style={{
                  fontSize: "0.95rem", color: "#4a6080",
                  lineHeight: 1.85, marginBottom: "2rem",
                }}>
                  I work across the full stack — from building{" "}
                  <span style={{ color: "#60a5fa", fontWeight: 500 }}>Django REST APIs</span> and
                  database models to designing{" "}
                  <span style={{ color: "#60a5fa", fontWeight: 500 }}>React interfaces</span> with
                  Tailwind CSS. I love clean code, performance, and meaningful UX.
                </p>
              </div>

              {/* Trait pills */}
              <div style={{ ...fadeUp(220), display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2.5rem" }}>
                {TRAITS.map(t => (
                  <span key={t.label} className="trait-pill" style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.68rem", letterSpacing: "0.06em",
                    padding: "5px 14px",
                    border: "1px solid #1a2d42",
                    borderRadius: "2px",
                    color: "#2d4a6a",
                    background: "rgba(59,130,246,0.03)",
                    cursor: "default",
                    transition: "all 0.2s ease",
                  }}>
                    {t.label}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div style={{ ...fadeUp(280), display: "flex", gap: "1px" }}>
                {STATS.map((s, i) => (
                  <div key={i} className="stat-card" style={{
                    flex: 1,
                    background: "#090d13",
                    border: "1px solid #0d1420",
                    padding: "1rem",
                    textAlign: "center",
                    borderRadius: i === 0 ? "4px 0 0 4px" : i === STATS.length - 1 ? "0 4px 4px 0" : "0",
                    cursor: "default",
                    transition: "background 0.2s ease",
                  }}>
                    <div className="stat-val" style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "1.8rem", fontWeight: 800,
                      color: "#e8f0fe", lineHeight: 1,
                      marginBottom: "4px",
                      transition: "color 0.2s ease",
                    }}>{s.value}</div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.62rem", letterSpacing: "0.08em",
                      color: "#2d4a6a", textTransform: "uppercase",
                    }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Skills */}
            <div ref={skillsRef}>
              <div style={fadeUp(140)}>
                {/* Skills header */}
                <div style={{
                  display: "flex", alignItems: "center",
                  gap: "12px", marginBottom: "1.75rem",
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.68rem", letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "#2d4a6a",
                  }}>
                    Technical skills
                  </span>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #1e2a3a, transparent)" }} />
                </div>

                {SKILLS.map((s, i) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    level={s.level}
                    visible={skillsVisible}
                    delay={i * 120 + 200}
                  />
                ))}
              </div>

              {/* Currently section */}
              <div style={{ ...fadeUp(320), marginTop: "2.25rem" }}>
                <div style={{
                  border: "1px solid #0d1420",
                  borderLeft: "3px solid #3b82f6",
                  borderRadius: "0 4px 4px 0",
                  padding: "1rem 1.25rem",
                  background: "#090d13",
                }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem", letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#3b82f6",
                    marginBottom: "0.5rem",
                  }}>
                    Currently
                  </p>
                  <p style={{ fontSize: "0.88rem", color: "#4a6080", lineHeight: 1.7, margin: 0 }}>
                    Building full stack projects, deepening expertise in{" "}
                    <span style={{ color: "#60a5fa" }}>React</span> and{" "}
                    <span style={{ color: "#60a5fa" }}>Django REST Framework</span>,
                    and actively looking for exciting opportunities.
                  </p>
                </div>
              </div>

              {/* Resume button */}
              <div style={{ ...fadeUp(380), marginTop: "1.5rem" }}>
                <a
                  href="/resume.pdf"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem", letterSpacing: "0.08em",
                    color: "#4a7ab5",
                    border: "1px solid #1e3a5f",
                    padding: "10px 20px",
                    borderRadius: "3px",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#3b82f6"
                    e.currentTarget.style.color = "#60a5fa"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#1e3a5f"
                    e.currentTarget.style.color = "#4a7ab5"
                  }}
                >
                  <span>↓</span> Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 700px) {
            .about-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </section>
    </>
  )
}

export default About