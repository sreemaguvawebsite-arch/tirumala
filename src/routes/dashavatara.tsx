import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Flower2,
  Home,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";

import vishnuImage from "@/assets/vishnu.jpg";
import matsyaImage from "@/assets/mashya.jpg";
import kurmaImage from "@/assets/kuruma.jpg";
import varahaImage from "@/assets/varaha.jpg";
import narasimhaImage from "@/assets/narashima.jpg";
import vamanaImage from "@/assets/vamana.jpg";
import parashuramaImage from "@/assets/parusurama.jpg";
import ramaImage from "@/assets/rama.jpg";
import krishnaImage from "@/assets/kirshna.jpg";
import buddhaImage from "@/assets/budha.jpg";
import kalkiImage from "@/assets/kalki.jpg";

export const Route = createFileRoute("/dashavatara")({
  head: () => ({
    meta: [
      {
        title: "Dashavatara of Lord Vishnu | Narayana Tirumala",
      },
      {
        name: "description",
        content:
          "Explore the ten divine avatars of Lord Vishnu and discover their sacred stories, purpose and teachings.",
      },
    ],
  }),
  component: DashavataraPage,
});

type Avatar = {
  number: number;
  name: string;
  sanskritName: string;
  age: string;
  title: string;
  image: string;
  introduction: string;
  story: string[];
  purpose: string;
  teaching: string;
};

