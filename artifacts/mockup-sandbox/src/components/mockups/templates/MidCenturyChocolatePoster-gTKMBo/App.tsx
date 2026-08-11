import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Clock, Heart } from 'lucide-react';

// ---------- COLORWAYS ----------
const COLORWAYS = {
  tangerine: {
    name: 'Tangerine Dream',
    page: '#F2E3C6',
    coverBg: '#E8542F',
    coverPanel: '#F6E7C8',
    ink: '#33180F',
    pop: '#F0A93B',
    cool: '#2D6B61',
    blush: '#F2C7A8',
    swatch: '#E8542F',
  },
  pistachio: {
    name: 'Pistachio Hour',
    page: '#EDE8D3',
    coverBg: '#A9C087',
    coverPanel: '#F4EDD6',
    ink: '#3A2317',
    pop: '#E0703A',
    cool: '#46695B',
    blush: '#E9B9A0',
    swatch: '#A9C087',
  },
  midnight: {
    name: 'Midnight Cocoa',
    page: '#E9DCC4',
    coverBg: '#33201A',
    coverPanel: '#2A1812',
    ink: '#F3E4C5',
    pop: '#E8542F',
    cool: '#D9A23B',
    blush: '#C97B5A',
    swatch: '#33201A',
  },
};

// ---------- SVG BITS ----------
const Starburst = ({ size = 120, color = '#F0A93B', points = 16, className = '', style = {} }) => {
  const pts = [];
  const cx = 50, cy = 50;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 50 : 22;
    const a = (Math.PI * i) / points;
    pts.push(`${cx + r * Math.sin(a)},${cy - r * Math.cos(a)}`);
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style}>
      <polygon points={pts.join(' ')} fill={color} />
    </svg>
  );
};

const Boomerang = ({ size = 200, color = '#2D6B61', className = '', style = {} }) => (
  <svg viewBox="0 0 100 70" width={size} height={size * 0.7} className={className} style={style}>
    <path d="M6,62 Q50,-14 94,62 Q50,30 6,62 Z" fill={color} />
  </svg>
);

const AtomDots = ({ color = '#33180F', className = '', style = {} }) => (
  <svg viewBox="0 0 120 30" width="120" height="30" className={className} style={style}>
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx={12 + i * 24} cy="15" r={i === 2 ? 7 : 4} fill={color} />
    ))}
  </svg>
);

