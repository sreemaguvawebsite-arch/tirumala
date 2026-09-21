import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Flower2,
  Home,
  X,
  Coins,
  Wheat,
  Baby,
  Shield,
  Trophy,
  BookOpen,
  Crown,
  Sparkles,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";

// Main Ashta Lakshmi image used in the hero.
import lakshmiImage from "@/assets/lashmi.png";

// Eight individual forms.
import aadiLakshmiImage from "@/assets/aadi-lakshmi.png";
import dhanaLakshmiImage from "@/assets/dhana-lakshmi.png";
import dhanyaLakshmiImage from "@/assets/dhanya-lakshmi.png";
import gajaLakshmiImage from "@/assets/gaja-lakshmi.png";
import santanaLakshmiImage from "@/assets/santana-lakshmi.png";
import veeraLakshmiImage from "@/assets/veera-lakshmi.png";
import vijayaLakshmiImage from "@/assets/vijaya-lakshmi.png";
import vidyaLakshmiImage from "@/assets/vidya-lakshmi.png";

export const Route = createFileRoute("/astalashmi")({
  head: () => ({
    meta: [
      {
        title: "Ashta Lakshmi | Narayana Tirumala",
      },
      {
        name: "description",
        content:
          "Explore the eight sacred forms of Goddess Lakshmi and discover the blessings, symbolism and spiritual meaning associated with each form.",
      },
    ],
  }),
  component: AshtaLakshmiPage,
});

type LakshmiForm = {
  number: number;
  name: string;
  sanskritName: string;
  title: string;
  image: string;
  introduction: string;
  story: string[];
  blessing: string;
  teaching: string;
  symbols: string[];
  accent: string;
};