const avatars: Avatar[] = [
  {
    number: 1,
    name: "Matsya",
    sanskritName: "मत्स्य",
    age: "Satya Yuga",
    title: "The Divine Fish",
    image: matsyaImage,
    introduction:
      "Matsya is traditionally regarded as the first avatar of Lord Vishnu. He appears in the form of a divine fish and is associated with protection, preservation of sacred knowledge and the renewal of creation.",
    story: [
      "According to Hindu tradition, King Manu once discovered a tiny fish seeking his protection. Manu compassionately placed the fish in a vessel, but the fish continued to grow rapidly. Manu moved it from the vessel to a larger body of water and eventually realized that this extraordinary being was Lord Vishnu.",
      "Lord Vishnu warned Manu that a great deluge would come upon the world. He instructed him to prepare a vessel and preserve what was necessary for life and sacred knowledge.",
      "When the waters rose, Matsya guided Manu safely through the flood. Through this divine intervention, life and spiritual wisdom were preserved for a new beginning.",
    ],
    purpose:
      "To preserve life and sacred wisdom during a period of destruction and renewal.",
    teaching:
      "Compassion, wisdom, preparedness and faith can preserve dharma through difficult times.",
  },
  {
    number: 2,
    name: "Kurma",
    sanskritName: "कूर्म",
    age: "Satya Yuga",
    title: "The Divine Tortoise",
    image: kurmaImage,
    introduction:
      "Kurma is the tortoise incarnation of Lord Vishnu. This avatar is especially associated with stability, patience and the famous churning of the cosmic ocean.",
    story: [
      "The devas and asuras sought amrita, the nectar of immortality hidden within the cosmic ocean. To obtain it, they used Mount Mandara as a churning rod and the great serpent Vasuki as the rope.",
      "As the churning began, the enormous mountain started sinking into the ocean because there was no stable foundation beneath it.",
      "Lord Vishnu assumed the form of the gigantic tortoise Kurma and supported the mountain upon his back. With that foundation, the churning could continue and many divine treasures eventually emerged from the ocean.",
    ],
    purpose:
      "To provide the stable foundation required for the cosmic churning and restoration of balance.",
    teaching:
      "Great achievements require patience and a strong foundation. Stability often supports transformation even when it remains unseen.",
  },
  {
    number: 3,
    name: "Varaha",
    sanskritName: "वराह",
    age: "Satya Yuga",
    title: "The Divine Boar",
    image: varahaImage,
    introduction:
      "Varaha is Lord Vishnu's boar incarnation and is remembered for rescuing Bhudevi, the Earth, from the depths of the cosmic waters.",
    story: [
      "The powerful asura Hiranyaksha caused great disturbance in the universe and carried the Earth into the cosmic depths.",
      "To restore creation, Lord Vishnu appeared as Varaha, a mighty divine boar. He entered the cosmic waters and confronted Hiranyaksha.",
      "After defeating the destructive force threatening creation, Varaha raised the Earth and restored her to her rightful position.",
    ],
    purpose:
      "To rescue the Earth and restore cosmic order when creation itself was endangered.",
    teaching:
      "Divine protection extends to the Earth itself. Strength becomes sacred when it is used for protection and restoration.",
  },
  {
    number: 4,
    name: "Narasimha",
    sanskritName: "नरसिंह",
    age: "Satya Yuga",
    title: "The Man-Lion",
    image: narasimhaImage,
    introduction:
      "Narasimha is the powerful man-lion incarnation of Lord Vishnu, appearing to protect the devoted Prahlada and uphold dharma.",
    story: [
      "Prahlada remained deeply devoted to Lord Vishnu despite opposition from his father, Hiranyakashipu.",
      "Hiranyakashipu believed unusual protections granted to him made him impossible to defeat. He challenged Prahlada's belief that Vishnu was present everywhere.",
      "Lord Vishnu manifested as Narasimha, neither fully human nor fully animal, and protected Prahlada while overcoming the conditions that made Hiranyakashipu believe himself invincible.",
    ],
    purpose:
      "To protect a sincere devotee and demonstrate that arrogance cannot permanently overcome dharma.",
    teaching:
      "True devotion can remain firm in difficult circumstances, and divine justice is not limited by ordinary expectations.",
  },
  {
    number: 5,
    name: "Vamana",
    sanskritName: "वामन",
    age: "Treta Yuga",
    title: "The Divine Dwarf",
    image: vamanaImage,
    introduction:
      "Vamana is the dwarf Brahmin incarnation of Lord Vishnu. His story demonstrates humility, divine wisdom and the limits of worldly power.",
    story: [
      "King Bali became an influential and generous ruler whose power extended across the worlds.",
      "Lord Vishnu appeared before him as the young Brahmin Vamana and requested only as much land as could be covered in three steps.",
      "Bali agreed. Vamana then revealed his cosmic form. With his steps he encompassed the realms, demonstrating that all creation ultimately belongs to the divine.",
    ],
    purpose:
      "To restore cosmic balance through wisdom rather than ordinary force.",
    teaching:
      "Humility may conceal extraordinary strength. Material possession becomes meaningful when joined with integrity and surrender.",
  },
  {
    number: 6,
    name: "Parashurama",
    sanskritName: "परशुराम",
    age: "Treta Yuga",
    title: "The Warrior Sage",
    image: parashuramaImage,
    introduction:
      "Parashurama is portrayed as both a warrior and a sage. He represents disciplined strength used in defense of dharma.",
    story: [
      "Parashurama was born into the family of the sage Jamadagni and was known for intense discipline and devotion.",
      "Traditional accounts describe an age in which rulers increasingly misused their authority. Parashurama confronted those who abandoned righteous conduct.",
      "His life became associated with restoring balance between worldly power, spiritual discipline and responsibility.",
    ],
    purpose: "To challenge misuse of authority and restore respect for dharma.",
    teaching:
      "Power must remain accountable to righteousness. Strength without discipline can become destructive.",
  },
  {
    number: 7,
    name: "Rama",
    sanskritName: "राम",
    age: "Treta Yuga",
    title: "Maryada Purushottama",
    image: ramaImage,
    introduction:
      "Lord Rama is one of the most revered incarnations of Vishnu and the central figure of the Ramayana. He represents righteousness, duty, courage and noble conduct.",
    story: [
      "Rama was born as the prince of Ayodhya and was celebrated for his character, wisdom and devotion to dharma.",
      "He accepted exile and spent many years in the forest with Sita and Lakshmana. During this period, Sita was taken to Lanka by Ravana.",
      "With the support of Hanuman, Sugriva and the Vanara forces, Rama journeyed to Lanka, defeated Ravana and rescued Sita.",
      "His return to Ayodhya symbolizes the restoration of righteous order and the triumph of dharma.",
    ],
    purpose: "To demonstrate righteous leadership and confront forces that violated dharma.",
    teaching:
      "Duty, integrity, loyalty and self-control remain important even when the righteous path is personally difficult.",
  },
  {
    number: 8,
    name: "Krishna",
    sanskritName: "कृष्ण",
    age: "Dvapara Yuga",
    title: "The Divine Guide",
    image: krishnaImage,
    introduction:
      "Lord Krishna is among the most beloved manifestations of Vishnu. His life includes stories of divine childhood, friendship, devotion, leadership and the teachings of the Bhagavad Gita.",
    story: [
      "Krishna was born during a time of oppression and was raised in the pastoral community of Gokul and Vrindavan.",
      "Stories of his childhood celebrate his divine nature, his love for devotees and his protection of the community.",
      "Later, Krishna played a central role in the events surrounding the Mahabharata.",
      "On the battlefield of Kurukshetra, he became Arjuna's charioteer and spiritual guide. Their dialogue forms the Bhagavad Gita, which explores duty, devotion, knowledge, action and liberation.",
    ],
    purpose: "To guide humanity toward dharma and reveal profound spiritual wisdom.",
    teaching:
      "Perform righteous action without selfish attachment, cultivate devotion and recognize the divine presence underlying life.",
  },
  {
    number: 9,
    name: "Buddha",
    sanskritName: "बुद्ध",
    age: "Kali Yuga Tradition",
    title: "The Enlightened Teacher",
    image: buddhaImage,
    introduction:
      "In several Hindu traditions, Buddha is included among the Dashavatara of Vishnu and is associated with compassion, wisdom and spiritual reflection.",
    story: [
      "Buddha is remembered as a teacher who emphasized insight into suffering, ethical conduct, compassion and disciplined spiritual practice.",
      "Within traditions that identify Buddha as an avatar of Vishnu, his appearance is interpreted as part of a divine movement toward compassion and spiritual understanding.",
      "Different Hindu texts and regional traditions describe this avatar in different ways, but compassion and wisdom remain central themes.",
    ],
    purpose:
      "In traditions that include Buddha in the Dashavatara, this avatar is associated with guiding beings toward compassion and deeper spiritual understanding.",
    teaching: "Compassion, awareness and wisdom can transform how human beings respond to suffering.",
  },
  {
    number: 10,
    name: "Kalki",
    sanskritName: "कल्कि",
    age: "End of Kali Yuga",
    title: "The Future Avatar",
    image: kalkiImage,
    introduction:
      "Kalki is traditionally described as the future tenth avatar of Lord Vishnu, expected to appear at the conclusion of Kali Yuga.",
    story: [
      "Hindu tradition describes time as moving through great cycles or yugas. Kali Yuga is portrayed as an age in which dharma gradually declines.",
      "At the conclusion of this age, Kalki is described as appearing to bring the cycle of decline to an end.",
      "The appearance of Kalki represents purification, restoration and the beginning of a renewed age in which dharma again flourishes.",
    ],
    purpose: "To restore dharma at the completion of the present cosmic age and prepare creation for renewal.",
    teaching:
      "Decline is not the final state of existence. Hindu cyclical time presents destruction and renewal as parts of a larger cosmic process.",
  },
];

