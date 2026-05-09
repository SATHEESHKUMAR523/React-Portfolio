import { useEffect, useState } from "react"

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
]

function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active,   setActive]     = useState("")
  const [menuOpen, setMenuOpen]   = useState(false)

  // Scroll → blur/border effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener("click", close)
    return () => window.removeEventListener("click", close)
  }, [menuOpen])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .nav-link::after {
          content: '';
          display: block;
          height: 1px;
          width: 0;
          background: #3b82f6;
          transition: width 0.25s ease;
          margin-top: 2px;
        }
        .nav-link:hover::after,
        .nav-link.nav-active::after { width: 100%; }

        .hamburger span {
          display: block;
          height: 1.5px;
          background: #4a7ab5;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .mobile-menu.closed {
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
        }
        .mobile-menu.open {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-link:hover { color: #60a5fa !important; background: rgba(59,130,246,0.06) !important; }
      `}</style>

      <nav style={{
        position:   "fixed",
        top:        0,
        left:       0,
        right:      0,
        zIndex:     100,
        fontFamily: "'JetBrains Mono', monospace",
        background: scrolled ? "rgba(6,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid #0d1420" : "1px solid transparent",
        transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
      }}>
        <div style={{
          maxWidth: "1000px",
          margin:   "0 auto",
          padding:  "0 1.5rem",
          height:   "60px",
          display:  "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}>

          {/* Logo */}
          <a href="#" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily:    "'Syne', sans-serif",
              fontSize:      "1.15rem",
              fontWeight:    800,
              color:         "#e8f0fe",
              letterSpacing: "-0.02em",
            }}>
              S<span style={{ color: "#3b82f6" }}>.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul style={{
            display:    "flex",
            gap:        "2rem",
            listStyle:  "none",
            margin:     0,
            padding:    0,
          }}
            className="desktop-nav"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
              return (
                <li key={id}>
                  <a
                    href={href}
                    className={`nav-link${active === id ? " nav-active" : ""}`}
                    style={{
                      fontSize:      "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color:  active === id ? "#60a5fa" : "#4a7ab5",
                      textDecoration: "none",
                      transition:    "color 0.2s ease",
                    }}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="desktop-cta"
            style={{
              fontSize:      "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:         "#3b82f6",
              border:        "1px solid #1e3a5f",
              padding:       "7px 16px",
              borderRadius:  "2px",
              textDecoration: "none",
              transition:    "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#3b82f6"
              e.currentTarget.style.background  = "rgba(59,130,246,0.08)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#1e3a5f"
              e.currentTarget.style.background  = "transparent"
            }}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={e => { e.stopPropagation(); setMenuOpen(o => !o) }}
            aria-label="Toggle menu"
            style={{
              display:    "none",
              flexDirection: "column",
              gap:        "5px",
              background: "none",
              border:     "none",
              cursor:     "pointer",
              padding:    "4px",
              width:      "28px",
            }}
            className={`hamburger-btn${menuOpen ? " open" : ""}`}
          >
            <span style={{ width: "22px" }} />
            <span style={{ width: "14px" }} />
            <span style={{ width: "18px" }} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`mobile-menu ${menuOpen ? "open" : "closed"}`}
          onClick={e => e.stopPropagation()}
          style={{
            background:   "rgba(6,10,15,0.96)",
            backdropFilter: "blur(16px)",
            borderTop:    "1px solid #0d1420",
            borderBottom: "1px solid #0d1420",
            padding:      "0.5rem 0",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
              style={{
                display:       "block",
                padding:       "12px 1.5rem",
                fontSize:      "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         "#4a7ab5",
                textDecoration: "none",
                transition:    "all 0.2s ease",
                borderLeft:    active === href.slice(1) ? "2px solid #3b82f6" : "2px solid transparent",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Responsive: show hamburger, hide desktop nav + cta */}
        <style>{`
          @media (max-width: 640px) {
            .desktop-nav  { display: none !important; }
            .desktop-cta  { display: none !important; }
            .hamburger-btn { display: flex !important; }
          }
          @media (min-width: 641px) {
            .mobile-menu  { display: none !important; }
            .hamburger-btn { display: none !important; }
          }
        `}</style>
      </nav>

      {/* Spacer so content isn't hidden under fixed nav */}
      <div style={{ height: "60px" }} />
    </>
  )
}

export default Navbar