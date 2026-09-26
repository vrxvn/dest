import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  TrendingUp,
  ArrowLeftRight,
  Coins,
  Sparkles,
  PieChart,
  Users,
  ShieldCheck,
  Server,
  Scale,
  SlidersHorizontal,
  FileBarChart,
  Send,
  PlusCircle,
  Activity,
  Zap,
  Check,
  X,
  Copy,
  ChevronRight,
} from 'lucide-react';
import {
  EmployeeTrade,
  INITIAL_EMPLOYEE_TRADES,
  TRADE_STREAM_POOL,
  CHART_DATASETS as chartDatasets,
  DUMMY_WALLET_ADDRESS as walletAddress,
  GLOBAL_INSTITUTIONAL_INVESTMENTS,
  LIVE_MARKET_TICKERS,
} from '../data/dummyData';

interface DashboardGridProps {
  onNavigate?: (menuId: string) => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({ onNavigate }) => {
  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Live Employee Global Trading Desk state
  const [employeeTrades, setEmployeeTrades] = useState<EmployeeTrade[]>(INITIAL_EMPLOYEE_TRADES);
  const [tradeCount, setTradeCount] = useState(148);

  useEffect(() => {
    let poolIndex = 0;
    const interval = setInterval(() => {
      const template = TRADE_STREAM_POOL[poolIndex % TRADE_STREAM_POOL.length];
      poolIndex++;

      setEmployeeTrades((prev) => {
        const newTrade: EmployeeTrade = {
          id: `trade-${Date.now()}-${Math.random()}`,
          ...template,
          timestamp: 'Baru saja',
        };
        const updatedPrev = prev.slice(0, 5).map((t, idx) => ({
          ...t,
          timestamp: idx === 0 ? '3 dtk lalu' : idx === 1 ? '8 dtk lalu' : idx === 2 ? '15 dtk lalu' : '26 dtk lalu',
        }));
        return [newTrade, ...updatedPrev];
      });

      setTradeCount((c) => c + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Quick Action Modal state (Replaced retail locks with institutional actions)
  const [activeModal, setActiveModal] = useState<'trade_order' | 'deposit' | 'fx_swap' | 'vault_sign' | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Synchronize bottom of Capital Flow card with bottom of Treasury & Staking blocks
  const treasuryRef = useRef<HTMLDivElement>(null);
  const capitalRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const [capitalHeight, setCapitalHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const syncAlignment = () => {
      if (treasuryRef.current && capitalRef.current && window.innerWidth >= 1024) {
        const treasuryBottom = treasuryRef.current.getBoundingClientRect().bottom;
        const capitalTop = capitalRef.current.getBoundingClientRect().top;
        const targetHeight = treasuryBottom - capitalTop;
        if (targetHeight > 100) {
          const newH = Math.round(targetHeight);
          setCapitalHeight((prev) => (prev === newH ? prev : newH));
          return;
        }
      }
      setCapitalHeight(undefined);
    };

    const rafId = requestAnimationFrame(syncAlignment);
    window.addEventListener('resize', syncAlignment);

    const observer = new ResizeObserver(syncAlignment);
    if (treasuryRef.current) observer.observe(treasuryRef.current);
    if (topRowRef.current) observer.observe(topRowRef.current);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', syncAlignment);
      observer.disconnect();
    };
  }, []);

  const currentDataset = chartDatasets[activeTimeframe] || chartDatasets['1M'];

  // Super Solid 3D Ceramic Glass aesthetic matching the 3D solid sidebar
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[22px] sm:rounded-[26px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3.5 sm:p-4 flex flex-col justify-between transition-all';

  // Super Solid 3D Tactile Button
  const solid3DButton =
    'relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e4eaf4] text-slate-700 hover:text-slate-950 border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3.5px] border-b-slate-300 shadow-[0_5px_10px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(148,163,184,0.35)] hover:brightness-105 active:border-b-[1.5px] active:translate-y-[1.5px] transition-all cursor-pointer group outline-none';

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden">
      {/* ============================================================== */}
      {/* SECTION 1: TOP AREA (TALL VERTICAL CARD ON LEFT + RIGHT CARDS) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full flex-1 min-h-0">
        {/* ------------------------------------------------------------ */}
        {/* LEFT COLUMN: TOTAL AUM & 2 SQUARE TREASURY BLOCKS + NEW VAULT BLOCK */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-2.5 sm:gap-3 h-full min-h-0">
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
                  +23.1% (+27.4% YTD)
                </span>
              </div>

              <div className="mt-2.5 mb-2">
                <div className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-mono">
                  $15,324,000.00
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 text-xs font-mono">
                <span className="text-slate-400">COMMITTED $12.45M</span>
                <span className="text-emerald-600 font-bold">+$2,874,000.00 (+23.1%)</span>
              </div>
            </div>

            {/* Middle: Clean Minimalist Allocation Track (Synchronized to CryptoView $6,397,000.00 = 41.7%) */}
            <div className="my-auto py-2.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold">CRYPTO ALLOCATION</span>
                <span className="text-indigo-600 font-extrabold">41.7%</span>
              </div>

              {/* 3D Progress Rail */}
              <div className="relative w-full h-3 bg-slate-200/90 rounded-full overflow-hidden p-0.5 shadow-inner border border-slate-300/40 flex gap-1">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] transition-all duration-700"
                  style={{ width: '41.7%' }}
                />
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full opacity-80"
                  style={{ width: '58.3%' }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-0.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  $6.40M CRYPTO (41.7%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  $8.93M FIAT / TREASURY (58.3%)
                </span>
              </div>
            </div>

            {/* Bottom: 4 Synchronized Core Desk Launchers (Preserves exact dock layout & 3D solid styling) */}
            <div className="pt-2 flex items-center justify-between gap-2">
              {/* 1. TRADING DESK */}
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('trading') : setActiveModal('trade_order')}
                title="Trading Desk • PnL +$384.5K (Buka Trading Operations)"
                className="group relative flex-1 h-10 sm:h-11 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-indigo-600 hover:text-indigo-800 flex items-center justify-center border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 stroke-[2.3]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-white" />
              </button>

              {/* 2. FX FLOW DESK */}
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('fx-flow') : setActiveModal('fx_swap')}
                title="FX Flow Desk • $1.84M Flow (Buka FX Flow)"
                className="group relative flex-1 h-10 sm:h-11 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-emerald-600 hover:text-emerald-800 flex items-center justify-center border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer"
              >
                <ArrowLeftRight className="w-4 h-4 stroke-[2.3]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse border border-white" />
              </button>

              {/* 3. CRYPTO VAULT */}
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('crypto') : setActiveModal('vault_sign')}
                title="Crypto Vault Desk • $6.40M On-Chain (41.7% AUM) (Buka Crypto & Cold Vault)"
                className="group relative flex-1 h-10 sm:h-11 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-blue-600 hover:text-blue-800 flex items-center justify-center border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer"
              >
                <Coins className="w-4 h-4 stroke-[2.3]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse border border-white" />
              </button>

              {/* 4. GENESIS QUANT AI */}
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('genesis') : setActiveModal('trade_order')}
                title="Genesis Quant AI • Sharpe 3.55 (Buka Genesis AI Models)"
                className="group relative flex-1 h-10 sm:h-11 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-amber-600 hover:text-amber-800 flex items-center justify-center border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 stroke-[2.3]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500 animate-pulse border border-white" />
              </button>
            </div>
          </div>

          {/* Treasury Section Divided into 2 Blocks (Side-by-Side Under Total AUM - Square Shape) */}
          <div ref={treasuryRef} className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {/* Block 1: Treasury Arbitrage Settlement (Square 1:1 - Synchronized to FX Flow) */}
            <div
              onClick={() => onNavigate?.('fx-flow')}
              title="Klik untuk membuka menu FX Flow & Arbitrage Desk"
              className={`${glassCard} w-full aspect-square flex flex-col justify-between overflow-hidden p-2.5 sm:p-3 cursor-pointer hover:border-indigo-300 hover:brightness-105 active:translate-y-[1px] group`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 group-hover:text-indigo-600 uppercase font-mono truncate transition-colors">
                      TREASURY ARB
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded-full font-mono">
                    T+0
                  </span>
                </div>

                <div className="my-1">
                  <div className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight group-hover:text-indigo-900 transition-colors">
                    +$245.0K
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
                <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                  100% <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
            </div>

            {/* Block 2: Validator & Staking Yield (Square 1:1 - Synchronized to Crypto) */}
            <div
              onClick={() => onNavigate?.('crypto')}
              title="Klik untuk membuka menu Crypto & Staking Nodes"
              className={`${glassCard} w-full aspect-square flex flex-col justify-between overflow-hidden p-2.5 sm:p-3 cursor-pointer hover:border-indigo-300 hover:brightness-105 active:translate-y-[1px] group`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[9px] font-bold tracking-wider text-slate-400 group-hover:text-indigo-600 uppercase font-mono truncate transition-colors">
                      STAKING YIELD
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-indigo-600 bg-indigo-500/10 px-1.5 py-0.2 rounded-full font-mono">
                    +8.2%
                  </span>
                </div>

                <div className="my-1">
                  <div className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight group-hover:text-indigo-900 transition-colors">
                    +$42.5K
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
                <span className="text-indigo-600 font-bold flex items-center gap-0.5">
                  ACTIVE <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
            </div>
          </div>

          {/* Block Tambahan Di Bawah Treasury: Singkatan Perusahaan Financial Global & Jumlah Investasi (Synchronized to Investor Desk) */}
          <div
            onClick={() => onNavigate?.('investor')}
            title="Klik untuk membuka menu Investor LP Desk"
            className={`${glassCard} flex-1 min-h-0 flex flex-col justify-between overflow-hidden p-3 sm:p-3.5 cursor-pointer hover:border-indigo-300 hover:brightness-105 active:translate-y-[1px] group`}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 group-hover:text-indigo-700 uppercase font-mono truncate transition-colors">
                    INSTITUSI FINANCIAL GLOBAL
                  </span>
                </div>
                <span className="text-[8px] font-bold text-indigo-700 bg-indigo-500/10 px-1.5 py-0.5 rounded-full border border-indigo-200/80 font-mono flex-shrink-0">
                  {GLOBAL_INSTITUTIONAL_INVESTMENTS.totalCount}
                </span>
              </div>

              {/* Total Dana Investasi */}
              <div className="flex items-baseline justify-between gap-2 mt-0.5 mb-1.5">
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase font-mono">
                    TOTAL INVESTASI INSTITUSIONAL
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-800 font-mono tracking-tight group-hover:text-indigo-900 transition-colors">
                    {GLOBAL_INSTITUTIONAL_INVESTMENTS.totalInvestment}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-500/20">
                    {GLOBAL_INSTITUTIONAL_INVESTMENTS.growth}
                  </span>
                </div>
              </div>
            </div>

            {/* List Singkatan Perusahaan Financial Global & Jumlah Investasi */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 min-h-0">
              {GLOBAL_INSTITUTIONAL_INVESTMENTS.investors.map((company, idx) => (
                <div
                  key={company.code}
                  className={`py-1.5 px-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/90 border-b-2 border-b-slate-300 shadow-[0_2px_4px_rgba(15,23,42,0.04),inset_0_1px_1px_white] flex items-center justify-between gap-2 transition-all font-mono ${
                    idx === 0 ? 'ring-1 ring-indigo-500/30' : ''
                  }`}
                >
                  {/* Singkatan Nama Perusahaan Finansial Global */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-7 rounded-lg bg-gradient-to-b from-indigo-50 to-indigo-100/70 border border-indigo-200/80 text-indigo-700 font-black text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                      {company.code}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-extrabold text-slate-800 truncate leading-tight">
                        {company.name}
                      </div>
                      <div className="text-[8px] text-slate-400 font-medium">
                        PORTOFOLIO {company.share}
                      </div>
                    </div>
                  </div>

                  {/* Jumlah Investasi */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs sm:text-[13px] font-black text-slate-900 tracking-tight">
                      {company.investment}
                    </div>
                    <span className="text-[8px] font-bold text-emerald-600 uppercase">
                      {company.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 text-[9px] font-mono text-slate-500 mt-1 flex-shrink-0">
              <span className="text-slate-400">KONSORSIUM RESMI</span>
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                100% TERVERIFIKASI (INVESTOR DESK →)
              </span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT COLUMN: 2 TOP KPI CARDS + 2 MIDDLE SPLIT VISUAL CARDS  */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-3 h-full flex-1 min-h-0">
          {/* Top Row in Right Column: 3 Split Executive KPI Cards (Synchronized to Trading & Crypto) */}
          <div ref={topRowRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* 1. Net PnL + Micro Sparkline (Synchronized to Trading Desk) */}
            <div
              onClick={() => onNavigate?.('trading')}
              title="Klik untuk membuka menu Trading Operations Desk"
              className={`${glassCard} cursor-pointer hover:border-indigo-300 hover:brightness-105 active:translate-y-[1px] group`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 group-hover:text-indigo-600 uppercase font-mono transition-colors">
                  NET PNL • 30D
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 shadow-xs">
                  <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                  +32.6%
                </span>
              </div>

              <div className="flex items-end justify-between gap-1 my-1">
                <div className="text-xl xl:text-2xl font-black text-slate-800 tracking-tight font-mono group-hover:text-indigo-900 transition-colors">
                  +$384,500
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
                <span className="text-slate-700 font-bold flex items-center gap-0.5">
                  SHARPE 3.55 <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
            </div>

            {/* 2. BTC Holding Balance & Fiat Equivalent (Synchronized to Crypto Desk) */}
            <div
              onClick={() => onNavigate?.('crypto')}
              title="Klik untuk membuka menu Crypto & Digital Assets Desk"
              className={`${glassCard} cursor-pointer hover:border-amber-300 hover:brightness-105 active:translate-y-[1px] group`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 group-hover:text-amber-700 uppercase font-mono transition-colors">
                  BTC HOLDINGS
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-xs">
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  +4.12%
                </span>
              </div>

              <div className="my-1">
                <div className="text-xl xl:text-2xl font-black text-slate-800 tracking-tight font-mono group-hover:text-amber-900 transition-colors">
                  35.50 BTC
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-[11px] font-mono">
                <span className="text-slate-400">FIAT EQUIV.</span>
                <span className="text-slate-800 font-black flex items-center gap-0.5">
                  ≈ $2,425,000 <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
            </div>

            {/* 3. 24H Volume & Execution Velocity (Synchronized to Trading Desk) */}
            <div
              onClick={() => onNavigate?.('trading')}
              title="Klik untuk membuka menu Trading Operations Desk"
              className={`${glassCard} cursor-pointer hover:border-emerald-300 hover:brightness-105 active:translate-y-[1px] group`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 group-hover:text-emerald-700 uppercase font-mono transition-colors">
                  24H VOLUME
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-xs">
                  <Activity className="w-3 h-3 stroke-[2.5]" />
                  +18.4%
                </span>
              </div>

              <div className="flex items-end justify-between gap-1 my-1">
                <div className="text-xl xl:text-2xl font-black text-slate-800 tracking-tight font-mono group-hover:text-emerald-900 transition-colors">
                  $3,250,000
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
                <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                  12ms SPEED <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
            </div>
          </div>

          {/* Middle Row in Right Column: Flowing Chart (Posisi Semula) + Block Tambahan Di Bawahnya + Square Donut Column */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch flex-1 min-h-0">
            {/* Center Column: Flowing Chart (Posisi Semula) + 1 Block Tambahan Di Bawahnya */}
            <div className="flex-1 min-w-0 flex flex-col gap-3 h-full justify-between min-h-0">
              {/* Visual 1: Chart Mengalir (Sejajar Bawah dengan Treasury & Staking) */}
              <div
                ref={capitalRef}
                className={`${glassCard} flex-shrink-0 flex flex-col justify-between`}
                style={capitalHeight ? { height: `${capitalHeight}px` } : undefined}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                      CAPITAL FLOW STREAM • REAL-TIME
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono truncate">
                        $1,842,000
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

                {/* Dedicated Flowing Stream Chart SVG (Scales to fill synchronized card height) */}
                <div className="w-full flex-1 min-h-[120px] relative my-1">
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
                  <span>PEAK FLOW $2.45M</span>
                  <span className="text-indigo-600 font-bold">VELOCITY 94.2%</span>
                </div>
              </div>

              {/* Bagian Bawah Chart: 2 Blok Berdampingan + 1 Blok Lebar Penuh untuk 1 Nama Skill & Profit */}
              <div className="flex-1 min-h-0 flex flex-col gap-2 sm:gap-2.5 justify-between">
                {/* 2 Blok Berdampingan: Live Ticker Pasar Global Utama */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 flex-1 min-h-0">
                  {/* Blok 1: Pasar Kripto Utama (BTC & ETH) */}
                  <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                          <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono truncate">
                            {LIVE_MARKET_TICKERS.crypto.title}
                          </span>
                        </div>
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded-full border border-emerald-500/20 font-mono flex-shrink-0">
                          {LIVE_MARKET_TICKERS.crypto.status}
                        </span>
                      </div>

                      {/* 2 Live Tickers (BTC & ETH) */}
                      <div className="grid grid-cols-2 gap-1.5 my-1">
                        {/* BTC */}
                        <div className="p-2 rounded-xl bg-gradient-to-b from-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/80 border-b-[2px] border-b-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(15,23,42,0.03)] font-mono">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                            <span>{LIVE_MARKET_TICKERS.crypto.primary.symbol}</span>
                            <span className="text-emerald-600 font-extrabold">{LIVE_MARKET_TICKERS.crypto.primary.change}</span>
                          </div>
                          <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight mt-0.5">
                            {LIVE_MARKET_TICKERS.crypto.primary.price}
                          </div>
                        </div>

                        {/* ETH */}
                        <div className="p-2 rounded-xl bg-gradient-to-b from-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/80 border-b-[2px] border-b-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(15,23,42,0.03)] font-mono">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                            <span>{LIVE_MARKET_TICKERS.crypto.secondary.symbol}</span>
                            <span className="text-emerald-600 font-extrabold">{LIVE_MARKET_TICKERS.crypto.secondary.change}</span>
                          </div>
                          <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight mt-0.5">
                            {LIVE_MARKET_TICKERS.crypto.secondary.price}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/70 text-[9px] font-mono text-slate-500">
                      <span>{LIVE_MARKET_TICKERS.crypto.footerLeft}</span>
                      <span className="text-indigo-600 font-bold">{LIVE_MARKET_TICKERS.crypto.footerRight}</span>
                    </div>
                  </div>

                  {/* Blok 2: Komoditas & Valuta Global (XAU Emas & BRENT Minyak) */}
                  <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                          <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono truncate">
                            {LIVE_MARKET_TICKERS.commodities.title}
                          </span>
                        </div>
                        <span className="text-[8px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.2 rounded-full border border-amber-500/20 font-mono flex-shrink-0">
                          {LIVE_MARKET_TICKERS.commodities.status}
                        </span>
                      </div>

                      {/* 2 Live Tickers (XAU Emas & BRENT Minyak) */}
                      <div className="grid grid-cols-2 gap-1.5 my-1">
                        {/* XAU Emas */}
                        <div className="p-2 rounded-xl bg-gradient-to-b from-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/80 border-b-[2px] border-b-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(15,23,42,0.03)] font-mono">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                            <span>{LIVE_MARKET_TICKERS.commodities.primary.symbol}</span>
                            <span className="text-emerald-600 font-extrabold">{LIVE_MARKET_TICKERS.commodities.primary.change}</span>
                          </div>
                          <div className="text-sm sm:text-base font-black text-amber-700 tracking-tight mt-0.5">
                            {LIVE_MARKET_TICKERS.commodities.primary.price}
                            <span className="text-[9px] text-slate-400 font-normal ml-0.5">{LIVE_MARKET_TICKERS.commodities.primary.unit}</span>
                          </div>
                        </div>

                        {/* BRENT Minyak */}
                        <div className="p-2 rounded-xl bg-gradient-to-b from-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/80 border-b-[2px] border-b-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(15,23,42,0.03)] font-mono">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                            <span>{LIVE_MARKET_TICKERS.commodities.secondary.symbol}</span>
                            <span className="text-emerald-600 font-extrabold">{LIVE_MARKET_TICKERS.commodities.secondary.change}</span>
                          </div>
                          <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight mt-0.5">
                            {LIVE_MARKET_TICKERS.commodities.secondary.price}
                            <span className="text-[9px] text-slate-400 font-normal ml-0.5">{LIVE_MARKET_TICKERS.commodities.secondary.unit}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/70 text-[9px] font-mono text-slate-500">
                      <span>{LIVE_MARKET_TICKERS.commodities.footerLeft}</span>
                      <span className="text-indigo-600 font-bold">{LIVE_MARKET_TICKERS.commodities.footerRight}</span>
                    </div>
                  </div>
                </div>

                {/* 1 Blok di Bawahnya: Super Solid 3D, Lebar Penuh Sama (Synchronized to Genesis Quant AI) */}
                <div
                  onClick={() => onNavigate?.('genesis')}
                  title="Klik untuk membuka menu Genesis Quant AI Engine"
                  className="flex-shrink-0 flex items-center justify-between py-2 sm:py-2.5 px-3 sm:px-3.5 min-h-[50px] sm:min-h-[54px] bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-xl sm:rounded-2xl border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3.5px] border-b-slate-300 shadow-[0_12px_24px_-4px_rgba(15,23,42,0.12),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2px_2.5px_rgba(148,163,184,0.3)] overflow-hidden cursor-pointer hover:border-indigo-300 hover:brightness-105 active:translate-y-[1px] group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-b from-[#ffffff] to-[#e4eaf4] text-indigo-600 border-t border-t-white border-x border-slate-200 border-b-2 border-b-slate-300 shadow-[0_2px_4px_rgba(0,0,0,0.06),inset_0_1px_1px_white] flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 stroke-[2.4] fill-indigo-500/20" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 leading-none mb-1">
                        <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider font-mono">
                          STRATEGY SKILL • GENESIS AI
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="text-xs sm:text-[13px] font-black text-slate-800 tracking-tight truncate font-mono leading-none group-hover:text-indigo-900 transition-colors">
                        QUANT MOMENTUM & FLASH ARBITRAGE
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 pl-2 font-mono">
                    <div className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">
                      REALISED PROFIT
                    </div>
                    <div className="flex items-center justify-end gap-1.5 leading-none">
                      <span className="text-xs sm:text-sm font-black text-emerald-600 tracking-tight">
                        +$384,250
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-bold text-emerald-700 bg-gradient-to-b from-emerald-50 to-emerald-100/90 px-1.5 py-0.5 rounded-md border-t border-t-emerald-200 border-b border-b-emerald-600/30 shadow-[0_1px_2px_rgba(16,185,129,0.15)] flex items-center gap-0.5">
                        +31.4% <ChevronRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column in Middle Row: Allocation Square + New Elongated Block Underneath */}
            <div className="w-full lg:w-[250px] xl:w-[270px] flex-shrink-0 flex flex-col gap-3 h-full justify-between min-h-0">
              {/* Visual 2: "lingkaran bentuknya kotak di tepi" (Bentuk Persegi 1:1 - Synchronized to Admin & Governance) */}
              <div
                onClick={() => onNavigate?.('admin')}
                title="Klik untuk membuka menu Admin & Risk Governance Desk"
                className={`${glassCard} w-full aspect-square flex-shrink-0 flex flex-col justify-between cursor-pointer hover:border-indigo-300 hover:brightness-105 active:translate-y-[1px] group`}
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 group-hover:text-indigo-600 uppercase font-mono transition-colors">
                      ALLOCATION MATRIX
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono group-hover:text-indigo-900 transition-colors">
                        78.4%
                      </span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1 py-0.2 rounded-full border border-emerald-500/20 font-mono">
                        OPTIMAL
                      </span>
                    </div>
                  </div>

                  <div className="px-1.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-200/80 text-[9px] font-mono font-bold text-indigo-700">
                    ADMIN DESK
                  </div>
                </div>

                {/* Square Donut (Squircle Radial Gauge) Visual */}
                <div className="flex items-center justify-center my-auto">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
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
                      <span className="text-base sm:text-lg font-black text-slate-800 leading-none">
                        78.4%
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        UTILIZED
                      </span>
                    </div>
                  </div>
                </div>

                {/* Synchronized Desk Badges (Security, Server, Legal, Report) */}
                <div className="pt-1.5 border-t border-slate-200/70 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-600">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-sm bg-gradient-to-br from-indigo-500 to-cyan-400" />
                      LIQUID 78%
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-sm bg-gradient-to-br from-emerald-500 to-emerald-400" />
                      YIELD 62%
                    </span>
                  </div>

                  {/* 4 Clickable Micro Desks Chips */}
                  <div className="grid grid-cols-2 gap-1 pt-0.5 text-[8px] font-mono">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onNavigate?.('security'); }}
                      className="flex items-center justify-between px-1.5 py-0.5 rounded-md bg-white/90 hover:bg-indigo-50 border border-slate-200/90 text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-0.5 font-bold">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> SEC
                      </span>
                      <span className="text-[7.5px] text-emerald-600 font-bold">DEFCON 5</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onNavigate?.('server'); }}
                      className="flex items-center justify-between px-1.5 py-0.5 rounded-md bg-white/90 hover:bg-indigo-50 border border-slate-200/90 text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-0.5 font-bold">
                        <Server className="w-2.5 h-2.5 text-indigo-600" /> NODE
                      </span>
                      <span className="text-[7.5px] text-indigo-600 font-bold">1.08ms</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onNavigate?.('legal'); }}
                      className="flex items-center justify-between px-1.5 py-0.5 rounded-md bg-white/90 hover:bg-indigo-50 border border-slate-200/90 text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-0.5 font-bold">
                        <Scale className="w-2.5 h-2.5 text-amber-600" /> LAW
                      </span>
                      <span className="text-[7.5px] text-emerald-600 font-bold">5/5 OK</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onNavigate?.('report'); }}
                      className="flex items-center justify-between px-1.5 py-0.5 rounded-md bg-white/90 hover:bg-indigo-50 border border-slate-200/90 text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-0.5 font-bold">
                        <FileBarChart className="w-2.5 h-2.5 text-blue-600" /> AUDIT
                      </span>
                      <span className="text-[7.5px] text-blue-600 font-bold">Q3 NAV</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Block Tambahan Di Bawahnya: Trader (Live Feed - Synchronized to Workforce) */}
              <div
                onClick={() => onNavigate?.('workforce')}
                title="Klik untuk membuka menu Workforce & Desk Personnel"
                className={`${glassCard} w-full flex-1 min-h-0 flex flex-col justify-between overflow-hidden p-3 sm:p-3.5 cursor-pointer hover:border-indigo-300 hover:brightness-105 active:translate-y-[1px] group`}
              >
                <div className="flex flex-col flex-1 min-h-0">
                  {/* Header: Title "Trader" */}
                  <div className="flex items-center justify-between gap-1 mb-2 flex-shrink-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                      <span className="text-xs font-black tracking-wider text-slate-800 group-hover:text-indigo-700 uppercase font-mono transition-colors">
                        Trader Desk • Workforce
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-200/80 font-mono flex-shrink-0">
                      LIVE
                    </span>
                  </div>

                  {/* List of Trades: Nama Pasar & Kode Trader, Pos (Modal), Floating PnL, dan Aksi */}
                  <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 min-h-0">
                    {employeeTrades.slice(0, 6).map((trade, idx) => {
                      const isNegative = trade.floatingPnl.startsWith('-') || trade.isProfit === false;
                      return (
                        <div
                          key={trade.id}
                          className={`py-1.5 px-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/90 border-b-2 border-b-slate-300 shadow-[0_2px_4px_rgba(15,23,42,0.04),inset_0_1px_1px_white] flex flex-col gap-0.5 transition-all font-mono ${
                            idx === 0 ? 'ring-1 ring-indigo-500/30' : ''
                          }`}
                        >
                          {/* Baris 1: Pasar & Kode Trader + Aksi */}
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span
                                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                  idx === 0 ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500'
                                }`}
                              />
                              <span className="text-[11px] font-black text-slate-800 tracking-tight truncate">
                                {trade.market}
                              </span>
                              <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50/90 px-1 py-0.2 rounded border border-indigo-200/70 flex-shrink-0">
                                ({trade.employee})
                              </span>
                            </div>

                            {/* Aksi: BUY / SELL / TP */}
                            <span
                              className={`px-1.5 py-0.2 rounded text-[8px] font-black uppercase tracking-wider flex-shrink-0 border ${
                                trade.action === 'BUY'
                                  ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'
                                  : trade.action === 'SELL'
                                  ? 'bg-rose-500/15 text-rose-700 border-rose-500/30'
                                  : 'bg-indigo-500/15 text-indigo-700 border-indigo-300'
                              }`}
                            >
                              {trade.action}
                            </span>
                          </div>

                          {/* Baris 2: Pos (Modal Terpasang) & Floating PnL */}
                          <div className="flex items-center justify-between text-[9px] font-bold pt-0.5 border-t border-slate-200/60">
                            <span className="text-slate-500">
                              Pos: <span className="text-slate-800 font-extrabold">{trade.positionValue}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="text-slate-400">Floating:</span>
                              <span className={`font-black ${isNegative ? 'text-rose-600' : 'text-emerald-600'}`}>
                                {trade.floatingPnl}
                              </span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Status */}
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 text-[9px] font-mono text-slate-500 mt-1 flex-shrink-0">
                  <span className="text-slate-500 font-bold">TOTAL: {tradeCount} ORDER</span>
                  <span className="text-emerald-600 font-black flex items-center gap-0.5">
                    48 TRADER (WORKFORCE →)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* QUICK ACTION INTERACTIVE MODAL OVERLAYS (INSTITUTIONAL DESK)  */}
      {/* ============================================================== */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          onClick={() => { setActiveModal(null); setOrderSubmitted(false); }}
        >
          <div
            className="w-full max-w-md bg-gradient-to-b from-white via-slate-50 to-[#eef4fb] rounded-[28px] border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-400 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-xs">
                  {activeModal === 'trade_order' && <TrendingUp className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'deposit' && <PlusCircle className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'fx_swap' && <ArrowLeftRight className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'vault_sign' && <ShieldCheck className="w-4 h-4 stroke-[2.5]" />}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 font-mono">
                    {activeModal === 'trade_order' && 'FAST ORDER ROUTING'}
                    {activeModal === 'deposit' && 'PRIME CUSTODY INFLOW'}
                    {activeModal === 'fx_swap' && 'FX LIQUIDITY SWAP'}
                    {activeModal === 'vault_sign' && 'MULTI-SIG HSM SIGNER'}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    INSTITUTIONAL DESK • T+0 SETTLEMENT
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setActiveModal(null); setOrderSubmitted(false); }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Based on Action */}
            {activeModal === 'trade_order' && (
              <div className="flex flex-col gap-3 font-mono">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                    TARGET INSTRUMENT / MARKET
                  </label>
                  <select className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500">
                    <option value="BTC">BTC/USD (CME Liquid Desk) - $96,420</option>
                    <option value="NVDA">NVDA GLOBAL (Equities) - $142.50</option>
                    <option value="XAU">XAU/USD (Spot Gold) - $2,845.20</option>
                    <option value="ETH">ETH/USD (Native Desk) - $3,480.50</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                      SIDE
                    </label>
                    <div className="grid grid-cols-2 gap-1">
                      <button type="button" className="py-2 rounded-xl bg-emerald-600 text-white font-black text-xs">
                        BUY
                      </button>
                      <button type="button" className="py-2 rounded-xl bg-slate-200 text-slate-700 font-black text-xs hover:bg-slate-300">
                        SELL
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                      ALLOCATION (USD)
                    </label>
                    <input
                      type="text"
                      defaultValue="$50,000"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {orderSubmitted ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-xs font-bold text-emerald-800 block">✓ ORDER FILLED AT BEST PRICE (12ms)</span>
                    <button
                      type="button"
                      onClick={() => { setActiveModal(null); onNavigate?.('trading'); }}
                      className="mt-2 text-xs font-bold text-indigo-600 underline"
                    >
                      Buka Trading Desk untuk pantau posisi →
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOrderSubmitted(true)}
                    className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    KIRIM ORDER KE ORDERBOOK
                  </button>
                )}
              </div>
            )}

            {activeModal === 'deposit' && (
              <div className="flex flex-col gap-3 font-mono">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-800">CUSTODIAL PRIME WIRE</div>
                    <div className="text-[10px] text-emerald-600">JP Morgan Chase / BNY Mellon Custody</div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    T+0 INSTANT
                  </span>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                    CAPITAL ALLOCATION AMOUNT
                  </label>
                  <input
                    type="text"
                    defaultValue="$250,000.00"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-800 outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setActiveModal(null); onNavigate?.('investor'); }}
                  className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md active:translate-y-0.5 transition-all cursor-pointer"
                >
                  KONFIRMASI INFLOW DANA (BUKA INVESTOR DESK)
                </button>
              </div>
            )}

            {activeModal === 'fx_swap' && (
              <div className="flex flex-col gap-2.5 font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">USD → EUR LIQUIDITY ROUTE</div>
                    <div className="text-[10px] text-slate-400">SPOT RATE 1.0842 • SPREAD 0.1 BPS</div>
                  </div>
                  <span className="text-sm font-black text-indigo-700">$500,000</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">USD → JPY ARBITRAGE SWAP</div>
                    <div className="text-[10px] text-slate-400">SPOT RATE 152.40 • SETTLED</div>
                  </div>
                  <span className="text-sm font-black text-slate-800">$250,000</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setActiveModal(null); onNavigate?.('fx-flow'); }}
                  className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md active:translate-y-0.5 transition-all cursor-pointer"
                >
                  EKSEKUSI FX SWAP (BUKA FX FLOW DESK)
                </button>
              </div>
            )}

            {activeModal === 'vault_sign' && (
              <div className="flex flex-col gap-3 font-mono">
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-indigo-900">MASTER COLD VAULT QUORUM</span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      4/7 TERVERIFIKASI
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-600 block leading-relaxed">
                    Modul HSM Thales Luna PCIe Level 4 aktif tanpa kunci tertahan. Kunci otoritas multi-sig siap untuk transaksi institusi.
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">KAPASITAS COLD VAULT:</span>
                  <span className="text-slate-900 font-black">$10,560,000.00</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setActiveModal(null); onNavigate?.('security'); }}
                  className="w-full mt-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md active:translate-y-0.5 transition-all cursor-pointer"
                >
                  KELOLA VAULT DI SECURITY DESK
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
