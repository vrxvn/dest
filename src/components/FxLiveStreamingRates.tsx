import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Radio, Activity, Zap, BarChart3, Gauge } from 'lucide-react';

export interface FxTickItem {
  pair: string;
  bid: number;
  ask: number;
  spreadPips: number;
  change24h: number;
  direction: 'up' | 'down';
  volumeStr: string;
}

export interface CurrencyStrength {
  code: string;
  name: string;
  score: number; // 0 to 10
  status: 'VERY STRONG' | 'STRONG' | 'NEUTRAL' | 'WEAK' | 'VERY WEAK';
  color: string;
  barColor: string;
  change24h: number;
}

const INITIAL_PAIRS: FxTickItem[] = [
  { pair: 'EUR/USD', bid: 1.0842, ask: 1.0844, spreadPips: 0.2, change24h: 0.18, direction: 'up', volumeStr: '$1.42B' },
  { pair: 'USD/JPY', bid: 154.62, ask: 154.65, spreadPips: 0.3, change24h: -0.32, direction: 'down', volumeStr: '$1.18B' },
  { pair: 'GBP/USD', bid: 1.2985, ask: 1.2988, spreadPips: 0.3, change24h: 0.24, direction: 'up', volumeStr: '$890M' },
  { pair: 'USD/CHF', bid: 0.8845, ask: 0.8848, spreadPips: 0.3, change24h: -0.15, direction: 'down', volumeStr: '$540M' },
  { pair: 'AUD/USD', bid: 0.6580, ask: 0.6583, spreadPips: 0.3, change24h: 0.42, direction: 'up', volumeStr: '$620M' },
  { pair: 'USD/CAD', bid: 1.3780, ask: 1.3784, spreadPips: 0.4, change24h: -0.08, direction: 'down', volumeStr: '$490M' },
];

