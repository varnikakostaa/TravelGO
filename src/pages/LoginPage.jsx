import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Plane,
  ShieldCheck, Sparkles, Globe2, MapPin
} from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
  event.preventDefault()

  if (!email.trim() || !password.trim()) {
    setMessage('Please enter your email and password.')
    return
  }

  navigate('/home')
}
  return (
    <main className="login-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="TravelGo home">
          <span className="brand-mark"><Plane size={19} fill="currentColor" /></span>
          <span>travel<span>go</span></span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#flights">Flights</a>
          <a href="#hotels">Hotels</a>
          <a href="#packages">Packages</a>
          <a href="#bookings">My Bookings</a>
        </nav>
        <a className="header-help" href="#help">Need help?</a>
      </header>

      <section className="page-content">
        <div className="intro-panel">
          <div className="eyebrow"><Sparkles size={14} /> YOUR JOURNEY STARTS HERE</div>
          <h1>Make room for<br /><span>new memories.</span></h1>
          <p className="intro-copy">
            Discover extraordinary places, plan effortless getaways, and keep every
            part of your journey in one place.
          </p>

          <div className="travel-art" aria-label="Illustration of a scenic travel destination">
            <div className="art-sun" />
            <div className="art-cloud cloud-one" />
            <div className="art-cloud cloud-two" />
            <div className="art-mountain mountain-back" />
            <div className="art-mountain mountain-front" />
            <div className="art-water" />
            <div className="art-route"><span /><span /><span /></div>
            <div className="art-plane"><Plane size={35} fill="currentColor" /></div>
            <div className="destination-tag"><MapPin size={15} /> Somewhere wonderful</div>
          </div>

          <div className="trust-row">
            <div className="trust-icon"><Globe2 size={18} /></div>
            <div><strong>Explore without limits</strong><span>Flights · Stays · Experiences</span></div>
          </div>
        </div>

        <section className="login-card">
          <div className="card-topline">
            <div className="card-icon"><Plane size={21} fill="currentColor" /></div>
            <span className="secure-label"><ShieldCheck size={14} /> SECURE SIGN IN</span>
          </div>
          <div className="card-heading">
            <p className="welcome-label">WELCOME BACK</p>
            <h2>Sign in to TravelGo</h2>
            <p>Pick up where your next adventure begins.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <div className="input-wrap">
              <Mail size={19} />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="password-label">
              <label htmlFor="password">Password</label>
              <a href="#forgot-password">Forgot password?</a>
            </div>
            <div className="input-wrap">
              <LockKeyhole size={19} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                className="show-password"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <button className="submit-button" type="submit">
              Sign in <ArrowRight size={18} />
            </button>
            {message && <p className="form-message" role="status">{message}</p>}
          </form>

          <div className="divider"><span>OR</span></div>
          <p className="signup-copy">New to TravelGo? <a href="#create-account">Create an account <ArrowRight size={15} /></a></p>
          <p className="terms">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </section>
      </section>
      <footer className="site-footer">
        <span>© 2026 TravelGo</span>
        <span>Thoughtfully planned. Beautifully travelled.</span>
      </footer>
    </main>
  )
}