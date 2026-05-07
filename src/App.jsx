import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const FACEBOOK_URL = 'https://www.facebook.com/people/Drivepro-School-of-driving/61585181883104/'
const INSTAGRAM_URL = 'https://www.instagram.com/manu273752?igsh=Z2RleDNpbThtaGpr&utm_source=ig_contact_invite'
const BOOKING_URL = 'https://onkarhu3x.setmore.com/onkar'
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
        <div className="navbar-cta-group">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="navbar-cta book">📅 Book Now</a>
          <a href={`tel:${PHONE}`} className="navbar-cta">📞 Call Now</a>
        </div>
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
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              📅 Book a Lesson
            </a>
            <a href={`tel:${PHONE}`} className="btn btn-secondary">
              📞 Call {PHONE}
            </a>
          </div>
          <div className={`hero-socials ${inView ? 'animate-fadeInUp delay-5' : ''}`}>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="social-pill facebook">
              <FacebookIcon /> Facebook
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-pill instagram">
              <InstagramIcon /> Instagram
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
        <h2>Follow Us Online</h2>
        <p>Scan QR codes, follow us on social media, or book your lesson online.</p>
      </div>
      <div className="connect-section connect-3col">
        <div className={`connect-card ${inView ? 'animate-fadeInLeft delay-2' : ''}`}>
          <div className="card-icon">📱</div>
          <h3>Facebook QR Code</h3>
          <p>Point your phone camera at the QR code to visit our Facebook page instantly.</p>
          <div className="qr-wrapper">
            <QRCodeSVG
              value={FACEBOOK_URL}
              size={180}
              bgColor="#ffffff"
              fgColor="#1877F2"
              level="H"
              includeMargin={false}
            />
          </div>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="fb-btn">
            <FacebookIcon />
            Visit Facebook
          </a>
        </div>
        <div className={`connect-card ${inView ? 'animate-fadeInUp delay-3' : ''}`}>
          <div className="card-icon">📸</div>
          <h3>Follow on Instagram</h3>
          <p>Check out our Instagram for behind-the-scenes content, student stories, and driving tips.</p>
          <div className="qr-wrapper">
            <QRCodeSVG
              value={INSTAGRAM_URL}
              size={180}
              bgColor="#ffffff"
              fgColor="#E1306C"
              level="H"
              includeMargin={false}
            />
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="ig-btn">
            <InstagramIcon />
            Follow on Instagram
          </a>
        </div>
        <div className={`connect-card ${inView ? 'animate-fadeInRight delay-4' : ''}`}>
          <div className="card-icon">📅</div>
          <h3>Book a Lesson</h3>
          <p>Use our online booking system to schedule your driving lesson at a time that suits you.</p>
          <div className="qr-wrapper">
            <QRCodeSVG
              value={BOOKING_URL}
              size={180}
              bgColor="#ffffff"
              fgColor="#2ecc71"
              level="H"
              includeMargin={false}
            />
          </div>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="book-btn">
            📅 Book on Setmore
          </a>
        </div>
      </div>
      <div className={`connect-info-box ${inView ? 'animate-fadeInUp delay-5' : ''}`}>
        <p style={{ color: '#4A9AFF', fontWeight: 600, marginBottom: '0.5rem' }}>📍 Follow us for:</p>
        <ul style={{ color: 'var(--text-secondary)', listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.75rem 2rem', justifyContent: 'center' }}>
          <li>✅ Special lesson packages</li>
          <li>✅ Driving tips & tricks</li>
          <li>✅ Student success stories</li>
          <li>✅ Road safety updates</li>
        </ul>
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
      <div className="contact-grid contact-4col">
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
          <div className="icon">📸</div>
          <h4>Instagram</h4>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Follow Us</a>
          <p>Behind-the-scenes content</p>
        </div>
        <div className={`contact-card ${inView ? 'animate-fadeInUp delay-5' : ''}`}>
          <div className="icon">📅</div>
          <h4>Book Online</h4>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book with Setmore</a>
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
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Online</a>
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

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
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
