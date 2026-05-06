import React, { useEffect, useState } from 'react';
import {
  ChevronDown, Mail, ArrowRight, CheckCircle2, Play,
  Instagram, Twitter, X, Brush, Star, Package,
  ExternalLink, Quote
} from 'lucide-react';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const els = document.querySelectorAll('.reveal-on-scroll');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);
};

const NAV_LINKS = [
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Our Story', id: 'our-story' },
  { label: 'For Professionals', id: 'professionals' },
  { label: 'Press', id: 'press' },
  { label: 'FAQ', id: 'faq' },
];

const FaceScanOverlay = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-10"
    viewBox="0 0 75 100"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Animated scan line */}
    <line x1="0" y1="5" x2="75" y2="5" stroke="rgba(217,70,239,0.45)" strokeWidth="0.5">
      <animate attributeName="y1" values="5;95;5" dur="3.6s" repeatCount="indefinite" />
      <animate attributeName="y2" values="5;95;5" dur="3.6s" repeatCount="indefinite" />
    </line>
    {/* Scan glow */}
    <rect x="0" y="3" width="75" height="4" fill="rgba(217,70,239,0.05)">
      <animate attributeName="y" values="3;93;3" dur="3.6s" repeatCount="indefinite" />
    </rect>
    {/* Corner brackets */}
    <g stroke="rgba(255,255,255,0.55)" strokeWidth="0.65">
      <path d="M2 2 L2 9 M2 2 L9 2" />
      <path d="M73 2 L73 9 M73 2 L66 2" />
      <path d="M2 98 L2 91 M2 98 L9 98" />
      <path d="M73 98 L73 91 M73 98 L66 98" />
    </g>
    {/* HUD labels */}
    <text x="3" y="5.5" fontSize="2" fill="rgba(217,70,239,0.75)" fontFamily="monospace" letterSpacing="0.3">SCANNING</text>
    <text x="44" y="5.5" fontSize="2" fill="rgba(255,255,255,0.35)" fontFamily="monospace" letterSpacing="0.3">AI FACE MAP</text>
  </svg>
);

