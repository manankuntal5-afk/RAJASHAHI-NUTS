import React, { useState, useEffect } from 'react';
import { GALLERY_IMAGES } from '../data/productData';
import { GalleryImage } from '../types';
import { RecreatedPoster } from './RecreatedPoster';
import { ChevronLeft, ChevronRight, Maximize2, X, ShieldCheck, Sparkles } from 'lucide-react';
import mainPosterImage from '../assets/images/regenerated_image_1788437822458.webp';

interface GallerySectionProps {
  onOrderClick: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOrderClick }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  const currentImage: GalleryImage = GALLERY_IMAGES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setIsZoomOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-[#071912] border border-[#c59b27]/40 rounded-3xl p-4 sm:p-6 shadow-2xl">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#c59b27]/20">
        <div className="flex items-center gap-2">
          <span className="bg-[#0e3b26] text-[#fae69e] text-xs font-bold px-3 py-1 rounded-full border border-[#c59b27]/40 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#f5d061]" />
            <span>Product Photo Gallery ({currentIndex + 1} of {GALLERY_IMAGES.length})</span>
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-[#6ee7b7] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
          <span>100% Real Product Photos</span>
        </div>
      </div>

      {/* Main Showcase Stage (Single Photo Display with side arrows) */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#040e0a] border-2 border-[#c59b27]/40 shadow-xl group">
        {/* If Slide 0: Display the Official 4 KG Combo Main Product Image */}
        {currentIndex === 0 ? (
          <div className="relative w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0a271c] via-[#061811] to-[#040e0a] min-h-[480px] p-2 sm:p-5">
            <div className="relative w-full max-w-md mx-auto flex items-center justify-center">
              <img
                src={mainPosterImage}
                alt="Rajshahi Nuts 4 KG Combo Pack Official Product Poster"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[520px] object-contain rounded-2xl drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:drop-shadow-[0_25px_50px_rgba(223,186,93,0.35)] transition-all duration-300 hover:scale-[1.01] select-none cursor-pointer filter contrast-[1.02]"
                onClick={() => setIsZoomOpen(true)}
              />
            </div>

            {/* Quick Action under Main Image */}
            <div className="w-full max-w-md mx-auto mt-3 flex items-center gap-2">
              <button
                id="main-poster-order-btn"
                onClick={onOrderClick}
                className="cursor-pointer flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#dfba5d] via-[#f7e089] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#072417] font-cinzel text-base sm:text-lg font-black tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 uppercase"
              >
                <Sparkles className="w-5 h-5 text-[#072417]" />
                <span>ORDER NOW @ ₹265 ONLY</span>
              </button>
            </div>

            {/* Zoom / Fullscreen Button */}
            <button
              onClick={() => setIsZoomOpen(true)}
              aria-label="Zoom Official Product Poster"
              className="cursor-pointer absolute top-3 right-3 bg-black/75 hover:bg-[#c59b27] hover:text-[#0a1f16] text-[#fae69e] p-2.5 rounded-xl border border-[#c59b27]/40 transition-all shadow-md z-10"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Slides 1-4: Uploaded Product Pouch Visuals of Badam, Kaju, Pista, Kishmish */
          <div className="relative aspect-square sm:aspect-4/3 max-h-[540px] w-full flex items-center justify-center bg-gradient-to-b from-[#072217] via-[#04150e] to-[#020b07] min-h-[380px] sm:min-h-[460px] p-4 sm:p-6 overflow-hidden">
            <img
              src={currentImage.url}
              alt={currentImage.title}
              referrerPolicy="no-referrer"
              onClick={() => setIsZoomOpen(true)}
              className="w-full h-full max-h-[480px] sm:max-h-[520px] object-contain transition-all duration-300 select-none rounded-2xl drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:drop-shadow-[0_25px_50px_rgba(223,186,93,0.35)] cursor-pointer hover:scale-[1.02] filter contrast-[1.03]"
            />

            {/* Top-Left Floating Badge: completely unobstructed view of the product */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 bg-[#061c12]/90 backdrop-blur-md text-[#fae69e] text-xs font-bold px-3 py-1 rounded-full border border-[#dfba5d]/60 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#dfba5d]" />
                <span>1 KG {currentImage.displayName || currentImage.category} • 100% Pure</span>
              </span>
            </div>

            {/* Subtle clean bottom caption */}
            <div className="absolute bottom-3 sm:bottom-4 inset-x-4 flex items-center justify-between pointer-events-none z-10 px-2">
              <div className="bg-[#05170f]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-md">
                <h3 className="font-cinzel text-sm sm:text-base font-black text-white capitalize">
                  {currentImage.displayName ? `1 KG ${currentImage.displayName}` : currentImage.title}
                </h3>
              </div>
              <span className="hidden sm:inline-block bg-[#05170f]/85 backdrop-blur-md text-[11px] text-[#e2d9c8] px-2.5 py-1 rounded-lg border border-white/10">
                Click to Zoom
              </span>
            </div>

            {/* Zoom / Fullscreen Button */}
            <button
              onClick={() => setIsZoomOpen(true)}
              aria-label="Zoom Photo"
              className="cursor-pointer absolute top-3 right-3 bg-black/70 hover:bg-[#c59b27] hover:text-[#0a1f16] text-[#fae69e] p-2.5 rounded-xl border border-[#c59b27]/40 transition-all shadow-md z-10"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Side Click Navigation Arrows (Left & Right) */}
        <button
          id="gallery-prev-btn"
          onClick={handlePrev}
          aria-label="Previous Photo"
          className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-[#dfba5d] text-white hover:text-[#081e14] flex items-center justify-center border-2 border-[#dfba5d]/60 transition-all active:scale-95 shadow-2xl z-20"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          id="gallery-next-btn"
          onClick={handleNext}
          aria-label="Next Photo"
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-[#dfba5d] text-white hover:text-[#081e14] flex items-center justify-center border-2 border-[#dfba5d]/60 transition-all active:scale-95 shadow-2xl z-20"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Top Floating Counter Badge */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#fae69e] text-xs font-bold px-3 py-1 rounded-full border border-[#c59b27]/50 shadow-md z-10">
          {currentIndex + 1} / {GALLERY_IMAGES.length}
        </div>
      </div>

      {/* Exactly 5 Thumbnail Preview Buttons Strip */}
      <div className="mt-4">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {GALLERY_IMAGES.map((img, idx) => {
            const isActive = currentIndex === idx;
            // For index 0, user requested to replace image with the website logo
            const thumbImage = idx === 0 ? (img.thumbnailUrl || '/logo.svg') : img.url;
            // The label under each: for index 0 'Main Poster', for others 'badam', 'kaju', 'pista', 'kishmish'
            const labelText = idx === 0 ? 'Main Poster' : (img.displayName || img.category);

            return (
              <button
                key={img.id}
                id={`gallery-thumb-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`cursor-pointer group relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                  isActive
                    ? 'border-[#dfba5d] ring-2 ring-[#dfba5d]/70 scale-105 shadow-lg shadow-[#dfba5d]/30 bg-[#0e3b26]'
                    : 'border-white/15 opacity-80 hover:opacity-100 hover:border-[#dfba5d]/60 bg-[#05160f]'
                }`}
              >
                <img
                  src={thumbImage}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full ${
                    idx === 0
                      ? 'object-contain p-2 bg-[#061d13]'
                      : 'object-contain p-1 sm:p-1.5 bg-[#061d13]'
                  } rounded-lg group-hover:scale-105 transition-transform drop-shadow`}
                />

                {/* Thumbnail Subtitle Label: exact name requested */}
                <div className="absolute bottom-0 inset-x-0 bg-black/95 py-0.5 px-1 text-[10px] sm:text-xs text-center font-bold text-[#fae69e] truncate">
                  {labelText}
                </div>

                {/* Active Indicator dot */}
                {isActive && (
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#10b981] ring-1.5 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Photo Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button
              onClick={() => setIsZoomOpen(false)}
              className="cursor-pointer absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={currentIndex === 0 ? mainPosterImage : currentImage.url}
              alt={currentImage.title}
              referrerPolicy="no-referrer"
              className="max-h-[78vh] w-auto object-contain rounded-2xl border-2 border-[#dfba5d] shadow-2xl bg-[#082218]"
            />

            <div className="text-center mt-4">
              <h3 className="text-xl font-bold text-[#fae69e] font-cinzel">{currentImage.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{currentImage.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
