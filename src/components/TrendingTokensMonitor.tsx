import React, { useState, useEffect, useCallback } from 'react';
import { Flame, ArrowUpRight, ArrowDownRight, RefreshCw, Zap, TrendingUp } from 'lucide-react';

export interface TrendingToken {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volumeUsd: number;
  trades: number;
  color: string;
}

const HOT_TOKENS_META: Record<string, { name: string; color: string }> = {
  BTC: { name: 'Bitcoin', color: '#f59e0b' },
  ETH: { name: 'Ethereum', color: '#6366f1' },
  SOL: { name: 'Solana', color: '#06b6d4' },
  XRP: { name: 'Ripple', color: '#3b82f6' },
  SUI: { name: 'Sui Network', color: '#0ea5e9' },
  NEAR: { name: 'NEAR Protocol', color: '#10b981' },
  DOGE: { name: 'Dogecoin', color: '#eab308' },
  BNB: { name: 'BNB Chain', color: '#f59e0b' },
  AVAX: { name: 'Avalanche', color: '#ef4444' },
  PEPE: { name: 'Pepe', color: '#22c55e' },
};

const SYMBOLS_QUERY = [
  'BTCUSDT',
  'ETHUSDT',
  'SOLUSDT',
  'XRPUSDT',
  'SUIUSDT',
  'NEARUSDT',
  'DOGEUSDT',
  'BNBUSDT',
  'AVAXUSDT',
  'PEPEUSDT',
];

// Fallback trending data
const FALLBACK_TRENDING: TrendingToken[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 84020, change24h: 3.45, volumeUsd: 1450000000, trades: 2600000, color: '#f59e0b' },
  { symbol: 'ETH', name: 'Ethereum', price: 2690, change24h: 0.85, volumeUsd: 610000000, trades: 2300000, color: '#6366f1' },
  { symbol: 'SOL', name: 'Solana', price: 120.8, change24h: 3.82, volumeUsd: 480000000, trades: 1300000, color: '#06b6d4' },
  { symbol: 'XRP', name: 'Ripple', price: 1.56, change24h: 2.14, volumeUsd: 510000000, trades: 2200000, color: '#3b82f6' },
  { symbol: 'SUI', name: 'Sui Network', price: 1.16, change24h: 15.2, volumeUsd: 190000000, trades: 1500000, color: '#0ea5e9' },
  { symbol: 'NEAR', name: 'NEAR Protocol', price: 4.88, change24h: 9.35, volumeUsd: 260000000, trades: 1050000, color: '#10b981' },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.098, change24h: 3.1, volumeUsd: 110000000, trades: 920000, color: '#eab308' },
  { symbol: 'AVAX', name: 'Avalanche', price: 10.68, change24h: 4.7, volumeUsd: 55000000, trades: 450000, color: '#ef4444' },
];

export interface TrendingTokensMonitorProps {
  onSelectToken?: (symbol: string) => void;
  selectedSymbol?: string;
}