const forms: LakshmiForm[] = [
  {
    number: 1,
    name: "Aadi Lakshmi",
    sanskritName: "आदि लक्ष्मी",
    title: "The Primordial Lakshmi",
    image: aadiLakshmiImage,
    introduction:
      "Aadi Lakshmi is revered as the primordial and eternal form of Goddess Lakshmi, representing the divine source from which prosperity, harmony and spiritual abundance arise.",
    story: [
      "Aadi Lakshmi is understood as the ancient and original form of Lakshmi, present beyond material wealth and connected with the sustaining grace of the Divine.",
      "She represents inner strength, spiritual prosperity and the quiet abundance that supports a life rooted in faith, devotion and righteous living.",
      "Her presence reminds devotees that true abundance begins with inner completeness, gratitude and alignment with dharma.",
    ],
    blessing:
      "Spiritual abundance, peace, inner strength and divine grace.",
    teaching:
      "Prosperity is not only what we possess; it is also the peace, faith and contentment we cultivate within.",
    symbols: ["Lotus", "Blessing Mudra", "Divine Grace"],
    accent: "Primordial Grace",
  },
  {
    number: 2,
    name: "Dhana Lakshmi",
    sanskritName: "धन लक्ष्मी",
    title: "Goddess of Wealth",
    image: dhanaLakshmiImage,
    introduction:
      "Dhana Lakshmi represents material prosperity, financial stability and the resources required to support family, service and righteous responsibilities.",
    story: [
      "In this form, Lakshmi is associated with wealth that is earned, protected and used with wisdom.",
      "Her iconography commonly includes gold, auspicious vessels and symbols of abundance, reminding devotees that prosperity is a sacred responsibility rather than an end in itself.",
      "Dhana Lakshmi encourages generosity, disciplined stewardship and gratitude for the resources that sustain daily life.",
    ],
    blessing:
      "Wealth, prosperity, financial stability and generosity.",
    teaching:
      "Wealth becomes auspicious when it is earned responsibly and shared with compassion.",
    symbols: ["Gold Coins", "Kalasha", "Lotus"],
    accent: "Sacred Prosperity",
  },
  {
    number: 3,
    name: "Dhanya Lakshmi",
    sanskritName: "धान्य लक्ष्मी",
    title: "Goddess of Nourishment",
    image: dhanyaLakshmiImage,
    introduction:
      "Dhanya Lakshmi is associated with grains, food, harvest and the abundance of the Earth that nourishes every living being.",
    story: [
      "This form of Lakshmi celebrates the sacred value of food and the fertility of the land.",
      "She is often represented with grains, paddy and agricultural abundance, symbolizing the prosperity that comes from nature, effort and community.",
      "Her presence encourages respect for food, farmers, the Earth and the shared responsibility to prevent waste and hunger.",
    ],
    blessing:
      "Food, nourishment, harvest, fertility and agricultural abundance.",
    teaching:
      "Food is sacred. Gratitude and responsible use of nature's gifts are themselves forms of worship.",
    symbols: ["Paddy", "Grains", "Harvest"],
    accent: "Abundant Harvest",
  },
  {
    number: 4,
    name: "Gaja Lakshmi",
    sanskritName: "गज लक्ष्मी",
    title: "Goddess of Royal Prosperity",
    image: gajaLakshmiImage,
    introduction:
      "Gaja Lakshmi represents dignity, royal prosperity, strength and auspicious fortune. She is traditionally shown with elephants in a majestic sacred setting.",
    story: [
      "The elephants associated with Gaja Lakshmi represent strength, royal authority, fertility and auspicious rain.",
      "Her form is closely connected with abundance that brings stability, honor and flourishing to the household and community.",
      "Gaja Lakshmi teaches that true status is sustained by dignity, generosity and responsible leadership.",
    ],
    blessing:
      "Status, strength, dignity, prosperity and auspicious fortune.",
    teaching:
      "Greatness is meaningful when power is joined with humility, dignity and service.",
    symbols: ["Elephants", "Lotus", "Royal Abundance"],
    accent: "Majestic Fortune",
  },
  {
    number: 5,
    name: "Santana Lakshmi",
    sanskritName: "संतान लक्ष्मी",
    title: "Goddess of Family Blessings",
    image: santanaLakshmiImage,
    introduction:
      "Santana Lakshmi is the nurturing form of the Goddess associated with children, family well-being, continuity and loving protection.",
    story: [
      "She symbolizes the blessing of family, the care of children and the continuity of values across generations.",
      "Her maternal form celebrates patience, protection, affection and the responsibility of guiding the next generation.",
      "Devotion to Santana Lakshmi is associated with prayers for the health, harmony and flourishing of family life.",
    ],
    blessing:
      "Children, family harmony, nurturing, protection and continuity.",
    teaching:
      "A prosperous family is built through love, patience, protection and the passing on of good values.",
    symbols: ["Child", "Lotus", "Motherly Grace"],
    accent: "Family Grace",
  },
  {
    number: 6,
    name: "Veera Lakshmi",
    sanskritName: "वीर लक्ष्मी",
    title: "Goddess of Courage",
    image: veeraLakshmiImage,
    introduction:
      "Veera Lakshmi, also known as Dhairya Lakshmi, embodies courage, fortitude, confidence and the strength needed to face adversity while remaining rooted in dharma.",
    story: [
      "This powerful form of Lakshmi represents the prosperity of courage — the inner wealth that allows a person to stand firm in difficult circumstances.",
      "Her protective symbols emphasize disciplined strength, resilience and the ability to act decisively when righteousness must be defended.",
      "Veera Lakshmi reminds devotees that prosperity cannot endure without courage, self-control and moral strength.",
    ],
    blessing:
      "Courage, resilience, confidence, protection and inner strength.",
    teaching:
      "Courage is not the absence of difficulty; it is the strength to remain steady and righteous within it.",
    symbols: ["Shield", "Weapon", "Courage"],
    accent: "Fearless Strength",
  },
  {
    number: 7,
    name: "Vijaya Lakshmi",
    sanskritName: "विजय लक्ष्मी",
    title: "Goddess of Victory",
    image: vijayaLakshmiImage,
    introduction:
      "Vijaya Lakshmi represents victory, achievement and success in righteous endeavors, especially when effort is guided by discipline, patience and integrity.",
    story: [
      "Her form celebrates the successful completion of worthy efforts and the overcoming of obstacles through perseverance.",
      "Victory in this tradition is not limited to external achievement; it also includes mastery over fear, doubt, ego and distraction.",
      "Vijaya Lakshmi inspires devotees to pursue goals without abandoning humility or ethical conduct.",
    ],
    blessing:
      "Victory, success, achievement, confidence and progress.",
    teaching:
      "The highest victory is success achieved without sacrificing integrity, humility or compassion.",
    symbols: ["Victory Flag", "Lotus", "Triumph"],
    accent: "Righteous Victory",
  },
  {
    number: 8,
    name: "Vidya Lakshmi",
    sanskritName: "विद्या लक्ष्मी",
    title: "Goddess of Knowledge",
    image: vidyaLakshmiImage,
    introduction:
      "Vidya Lakshmi represents knowledge, education, wisdom, learning and the clarity required to use knowledge for a meaningful purpose.",
    story: [
      "Her form teaches that knowledge itself is a form of prosperity because it guides decisions, builds capability and illuminates the path forward.",
      "Books, sacred learning and contemplative symbols associated with Vidya Lakshmi express both worldly education and spiritual understanding.",
      "She encourages disciplined learning, curiosity, humility and the wise application of knowledge.",
    ],
    blessing:
      "Knowledge, education, wisdom, memory, clarity and understanding.",
    teaching:
      "Knowledge becomes true wisdom when it is joined with humility and used for the well-being of others.",
    symbols: ["Sacred Book", "Rosary", "Wisdom"],
    accent: "Illuminating Wisdom",
  },
];

