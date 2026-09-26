import React, { useState, useEffect } from 'react';
import { Activity, Fuel, ArrowRightLeft, Radio, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export interface DexSwapEvent {
  id: string;
  chain: 'Solana' | 'Ethereum' | 'Arbitrum' | 'Base';
  dex: string;
  fromToken: string;
  toToken: string;
  amountUsd: number;
  timeAgo: string;
}

const INITIAL_SWAPS: DexSwapEvent[] = [
  { id: 'sw-1', chain: 'Solana', dex: 'Raydium', fromToken: 'SOL', toToken: 'USDC', amountUsd: 48500, timeAgo: 'Baru saja' },
  { id: 'sw-2', chain: 'Ethereum', dex: 'Uniswap v3', fromToken: 'ETH', toToken: 'PEPE', amountUsd: 125000, timeAgo: '2 dtk lalu' },
  { id: 'sw-3', chain: 'Arbitrum', dex: 'Camelot', fromToken: 'ARB', toToken: 'USDC', amountUsd: 28400, timeAgo: '5 dtk lalu' },
  { id: 'sw-4', chain: 'Solana', dex: 'Jupiter', fromToken: 'JUP', toToken: 'SOL', amountUsd: 19800, timeAgo: '8 dtk lalu' },
  { id: 'sw-5', chain: 'Base', dex: 'Aerodrome', fromToken: 'AERO', toToken: 'ETH', amountUsd: 64200, timeAgo: '12 dtk lalu' },
];

const SWAP_POOLS = [
  { chain: 'Solana' as const, dex: 'Jupiter', from: 'SOL', to: 'USDT', maxUsd: 150000 },
  { chain: 'Solana' as const, dex: 'Raydium', from: 'USDC', to: 'WIF', maxUsd: 90000 },
  { chain: 'Ethereum' as const, dex: 'Uniswap v3', from: 'ETH', to: 'LINK', maxUsd: 220000 },
  { chain: 'Arbitrum' as const, dex: 'GMX', from: 'ETH', to: 'USDC', maxUsd: 180000 },
  { chain: 'Base' as const, dex: 'Uniswap v3', from: 'ETH', to: 'BRETT', maxUsd: 85000 },
  { chain: 'Ethereum' as const, dex: 'Curve Finance', from: 'USDC', to: 'USDT', maxUsd: 500000 },
];

export const OnChainRadar: React.FC = () => {
  const [swaps, setSwaps] = useState<DexSwapEvent[]>(INITIAL_SWAPS);
  const [ethGas, setEthGas] = useState(12);
  const [solTps, setSolTps] = useState(2840);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time DEX swap ingestion
      const tmpl = SWAP_POOLS[Math.floor(Math.random() * SWAP_POOLS.length)];
      const amountUsd = Math.floor(Math.random() * (tmpl.maxUsd - 10000) + 10000);

      const newSwap: DexSwapEvent = {
        id: `sw-${Date.now()}-${Math.random()}`,
        chain: tmpl.chain,
        dex: tmpl.dex,
        fromToken: tmpl.from,
        toToken: tmpl.to,
        amountUsd,
        timeAgo: 'Baru saja',
      };

      setSwaps((prev) => {
        const updated = prev.slice(0, 6).map((s, idx) => ({
          ...s,
          timeAgo: idx === 0 ? '3 dtk lalu' : idx === 1 ? '6 dtk lalu' : idx === 2 ? '11 dtk lalu' : '25 dtk lalu',
        }));
        return [newSwap, ...updated];
      });

      // Fluctuate gas & TPS
      setEthGas((prev) => Math.max(9, Math.min(24, prev + (Math.random() > 0.5 ? 1 : -1))));
      setSolTps((prev) => Math.max(2400, Math.min(3200, prev + Math.floor((Math.random() - 0.5) * 60))));
    }, 2800);

    return () => clearInterval(interval);
  }, []);

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
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping flex-shrink-0" />
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-500 uppercase font-mono truncate flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyan-600 stroke-[2.3]" />
              ON-CHAIN RADAR & DEX SWAPS
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[8px] font-black bg-cyan-50 text-cyan-700 border border-cyan-200/80 font-mono flex-shrink-0">
            <Radio className="w-2.5 h-2.5 text-cyan-600 animate-pulse" />
            MEMPOOL
          </span>
        </div>

        {/* Live Network Health Metrics: ETH Gas & SOL TPS */}
        <div className="grid grid-cols-2 gap-1.5 my-1.5">
          <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between font-mono">
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-amber-500 stroke-[2.2]" />
              <div>
                <div className="text-[7.5px] font-bold text-slate-400">ETH GAS</div>
                <div className="text-xs font-black text-slate-800">{ethGas} Gwei</div>
              </div>
            </div>
            <span className="text-[7.5px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">
              FAST
            </span>
          </div>

          <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between font-mono">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-500 stroke-[2.2]" />
              <div>
                <div className="text-[7.5px] font-bold text-slate-400">SOLANA TPS</div>
                <div className="text-xs font-black text-slate-800">{solTps.toLocaleString('en-US')}</div>
              </div>
            </div>
            <span className="text-[7.5px] font-bold text-cyan-600 bg-cyan-50 px-1 py-0.5 rounded border border-cyan-200">
              OPTIMAL
            </span>
          </div>
        </div>
      </div>

      {/* Real-time DEX Tape Feed */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 min-h-0 custom-scrollbar">
        {swaps.map((item, idx) => (
          <div
            key={item.id}
            className={`p-2 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/90 border-b-2 border-b-slate-300 shadow-[0_2px_4px_rgba(15,23,42,0.04)] flex items-center justify-between gap-2 transition-all font-mono ${
              idx === 0 ? 'ring-1 ring-cyan-500/40 animate-in fade-in duration-200' : ''
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center font-black text-xs shrink-0 text-indigo-600">
                <ArrowRightLeft className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1 text-xs font-black text-slate-800 truncate">
                  <span>{item.fromToken}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="text-indigo-600">{item.toToken}</span>
                  <span className="text-[7.5px] font-bold px-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {item.chain}
                  </span>
                </div>
                <div className="text-[8px] text-slate-400 truncate mt-0.5">
                  via {item.dex} • On-Chain Settlement
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs font-black text-slate-900">{formatAmount(item.amountUsd)}</div>
              <div className="text-[8px] text-slate-400">{item.timeAgo}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8.5px] font-mono text-slate-400 mt-1 shrink-0">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> RPC Nodes Healthy
        </span>
        <span className="text-cyan-700 font-bold">Block #20,491,802</span>
      </div>
    </div>
  );
};