export default function Home() {
  useScrollReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [betaEmail, setBetaEmail] = useState('');

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, menuOpen ? 300 : 0);
  };

  const handleBetaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!betaEmail) return;
    const url = 'https://tally.so/r/KY00dM?email=' + encodeURIComponent(betaEmail);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen font-jakarta overflow-x-hidden">
      {/* ─── NAVIGATION ──────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-[#0a0510]/70 border-b border-white/5">
        <button
          className="text-2xl font-playfair font-bold tracking-tight text-white"
          onClick={() => scrollTo('hero')}
          data-testid="nav-logo"
        >
          i<span className="text-fuchsia-400">YOU</span>nic
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo('beta-signup')}
            data-testid="btn-join-beta-nav"
            className="hidden sm:block px-5 py-2 text-sm font-semibold bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition-colors duration-200"
          >
            Join Beta
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] p-2 text-white hover:text-fuchsia-400 transition-colors"
            aria-label="Open menu"
            data-testid="btn-open-menu"
          >
            <span className="block w-6 h-[1.5px] bg-current" />
            <span className="block w-6 h-[1.5px] bg-current" />
            <span className="block w-4 h-[1.5px] bg-current" />
          </button>
        </div>
      </nav>

      {/* ─── FULL-SCREEN MENU OVERLAY ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[100] bg-[#0a0510] flex flex-col transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        data-testid="menu-overlay"
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/10">
          <span className="text-2xl font-playfair font-bold tracking-tight text-white">
            i<span className="text-fuchsia-400">YOU</span>nic
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white hover:text-fuchsia-400 transition-colors p-2"
            aria-label="Close menu"
            data-testid="btn-close-menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-10 md:px-20 gap-2">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              data-testid={`link-menu-${link.id}`}
              className={`text-left font-playfair font-medium text-white hover:text-fuchsia-400 transition-all duration-200 border-b border-white/10 pb-6 pt-6 flex items-center justify-between group ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }}
            >
              <span className="text-3xl md:text-5xl tracking-tight">{link.label}</span>
              <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
            </button>
          ))}

          <button
            onClick={() => scrollTo('beta-signup')}
            data-testid="btn-join-beta-menu"
            className={`mt-8 self-start px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold text-lg transition-all duration-200 flex items-center gap-3 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: menuOpen ? `${NAV_LINKS.length * 60 + 100}ms` : '0ms' }}
          >
            Join the Beta — Free <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="px-10 md:px-20 py-8 flex items-center gap-6 border-t border-white/10">
          <a href="#" className="text-white/40 hover:text-white transition-colors" data-testid="link-instagram-menu"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="text-white/40 hover:text-white transition-colors" data-testid="link-twitter-menu"><Twitter className="w-5 h-5" /></a>
          <span className="text-white/20 text-sm ml-auto">press@iyounic.com</span>
        </div>
      </div>

      {/* ─── DARK: Hero ──────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0510]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Beautiful confident woman"
            className="w-full h-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0510]/60 via-[#0a0510]/70 to-[#0a0510]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.08)_0%,transparent_60%)]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-6 text-white animate-fade-in-up">
            Makeup felt complicated ?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-200 to-fuchsia-400 italic">
              It doesn't have to...
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/65 max-w-2xl font-light tracking-wide mb-10 animate-fade-in-up delay-100">
            iYOUnic app. At home. On demand. Discover the looks that elevate who you already are.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md animate-fade-in-up delay-200">
            <button
              onClick={() => scrollTo('beta-signup')}
              data-testid="btn-join-beta-hero"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#0a0510] font-bold text-lg hover:bg-fuchsia-50 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Join Free Beta <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              data-testid="btn-see-how-it-works"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/15 text-white font-medium text-lg hover:bg-white/10 transition-colors duration-300"
            >
              See how it works
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer opacity-40 hover:opacity-80 transition-opacity text-white"
          onClick={() => scrollTo('problem')}
          data-testid="btn-scroll-down"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ─── LIGHT: Empathy ──────────────────────────────────────── */}
      <section id="problem" className="py-24 md:py-32 bg-[#faf7f4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-1/2 relative reveal-on-scroll">
            <div className="aspect-square overflow-hidden border border-[#e8e0d8]">
              <img
                src="/images/problem.png"
                alt="Woman looking thoughtfully"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-fuchsia-200/50 rounded-full blur-2xl" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col reveal-on-scroll">
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8 text-[#1a1412]">
              You've tried tutorials.<br />
              <span className="text-[#1a1412]/40">You've bought the products.</span><br />
              It still doesn't feel like <span className="italic text-fuchsia-600">you</span>.
            </h2>
            <p className="text-lg md:text-xl text-[#5a524e] font-light leading-relaxed mb-8">
              The beauty industry is obsessed with making you look like someone else. We're obsessed with helping you look like your best self — no intimidation, no complex techniques that only work on camera. Just you, elevated.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-[#1a1412]">iYOUnic changes that.</p>
          </div>
        </div>
      </section>

      {/* ─── WHITE: How It Works ─────────────────────────────────── */}
      <section id="how-it-works" className="py-24 md:py-32 bg-white border-t border-[#e8e0d8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20 reveal-on-scroll">
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-600 font-medium mb-4">How it works</p>
            <h2 className="font-playfair text-4xl md:text-6xl font-medium text-[#1a1412] mb-6">Discover what works for you</h2>
            <p className="text-lg text-[#7a7270] max-w-2xl mx-auto font-light">
              A completely personalized beauty experience, driven by technology but designed for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-fuchsia-300/50 to-transparent" />
            {[
              { step: '01', title: 'Try on your actual face', desc: 'Our precision AR maps your unique features, letting you try any look instantly without the mess or commitment.', img: 'bare-face.png', ar: true },
              { step: '02', title: 'Recreate step-by-step', desc: 'Get personalized, guided instructions tailored to your eye shape, skin tone, and bone structure.', img: 'wip.png', ar: false },
              { step: '03', title: 'Build your identity', desc: 'Save what works, discover new variations, and build a beauty wardrobe that is distinctly, unmistakably yours.', img: 'complete.png', ar: false },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center reveal-on-scroll" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-20 h-20 flex items-center justify-center mb-8 border border-[#e8e0d8] bg-[#faf7f4]">
                  <span className="font-playfair text-3xl italic text-fuchsia-500">{item.step}</span>
                </div>
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-8 border border-[#e8e0d8] group">
                  <div className={`relative w-full h-full transition-transform duration-700 ${i === 0 ? 'scale-[1.07] -translate-y-[3%] origin-[50%_40%] group-hover:scale-[1.12]' : 'group-hover:scale-105'}`}>
                    <img src={`/images/${item.img}`} alt={item.title} className="w-full h-full object-cover object-center" />
                    {item.ar && <FaceScanOverlay />}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1a1412]">{item.title}</h3>
                <p className="text-[#7a7270] font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIGHT CREAM: Features ───────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#f4efe8] border-t border-[#e2d8ce]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex flex-col gap-10 reveal-on-scroll">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-600 font-medium mb-4">The iYOUnic advantage</p>
                <h2 className="font-playfair text-4xl md:text-5xl font-medium leading-tight text-[#1a1412]">
                  Beauty without the guesswork.
                </h2>
              </div>
              <div className="space-y-8">
                {[
                  { title: "True-to-Life AR Try-On", desc: "See exactly how looks land on your face, not a model's. Our tech respects your unique features." },
                  { title: "Adaptive Tutorials", desc: "If a look requires a cut crease but you have hooded eyes, we adapt the tutorial automatically." },
                  { title: "Curated Product Matches", desc: "Products recommended for your skin type, undertone, and desired finish — not a sponsored list." },
                  { title: "Complement, Don't Transform", desc: "Looks that elevate your natural structure — not mask it. You, but the best version." },
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="mt-1 text-fuchsia-500 bg-fuchsia-50 p-2 group-hover:bg-fuchsia-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-[#1a1412]">{f.title}</h4>
                      <p className="text-[#7a7270] font-light">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative reveal-on-scroll">
              <div className="relative aspect-[4/5] overflow-hidden border border-[#ddd4c8]">
                <img src="/images/transformation.png" alt="AR Feature showcase" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1a1412]/90 to-transparent">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-fuchsia-500 flex items-center justify-center flex-shrink-0">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-medium mb-0.5 uppercase tracking-wider">Step 3 of 8</p>
                      <p className="text-white text-sm font-medium">Blend upwards for lift</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DARK: Testimonials ──────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0d0b14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16 reveal-on-scroll">
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-400 font-medium mb-4">Finally, beauty that actually works</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-medium text-white">What our beta testers say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { quote: "I stopped watching tutorials because I always ended up looking like them, not me. iYOUnic is the first thing that felt like mine.", name: "Sarah J.", role: "Makeup Beginner" },
              { quote: "The AR actually maps my monolid correctly and adjusts the eyeliner tutorial so it shows up when my eyes are open. Nothing has ever done that before.", name: "Elena M.", role: "Beauty Enthusiast" },
              { quote: "I gave up on makeup years ago. Three days with iYOUnic and I actually like what I see.", name: "Priya K.", role: "Beta Tester" },
              { quote: "Finally a tutorial that accounts for my skin tone at every step — not just vague advice to adjust for my complexion. It actually tells me which shade.", name: "Amara O.", role: "Beta Tester" },
            ].map((t, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors reveal-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                <Quote className="w-6 h-6 text-fuchsia-400 mb-4 opacity-60" />
                <p className="font-playfair text-xl md:text-2xl leading-snug mb-6 italic text-white/85">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIGHT: Our Story ────────────────────────────────────── */}
      <section id="our-story" className="py-24 md:py-36 bg-[#faf7f4] border-t border-[#e8e0d8]">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="reveal-on-scroll">
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-600 font-medium mb-8">Our story</p>
            <h2 className="font-playfair text-4xl md:text-6xl font-medium text-[#1a1412] leading-tight mb-12">
              Built for the woman who quietly gave up on beauty — and should never have had to.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal-on-scroll">
            <div className="space-y-6 text-[#5a524e] font-light leading-relaxed text-lg">
              <p>
                iYOUnic was born from a simple observation: millions of women have shelves full of products they bought on the advice of tutorials that were never made for their face, their skin tone, or their life.
              </p>
              <p>
                They tried. They watched. They practiced. And when it still didn't look right, they told themselves beauty just wasn't for them.
              </p>
              <p>
                That is a failure of the industry — not of them.
              </p>
            </div>
            <div className="space-y-6 text-[#5a524e] font-light leading-relaxed text-lg">
              <p>
                We built iYOUnic to fix that. Using AR and personalization technology, iYOUnic lets you try looks on your actual face, then guides you to recreate them with step-by-step instructions built around your specific features.
              </p>
              <p>
                Not a model's face. Not an influencer's face. <span className="font-medium text-[#1a1412] italic">Your</span> face. Your features. Your beauty.
              </p>
              <p className="font-medium text-[#1a1412]">
                iYOUnic — unique. At home. On demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DARK: For Professionals (B2B) ───────────────────────── */}
      <section id="professionals" className="py-24 md:py-32 bg-[#0a0510]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16 reveal-on-scroll">
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-400 font-medium mb-4">Partner with us</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-medium text-white mb-6">For professionals</h2>
            <p className="text-lg text-white/55 max-w-2xl mx-auto font-light">
              iYOUnic is building the future of personalized beauty. We want the best artists, creators, and brands alongside us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-on-scroll">
            {[
              {
                icon: <Brush className="w-7 h-7" />,
                title: "Makeup Artists & Beauty Pros",
                desc: "Bring your artistry to a wider audience. Partner with iYOUnic to showcase your signature techniques, build your profile, and reach clients ready to learn — on their own terms.",
                cta: "Apply to Partner",
              },
              {
                icon: <Star className="w-7 h-7" />,
                title: "Beauty Influencers & Creators",
                desc: "Your audience trusts your eye. Build something together — from co-created looks to exclusive feature drops. We want creators who put their community first.",
                cta: "Let's Collaborate",
              },
              {
                icon: <Package className="w-7 h-7" />,
                title: "Brands & Product Partners",
                desc: "Get your products in front of the right people at exactly the right moment — when they're actively choosing what to buy for a specific look, on their own face.",
                cta: "Explore Partnerships",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex flex-col p-8 bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-fuchsia-500/30 transition-all duration-300 group reveal-on-scroll"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-fuchsia-400 mb-6 p-3 bg-fuchsia-500/10 self-start group-hover:bg-fuchsia-500/20 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 leading-snug">{card.title}</h3>
                <p className="text-white/55 font-light leading-relaxed flex-1 mb-8">{card.desc}</p>
                <a
                  href="mailto:partners@iyounic.com"
                  data-testid={`link-partner-${i}`}
                  className="flex items-center gap-2 text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition-colors group-hover:gap-3 duration-200"
                >
                  {card.cta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIGHT: Press & PR ───────────────────────────────────── */}
      <section id="press" className="py-24 md:py-32 bg-white border-t border-[#e8e0d8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-on-scroll">
              <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-600 font-medium mb-6">Press & Media</p>
              <h2 className="font-playfair text-4xl md:text-5xl font-medium text-[#1a1412] leading-tight mb-8">
                Covering iYOUnic?<br />
                <span className="text-[#1a1412]/40">We'd love to work with you.</span>
              </h2>
              <p className="text-lg text-[#7a7270] font-light leading-relaxed mb-10">
                iYOUnic is redefining how a generation approaches beauty — through technology that's personal, inclusive, and empowering. For press kits, interviews, product trials, or founder access, get in touch.
              </p>
              <a
                href="mailto:press@iyounic.com"
                data-testid="link-press-email"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1412] text-white font-semibold hover:bg-fuchsia-600 transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                press@iyounic.com
              </a>
            </div>

            <div className="space-y-4 reveal-on-scroll">
              <p className="text-sm uppercase tracking-[0.25em] text-[#7a7270] font-medium mb-6">Press resources</p>
              {[
                { label: "Brand & Media Kit", desc: "Logos, brand assets, founder photography, product screenshots." },
                { label: "Founder Bio & Headshots", desc: "Official biography and high-resolution press photography." },
                { label: "Product Demo Access", desc: "Early access to the platform for editorial review and features." },
                { label: "Key Facts & Statistics", desc: "Company background, beta statistics, and platform overview." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 border border-[#e8e0d8] hover:border-fuchsia-300 group transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-[#1a1412] mb-1">{item.label}</p>
                    <p className="text-sm text-[#7a7270] font-light">{item.desc}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#1a1412]/20 group-hover:text-fuchsia-500 transition-colors flex-shrink-0 ml-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIGHT CREAM: Beta Sign-Up ───────────────────────────── */}
      <section id="beta-signup" className="py-32 bg-[#faf7f4] border-t border-[#e8e0d8]">
        <div className="max-w-4xl mx-auto px-6 text-center reveal-on-scroll">
          <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-600 font-medium mb-6">Limited spots</p>
          <h2 className="font-playfair text-5xl md:text-7xl font-medium mb-6 text-[#1a1412]">Be among the first.</h2>
          <p className="text-xl text-[#7a7270] font-light mb-12 max-w-2xl mx-auto">
            Join the exclusive beta - experience beauty that actually works for you.
          </p>
          
          <form onSubmit={handleBetaSubmit} className="max-w-md mx-auto flex flex-col gap-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a1412]/40" />
              <input
                type="email"
                value={betaEmail}
                onChange={(e) => setBetaEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                data-testid="input-beta-email"
                className="w-full bg-white border border-[#ddd4c8] py-4 pl-12 pr-4 text-[#1a1412] placeholder:text-[#1a1412]/35 focus:outline-none focus:border-fuchsia-400 transition-colors duration-200"
              />
            </div>
            <button
              type="submit"
              data-testid="btn-join-beta-footer"
              className="w-full py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Get Early Access <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-[#1a1412]/40 font-light">Free to join. No spam. Unsubscribe anytime.</p>
          </form>
        </div>
      </section>

      {/* ─── WHITE: FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-white border-t border-[#e8e0d8]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 reveal-on-scroll">
          <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-12 text-center text-[#1a1412]">Frequently asked questions</h2>
          <div className="divide-y divide-[#e8e0d8]">
            {[
              { q: "Is the beta really free?", a: "Yes, 100%. We are looking for genuine feedback from real users to perfect the experience before our public launch." },
              { q: "When does it launch?", a: "We are rolling out beta invites in batches over the coming weeks. Public launch is slated for later this year." },
              { q: "What devices are supported?", a: "iYOUnic currently requires an iPhone 12 or newer, or a recent iPad, to fully support the advanced AR tracking features." },
              { q: "What skin tones are supported?", a: "All of them. We built our AR engine and product database to be inclusive of all skin tones and undertones from day one — not as an afterthought." },
              { q: "How do I partner with iYOUnic as a brand or creator?", a: "Head to the For Professionals section above or email us at partners@iyounic.com. We review all applications personally." },
            ].map((faq, i) => (
              <div key={i} className="py-6 group cursor-pointer" data-testid={`faq-item-${i}`}>
                <h4 className="text-base font-semibold text-[#1a1412] group-hover:text-fuchsia-600 transition-colors flex justify-between items-center">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-[#1a1412]/30 group-hover:text-fuchsia-500 flex-shrink-0 ml-4 transition-transform group-hover:rotate-180 duration-300" />
                </h4>
                <p className="text-[#7a7270] font-light leading-relaxed h-0 overflow-hidden group-hover:h-auto group-hover:mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DARK: Footer ────────────────────────────────────────── */}
      <footer className="py-16 bg-[#0a0510] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            <div>
              <div className="text-2xl font-playfair font-bold tracking-tight text-white mb-2">
                i<span className="text-fuchsia-400">YOU</span>nic
              </div>
              <p className="text-sm text-white/35 font-light max-w-xs leading-relaxed">
                Personalized beauty — powered by AR. Unique. At home. On demand.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium mb-4">Product</p>
                <ul className="space-y-3">
                  {['How It Works', 'Join Beta', 'FAQ'].map((l) => (
                    <li key={l}><button onClick={() => scrollTo(l.toLowerCase().replace(/ /g, '-'))} data-testid={`link-footer-${l}`} className="text-sm text-white/50 hover:text-white transition-colors font-light">{l}</button></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium mb-4">Company</p>
                <ul className="space-y-3">
                  {['Our Story', 'For Professionals', 'Press'].map((l) => (
                    <li key={l}><button onClick={() => scrollTo(l.toLowerCase().replace(/ /g, '-'))} data-testid={`link-footer-${l}`} className="text-sm text-white/50 hover:text-white transition-colors font-light">{l}</button></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium mb-4">Contact</p>
                <ul className="space-y-3">
                  <li><a href="mailto:hello@iyounic.com" data-testid="link-footer-hello" className="text-sm text-white/50 hover:text-white transition-colors font-light">hello@iyounic.com</a></li>
                  <li><a href="mailto:partners@iyounic.com" data-testid="link-footer-partners" className="text-sm text-white/50 hover:text-white transition-colors font-light">partners@iyounic.com</a></li>
                  <li><a href="mailto:press@iyounic.com" data-testid="link-footer-press" className="text-sm text-white/50 hover:text-white transition-colors font-light">press@iyounic.com</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25 font-light">&copy; {new Date().getFullYear()} iYOUnic. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/35 hover:text-white transition-colors" data-testid="link-instagram-footer"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white/35 hover:text-white transition-colors" data-testid="link-twitter-footer"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
