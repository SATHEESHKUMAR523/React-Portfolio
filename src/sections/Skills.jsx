import { useEffect, useRef, useState } from "react"

const SKILL_GROUPS = [
  {
    category: "Frontend",
    num: "01",
    skills: [
      { name: "React",        icon: "⚛",  level: 85, note: "Hooks · Router · Context" },
      { name: "JavaScript",   icon: "JS", level: 82, note: "ES6+ · Async · DOM"        },
      { name: "Tailwind CSS", icon: "✦",  level: 88, note: "Utility-first · Responsive" },
    ],
  },
  {
    category: "Backend",
    num: "02",
    skills: [
      { name: "Python",  icon: "Py", level: 90, note: "OOP · Scripting · Automation" },
      { name: "Django",  icon: "Dj", level: 82, note: "ORM · Auth · REST Framework" },
      { name: "REST API",icon: "⇄",  level: 78, note: "CRUD · JWT · Serializers"     },
    ],
  },
  {
    category: "Database & Tools",
    num: "03",
    skills: [
      { name: "MySQL",   icon: "DB", level: 75, note: "Queries · Relations · Joins"  },
      { name: "Git",     icon: "⎇",  level: 80, note: "Branching · PRs · GitHub"     },
      { name: "VS Code", icon: "{}",  level: 92, note: "Extensions · Debugging"       },
    ],
  },
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

function SkillCard({ skill, visible, delay }) {
  const [hovered, setHovered] = useState(false)
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    if (visible) setTimeout(() => setBarWidth(skill.level), delay + 300)
  }, [visible, delay, skill.level])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     "relative",
        background:   hovered ? "#0d1117" : "#090d13",
        border:       "1px solid",
        borderColor:  hovered ? "#3b82f6" : "#1e2a3a",
        borderRadius: "2px",
        padding:      "1.25rem",
        opacity:      visible ? 1 : 0,
        transform:    visible ? "translateY(0)" : "translateY(20px)",
        transition:   `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.25s ease, background 0.25s ease`,
        cursor:       "default",
        overflow:     "hidden",
      }}
    >
      {/* hover radial glow */}
      {hovered && (
        <div style={{
          position:   "absolute", inset: 0,
          background: "radial-gradient(ellipse at 0% 50%, rgba(59,130,246,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
      )}

      {/* left accent */}
      <div style={{
        position:   "absolute",
        left: 0, top: 0, bottom: 0,
        width:      "2px",
        background: hovered
          ? "linear-gradient(to bottom, #3b82f6, #60a5fa)"
          : "linear-gradient(to bottom, #1e3a5f, transparent)",
        transition: "background 0.3s ease",
      }} />

      {/* icon + name row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.6rem" }}>
        <div style={{
          width:        "34px",
          height:       "34px",
          borderRadius: "4px",
          background:   hovered ? "rgba(59,130,246,0.14)" : "rgba(59,130,246,0.06)",
          border:       "1px solid",
          borderColor:  hovered ? "#1e3a5f" : "#0d1420",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          fontFamily:   "'JetBrains Mono', monospace",
          fontSize:     "0.7rem",
          fontWeight:   600,
          color:        hovered ? "#60a5fa" : "#2d4a6a",
          transition:   "all 0.25s ease",
          flexShrink:   0,
        }}>
          {skill.icon}
        </div>
        <span style={{
          fontFamily:    "'Syne', sans-serif",
          fontSize:      "0.95rem",
          fontWeight:    700,
          color:         hovered ? "#e8f0fe" : "#c8d8ec",
          letterSpacing: "-0.01em",
          transition:    "color 0.25s ease",
        }}>
          {skill.name}
        </span>

        {/* level badge */}
        <span style={{
          marginLeft:    "auto",
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      "0.62rem",
          color:         hovered ? "#3b82f6" : "#1e3a5f",
          letterSpacing: "0.04em",
          transition:    "color 0.25s ease",
        }}>
          {skill.level}%
        </span>
      </div>

      {/* note */}
      <p style={{
        fontFamily:    "'JetBrains Mono', monospace",
        fontSize:      "0.65rem",
        letterSpacing: "0.04em",
        color:         "#2d4a6a",
        marginBottom:  "0.75rem",
        lineHeight:    1.5,
      }}>
        {skill.note}
      </p>

      {/* bar */}
      <div style={{
        height:       "1.5px",
        background:   "#0d1420",
        borderRadius: "2px",
        overflow:     "hidden",
      }}>
        <div style={{
          height:     "100%",
          width:      `${barWidth}%`,
          background: hovered
            ? "linear-gradient(to right, #2563eb, #93c5fd)"
            : "linear-gradient(to right, #1d4ed8, #3b82f6)",
          borderRadius: "2px",
          transition:   "width 1.1s cubic-bezier(0.4,0,0.2,1)",
          position:     "relative",
        }}>
          <span style={{
            position:    "absolute",
            right:       0,
            top:         "50%",
            transform:   "translateY(-50%)",
            width:       "4px",
            height:      "4px",
            borderRadius:"50%",
            background:  "#60a5fa",
            boxShadow:   "0 0 5px #60a5fa",
          }} />
        </div>
      </div>
    </div>
  )
}

