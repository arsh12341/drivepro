import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const FACEBOOK_URL = 'https://www.facebook.com/people/Drivepro-School-of-driving/61585181883104/'
const PHONE = '0404884445'

function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); observer.unobserve(entry.target) }
    }, { threshold: 0.15, ...options })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, isInView]
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <span className="drive">Drive</span>
          <span className="pro">Pro</span>
        </div>
        <ul className="navbar-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#why-us">Why Us</a></li>
          <li><a href="#connect">Connect</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href={`tel:${PHONE}`} className="navbar-cta">📞 Call Now</a>
      </div>
    </nav>
  )
}

function Hero() {
  const [ref, inView] = useInView()
  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="hero-bg-orb orb-1"></div>
      <div className="hero-bg-orb orb-2"></div>
      <div className="hero-bg-orb orb-3"></div>
      <div className="hero-grid-overlay"></div>
      <div className={`hero-content ${inView ? '' : ''}`}>
        <div className="hero-text">
          <h1 className={`${inView ? 'animate-fadeInUp delay-1' : ''}`}>
            Get the <span className="highlight">Skills</span>,<br/>
            Not Just the License
          </h1>
          <p className={`tagline ${inView ? 'animate-fadeInUp delay-2' : ''}`}>
            Professional driving lessons tailored to build your confidence on the road.
            Learn from experienced instructors who care about your safety.
          </p>
          <div className={`hero-badges ${inView ? 'animate-fadeInUp delay-3' : ''}`}>
            <div className="badge badge-l">
              <span className="badge-icon">L</span>
              Learner Lessons
            </div>
            <div className="badge badge-p">
              <span className="badge-icon blue">P</span>
              P-Plate Ready
            </div>
          </div>
          <div className={`hero-actions ${inView ? 'animate-fadeInUp delay-4' : ''}`}>
            <a href={`tel:${PHONE}`} className="btn btn-primary">
              📞 Call {PHONE}
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <FacebookIcon /> Follow Us
            </a>
          </div>
        </div>
        <div className={`hero-visual ${inView ? 'animate-scaleIn delay-3' : ''}`}>
          <div className="hero-banner-wrapper">
            <img src="/banner.png" alt="DrivePro School of Driving Banner" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [ref, inView] = useInView()
  const services = [
    { icon: '🚗', color: 'red', title: 'Learner Lessons', desc: 'Comprehensive driving lessons for beginners. Build your foundation with patient, step-by-step instruction from day one.' },
    { icon: '🎯', color: 'blue', title: 'Test Preparation', desc: 'Focused sessions designed to prepare you for your driving test. Practice routes, hazard perception, and parallel parking.' },
    { icon: '🛡️', color: 'green', title: 'Defensive Driving', desc: 'Learn advanced techniques to stay safe on the road. Master hazard awareness and emergency handling skills.' },
  ]
  return (
    <section className="section section-darker" id="services" ref={ref}>
      <div className={`section-header ${inView ? 'animate-fadeInUp delay-1' : ''}`}>
        <span className="label">Our Services</span>
        <h2>What We Offer</h2>
        <p>From first-time learners to test preparation — we've got you covered.</p>
      </div>
      <div className="features-grid">
        {services.map((s, i) => (
          <div key={i} className={`feature-card ${inView ? `animate-fadeInUp delay-${i + 2}` : ''}`}>
            <div className={`feature-icon ${s.color}`}>{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function WhyUs() {
  const [ref, inView] = useInView()
  const stats = [
    { num: '500+', title: 'Students Passed', desc: 'Successful graduates' },
    { num: '10+', title: 'Years Experience', desc: 'On the road' },
    { num: '4.9★', title: 'Average Rating', desc: 'Student reviews' },
    { num: '100%', title: 'Commitment', desc: 'To your success' },
  ]
  return (
    <section className="section section-dark" id="why-us" ref={ref}>
      <div className={`section-header ${inView ? 'animate-fadeInUp delay-1' : ''}`}>
        <span className="label">Why Choose Us</span>
        <h2>Trusted by Hundreds of Learners</h2>
        <p>We don't just teach driving — we build confident, safe drivers for life.</p>
      </div>
      <div className="why-grid">
        {stats.map((s, i) => (
          <div key={i} className={`why-card ${inView ? `animate-fadeInUp delay-${i + 2}` : ''}`}>
            <div className="why-number">{s.num}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Connect() {
  const [ref, inView] = useInView()
  return (
    <section className="section section-darker" id="connect" ref={ref}>
      <div className={`section-header ${inView ? 'animate-fadeInUp delay-1' : ''}`}>
        <span className="label">Stay Connected</span>
        <h2>Follow Us on Facebook</h2>
        <p>Scan the QR code or click the button to connect with us on Facebook.</p>
      </div>
      <div className="connect-section">
        <div className={`connect-card ${inView ? 'animate-fadeInLeft delay-2' : ''}`}>
          <div className="card-icon">📱</div>
          <h3>Scan QR Code</h3>
          <p>Point your phone camera at the QR code to visit our Facebook page instantly.</p>
          <div className="qr-wrapper">
            <QRCodeSVG
              value={FACEBOOK_URL}
              size={200}
              bgColor="#ffffff"
              fgColor="#1877F2"
              level="H"
              includeMargin={false}
            />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Drivepro School of Driving
          </p>
        </div>
        <div className={`connect-card ${inView ? 'animate-fadeInRight delay-3' : ''}`}>
          <div className="card-icon">🌐</div>
          <h3>Visit Our Page</h3>
          <p>Like our Facebook page to stay updated with latest offers, tips, and driving safety advice.</p>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="fb-btn">
            <FacebookIcon />
            Visit Facebook Page
          </a>
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(24,119,242,0.1)', borderRadius: '16px', border: '1px solid rgba(24,119,242,0.2)' }}>
            <p style={{ color: '#4A9AFF', fontWeight: 600, marginBottom: '0.5rem' }}>📍 Follow us for:</p>
            <ul style={{ textAlign: 'left', color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✅ Special lesson packages</li>
              <li>✅ Driving tips & tricks</li>
              <li>✅ Student success stories</li>
              <li>✅ Road safety updates</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [ref, inView] = useInView()
  return (
    <section className="section section-dark" id="contact" ref={ref}>
      <div className={`section-header ${inView ? 'animate-fadeInUp delay-1' : ''}`}>
        <span className="label">Get in Touch</span>
        <h2>Ready to Start Driving?</h2>
        <p>Contact us today and book your first lesson.</p>
      </div>
      <div className="contact-grid">
        <div className={`contact-card ${inView ? 'animate-fadeInUp delay-2' : ''}`}>
          <div className="icon">📞</div>
          <h4>Call Us</h4>
          <a href={`tel:${PHONE}`}>{PHONE}</a>
          <p>Available 7 days a week</p>
        </div>
        <div className={`contact-card ${inView ? 'animate-fadeInUp delay-3' : ''}`}>
          <div className="icon">📘</div>
          <h4>Facebook</h4>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Message Us</a>
          <p>Quick response guaranteed</p>
        </div>
        <div className={`contact-card ${inView ? 'animate-fadeInUp delay-4' : ''}`}>
          <div className="icon">📅</div>
          <h4>Book Online</h4>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Book with Setmore</a>
          <p>Choose your preferred time</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span style={{ color: '#fff' }}>Drive</span>
          <span style={{ background: 'var(--gradient-red)', padding: '2px 10px', borderRadius: '6px', color: '#fff', marginLeft: '4px' }}>Pro</span>
        </div>
        <p>Get the skills, not just the license.</p>
        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#services">Services</a>
          <a href="#why-us">Why Us</a>
          <a href="#connect">Connect</a>
          <a href="#contact">Contact</a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} DrivePro School of Driving. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Connect />
      <Contact />
      <Footer />
    </>
  )
}

export default App
