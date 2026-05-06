import { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import {
  MapPin,
  Star,
  ChevronDown,
  Menu,
  X,
  Heart,
  Sun,
  Waves,
  Palmtree,
  Mail,
  Phone,
  ArrowRight,
  Quote,
} from 'lucide-react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
}

// ─── NAVBAR ──────────────────────────────────────────────
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollY();
  const scrolled = scrollY > 60;

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Esencia', href: '#esencia' },
    { label: 'Apartamentos', href: '#apartamentos' },
    { label: 'Sobre Nosotros', href: '#about' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' },
    { label: 'Ubicacion', href: '#ubicacion' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled
          ? `rgba(255,255,255,${Math.min((scrollY - 60) / 60, 1) * 0.96})`
          : 'transparent',
        boxShadow: scrolled ? '0 1px 12px 0 rgba(0,0,0,0.07)' : 'none',
        borderBottom: scrolled
          ? `1px solid rgba(210,195,178,${Math.min((scrollY - 60) / 60, 1) * 0.4})`
          : '1px solid transparent',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div className="relative z-50 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-2 group">
            <span
              className="font-display text-2xl font-semibold tracking-wide"
              style={{
                color: scrolled
                  ? `rgb(${Math.round(27 + (31) * Math.min((scrollY - 60) / 60, 1))}, ${Math.round(66 + (-11) * Math.min((scrollY - 60) / 60, 1))}, ${Math.round(55 + (10) * Math.min((scrollY - 60) / 60, 1))})`
                  : 'white',
                transition: 'color 0.3s ease',
              }}
            >
              Casa Once
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide hover:text-sand-500 transition-colors duration-300"
                style={{
                  color: scrolled ? 'rgb(120,90,60)' : 'rgba(255,255,255,0.9)',
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="px-5 py-2.5 bg-ocean-600 text-white text-sm font-medium rounded-full hover:bg-ocean-700 transition-all duration-300 hover:shadow-lg hover:shadow-ocean-600/25"
            >
              Reservar
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg relative w-10 h-10 flex items-center justify-center"
            style={{
              color: scrolled || isOpen ? 'rgb(120,90,60)' : 'white',
              transition: 'color 0.3s ease',
            }}
          >
            <div
              className={`absolute transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            >
              <Menu size={24} />
            </div>
            <div
              className={`absolute transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
              }`}
            >
              <X size={24} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-warm-900/20 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        style={{ zIndex: 40 }}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-white/95 backdrop-blur-md shadow-2xl lg:hidden flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 45 }}
      >
        <div className="pt-24 pb-8 px-6 flex flex-col h-full overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-4 text-warm-800 hover:text-ocean-600 transition-colors text-lg font-medium border-b border-warm-200/50 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <a
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 text-center bg-ocean-600 text-white rounded-full text-base font-medium shadow-lg shadow-ocean-600/25 hover:bg-ocean-700 transition-colors"
            >
              Reservar
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}


// ─── HERO ────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/lobby.jpg"
          alt="Casa Once - Lobby en Las Terrenas"
          className="hero-bg-image"
          fetchpriority="high"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 to-transparent" />

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="opacity-0 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-px bg-sand-300" />
            <span className="text-sand-200 text-sm font-medium tracking-[0.3em] uppercase">
              Las Terrenas, Rep. Dominicana
            </span>
            <div className="w-12 h-px bg-sand-300" />
          </div>
        </div>

        <h1 className="opacity-0 animate-fade-in-up animation-delay-200 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-semibold leading-[1.1] mb-6">
          Casa
          <span className="block italic text-sand-300">Once</span>
        </h1>

        <p className="opacity-0 animate-fade-in-up animation-delay-400 text-lg sm:text-xl text-white/80 max-w-xl leading-relaxed mb-10 font-light">
          Pequenos apartamentos con alma en Las Terrenas, a pocos minutos de la
          playa.
        </p>

        <div className="opacity-0 animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-4">
          <a
            href="#apartamentos"
            className="group px-8 py-4 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium hover:bg-white/25 transition-all duration-300 flex items-center gap-2"
          >
            Explorar
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 bg-sand-400 text-white rounded-full font-medium hover:bg-sand-500 transition-all duration-300 shadow-lg shadow-sand-400/25"
          >
            Reservar ahora
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-fade-in animation-delay-1000">
        <a
          href="#esencia"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Descubre</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}

// ─── ESENCIA ─────────────────────────────────────────────
function Esencia() {
  const { ref, isInView } = useInView();

  const features = [
    {
      icon: <Sun size={28} />,
      title: 'Diseno con alma',
      desc: 'Cada detalle pensado para tu bienestar y confort.',
    },
    {
      icon: <Waves size={28} />,
      title: 'Cercania al mar',
      desc: 'A pocos minutos de la hermosa playa Las Ballenas.',
    },
    {
      icon: <Palmtree size={28} />,
      title: 'Naturaleza y calma',
      desc: 'Desconecta del ruido en un entorno natural y sereno.',
    },
    {
      icon: <Heart size={28} />,
      title: 'Experiencia unica',
      desc: 'Mas que alojamiento, un lugar para sentir y crear recuerdos.',
    },
  ];

  return (
    <section id="esencia" className="bg-warm-50 section-padding">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="text-ocean-600 text-sm font-medium tracking-[0.25em] uppercase">
            Nuestra esencia
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-900 mt-4 leading-tight">
            Espacios que combinan
            <span className="block italic text-sand-600">
              diseno, calma y calidez
            </span>
          </h2>
          <p className="mt-6 text-warm-600 max-w-2xl mx-auto text-lg leading-relaxed">
            En Casa Once, cada detalle esta pensado para tu bienestar. Creamos
            espacios inspirados en la esencia de Las Terrenas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group text-center p-8 rounded-2xl bg-white border border-warm-200/60 hover:border-sand-300 hover:shadow-xl hover:shadow-sand-100/50 transition-all duration-500 ${isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-ocean-50 text-ocean-600 mb-5 group-hover:bg-ocean-600 group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="font-display text-xl text-warm-900 mb-3">
                {f.title}
              </h3>
              <p className="text-warm-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── APARTAMENTOS ────────────────────────────────────────
function Apartamentos() {
  const { ref: ref1, isInView: inView1 } = useInView();
  const { ref: ref2, isInView: inView2 } = useInView();

  return (
    <section id="apartamentos" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-ocean-600 text-sm font-medium tracking-[0.25em] uppercase">
            Nuestros apartamentos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-warm-900 mt-4 leading-tight">
            Dos espacios unicos,
            <span className="block italic text-sand-600">
              cada uno con su esencia
            </span>
          </h2>
          <p className="mt-6 text-warm-600 max-w-xl mx-auto text-lg">
            Elige el que conecte contigo y vive Casa Once a tu manera.
          </p>
        </div>

        {/* Khaleesi */}
        <div
          ref={ref1}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24 transition-all duration-700 ${inView1 ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div
            className={`parallax-container rounded-2xl overflow-hidden shadow-2xl shadow-warm-200/50 ${inView1 ? 'translate-x-0' : '-translate-x-12'
              } transition-transform duration-700`}
          >
            <img
              src="/Khaleesi.jpg"
              alt="Apartamento Khaleesi"
              loading="lazy"
              className="w-full h-[400px] lg:h-[520px] object-cover"
            />
          </div>
          <div
            className={`${inView1 ? 'translate-x-0' : 'translate-x-12'
              } transition-transform duration-700 delay-200`}
          >
            <span className="inline-block px-4 py-1.5 bg-terra-100 text-terra-600 rounded-full text-sm font-medium mb-4">
              Vibrante y con estilo
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-warm-900 mb-4">
              1103 M. Khaleesi
            </h3>
            <p className="text-warm-600 text-lg leading-relaxed mb-6">
              Un espacio vibrante, lleno de color y personalidad. Perfecto para
              quienes buscan algo diferente y con estilo. Cada rincon refleja
              creatividad y energia, creando un ambiente unico que inspira.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Colorido', 'Creativo', 'Vibrante', 'Estilizado'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-warm-100 text-warm-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-ocean-700 transition-colors"
              >
                Mas informacion
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="https://es-l.airbnb.com/rooms/1651737436763992552?unique_share_id=1b3adc9c-a5c0-4f1f-800d-17789235bbce&viralityEntryPoint=1&s=76&source_impression_id=p3_1778030745_P3IJqnlljsYzpfM4"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#FF5A5F] text-white text-sm rounded-full font-medium hover:bg-[#E34C52] transition-colors shadow-sm flex items-center gap-2"
              >
                Ver en Airbnb
              </a>
            </div>
          </div>
        </div>

        {/* Evangeline */}
        <div
          ref={ref2}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-700 ${inView2 ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div
            className={`order-2 lg:order-1 ${inView2 ? 'translate-x-0' : '-translate-x-12'
              } transition-transform duration-700 delay-200`}
          >
            <span className="inline-block px-4 py-1.5 bg-ocean-100 text-ocean-600 rounded-full text-sm font-medium mb-4">
              Bohemio y tranquilo
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-warm-900 mb-4">
              1104 M. Evangeline
            </h3>
            <p className="text-warm-600 text-lg leading-relaxed mb-6">
              Un ambiente bohemio, tranquilo y acogedor. Ideal para desconectar y
              descansar con calma. La decoracion natural y los tonos suaves
              invitan a la relajacion profunda.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Bohemio', 'Tranquilo', 'Acogedor', 'Natural'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-warm-100 text-warm-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 text-ocean-600 font-medium hover:text-ocean-700 transition-colors"
              >
                Mas informacion
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="https://es-l.airbnb.com/rooms/1653339743101847715?unique_share_id=4f6f8aab-a20c-426d-a747-97040bf0c97b&viralityEntryPoint=1&s=76&source_impression_id=p3_1778030745_P3QPcFPOGuWZGM5d"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#FF5A5F] text-white text-sm rounded-full font-medium hover:bg-[#E34C52] transition-colors shadow-sm flex items-center gap-2"
              >
                Ver en Airbnb
              </a>
            </div>
          </div>
          <div
            className={`parallax-container order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl shadow-warm-200/50 ${inView2 ? 'translate-x-0' : 'translate-x-12'
              } transition-transform duration-700`}
          >
            <img
              src="/Evangeline.webp"
              alt="Apartamento Evangeline"
              loading="lazy"
              className="w-full h-[400px] lg:h-[520px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT / GALLERY ────────────────────────────────────
function About() {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="bg-warm-50 section-padding overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-700 ${isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
              }`}
          >
            <span className="text-ocean-600 text-sm font-medium tracking-[0.25em] uppercase">
              Sobre Casa Once
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-warm-900 mt-4 mb-6 leading-tight">
              Un refugio donde la calma
              <span className="block italic text-sand-600">
                y la naturaleza se encuentran
              </span>
            </h2>
            <p className="text-warm-600 text-lg leading-relaxed mb-4">
              Casa Once es un pequeno refugio en Las Terrenas donde la calma y la
              naturaleza se encuentran. A pocos minutos de la hermosa playa Las
              Ballenas.
            </p>
            <p className="text-warm-600 text-lg leading-relaxed mb-8">
              Aqui no solo vienes a quedarte... vienes a sentir.
            </p>
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-warm-200/60 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center">
                <MapPin size={20} className="text-sand-600" />
              </div>
              <div>
                <p className="font-medium text-warm-900">
                  Las Terrenas, Samana
                </p>
                <p className="text-warm-500 text-sm">
                  Republica Dominicana
                </p>
              </div>
            </div>
          </div>

          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="space-y-4">
              <div className="parallax-container rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/1.jpg"
                  alt="Casa Once - Interior"
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="parallax-container rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/2.jpg"
                  alt="Casa Once - Espacios"
                  loading="lazy"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="parallax-container rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/3.jpg"
                  alt="Casa Once - Detalles"
                  loading="lazy"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="parallax-container rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/4.jpg"
                  alt="Casa Once - Ambiente"
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIOS ─────────────────────────────────────────
function Testimonios() {
  const { ref, isInView } = useInView();

  const testimonials = [
    {
      text: 'La experiencia en Casa Once supero todas nuestras expectativas. La comodidad y la cercania a la playa lo hacen un excelente lugar. Volvemos pronto!',
      name: 'Ana y Juan C.',
      apartment: '',
    },
    {
      text: 'M. Khaleesi es simplemente espectacular, lleno de vida y creatividad. Nos sentimos como en casa, pero en un paraiso. Altamente recomendado!',
      name: 'Sofia G.',
      apartment: 'M. Khaleesi',
    },
    {
      text: 'M. Evangeline es un oasis de paz. La decoracion bohemia y la tranquilidad del entorno nos permitieron desconectar totalmente. Pura relajacion!',
      name: 'Roberto y Elena M.',
      apartment: 'M. Evangeline',
    },
  ];

  return (
    <section
      id="testimonios"
      className="bg-ocean-800 section-padding relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-ocean-700/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sand-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="text-sand-300 text-sm font-medium tracking-[0.25em] uppercase">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4 leading-tight">
            Lo que dicen
            <span className="block italic text-sand-300">
              nuestros huespedes
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`group p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-500 ${isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${(i + 1) * 200}ms` }}
            >
              <Quote size={32} className="text-sand-400/50 mb-4" />
              <p className="text-white/80 leading-relaxed mb-6 text-[15px]">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="text-sand-400 fill-sand-400"
                  />
                ))}
              </div>
              <p className="text-white font-medium">{t.name}</p>
              {t.apartment && (
                <p className="text-sand-300/70 text-sm mt-1">
                  {t.apartment}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ──────────────────────────────────────────
function CtaBanner() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Beach sunset"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/80 to-sand-800/60" />
      </div>

      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-700 ${isInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
          }`}
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          Tu escape en
          <span className="block italic text-sand-300">Las Terrenas</span>
        </h2>
        <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
          Vive una bonita experiencia en nuestros apartamentos. Disena, descansa
          y desconecta.
        </p>
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 px-10 py-4 bg-white text-ocean-800 rounded-full font-semibold text-lg hover:bg-sand-100 transition-all duration-300 shadow-2xl shadow-black/20 hover:shadow-black/30"
        >
          Reservar ahora
          <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
}

// ─── CONTACTO ────────────────────────────────────────────
function Contacto() {
  const { ref, isInView } = useInView();
  const [formState, setFormState] = useState({
    nombre: '',
    email: '',
    llegada: '',
    salida: '',
    mensaje: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('sending');

      try {
        await emailjs.send(
          'service_vs25yx8',
          'template_g3onwwf',
          {
            to_email: 'Kenialuisiana17@gmail.com',
            from_name: formState.nombre,
            from_email: formState.email,
            fecha_llegada: formState.llegada,
            fecha_salida: formState.salida,
            message: formState.mensaje,
          },
          '5dJKTZ4rSSDj9maFn'
        );
        setStatus('success');
        setFormState({ nombre: '', email: '', llegada: '', salida: '', mensaje: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } catch (err) {
        console.error('EmailJS error:', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    },
    [formState]
  );

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-900 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-ocean-500/30 focus:border-ocean-400 transition-all';

  return (
    <section id="contacto" className="bg-warm-50 section-padding">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="text-ocean-600 text-sm font-medium tracking-[0.25em] uppercase">
            Contacto
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-warm-900 mt-4 leading-tight">
            Escribenos y
            <span className="block italic text-sand-600">
              comienza tu experiencia
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div
            className={`lg:col-span-2 space-y-8 transition-all duration-700 delay-200 ${isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
              }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-ocean-50 flex items-center justify-center flex-shrink-0">
                <MapPin size={22} className="text-ocean-600" />
              </div>
              <div>
                <h4 className="font-display text-lg text-warm-900 mb-1">
                  Ubicacion
                </h4>
                <p className="text-warm-600">
                  Las Terrenas, Samana
                  <br />
                  Republica Dominicana
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-ocean-50 flex items-center justify-center flex-shrink-0">
                <Mail size={22} className="text-ocean-600" />
              </div>
              <div>
                <h4 className="font-display text-lg text-warm-900 mb-1">
                  Email
                </h4>
                <p className="text-warm-600">info@casaonce.es</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-ocean-50 flex items-center justify-center flex-shrink-0">
                <Phone size={22} className="text-ocean-600" />
              </div>
              <div>
                <h4 className="font-display text-lg text-warm-900 mb-1">
                  Telefono
                </h4>
                <p className="text-warm-600">+1 (849) 265-0528</p>
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-3 transition-all duration-700 delay-300 ${isInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
              }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-warm-200/30 border border-warm-200/60"
            >
              <div className="space-y-5">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formState.nombre}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, nombre: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className={inputClass}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-warm-700 mb-2">
                      Fecha de llegada *
                    </label>
                    <input
                      type="date"
                      value={formState.llegada}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, llegada: e.target.value }))
                      }
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warm-700 mb-2">
                      Fecha de salida *
                    </label>
                    <input
                      type="date"
                      value={formState.salida}
                      min={formState.llegada || new Date().toISOString().split('T')[0]}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, salida: e.target.value }))
                      }
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    value={formState.mensaje}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, mensaje: e.target.value }))
                    }
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Cuentanos sobre tu estadia ideal..."
                  />
                </div>
              </div>

              {/* Feedback */}
              {status === 'success' && (
                <div className="mt-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
                  Mensaje enviado correctamente. ¡Te contactaremos pronto!
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                  Hubo un error al enviar. Por favor escríbenos directamente a info@casaonce.es
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-6 w-full py-4 bg-ocean-600 text-white rounded-xl font-semibold hover:bg-ocean-700 transition-all duration-300 hover:shadow-lg hover:shadow-ocean-600/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── UBICACION (MAPA) ───────────────────────────────────
function Ubicacion() {
  const { ref, isInView } = useInView();

  return (
    <section id="ubicacion" className="bg-white section-padding">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="text-ocean-600 text-sm font-medium tracking-[0.25em] uppercase">
            Como llegar
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-warm-900 mt-4 leading-tight">
            Encuentranos en
            <span className="block italic text-sand-600">Las Terrenas</span>
          </h2>
          <p className="mt-6 text-warm-600 max-w-xl mx-auto text-lg leading-relaxed">
            Ubicados en un entorno tranquilo y accesible, a pocos minutos de la
            playa y los principales puntos de interes.
          </p>
        </div>

        <div
          className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-warm-200/50 border border-warm-200/60">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d447.3464624039487!2d-69.54963741889557!3d19.32303221433038!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaefb00567b27e5%3A0x6cd12e1300a790c8!2sCasa%20Once%20by%20Madeline%20Genao!5e1!3m2!1ses-419!2sdo!4v1778015695316!5m2!1ses-419!2sdo"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicacion de Casa Once en Google Maps"
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-3 text-warm-600">
              <div className="w-10 h-10 rounded-full bg-ocean-50 flex items-center justify-center">
                <MapPin size={18} className="text-ocean-600" />
              </div>
              <span className="text-sm font-medium">
                Las Terrenas, Samana, Rep. Dominicana
              </span>
            </div>
            <a
              href="https://maps.google.com/?q=Casa+Once+by+Madeline+Genao"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-2.5 bg-ocean-600 text-white text-sm font-medium rounded-full hover:bg-ocean-700 transition-all duration-300 hover:shadow-lg hover:shadow-ocean-600/25"
            >
              Abrir en Google Maps
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-300 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-2xl text-white mb-4">
              Casa Once
            </h3>
            <p className="text-warm-400 leading-relaxed">
              Pequenos apartamentos con alma en Las Terrenas. Disenados para
              descansar, desconectar y vivir una bonita experiencia.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg text-white mb-4">
              Navegacion
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: '#hero' },
                { label: 'Esencia', href: '#esencia' },
                { label: 'Apartamentos', href: '#apartamentos' },
                { label: 'Sobre Nosotros', href: '#about' },
                { label: 'Contacto', href: '#contacto' },
                { label: 'Ubicacion', href: '#ubicacion' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-warm-400 hover:text-sand-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg text-white mb-4">Contacto</h4>
            <div className="space-y-2 text-warm-400">
              <p>Las Terrenas, Samana</p>
              <p>Republica Dominicana</p>
              <p>info@casaonce.es</p>
            </div>
          </div>
        </div>
        <div className="border-t border-warm-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-500 text-sm">
            &copy; {new Date().getFullYear()} Casa Once. Todos los derechos
            reservados.
          </p>
          <p className="text-warm-500 text-sm italic">
            Tu escape en Las Terrenas
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────
function App() {
  return (
    <div className="font-body text-warm-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Esencia />
      <Apartamentos />
      <About />
      <Testimonios />
      <CtaBanner />
      <Contacto />
      <Ubicacion />
      <Footer />
    </div>
  );
}

export default App;