function GroupBlock({ group, globalVisible }) {
  const [ref, visible] = useInView(0.1)
  const show = globalVisible || visible

  return (
    <div ref={ref} style={{ marginBottom: "3rem" }}>
      {/* category header */}
      <div style={{
        display:       "flex",
        alignItems:    "center",
        gap:           "12px",
        marginBottom:  "1.25rem",
        opacity:       show ? 1 : 0,
        transform:     show ? "none" : "translateY(12px)",
        transition:    "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <span style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      "0.62rem",
          color:         "#1e3a5f",
          letterSpacing: "0.08em",
        }}>
          {group.num}
        </span>
        <span style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      "0.68rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color:         "#3b82f6",
        }}>
          {group.category}
        </span>
        <div style={{
          flex:       1,
          height:     "1px",
          background: "linear-gradient(to right, #1e2a3a, transparent)",
        }} />
      </div>

      {/* skill cards */}
      <div style={{
        display:               "grid",
        gridTemplateColumns:   "repeat(auto-fit, minmax(240px, 1fr))",
        gap:                   "1px",
        background:            "#0a0f16",
        border:                "1px solid #0a0f16",
        borderRadius:          "4px",
        overflow:              "hidden",
      }}>
        {group.skills.map((skill, i) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            visible={show}
            delay={i * 90}
          />
        ))}
      </div>
    </div>
  )
}

function Skills() {
  const [secRef, secVisible] = useInView(0.05)

  const fadeUp = (delay = 0) => ({
    opacity:    secVisible ? 1 : 0,
    transform:  secVisible ? "none" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
      `}</style>

      <section
        id="skills"
        ref={secRef}
        style={{
          padding:    "6rem 0",
          background: "#060a0f",
          color:      "#fff",
          position:   "relative",
          overflow:   "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* grid bg */}
        <div style={{
          position:            "absolute", inset: 0,
          backgroundImage:     "linear-gradient(rgba(30,58,92,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,92,0.06) 1px, transparent 1px)",
          backgroundSize:      "60px 60px",
          pointerEvents:       "none",
        }} />

        {/* ambient glow */}
        <div style={{
          position:   "absolute",
          bottom:     "-120px",
          left:       "50%",
          transform:  "translateX(-50%)",
          width:      "500px",
          height:     "300px",
          background: "radial-gradient(ellipse, rgba(29,78,216,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: "1000px",
          margin:   "0 auto",
          padding:  "0 1.5rem",
          position: "relative",
        }}>

          {/* Header */}
          <div style={fadeUp(0)}>
            <p style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "#2d4a6a",
              marginBottom:  "0.6rem",
            }}>
              What I work with
            </p>
            <h2 style={{
              fontFamily:    "'Syne', sans-serif",
              fontSize:      "clamp(2rem, 5vw, 3.2rem)",
              fontWeight:    800,
              letterSpacing: "-0.03em",
              color:         "#e8f0fe",
              margin:        "0 0 0.3rem",
              lineHeight:    1.05,
            }}>
              Skills<span style={{ color: "#3b82f6" }}>.</span>
            </h2>
            <div style={{
              width:        "40px",
              height:       "2px",
              borderRadius: "2px",
              background:   "linear-gradient(to right, #3b82f6, transparent)",
              marginBottom: "3rem",
            }} />
          </div>

          {/* Skill groups */}
          {SKILL_GROUPS.map(group => (
            <GroupBlock key={group.category} group={group} globalVisible={secVisible} />
          ))}

          {/* Footer count */}
          <div style={{
            ...fadeUp(400),
            display:     "flex",
            alignItems:  "center",
            gap:         "12px",
            marginTop:   "0.5rem",
          }}>
            <div style={{
              flex:       1,
              height:     "1px",
              background: "linear-gradient(to right, #1e2a3a, transparent)",
            }} />
            <span style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      "0.62rem",
              color:         "#1e3a5f",
              letterSpacing: "0.1em",
            }}>
              {SKILL_GROUPS.reduce((a, g) => a + g.skills.length, 0)} skills across{" "}
              {SKILL_GROUPS.length} categories
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Skills