const fadeUpItem: Variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0 },
};

const SCROLL_OPEN_HEIGHT = "min(74vh, 46rem)";

function HideScrollbarStyle() {
  return (
    <style>{`
      .scroll-hide { scrollbar-width: none; -ms-overflow-style: none; }
      .scroll-hide::-webkit-scrollbar { width: 0; height: 0; display: none; }
    `}</style>
  );
}

function ScrollRoller() {
  return (
    <div className="relative z-10 mx-1 h-6 rounded-full bg-gradient-to-b from-[#f7df9a] via-[#d0a03a] to-[#7e5b15] shadow-md sm:h-7">
      <span className="absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#f7df9a] to-[#8b6416] shadow-md sm:h-9 sm:w-9" />
      <span className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#f7df9a] to-[#8b6416] shadow-md sm:h-9 sm:w-9" />
    </div>
  );
}

function FormIcon({ number }: { number: number }) {
  const className = "h-4 w-4";

  if (number === 2) return <Coins className={className} />;
  if (number === 3) return <Wheat className={className} />;
  if (number === 5) return <Baby className={className} />;
  if (number === 6) return <Shield className={className} />;
  if (number === 7) return <Trophy className={className} />;
  if (number === 8) return <BookOpen className={className} />;
  if (number === 4) return <Crown className={className} />;

  return <Flower2 className={className} />;
}

