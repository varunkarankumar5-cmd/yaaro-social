import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, Users, Clock, Bell, ChevronDown, Heart } from 'lucide-react';

const luminous = '#d8b76a'; // candlelit gold
const luminous2 = '#9be8c8'; // pale verdigris

export default function App() {
  const [expanded, setExpanded] = useState(true);
  const [pledged, setPledged] = useState(false);

  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  // layered parallax transforms
  const bgX = useTransform(sx, [0, 1], [14, -14]);
  const bgY = useTransform(sy, [0, 1], [10, -10]);
  const midX = useTransform(sx, [0, 1], [7, -7]);
  const midY = useTransform(sy, [0, 1], [5, -5]);
  const fgX = useTransform(sx, [0, 1], [-6, 6]);
  const fgY = useTransform(sy, [0, 1], [-4, 4]);
  const glowX = useTransform(sx, [0, 1], ['30%', '70%']);
  const glowY = useTransform(sy, [0, 1], ['25%', '60%']);
  const tiltX = useTransform(sy, [0, 1], [3.5, -3.5]);
  const tiltY = useTransform(sx, [0, 1], [-3.5, 3.5]);

  const handleMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = ('touches' in e ? e.touches[0].clientX : e.clientX);
    const cy = ('touches' in e ? e.touches[0].clientY : e.clientY);
    mx.set((cx - rect.left) / rect.width);
    my.set((cy - rect.top) / rect.height);
  }, [mx, my]);

  const raised = pledged ? 38614 : 38469;
  const goal = 45000;
  const pct = Math.min(100, Math.round((raised / goal) * 1000) / 10);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0d] px-5 py-12 overflow-hidden relative"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      ref={ref}
    >
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;450;500;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #0b0b0d; }
        .font-serif-d { font-family: 'Cormorant Garamond', serif; }
        .font-ui { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .progress-shimmer {
          background-image: linear-gradient(105deg, ${luminous} 0%, #f3e2b3 45%, ${luminous} 60%);
          background-size: 200% 100%;
          animation: shimmer 4.5s linear infinite;
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0px); opacity: .55; }
          50% { transform: translateY(-7px); opacity: 1; }
        }
        .grain::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: inherit;
        }
      `}} />

      {/* ambient backdrop glow — deepest parallax layer */}
      <motion.div
        className="absolute w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          x: bgX, y: bgY,
          background: `radial-gradient(circle, ${luminous}10 0%, transparent 62%)`,
        }}
      />
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full pointer-events-none -translate-x-40 translate-y-32"
        style={{
          x: midX, y: midY,
          background: `radial-gradient(circle, ${luminous2}0c 0%, transparent 60%)`,
        }}
      />

      {/* phone-width column */}
      <div className="w-full max-w-[380px] font-ui relative">

        {/* status-bar style header */}
        <motion.div
          className="flex items-center justify-between mb-5 px-1"
          style={{ x: fgX, y: fgY }}
        >
          <div className="flex items-center gap-2">
            <Bell size={13} className="text-[#5b5b63]" strokeWidth={1.75} />
            <span className="text-[11px] tracking-[0.18em] uppercase text-[#5b5b63] font-medium">Now · Relic & Rite</span>
          </div>
          <span className="text-[11px] text-[#46464d]">9:41</span>
        </motion.div>

        {/* The card */}
        <motion.div
          className="relative rounded-[22px] grain"
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 900,
            background: 'linear-gradient(165deg, #17171b 0%, #121215 58%, #0f0f12 100%)',
            border: '1px solid #26262c',
            boxShadow: `0 1px 0 0 #ffffff08 inset, 0 24px 60px -24px #000000cc, 0 0 80px -40px ${luminous}30`,
          }}
        >
          {/* moving inner glow */}
          <motion.div
            className="absolute inset-0 rounded-[22px] pointer-events-none"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([gx, gy]) => `radial-gradient(280px circle at ${gx} ${gy}, ${luminous}0e, transparent 70%)`
              ),
            }}
          />

          {/* top row */}
          <div className="flex items-start justify-between px-5 pt-5">
            <div className="flex items-center gap-3">
              {/* sigil mark */}
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{
                  x: midX, y: midY,
                  background: '#1d1d22',
                  border: `1px solid ${luminous}38`,
                  boxShadow: `0 0 18px -6px ${luminous}66`,
                }}
              >
                <Sparkles size={15} style={{ color: luminous }} strokeWidth={1.6} />
              </motion.div>
              <div>
                <p className="text-[13px] text-[#e9e7e2] font-medium leading-tight">Relic & Rite</p>
                <p className="text-[11px] text-[#6b6b73] mt-0.5">Crowdfund · The Second Life Atelier</p>
              </div>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#6b6b73] hover:text-[#c9c7c2] hover:bg-[#ffffff08] transition-colors"
              aria-label="toggle"
            >
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.35 }}>
                <ChevronDown size={15} strokeWidth={1.75} />
              </motion.span>
            </button>
          </div>

          {/* headline */}
          <motion.div className="px-5 mt-4" style={{ x: fgX, y: fgY }}>
            <h2 className="font-serif-d text-[24px] leading-[1.15] text-[#f1efe9] font-medium">
              The garments are <em className="not-italic" style={{ color: luminous }}>nearly awake.</em>
            </h2>
            <p className="text-[12.5px] leading-[1.6] text-[#8a8a92] mt-2">
              85% funded — your pledge restores the 1970s Yves archive and opens the atelier doors this spring.
            </p>
          </motion.div>

          {/* expandable body */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                {/* progress */}
                <div className="px-5 mt-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[15px] text-[#f1efe9] font-medium tabular-nums">
                      ${raised.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-[#6b6b73] tabular-nums">of ${goal.toLocaleString()} · {pct}%</span>
                  </div>
                  <div className="h-[3px] rounded-full bg-[#26262c] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full progress-shimmer"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      style={{ boxShadow: `0 0 12px ${luminous}80` }}
                    />
                  </div>

                  {/* meta row */}
                  <div className="flex items-center gap-5 mt-3.5">
                    <div className="flex items-center gap-1.5">
                      <Users size={12} className="text-[#6b6b73]" strokeWidth={1.75} />
                      <span className="text-[11px] text-[#9a9aa2] tabular-nums">1,243 backers</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-[#6b6b73]" strokeWidth={1.75} />
                      <span className="text-[11px] text-[#9a9aa2]">5 days remain</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: luminous2, boxShadow: `0 0 8px ${luminous2}`, animation: 'drift 3s ease-in-out infinite' }}
                      />
                      <span className="text-[11px]" style={{ color: luminous2 }}>Live</span>
                    </div>
                  </div>
                </div>

                {/* reward tier strip */}
                <motion.div
                  className="mx-5 mt-5 rounded-xl flex items-center gap-3 p-3"
                  style={{
                    x: midX, y: midY,
                    background: '#19191e',
                    border: '1px solid #2a2a31',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=160&h=160&fit=crop"
                    alt="Vintage silk scarf reward"
                    className="w-12 h-12 rounded-lg object-cover saturate-[0.85]"
                    style={{ border: '1px solid #33333a' }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-[#e0ded8] font-medium truncate">The Initiate — $85 tier</p>
                    <p className="text-[11px] text-[#6b6b73] mt-0.5">Restored silk piece + atelier first access</p>
                  </div>
                  <span className="text-[10px] tracking-wide px-2 py-1 rounded-full shrink-0"
                    style={{ color: luminous, background: `${luminous}14`, border: `1px solid ${luminous}2e` }}>
                    14 left
                  </span>
                </motion.div>

                {/* actions */}
                <div className="flex items-center gap-2.5 px-5 pt-5 pb-5">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPledged(true)}
                    className="flex-1 h-11 rounded-xl text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all duration-300"
                    style={pledged ? {
                      background: '#1d1d22',
                      color: luminous2,
                      border: `1px solid ${luminous2}40`,
                    } : {
                      background: luminous,
                      color: '#141410',
                      boxShadow: `0 8px 28px -10px ${luminous}90`,
                    }}
                  >
                    {pledged ? (
                      <>
                        <Heart size={14} strokeWidth={2} fill={luminous2} /> Pledge received
                      </>
                    ) : (
                      <>
                        Back the revival <ArrowUpRight size={14} strokeWidth={2.2} />
                      </>
                    )}
                  </motion.button>
                  <button className="h-11 px-4 rounded-xl text-[13px] text-[#9a9aa2] hover:text-[#e9e7e2] transition-colors"
                    style={{ border: '1px solid #2a2a31', background: '#161619' }}>
                    Later
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* collapsed footer spacing */}
          {!expanded && <div className="h-5" />}
        </motion.div>

        {/* stacked notification hint behind */}
        <motion.div
          className="mx-3 h-3 rounded-b-[18px] -mt-px"
          style={{
            x: bgX, y: bgY,
            background: '#121215',
            border: '1px solid #202026',
            borderTop: 'none',
            opacity: 0.7,
          }}
        />
        <motion.div
          className="mx-7 h-2.5 rounded-b-[16px] -mt-px"
          style={{
            x: bgX, y: bgY,
            background: '#0f0f12',
            border: '1px solid #1b1b20',
            borderTop: 'none',
            opacity: 0.5,
          }}
        />

        {/* caption */}
        <p className="text-center text-[10.5px] tracking-[0.22em] uppercase text-[#3d3d44] mt-8">
          Swipe to dismiss · Hold to keep
        </p>
      </div>
    </div>
  );
}