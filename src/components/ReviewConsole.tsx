import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface UserReview {
  id: string;
  name: string;
  trade: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
  timestamp: string;
  verified: boolean;
}

export default function ReviewConsole() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('');
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [avatar, setAvatar] = useState('👨‍🔧');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReview, setSubmittedReview] = useState<UserReview | null>(null);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('webnar_reviews');
    if (saved) {
      try {
        setUserReviews(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved reviews', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;

    setIsSubmitting(true);

    // Simulate database / serverless dispatch
    setTimeout(() => {
      const newReview: UserReview = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        name,
        trade: trade || 'Independent Specialist',
        location: location || 'Los Angeles',
        quote,
        rating,
        avatar,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        verified: false, // Pending Vercel / DB integration approval
      };

      const updated = [newReview, ...userReviews];
      setUserReviews(updated);
      localStorage.setItem('webnar_reviews', JSON.stringify(updated));
      
      setSubmittedReview(newReview);
      setIsSubmitting(false);

      // Reset form
      setName('');
      setTrade('');
      setLocation('');
      setQuote('');
      setRating(5);
    }, 2000);
  };

  const handleClearSaved = () => {
    localStorage.removeItem('webnar_reviews');
    setUserReviews([]);
  };

  return (
    <section className="mb-24" id="review-submission-section">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl text-[#C9A24B]">💬</span>
          <h2 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider">
            Review Ledger &amp; Feedback Hub
          </h2>
        </div>
        <div className="h-[1px] flex-1 bg-[#232C42] hidden md:block" />
        <span className="font-mono text-xs text-[#C9A24B] font-bold tracking-widest uppercase">
          VERCEL DB INTEGRATION READY
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT CARD: INTERACTIVE WRITING FORM */}
        <div className="lg:col-span-7 bg-[#101828] text-white border border-[#232C42] rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#232C42]">
              <span className="font-mono text-xs text-[#C9A24B] font-bold tracking-widest uppercase">
                [ SYS_INPUT // REPUTATION_CONSOLE ]
              </span>
              <div className="bg-[#C9A24B]/10 text-[#C9A24B] text-[11px] font-mono tracking-widest px-3 py-1 border border-[#C9A24B]/20 rounded-full uppercase">
                STATION ACTIVE
              </div>
            </div>

            <h3 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider mb-2">
              Leave your verified feedback ✒️
            </h3>
            <p className="font-sans text-sm text-gray-300 mb-6 leading-relaxed">
              We build client-owned systems that load instantly. If you are a client, verify your build and submit your review below to store it to the distributed network.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-sm">
              
              {/* INTERACTIVE STAR RATING PICKER */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                  Experience Rating:
                </label>
                <div className="flex items-center gap-2 bg-[#0A0D15] p-3 border border-[#232C42] inline-flex rounded-xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="text-2xl transition-transform duration-100 hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <span
                        className={
                          star <= (hoverRating ?? rating)
                            ? 'text-[#C9A24B]'
                            : 'text-gray-600'
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="text-xs text-gray-400 font-mono ml-3 uppercase tracking-widest font-bold">
                    {rating === 5 ? 'Radical (5/5)' : `${rating}/5 Stars`}
                  </span>
                </div>
              </div>

              {/* INPUT FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                    Your Name / business:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David K."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A0D15] text-white border border-[#232C42] focus:border-[#C9A24B] p-3 rounded-xl focus:outline-none placeholder:text-gray-600 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                    Trade / Specialty:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dave's Sparky Shop"
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    className="w-full bg-[#0A0D15] text-white border border-[#232C42] focus:border-[#C9A24B] p-3 rounded-xl focus:outline-none placeholder:text-gray-600 text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                    Service Area / City:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Burbank"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#0A0D15] text-white border border-[#232C42] focus:border-[#C9A24B] p-3 rounded-xl focus:outline-none placeholder:text-gray-600 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                    Select Avatar Badge:
                  </label>
                  <div className="flex gap-2.5 bg-[#0A0D15] p-2 border border-[#232C42] justify-around rounded-xl">
                    {['👨‍🔧', '👩‍🔧', '🧔', '🏢', '⚡', '🔧'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setAvatar(emoji)}
                        className={`text-lg p-1.5 transition-all ${
                          avatar === emoji
                            ? 'bg-[#C9A24B]/20 border border-[#C9A24B] scale-110'
                            : 'border border-transparent hover:bg-white/5'
                        } cursor-pointer rounded-xl`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                  Review content / statement:
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your project, completion speed, and overall experience..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-[#0A0D15] text-white border border-[#232C42] focus:border-[#C9A24B] p-3 rounded-xl focus:outline-none placeholder:text-gray-600 text-sm transition-colors resize-none"
                />
              </div>

              {/* VERCEL/POST READY NOTIFICATION BADGE */}
              <div className="flex items-start gap-2.5 bg-[#C9A24B]/5 border border-[#C9A24B]/20 p-3 rounded-xl">
                <span className="text-[#C9A24B] text-base leading-none">⚙️</span>
                <p className="text-[11px] font-mono text-gray-300 leading-normal">
                  <span className="text-[#C9A24B] font-bold">Vercel API Hook:</span> Submitting saves to local memory. When you deploy to Vercel, simply map this form action to a serverless function endpoint to persist to your Postgres or MongoDB backend.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-display text-sm font-bold uppercase py-4 tracking-widest transition-all rounded-xl cursor-pointer ${
                  isSubmitting
                    ? 'bg-[#232C42] text-gray-400 cursor-not-allowed border border-transparent'
                    : 'machined-metal-btn'
                }`}
              >
                {isSubmitting ? '📡 COMMITTING TO DATABASE...' : '⚡ PUBLISH PREMIUM REVIEW'}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT CARD: LIVE LEDGER FEED */}
        <div className="lg:col-span-5 flex flex-col justify-between font-mono">
          <div className="bg-[#101828] border border-[#232C42] rounded-2xl p-6 md:p-8 text-[#E8E4D8] h-full flex flex-col justify-between relative overflow-hidden shadow-xl">
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#232C42] pb-4 mb-5">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C9A24B] animate-pulse" />
                  <span className="text-xs font-bold tracking-widest text-[#C9A24B] uppercase">
                    LEDGER DISPATCH FEED
                  </span>
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  DATABASE // STANDBY
                </span>
              </div>

              {/* Holographic Transition Screens */}
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="publishing"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-5 py-12 text-center text-sm"
                  >
                    <div className="text-3xl animate-bounce">📡</div>
                    <p className="text-[#C9A24B] font-bold uppercase tracking-wider animate-pulse text-sm">
                      VERIFYING DIGITAL SIGNATURE...
                    </p>
                    
                    <div className="w-56 h-2.5 bg-[#0A0D15] border border-[#232C42] rounded-none mx-auto overflow-hidden relative">
                      <motion.div
                        className="h-full bg-[#C9A24B]"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.8, ease: 'easeInOut' }}
                      />
                    </div>
                    
                    <div className="text-gray-400 space-y-1.5 text-xs tracking-widest uppercase">
                      <p>&gt; IP_CHECK: 127.0.0.1</p>
                      <p>&gt; ENCRYPTING PAYLOAD HASH</p>
                    </div>
                  </motion.div>
                ) : submittedReview ? (
                  <motion.div
                    key="success-receipt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 text-sm"
                  >
                    <div className="flex justify-between items-center bg-[#C9A24B]/10 p-3 border border-[#C9A24B]/30 text-[#C9A24B] rounded-xl">
                      <span className="font-bold text-xs tracking-widest uppercase">★ SUCCESS: SUBMITTED</span>
                      <span className="text-xs animate-pulse font-bold tracking-widest uppercase">
                        ● VERIFIED
                      </span>
                    </div>

                    <div className="space-y-3.5 bg-[#0A0D15]/60 p-5 border border-[#232C42] relative rounded-xl">
                      {/* Laser stamp */}
                      <div className="absolute top-3 right-3 border border-[#C9A24B] text-[#C9A24B] text-xs font-bold px-2.5 py-1 rounded-full rotate-6 uppercase select-none">
                        PENDING SYNC
                      </div>

                      <div className="grid grid-cols-4 border-b border-[#232C42]/60 pb-2">
                        <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">CLIENT</span>
                        <span className="col-span-3 text-[#E8E4D8] font-bold text-sm">{submittedReview.name}</span>
                      </div>

                      <div className="grid grid-cols-4 border-b border-[#232C42]/60 pb-2">
                        <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">TRADE</span>
                        <span className="col-span-3 text-[#C9A24B] font-bold text-sm">{submittedReview.trade}</span>
                      </div>

                      <div className="grid grid-cols-4 border-b border-[#232C42]/60 pb-2">
                        <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">REVIEW</span>
                        <span className="col-span-3 text-gray-300 italic text-xs leading-relaxed truncate">
                          &quot;{submittedReview.quote}&quot;
                        </span>
                      </div>

                      <div className="grid grid-cols-4">
                        <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">RATING</span>
                        <span className="col-span-3 text-[#C9A24B] font-bold text-xs uppercase tracking-wider">
                          {'★'.repeat(submittedReview.rating)} ({submittedReview.rating}/5)
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest leading-normal">
                      FEEDBACK SUBMITTED SECURELY. THE LOCAL STORAGE HAS BEEN REWRITTEN TO CAPTURE YOUR RESPONSE.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSubmittedReview(null)}
                      className="w-full text-center border border-[#232C42] hover:border-[#C9A24B] text-gray-300 hover:text-white py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-xl"
                    >
                      WRITE ANOTHER REVIEW
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="feed-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="bg-[#0A0D15] p-3 border border-[#232C42] flex justify-between items-center rounded-xl">
                      <span className="text-[#C9A24B] font-bold text-xs tracking-widest uppercase">★ RECENT ENTRIES</span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        TOTAL: {userReviews.length}
                      </span>
                    </div>

                    {userReviews.length === 0 ? (
                      <div className="border border-dashed border-[#232C42] rounded-2xl p-8 text-center text-gray-400 space-y-3">
                        <div className="text-2xl">✒️</div>
                        <p className="text-xs uppercase tracking-wider leading-relaxed">
                          No reviews recorded on local storage ledger yet.
                        </p>
                        <p className="text-[10px] font-mono text-gray-500 leading-normal">
                          Fill out the form on the left to deploy the first client statement into local memory.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                        {userReviews.map((rev) => (
                          <div
                            key={rev.id}
                            className="bg-[#0A0D15]/80 border border-[#232C42] p-3.5 relative overflow-hidden rounded-xl"
                          >
                            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#232C42]/40">
                              <span className="text-xs text-[#C9A24B] font-bold tracking-wider uppercase">
                                {rev.avatar} {rev.name}
                              </span>
                              <span className="text-[10px] text-gray-500">{rev.timestamp}</span>
                            </div>
                            <p className="text-[11px] text-[#C9A24B] font-mono uppercase mb-1">
                              {rev.trade} // {rev.location}
                            </p>
                            <p className="text-xs text-gray-300 leading-relaxed italic">
                              &ldquo;{rev.quote}&rdquo;
                            </p>
                            <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-[#232C42]/20">
                              <span className="text-[#C9A24B] text-xs">{'★'.repeat(rev.rating)}</span>
                              <span className="text-[9px] text-gray-500 uppercase tracking-widest">LOCAL_DB_SECURED</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clear ledger button / instruction footer */}
            <div className="mt-6 border-t border-[#232C42] pt-5 flex items-center justify-between text-[11px]">
              <span className="text-gray-400 uppercase tracking-widest font-bold">
                API_STATUS: OFFLINE_MOCK
              </span>
              {userReviews.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearSaved}
                  className="text-red-400 hover:text-red-300 hover:underline cursor-pointer transition-all text-[10px] uppercase font-mono tracking-wider"
                >
                  [ RESET LEDGER ]
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
