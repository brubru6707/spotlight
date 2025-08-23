"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SpotlightPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const starsContainerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => cursorRef.current?.classList.add('w-8', 'h-8', 'border-white/50');
    const handleMouseLeave = () => cursorRef.current?.classList.remove('w-8', 'h-8', 'border-white/50');

    window.addEventListener('mousemove', handleMouseMove);
    const interactiveElements = document.querySelectorAll('a, button, input');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const container = starsContainerRef.current;
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.className = 'star absolute h-0.5 w-0.5 rounded-full bg-white';
      star.style.left = `${Math.random() * 120}%`;
      star.style.top = `${Math.random() * 120}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      const duration = Math.random() * 3 + 2;
      star.style.animationDuration = `${duration}s`;
      container.appendChild(star);
    }

    const createShootingStar = () => {
      if (!container) return;
      const shootingStar = document.createElement('div');
      shootingStar.className = `shooting-star absolute h-0.5 w-0.5 rounded-full bg-white opacity-0 after:content-[''] after:absolute after:top-0 after:left-0 after:h-px after:w-20 after:bg-gradient-to-r after:from-white/80 after:via-white/40 after:to-transparent after:origin-left-center after:[transform:rotate(25deg)]`;
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 50}%`;
      shootingStar.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(shootingStar);
      setTimeout(() => {
        if (shootingStar.parentElement) {
          shootingStar.remove();
        }
      }, 2000);
    };

    const intervalId = setInterval(() => {
      if (Math.random() < 0.3) createShootingStar();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes shooting {
          0% { opacity: 0; transform: translate(0, 0); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translate(-300px, 150px); }
        }
        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .star {
          animation-name: twinkle;
        }
        .shooting-star {
          animation-name: shooting;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
      <div className="font-sans bg-[radial-gradient(ellipse_at_center,_#0a0a0a_0%,_#050505_35%,_#000000_100%)] min-h-screen overflow-x-hidden cursor-default relative pb-40">
        <div ref={cursorRef} className="pointer-events-none fixed z-[9999] h-5 w-5 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-sm transition-all duration-200"></div>
        <div ref={starsContainerRef} className="pointer-events-none fixed top-0 left-0 z-10 h-full w-full"></div>
        <div className="pointer-events-none fixed bottom-0 left-0 z-20 h-[200px] w-full bg-[linear-gradient(to_top,_rgba(255,140,0,0.3)_0%,_rgba(255,100,0,0.15)_30%,_rgba(255,60,0,0.08)_60%,_transparent_100%)]"></div>

        <nav className="relative z-30 flex w-full items-center justify-between px-2 py-3 md:px-10 md:py-6">
          <Link href="/" aria-label="Home">
            <Image src="/spotlight_logo.svg" alt="Spotlight Logo" width={150} height={50} className="h-8 w-auto brightness-125 md:h-10" />
          </Link>
          <div className={`absolute top-16 right-2.5 z-50 min-w-40 flex-col gap-0 rounded-xl bg-black/95 p-2.5 shadow-lg md:relative md:top-0 md:right-0 md:z-auto md:flex md:min-w-0 md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0 md:shadow-none ${ isMenuOpen ? 'flex' : 'hidden' }`}>
            <Link href="/aboutus" className="w-full rounded-none border-none bg-none px-6 py-3.5 text-left text-lg text-white/80 no-underline transition-all duration-200 hover:bg-white/10 hover:text-white md:w-auto md:rounded-lg md:border md:border-white/10 md:bg-white/5 md:px-4 md:py-2 md:text-base md:font-medium md:hover:border-white/25">About Us</Link>
            <Link href="https://forms.fillout.com/t/mhFijdinD5us" className="w-full rounded-none border-none bg-none px-6 py-3.5 text-left text-lg text-white/80 no-underline transition-all duration-200 hover:bg-white/10 hover:text-white md:w-auto md:rounded-lg md:border md:border-white/10 md:bg-white/5 md:px-4 md:py-2 md:text-base md:font-medium md:hover:border-white/25">Partner with us</Link>
          </div>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-40 flex h-10 w-10 cursor-pointer flex-col items-center justify-center md:hidden" aria-label="Open menu" tabIndex={0}>
            <span className="my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300"></span>
            <span className="my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300"></span>
            <span className="my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300"></span>
          </div>
        </nav>

        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-10 text-center md:pb-32">
          <h1 className="mb-5 max-w-3xl text-4xl font-semibold leading-tight text-white opacity-0 fade-in-up [animation-delay:1s] md:text-6xl">
            Good things come<br /> to those <span className="font-normal italic">who wait.</span>
          </h1>
          <p className="mb-12 max-w-xl px-5 text-base font-normal leading-relaxed text-white/60 opacity-0 fade-in-up [animation-delay:1.5s] md:text-lg">
            Subscribe to be notified when we launch and get early access to something extraordinary.
          </p>
          <div className="mb-16 flex w-full justify-center opacity-0 fade-in-up [animation-delay:2s]">
            <form className="flex w-full max-w-sm flex-col rounded-xl bg-black/20 shadow-lg sm:flex-row">
              <label htmlFor="email-input" className="hidden">Email Address</label>
              <input
                type="email"
                id="email-input"
                className="flex-1 rounded-t-lg border border-white/20 bg-black/40 px-4 py-3.5 text-white backdrop-blur-lg placeholder:text-white/50 transition-all duration-300 focus:border-white/40 focus:bg-black/60 focus:outline-none sm:rounded-none sm:rounded-l-lg"
                placeholder="Your Email Address"
                required
                autoComplete="email"
              />
              <button type="submit" className="relative flex-shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-b-lg bg-white/90 px-7 py-3.5 font-medium text-black transition-all duration-300 before:absolute before:left-1/2 before:top-1/2 before:h-0 before:w-0 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white/30 before:transition-all before:duration-300 hover:-translate-y-px hover:bg-white hover:before:h-80 hover:before:w-80 sm:rounded-none sm:rounded-r-lg">
                Get Notified
              </button>
            </form>
          </div>
          <div className="mb-10 flex flex-col items-center justify-center gap-4 opacity-0 fade-in-up [animation-delay:1.8s] md:flex-row">
              <a href="#" className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white">
                  <Image src="https://img.icons8.com/ios-filled/24/ffffff/mac-os.png" alt="iOS" width={20} height={20} className="brightness-150" /> Download on iOS
              </a>
              <a href="#" className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white">
                  <Image src="https://img.icons8.com/ios-filled/24/ffffff/android-os.png" alt="Android" width={20} height={20} className="brightness-150" /> Get on Android
              </a>
          </div>
          <div className="flex flex-wrap justify-center gap-5 opacity-0 fade-in-up [animation-delay:2.2s]">
            <a href="https://www.facebook.com/spotlighttin" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white/90" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/spotlighttin" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white/90" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://whatsapp.com/channel/0029Vb6KlJo35fM2wycyow46" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white/90" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.51 3.488"/></svg>
            </a>
            <a href="https://x.com/spotlighttin" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white/90" aria-label="X (Twitter)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/spotlightappn" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white/90" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.reddit.com/r/spotlightin/" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 hover:text-white/90" aria-label="Reddit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
            </a>
          </div>
        </main>

        <footer className="absolute bottom-0 left-0 z-20 flex w-full flex-col items-center justify-center bg-black/20 py-6 text-center text-sm text-white/50 opacity-0 fade-in-up [animation-delay:2.5s]">
          <div className="flex flex-col flex-wrap items-center justify-center gap-2.5 md:flex-row md:gap-4">
            <span>Made in India. Built for the World.</span>
            <a href="#" className="text-orange-400 no-underline">Privacy Policy</a>
            <a href="#" className="text-orange-400 no-underline">Terms &amp; Conditions</a>
            <a href="#" className="flex items-center gap-1 text-orange-400 no-underline">
              <Image src="https://img.icons8.com/ios-filled/18/ffa500/mac-os.png" alt="iOS" width={18} height={18} /> iOS
            </a>
            <a href="#" className="flex items-center gap-1 text-orange-400 no-underline">
              <Image src="https://img.icons8.com/ios-filled/18/ffa500/android-os.png" alt="Android" width={18} height={18} /> Android
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SpotlightPage;