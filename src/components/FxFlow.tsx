import React, { useState } from 'react';
import {
  ArrowLeftRight,
  TrendingUp,
  Activity,
  Globe2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Network,
  BarChart3,
  Layers,
  Maximize2,
  Minimize2,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  X,
} from 'lucide-react';
import {
  FOUR_MAJOR_DEVISA,
  type DevisaDetail,
  CURRENCY_FLOWS,
  FX_PAIRS,
  LIQUIDITY_POOLS,
  FX_DESK_TRADERS,
  type CurrencyFlow,
  type FxPairData,
  type LiquidityPool,
  type FxDeskTrader,
} from '../data/dummy/fxDummy';
import { useFxLiveRates, MiniFxSparkline, InstitutionalFxChart } from './FxChartModule';

export const FxFlow: React.FC = () => {
  const [hoveredCurrency, setHoveredCurrency] = useState<number | null>(null);
  const [selectedDevisaCode, setSelectedDevisaCode] = useState<string>('USD');
  const [isWideExpandedModal, setIsWideExpandedModal] = useState<boolean>(false);

  // Live Real-Time FX Exchange Rate Engine from Public APIs
  const { liveRates, historicalApiSeries, apiProvider, lastUpdated, isFetching, refreshRates } = useFxLiveRates();

  const activeDevisa = FOUR_MAJOR_DEVISA.find((d) => d.code === selectedDevisaCode) || FOUR_MAJOR_DEVISA[0];

  const getLiveSpotRate = (code: string, fallback: string) => {
    if (!liveRates) return fallback;
    if (code === 'EUR') return (1 / liveRates.EUR).toFixed(4);
    if (code === 'JPY') return liveRates.JPY.toFixed(2);
    if (code === 'GBP') return (1 / liveRates.GBP).toFixed(4);
    if (code === 'USD') return '105.42';
    return fallback;
  };

  const getLiveNumericRate = (code: string) => {
    if (!liveRates) {
      return code === 'USD' ? 105.42 : code === 'EUR' ? 1.0892 : code === 'JPY' ? 154.65 : 1.2740;
    }
    if (code === 'EUR') return Number((1 / liveRates.EUR).toFixed(4));
    if (code === 'JPY') return Number(liveRates.JPY.toFixed(2));
    if (code === 'GBP') return Number((1 / liveRates.GBP).toFixed(4));
    return 105.42;
  };

  // 3D Solid Ceramic Glass aesthetic consistent with application theme
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5">
      {/* ============================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU KPI HORIZONTAL                           */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Card 1: Global 24h FX Volume */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              GLOBAL FX 24H VOLUME
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              INSTITUTIONAL
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              $6,850,000.00
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">CLEARED T+0</span>
            <span className="text-indigo-600 font-extrabold">+8.4% WoW FLOW</span>
          </div>
        </div>

        {/* Card 2: Net Institutional Flow Imbalance */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              NET USD FLOW BIAS
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-xs font-mono">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              BULLISH DXY
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              +$420,000.00
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">NET LONG USD</span>
            <span className="text-emerald-700 font-bold">1.28 INFLOW RATIO</span>
          </div>
        </div>

        {/* Card 3: Central Bank Yield Spread */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              CENTRAL BANK SPREAD
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono">
              FED-ECB-BOJ
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              +142.5 bps
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">CARRY YIELD DELTA</span>
            <span className="text-blue-700 font-extrabold">REAL SPREAD POSITIVE</span>
          </div>
        </div>

        {/* Card 4: CLS Match Rate */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              CLS SETTLEMENT FIDELITY
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              ZERO-HERSTATT
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              99.98%
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">18 CURRENCIES</span>
            <span className="text-indigo-600 font-extrabold">PVP GUARANTEED</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BARIS TENGAH: DEVISA (1 BARIS 2 BLOK) + BUKA LEBAR          */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-2.5 flex-1 min-h-0">
        {/* KOLOM KIRI: 4 DEVISA (1 BARIS 2 BLOK: USD, EUR, JPY, GBP) */}
        <div className="md:col-span-4 xl:col-span-4 grid grid-cols-2 gap-2 h-full min-h-0">
          {FOUR_MAJOR_DEVISA.map((devisa) => {
            const isSelected = selectedDevisaCode === devisa.code;
            return (
              <button
                key={devisa.code}
                type="button"
                onClick={() => setSelectedDevisaCode(devisa.code)}
                className={`${glassCard} h-full text-left p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-200 outline-none group ${
                  isSelected
                    ? 'ring-2 ring-indigo-500/90 shadow-[0_10px_24px_-4px_rgba(99,102,241,0.28),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(148,163,184,0.3)] bg-gradient-to-b from-white via-indigo-50/40 to-[#e4eaf8] border-indigo-400'
                    : 'hover:brightness-105 hover:border-slate-300'
                }`}
              >
                {/* Baris Atas: Simbol Devisa, Pill Share, & Spot */}
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg text-white font-black text-[10px] sm:text-[11px] flex items-center justify-center font-mono shadow-xs shrink-0 ${devisa.bg}`}
                    >
                      {devisa.code}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-slate-800 font-mono tracking-tight truncate">
                          {devisa.name}
                        </span>
                        <span className="text-[7.5px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-500 font-mono border border-slate-200 shrink-0">
                          {devisa.share}
                        </span>
                      </div>
                      <span className="text-[8px] text-slate-400 font-mono block leading-none truncate mt-0.5">
                        {devisa.spotPair}: <span className="font-extrabold text-slate-700">{getLiveSpotRate(devisa.code, devisa.spotRate)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono shrink-0">
                    <span
                      className={`inline-flex items-center gap-0.5 text-[8px] sm:text-[8.5px] font-black px-1.5 py-0.2 rounded-full border ${
                        devisa.isChangePositive
                          ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
                      }`}
                    >
                      {devisa.isChangePositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                      {devisa.change24h}
                    </span>
                  </div>
                </div>

                {/* Mini Sparkline Chart ("char" pada masing-masing kartu devisa) */}
                <MiniFxSparkline
                  code={devisa.code}
                  color={devisa.color}
                  isPositive={devisa.isPositive}
                  liveRate={getLiveNumericRate(devisa.code)}
                />

                {/* Baris Bawah: Volume, Net Inflow & Tombol Buka Lebar */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 mt-1 text-[8.5px] font-mono">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-slate-400 font-bold shrink-0">VOL <span className="text-slate-800 font-black">{devisa.volume}</span></span>
                    <span className={`font-black shrink-0 ${devisa.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {devisa.netFlow}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <span
                      className={`text-[7.5px] font-black uppercase px-1.5 py-0.2 rounded tracking-wider transition-all flex items-center gap-1 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-indigo-600 group-hover:bg-indigo-50 border border-slate-200'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white animate-pulse' : 'bg-indigo-500'}`} />
                      <span>{isSelected ? 'DIBUKA' : 'BUKA'}</span>
                      <ChevronRight className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* KOLOM KANAN: DEVISA TERBUKA SECARA LEBAR (8 KOLOM GRID - LEBIH LEBAR DAN LEGA) */}
        <div className={`md:col-span-8 xl:col-span-8 ${glassCard} flex flex-col justify-between overflow-hidden p-3 sm:p-3.5 h-full min-h-0 transition-all duration-300`}>
          {/* Header Devisa Lebar */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl text-white font-black text-sm flex items-center justify-center font-mono shadow-xs ${activeDevisa.bg}`}>
                  {activeDevisa.code}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-black tracking-wide text-slate-800 uppercase font-mono">
                      DEVISA {activeDevisa.name.toUpperCase()}
                    </span>
                    <span className="text-[8px] font-extrabold px-2 py-0.2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                      {activeDevisa.badge}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[8px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE FEED
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">
                    {activeDevisa.subName} • {activeDevisa.reserveRatio}
                  </span>
                </div>
              </div>

              {/* Action: Maximize to Fullscreen Wide Modal */}
              <div className="flex items-center gap-1.5">
                <div className="text-right font-mono pr-1">
                  <span className="text-[8px] text-slate-400 block font-bold">SPOT RATE</span>
                  <span className="text-xs font-black text-slate-900">{getLiveSpotRate(activeDevisa.code, activeDevisa.spotRate)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWideExpandedModal(true)}
                  title="Perbesar Layar Penuh (Wide View)"
                  className="px-2 py-1 rounded-xl bg-gradient-to-b from-[#ffffff] to-[#e4eaf4] text-indigo-600 hover:text-indigo-800 border border-slate-200 shadow-xs flex items-center gap-1 text-[9px] font-mono font-bold hover:brightness-105 active:translate-y-[0.5px] transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3 stroke-[2.2]" />
                  <span className="hidden sm:inline">LAYAR PENUH</span>
                </button>
              </div>
            </div>

            {/* Visual SVG Enhanced Institutional Trading Chart with Live API Feed ("perbaiki bentuk char") */}
            <div className="w-full my-0.5">
              <InstitutionalFxChart
                code={activeDevisa.code}
                color={activeDevisa.color}
                name={activeDevisa.name}
                liveRate={getLiveNumericRate(activeDevisa.code)}
                apiProvider={apiProvider}
                lastUpdated={lastUpdated}
                isFetching={isFetching}
                onRefresh={refreshRates}
                historicalApiData={historicalApiSeries}
              />
            </div>

            {/* 4 Strip Ringkasan Devisa Terbuka */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 my-1 text-[9px] font-mono">
              <div className="p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[7.5px] text-slate-400 font-bold block uppercase">NET FLOW DEVISA</span>
                <span className={`text-[11px] font-black ${activeDevisa.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {activeDevisa.netFlow}
                </span>
                <span className="text-[7px] text-slate-400 block truncate">{activeDevisa.share} ALOKASI TOTAL</span>
              </div>

              <div className="p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[7.5px] text-slate-400 font-bold block uppercase">VOLUME 24 JAM</span>
                <span className="text-[11px] font-black text-slate-800">{activeDevisa.volume}</span>
                <span className="text-[7px] text-slate-400 block truncate">INTERBANK NOTIONAL</span>
              </div>

              <div className="p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[7.5px] text-slate-400 font-bold block uppercase">KLIRING & FILL</span>
                <span className="text-[11px] font-black text-indigo-700">{activeDevisa.settlementRate}</span>
                <span className="text-[7px] text-slate-400 block truncate">{activeDevisa.matchedVenue}</span>
              </div>

              <div className="p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[7.5px] text-slate-400 font-bold block uppercase">LATENSI & SPREAD</span>
                <span className="text-[11px] font-black text-emerald-700">{activeDevisa.latency}</span>
                <span className="text-[7px] text-slate-400 block truncate">SPREAD {activeDevisa.spread}</span>
              </div>
            </div>

            {/* Pasangan Mata Uang Terkait Devisa Ini */}
            <div className="mt-1">
              <div className="flex items-center justify-between text-[8px] font-black text-slate-400 uppercase font-mono mb-0.5">
                <span>PASANGAN INTERBANK AKTIF ({activeDevisa.code})</span>
                <span className="text-slate-500 font-normal">REAL-TIME LIQUIDITY</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[8.5px] font-mono">
                {activeDevisa.interbankPairs.map((p) => (
                  <div key={p.pair} className="p-1 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="font-black text-slate-800 block leading-tight">{p.pair}</span>
                      <span className="text-[7.5px] text-slate-500 font-bold">{p.rate}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-black text-[8px] ${p.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {p.change}
                      </span>
                      <span className="text-[7px] text-slate-400 block">{p.vol}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Card Lebar */}
          <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
            <span className="truncate max-w-[70%]">{activeDevisa.description}</span>
            <span className="text-indigo-600 font-black">STATUS: AKTIF DIBUKA</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. BARIS BAWAH: 3 TABEL FULL-WIDTH READ-ONLY                   */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0">
        {/* Block 1: Tabel 1 (Pasangan Mata Uang Utama) */}
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                  G10 FX SPOT LEDGER
                </span>
              </div>
              <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200/80 font-mono">
                {FX_PAIRS.length} PAIRS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[9.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-1 px-1">Pair</th>
                    <th className="py-1 px-1 text-right">Spot Rate</th>
                    <th className="py-1 px-1 text-right">24h Vol</th>
                    <th className="py-1 px-1 text-center">Bias</th>
                    <th className="py-1 px-1 text-right">Spread</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[9.5px]">
                  {FX_PAIRS.map((p) => (
                    <tr key={p.pair} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="py-1.5 px-1 font-black text-slate-800">{p.pair}</td>
                      <td className="py-1.5 px-1 text-right font-black text-slate-900">{p.spotRate}</td>
                      <td className="py-1.5 px-1 text-right text-slate-700 font-bold">{p.volume24h}</td>
                      <td className="py-1.5 px-1 text-center">
                        <span
                          className={`inline-block px-1.5 py-0.2 rounded text-[7px] font-black tracking-wider border ${
                            p.netBias.startsWith('BUY')
                              ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'
                              : 'bg-rose-500/15 text-rose-700 border-rose-500/30'
                          }`}
                        >
                          {p.netBias.split(' ')[0]}
                        </span>
                      </td>
                      <td className="py-1.5 px-1 text-right text-slate-500">{p.spreadBps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
            <span>PAIR VOL: $4.35M</span>
            <span className="text-indigo-600 font-bold">AVG SPREAD 0.21 bps</span>
          </div>
        </div>

        {/* Block 2: Tabel 2 (Venue Likuiditas & Kliring) */}
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                  CLEARING & VENUE POOLS
                </span>
              </div>
              <span className="text-[8px] font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.2 rounded-full border border-cyan-200/80 font-mono">
                {LIQUIDITY_POOLS.length} GATEWAY
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[9.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-1 px-1">Gateway Venue</th>
                    <th className="py-1 px-1 text-right">Matched</th>
                    <th className="py-1 px-1 text-right">Latency</th>
                    <th className="py-1 px-1 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[9.5px]">
                  {LIQUIDITY_POOLS.map((l) => (
                    <tr key={l.poolName} className="hover:bg-cyan-50/30 transition-colors">
                      <td className="py-1.5 px-1 font-black text-slate-800 truncate max-w-[120px]">
                        {l.poolName}
                      </td>
                      <td className="py-1.5 px-1 text-right font-black text-slate-800">{l.volumeMatched}</td>
                      <td className="py-1.5 px-1 text-right text-slate-700 font-bold">{l.latencyMs}</td>
                      <td className="py-1.5 px-1 text-center">
                        <span className="inline-block px-1.5 py-0.2 rounded text-[7px] font-black tracking-wider bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                          {l.clsStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
            <span>MATCHED: $6.85M</span>
            <span className="text-cyan-700 font-bold">PVP COMPLIANT</span>
          </div>
        </div>

        {/* Block 3: Tabel 3 (Performa Desk FX) */}
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                  FX DESK CARRY & ARB PNL
                </span>
              </div>
              <span className="text-[8px] font-bold text-emerald-700 bg-emerald-500/10 px-1.5 py-0.2 rounded-full border border-emerald-500/20 font-mono">
                {FX_DESK_TRADERS.length} DESKS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[9.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-1 px-1">Trader ID</th>
                    <th className="py-1 px-1">Focus</th>
                    <th className="py-1 px-1 text-right">Notional</th>
                    <th className="py-1 px-1 text-right">Realized PnL</th>
                    <th className="py-1 px-1 text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[9.5px]">
                  {FX_DESK_TRADERS.map((t) => (
                    <tr key={t.traderId} className="hover:bg-slate-50 transition-colors">
                      <td className="py-1.5 px-1 font-black text-slate-800">{t.traderId}</td>
                      <td className="py-1.5 px-1 text-[8px] text-slate-500 truncate max-w-[90px]">{t.pairFocus}</td>
                      <td className="py-1.5 px-1 text-right font-black text-slate-800">{t.notional}</td>
                      <td className="py-1.5 px-1 text-right font-black text-emerald-600">{t.pnl}</td>
                      <td className="py-1.5 px-1 text-right text-slate-700 font-bold">{t.latencyMs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
            <span>NOTIONAL: $4.35M</span>
            <span className="text-emerald-600 font-bold">+$142,000.00 PNL</span>
          </div>
        </div>
      </section>

      {/* MODAL / OVERLAY WIDE VIEW LAYAR PENUH */}
      {isWideExpandedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-[26px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_24px_48px_-10px_rgba(15,23,42,0.35),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-4 sm:p-6 text-slate-800 flex flex-col justify-between">
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-2xl text-white font-black text-base flex items-center justify-center font-mono shadow-md ${activeDevisa.bg}`}>
                  {activeDevisa.code}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black font-mono text-slate-900 uppercase tracking-tight">
                      DEVISA {activeDevisa.name} ({activeDevisa.code})
                    </h2>
                    <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                      {activeDevisa.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {activeDevisa.subName} • {activeDevisa.reserveRatio}
                  </p>
                </div>
              </div>

              {/* Selector 4 Devisa Tab di Modal */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 font-mono text-[10px]">
                {FOUR_MAJOR_DEVISA.map((d) => (
                  <button
                    key={d.code}
                    type="button"
                    onClick={() => setSelectedDevisaCode(d.code)}
                    className={`px-2.5 py-1 rounded-lg font-black transition-all cursor-pointer ${
                      selectedDevisaCode === d.code
                        ? `${d.bg} text-white shadow-xs`
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {d.code}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsWideExpandedModal(false)}
                  className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center ml-1 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Content Modal Lebar */}
            <div className="space-y-4">
              {/* Top 4 Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[8px] text-slate-400 font-bold block uppercase">NET FLOW DEVISA</span>
                  <div className={`text-base font-black ${activeDevisa.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {activeDevisa.netFlow}
                  </div>
                  <span className="text-[8px] text-slate-500 font-bold">{activeDevisa.share} ALOKASI TOTAL</span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[8px] text-slate-400 font-bold block uppercase">VOLUME 24 JAM</span>
                  <div className="text-base font-black text-slate-800">{activeDevisa.volume}</div>
                  <span className="text-[8px] text-slate-500 font-bold">NOTIONAL CLEARED</span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[8px] text-slate-400 font-bold block uppercase">SETTLEMENT VENUE</span>
                  <div className="text-base font-black text-indigo-700">{activeDevisa.settlementRate}</div>
                  <span className="text-[8px] text-slate-500 font-bold truncate block">{activeDevisa.matchedVenue}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[8px] text-slate-400 font-bold block uppercase">LATENSI & SPREAD</span>
                  <div className="text-base font-black text-emerald-700">{activeDevisa.latency}</div>
                  <span className="text-[8px] text-slate-500 font-bold">SPREAD {activeDevisa.spread}</span>
                </div>
              </div>

              {/* Large Enhanced Institutional Trading Chart with Live API Feed */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <InstitutionalFxChart
                  code={activeDevisa.code}
                  color={activeDevisa.color}
                  name={activeDevisa.name}
                  liveRate={getLiveNumericRate(activeDevisa.code)}
                  apiProvider={apiProvider}
                  lastUpdated={lastUpdated}
                  isFetching={isFetching}
                  onRefresh={refreshRates}
                  isModal={true}
                  historicalApiData={historicalApiSeries}
                />
              </div>

              {/* Kurva Tenor Swaps */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs font-mono text-xs">
                <span className="font-black text-slate-800 uppercase block mb-2">
                  STRUKTUR SUKU BUNGA & SWAP FORWARD ({activeDevisa.code})
                </span>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {activeDevisa.curveTenors.map((t) => (
                    <div key={t.tenor} className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[9px] text-slate-400 font-bold block">{t.tenor} TENOR</span>
                      <span className="text-sm font-black text-slate-900 block my-0.5">{t.rate}</span>
                      <span className="text-[9px] text-emerald-600 font-bold">{t.spread} SPREAD</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 mt-4 text-xs font-mono">
              <span className="text-slate-500">{activeDevisa.description}</span>
              <button
                type="button"
                onClick={() => setIsWideExpandedModal(false)}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase transition-colors cursor-pointer"
              >
                Tutup Layar Penuh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