// Shared stagger-in treatment for the paragraphs inside the open scroll.
const fadeUpItem: Variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0 },
};

// Height the parchment unrolls to. A single source of truth so the
// grow animation and the scrollable content area always agree.
const SCROLL_OPEN_HEIGHT = "min(74vh, 46rem)";

// Hides the native scrollbar (all browsers) while keeping the element
// scrollable — applied to anything inside the scroll that may overflow.
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
    <div className="relative z-10 mx-1 h-6 rounded-full bg-gradient-to-b from-[#f2d98a] via-[#c9962d] to-[#8a6415] shadow-md sm:h-7">
      <span className="absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#f2d98a] to-[#8a6415] shadow-md sm:h-9 sm:w-9" />
      <span className="absolute -right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#f2d98a] to-[#8a6415] shadow-md sm:h-9 sm:w-9" />
    </div>
  );
}

function AvatarScroll({
  avatar,
  index,
  direction,
  onClose,
  onPrevious,
  onNext,
  reduceMotion,
}: {
  avatar: Avatar;
  index: number;
  direction: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  reduceMotion: boolean;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close control as soon as the scroll mounts, for keyboard users.
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
        className="fixed inset-0 bg-navy/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${avatar.name} — ${avatar.title}`}
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

        {/* Parchment body: this element itself grows from 0 to its open
            height every time the scroll mounts (avatar click) and shrinks
            back to 0 on close — the actual "unrolling". Previous/Next never
            remounts this element, only the content keyed below, so moving
            between avatars just cross-fades instead of re-unrolling. */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: SCROLL_OPEN_HEIGHT }}
          exit={{ height: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="scroll-hide relative -mt-1 overflow-y-auto overflow-x-hidden border-x border-gold/30 bg-gradient-to-r from-[#4a0f14] via-[#9c2029] to-[#4a0f14] shadow-2xl"
        >
          <div className="pointer-events-none absolute inset-y-0 left-3 w-px bg-gold/40 sm:left-5" />
          <div className="pointer-events-none absolute inset-y-0 right-3 w-px bg-gold/40 sm:right-5" />

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            {/* Left: avatar portrait */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`portrait-${avatar.name}`}
                custom={direction}
                initial={{ opacity: 0, x: reduceMotion ? 0 : direction >= 0 ? 26 : -26 }}
                animate={{ opacity: 1, x: 0, transition: { delay: reduceMotion ? 0 : 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, x: reduceMotion ? 0 : direction >= 0 ? -20 : 20, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-t-full bg-gold/15 blur-2xl" />
                  <div className="h-56 w-44 overflow-hidden rounded-t-full border-2 border-gold/60 bg-navy shadow-xl sm:h-72 sm:w-56">
                    <img
                      src={avatar.image}
                      alt={`${avatar.name}, ${avatar.title}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <p className="mt-5 font-display text-2xl font-semibold text-ivory sm:text-3xl">
                  {avatar.name}
                </p>
                <p className="mt-1 font-display text-lg text-gold">{avatar.sanskritName}</p>
                <p className="mt-2 text-xs text-ivory/60">
                  {avatar.age} · {avatar.title}
                </p>
                <p className="mt-4 text-xs text-ivory/45">
                  {index + 1} of {avatars.length}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Right: story */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`story-${avatar.name}`}
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
                  exit: { opacity: 0, y: reduceMotion ? 0 : -10, transition: { duration: 0.2 } },
                }}
              >
                <motion.h3
                  variants={fadeUpItem}
                  className="font-display text-2xl font-semibold text-ivory sm:text-3xl"
                >
                  {avatar.title}
                </motion.h3>

                <motion.p
                  variants={fadeUpItem}
                  className="mt-4 border-l-2 border-gold/50 pl-4 text-sm leading-7 text-ivory/80 sm:text-base"
                >
                  {avatar.introduction}
                </motion.p>

                <div className="mt-6 space-y-4">
                  {avatar.story.map((paragraph, i) => (
                    <motion.p key={i} variants={fadeUpItem} className="text-sm leading-7 text-ivory/75">
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  variants={fadeUpItem}
                  className="mt-6 rounded-2xl border border-gold/25 bg-[#f8f2e4]/95 p-5"
                >
                  <p className="text-xs font-semibold text-gold-dark">Purpose</p>
                  <p className="mt-2 font-display text-lg leading-7 text-navy">{avatar.purpose}</p>
                </motion.div>

                <motion.div variants={fadeUpItem} className="mt-4 rounded-2xl bg-navy p-5 text-ivory">
                  <p className="text-xs font-semibold text-gold">Teaching</p>
                  <p className="mt-2 font-display text-lg leading-7 text-ivory/90">{avatar.teaching}</p>
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
            aria-label="Previous avatar"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-navy text-gold transition hover:bg-gold hover:text-navy"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <p className="font-display text-sm text-ivory/80">{avatar.name}</p>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next avatar"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-navy text-gold transition hover:bg-gold hover:text-navy"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DashavataraPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const reduceMotion = Boolean(useReducedMotion());

  const isOpen = activeIndex !== null;

  const openAvatar = (index: number) => {
    setDirection(1);
    setActiveIndex(index);
  };

  const closeScroll = () => setActiveIndex(null);

  const goPrevious = () => {
    setDirection(-1);
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? avatars.length - 1 : current - 1;
    });
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === avatars.length - 1 ? 0 : current + 1;
    });
  };

  // Lock page scroll while the scroll is open.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Keyboard controls while the scroll is open.
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
    <main className="min-h-screen overflow-x-hidden bg-[#f8f2e4] text-navy">
      {/* HEADER */}
      <header className="relative z-50 border-b border-gold/20 bg-navy text-ivory">
        <div className="mx-auto flex min-h-20 max-w-site items-center justify-between gap-4 px-5 sm:px-6 lg:px-14">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <Flower2 className="h-9 w-9 shrink-0 text-gold" strokeWidth={1.4} />
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold">Narayana Tirumala</p>
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

      {/* HERO — grounded in the subject: Vishnu's own image, not a generic pattern */}
      <section className="relative overflow-hidden bg-navy pb-16 pt-14 text-ivory sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={vishnuImage}
            alt=""
            className="h-full w-full object-cover object-top opacity-[0.16]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/85 to-navy" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto flex w-fit items-center gap-3 text-gold">
            <span className="h-px w-7 bg-gold/50 sm:w-12" />
            <Flower2 className="h-5 w-5" strokeWidth={1.5} />
            <p className="text-xs font-semibold tracking-[0.25em] text-gold">Lord Vishnu</p>
            <span className="h-px w-7 bg-gold/50 sm:w-12" />
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">Dashavatara</h1>
          <p className="mt-3 font-display text-lg italic text-gold sm:text-xl">
            The ten divine incarnations
          </p>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-ivory/60">
            Tap an avatar to unroll its scroll and read the story, purpose and teaching it
            carries.
          </p>
        </div>
      </section>

      {/* AVATAR GALLERY — the one interactive surface on the page */}
      <section className="relative bg-[#f8f2e4] py-14 sm:py-20">
        <div className="pointer-events-none absolute -right-48 top-24 h-[420px] w-[420px] rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full border border-gold/10" />

        <div className="relative mx-auto max-w-site px-5 sm:px-6 lg:px-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-5">
            {avatars.map((avatar, index) => (
              <motion.button
                key={avatar.name}
                type="button"
                onClick={() => openAvatar(index)}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="group relative overflow-hidden rounded-t-[42px] rounded-b-xl border border-gold/25 bg-navy text-left shadow-sm transition-colors hover:border-gold/70"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
                  <span className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-gold/40 bg-navy/70 text-[11px] font-semibold text-gold backdrop-blur">
                    {avatar.number}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-display text-lg font-semibold text-ivory">{avatar.name}</p>
                    <p className="mt-0.5 text-[11px] text-gold">{avatar.title}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* END */}
      <section className="relative overflow-hidden bg-navy py-16 text-center text-ivory">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />
        <div className="relative">
          <Flower2 className="mx-auto h-8 w-8 text-gold" strokeWidth={1.4} />
          <p className="mt-4 font-display text-2xl italic text-gold sm:text-3xl">Om Namo Narayanaya</p>
          <p className="mx-auto mt-4 max-w-md px-6 text-xs leading-6 text-ivory/55">
            May the stories of the divine avatars inspire devotion, wisdom and righteous action.
          </p>
          <Button asChild variant="glass" size="pill" className="mt-7">
            <Link to="/">
              <ArrowLeft />
              Return Home
            </Link>
          </Button>
        </div>
      </section>

      {/* SCROLL OVERLAY */}
      <AnimatePresence>
        {isOpen && activeIndex !== null ? (
          <AvatarScroll
            avatar={avatars[activeIndex]}
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