export const TrendingTokensMonitor: React.FC<TrendingTokensMonitorProps> = ({
  onSelectToken,
  selectedSymbol = 'BTC',
}) => {
  const [tokens, setTokens] = useState<TrendingToken[]>(FALLBACK_TRENDING);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live');

  const fetchTrendingTokens = useCallback(async () => {
    try {
      const url =
        'https://api.binance.com/api/v3/ticker/24hr?symbols=' +
        encodeURIComponent(JSON.stringify(SYMBOLS_QUERY));
      const res = await fetch(url);
      if (!res.ok) return;

      const data = await res.json();
      if (!Array.isArray(data)) return;

      const formatted: TrendingToken[] = data.map((item: any) => {
        const rawSym = item.symbol.replace('USDT', '');
        const meta = HOT_TOKENS_META[rawSym] || { name: rawSym, color: '#6366f1' };
        return {
          symbol: rawSym,
          name: meta.name,
          price: parseFloat(item.lastPrice),
          change24h: parseFloat(item.priceChangePercent),
          volumeUsd: parseFloat(item.quoteVolume),
          trades: parseInt(item.count, 10) || 0,
          color: meta.color,
        };
      });

      // Sort by 24h Volume USD descending (highest volume / most transacted)
      formatted.sort((a, b) => b.volumeUsd - a.volumeUsd);
      setTokens(formatted);
      setLastSyncTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      // keep fallback
    }
  }, []);

  useEffect(() => {
    fetchTrendingTokens();
    const interval = setInterval(fetchTrendingTokens, 6000);
    return () => clearInterval(interval);
  }, [fetchTrendingTokens]);

  const formatPrice = (p: number) => {
    if (p >= 1000) {
      return `$${p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (p >= 1) {
      return `$${p.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
    }
    return `$${p.toFixed(5)}`;
  };

  const formatVol = (v: number) => {
    if (v >= 1e9) {
      return `$${(v / 1e9).toFixed(2)}B`;
    }
    if (v >= 1e6) {
      return `$${Math.round(v / 1e6)}M`;
    }
    return `$${Math.round(v / 1e3)}k`;
  };

  return (
    <div className="flex flex-col h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="p-0.5 rounded bg-rose-50 border border-rose-200 text-rose-600">
            <Flame className="w-3.5 h-3.5 stroke-[2.4]" />
          </span>
          <div>
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono block leading-tight">
              TOKEN HITS & TOP TRANSAKSI (REALTIME)
            </span>
            <span className="text-[8px] text-slate-400 font-mono">
              Diurutkan berdasar volume transaksi 24 jam • Klik untuk buka chart
            </span>
          </div>
        </div>
        <span className="text-[8px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200/80 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          LIVE FEED
        </span>
      </div>

      {/* Realtime Table - Fills Full Height to the Bottom */}
      <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto pr-0.5 custom-scrollbar">
        <table className="w-full text-left font-mono text-[9px]">
          <thead>
            <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
              <th className="py-1 px-1">Token</th>
              <th className="py-1 px-1 text-right">Harga Live</th>
              <th className="py-1 px-1 text-right">24h %</th>
              <th className="py-1 px-1 text-right">Volume Transaksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tokens.map((t, idx) => {
              const isSelected = selectedSymbol === t.symbol;
              const isUp = t.change24h >= 0;
              return (
                <tr
                  key={t.symbol}
                  onClick={() => onSelectToken?.(t.symbol)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-50/90 font-bold'
                      : 'hover:bg-slate-50'
                  }`}
                  title={`Klik untuk menampilkan grafik ${t.symbol} dari 2020 sampai sekarang`}
                >
                  <td className="py-1 px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-bold text-slate-400 w-3 text-right">
                        #{idx + 1}
                      </span>
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="font-black text-slate-900">{t.symbol}</span>
                      <span className="text-[7.5px] text-slate-400 hidden sm:inline truncate max-w-[50px]">
                        {t.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-1 px-1 text-right font-black text-slate-900">
                    {formatPrice(t.price)}
                  </td>
                  <td className="py-1 px-1 text-right">
                    <span
                      className={`inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[8px] font-black ${
                        isUp
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60'
                          : 'text-rose-700 bg-rose-50 border border-rose-200/60'
                      }`}
                    >
                      {isUp ? (
                        <ArrowUpRight className="w-2.5 h-2.5 stroke-[2.5]" />
                      ) : (
                        <ArrowDownRight className="w-2.5 h-2.5 stroke-[2.5]" />
                      )}
                      {isUp ? `+${t.change24h.toFixed(1)}%` : `${t.change24h.toFixed(1)}%`}
                    </span>
                  </td>
                  <td className="py-1 px-1 text-right font-extrabold text-slate-700">
                    {formatVol(t.volumeUsd)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1 flex-shrink-0">
        <span className="flex items-center gap-1 text-rose-700 font-bold">
          <Zap className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
          HOT MOMENTUM TOKENS
        </span>
        <span className="text-slate-400">Sinkron: {lastSyncTime}</span>
      </div>
    </div>
  );
};
