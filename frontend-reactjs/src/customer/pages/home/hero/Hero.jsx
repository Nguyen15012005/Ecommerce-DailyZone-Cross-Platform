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
      {
        threshold: 0.3,
      },
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
    <section className="relative h-screen overflow-hidden">
      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full scale-[1.03] object-cover"
      >
        <source src={videoFashion} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50" />

      {/* Nút âm thanh */}
      <button
        onClick={toggleSound}
        className="absolute right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg backdrop-blur-xl transition duration-300 hover:scale-110 hover:bg-white/20 md:right-8 md:top-8 md:h-14 md:w-14 md:text-2xl"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Overlay bật âm thanh */}
      {showOverlay && muted && (
        <div
          onClick={enableSound}
          className="absolute inset-0 z-30 flex cursor-pointer items-center justify-center bg-black/40 px-4 backdrop-blur-sm transition-all duration-500"
        >
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 px-6 py-6 text-center backdrop-blur-xl md:px-12 md:py-8">
            <div className="mb-4 text-5xl md:mb-5 md:text-6xl">🔊</div>

            <h2 className="text-2xl font-light uppercase tracking-[0.2em] text-white md:text-3xl md:tracking-[0.25em]">
              Enable Sound
            </h2>

            <p className="mt-4 text-sm text-white/70 md:text-base">
              Click anywhere to experience the collection with sound.
            </p>

            <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-105 md:mt-8 md:px-8">
              Enter Experience
            </button>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-20 flex h-full flex-col justify-between px-5 py-6 sm:px-6 md:px-14 md:py-14">
        {/* Top */}
        <div className="max-w-2xl">
          <span className="inline-block rounded-full border border-white/20 bg-white/15 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md md:px-4 md:text-xs md:tracking-[0.35em]">
            Autumn / Winter 2026
          </span>

          <h1 className="mt-6 text-4xl font-extralight uppercase leading-[0.95] tracking-[-0.04em] text-white/70 sm:text-5xl md:mt-8 md:text-7xl lg:text-[110px]">
            ELEVATE
            <br />
            YOUR STYLE
          </h1>

          <p className="mt-6 max-w-sm text-sm leading-7 text-white/70 md:mt-8 md:max-w-md md:text-base md:leading-8">
            Contemporary silhouettes crafted with premium materials, designed
            for those who appreciate timeless elegance.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-12">
            <button className="rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-black transition hover:scale-105 md:px-8 md:py-4 md:text-sm">
              Explore Collection
            </button>

            <button className="rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/10 md:px-8 md:py-4 md:text-sm">
              Lookbook
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between pt-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs md:tracking-[0.4em]">
              Since 2026
            </p>

            <p className="mt-2 text-sm text-white/70 md:text-base">
              Premium Fashion House
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/50 md:text-sm">Scroll</p>

            <div className="mx-auto mt-2 h-8 w-px bg-white/30 md:mt-3 md:h-12" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
