import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  Layers,
  Zap,
  ArrowUpRight,
  Server,
  PieChart,
  Award,
} from 'lucide-react';
import {
  CLEARING_VENUES,
  TOP_DIVISION_TRADERS,
  TEAM_PERFORMANCE,
  ACTIVE_POSITIONS,
  ASSET_BREAKDOWN,
  type TeamTrader,
  type ActivePosition,
  type ClearingVenue,
  type DivisionTopTrader,
  type AssetBreakdownItem,
} from '../data/dummy/tradingDummy';

export const TradingOperations: React.FC = () => {
  const [hoveredAsset, setHoveredAsset] = useState<number | null>(null);

  // 3D Solid Ceramic Glass aesthetic consistent with application theme
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5">
      {/* ============================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU KPI HORIZONTAL                           */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Card 1: Deployed Margin ($) */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              DEPLOYED MARGIN
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              59.2% OF AUM
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              $84,650,000.00
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">CEILING $100.0M</span>
            <span className="text-slate-700 font-extrabold">LEVERAGE 1.62x</span>
          </div>
        </div>

        {/* Card 2: 24h Realized PnL ($ / %) */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              24H REALIZED PNL
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-xs font-mono">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              +5.69%
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              +$4,821,340.00
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">FACTOR 3.42</span>
            <span className="text-emerald-700 font-bold">148 WIN / 22 LOSS</span>
          </div>
        </div>

        {/* Card 3: Floating PnL ($ / %) */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              FLOATING PNL
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              +1.47%
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              +$1,248,910.00
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">NET DELTA +$18.4M</span>
            <span className="text-blue-700 font-extrabold">4 OPEN POS</span>
          </div>
        </div>

        {/* Card 4: Signal Match Rate (%) */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              SIGNAL MATCH RATE
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              FIDELITY
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              98.74%
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">9,412 / 9,532 SIGNALS</span>
            <span className="text-indigo-600 font-extrabold">0.014bps SLIP</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BODY: CHARTS & TABLES DI KIRI + 1 BLOCK TINGGI DI KANAN     */}
      {/* ============================================================== */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-2 sm:gap-2.5 items-stretch overflow-hidden">
        {/* ------------------------------------------------------------ */}
        {/* BAGIAN KIRI: 2 WIDE CHARTS (ATAS) & 2 TABLES (BAWAH)          */}
        {/* ------------------------------------------------------------ */}
        <div className="flex-1 min-w-0 h-full flex flex-col gap-2 sm:gap-2.5 justify-between overflow-y-auto no-scrollbar">
          {/* 2 CHARTS HORIZONTAL */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-2.5 flex-1 min-h-0">
            {/* Chart Kiri: Capital Exposure Breakdown */}
            <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-b from-[#ffffff] to-[#e4eaf4] text-indigo-600 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                      <PieChart className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono block leading-tight">
                        CAPITAL EXPOSURE BREAKDOWN
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        BTC • XAU • NVDA • FX ($84.65M)
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-black text-slate-800 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">
                    $84.65M
                  </span>
                </div>

                {/* Segmented Exposure Progress Bar */}
                <div className="w-full h-3 bg-slate-200/90 rounded-full overflow-hidden p-0.5 shadow-inner border border-slate-300/50 flex gap-1 my-1.5">
                  {ASSET_BREAKDOWN.map((item, idx) => (
                    <div
                      key={item.asset}
                      className={`h-full ${item.bg} rounded-full transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] cursor-pointer ${
                        hoveredAsset === idx ? 'brightness-125 scale-y-110' : ''
                      }`}
                      style={{ width: item.share }}
                      onMouseEnter={() => setHoveredAsset(idx)}
                      onMouseLeave={() => setHoveredAsset(null)}
                    />
                  ))}
                </div>

                {/* SVG Visual Multi-Wave Stream */}
                <div className="w-full h-20 my-0.5 relative">
                  <svg viewBox="0 0 500 80" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="expBtcGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="expXauGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <line x1="0" y1="15" x2="500" y2="15" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke="#94a3b8" opacity="0.7" />

                    <path
                      d="M 0,62 C 70,52 120,18 200,24 C 270,30 340,12 420,20 C 460,26 485,16 500,18 L 500,75 L 0,75 Z"
                      fill="url(#expBtcGrad)"
                    />
                    <path
                      d="M 0,62 C 70,52 120,18 200,24 C 270,30 340,12 420,20"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M 0,70 C 80,68 150,44 230,48 C 310,52 390,36 450,42 C 480,45 490,40 500,42 L 500,75 L 0,75 Z"
                      fill="url(#expXauGrad)"
                    />
                    <path
                      d="M 0,70 C 80,68 150,44 230,48 C 310,52 390,36 450,42"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.6"
                      strokeDasharray="4 3"
                    />
                  </svg>
                </div>
              </div>

              {/* 4 Cards: BTC, XAU, NVDA, FX */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 pt-1.5 border-t border-slate-200/80 text-[9px] font-mono">
                {ASSET_BREAKDOWN.map((item, idx) => (
                  <div
                    key={item.asset}
                    className={`p-1 rounded-lg bg-gradient-to-b from-white to-[#f5f8fc] border border-slate-200/80 transition-all ${
                      hoveredAsset === idx ? 'ring-1 ring-indigo-500 shadow-xs' : ''
                    }`}
                    onMouseEnter={() => setHoveredAsset(idx)}
                    onMouseLeave={() => setHoveredAsset(null)}
                  >
                    <div className="flex items-center justify-between text-slate-500 mb-0.5">
                      <div className="flex items-center gap-1 font-black text-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.asset}</span>
                      </div>
                      <span className="font-extrabold text-indigo-600 text-[8px]">{item.share}</span>
                    </div>
                    <div className="text-[10px] font-black text-slate-900 tracking-tight truncate">
                      {item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart Kanan: Slippage & Latency Audit */}
            <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-b from-[#ffffff] to-[#e4eaf4] text-emerald-600 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Server className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono block leading-tight">
                        SLIPPAGE & LATENCY AUDIT
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        SINYAL BOT VS EKSEKUSI RIIL (MS)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[9px]">
                    <span className="flex items-center gap-1 text-slate-500">
                      <span className="w-2 h-0.5 bg-blue-500 inline-block" /> Sinyal
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <span className="w-2 h-0.5 bg-emerald-500 inline-block" /> Eksekusi
                    </span>
                  </div>
                </div>

                {/* Dual Trace Chart with ms Latency Node Badges */}
                <div className="w-full h-24 my-0.5 relative">
                  <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="latencyZoneGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <line x1="0" y1="20" x2="500" y2="20" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                    <line x1="0" y1="50" x2="500" y2="50" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="#94a3b8" opacity="0.7" />

                    <path
                      d="M 0,72 Q 60,48 120,52 T 240,30 T 360,40 T 480,20 L 500,18 L 500,80 L 0,80 Z"
                      fill="url(#latencyZoneGrad)"
                    />

                    {/* Sinyal Bot Trajectory */}
                    <path
                      d="M 0,70 Q 60,46 120,50 T 240,28 T 360,38 T 480,18 L 500,16"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                    />

                    {/* Eksekusi Riil Price */}
                    <path
                      d="M 0,72 Q 60,49 120,52 T 240,30 T 360,41 T 480,20 L 500,18"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />

                    {/* Latency ms Nodes */}
                    {[
                      { x: 30, y: 64, ms: '8.4 ms' },
                      { x: 130, y: 52, ms: '9.2 ms' },
                      { x: 230, y: 35, ms: '10.8 ms' },
                      { x: 330, y: 36, ms: '11.5 ms' },
                      { x: 420, y: 32, ms: '9.6 ms' },
                      { x: 485, y: 20, ms: '8.8 ms' },
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="3" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                        <rect
                          x={pt.x - 15}
                          y={pt.y - 16}
                          width="30"
                          height="12"
                          rx="3"
                          fill="#0f172a"
                          opacity="0.88"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 7}
                          textAnchor="middle"
                          className="text-[7px] font-mono font-bold fill-white"
                        >
                          {pt.ms}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Audit Metrics */}
              <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-slate-200/80 text-[9px] font-mono text-center">
                <div className="p-1 rounded-lg bg-white border border-slate-200/80">
                  <span className="text-[7.5px] text-slate-400 block">TYO</span>
                  <span className="font-extrabold text-slate-800">8.4 ms</span>
                </div>
                <div className="p-1 rounded-lg bg-white border border-slate-200/80">
                  <span className="text-[7.5px] text-slate-400 block">LDN</span>
                  <span className="font-extrabold text-slate-800">9.2 ms</span>
                </div>
                <div className="p-1 rounded-lg bg-white border border-slate-200/80">
                  <span className="text-[7.5px] text-slate-400 block">NY</span>
                  <span className="font-extrabold text-slate-800">9.6 ms</span>
                </div>
                <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
                  <span className="text-[7.5px] text-emerald-700 block">SLIP</span>
                  <span className="font-extrabold text-emerald-800">0.014 bps</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3 TABLES / BLOCKS HORIZONTAL */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0">
            {/* Block 1: Tabel 1 (Performa Tim) */}
            <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
              <div>
                <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                      PERFORMA TIM TRADING
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200/80 font-mono">
                    5 TRADER
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[9.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="py-1 px-1">Trader ID</th>
                        <th className="py-1 px-1 text-right">Capital</th>
                        <th className="py-1 px-1 text-right">Win</th>
                        <th className="py-1 px-1 text-right">Realized PnL</th>
                        <th className="py-1 px-1 text-right">Latency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[9.5px]">
                      {TEAM_PERFORMANCE.map((trader) => (
                        <tr key={trader.traderId} className="hover:bg-indigo-50/30 transition-colors">
                          <td className="py-1.5 px-1 font-black text-slate-800">
                            {trader.traderId}
                          </td>
                          <td className="py-1.5 px-1 text-right font-black text-slate-800">
                            {trader.managedCapital}
                          </td>
                          <td className="py-1.5 px-1 text-right font-extrabold text-indigo-600">
                            {trader.winRate}
                          </td>
                          <td className="py-1.5 px-1 text-right font-black text-emerald-600">
                            {trader.realizedPnl}
                          </td>
                          <td className="py-1.5 px-1 text-right text-slate-700 font-bold">
                            {trader.avgLatencyMs}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
                <span>9,532 SIGNALS</span>
                <span className="text-emerald-600 font-bold">+$4,821,340.00</span>
              </div>
            </div>

            {/* Block 2: Tabel 2 (Posisi Aktif) */}
            <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
              <div>
                <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                      POSISI AKTIF (READ-ONLY)
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-emerald-700 bg-emerald-500/10 px-1.5 py-0.2 rounded-full border border-emerald-500/20 font-mono">
                    {ACTIVE_POSITIONS.length} INSTRUMENTS
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[9.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="py-1 px-1">Instrument</th>
                        <th className="py-1 px-1 text-center">Dir</th>
                        <th className="py-1 px-1 text-right">Size</th>
                        <th className="py-1 px-1 text-right">Mark</th>
                        <th className="py-1 px-1 text-right">Floating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[9.5px]">
                      {ACTIVE_POSITIONS.map((pos) => (
                        <tr key={pos.instrument} className="hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1 font-black text-slate-800 truncate max-w-[100px]">
                            {pos.instrument}
                          </td>
                          <td className="py-1.5 px-1 text-center">
                            <span
                              className={`inline-block px-1.5 py-0.2 rounded text-[7px] font-black tracking-wider border ${
                                pos.direction === 'BUY'
                                  ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'
                                  : 'bg-rose-500/15 text-rose-700 border-rose-500/30'
                              }`}
                            >
                              {pos.direction}
                            </span>
                          </td>
                          <td className="py-1.5 px-1 text-right font-black text-slate-800">
                            {pos.positionSize}
                          </td>
                          <td className="py-1.5 px-1 text-right font-black text-slate-900">
                            {pos.markPrice}
                          </td>
                          <td className="py-1.5 px-1 text-right font-black text-emerald-600">
                            {pos.floatingPnl}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
                <span>EXP: $84.65M</span>
                <span className="text-emerald-600 font-bold">+$1,626,890.00</span>
              </div>
            </div>

            {/* Block 3: Tabel 3 (Venue Likuiditas & Kliring) */}
            <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
              <div>
                <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                      VENUE LIKUIDITAS & CLEARING
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.2 rounded-full border border-cyan-200/80 font-mono">
                    {CLEARING_VENUES.length} GATEWAY
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[9.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="py-1 px-1">Gateway Venue</th>
                        <th className="py-1 px-1 text-right">Routed Vol</th>
                        <th className="py-1 px-1 text-right">Fill Rate</th>
                        <th className="py-1 px-1 text-right">Latency</th>
                        <th className="py-1 px-1 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[9.5px]">
                      {CLEARING_VENUES.map((v) => (
                        <tr key={v.venue} className="hover:bg-cyan-50/30 transition-colors">
                          <td className="py-1.5 px-1 font-black text-slate-800 truncate max-w-[105px]">
                            {v.venue}
                          </td>
                          <td className="py-1.5 px-1 text-right font-black text-slate-800">
                            {v.volumeRouted}
                          </td>
                          <td className="py-1.5 px-1 text-right font-extrabold text-cyan-600">
                            {v.fillRate}
                          </td>
                          <td className="py-1.5 px-1 text-right text-slate-700 font-bold">
                            {v.latencyMs}
                          </td>
                          <td className="py-1.5 px-1 text-center">
                            <span className="inline-block px-1.5 py-0.2 rounded text-[7px] font-black tracking-wider bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                              {v.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
                <span>ROUTED: $84.65M</span>
                <span className="text-cyan-700 font-bold">SETTLEMENT T+0</span>
              </div>
            </div>
          </section>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* BLOCK KANAN: TINGGI SAMPAI KE TEPI LAYAR BAWAH                */}
        {/* BERISI PARA TOP2 TRADER DI MASING-MASING DIVISI              */}
        {/* ------------------------------------------------------------ */}
        <div
          className={`${glassCard} w-full lg:w-[280px] xl:w-[310px] flex-shrink-0 h-full flex flex-col justify-between overflow-hidden p-3`}
        >
          {/* Header Block Kanan */}
          <div className="flex-shrink-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono truncate">
                  TOP TRADER PER DIVISI
                </span>
              </div>
              <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-200/80 font-mono flex-shrink-0">
                {TOP_DIVISION_TRADERS.length} DIVISI
              </span>
            </div>

            {/* Total Profit Top Trader */}
            <div className="flex items-baseline justify-between gap-2 mt-0.5 mb-1.5">
              <div>
                <div className="text-[8px] font-bold text-slate-400 uppercase font-mono">
                  TOTAL REALIZED PROFIT
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-800 font-mono tracking-tight">
                  +$5,066,690.00
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-md font-mono border border-emerald-500/20">
                  AVG 72.4% WIN
                </span>
              </div>
            </div>
          </div>

          {/* List Para Top Trader di Masing-Masing Divisi */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 min-h-0">
            {TOP_DIVISION_TRADERS.map((t, idx) => (
              <div
                key={t.traderId}
                className={`py-1.5 px-2 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/90 border-b-2 border-b-slate-300 shadow-[0_2px_4px_rgba(15,23,42,0.04),inset_0_1px_1px_white] flex flex-col gap-1 transition-all font-mono ${
                  idx === 0 ? 'ring-1 ring-indigo-500/30' : ''
                }`}
              >
                {/* Baris 1: Divisi & Rank Badge */}
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="w-5 h-4.5 rounded bg-gradient-to-b from-indigo-50 to-indigo-100 text-indigo-700 font-black text-[9px] flex items-center justify-center border border-indigo-200 shadow-xs flex-shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="text-[9px] font-extrabold text-slate-800 uppercase tracking-tight truncate">
                      {t.division}
                    </span>
                  </div>
                  <span className={`px-1 py-0.2 rounded text-[7.5px] font-black border uppercase flex-shrink-0 ${t.badgeColor}`}>
                    {t.divisionShort}
                  </span>
                </div>

                {/* Baris 2: Nama Trader & PnL ($) */}
                <div className="flex items-center justify-between gap-1 pt-0.5 border-t border-slate-200/60">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="text-[11px] font-black text-slate-800 tracking-tight">
                      {t.traderId}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate">
                      ({t.name})
                    </span>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[11px] font-black text-emerald-600">
                      {t.pnl}
                    </span>
                  </div>
                </div>

                {/* Baris 3: Capital Handled, Win-Rate, Latency */}
                <div className="flex items-center justify-between text-[8px] font-bold text-slate-500 pt-0.5 border-t border-slate-200/40">
                  <span>
                    CAP: <span className="text-slate-800 font-black">{t.capital}</span>
                  </span>
                  <span>
                    WIN: <span className="text-indigo-600 font-black">{t.winRate}</span>
                  </span>
                  <span>
                    LAT: <span className="text-slate-700 font-black">{t.latency}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Block Kanan */}
          <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 text-[9px] font-mono text-slate-500 mt-1 flex-shrink-0">
            <span className="text-slate-400">DESK AUDIT T+0</span>
            <span className="text-emerald-600 font-bold">100% TERVERIFIKASI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
