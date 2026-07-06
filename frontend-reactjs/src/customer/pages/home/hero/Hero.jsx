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
        className="absolute inset-0 h-full w-full object-cover scale-[1.03]"
      >
        <source src={videoFashion} type="video/mp4" />
      </video>

      {/* Overlay tối */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50" />

      {/* Nút âm thanh */}
      <button
        onClick={toggleSound}
        className="absolute right-8 top-8 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl backdrop-blur-xl transition duration-300 hover:scale-110 hover:bg-white/20"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Overlay bật âm thanh */}
      {showOverlay && muted && (
        <div
          onClick={enableSound}
          className="absolute inset-0 z-30 flex cursor-pointer items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-500"
        >
          <div className="rounded-3xl border border-white/20 bg-white/10 px-12 py-8 text-center backdrop-blur-xl">
            <div className="mb-5 text-6xl">🔊</div>

            <h2 className="text-3xl font-light uppercase tracking-[0.25em] text-white">
              Enable Sound
            </h2>

            <p className="mt-4 text-white/70">
              Click anywhere to experience the collection with sound.
            </p>

            <button className="mt-8 rounded-full bg-white px-8 py-3 font-medium text-black transition hover:scale-105">
              Enter Experience
            </button>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-20 flex h-full flex-col justify-between px-8 py-10 md:px-14 md:py-14">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white backdrop-blur-md">
            Autumn / Winter 2026
          </span>

          <h1 className="mt-8 text-5xl font-extralight uppercase leading-[0.9] tracking-[-0.05em] text-white/70 md:text-7xl lg:text-[110px]">
            ELEVATE
            <br />
            YOUR STYLE
          </h1>

          <p className="mt-8 max-w-md leading-8 text-white/70">
            Contemporary silhouettes crafted with premium materials, designed
            for those who appreciate timeless elegance.
          </p>

          <div className="mt-12 flex gap-4">
            <button className="rounded-full bg-white px-8 py-4 text-sm font-medium uppercase tracking-[0.25em] text-black transition hover:scale-105">
              Explore Collection
            </button>

            <button className="rounded-full border border-white/30 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white backdrop-blur-md transition hover:bg-white/10">
              Lookbook
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between">
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
