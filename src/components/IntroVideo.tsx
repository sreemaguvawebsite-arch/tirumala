import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import introVideo from "@/assets/dji_fly_20260917_121328_0_1789638469170_video_cache_2x.mp4";

interface IntroVideoProps {
  onVideoEnd?: () => void;
}

export default function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(6.67); // 20 seconds at 3x speed = 6.67 seconds real time
  const [opacity, setOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set playback rate to 3x
    video.playbackRate = 3;
    
    // Auto-play the video
    video.play().catch(console.error);

    // Keyboard event listener for ESC key
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === ' ' || event.key === 'Enter') {
        handleVideoEnd();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Start fade out at 5.67 seconds (1 second before end)
    fadeTimeoutRef.current = setTimeout(() => {
      // Fade out over 1 second
      const fadeInterval = setInterval(() => {
        setOpacity(prev => {
          if (prev <= 0) {
            clearInterval(fadeInterval);
            return 0;
          }
          return prev - 0.05; // Fade out in 20 steps over 1 second
        });
      }, 50);
    }, 5670);

    // Set up timer for 6.67 seconds (20 seconds of content at 3x speed)
    timeoutRef.current = setTimeout(() => {
      handleVideoEnd();
    }, 6670);

    // Update countdown timer every 100ms for smoother animation
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    onVideoEnd?.();
  };

  const handleSkip = () => {
    handleVideoEnd();
  };

  if (!isPlaying) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000"
      style={{ opacity }}
    >
      {/* Responsive Video Container */}
      <div className="relative h-full w-full overflow-hidden">
        <video
          ref={videoRef}
          src={introVideo}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          onEnded={handleVideoEnd}
        />
        
        {/* Skip button - Responsive positioning */}
        <button
          onClick={handleSkip}
          className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-white backdrop-blur-sm transition-all hover:bg-black/80 sm:right-6 sm:top-6 sm:px-4 sm:py-2"
          aria-label="Skip intro video"
        >
          <span className="text-xs sm:text-sm">
            Skip ({Math.ceil(timeLeft)}s)
          </span>
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>

        {/* Progress bar - Responsive height */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50 sm:h-1.5">
          <div
            className="h-full bg-gradient-to-r from-gold to-yellow-400 transition-all duration-100 ease-linear"
            style={{ width: `${((6.67 - timeLeft) / 6.67) * 100}%` }}
          />
        </div>

        {/* Mobile-specific overlay for better touch interaction */}
        <div 
          className="absolute inset-0 md:hidden"
          onClick={handleSkip}
          aria-label="Tap to skip video"
        />

        {/* Desktop-only: Subtle skip hint */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform text-center md:block">
          <p className="text-xs text-white/60">
            Press ESC, SPACE or click anywhere to skip
          </p>
        </div>
      </div>
    </div>
  );
}