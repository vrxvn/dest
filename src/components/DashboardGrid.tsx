import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  TrendingUp,
  Send,
  PlusCircle,
  Receipt,
  QrCode,
  Copy,
  Check,
  X,
  CreditCard,
  Wallet,
  ShieldCheck,
  Search,
  Activity,
} from 'lucide-react';

export const DashboardGrid: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Quick Action Modal state
  const [activeModal, setActiveModal] = useState<'send' | 'add_funds' | 'pay_bills' | 'qr' | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Synchronized baseline alignment between Left Column (Treasury blocks) and Chart card
  const leftColRef = useRef<HTMLDivElement>(null);
  const topKpiRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const syncBottomAlignment = () => {
      if (leftColRef.current && topKpiRef.current && window.innerWidth >= 1024) {
        const leftBottom = leftColRef.current.getBoundingClientRect().bottom;
        const topKpiBottom = topKpiRef.current.getBoundingClientRect().bottom;
        // The Chart card starts 12px (gap-3) below Top KPI cards
        const targetHeight = leftBottom - topKpiBottom - 12;
        if (targetHeight > 180) {
          setChartHeight(Math.round(targetHeight));
          return;
        }
      }
      setChartHeight(undefined);
    };

    syncBottomAlignment();
    window.addEventListener('resize', syncBottomAlignment);

    const observer = new ResizeObserver(syncBottomAlignment);
    if (leftColRef.current) observer.observe(leftColRef.current);
    if (topKpiRef.current) observer.observe(topKpiRef.current);

    return () => {
      window.removeEventListener('resize', syncBottomAlignment);
      observer.disconnect();
    };
  }, []);

  const walletAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

  const handleCopy = () => {
    navigator.clipboard?.writeText(walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Timeframe chart datasets
  const chartDatasets: Record<string, { pts1: number[]; pts2: number[] }> = {
    '1D': {
      pts1: [14, 16, 15, 18, 17, 19, 21, 20, 23, 22, 25, 27],
      pts2: [10, 11, 12, 13, 13, 15, 16, 15, 17, 16, 18, 20],
    },
    '1W': {
      pts1: [12, 15, 14, 17, 16, 20, 19, 24, 22, 26, 25, 29],
      pts2: [9, 10, 12, 11, 14, 13, 15, 17, 18, 20, 19, 22],
    },
    '1M': {
      pts1: [10, 13, 16, 14, 19, 23, 21, 27, 24, 30, 28, 34],
      pts2: [7, 10, 12, 11, 14, 17, 16, 19, 18, 22, 20, 25],
    },
    '1Y': {
      pts1: [8, 12, 16, 20, 18, 25, 29, 27, 34, 39, 44, 52],
      pts2: [6, 8, 11, 13, 15, 18, 21, 20, 24, 28, 31, 36],
    },
    'ALL': {
      pts1: [5, 9, 14, 18, 24, 30, 36, 43, 50, 58, 66, 76],
      pts2: [4, 7, 9, 13, 16, 21, 26, 30, 35, 41, 47, 54],
    },
  };

  const currentDataset = chartDatasets[activeTimeframe] || chartDatasets['1M'];

  // Modern minimalist light glassmorphism matching the 3D solid sidebar
  const glassCard =
    'bg-gradient-to-b from-white/95 via-white/85 to-[#eef4fb]/90 backdrop-blur-xl rounded-[22px] sm:rounded-[26px] border-t-2 border-t-white border-x-[1.5px] border-white/80 border-b-[3.5px] border-b-slate-300/80 shadow-[0_12px_28px_-4px_rgba(15,23,42,0.1),0_4px_10px_rgba(15,23,42,0.04),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(148,163,184,0.2)] p-3.5 sm:p-4 flex flex-col justify-between transition-all';

  // 3D Solid Button Class
  const solid3DButton =
    'relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-slate-700 hover:text-slate-950 border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer group outline-none';

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden">
      {/* ============================================================== */}
      {/* SECTION 1: TOP AREA (TALL VERTICAL CARD ON LEFT + RIGHT CARDS) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start h-full flex-1 min-h-0">
        {/* ------------------------------------------------------------ */}
        {/* LEFT COLUMN: TOTAL AUM & 2 SQUARE TREASURY BLOCKS (SEJAJAR ATAS) */}
        {/* ------------------------------------------------------------ */}
        <div ref={leftColRef} className="lg:col-span-4 xl:col-span-4 flex flex-col gap-2.5 sm:gap-3">
          {/* Card 1: TOTAL AUM & Balance */}
          <div className={`${glassCard} flex flex-col justify-between flex-shrink-0`}>
            {/* Top: Total AUM & Balance */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                  TOTAL AUM • USD
                </span>
                <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  +18.4%
                </span>
              </div>

              <div className="mt-2.5 mb-2">
                <div className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-mono">
                  $142,850,290.40
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 text-xs font-mono">
                <span className="text-slate-400">PREV $120.65M</span>
                <span className="text-emerald-600 font-bold">+$22,199,707.30</span>
              </div>
            </div>

            {/* Middle: Clean Minimalist Allocation Track */}
            <div className="my-auto py-2.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold">CRYPTO ALLOCATION</span>
                <span className="text-indigo-600 font-extrabold">87.2%</span>
              </div>

              {/* 3D Progress Rail */}
              <div className="relative w-full h-3 bg-slate-200/90 rounded-full overflow-hidden p-0.5 shadow-inner border border-slate-300/40 flex gap-1">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] transition-all duration-700"
                  style={{ width: '87.2%' }}
                />
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full opacity-80"
                  style={{ width: '12.8%' }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-0.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  $124.56M CRYPTO
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  $18.29M FIAT
                </span>
              </div>
            </div>

            {/* Bottom: 4 Logo-only Quick Actions Dock (Clean & Minimalist, No Text, No Divider Line) */}
            <div className="pt-2 flex items-center justify-between gap-2">
              {/* 1. SEND */}
              <button
                type="button"
                onClick={() => setActiveModal('send')}
                title="Send"
                className="flex-1 h-10 sm:h-11 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-indigo-600 hover:text-indigo-800 flex items-center justify-center border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 stroke-[2.3]" />
              </button>

              {/* 2. ADD FUNDS */}
              <button
                type="button"
                onClick={() => setActiveModal('add_funds')}
                title="Add Funds"
                className="flex-1 h-10 sm:h-11 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-emerald-600 hover:text-emerald-800 flex items-center justify-center border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.3]" />
              </button>

              {/* 3. PAY BILLS */}
              <button
                type="button"
                onClick={() => setActiveModal('pay_bills')}
                title="Pay Bills"
                className="flex-1 h-10 sm:h-11 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-blue-600 hover:text-blue-800 flex items-center justify-center border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer"
              >
                <Receipt className="w-4 h-4 stroke-[2.3]" />
              </button>

              {/* 4. QR */}
              <button
                type="button"
                onClick={() => setActiveModal('qr')}
                title="QR Scan & Pay"
                className="flex-1 h-10 sm:h-11 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-amber-600 hover:text-amber-800 flex items-center justify-center border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer"
              >
                <QrCode className="w-4 h-4 stroke-[2.3]" />
              </button>
            </div>
          </div>

          {/* Treasury Section Divided into 2 Blocks (Side-by-Side Under Total AUM - Square Shape) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {/* Block 1: Treasury Arbitrage Settlement (Square 1:1) */}
            <div className={`${glassCard} w-full aspect-square flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase font-mono truncate">
                      TREASURY ARB
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded-full font-mono">
                    T+0
                  </span>
                </div>

                <div className="my-1">
                  <div className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight">
                    +$2.45M
                  </div>
                  <div className="text-[9px] font-bold text-slate-500 font-mono truncate mt-0.5">
                    USDT → BTC ARB
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-600 font-bold">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  CONFIRMED
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/70 text-[9px] font-mono text-slate-500 mt-1">
                <span>RECONCILED</span>
                <span className="text-emerald-600 font-bold">100%</span>
              </div>
            </div>

            {/* Block 2: Validator & Staking Yield (Square 1:1) */}
            <div className={`${glassCard} w-full aspect-square flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase font-mono truncate">
                      STAKING YIELD
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-indigo-600 bg-indigo-500/10 px-1.5 py-0.2 rounded-full font-mono">
                    +18.4%
                  </span>
                </div>

                <div className="my-1">
                  <div className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight">
                    +$182.4K
                  </div>
                  <div className="text-[9px] font-bold text-slate-500 font-mono truncate mt-0.5">
                    ETH VALIDATORS
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono text-indigo-600 font-bold">
                  <span className="w-1 h-1 rounded-full bg-indigo-500" />
                  ACCRUED
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/70 text-[9px] font-mono text-slate-500 mt-1">
                <span>GAS 12 GWEI</span>
                <span className="text-indigo-600 font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT COLUMN: 2 TOP KPI CARDS + 2 MIDDLE SPLIT VISUAL CARDS  */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-3 h-full flex-1 min-h-0">
          {/* Top Row in Right Column: 3 Split Executive KPI Cards */}
          <div ref={topKpiRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* 1. Net PnL + Micro Sparkline */}
            <div className={glassCard}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                  NET PNL • 30D
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 shadow-xs">
                  <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                  +32.6%
                </span>
              </div>

              <div className="flex items-end justify-between gap-1 my-1">
                <div className="text-xl xl:text-2xl font-black text-slate-800 tracking-tight font-mono">
                  +$14.29M
                </div>

                {/* Micro Sparkline Chart */}
                <div className="w-20 h-7 flex-shrink-0">
                  <svg viewBox="0 0 100 36" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="pnlSparklineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,28 Q 15,25 30,18 T 60,14 T 80,8 T 100,3 L 100,36 L 0,36 Z"
                      fill="url(#pnlSparklineGrad)"
                    />
                    <path
                      d="M 0,28 Q 15,25 30,18 T 60,14 T 80,8 T 100,3"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="3" r="3" fill="#2563eb" className="animate-pulse" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-[11px] font-mono">
                <span className="text-slate-400">WIN 74.2%</span>
                <span className="text-slate-700 font-bold">SHARPE 2.84</span>
              </div>
            </div>

            {/* 2. BTC Holding Balance & Fiat Equivalent */}
            <div className={glassCard}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                  BTC HOLDINGS
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-xs">
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  +4.12%
                </span>
              </div>

              <div className="my-1">
                <div className="text-xl xl:text-2xl font-black text-slate-800 tracking-tight font-mono">
                  1,842.60 BTC
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-[11px] font-mono">
                <span className="text-slate-400">FIAT EQUIV.</span>
                <span className="text-slate-800 font-black">≈ $124.56M</span>
              </div>
            </div>

            {/* 3. 24H Volume & Execution Velocity */}
            <div className={glassCard}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                  24H VOLUME
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-xs">
                  <Activity className="w-3 h-3 stroke-[2.5]" />
                  +18.4%
                </span>
              </div>

              <div className="flex items-end justify-between gap-1 my-1">
                <div className="text-xl xl:text-2xl font-black text-slate-800 tracking-tight font-mono">
                  $52,180,000
                </div>

                {/* Micro Volume Bars */}
                <div className="flex items-end gap-1 h-6 pb-0.5 flex-shrink-0">
                  <div className="w-1.5 h-3 bg-emerald-400/60 rounded-xs" />
                  <div className="w-1.5 h-4.5 bg-emerald-400/80 rounded-xs" />
                  <div className="w-1.5 h-3.5 bg-emerald-500 rounded-xs" />
                  <div className="w-1.5 h-5 bg-emerald-500 rounded-xs" />
                  <div className="w-1.5 h-6 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-xs animate-pulse" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-[11px] font-mono">
                <span className="text-slate-400">FILL 99.98%</span>
                <span className="text-emerald-600 font-bold">12ms SPEED</span>
              </div>
            </div>
          </div>

          {/* Middle Row in Right Column: Flowing Chart (Taller, Unaligned) + Compact Square Donut Card */}
          <div className="flex flex-col lg:flex-row gap-3 items-start flex-1">
            {/* Visual 1: Chart Mengalir (Sejajar Bagian Bawah dengan Blok Treasury Kiri) */}
            <div
              className={`${glassCard} flex-1 min-w-0 flex flex-col justify-between`}
              style={chartHeight ? { height: `${chartHeight}px` } : undefined}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                    CAPITAL FLOW STREAM • REAL-TIME
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono truncate">
                      $18,420,000
                    </span>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-500/10 px-1.5 py-0.2 rounded-full border border-indigo-500/20 font-mono">
                      +24.8% FLOW
                    </span>
                  </div>
                </div>

                {/* Timeframe Pills */}
                <div className="flex items-center gap-0.5 p-0.5 bg-slate-200/70 rounded-full border border-slate-300/60 shadow-inner">
                  {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setActiveTimeframe(tf)}
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono transition-all cursor-pointer ${
                        activeTimeframe === tf
                          ? 'bg-gradient-to-b from-[#2d3748] to-[#0f172a] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dedicated Flowing Stream Chart SVG (Scales to align bottom) */}
              <div className="w-full flex-1 min-h-[140px] relative my-1">
                <svg viewBox="0 0 320 150" className="w-full h-full overflow-visible">
                  <defs>
                    {/* Primary Flow Gradient */}
                    <linearGradient id="flowStreamGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Secondary Ambient Flow Gradient */}
                    <linearGradient id="flowAmbientGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Flow Guide Gridlines */}
                  <line x1="0" y1="30" x2="320" y2="30" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="0" y1="75" x2="320" y2="75" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="0" y1="115" x2="320" y2="115" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="0" y1="145" x2="320" y2="145" stroke="#94a3b8" opacity="0.7" />

                  {/* Secondary Undercurrent Wave */}
                  <path
                    d="M 0,120 Q 40,95 80,105 T 160,85 T 240,100 T 320,65 L 320,145 L 0,145 Z"
                    fill="url(#flowAmbientGrad)"
                  />
                  <path
                    d="M 0,120 Q 40,95 80,105 T 160,85 T 240,100 T 320,65"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    opacity="0.7"
                  />

                  {/* Primary Flowing Stream Wave (Active dataset) */}
                  {(() => {
                    const pts = currentDataset.pts1;
                    const stepX = 320 / (pts.length - 1);
                    const maxVal = 85;
                    const pointsCoord = pts.map((val, i) => ({
                      x: i * stepX,
                      y: 145 - (val / maxVal) * 125,
                    }));

                    const dCurve = pointsCoord.reduce((acc, curr, i, arr) => {
                      if (i === 0) return `M ${curr.x},${curr.y}`;
                      const prev = arr[i - 1];
                      const cx1 = prev.x + (curr.x - prev.x) / 2;
                      const cy1 = prev.y;
                      const cx2 = prev.x + (curr.x - prev.x) / 2;
                      const cy2 = curr.y;
                      return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${curr.x},${curr.y}`;
                    }, '');

                    const dArea = `${dCurve} L 320,145 L 0,145 Z`;

                    return (
                      <>
                        <path d={dArea} fill="url(#flowStreamGrad)" />
                        <path
                          d={dCurve}
                          fill="none"
                          stroke="#4f46e5"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                        {pointsCoord.map((p, i) => (
                          <g key={i}>
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={hoveredPoint === i ? 5 : 2.5}
                              fill="#4f46e5"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              className="cursor-pointer transition-all"
                              onMouseEnter={() => setHoveredPoint(i)}
                              onMouseLeave={() => setHoveredPoint(null)}
                            />
                            {hoveredPoint === i && (
                              <text
                                x={p.x}
                                y={Math.max(18, p.y - 10)}
                                textAnchor="middle"
                                className="text-[10px] font-mono font-bold fill-indigo-700"
                              >
                                ${(pts[i] * 0.23).toFixed(2)}M
                              </text>
                            )}
                          </g>
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 text-[11px] font-mono text-slate-500">
                <span>PEAK FLOW $19.10M</span>
                <span className="text-indigo-600 font-bold">VELOCITY 94.2%</span>
              </div>
            </div>

            {/* Right Column in Middle Row: Allocation Square + New Elongated Block Underneath */}
            <div className="w-full lg:w-[220px] xl:w-[240px] flex-shrink-0 flex flex-col gap-3 h-full justify-between min-h-0">
              {/* Visual 2: "lingkaran bentuknya kotak di tepi" (Bentuk Persegi 1:1, Tidak Terlalu Lebar) */}
              <div className={`${glassCard} w-full aspect-square flex-shrink-0 flex flex-col justify-between`}>
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                      ALLOCATION
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono">
                        78.4%
                      </span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1 py-0.2 rounded-full border border-emerald-500/20 font-mono">
                        OPTIMAL
                      </span>
                    </div>
                  </div>

                  <div className="px-1.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-200/80 text-[9px] font-mono font-bold text-indigo-700">
                    MATRIX
                  </div>
                </div>

                {/* Square Donut (Squircle Radial Gauge) Visual */}
                <div className="flex items-center justify-center my-auto">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                    <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                      <defs>
                        <linearGradient id="outerSquareGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="innerSquareGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                      </defs>

                      {/* Outer Square Donut Track (P = 478.8) */}
                      <rect
                        x="15"
                        y="15"
                        width="130"
                        height="130"
                        rx="24"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                      />
                      {/* Outer Square Donut Progress: 78.4% (offset = 478.8 * 0.216 = 103.4) */}
                      <rect
                        x="15"
                        y="15"
                        width="130"
                        height="130"
                        rx="24"
                        fill="none"
                        stroke="url(#outerSquareGrad)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="478.8"
                        strokeDashoffset="103.4"
                        className="transition-all duration-700"
                      />

                      {/* Inner Square Donut Track (P = 348.5) */}
                      <rect
                        x="33"
                        y="33"
                        width="94"
                        height="94"
                        rx="16"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      {/* Inner Square Donut Progress: 62.1% (offset = 348.5 * 0.379 = 132.1) */}
                      <rect
                        x="33"
                        y="33"
                        width="94"
                        height="94"
                        rx="16"
                        fill="none"
                        stroke="url(#innerSquareGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="348.5"
                        strokeDashoffset="132.1"
                        className="transition-all duration-700"
                      />
                    </svg>

                    {/* Center Readout inside the Square Donut */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-center pointer-events-none">
                      <span className="text-lg sm:text-xl font-black text-slate-800 leading-none">
                        78.4%
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        UTILIZED
                      </span>
                    </div>
                  </div>
                </div>

                {/* Square Legend Breakdown */}
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 text-[11px] font-mono text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-indigo-500 to-cyan-400" />
                    LIQUID 78%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-emerald-500 to-emerald-400" />
                    YIELD 62%
                  </span>
                </div>
              </div>

              {/* Block Tambahan Di Bawahnya: Lebar Sama, Panjang ke Bawah Sampai Tepi Layar */}
              <div className={`${glassCard} w-full flex-1 min-h-0 flex flex-col justify-between overflow-hidden`}>
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                        DEPLOYED POOLS
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-500/10 px-1.5 py-0.5 rounded-full border border-indigo-200/80 font-mono">
                      LIVE DEPTH
                    </span>
                  </div>

                  {/* List Asset Pools with Responsive Vertical Spacing */}
                  <div className="flex-1 flex flex-col justify-around py-1 font-mono">
                    {/* Pool 1: BTC */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          BTC VAULT
                        </span>
                        <span className="text-slate-800 font-extrabold">$64.20M</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full w-[51.5%]" />
                      </div>
                    </div>

                    {/* Pool 2: ETH */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          ETH STAKING
                        </span>
                        <span className="text-slate-800 font-extrabold">$36.80M</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full w-[29.5%]" />
                      </div>
                    </div>

                    {/* Pool 3: USDC */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          USDC TREASURY
                        </span>
                        <span className="text-slate-800 font-extrabold">$15.40M</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full w-[12.4%]" />
                      </div>
                    </div>

                    {/* Pool 4: SOL */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          SOL MATRIX
                        </span>
                        <span className="text-slate-800 font-extrabold">$8.16M</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full w-[6.6%]" />
                      </div>
                    </div>

                    {/* Pool 5: AVAX */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          AVAX SUBNET
                        </span>
                        <span className="text-slate-800 font-extrabold">$4.10M</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full w-[3.3%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Status */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-[10px] font-mono text-slate-500 mt-1">
                  <span className="text-slate-400">AUTO-BALANCED</span>
                  <span className="text-emerald-600 font-bold">99.8% READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* QUICK ACTION INTERACTIVE MODAL OVERLAYS                        */}
      {/* ============================================================== */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-md bg-gradient-to-b from-white via-slate-50 to-[#eef4fb] rounded-[28px] border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-400 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-xs">
                  {activeModal === 'send' && <Send className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'add_funds' && <PlusCircle className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'pay_bills' && <Receipt className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'qr' && <QrCode className="w-4 h-4 stroke-[2.5]" />}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 font-mono">
                    {activeModal === 'send' && 'SEND ASSETS'}
                    {activeModal === 'add_funds' && 'ADD FUNDS'}
                    {activeModal === 'pay_bills' && 'PAY BILLS & INVOICES'}
                    {activeModal === 'qr' && 'QR CODE SCAN & PAY'}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    INSTANT SETTLEMENT • T+0
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Based on Action */}
            {activeModal === 'send' && (
              <div className="flex flex-col gap-3 font-mono">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                    RECIPIENT ADDRESS / ENS
                  </label>
                  <input
                    type="text"
                    defaultValue="0x91a...3c24"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                    AMOUNT (USD / ASSET)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="50,000.00"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                    <span className="absolute right-3 top-2 text-xs font-extrabold text-indigo-600">
                      USD
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md active:translate-y-0.5 transition-all cursor-pointer"
                >
                  CONFIRM TRANSFER
                </button>
              </div>
            )}

            {activeModal === 'add_funds' && (
              <div className="flex flex-col gap-3 font-mono">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">WIRE TRANSFER / ACH</span>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    FEE 0%
                  </span>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                    DEPOSIT AMOUNT
                  </label>
                  <input
                    type="text"
                    defaultValue="$100,000.00"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-800 outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md active:translate-y-0.5 transition-all cursor-pointer"
                >
                  PROCEED DEPOSIT
                </button>
              </div>
            )}

            {activeModal === 'pay_bills' && (
              <div className="flex flex-col gap-2.5 font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">AWS CLOUD HPC CLUSTER</div>
                    <div className="text-[10px] text-slate-400">INV #849102 • DUE TODAY</div>
                  </div>
                  <span className="text-sm font-black text-slate-800">$18,450.00</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">EQUINIX TYO DATA CENTER</div>
                    <div className="text-[10px] text-slate-400">INV #229411 • DUE 3 DAYS</div>
                  </div>
                  <span className="text-sm font-black text-slate-800">$12,300.00</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md active:translate-y-0.5 transition-all cursor-pointer"
                >
                  PAY SELECTED INVOICES
                </button>
              </div>
            )}

            {activeModal === 'qr' && (
              <div className="flex flex-col items-center gap-3 font-mono text-center">
                <div className="w-44 h-44 bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 45 45" className="w-full h-full">
                    <rect x="2" y="2" width="12" height="12" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                    <rect x="5.5" y="5.5" width="5" height="5" fill="#1e293b" />
                    <rect x="31" y="2" width="12" height="12" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                    <rect x="34.5" y="5.5" width="5" height="5" fill="#1e293b" />
                    <rect x="2" y="31" width="12" height="12" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                    <rect x="5.5" y="34.5" width="5" height="5" fill="#1e293b" />
                    <rect x="18" y="4" width="3" height="3" fill="#1e293b" />
                    <rect x="24" y="6" width="3" height="3" fill="#1e293b" />
                    <rect x="18" y="10" width="3" height="3" fill="#1e293b" />
                    <rect x="6" y="18" width="3" height="3" fill="#1e293b" />
                    <rect x="10" y="22" width="3" height="3" fill="#1e293b" />
                    <rect x="18" y="18" width="8" height="8" rx="2" fill="#4f46e5" />
                    <rect x="30" y="18" width="3" height="3" fill="#1e293b" />
                    <rect x="36" y="22" width="3" height="3" fill="#1e293b" />
                    <rect x="18" y="30" width="3" height="3" fill="#1e293b" />
                    <rect x="24" y="36" width="3" height="3" fill="#1e293b" />
                    <rect x="32" y="32" width="4" height="4" fill="#1e293b" />
                    <rect x="38" y="38" width="4" height="4" fill="#1e293b" />
                  </svg>
                </div>
                <div className="text-xs font-bold text-slate-800 break-all px-4">
                  {walletAddress}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md hover:bg-slate-800"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedAddress ? 'ADDRESS COPIED' : 'COPY WALLET ADDRESS'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
