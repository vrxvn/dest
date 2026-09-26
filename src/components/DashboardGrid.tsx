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
  ChevronDown,
  Lock,
  ShieldAlert,
  Pause,
  BarChart3,
  Award,
  Calendar,
  LineChart,
  Layers,
} from 'lucide-react';
import {
  EmployeeTrade,
  INITIAL_EMPLOYEE_TRADES,
  TRADE_STREAM_POOL,
  CHART_DATASETS as chartDatasets,
  DUMMY_WALLET_ADDRESS as walletAddress,
  GLOBAL_INSTITUTIONAL_INVESTMENTS,
  LIVE_MARKET_TICKERS,
  COMPANY_PERFORMANCE_2020_2026,
  MONTH_NAMES_SHORT,
  type CompanyYearlyPerformance,
} from '../data/dummyData';

interface DashboardGridProps {
  onNavigate?: (menuId: string) => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({ onNavigate }) => {
  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // State untuk Grafik Pengelolaan Pemasukan Perusahaan (2020 - Sekarang / 2026)
  const [selectedPerformanceYear, setSelectedPerformanceYear] = useState<string>('2026');
  const [incomeViewMode, setIncomeViewMode] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
  const [performanceMetric, setPerformanceMetric] = useState<'REVENUE' | 'PROFIT' | 'AUM'>('REVENUE');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [chartType, setChartType] = useState<'BAR_CLUSTERED' | 'STEP_STAIRCASE' | 'WATERFALL'>('BAR_CLUSTERED');

  // Live Employee Global Trading Desk state - DIHENTIKAN / STOPPED & DIKUNCI
  const [employeeTrades] = useState<EmployeeTrade[]>(INITIAL_EMPLOYEE_TRADES);
  const tradeCount = 148;

  // Quick Action Modal state (termasuk status locked_trading)
  const [activeModal, setActiveModal] = useState<'trade_order' | 'deposit' | 'fx_swap' | 'vault_sign' | 'locked_trading' | null>(null);
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
          <div className={`${glassCard} flex flex-col justify-between flex-shrink-0 relative overflow-hidden`}>
            {/* Top: Total AUM & Balance */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                  TOTAL AUM • USD
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/25 shadow-xs font-mono">
                    <Lock className="w-2.5 h-2.5" />
                    TRADING DIKUNCI
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-xs">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    +23.1% (+27.4% YTD)
                  </span>
                </div>
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
              {/* 1. TRADING DESK (DIKUNCI / HALTED) */}
              <button
                type="button"
                onClick={() => setActiveModal('locked_trading')}
                title="Trading Desk • DIKUNCI TOTAL & DIHENTIKAN (Klik untuk melihat protokol keamanan)"
                className="group relative flex-1 h-10 sm:h-11 rounded-2xl bg-gradient-to-b from-[#fff5f5] via-[#fef2f2] to-[#fee2e2] text-rose-600 hover:text-rose-700 flex items-center justify-center border-t-2 border-t-white border-x-[1.5px] border-rose-200/90 border-b-[3px] border-b-rose-300 shadow-[0_4px_8px_rgba(225,29,72,0.12),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(254,202,202,0.4)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1.5px] transition-all cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 stroke-[2.3] opacity-50" />
                  <Lock className="w-2.5 h-2.5 text-rose-600 absolute -bottom-1 -right-1" />
                </div>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border border-white flex items-center justify-center" />
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
                    +6.4%
                  </span>
                </div>

                <div className="my-1">
                  <div className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight group-hover:text-indigo-900 transition-colors">
                    +$42.5K
                  </div>
                  <div className="text-[9px] font-bold text-slate-500 font-mono truncate mt-0.5">
                    ETH & SOL VALIDATORS
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
            {/* 1. Net PnL + Micro Sparkline (Synchronized to Trading Desk - HALTED) */}
            <div
              onClick={() => setActiveModal('locked_trading')}
              title="Trading Operations • DIKUNCI & DIHENTIKAN"
              className={`${glassCard} cursor-pointer hover:border-rose-300 hover:brightness-105 active:translate-y-[1px] group relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 group-hover:text-rose-600 uppercase font-mono transition-colors">
                  NET PNL • 30D (HALTED)
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20 shadow-xs font-mono">
                  <Lock className="w-2.5 h-2.5" />
                  DIKUNCI
                </span>
              </div>

              <div className="flex items-end justify-between gap-1 my-1">
                <div className="text-xl xl:text-2xl font-black text-slate-800 tracking-tight font-mono group-hover:text-rose-900 transition-colors">
                  +$384,500
                </div>

                {/* Micro Sparkline Chart */}
                <div className="w-20 h-7 flex-shrink-0 opacity-60">
                  <svg viewBox="0 0 100 36" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="pnlSparklineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e11d48" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,28 Q 15,25 30,18 T 60,14 T 80,8 T 100,3 L 100,36 L 0,36 Z"
                      fill="url(#pnlSparklineGrad)"
                    />
                    <path
                      d="M 0,28 Q 15,25 30,18 T 60,14 T 80,8 T 100,3"
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="3" r="3" fill="#e11d48" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-[11px] font-mono">
                <span className="text-slate-400">CIRCUIT BREAKER</span>
                <span className="text-rose-600 font-bold flex items-center gap-0.5">
                  FROZEN <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
            </div>

            {/* 2. Crypto Vault Holdings & Fiat Equivalent (Synchronized to Crypto Desk) */}
            <div
              onClick={() => onNavigate?.('crypto')}
              title="Klik untuk membuka menu Crypto & Digital Assets Desk"
              className={`${glassCard} cursor-pointer hover:border-amber-300 hover:brightness-105 active:translate-y-[1px] group`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 group-hover:text-amber-700 uppercase font-mono transition-colors">
                  CRYPTO VAULT AUM
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-xs">
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  +4.12%
                </span>
              </div>

              <div className="my-1">
                <div className="text-xl xl:text-2xl font-black text-slate-800 tracking-tight font-mono group-hover:text-amber-900 transition-colors">
                  $6,397,000
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-[11px] font-mono">
                <span className="text-slate-400 truncate max-w-[130px]">35.5 BTC • 420 ETH</span>
                <span className="text-slate-800 font-black flex items-center gap-0.5 shrink-0">
                  41.7% AUM <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
            </div>

            {/* 3. 24H Volume & Execution Velocity (Synchronized to Trading Desk - HALTED) */}
            <div
              onClick={() => setActiveModal('locked_trading')}
              title="Execution Desk • DIHENTIKAN"
              className={`${glassCard} cursor-pointer hover:border-amber-300 hover:brightness-105 active:translate-y-[1px] group relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 group-hover:text-amber-700 uppercase font-mono transition-colors">
                  24H VOLUME (HALTED)
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20 shadow-xs font-mono">
                  <Pause className="w-2.5 h-2.5" />
                  DIHENTIKAN
                </span>
              </div>

              <div className="flex items-end justify-between gap-1 my-1">
                <div className="text-xl xl:text-2xl font-black text-slate-800 tracking-tight font-mono group-hover:text-amber-900 transition-colors">
                  $3,250,000
                </div>

                {/* Micro Volume Bars */}
                <div className="flex items-end gap-1 h-6 pb-0.5 flex-shrink-0 opacity-60">
                  <div className="w-1.5 h-3 bg-amber-400/60 rounded-xs" />
                  <div className="w-1.5 h-4.5 bg-amber-400/80 rounded-xs" />
                  <div className="w-1.5 h-3.5 bg-amber-500 rounded-xs" />
                  <div className="w-1.5 h-5 bg-amber-500 rounded-xs" />
                  <div className="w-1.5 h-6 bg-amber-500 rounded-xs" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-[11px] font-mono">
                <span className="text-slate-400">EKSEKUSI ORDER</span>
                <span className="text-amber-700 font-bold flex items-center gap-0.5">
                  LOCKED <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
            </div>
          </div>

          {/* Middle Row in Right Column: Flowing Chart (Posisi Semula) + Block Tambahan Di Bawahnya + Square Donut Column */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch flex-1 min-h-0">
            {/* Center Column: Flowing Chart (Posisi Semula) + 1 Block Tambahan Di Bawahnya */}
            <div className="flex-1 min-w-0 flex flex-col gap-3 h-full justify-between min-h-0">
              {/* Visual 1: Chart Pengelolaan Pemasukan Perusahaan (Per Bulan & Per Tahun, 2020 - Sekarang / 2026) */}
              <div
                ref={capitalRef}
                className={`${glassCard} flex-shrink-0 flex flex-col justify-between relative overflow-hidden`}
                style={capitalHeight ? { height: `${capitalHeight}px` } : undefined}
              >
                {/* Header: Judul Singkat 'ARUS KAS' & Dropdown Pemilih Tahun Ke Bawah */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
                        ARUS KAS
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        {(() => {
                          if (selectedPerformanceYear === 'ALL') {
                            const totalRev = COMPANY_PERFORMANCE_2020_2026.reduce((acc, d) => acc + d.revenue, 0);
                            return (
                              <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono truncate">
                                ${totalRev.toFixed(2)}M
                              </span>
                            );
                          }

                          const selectedData =
                            COMPANY_PERFORMANCE_2020_2026.find((d) => d.year === selectedPerformanceYear) ||
                            COMPANY_PERFORMANCE_2020_2026[COMPANY_PERFORMANCE_2020_2026.length - 1];

                          const monthIdx = hoveredPointIndex !== null && hoveredPointIndex < 12 ? hoveredPointIndex : 11;
                          const incomeVal = selectedData.monthlyRevenue[monthIdx];

                          return (
                            <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono truncate">
                              ${incomeVal.toLocaleString()}K
                            </span>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Indicator Legend: 2 Garis Bersih (Biru & Merah) */}
                    <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200 text-[9px] font-mono">
                      <span className="flex items-center gap-1 text-sky-700 font-bold">
                        <span className="w-3.5 h-0.5 rounded-full bg-sky-600" />
                        Pemasukan
                      </span>
                      <span className="flex items-center gap-1 text-rose-600 font-bold">
                        <span className="w-3.5 h-0.5 rounded-full bg-rose-500" />
                        Pengeluaran
                      </span>
                    </div>
                  </div>

                  {/* Dropdown Pemilih Tahun (Termasuk Opsi Melihat Semua Tahun & Tanpa Kata NOW pada 2026) */}
                  <div className="relative">
                    <select
                      value={selectedPerformanceYear}
                      onChange={(e) => {
                        setSelectedPerformanceYear(e.target.value);
                        setHoveredPointIndex(null);
                      }}
                      className="appearance-none bg-slate-100/90 hover:bg-slate-200/90 text-slate-800 text-[11px] font-mono font-bold pl-2.5 pr-7 py-1 rounded-lg border border-slate-300/80 shadow-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    >
                      <option value="ALL">Lihat Semua Tahun (2020 - 2026)</option>
                      {COMPANY_PERFORMANCE_2020_2026.map((item) => (
                        <option key={item.year} value={item.year}>
                          Tahun {item.year}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* SVG Visual Chart: 2 Smooth Continuous Spline Lines (Biru & Merah) TANPA TITIK */}
                <div className="w-full flex-1 min-h-[145px] relative my-1 overflow-hidden rounded-xl bg-white border border-slate-200/80 p-2 shadow-xs">
                  {(() => {
                    const isAllYears = selectedPerformanceYear === 'ALL';

                    // Either 7 points (2020 - 2026) if 'ALL', or 12 months for single year
                    let labels: string[] = [];
                    let incomeData: number[] = [];
                    let expenseData: number[] = [];
                    let maxIncomeVal = 100;

                    if (isAllYears) {
                      labels = COMPANY_PERFORMANCE_2020_2026.map((d) => d.year);
                      incomeData = COMPANY_PERFORMANCE_2020_2026.map((d) => Math.round(d.revenue * 1000));
                      expenseData = COMPANY_PERFORMANCE_2020_2026.map((d) => Math.round((d.revenue - d.profit) * 1000));
                      maxIncomeVal = Math.max(...incomeData);
                    } else {
                      const yearData =
                        COMPANY_PERFORMANCE_2020_2026.find((d) => d.year === selectedPerformanceYear) ||
                        COMPANY_PERFORMANCE_2020_2026[COMPANY_PERFORMANCE_2020_2026.length - 1];
                      labels = MONTH_NAMES_SHORT;
                      incomeData = yearData.monthlyRevenue;
                      expenseData = incomeData.map((inc, i) => inc - yearData.monthlyProfit[i]);
                      maxIncomeVal = Math.max(...incomeData);
                    }

                    const pctIncome = incomeData.map((val) => {
                      const pct = (val / maxIncomeVal) * 9.2;
                      return Math.max(0.6, pct);
                    });

                    const pctExpense = expenseData.map((val) => {
                      const pct = (val / maxIncomeVal) * 9.2;
                      return Math.max(0.3, pct);
                    });

                    const plotLeft = 28;
                    const plotRight = 332;
                    const plotTop = 16;
                    const plotBottom = 112;
                    const plotHeight = plotBottom - plotTop;
                    const maxScale = 10;

                    const stepX = (plotRight - plotLeft) / (labels.length - 1);

                    const coordsIncome = pctIncome.map((pct, i) => ({
                      x: plotLeft + i * stepX,
                      y: plotBottom - (pct / maxScale) * plotHeight,
                      pct,
                      incomeVal: incomeData[i],
                      expenseVal: expenseData[i],
                      label: labels[i],
                      subLabel: isAllYears ? `Tahun ${labels[i]}` : `${labels[i]} ${selectedPerformanceYear}`,
                    }));

                    const coordsExpense = pctExpense.map((pct, i) => ({
                      x: plotLeft + i * stepX,
                      y: plotBottom - (pct / maxScale) * plotHeight,
                      pct,
                    }));

                    const makeSpline = (pts: { x: number; y: number }[]) =>
                      pts.reduce((acc, curr, i, arr) => {
                        if (i === 0) return `M ${curr.x},${curr.y}`;
                        const prev = arr[i - 1];
                        const cp1x = prev.x + (curr.x - prev.x) * 0.5;
                        const cp1y = prev.y;
                        const cp2x = prev.x + (curr.x - prev.x) * 0.5;
                        const cp2y = curr.y;
                        return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
                      }, '');

                    const dCurveIncome = makeSpline(coordsIncome);
                    const dCurveExpense = makeSpline(coordsExpense);

                    const firstX = coordsIncome[0].x;
                    const lastX = coordsIncome[coordsIncome.length - 1].x;

                    const dAreaIncome = `${dCurveIncome} L ${lastX},${plotBottom} L ${firstX},${plotBottom} Z`;
                    const dAreaExpense = `${dCurveExpense} L ${lastX},${plotBottom} L ${firstX},${plotBottom} Z`;

                    const activeIdx = hoveredPointIndex !== null && hoveredPointIndex < coordsIncome.length ? hoveredPointIndex : null;
                    const activeNode = activeIdx !== null ? coordsIncome[activeIdx] : null;

                    return (
                      <svg viewBox="0 0 340 140" className="w-full h-full overflow-visible">
                        <defs>
                          {/* Looker Studio Soft Sky Blue Gradient (Garis 1 - Pemasukan) */}
                          <linearGradient id="streamIncomeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                          </linearGradient>

                          {/* Soft Red / Rose Gradient (Garis 2 - Pengeluaran) */}
                          <linearGradient id="streamExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#e11d48" stopOpacity="0.22" />
                            <stop offset="75%" stopColor="#f43f5e" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                          </linearGradient>

                          {/* Tooltip Card Drop Shadow */}
                          <filter id="tooltipShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#0f172a" floodOpacity="0.12" />
                          </filter>
                        </defs>

                        {/* Y-Axis Horizontal Gridlines & Labels (0%, 2,5%, 5%, 7,5%, 10%) */}
                        {[
                          { val: 10, label: '10%' },
                          { val: 7.5, label: '7,5%' },
                          { val: 5, label: '5%' },
                          { val: 2.5, label: '2,5%' },
                          { val: 0, label: '0%' },
                        ].map((grid) => {
                          const y = plotBottom - (grid.val / maxScale) * plotHeight;
                          return (
                            <g key={grid.val}>
                              <line
                                x1={plotLeft}
                                y1={y}
                                x2={plotRight}
                                y2={y}
                                stroke={grid.val === 0 ? '#94a3b8' : '#f1f5f9'}
                                strokeWidth={grid.val === 0 ? 1 : 0.8}
                              />
                              <text
                                x={plotLeft - 4}
                                y={y + 3}
                                textAnchor="end"
                                className="text-[7.5px] font-sans font-medium fill-slate-400 select-none"
                              >
                                {grid.label}
                              </text>
                            </g>
                          );
                        })}

                        {/* Area 2: Gradasi Halus Pengeluaran Merah (Bawah) */}
                        <path d={dAreaExpense} fill="url(#streamExpenseGrad)" />

                        {/* Area 1: Gradasi Halus Pemasukan Biru (Atas) */}
                        <path d={dAreaIncome} fill="url(#streamIncomeGrad)" />

                        {/* Garis 2: Kurva Mulus Pengeluaran (WARNA MERAH, MURNI GARIS TANPA TITIK) */}
                        <path
                          d={dCurveExpense}
                          fill="none"
                          stroke="#e11d48"
                          strokeWidth="2.0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Garis 1: Kurva Mulus Pemasukan (WARNA BIRU, MURNI GARIS TANPA TITIK) */}
                        <path
                          d={dCurveIncome}
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Vertical Hairline Guide on Hover */}
                        {activeNode && (
                          <line
                            x1={activeNode.x}
                            y1={plotTop}
                            x2={activeNode.x}
                            y2={plotBottom}
                            stroke="#0284c7"
                            strokeWidth="1"
                            strokeDasharray="2 2"
                            opacity="0.6"
                          />
                        )}

                        {/* Interactive Invisible Hover Columns + Axis Labels (TANPA TITIK APAPUN DI GARIS) */}
                        {coordsIncome.map((item, idx) => {
                          const isHovered = hoveredPointIndex === idx;

                          return (
                            <g
                              key={idx}
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredPointIndex(idx)}
                              onMouseLeave={() => setHoveredPointIndex(null)}
                            >
                              {/* Invisible broad vertical hover zone */}
                              <rect
                                x={item.x - stepX / 2}
                                y={plotTop}
                                width={stepX}
                                height={plotBottom - plotTop}
                                fill="transparent"
                              />

                              {/* Label below axis */}
                              <text
                                x={item.x}
                                y={plotBottom + 13}
                                textAnchor="middle"
                                className={`text-[7px] font-sans transition-colors ${
                                  isHovered
                                    ? 'fill-sky-700 font-bold'
                                    : 'fill-slate-500'
                                }`}
                              >
                                {item.label}
                              </text>
                            </g>
                          );
                        })}

                        {/* Google Looker Studio Style Floating Tooltip Box saat di-hover */}
                        {activeNode && (
                          <g
                            transform={`translate(${Math.max(
                              plotLeft,
                              Math.min(plotRight - 98, activeNode.x - 49)
                            )}, ${
                              activeNode.y > 65
                                ? Math.max(8, activeNode.y - 50)
                                : Math.min(plotBottom - 46, activeNode.y + 12)
                            })`}
                            filter="url(#tooltipShadow)"
                            className="pointer-events-none transition-all duration-150"
                          >
                            {/* Card Container */}
                            <rect
                              x="0"
                              y="0"
                              width="98"
                              height="44"
                              rx="5"
                              fill="#ffffff"
                              stroke="#cbd5e1"
                              strokeWidth="0.8"
                            />

                            {/* Tooltip Header Date / Period */}
                            <text
                              x="8"
                              y="12"
                              className="text-[7.5px] font-sans font-bold fill-slate-800"
                            >
                              {activeNode.subLabel}
                            </text>

                            {/* Pemasukan row (Biru) */}
                            <line
                              x1="8"
                              y1="21"
                              x2="18"
                              y2="21"
                              stroke="#0284c7"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            <text
                              x="22"
                              y="23"
                              className="text-[6.5px] font-sans fill-slate-600"
                            >
                              Masuk
                            </text>
                            <text
                              x="90"
                              y="23"
                              textAnchor="end"
                              className="text-[7px] font-sans font-bold fill-sky-800"
                            >
                              ${activeNode.incomeVal.toLocaleString()}K
                            </text>

                            {/* Pengeluaran row (Merah) */}
                            <line
                              x1="8"
                              y1="32"
                              x2="18"
                              y2="32"
                              stroke="#e11d48"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            <text
                              x="22"
                              y="34"
                              className="text-[6.5px] font-sans fill-slate-600"
                            >
                              Keluar
                            </text>
                            <text
                              x="90"
                              y="34"
                              textAnchor="end"
                              className="text-[7px] font-sans font-bold fill-rose-600"
                            >
                              ${activeNode.expenseVal.toLocaleString()}K
                            </text>
                          </g>
                        )}
                      </svg>
                    );
                  })()}
                </div>

                {/* Footer: Detail Capaian & Highlight Pekerjaan Perusahaan pada Tahun Terpilih */}
                {(() => {
                  const currentSelected =
                    COMPANY_PERFORMANCE_2020_2026.find((d) => d.year === selectedPerformanceYear) ||
                    COMPANY_PERFORMANCE_2020_2026[COMPANY_PERFORMANCE_2020_2026.length - 1];

                  return (
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 text-[10.5px] font-mono">
                      <div className="flex items-center gap-1.5 text-slate-600 truncate mr-2">
                        <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="font-bold text-slate-800">{currentSelected.year}:</span>
                        <span className="truncate text-slate-600 text-[10px]">{currentSelected.highlight}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-slate-400 text-[9.5px]">TOTAL TAHUNAN:</span>
                        <span className="text-indigo-700 font-black bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200 text-[10px]">
                          ${currentSelected.revenue.toFixed(2)}M
                        </span>
                        <span className="text-emerald-700 font-black bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[10px]">
                          ROI {currentSelected.roi}
                        </span>
                      </div>
                    </div>
                  );
                })()}
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

              {/* Block Tambahan Di Bawahnya: Trader (KARYAWAN DIKUNCI TOTAL - NGEBLUR) */}
              <div
                onClick={() => setActiveModal('locked_trading')}
                title="Akses Karyawan Desk • DIKUNCI TOTAL (Ngeblur)"
                className={`${glassCard} w-full flex-1 min-h-0 flex flex-col justify-between overflow-hidden p-3 sm:p-3.5 relative cursor-pointer hover:border-rose-300 hover:brightness-105 active:translate-y-[1px] group`}
              >
                <div className="flex flex-col flex-1 min-h-0 relative">
                  {/* Header: Title "Trader Desk • Karyawan" */}
                  <div className="flex items-center justify-between gap-1 mb-2 flex-shrink-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                      <span className="text-xs font-black tracking-wider text-rose-800 uppercase font-mono transition-colors">
                        Trader Desk • Karyawan
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-rose-700 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-300 font-mono flex-shrink-0 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      DIKUNCI TOTAL
                    </span>
                  </div>

                  {/* Container with blurred trades + lock overlay */}
                  <div className="relative flex-1 min-h-0 overflow-hidden">
                    {/* The employee trades list is totally blurred! */}
                    <div className="filter blur-[5px] select-none pointer-events-none opacity-25 space-y-1.5 pr-0.5 min-h-0 overflow-hidden">
                      {employeeTrades.slice(0, 6).map((trade, idx) => {
                        const isNegative = trade.floatingPnl.startsWith('-') || trade.isProfit === false;
                        return (
                          <div
                            key={trade.id}
                            className="py-1.5 px-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/90 border-b-2 border-b-slate-300 shadow-[0_2px_4px_rgba(15,23,42,0.04),inset_0_1px_1px_white] flex flex-col gap-0.5 transition-all font-mono"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                <span className="text-[11px] font-black text-slate-800 tracking-tight truncate">
                                  {trade.market}
                                </span>
                                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50/90 px-1 py-0.2 rounded border border-indigo-200/70 flex-shrink-0">
                                  ({trade.employee})
                                </span>
                              </div>
                              <span className="px-1.5 py-0.2 rounded text-[8px] font-black uppercase tracking-wider flex-shrink-0 border bg-slate-100 text-slate-600 border-slate-200">
                                {trade.action}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[9px] font-bold pt-0.5 border-t border-slate-200/60">
                              <span className="text-slate-500">
                                Pos: <span className="text-slate-800 font-extrabold">{trade.positionValue}</span>
                              </span>
                              <span className={`font-black ${isNegative ? 'text-rose-600' : 'text-emerald-600'}`}>
                                {trade.floatingPnl}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Prominent High-Tech Frosted Blur Lock Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-slate-900/10 backdrop-blur-[4px] rounded-2xl border border-slate-300/80 shadow-inner z-10">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-white via-rose-50 to-rose-100 border-t border-t-white border-x border-rose-200 border-b-2 border-b-rose-300 shadow-[0_4px_12px_rgba(225,29,72,0.18)] flex items-center justify-center text-rose-600 mb-1.5">
                        <Lock className="w-5 h-5 stroke-[2.4]" />
                      </div>
                      <div className="text-[11px] font-black text-slate-900 tracking-tight font-mono uppercase">
                        AKSES KARYAWAN DIKUNCI TOTAL
                      </div>
                      <div className="text-[8.5px] font-mono text-slate-600 max-w-[210px] mt-0.5 leading-snug">
                        Data identitas, floating order, dan operasional seluruh karyawan desk telah dibekukan & disensor.
                      </div>
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-[8px] font-mono font-bold text-rose-700">
                        <ShieldAlert className="w-2.5 h-2.5 text-rose-600" /> DEFCON 1 • AKSES RESTRICTED
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Status */}
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 text-[9px] font-mono text-slate-500 mt-1 flex-shrink-0">
                  <span className="text-rose-600 font-bold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> 48 DESK KARYAWAN DIBEKUKAN
                  </span>
                  <span className="text-rose-700 font-black flex items-center gap-0.5">
                    DIKUNCI TOTAL →
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
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center border shadow-xs ${
                  activeModal === 'locked_trading'
                    ? 'bg-rose-500/10 text-rose-600 border-rose-300'
                    : 'bg-indigo-500/10 text-indigo-600 border-indigo-200'
                }`}>
                  {activeModal === 'trade_order' && <TrendingUp className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'deposit' && <PlusCircle className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'fx_swap' && <ArrowLeftRight className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'vault_sign' && <ShieldCheck className="w-4 h-4 stroke-[2.5]" />}
                  {activeModal === 'locked_trading' && <Lock className="w-4 h-4 stroke-[2.5]" />}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 font-mono">
                    {activeModal === 'trade_order' && 'FAST ORDER ROUTING'}
                    {activeModal === 'deposit' && 'PRIME CUSTODY INFLOW'}
                    {activeModal === 'fx_swap' && 'FX LIQUIDITY SWAP'}
                    {activeModal === 'vault_sign' && 'MULTI-SIG HSM SIGNER'}
                    {activeModal === 'locked_trading' && 'TRADING & KARYAWAN DIKUNCI'}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {activeModal === 'locked_trading'
                      ? 'SECURITY & RISK PROTOCOL • DEFCON 1'
                      : 'INSTITUTIONAL DESK • T+0 SETTLEMENT'}
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

            {activeModal === 'locked_trading' && (
              <div className="flex flex-col gap-3 font-mono">
                <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200/90 text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600">
                      <Lock className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-rose-900 uppercase">
                        SISTEM TRADING & AKUN KARYAWAN DIKUNCI
                      </div>
                      <div className="text-[9px] text-rose-600 font-bold">
                        DEFCON 1 • PROTOKOL HALT & BLUR AKTIF
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed mt-2">
                    Sesuai instruksi kepatuhan risiko, operasional trading, chart streaming, dan seluruh aktivitas akun karyawan (trader) telah <strong className="text-rose-700 font-black">DIHENTIKAN (STOPPED)</strong> dan <strong className="text-rose-700 font-black">DIKUNCI TOTAL (LOCKED & NGEBLUR)</strong>.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500 font-bold flex items-center gap-1.5">
                      <Pause className="w-3.5 h-3.5 text-amber-600" /> Chart & Streaming:
                    </span>
                    <span className="text-rose-600 font-black bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      DIHENTIKAN / FROZEN
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500 font-bold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-rose-600" /> Karyawan & Trader Desk:
                    </span>
                    <span className="text-rose-600 font-black bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      DIKUNCI TOTAL (NGEBLUR)
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500 font-bold flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" /> Eksekusi Order:
                    </span>
                    <span className="text-slate-700 font-black bg-slate-200 px-2 py-0.5 rounded">
                      SUSPENDED (DISABLED)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-bold text-xs shadow-md active:translate-y-0.5 transition-all cursor-pointer"
                >
                  TUTUP PEMBERITAHUAN
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
