import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { QRCodeSVG } from 'qrcode.react'

const FACEBOOK_URL = 'https://www.facebook.com/people/Drivepro-School-of-driving/61585181883104/'
const INSTAGRAM_URL = 'https://www.instagram.com/manu273752?igsh=Z2RleDNpbThtaGpr&utm_source=ig_contact_invite'

const PHONE = '0404884445'

// Web3Forms — get your free access key at https://web3forms.com
// Replace the value below with your own key (tied to your email address)
const W3F_ACCESS_KEY = import.meta.env.VITE_FORM_KEY

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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Portal target — renders outside <nav> so it escapes the stacking context
  const mobileMenuPortal = createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`mobile-backdrop ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <ul className="mobile-menu-links">
          <li><a href="#services"    onClick={handleNavClick}>Services</a></li>
          <li><a href="#why-us"      onClick={handleNavClick}>Why Us</a></li>
          <li><a href="#connect"     onClick={handleNavClick}>Connect</a></li>
          <li><a href="#booking-form" onClick={handleNavClick}>Book a Lesson</a></li>
          <li><a href="#contact"     onClick={handleNavClick}>Contact</a></li>
        </ul>
        <div className="mobile-menu-ctas">
          <a href="#booking-form" className="btn btn-primary" onClick={handleNavClick}>📅 Book Now</a>
          <a href={`tel:${PHONE}`} className="btn btn-secondary" onClick={handleNavClick}>📞 {PHONE}</a>
        </div>
      </div>
    </>,
    document.body
  )

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`} id="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <span className="drive">Drive</span>
            <span className="pro">Pro</span>
          </div>
          <ul className="navbar-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#why-us">Why Us</a></li>
            <li><a href="#connect">Connect</a></li>
            <li><a href="#booking-form">Book a Lesson</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="navbar-cta-group">
            <a href="#booking-form" className="navbar-cta book">📅 Book Now</a>
            <a href={`tel:${PHONE}`} className="navbar-cta">📞 Call Now</a>
            <button
              id="hamburger-btn"
              className={`hamburger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      {mobileMenuPortal}
    </>
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
            <a href="#booking-form" className="btn btn-primary">
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
      <div className="connect-section connect-2col">
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
      <div className="contact-grid contact-3col">
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

      </div>
    </section>
  )
}

function BookingForm() {
  const [ref, inView] = useInView()
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    suburb: '',
    transmission: '',
    lessonType: '',
    instructorPref: '',
    experienceLevel: '',
    preferredDays: '',
    preferredTime: '',
    licensingCentre: '',
    ndis: false,
    ndisType: '',
    medicalNotes: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // ── Validation ──
  const validate = (data) => {
    const e = {}
    if (!data.fullName.trim()) e.fullName = 'Full name is required.'
    if (!data.dob) e.dob = 'Date of birth is required.'
    if (!data.email.trim()) {
      e.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Please enter a valid email address.'
    }
    if (!data.phone.trim()) {
      e.phone = 'Mobile number is required.'
    } else if (!/^[0-9\s\+\-\(\)]{7,15}$/.test(data.phone.trim())) {
      e.phone = 'Please enter a valid phone number.'
    }
    if (!data.transmission) e.transmission = 'Please select a transmission type.'
    if (!data.lessonType) e.lessonType = 'Please select a lesson type.'
    if (!data.experienceLevel) e.experienceLevel = 'Please select your experience level.'
    return e
  }

  const isSending = status === 'sending'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const updated = { ...formData, [name]: type === 'checkbox' ? checked : value }
    setFormData(updated)
    // Clear error for field as user types
    if (touched[name]) setErrors(validate(updated))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(validate(formData))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Mark all required fields as touched and run full validation
    const allTouched = { fullName: true, dob: true, email: true, phone: true, transmission: true, lessonType: true, experienceLevel: true }
    setTouched(allTouched)
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      // Scroll to the first field with an error (in visual order)
      const fieldOrder = ['fullName', 'dob', 'email', 'phone', 'transmission', 'lessonType', 'experienceLevel']
      const firstErrorField = fieldOrder.find(f => validationErrors[f])
      if (firstErrorField) {
        const el = document.getElementById(firstErrorField)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.focus({ preventScroll: true })
        }
      }
      return
    }
    setStatus('sending')
    setErrorMsg('')
    try {
      const payload = {
        access_key: W3F_ACCESS_KEY,
        subject: `New Driving Lesson Enquiry — ${formData.fullName}`,
        from_name: 'DrivePro Website',
        // Student details
        'Full Name': formData.fullName,
        'Date of Birth': formData.dob,
        'Email': formData.email,
        'Mobile': formData.phone,
        'Pickup Suburb': formData.suburb || 'Not provided',
        // Lesson preferences
        'Transmission': formData.transmission,
        'Lesson Type': formData.lessonType,
        'Instructor Preference': formData.instructorPref || 'No preference',
        'Experience Level': formData.experienceLevel,
        // Booking details
        'Preferred Days': formData.preferredDays || 'Not specified',
        'Preferred Time': formData.preferredTime || 'Not specified',
        'Licensing Centre': formData.licensingCentre || 'Not specified',
        // Additional
        'NDIS Required': formData.ndis ? `Yes — ${formData.ndisType || 'Plan type not specified'}` : 'No',
        'Medical Notes': formData.medicalNotes || 'None',
        'Additional Message': formData.message || 'None',
      }
      if (!W3F_ACCESS_KEY) {
        setErrorMsg('Form configuration error: missing API key. Please contact us directly.')
        setStatus('error')
        return
      }
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Submission failed')
      setStatus('success')
      setFormData({
        fullName: '', dob: '', email: '', phone: '', suburb: '',
        transmission: '', lessonType: '', instructorPref: '', experienceLevel: '',
        preferredDays: '', preferredTime: '', licensingCentre: '',
        ndis: false, ndisType: '', medicalNotes: '', message: '',
      })
    } catch (err) {
      console.error('Form submission error:', err)
      setErrorMsg(err.message || 'Failed to send. Please call us directly or try again later.')
      setStatus('error')
    }
  }

  return (
    <section className="section section-darker" id="booking-form" ref={ref}>
      <div className={`section-header ${inView ? 'animate-fadeInUp delay-1' : ''}`}>
        <span className="label">Enquire & Book</span>
        <h2>Book Your Driving Lesson</h2>
        <p>Fill in your details below and we'll get back to you to confirm your booking.</p>
      </div>

      <form
        className={`booking-form-card ${inView ? 'animate-fadeInUp delay-2' : ''}`}
        onSubmit={handleSubmit}
        noValidate
      >
        {/* ── Student & Contact Details ── */}
        <div className="form-section-title">
          <span className="form-section-icon">🧑</span> Student &amp; Contact Details
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group">
            <label htmlFor="fullName">Full Name <span className="required">*</span></label>
            <input id="fullName" name="fullName" type="text" placeholder="e.g. Alex Johnson"
              value={formData.fullName} onChange={handleChange} onBlur={handleBlur}
              disabled={isSending}
              className={touched.fullName && errors.fullName ? 'input-error' : ''} />
            {touched.fullName && errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth <span className="required">*</span></label>
            <input id="dob" name="dob" type="date"
              value={formData.dob} onChange={handleChange} onBlur={handleBlur}
              disabled={isSending}
              className={touched.dob && errors.dob ? 'input-error' : ''} />
            {touched.dob && errors.dob && <span className="field-error">{errors.dob}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address <span className="required">*</span></label>
            <input id="email" name="email" type="email" placeholder="your@email.com"
              value={formData.email} onChange={handleChange} onBlur={handleBlur}
              disabled={isSending}
              className={touched.email && errors.email ? 'input-error' : ''} />
            {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Mobile Number <span className="required">*</span></label>
            <input id="phone" name="phone" type="tel" placeholder="04XX XXX XXX"
              value={formData.phone} onChange={handleChange} onBlur={handleBlur}
              disabled={isSending}
              className={touched.phone && errors.phone ? 'input-error' : ''} />
            {touched.phone && errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>
          <div className="form-group form-span-2">
            <label htmlFor="suburb">Pickup Suburb / Address</label>
            <input id="suburb" name="suburb" type="text" placeholder="e.g. Joondalup (most instructors provide door-to-door service)"
              value={formData.suburb} onChange={handleChange}
              disabled={isSending} />
          </div>
        </div>

        {/* ── Lesson Preferences ── */}
        <div className="form-section-title">
          <span className="form-section-icon">🚗</span> Lesson Preferences
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group">
            <label htmlFor="transmission">Transmission Type <span className="required">*</span></label>
            <select id="transmission" name="transmission"
              value={formData.transmission} onChange={handleChange} onBlur={handleBlur}
              disabled={isSending}
              className={touched.transmission && errors.transmission ? 'input-error' : ''}>
              <option value="">Select transmission…</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            {touched.transmission && errors.transmission && <span className="field-error">{errors.transmission}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lessonType">Package / Lesson Type <span className="required">*</span></label>
            <select id="lessonType" name="lessonType"
              value={formData.lessonType} onChange={handleChange} onBlur={handleBlur}
              disabled={isSending}
              className={touched.lessonType && errors.lessonType ? 'input-error' : ''}>
              <option value="">Select lesson type…</option>
              <option value="Standard — 1 Hour">Standard — 1 Hour</option>
              <option value="Standard — 1.5 Hours">Standard — 1.5 Hours</option>
              <option value="Mock Driving Test">Mock Driving Test</option>
              <option value="Lesson + Car Hire for PDA">Lesson + Car Hire for PDA</option>
            </select>
            {touched.lessonType && errors.lessonType && <span className="field-error">{errors.lessonType}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="instructorPref">Instructor Preference</label>
            <select id="instructorPref" name="instructorPref"
              value={formData.instructorPref} onChange={handleChange}
              disabled={isSending}>
              <option value="">No preference</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="experienceLevel">Experience Level <span className="required">*</span></label>
            <select id="experienceLevel" name="experienceLevel"
              value={formData.experienceLevel} onChange={handleChange} onBlur={handleBlur}
              disabled={isSending}
              className={touched.experienceLevel && errors.experienceLevel ? 'input-error' : ''}>
              <option value="">Select your experience…</option>
              <option value="Complete Beginner">Complete Beginner</option>
              <option value="Some Hours Logged">Some Hours Logged</option>
              <option value="Overseas Licence Conversion">Overseas Licence Conversion</option>
            </select>
            {touched.experienceLevel && errors.experienceLevel && <span className="field-error">{errors.experienceLevel}</span>}
          </div>
        </div>

        {/* ── Booking Details ── */}
        <div className="form-section-title">
          <span className="form-section-icon">📅</span> Booking Details
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group">
            <label htmlFor="preferredDays">Preferred Days of the Week</label>
            <input id="preferredDays" name="preferredDays" type="text"
              placeholder="e.g. Weekdays after 3 PM, Weekends"
              value={formData.preferredDays} onChange={handleChange}
              disabled={isSending} />
          </div>
          <div className="form-group">
            <label htmlFor="preferredTime">Preferred Time of Day</label>
            <select id="preferredTime" name="preferredTime"
              value={formData.preferredTime} onChange={handleChange}
              disabled={isSending}>
              <option value="">Select time…</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
          <div className="form-group form-span-2">
            <label htmlFor="licensingCentre">Target Licensing Centre</label>
            <input id="licensingCentre" name="licensingCentre" type="text"
              placeholder="e.g. Joondalup, Mirrabooka, Cannington, West Perth"
              value={formData.licensingCentre} onChange={handleChange}
              disabled={isSending} />
          </div>
        </div>

        {/* ── Additional Requirements ── */}
        <div className="form-section-title">
          <span className="form-section-icon">♿</span> Additional Requirements
        </div>
        <div className="form-grid form-grid-1">
          <div className="form-group form-checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" id="ndis" name="ndis"
                checked={formData.ndis} onChange={handleChange}
                disabled={isSending} />
              <span className="checkbox-custom"></span>
              I require an <strong>NDIS Funded Driving Lesson</strong>
            </label>
          </div>
          {formData.ndis && (
            <div className="form-group">
              <label htmlFor="ndisType">NDIS Plan Type</label>
              <select id="ndisType" name="ndisType"
                value={formData.ndisType} onChange={handleChange}
                disabled={isSending}>
                <option value="">Select plan type…</option>
                <option value="Plan Managed">Plan Managed</option>
                <option value="Self Managed">Self Managed</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="medicalNotes">Medical Considerations <span className="optional">(Optional — helpful for instructors)</span></label>
            <textarea id="medicalNotes" name="medicalNotes" rows={2}
              placeholder="Any medical conditions or special requirements…"
              value={formData.medicalNotes} onChange={handleChange}
              disabled={isSending} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Additional Message <span className="optional">(Optional)</span></label>
            <textarea id="message" name="message" rows={3}
              placeholder="Any other details or questions…"
              value={formData.message} onChange={handleChange}
              disabled={isSending} />
          </div>
        </div>

        {/* ── Status ── */}
        {status === 'success' && (
          <div className="form-alert form-alert-success">
            ✅ <strong>Enquiry sent!</strong> We'll be in touch shortly to confirm your booking.
          </div>
        )}
        {status === 'error' && (
          <div className="form-alert form-alert-error">
            ❌ {errorMsg}
          </div>
        )}

        <button
          type="submit"
          id="booking-submit-btn"
          className="btn btn-primary form-submit-btn"
          disabled={isSending}
        >
          {isSending ? '⏳ Sending…' : '📅 Send Booking Enquiry'}
        </button>

        <p className="form-note">
          Or call us directly: <a href={`tel:${PHONE}`}>{PHONE}</a> — Available 7 days a week.
        </p>
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span>Drive</span>
          <span style={{ background: 'var(--gradient-red)', padding: '2px 10px', borderRadius: '6px', color: '#fff', marginLeft: '4px' }}>Pro</span>
        </div>
        <p>Get the skills, not just the license.</p>
        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#services">Services</a>
          <a href="#why-us">Why Us</a>
          <a href="#connect">Connect</a>
          <a href="#booking-form">Book a Lesson</a>
          <a href="#contact">Contact</a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#booking-form">Book Online</a>
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
      <BookingForm />
      <Contact />
      <Footer />
    </>
  )
}

export default App