export const FxLiveStreamingRates: React.FC = () => {
  const [ticks, setTicks] = useState<FxTickItem[]>(INITIAL_PAIRS);
  const [viewMode, setViewMode] = useState<'RATES' | 'STRENGTH'>('RATES');

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.48) * (item.pair.includes('JPY') ? 0.04 : 0.0003);
          const newBid = +(item.bid + delta).toFixed(item.pair.includes('JPY') ? 2 : 4);
          const spread = item.spreadPips;
          const newAsk = +(newBid + spread * (item.pair.includes('JPY') ? 0.01 : 0.0001)).toFixed(
            item.pair.includes('JPY') ? 2 : 4
          );
          const direction = delta >= 0 ? 'up' : 'down';
          return {
            ...item,
            bid: newBid,
            ask: newAsk,
            direction,
          };
        })
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  // Compute live currency strength scores from current rates & changes
  const currencyStrengths = useMemo<CurrencyStrength[]>(() => {
    const eurUsd = ticks.find((t) => t.pair === 'EUR/USD')?.change24h ?? 0.18;
    const usdJpy = ticks.find((t) => t.pair === 'USD/JPY')?.change24h ?? -0.32;
    const gbpUsd = ticks.find((t) => t.pair === 'GBP/USD')?.change24h ?? 0.24;
    const usdChf = ticks.find((t) => t.pair === 'USD/CHF')?.change24h ?? -0.15;
    const audUsd = ticks.find((t) => t.pair === 'AUD/USD')?.change24h ?? 0.42;
    const usdCad = ticks.find((t) => t.pair === 'USD/CAD')?.change24h ?? -0.08;

    // Relative scoring logic normalized to 0.0 - 10.0
    const rawScores = [
      { code: 'USD', name: 'US Dollar', score: Math.min(9.8, Math.max(1.0, 7.8 - (eurUsd + gbpUsd + audUsd) * 1.5 + (usdJpy + usdCad) * 1.2)), change24h: 0.42 },
      { code: 'CHF', name: 'Swiss Franc', score: Math.min(9.5, Math.max(1.0, 7.4 - usdChf * 3.5)), change24h: 0.35 },
      { code: 'CAD', name: 'Canadian Dollar', score: Math.min(9.0, Math.max(1.0, 6.5 - usdCad * 3.0)), change24h: 0.18 },
      { code: 'EUR', name: 'Eurozone Euro', score: Math.min(8.5, Math.max(1.0, 5.4 + eurUsd * 3.0)), change24h: eurUsd },
      { code: 'GBP', name: 'British Pound', score: Math.min(8.5, Math.max(1.0, 5.1 + gbpUsd * 2.8)), change24h: gbpUsd },
      { code: 'AUD', name: 'Aussie Dollar', score: Math.min(8.0, Math.max(1.0, 4.3 + audUsd * 2.5)), change24h: audUsd },
      { code: 'NZD', name: 'NZ Dollar', score: Math.min(7.5, Math.max(1.0, 3.8 + (audUsd * 0.7) * 2.0)), change24h: -0.12 },
      { code: 'JPY', name: 'Japanese Yen', score: Math.min(7.0, Math.max(1.0, 2.8 - usdJpy * 2.5)), change24h: -0.45 },
    ];

    return rawScores
      .map((item) => {
        let status: CurrencyStrength['status'] = 'NEUTRAL';
        let color = 'text-slate-700';
        let barColor = 'bg-indigo-500';

        if (item.score >= 7.5) {
          status = 'VERY STRONG';
          color = 'text-emerald-700';
          barColor = 'bg-gradient-to-r from-emerald-500 to-emerald-600';
        } else if (item.score >= 6.0) {
          status = 'STRONG';
          color = 'text-emerald-600';
          barColor = 'bg-emerald-500';
        } else if (item.score >= 4.5) {
          status = 'NEUTRAL';
          color = 'text-blue-700';
          barColor = 'bg-blue-500';
        } else if (item.score >= 3.0) {
          status = 'WEAK';
          color = 'text-amber-600';
          barColor = 'bg-amber-500';
        } else {
          status = 'VERY WEAK';
          color = 'text-rose-600';
          barColor = 'bg-rose-500';
        }

        return {
          code: item.code,
          name: item.name,
          score: +item.score.toFixed(1),
          status,
          color,
          barColor,
          change24h: item.change24h,
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [ticks]);

  return (
    <div className="flex flex-col justify-between h-full overflow-hidden font-mono">
      {/* Header with Mode Toggle */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping shrink-0" />
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase truncate">
              {viewMode === 'RATES' ? 'G10 FX STREAMING TICKER' : 'FX CURRENCY STRENGTH METER'}
            </span>
          </div>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('RATES')}
              className={`px-1.5 py-0.5 rounded text-[7.5px] font-bold transition-all cursor-pointer ${
                viewMode === 'RATES'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              RATES
            </button>
            <button
              type="button"
              onClick={() => setViewMode('STRENGTH')}
              className={`px-1.5 py-0.5 rounded text-[7.5px] font-bold transition-all cursor-pointer ${
                viewMode === 'STRENGTH'
                  ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/60'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              STRENGTH
            </button>
          </div>
        </div>

        {/* Top Summary Bar */}
        <div className="flex items-center justify-between text-[8px] text-slate-400 py-0.5">
          <span>{viewMode === 'RATES' ? 'INSTITUTIONAL FIX 4.4' : 'G8 RELATIVE MOMENTUM MATRIX'}</span>
          <span className="text-emerald-600 font-bold">
            {viewMode === 'RATES' ? 'AVG SPREAD 0.28 PIPS' : `STRONGEST: ${currencyStrengths[0]?.code} (${currencyStrengths[0]?.score})`}
          </span>
        </div>
      </div>

      {/* VIEW 1: Live Table Rates */}
      {viewMode === 'RATES' && (
        <div className="flex-1 overflow-y-auto space-y-1 my-1 pr-0.5 min-h-0 custom-scrollbar">
          {ticks.map((t) => {
            const isUp = t.direction === 'up';
            return (
              <div
                key={t.pair}
                className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/90 border-b-2 border-b-slate-300 shadow-[0_1.5px_3px_rgba(15,23,42,0.04)] flex items-center justify-between gap-1.5 transition-all hover:border-indigo-300"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 border ${
                      isUp ? 'bg-emerald-500/10 text-emerald-600 border-emerald-300/50' : 'bg-rose-500/10 text-rose-600 border-rose-300/50'
                    }`}
                  >
                    {isUp ? <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.8]" /> : <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.8]" />}
                  </div>
                  <div>
                    <div className="font-black text-xs text-slate-800 leading-tight">{t.pair}</div>
                    <div className="text-[7.5px] text-slate-400 font-medium">{t.volumeStr} 24h</div>
                  </div>
                </div>

                {/* Bid / Ask Price */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-[7.5px] text-slate-400">BID</div>
                    <div className={`text-xs font-black transition-colors ${isUp ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {t.bid}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[7.5px] text-slate-400">ASK</div>
                    <div className={`text-xs font-black transition-colors ${!isUp ? 'text-rose-700' : 'text-slate-800'}`}>
                      {t.ask}
                    </div>
                  </div>
                </div>

                {/* Spread & Change */}
                <div className="text-right shrink-0">
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {t.spreadPips} pips
                  </span>
                  <div className={`text-[8px] font-bold mt-0.5 ${t.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.change24h >= 0 ? '+' : ''}{t.change24h}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Currency Strength Meter */}
      {viewMode === 'STRENGTH' && (
        <div className="flex-1 overflow-y-auto space-y-1 my-1 pr-0.5 min-h-0 custom-scrollbar">
          {currencyStrengths.map((cs, idx) => (
            <div
              key={cs.code}
              className="p-1.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border border-slate-200 shadow-2xs flex items-center justify-between gap-2"
            >
              {/* Currency Badge & Name */}
              <div className="flex items-center gap-1.5 min-w-[75px]">
                <span className="w-5 h-5 rounded-md bg-slate-900 text-white font-black text-[9px] flex items-center justify-center shrink-0">
                  {cs.code}
                </span>
                <div className="min-w-0">
                  <div className="text-[9px] font-black text-slate-800 leading-tight truncate">{cs.name}</div>
                  <div className="text-[7px] text-slate-400">Rank #{idx + 1}</div>
                </div>
              </div>

              {/* Strength Visual Bar */}
              <div className="flex-1 min-w-0 px-1">
                <div className="flex items-center justify-between text-[7px] mb-0.5">
                  <span className={`font-black ${cs.color}`}>{cs.status}</span>
                  <span className="font-mono text-slate-600 font-bold">{cs.score} / 10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${cs.barColor}`}
                    style={{ width: `${(cs.score / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right shrink-0">
                <span
                  className={`text-[7.5px] font-black px-1.5 py-0.2 rounded border ${
                    cs.score >= 7.0
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : cs.score >= 4.5
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {cs.change24h >= 0 ? '+' : ''}{cs.change24h}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] text-slate-500 mt-1 shrink-0">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-indigo-500" />
          {viewMode === 'RATES' ? 'STP Direct Market Access' : 'Cross-Currency Pairs Divergence'}
        </span>
        <span className="text-indigo-600 font-bold">
          {viewMode === 'RATES' ? '1.2ms Latency' : `Top Divergence: ${currencyStrengths[0]?.code}/${currencyStrengths[currencyStrengths.length - 1]?.code}`}
        </span>
      </div>
    </div>
  );
};