// ---------- MAIN ----------
export default function App() {
  const [way, setWay] = useState('tangerine');
  const [hovered, setHovered] = useState(false);
  const c = COLORWAYS[way];

  const tiers = [
    { price: '$24', name: 'The Wink', desc: 'Signed first-edition + a bar of "Salted Mischief"', left: '212 left' },
    { price: '$68', name: 'The Cackle', desc: 'Book + the full Atomic Flavor Flight (6 bars)', left: '57 left' },
    { price: '$240', name: 'The Full Jester', desc: 'Everything + a tempering masterclass in our Eames-chair test kitchen', left: '4 left' },
  ];

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative"
      style={{ backgroundColor: c.page, fontFamily: "'Archivo', sans-serif", color: c.ink === '#F3E4C5' ? '#33180F' : c.ink, transition: 'background-color .6s ease' }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Shrikhand&family=Yellowtail&family=Archivo:wdth,wght@62..125,300..900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .shrik { font-family: 'Shrikhand', serif; }
        .script { font-family: 'Yellowtail', cursive; }
        .mono { font-family: 'Space Mono', monospace; }
        .arch-x { font-family: 'Archivo', sans-serif; font-stretch: 125%; }
        .arch-c { font-family: 'Archivo', sans-serif; font-stretch: 62%; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bob { 0%,100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-10px) rotate(-8deg); } }
        .grain::after {
          content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .25; mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
        }
        .ticker { animation: ticker 22s linear infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        ::selection { background: ${c.pop}; color: #33180F; }
      `}} />

      {/* backdrop atomic decor */}
      <Boomerang size={520} color={c.cool} className="absolute -top-28 -left-32 opacity-[0.13]" style={{ transform: 'rotate(20deg)' }} />
      <Boomerang size={420} color={c.pop} className="absolute -bottom-24 -right-24 opacity-[0.16]" style={{ transform: 'rotate(200deg)' }} />
      <Starburst size={70} color={c.pop} className="absolute top-[14%] right-[6%] opacity-60" style={{ animation: 'spin-slow 40s linear infinite' }} />
      <Starburst size={42} color={c.cool} className="absolute bottom-[18%] left-[5%] opacity-60" style={{ animation: 'spin-slow 55s linear infinite reverse' }} />

      {/* ---------- HEADER ---------- */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Starburst size={40} color={c.pop} />
            <span className="shrik absolute inset-0 flex items-center justify-center text-sm" style={{ color: '#33180F' }}>B</span>
          </div>
          <div className="leading-none">
            <p className="shrik text-lg" style={{ color: '#33180F' }}>Bonbon Bandits</p>
            <p className="mono text-[10px] tracking-[0.25em] uppercase opacity-60">small-batch · big mouth</p>
          </div>
        </div>

        {/* colorway toggle */}
        <div className="flex items-center gap-2">
          <span className="mono hidden md:block text-[10px] tracking-[0.2em] uppercase opacity-60 mr-2">cover colorway</span>
          {Object.entries(COLORWAYS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setWay(key)}
              title={val.name}
              className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: val.swatch,
                borderColor: '#33180F',
                transform: way === key ? 'scale(1.15)' : 'scale(1)',
                boxShadow: way === key ? `0 0 0 3px ${c.page}, 0 0 0 5px #33180F` : 'none',
              }}
            />
          ))}
        </div>
      </header>

      {/* ---------- MAIN GRID ---------- */}
      <main className="relative z-10 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-6 px-6 md:px-12 pb-10 pt-2 max-w-[1400px] mx-auto items-center">

        {/* ====== THE BOOK COVER ====== */}
        <div className="flex justify-center lg:justify-end lg:pr-10">
          <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{ rotate: hovered ? 0 : -2.5, y: hovered ? -8 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="relative"
            style={{ width: 'min(440px, 88vw)' }}
          >
            {/* drop shadow card behind */}
            <div className="absolute inset-0 translate-x-4 translate-y-5 rounded-sm" style={{ backgroundColor: '#33180F', opacity: 0.85 }} />
            {/* spine */}
            <div className="absolute -left-3 top-2 bottom-2 w-3 rounded-l-sm" style={{ backgroundColor: c.cool, transition: 'background-color .6s' }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={way}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative grain overflow-hidden rounded-sm border-[3px]"
                style={{ backgroundColor: c.coverBg, borderColor: '#33180F', aspectRatio: '2 / 2.95' }}
              >
                {/* z:0 — giant background boomerangs */}
                <Boomerang size={460} color={c.cool} className="absolute -left-28 top-[30%] opacity-90" style={{ transform: 'rotate(-18deg)', zIndex: 0 }} />
                <Boomerang size={380} color={c.blush} className="absolute -right-24 -top-10" style={{ transform: 'rotate(160deg)', zIndex: 0 }} />

                {/* z:5 — top kicker band */}
                <div className="absolute top-0 left-0 right-0 px-5 pt-5 flex items-start justify-between" style={{ zIndex: 5 }}>
                  <div className="leading-tight">
                    <p className="mono text-[9px] tracking-[0.3em] uppercase" style={{ color: c.ink }}>a field manual for</p>
                    <p className="arch-x font-black text-[15px] uppercase tracking-tight" style={{ color: c.ink }}>Serious Chocolate,</p>
                    <p className="arch-x font-black text-[15px] uppercase tracking-tight" style={{ color: c.ink }}>Unserious People</p>
                  </div>
                  <AtomDots color={c.ink} style={{ width: 86, height: 22, marginTop: 6 }} />
                </div>

                {/* z:10 — giant cream panel word */}
                <div className="absolute left-[-6%] right-[-6%] top-[24%] rotate-[-4deg]" style={{ zIndex: 10 }}>
                  <div className="py-2 border-y-[3px]" style={{ backgroundColor: c.coverPanel, borderColor: '#33180F' }}>
                    <h1 className="shrik text-center leading-none" style={{ fontSize: 'clamp(80px,24vw,128px)', color: '#33180F', textShadow: `5px 5px 0 ${c.pop}` }}>
                      MELT
                    </h1>
                  </div>
                </div>

                {/* z:30 — script overlay crossing the title */}
                <p
                  className="script absolute left-[6%] top-[40.5%] rotate-[-7deg] whitespace-nowrap"
                  style={{ zIndex: 30, fontSize: 'clamp(34px,9vw,52px)', color: c.cool === '#D9A23B' ? '#E8542F' : c.cool, textShadow: `2px 2px 0 ${c.coverPanel}` }}
                >
                  down with boring bars
                </p>

                {/* z:20 — subtitle stack */}
                <div className="absolute left-6 top-[55%]" style={{ zIndex: 20 }}>
                  <p className="arch-c font-black uppercase leading-[0.92]" style={{ fontSize: 'clamp(26px,7vw,40px)', color: c.ink }}>
                    The slightly<br />unhinged art of<br />small-batch<br />chocolate
                  </p>
                  <div className="mt-3 h-[5px] w-24" style={{ backgroundColor: c.pop }} />
                </div>

                {/* z:40 — starburst price/claim badge overlapping subtitle */}
                <div className="absolute right-[-14px] top-[52%]" style={{ zIndex: 40, animation: 'bob 5s ease-in-out infinite' }}>
                  <div className="relative" style={{ width: 132, height: 132 }}>
                    <Starburst size={132} color={c.pop} points={18} style={{ filter: 'drop-shadow(3px 4px 0 #33180F)' }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center rotate-[8deg]">
                      <span className="shrik text-[20px] leading-none" style={{ color: '#33180F' }}>100%</span>
                      <span className="mono text-[8px] tracking-widest uppercase mt-0.5" style={{ color: '#33180F' }}>cocoa</span>
                      <span className="shrik text-[16px] leading-none mt-0.5" style={{ color: '#33180F' }}>0%</span>
                      <span className="mono text-[8px] tracking-widest uppercase" style={{ color: '#33180F' }}>manners</span>
                    </div>
                  </div>
                </div>

                {/* z:15 — bottom author bar */}
                <div className="absolute bottom-0 left-0 right-0 flex items-stretch border-t-[3px]" style={{ zIndex: 15, borderColor: '#33180F' }}>
                  <div className="flex-1 px-5 py-3" style={{ backgroundColor: c.coverPanel }}>
                    <p className="mono text-[9px] tracking-[0.3em] uppercase" style={{ color: '#33180F', opacity: 0.65 }}>recipes · rants · 41 ways to ruin ganache</p>
                    <p className="shrik text-xl leading-tight" style={{ color: '#33180F' }}>by the Bonbon Bandits</p>
                  </div>
                  <div className="w-20 flex items-center justify-center border-l-[3px]" style={{ backgroundColor: c.cool, borderColor: '#33180F' }}>
                    <p className="arch-x font-black text-xs uppercase rotate-[-90deg] tracking-[0.2em]" style={{ color: c.coverPanel }}>Vol. 01</p>
                  </div>
                </div>

                {/* z:50 — tiny crowdfund seal top-right corner */}
                <div className="absolute -top-2 -right-2 rotate-12" style={{ zIndex: 50 }}>
                  <div className="px-3 py-1.5 border-[3px] rounded-full" style={{ backgroundColor: c.coverPanel, borderColor: '#33180F' }}>
                    <p className="mono text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: '#33180F' }}>1st printing ★ backers only</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ====== CAMPAIGN SIDE ====== */}
        <div className="max-w-[520px] mx-auto lg:mx-0">
          <p className="mono text-[11px] tracking-[0.3em] uppercase flex items-center gap-2" style={{ color: c.swatch === '#33201A' ? '#E8542F' : c.coverBg === '#A9C087' ? '#46695B' : c.coverBg }}>
            <Sparkles size={13} /> Now crowdfunding · Kickstarter
          </p>
          <h2 className="arch-c font-black uppercase leading-[0.95] mt-3" style={{ fontSize: 'clamp(34px,4.5vw,56px)', color: '#33180F' }}>
            We wrote the book<br />on chocolate.<br />
            <span className="script normal-case font-normal" style={{ fontSize: '0.95em', color: COLORWAYS[way].coverBg === '#33201A' ? '#E8542F' : COLORWAYS[way].coverBg }}>Then we drew on it.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed opacity-80 max-w-md" style={{ color: '#33180F' }}>
            <strong>MELT</strong> is 240 pages of bean-to-bar know-how, atomic-age illustration, and recipes our pastry chef begged us not to print. Hardbound, foil-stamped, smells faintly of toasted nibs. Probably.
          </p>

          {/* progress */}
          <div className="mt-7 p-5 border-[3px] rounded-sm relative" style={{ borderColor: '#33180F', backgroundColor: 'rgba(255,255,255,0.45)' }}>
            <Starburst size={34} color={COLORWAYS[way].pop} className="absolute -top-4 -right-4" />
            <div className="flex items-end justify-between">
              <p className="shrik text-3xl" style={{ color: '#33180F' }}>$87,412</p>
              <p className="mono text-[11px] uppercase tracking-widest opacity-60">of $60,000 goal</p>
            </div>
            <div className="mt-3 h-4 w-full rounded-full border-2 overflow-hidden" style={{ borderColor: '#33180F', backgroundColor: COLORWAYS[way].page }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full"
                style={{ background: `repeating-linear-gradient(45deg, ${COLORWAYS[way].pop}, ${COLORWAYS[way].pop} 10px, ${COLORWAYS[way].coverBg === '#33201A' ? '#C97B5A' : COLORWAYS[way].coverBg} 10px, ${COLORWAYS[way].coverBg === '#33201A' ? '#C97B5A' : COLORWAYS[way].coverBg} 20px)` }}
              />
            </div>
            <div className="mt-3 flex gap-6 mono text-[11px] uppercase tracking-wider" style={{ color: '#33180F' }}>
              <span className="flex items-center gap-1.5"><Users size={13} /> 1,948 backers</span>
              <span className="flex items-center gap-1.5"><Clock size={13} /> 11 days left</span>
              <span className="flex items-center gap-1.5"><Heart size={13} /> 145% funded</span>
            </div>
          </div>

          {/* tiers */}
          <div className="mt-5 space-y-2.5">
            {tiers.map((t, i) => (
              <div
                key={t.name}
                className="group flex items-center gap-4 px-4 py-3 border-[3px] rounded-sm cursor-pointer transition-transform hover:-translate-y-0.5 hover:translate-x-0.5"
                style={{ borderColor: '#33180F', backgroundColor: i === 1 ? COLORWAYS[way].pop : 'rgba(255,255,255,0.45)' }}
              >
                <span className="shrik text-2xl w-16 shrink-0" style={{ color: '#33180F' }}>{t.price}</span>
                <div className="flex-1 leading-tight">
                  <p className="arch-x font-black uppercase text-sm" style={{ color: '#33180F' }}>{t.name} <span className="mono text-[9px] font-normal opacity-50 normal-case ml-1">{t.left}</span></p>
                  <p className="text-[12px] opacity-75" style={{ color: '#33180F' }}>{t.desc}</p>
                </div>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#33180F' }} />
              </div>
            ))}
          </div>

          <button
            className="mt-6 w-full py-4 border-[3px] rounded-sm shrik text-xl tracking-wide transition-all hover:-translate-y-1"
            style={{ backgroundColor: '#33180F', color: COLORWAYS[way].page, borderColor: '#33180F', boxShadow: `5px 6px 0 ${COLORWAYS[way].pop}` }}
          >
            Back the book → get the bars
          </button>
        </div>
      </main>

      {/* ---------- TICKER FOOTER ---------- */}
      <div className="relative z-10 border-t-[3px] overflow-hidden py-3" style={{ borderColor: '#33180F', backgroundColor: '#33180F' }}>
        <div className="ticker flex whitespace-nowrap mono text-[11px] tracking-[0.25em] uppercase" style={{ color: COLORWAYS[way].page }}>
          {[0, 1].map((n) => (
            <span key={n} className="flex">
              {['stone-ground in a former bowling alley', '★', 'single-origin · double trouble', '★', 'foil-stamped hardcover · 240 pages', '★', 'temper tantrums encouraged', '★', 'ships march 2025', '★', 'bonbon bandits press', '★'].map((w, i) => (
                <span key={i} className="mx-5">{w}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}