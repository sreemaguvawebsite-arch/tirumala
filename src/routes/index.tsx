import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Church,
  Facebook,
  HandHeart,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Play,
  Users,
  Phone,
  X,
  Youtube,
  Sparkles,
  Flower2,
  Volume2,
  VolumeX,
  Crown,
  Shield,
  Stars,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import IntroVideo from "@/components/IntroVideo";
import DynamicServicesSection from "@/components/DynamicServicesSection";
import DynamicGallerySection from "@/components/DynamicGallerySection";

import heroImage from "@/assets/temple-hero.png.asset.json";
import deityImage from "@/assets/venkateswara.jpg";
import hillsImage from "@/assets/tirumala-hills.jpg";
import lampsImage from "@/assets/gallery-lamps.jpg";
import corridorImage from "@/assets/gallery-corridor.jpg";
import ceremonyImage from "@/assets/gallery-ceremony.jpg";
import bg from "@/assets/bg.png";
import aboutVideo from "@/assets/video.mp4";

// NEW
import vishnuImage from "@/assets/vishnu.jpg";
import lakshmiImage from "@/assets/lashmi.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Narayana Tirumala | Faith, Service, Together",
      },
      {
        name: "description",
        content:
          "Discover temple services, spiritual events, pilgrimage guidance and seva at Narayana Tirumala.",
      },
      {
        property: "og:title",
        content: "Narayana Tirumala | Faith, Service, Together",
      },
      {
        property: "og:description",
        content: "A sacred journey of faith, devotion and service.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: NarayanaTirumala,
});

const nav = ["Home", "About", "Services", "Gallery", "Contact Us"];

const services = [
  {
    icon: Church,
    title: "Temple Services",
    text: "Poojas, Sevas and special darshan arrangements.",
  },
  {
    icon: Users,
    title: "Community Support",
    text: "Annadanam, educational support and welfare programs.",
  },
  {
    icon: Flower2,
    title: "Spiritual Events",
    text: "Festivals, bhajans and special programs.",
  },
  {
    icon: MapPin,
    title: "Pilgrimage Assistance",
    text: "Travel support and guidance for Tirumala visits.",
  },
  {
    icon: BookOpen,
    title: "Knowledge & Awareness",
    text: "Spiritual talks, literature and workshops.",
  },
  {
    icon: HandHeart,
    title: "Seva Opportunities",
    text: "Be a part of our service initiatives.",
  },
];

const values = [
  {
    icon: Flower2,
    title: "Faith",
    text: "In every prayer",
  },
  {
    icon: Heart,
    title: "Service",
    text: "In every action",
  },
  {
    icon: Users,
    title: "Community",
    text: "In every heart",
  },
  {
    icon: Sparkles,
    title: "Values",
    text: "In every step",
  },
];

