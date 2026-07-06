import React, { useEffect, useRef, useState } from "react";
import videoFashion from "../../../../../public/assets/video/hero_video.mp4";

const Hero = () => {
  const videoRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);

    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {});

    setMuted(false);
    setShowOverlay(false);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (muted) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    } else {
      video.muted = true;
    }

    setMuted(!muted);
  };

  return (
    <section className="relative h-[90vh] overflow-hidden md:h-screen">
      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover md:scale-[1.03]"
      >
        <source src={videoFashion} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50" />

      {/* Sound button */}
      <button
        onClick={toggleSound}
        className="absolute right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg backdrop-blur-xl transition hover:scale-110 hover:bg-white/20 md:right-6 md:top-6 md:h-14 md:w-14 md:text-2xl lg:right-8 lg:top-8"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Overlay enable sound */}
      {showOverlay && muted && (
        <div
          onClick={enableSound}
          className="absolute inset-0 z-30 flex cursor-pointer items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 px-6 py-6 text-center backdrop-blur-xl md:px-10 md:py-8">
            <div className="mb-4 text-5xl md:text-6xl">🔊</div>

            <h2 className="text-2xl font-light uppercase tracking-[0.2em] text-white md:text-3xl">
              Enable Sound
            </h2>

            <p className="mt-4 text-sm text-white/70 md:text-base">
              Click anywhere to experience the collection with sound.
            </p>

            <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-105 md:px-8 md:py-4">
              Enter Experience
            </button>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-20 flex h-full flex-col justify-center px-6 text-center sm:px-10 md:px-10 lg:flex lg:justify-between lg:px-14 lg:pt-24 lg:text-left">
        {/* HERO TEXT */}
        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-2xl">
          <span className="inline-block rounded-full border border-white/20 bg-white/15 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md lg:px-4 lg:text-xs">
            Autumn / Winter 2026
          </span>

          <h1 className="mt-5 text-[42px] font-extralight uppercase leading-[0.9] tracking-[-0.05em] text-white/70 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[110px]">
            ELEVATE
            <br />
            YOUR STYLE
          </h1>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/70 md:max-w-lg md:text-lg lg:mx-0 lg:max-w-md lg:text-base lg:leading-8">
            Contemporary silhouettes crafted with premium materials, designed
            for those who appreciate timeless elegance.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button className="w-full rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-black transition hover:scale-105 sm:w-auto lg:px-8 lg:py-4 lg:text-sm">
              Explore Collection
            </button>

            <button className="w-full rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/10 sm:w-auto lg:px-8 lg:py-4 lg:text-sm">
              Lookbook
            </button>
          </div>
        </div>

        {/* FOOTER (desktop only) */}
        <div className="hidden items-end mb-20 justify-between lg:flex">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Since 2026
            </p>
            <p className="mt-2 text-white/70">Premium Fashion House</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-white/50">Scroll</p>
            <div className="mx-auto mt-3 h-12 w-px bg-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