function LakshmiScroll({
  form,
  index,
  direction,
  onClose,
  onPrevious,
  onNext,
  reduceMotion,
}: {
  form: LakshmiForm;
  index: number;
  direction: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  reduceMotion: boolean;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="scroll-hide fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 py-10 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <HideScrollbarStyle />

      <motion.div
        className="fixed inset-0 bg-navy/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${form.name} — ${form.title}`}
        className="relative z-10 my-auto w-full max-w-4xl"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close scroll"
          className="absolute -top-4 right-1 z-20 grid h-10 w-10 place-items-center rounded-full border border-gold/50 bg-navy text-gold shadow-lg transition hover:bg-gold hover:text-navy sm:-right-4 sm:-top-5"
        >
          <X className="h-5 w-5" />
        </button>

        <ScrollRoller />

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: SCROLL_OPEN_HEIGHT }}
          exit={{ height: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="scroll-hide relative -mt-1 overflow-y-auto overflow-x-hidden border-x border-gold/30 bg-gradient-to-r from-[#071b31] via-navy to-[#071b31] shadow-2xl"
        >
          <div className="pointer-events-none absolute inset-y-0 left-3 w-px bg-gold/35 sm:left-5" />
          <div className="pointer-events-none absolute inset-y-0 right-3 w-px bg-gold/35 sm:right-5" />

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`portrait-${form.name}`}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: reduceMotion ? 0 : direction >= 0 ? 26 : -26,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: reduceMotion ? 0 : 0.3,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  x: reduceMotion ? 0 : direction >= 0 ? -20 : 20,
                  transition: { duration: 0.2 },
                }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-t-full bg-gold/20 blur-2xl" />
                  <div className="h-56 w-44 overflow-hidden rounded-t-full border-2 border-gold/60 bg-navy shadow-xl sm:h-72 sm:w-56">
                    <img
                      src={form.image}
                      alt={`${form.name}, ${form.title}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <p className="mt-5 font-display text-2xl font-semibold text-ivory sm:text-3xl">
                  {form.name}
                </p>
                <p className="mt-1 font-display text-lg text-gold">
                  {form.sanskritName}
                </p>
                <p className="mt-2 text-xs text-ivory/60">
                  {form.title} · {form.accent}
                </p>
                <p className="mt-4 text-xs text-ivory/45">
                  {index + 1} of {forms.length}
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {form.symbols.map((symbol) => (
                    <span
                      key={symbol}
                      className="rounded-full border border-gold/20 bg-black/10 px-3 py-1 text-[10px] text-ivory/65"
                    >
                      {symbol}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`story-${form.name}`}
                initial="enter"
                animate="center"
                exit="exit"
                variants={{
                  enter: { opacity: 0, y: reduceMotion ? 0 : 14 },
                  center: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      staggerChildren: reduceMotion ? 0 : 0.08,
                      delayChildren: reduceMotion ? 0 : 0.35,
                    },
                  },
                  exit: {
                    opacity: 0,
                    y: reduceMotion ? 0 : -10,
                    transition: { duration: 0.2 },
                  },
                }}
              >
                <motion.h3
                  variants={fadeUpItem}
                  className="font-display text-2xl font-semibold text-ivory sm:text-3xl"
                >
                  {form.title}
                </motion.h3>

                <motion.p
                  variants={fadeUpItem}
                  className="mt-4 border-l-2 border-gold/50 pl-4 text-sm leading-7 text-ivory/80 sm:text-base"
                >
                  {form.introduction}
                </motion.p>

                <div className="mt-6 space-y-4">
                  {form.story.map((paragraph, i) => (
                    <motion.p
                      key={i}
                      variants={fadeUpItem}
                      className="text-sm leading-7 text-ivory/75"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  variants={fadeUpItem}
                  className="mt-6 rounded-2xl border border-gold/25 bg-[#fff8eb]/95 p-5"
                >
                  <p className="text-xs font-semibold text-gold-dark">
                    Blessing
                  </p>
                  <p className="mt-2 font-display text-lg leading-7 text-navy">
                    {form.blessing}
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUpItem}
                  className="mt-4 rounded-2xl bg-navy p-5 text-ivory"
                >
                  <p className="text-xs font-semibold text-gold">
                    Spiritual Teaching
                  </p>
                  <p className="mt-2 font-display text-lg leading-7 text-ivory/90">
                    {form.teaching}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="-mt-1">
          <ScrollRoller />
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous Lakshmi form"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-navy text-gold transition hover:bg-gold hover:text-navy"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <p className="min-w-[150px] text-center font-display text-sm text-ivory/80">
            {form.name}
          </p>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next Lakshmi form"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-navy text-gold transition hover:bg-gold hover:text-navy"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AshtaLakshmiPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const reduceMotion = Boolean(useReducedMotion());

  const isOpen = activeIndex !== null;

  const openForm = (index: number) => {
    setDirection(1);
    setActiveIndex(index);
  };

  const closeScroll = () => setActiveIndex(null);

  const goPrevious = () => {
    setDirection(-1);
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? forms.length - 1 : current - 1;
    });
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === forms.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeScroll();
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf4e5] text-navy">
      <header className="relative z-50 border-b border-gold/20 bg-navy text-ivory">
        <div className="mx-auto flex min-h-20 max-w-site items-center justify-between gap-4 px-5 sm:px-6 lg:px-14">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <Flower2
              className="h-9 w-9 shrink-0 text-gold"
              strokeWidth={1.4}
            />
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold">
                Narayana Tirumala
              </p>
              <p className="hidden text-[8px] tracking-[0.28em] text-ivory/55 sm:block">
                Faith · Service · Together
              </p>
            </div>
          </Link>

          <Button asChild variant="glass" size="pill">
            <Link to="/">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-navy pb-16 pt-14 text-ivory sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={lakshmiImage}
            alt=""
            className="h-full w-full object-cover object-center opacity-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/85 to-navy" />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto flex w-fit items-center gap-3 text-gold">
            <span className="h-px w-7 bg-gold/50 sm:w-12" />
            <Flower2 className="h-5 w-5" strokeWidth={1.5} />
            <p className="text-xs font-semibold tracking-[0.25em] text-gold">
              Goddess Lakshmi
            </p>
            <span className="h-px w-7 bg-gold/50 sm:w-12" />
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">
            Ashta Lakshmi
          </h1>

          <p className="mt-3 font-display text-lg italic text-gold sm:text-xl">
            The eight sacred forms of divine abundance
          </p>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ivory/65">
            Tap a form of Lakshmi to unroll its sacred scroll and explore
            the blessing, symbolism and spiritual teaching it represents.
          </p>
        </div>
      </section>

      <section className="relative bg-[#fbf4e5] py-14 sm:py-20">
        <div className="pointer-events-none absolute -right-48 top-24 h-[420px] w-[420px] rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full border border-gold/10" />

        <div className="relative mx-auto max-w-site px-5 sm:px-6 lg:px-14">
          <div className="mb-10 text-center">
            <div className="mx-auto flex w-fit items-center gap-2 text-gold-dark">
              <Sparkles className="h-4 w-4" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em]">
                Divine Blessings
              </p>
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              The Eight Forms
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4">
            {forms.map((form, index) => (
              <motion.button
                key={form.name}
                type="button"
                onClick={() => openForm(index)}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="group relative overflow-hidden rounded-t-[42px] rounded-b-xl border border-gold/25 bg-navy text-left shadow-sm transition-colors hover:border-gold/70"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={form.image}
                    alt={form.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />

                  <span className="absolute left-3 top-3 grid h-8 min-w-8 place-items-center rounded-full border border-gold/40 bg-navy/75 px-2 text-[11px] font-semibold text-gold backdrop-blur">
                    {form.number}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mb-2 flex items-center gap-2 text-gold">
                      <FormIcon number={form.number} />
                      <span className="text-[9px] uppercase tracking-[0.16em]">
                        {form.accent}
                      </span>
                    </div>

                    <p className="font-display text-lg font-semibold text-ivory">
                      {form.name}
                    </p>

                    <p className="mt-0.5 text-[11px] text-gold">
                      {form.title}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-center text-ivory">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />

        <div className="relative">
          <Flower2
            className="mx-auto h-8 w-8 text-gold"
            strokeWidth={1.4}
          />

          <p className="mt-4 font-display text-2xl italic text-gold sm:text-3xl">
            Om Shreem Mahalakshmyai Namah
          </p>

          <p className="mx-auto mt-4 max-w-md px-6 text-xs leading-6 text-ivory/55">
            May the eight forms of Lakshmi inspire abundance, knowledge,
            courage, nourishment, harmony and righteous prosperity.
          </p>

          <Button asChild variant="glass" size="pill" className="mt-7">
            <Link to="/">
              <ArrowLeft />
              Return Home
            </Link>
          </Button>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && activeIndex !== null ? (
          <LakshmiScroll
            form={forms[activeIndex]}
            index={activeIndex}
            direction={direction}
            onClose={closeScroll}
            onPrevious={goPrevious}
            onNext={goNext}
            reduceMotion={reduceMotion}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