function Brand() {
  return (
    <a
      href="#home"
      className="flex min-w-0 items-center gap-3"
      aria-label="Narayana Tirumala home"
    >
      <Flower2
        className="h-11 w-11 shrink-0 text-gold"
        strokeWidth={1.4}
      />

      <span className="min-w-0">
        <strong className="block truncate font-display text-xl font-semibold text-ivory">
          Narayana Tirumala
        </strong>

        <small className="block text-[7px] font-semibold tracking-[0.32em] text-ivory/70">
          FAITH · SERVICE · TOGETHER
        </small>
      </span>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);

    fn();

    window.addEventListener("scroll", fn);

    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "bg-navy/90 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-20 max-w-site grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Brand />

        <nav
          className="hidden items-center gap-10 lg:flex"
          aria-label="Main navigation"
        >
          {nav.map((item, i) => (
            <a
              key={item}
              href={`#${item
                .toLowerCase()
                .replace(" us", "")
                .replace(" ", "-")}`}
              className={`nav-link ${i === 0 ? "active" : ""}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Button
            asChild
            variant="glass"
            size="pill"
            className="hidden sm:inline-flex"
          >
            <a href="#contact">
              <CalendarDays />
              Plan Your Visit
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-ivory hover:bg-ivory/10 hover:text-gold"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gold/20 bg-navy/95 px-6 py-5 backdrop-blur-xl lg:hidden">
          {nav.map((item) => (
            <a
              onClick={() => setOpen(false)}
              key={item}
              href={`#${item
                .toLowerCase()
                .replace(" us", "")
                .replace(" ", "-")}`}
              className="block border-b border-ivory/10 py-3 text-sm text-ivory"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [muted, setMuted] = useState(false);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const openVideo = () => {
    setMuted(false);
    setVideoOpen(true);
  };

  return (
    <section
      id="home"
      className="relative min-h-[700px] overflow-hidden bg-navy lg:min-h-[760px]"
    >
      <img
        src={bg}
        width={1920}
        height={1104}
        alt="Tirumala temple gopuram at golden sunrise"
        className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
      />

      <div className="hero-shade absolute inset-0" />

      <div className="halo absolute right-[11%] top-[12%] hidden h-[460px] w-[460px] rounded-full border border-gold/45 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[700px] max-w-site items-center px-6 pb-24 pt-24 lg:min-h-[760px] lg:px-14">
        <div className="max-w-[520px] text-ivory">
          <p className="eyebrow">Welcome to</p>

          <h1 className="mt-4 font-display text-6xl font-semibold leading-[0.86] sm:text-7xl lg:text-[86px]">
            Narayana
            <br />
            Tirumala
          </h1>

          <Flower2
            className="mt-5 h-7 w-7 text-gold"
            strokeWidth={1.4}
          />

          <p className="mt-4 max-w-md font-display text-lg leading-relaxed text-ivory/90">
            A sacred journey of faith, devotion and service.
            <br />
            Connecting hearts to the divine.
          </p>

          <Button
            asChild
            variant="gold"
            size="pill"
            className="mt-7"
          >
            <a href="#services">
              Explore Our Services
              <ArrowRight />
            </a>
          </Button>

          <div className="mt-10 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="play-button hover:bg-gold/10 hover:text-gold"
              aria-label="Watch temple video"
              onClick={openVideo}
            >
              <Play className="h-4 w-4 fill-current" />
            </Button>

            <button
              type="button"
              className="cursor-pointer text-xs font-medium text-ivory"
              onClick={openVideo}
            >
              Watch Temple Video
            </button>
          </div>

          <div
            className="mt-8 flex gap-2"
            aria-label="Slide 1 of 4"
          >
            <i className="h-1.5 w-6 rounded-full bg-gold" />
            <i className="dot" />
            <i className="dot" />
            <i className="dot" />
          </div>
        </div>
      </div>

      {videoOpen && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-navy/85 p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Temple video preview"
        >
          <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-gold/45 bg-navy shadow-2xl">
            <div className="aspect-video w-full bg-black">
              <video
                ref={videoRef}
                src={aboutVideo}
                autoPlay
                loop
                muted={muted}
                playsInline
                className="h-full w-full object-contain"
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">A sacred glimpse</p>

                  <h2 className="mt-2 font-display text-3xl text-ivory">
                    The spirit of Tirumala
                  </h2>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="sound-button shrink-0 text-ivory hover:bg-gold/10 hover:text-gold"
                  aria-label={
                    muted
                      ? "Unmute temple video"
                      : "Mute temple video"
                  }
                  onClick={toggleSound}
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <p className="mt-2 text-sm leading-6 text-ivory/70">
                Take a quiet moment with the temple, the hills and the
                light of devotion.
              </p>

              <Button
                variant="gold"
                size="pill"
                className="mt-5"
                onClick={() => setVideoOpen(false)}
              >
                Close Preview
                <X />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-28 right-7 z-10 hidden flex-col items-center gap-2 text-ivory lg:flex">
        <i className="h-12 w-px bg-gold/70" />
        <i className="h-1.5 w-1.5 rounded-full bg-gold" />
      </div>

      <svg
        className="absolute -bottom-px left-0 z-20 h-24 w-full text-ivory lg:h-32"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,92 C210,2 410,54 613,80 C852,111 1089,155 1440,55 L1440,150 L0,150 Z"
        />
      </svg>
    </section>
  );
}

function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="about"
      className="relative bg-ivory pb-24 pt-8 text-navy lg:pb-28"
    >
      <div className="mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-[0.95fr_1fr_0.62fr] lg:items-center lg:gap-14 lg:px-14">
        <div className="relative mx-auto w-full max-w-[390px]">
          <div className="botanical absolute -left-8 -top-5 text-7xl text-gold/45">
            ❧
          </div>

          <video
            ref={videoRef}
            src={aboutVideo}
            autoPlay
            loop
            muted={muted}
            playsInline
            className="aspect-[4/5] w-full rounded-[48%_48%_18px_18px] border-[5px] border-gold/35 object-cover shadow-devotional"
          />

          <div className="absolute -bottom-5 left-1/2 flex w-[82%] -translate-x-1/2 items-center gap-3 rounded-lg bg-navy px-4 py-3 text-ivory shadow-xl">
            <Church className="h-8 w-8 shrink-0 text-gold" />

            <span className="min-w-0 flex-1">
              <b className="block truncate font-display text-base">
                Sri Venkateswara Swamy
              </b>

              <small className="text-[10px] text-ivory/65">
                The Divine Protector
              </small>
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="sound-button ml-auto h-8 w-8 shrink-0 text-ivory hover:bg-ivory/10 hover:text-gold"
              aria-label={
                muted
                  ? "Unmute devotional video"
                  : "Mute devotional video"
              }
              onClick={toggleSound}
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <p className="eyebrow text-gold-dark">
            About us
          </p>

          <h2 className="section-title mt-2">
            Narayana Tirumala
          </h2>

          <p className="mt-6 text-sm leading-7 text-navy/75">
            Narayana Tirumala is a spiritual and service-oriented
            initiative dedicated to spreading devotion, compassion and
            positive impact in the society. Inspired by the divine
            presence of Lord Venkateswara, we strive to bring people
            together through faith, service and values.
          </p>

          <Button
            asChild
            variant="navy"
            size="pill"
            className="mt-7"
          >
            <a href="#services">
              Learn More
              <ArrowRight />
            </a>
          </Button>
        </div>

        <div className="border-gold/30 lg:border-l lg:pl-10">
          {values.map(
            ({
              icon: Icon,
              title,
              text,
            }) => (
              <div
                key={title}
                className="flex items-center gap-4 py-3"
              >
                <Icon
                  className="h-9 w-9 shrink-0 text-gold-dark"
                  strokeWidth={1.5}
                />

                <span>
                  <b className="block font-display text-lg">
                    {title}
                  </b>

                  <small className="text-xs text-navy/65">
                    {text}
                  </small>
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   NEW LORD VISHNU SECTION
   ========================================================== */

function VishnuSection() {
  return (
    <section
      id="lord-vishnu"
      className="relative overflow-hidden bg-[#f8f1df] py-20 text-navy lg:py-28"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-site px-6 lg:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* IMAGE */}
          <Link
            to="/dashavatara"
            className="group relative mx-auto block w-full max-w-[480px]"
          >
            <div className="absolute -inset-4 rounded-[42px] border border-gold/20" />

            <div className="absolute -inset-8 rounded-[50px] border border-gold/10" />

            <div className="relative overflow-hidden rounded-[36px] border border-gold/30 bg-navy shadow-2xl">
              <img
                src={vishnuImage}
                alt="Lord Vishnu"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 text-ivory">
                <div className="mb-3 flex items-center gap-2 text-gold">
                  <Crown className="h-5 w-5" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">
                    The Preserver
                  </span>
                </div>

                <h3 className="font-display text-3xl font-semibold">
                  Lord Vishnu
                </h3>

                <p className="mt-2 text-xs leading-6 text-ivory/70">
                  Discover the sacred stories of the Dashavatara.
                </p>
              </div>
            </div>
          </Link>

          {/* CONTENT */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-white/50">
                <Flower2
                  className="h-5 w-5 text-gold-dark"
                  strokeWidth={1.5}
                />
              </span>

              <p className="eyebrow text-gold-dark">
                Divine Wisdom
              </p>
            </div>

            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Lord Vishnu
              <span className="mt-2 block text-gold-dark">
                & the Dashavatara
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-navy/70 sm:text-base sm:leading-8">
              Lord Vishnu is revered as the preserver and protector of
              cosmic order. Hindu tradition describes his divine
              manifestations appearing across different ages to restore
              dharma, protect devotees and guide the world toward
              righteousness.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-navy/70">
              The ten principal incarnations are collectively known as
              the <strong>Dashavatara</strong>. Each avatar carries a
              unique story, purpose and spiritual teaching.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-gold/20 bg-white/60 p-4">
                <Shield className="h-6 w-6 text-gold-dark" />

                <p className="mt-3 font-display text-lg font-semibold">
                  Protector
                </p>

                <p className="mt-1 text-xs leading-5 text-navy/60">
                  Guardian of dharma and cosmic balance.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/20 bg-white/60 p-4">
                <Sparkles className="h-6 w-6 text-gold-dark" />

                <p className="mt-3 font-display text-lg font-semibold">
                  Ten Avatars
                </p>

                <p className="mt-1 text-xs leading-5 text-navy/60">
                  Divine manifestations across different ages.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/20 bg-white/60 p-4">
                <BookOpen className="h-6 w-6 text-gold-dark" />

                <p className="mt-3 font-display text-lg font-semibold">
                  Sacred Stories
                </p>

                <p className="mt-1 text-xs leading-5 text-navy/60">
                  Stories carrying timeless spiritual teachings.
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="navy"
              size="pill"
              className="mt-8"
            >
              <Link to="/dashavatara">
                Explore Dashavatara
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-gold/25" />

          <Flower2
            className="h-5 w-5 text-gold-dark"
            strokeWidth={1.4}
          />

          <p className="font-display text-sm italic text-navy/60">
            Om Namo Narayanaya
          </p>

          <Flower2
            className="h-5 w-5 text-gold-dark"
            strokeWidth={1.4}
          />

          <div className="h-px flex-1 bg-gold/25" />
        </div>
      </div>
    </section>
  );
}


/* ==========================================================
   ASHTA LAKSHMI SECTION
   ========================================================== */

function AshtaLakshmiSection() {
  return (
    <section
      id="ashta-lakshmi"
      className="relative overflow-hidden bg-[#f8f1df] py-20 text-navy lg:py-28"
    >
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-site px-6 lg:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* CONTENT */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-white/60">
                <Flower2
                  className="h-5 w-5 text-gold"
                  strokeWidth={1.5}
                />
              </span>

              <p className="eyebrow text-gold">
                Divine Abundance
              </p>
            </div>

            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Goddess Lakshmi
              <span className="mt-2 block text-gold">
                & the Ashta Lakshmi
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-navy/70 sm:text-base sm:leading-8">
              Goddess Lakshmi is revered as the divine source of prosperity,
              harmony, nourishment and auspiciousness. Her blessings are
              understood in many forms, extending beyond material wealth to
              courage, knowledge, family, victory and spiritual abundance.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-navy/65">
              The <strong className="text-gold">Ashta Lakshmi</strong> are eight
              sacred manifestations of Lakshmi, each representing a distinct
              dimension of a complete and flourishing life.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-gold/20 bg-white/60 p-4">
                <Sparkles className="h-6 w-6 text-gold" />
                <p className="mt-3 font-display text-lg font-semibold">
                  Eight Forms
                </p>
                <p className="mt-1 text-xs leading-5 text-navy/60">
                  Eight expressions of divine abundance.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/20 bg-white/60 p-4">
                <Crown className="h-6 w-6 text-gold" />
                <p className="mt-3 font-display text-lg font-semibold">
                  Prosperity
                </p>
                <p className="mt-1 text-xs leading-5 text-navy/60">
                  Wealth, nourishment, harmony and success.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/20 bg-white/60 p-4">
                <BookOpen className="h-6 w-6 text-gold" />
                <p className="mt-3 font-display text-lg font-semibold">
                  Sacred Wisdom
                </p>
                <p className="mt-1 text-xs leading-5 text-navy/60">
                  Blessings with spiritual meaning for daily life.
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="navy"
              size="pill"
              className="mt-8"
            >
              <Link to="/astalashmi">
                Explore Ashta Lakshmi
                <ArrowRight />
              </Link>
            </Button>
          </div>

          {/* IMAGE */}
          <Link
            to="/astalashmi"
            className="group relative order-1 mx-auto block w-full max-w-[480px] lg:order-2"
          >
            <div className="absolute -inset-4 rounded-[42px] border border-gold/20" />
            <div className="absolute -inset-8 rounded-[50px] border border-gold/10" />

            <div className="relative overflow-hidden rounded-[36px] border border-gold/30 bg-navy shadow-2xl">
              <img
                src={lakshmiImage}
                alt="Ashta Lakshmi"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b31]/95 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="mb-3 flex items-center gap-2 text-gold">
                  <Flower2 className="h-5 w-5" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">
                    Eight Sacred Forms
                  </span>
                </div>

                <h3 className="font-display text-3xl font-semibold text-white">
                  Ashta Lakshmi
                </h3>

                <p className="mt-2 text-xs leading-6 text-white">
                  Discover the eight divine forms of prosperity, wisdom,
                  courage, nourishment and grace.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-gold/25" />

          <Flower2
            className="h-5 w-5 text-gold"
            strokeWidth={1.4}
          />

          <p className="font-display text-sm italic text-navy/60">
            Om Shreem Mahalakshmyai Namah
          </p>

          <Flower2
            className="h-5 w-5 text-gold"
            strokeWidth={1.4}
          />

          <div className="h-px flex-1 bg-gold/25" />
        </div>
      </div>
    </section>
  );
}


function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-navy py-24 text-ivory lg:py-28"
    >
      <div className="services-glow absolute inset-0" />

      <div className="relative mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-[0.66fr_1.5fr] lg:items-center lg:px-14">
        <div>
          <p className="eyebrow">Our services</p>

          <h2 className="section-title mt-2 text-ivory">
            What We Offer
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-6 text-ivory/75">
            We are committed to providing meaningful services that
            support your spiritual journey and community well-being.
          </p>

          <Button
            asChild
            variant="gold"
            size="pill"
            className="mt-7"
          >
            <a href="#contact">
              View All Services
              <ArrowRight />
            </a>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map(
            ({
              icon: Icon,
              title,
              text,
            }) => (
              <article
                key={title}
                className="service-card group"
              >
                <Icon
                  className="h-9 w-9 text-gold"
                  strokeWidth={1.5}
                />

                <h3 className="mt-4 font-display text-lg font-semibold">
                  {title}
                </h3>

                <p className="mt-1 min-h-10 text-[11px] leading-5 text-ivory/70">
                  {text}
                </p>

                <ChevronRight className="ml-auto mt-3 h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function ExperienceGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  const gallery = [
    {
      src: bg,
      alt: "Temple tower at sunrise",
    },
    {
      src: lampsImage,
      alt: "Traditional temple oil lamps",
    },
    {
      src: corridorImage,
      alt: "Carved temple corridor",
    },
    {
      src: ceremonyImage,
      alt: "Devotional temple ceremony",
    },
  ];

  const moveGallery = (direction: number) =>
    galleryRef.current?.scrollBy({
      left: direction * 235,
      behavior: "smooth",
    });

  return (
    <section
      id="gallery"
      className="relative overflow-hidden py-20 text-ivory lg:py-24"
    >
      <img
        src={hillsImage}
        width={1920}
        height={720}
        loading="lazy"
        alt="Golden sunset over the Tirumala hills"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-navy/65" />

      <div className="relative mx-auto grid max-w-site gap-10 px-6 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:px-14">
        <div>
          <p className="eyebrow">
            Experience
          </p>

          <h2 className="section-title mt-2 text-ivory">
            Divine Moments
          </h2>

          <p className="mt-4 max-w-xs font-display text-lg leading-6 text-ivory/85">
            Feel the peace, witness the beauty,
            <br />
            be a part of something greater.
          </p>

          <Button
            asChild
            variant="glass"
            size="pill"
            className="mt-6"
          >
            <a href="#gallery-photos">
              View Gallery
              <ArrowRight />
            </a>
          </Button>
        </div>

        <div
          id="gallery-photos"
          ref={galleryRef}
          className="scrollbar-hidden flex snap-x gap-3 overflow-x-auto pb-1"
        >
          {gallery.map((image) => (
            <img
              key={image.alt}
              src={image.src}
              width={900}
              height={620}
              loading="lazy"
              alt={image.alt}
              className="aspect-[4/3] w-[210px] shrink-0 snap-start rounded-lg border border-gold/35 object-cover transition-transform duration-500 hover:scale-[1.03] lg:w-[220px]"
            />
          ))}

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="glass"
              size="icon"
              aria-label="Previous image"
              onClick={() => moveGallery(-1)}
            >
              <ArrowLeft />
            </Button>

            <Button
              variant="glass"
              size="icon"
              aria-label="Next image"
              onClick={() => moveGallery(1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCTA() {
  return (
    <section className="relative overflow-hidden bg-ivory py-10 text-navy">
      <Church
        className="absolute -bottom-12 right-4 h-44 w-44 text-gold/10"
        strokeWidth={0.6}
      />

      <div className="relative mx-auto grid max-w-site gap-9 px-6 md:grid-cols-2 md:divide-x md:divide-gold/25 lg:px-14">
        <blockquote className="flex gap-5 md:pr-14">
          <span className="font-display text-7xl leading-none text-gold">
            “
          </span>

          <div>
            <p className="font-display italic leading-6 text-navy/75">
              “Narayana Tirumala has truly touched our hearts.
              <br />
              The seva, devotion and support are beyond words.”
            </p>

            <cite className="mt-3 block text-[10px] not-italic">
              — A Devotee
            </cite>
          </div>
        </blockquote>

        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center md:pl-14">
          <div>
            <h2 className="font-display text-2xl font-semibold leading-6">
              Join Our
              <br />
              Spiritual Journey
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-navy/65">
              Be a part of our mission. Get updates
              <br />
              on events, services and more.
            </p>
          </div>

          <Button
            asChild
            variant="navy"
            size="pill"
          >
            <a href="mailto:info@narayanatirumala.org?subject=Narayan%20Tirumala%20Updates">
              Get Updates
              <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-navy text-ivory"
    >
      <div className="mx-auto grid max-w-site gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_.7fr_1.15fr_.75fr_.65fr] lg:px-14">
        <Brand />

        <div>
          <h3 className="footer-title">
            Quick Links
          </h3>

          {nav.map((x) => (
            <a
              key={x}
              href={`#${x
                .toLowerCase()
                .replace(" us", "")
                .replace(" ", "-")}`}
              className="footer-link"
            >
              {x}
            </a>
          ))}
        </div>

        <div>
          <h3 className="footer-title">
            Get In Touch
          </h3>

          <p className="contact-line">
            <Phone />
            +91 98765 43210
          </p>

          <p className="contact-line">
            <Mail />
            info@narayanatirumala.org
          </p>

          <p className="contact-line">
            <MapPin />
            Tirumala, Andhra Pradesh, India
          </p>
        </div>

        <div>
          <h3 className="footer-title">
            Follow Us
          </h3>

          <div className="flex gap-3">
            {[Facebook, Instagram, Youtube, X].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#contact"
                  className="social"
                  aria-label={
                    [
                      "Facebook",
                      "Instagram",
                      "YouTube",
                      "X",
                    ][i]
                  }
                >
                  <Icon />
                </a>
              ),
            )}
          </div>
        </div>

        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 shadow-gold">
            <span className="text-4xl">
              🪔
            </span>
          </div>

          <p className="mt-3 font-display text-xs italic text-gold">
            — Om Namo Narayanaya —
          </p>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-site flex-col gap-3 px-6 py-5 text-[9px] text-ivory/55 sm:flex-row sm:justify-between lg:px-14">
          <p>
            © 2026 Narayana Tirumala. All rights reserved.
          </p>

          <p>
            Privacy Policy　 |　 Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  );
}

function NarayanaTirumala() {
  const [showIntroVideo, setShowIntroVideo] = useState(true);

  const handleIntroVideoEnd = () => {
    setShowIntroVideo(false);
  };

  return (
    <>
      {showIntroVideo && <IntroVideo onVideoEnd={handleIntroVideoEnd} />}
      <main>
        <Navbar />

        <HeroSection />

        <AboutSection />

        {/* NEW */}
        <VishnuSection />

        <AshtaLakshmiSection />

        <DynamicServicesSection />

        <DynamicGallerySection />

        <ExperienceGallery />

        <TestimonialCTA />

        <Footer />
      </main>
    </>
  );
}