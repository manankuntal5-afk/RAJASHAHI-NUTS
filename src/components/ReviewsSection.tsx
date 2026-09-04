import React, { useState, useId } from 'react';
import { REVIEWS_DATA } from '../data/productData';
import {
  Star,
  CheckCircle,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const REVIEWS_PER_PAGE = 4;
const TOTAL_VERIFIED_REVIEWS = 7894;

const ReviewAvatar: React.FC<{ name: string; avatar: string }> = ({ name, avatar }) => {
  const [hasError, setHasError] = useState(false);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const colorVariants = [
    'from-[#c59b27] to-[#8d6910]',
    'from-[#10b981] to-[#047857]',
    'from-[#0ea5e9] to-[#0369a1]',
    'from-[#f59e0b] to-[#b45309]',
    'from-[#8b5cf6] to-[#6d28d9]',
    'from-[#ec4899] to-[#be185d]'
  ];

  const colorIndex = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % colorVariants.length;

  if (hasError) {
    return (
      <div
        className={`w-11 h-11 rounded-full bg-gradient-to-br ${colorVariants[colorIndex]} text-white font-bold text-sm flex items-center justify-center border-2 border-[#dfba5d] shrink-0 shadow-md`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={avatar}
      alt={name}
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
      className="w-11 h-11 rounded-full object-cover border-2 border-[#dfba5d] shrink-0 bg-[#0e3b26]"
    />
  );
};

export const ReviewsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalReviews = TOTAL_VERIFIED_REVIEWS;
  const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);
  const jumpInputId = useId();

  const startIndex = currentPage * REVIEWS_PER_PAGE;
  const endIndex = Math.min(startIndex + REVIEWS_PER_PAGE, totalReviews);
  const currentReviews = React.useMemo(() => {
    const list = [];
    for (let i = startIndex; i < endIndex; i++) {
      const base = REVIEWS_DATA[i % REVIEWS_DATA.length];
      list.push({
        ...base,
        id: `rev-${i + 1}`
      });
    }
    return list;
  }, [startIndex, endIndex]);

  const jumpPageOptions = React.useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => (
      <option key={i} value={i}>
        Page {i + 1} (Reviews {(i * 4 + 1).toLocaleString('en-IN')}–{Math.min((i + 1) * 4, totalReviews).toLocaleString('en-IN')})
      </option>
    ));
  }, [totalPages, totalReviews]);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : 0));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : totalPages - 1));
  };

  const handlePageSelect = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  // Generate pagination page numbers to show
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);

      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);

      if (start > 1) {
        pages.push('dots-1');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 2) {
        pages.push('dots-2');
      }

      pages.push(totalPages - 1);
    }
    return pages;
  };

  return (
    <section className="my-12 w-full" id="reviews-section">
      {/* Header with Title and Overall Rating */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 bg-[#0e3b26] border border-[#c59b27]/60 text-[#fae69e] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
          <Star className="w-3.5 h-3.5 fill-[#f5d061] text-[#f5d061]" />
          <span>Real Customer Feedback & Reviews</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#fae69e] font-black">
          Trusted by 14,000+ Happy Families Across India
        </h2>

        {/* 4.9 Rating Line */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-sm text-[#d8cfbe]">
          <div className="flex items-center text-[#f5d061]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#f5d061]" />
            ))}
          </div>
          <span className="font-bold text-white text-base">4.9 / 5.0 Star Rating</span>
          <span>•</span>
          <span className="text-[#fae69e] font-semibold">{totalReviews.toLocaleString('en-IN')} Verified Reviews</span>
          <span>•</span>
          <span className="text-[#10b981] font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> 100% Verified Buyers
          </span>
        </div>

        {/* Page Number Indicator Running right beneath the Rating as requested */}
        <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-[#072417] border border-[#c59b27]/40 px-4 py-2 rounded-full shadow-lg">
          <div className="flex items-center gap-1 text-xs text-[#fae69e] font-bold">
            <Users className="w-3.5 h-3.5 text-[#dfba5d]" />
            <span>
              Page <span className="text-white text-sm font-black">{(currentPage + 1).toLocaleString('en-IN')}</span> of{' '}
              <span className="text-[#f5d061]">{totalPages.toLocaleString('en-IN')}</span>
            </span>
          </div>

          <span className="text-white/30">•</span>

          <span className="text-xs text-gray-300">
            Showing Reviews <span className="text-white font-semibold">{(startIndex + 1).toLocaleString('en-IN')}–{endIndex.toLocaleString('en-IN')}</span> of{' '}
            <span className="text-[#f5d061] font-semibold">{totalReviews.toLocaleString('en-IN')}</span>
          </span>

          <span className="text-white/30 hidden sm:inline">•</span>

          {/* Quick inline navigation buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevPage}
              title="Previous 4 Reviews"
              className="p-1 rounded-full bg-[#0d3824] hover:bg-[#134e32] text-[#fae69e] transition-colors border border-[#c59b27]/30 flex items-center justify-center"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextPage}
              title="Next 4 Reviews"
              className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#dfba5d] to-[#c59b27] hover:brightness-110 text-[#072417] font-bold text-xs transition-all shadow flex items-center gap-1"
            >
              <span>Next 04</span>
              <ChevronRight className="w-3 h-3 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Reviews Grid - Displays exactly 04 Reviews at a time on the same page */}
      <div className="relative min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {currentReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-gradient-to-b from-[#092218] to-[#051710] border border-[#c59b27]/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-[#dfba5d]/60 transition-colors"
              >
                <div>
                  {/* Header with avatar, name, location, and stars */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <ReviewAvatar name={rev.name} avatar={rev.avatar} />
                      <div>
                        <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
                          <span>{rev.name}</span>
                          {rev.verified && (
                            <span className="text-[10px] bg-[#10b981]/20 text-[#10b981] px-1.5 py-0.2 rounded-full border border-[#10b981]/40 flex items-center gap-0.5 font-medium">
                              <CheckCircle className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {rev.city}, {rev.state} • {rev.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex text-[#f5d061] shrink-0">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#f5d061]" />
                      ))}
                    </div>
                  </div>

                  {/* Review Comment: English text with authentic Hindi / Hinglish wording */}
                  <p className="text-xs sm:text-sm text-[#e8dfcf] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span className="text-[#fae69e] text-[11px] font-medium">
                    Purchased: Rajshahi Nuts 4 KG Combo Pack
                  </span>
                  <span className="flex items-center gap-1 text-[#10b981]">
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful Review
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Action Bar: "Read More Reviews" & Pagination Controls (In-place on same page) */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {/* Prominent Read More Reviews Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handlePrevPage}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#092218] hover:bg-[#0d3425] border border-[#c59b27]/50 text-[#fae69e] font-semibold text-xs sm:text-sm transition-all shadow hover:scale-[1.02] active:scale-[0.98]"
          >
            <ChevronLeft className="w-4 h-4 text-[#dfba5d]" />
            <span>Previous Reviews</span>
          </button>

          <button
            onClick={handleNextPage}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#dfba5d] via-[#f5d061] to-[#dfba5d] text-[#072417] font-black text-sm sm:text-base hover:brightness-105 active:scale-[0.98] transition-all shadow-xl border border-[#fae69e] group"
          >
            <Sparkles className="w-4 h-4 text-[#072417] group-hover:rotate-12 transition-transform" />
            <span>Read More Reviews</span>
            <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Detailed Numbered Pagination Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 pt-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="p-2 rounded-lg bg-[#072417] text-gray-300 hover:text-white hover:bg-[#0d3824] disabled:opacity-40 disabled:hover:bg-[#072417] border border-white/10 text-xs flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {getVisiblePages().map((p, idx) => {
            if (typeof p === 'string') {
              return (
                <span key={`dots-${idx}`} className="px-2 text-gray-500 text-xs">
                  •••
                </span>
              );
            }

            const isCurrent = p === currentPage;
            return (
              <button
                key={`page-${p}`}
                onClick={() => handlePageSelect(p)}
                className={`min-w-[34px] h-[34px] rounded-lg text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-[#dfba5d] text-[#072417] shadow-lg scale-105 font-black border border-[#fae69e]'
                    : 'bg-[#072417] text-gray-300 hover:text-white hover:bg-[#0d3824] border border-white/10'
                }`}
              >
                {p + 1}
              </button>
            );
          })}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-lg bg-[#072417] text-gray-300 hover:text-white hover:bg-[#0d3824] disabled:opacity-40 disabled:hover:bg-[#072417] border border-white/10 text-xs flex items-center gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick jump to page & summary */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>
            Showing 4 of <strong className="text-[#fae69e]">{totalReviews.toLocaleString('en-IN')}</strong> customer reviews
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <label htmlFor={jumpInputId} className="text-gray-400">Jump to page:</label>
            <select
              id={jumpInputId}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="bg-[#072417] border border-[#c59b27]/50 rounded px-2 py-0.5 text-xs text-[#fae69e] focus:outline-none focus:border-[#dfba5d]"
            >
              {jumpPageOptions}
            </select>
          </div>
          {currentPage > 0 && (
            <>
              <span>•</span>
              <button
                onClick={() => setCurrentPage(0)}
                className="text-[#dfba5d] hover:underline flex items-center gap-0.5"
              >
                <RotateCcw className="w-3 h-3" /> Back to start
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
