import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, Skull, Waves, ArrowUpRight, ArrowDownRight, Radio } from 'lucide-react';

export interface LiquidationEvent {
  id: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  amountUsd: number;
  price: number;
  exchange: 'Binance' | 'Bybit' | 'OKX';
  timestamp: string;
}

const INITIAL_EVENTS: LiquidationEvent[] = [
  { id: 'liq-1', symbol: 'BTC', side: 'LONG', amountUsd: 1420500, price: 83940, exchange: 'Binance', timestamp: 'Baru saja' },
  { id: 'liq-2', symbol: 'ETH', side: 'SHORT', amountUsd: 785000, price: 2694.5, exchange: 'Bybit', timestamp: '4 dtk lalu' },
  { id: 'liq-3', symbol: 'SOL', side: 'LONG', amountUsd: 340200, price: 120.4, exchange: 'OKX', timestamp: '9 dtk lalu' },
  { id: 'liq-4', symbol: 'XRP', side: 'SHORT', amountUsd: 215000, price: 1.572, exchange: 'Binance', timestamp: '14 dtk lalu' },
  { id: 'liq-5', symbol: 'SUI', side: 'LONG', amountUsd: 180000, price: 1.155, exchange: 'Bybit', timestamp: '22 dtk lalu' },
];

const SEED_PAIRS = [
  { symbol: 'BTC', basePrice: 84000, maxAmount: 2500000 },
  { symbol: 'ETH', basePrice: 2690, maxAmount: 1200000 },
  { symbol: 'SOL', basePrice: 120.5, maxAmount: 600000 },
  { symbol: 'DOGE', basePrice: 0.098, maxAmount: 350000 },
  { symbol: 'AVAX', basePrice: 10.65, maxAmount: 280000 },
  { symbol: 'NEAR', basePrice: 4.88, maxAmount: 420000 },
  { symbol: 'BNB', basePrice: 775, maxAmount: 850000 },
];

const EXCHANGES: Array<'Binance' | 'Bybit' | 'OKX'> = ['Binance', 'Bybit', 'OKX'];

export interface WhaleLiquidationStreamProps {
  onSelectToken?: (symbol: string) => void;
}

export const WhaleLiquidationStream: React.FC<WhaleLiquidationStreamProps> = ({ onSelectToken }) => {
  const [events, setEvents] = useState<LiquidationEvent[]>(INITIAL_EVENTS);
  const [totalLiq24h, setTotalLiq24h] = useState<number>(148650000);
  const [filterSide, setFilterSide] = useState<'ALL' | 'LONG' | 'SHORT'>('ALL');

  useEffect(() => {
    const interval = setInterval(() => {
      const pair = SEED_PAIRS[Math.floor(Math.random() * SEED_PAIRS.length)];
      const side: 'LONG' | 'SHORT' = Math.random() > 0.45 ? 'LONG' : 'SHORT';
      const exchange = EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)];
      const amount = Math.floor(Math.random() * (pair.maxAmount - 80000) + 80000);
      const priceOffset = (Math.random() - 0.5) * 0.01 * pair.basePrice;
      const price = +(pair.basePrice + priceOffset).toFixed(pair.basePrice < 5 ? 4 : 2);

      const newEvent: LiquidationEvent = {
        id: `liq-${Date.now()}-${Math.random()}`,
        symbol: pair.symbol,
        side,
        amountUsd: amount,
        price,
        exchange,
        timestamp: 'Baru saja',
      };

      setEvents((prev) => {
        const updated = prev.slice(0, 7).map((e, idx) => ({
          ...e,
          timestamp: idx === 0 ? '3 dtk lalu' : idx === 1 ? '7 dtk lalu' : idx === 2 ? '14 dtk lalu' : '28 dtk lalu',
        }));
        return [newEvent, ...updated];
      });

      setTotalLiq24h((prev) => prev + amount);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const filteredEvents = filterSide === 'ALL' ? events : events.filter((e) => e.side === filterSide);

  const formatAmount = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  return (
    <div className="flex flex-col justify-between h-full overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping flex-shrink-0" />
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-500 uppercase font-mono truncate flex items-center gap-1">
              <Skull className="w-3.5 h-3.5 text-rose-500 stroke-[2.3]" />
              WHALE LIQUIDATION STREAM
            </span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[8px] font-black bg-rose-50 text-rose-700 border border-rose-200/80 font-mono">
              <Radio className="w-2.5 h-2.5 text-rose-600 animate-pulse" />
              LIVE FEED
            </span>
          </div>
        </div>

        {/* 24H Liquidation Summary Meter */}
        <div className="flex items-baseline justify-between gap-2 mt-1 mb-1.5">
          <div>
            <div className="text-[8.5px] font-bold text-slate-400 uppercase font-mono">
              TOTAL LIQUIDASI 24 JAM
            </div>
            <div className="text-lg sm:text-xl font-black text-rose-600 font-mono tracking-tight">
              {formatAmount(totalLiq24h)}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200">
            {(['ALL', 'LONG', 'SHORT'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilterSide(s)}
                className={`text-[8px] font-mono px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                  filterSide === s
                    ? s === 'LONG'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : s === 'SHORT'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Stream List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 min-h-0 custom-scrollbar">
        {filteredEvents.map((evt, idx) => {
          const isLong = evt.side === 'LONG';
          const isBigWhale = evt.amountUsd >= 500000;

          return (
            <div
              key={evt.id}
              onClick={() => onSelectToken?.(evt.symbol)}
              className={`p-2 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/90 border-b-2 border-b-slate-300 shadow-[0_2px_4px_rgba(15,23,42,0.04)] flex items-center justify-between gap-2 transition-all cursor-pointer hover:border-indigo-300 hover:brightness-105 active:translate-y-[1px] font-mono ${
                idx === 0 ? 'ring-1 ring-rose-500/40 animate-in fade-in duration-200' : ''
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 border ${
                    isLong
                      ? 'bg-rose-500/10 text-rose-600 border-rose-300/60'
                      : 'bg-emerald-500/10 text-emerald-600 border-emerald-300/60'
                  }`}
                >
                  {isLong ? <ArrowDownRight className="w-4 h-4 stroke-[2.8]" /> : <ArrowUpRight className="w-4 h-4 stroke-[2.8]" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xs text-slate-800">{evt.symbol}</span>
                    <span
                      className={`text-[7.5px] font-black px-1 rounded uppercase ${
                        isLong ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {evt.side} RECKT
                    </span>
                    {isBigWhale && (
                      <span className="text-[7px] font-black px-1 rounded bg-amber-100 text-amber-700 border border-amber-300">
                        WHALE 🐋
                      </span>
                    )}
                  </div>
                  <div className="text-[8px] text-slate-400 truncate mt-0.5">
                    @{evt.price.toLocaleString('en-US')} • {evt.exchange}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className={`text-xs font-black ${isLong ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {formatAmount(evt.amountUsd)}
                </div>
                <div className="text-[8px] text-slate-400">{evt.timestamp}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8.5px] font-mono text-slate-400 mt-1 shrink-0">
        <span className="flex items-center gap-1">
          <Waves className="w-3 h-3 text-indigo-500" /> Multi-Exchange WebSocket
        </span>
        <span className="text-emerald-600 font-bold">Latency 8ms</span>
      </div>
    </div>
  );
};
