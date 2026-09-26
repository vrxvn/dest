import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp, CheckCircle, RefreshCw, Layers } from 'lucide-react';

interface ArbitrageOpportunity {
  id: string;
  path: string;
  profitBps: number;
  profitUsd: string;
  executionVenue: string;
  timeAgo: string;
}

const INITIAL_ARBS: ArbitrageOpportunity[] = [
  { id: 'arb-1', path: 'EUR → JPY → USD → EUR', profitBps: 1.8, profitUsd: '+$3,450.00', executionVenue: 'EBS ↔ LMAX', timeAgo: 'Baru saja' },
  { id: 'arb-2', path: 'GBP → CHF → USD → GBP', profitBps: 2.1, profitUsd: '+$4,120.00', executionVenue: 'Currenex ↔ FastMatch', timeAgo: '4 dtk lalu' },
  { id: 'arb-3', path: 'USD → CAD → EUR → USD', profitBps: 1.4, profitUsd: '+$2,680.00', executionVenue: 'Hotspot ↔ EBS', timeAgo: '9 dtk lalu' },
  { id: 'arb-4', path: 'AUD → USD → JPY → AUD', profitBps: 1.6, profitUsd: '+$3,100.00', executionVenue: '360T ↔ Currenex', timeAgo: '16 dtk lalu' },
];

const CURRENCY_FLOW_METRICS = [
  { ccy: 'USD', flow: '+$1.84M', bias: 'NET INFLOW', color: 'emerald' },
  { ccy: 'EUR', flow: '-$620K', bias: 'NET OUTFLOW', color: 'rose' },
  { ccy: 'JPY', flow: '+$940K', bias: 'SAFE-HAVEN BID', color: 'indigo' },
  { ccy: 'GBP', flow: '+$380K', bias: 'MOMENTUM BUY', color: 'emerald' },
];

export const FxArbitrageScanner: React.FC = () => {
  const [arbs, setArbs] = useState<ArbitrageOpportunity[]>(INITIAL_ARBS);
  const [scannedRoutes, setScannedRoutes] = useState(14820);

  useEffect(() => {
    const interval = setInterval(() => {
      setScannedRoutes((c) => c + 14);

      const paths = [
        'EUR → JPY → USD → EUR',
        'GBP → CHF → USD → GBP',
        'USD → CAD → EUR → USD',
        'AUD → USD → JPY → AUD',
        'EUR → GBP → USD → EUR',
        'USD → SGD → JPY → USD',
      ];
      const venues = ['EBS ↔ LMAX', 'Currenex ↔ FastMatch', 'Hotspot ↔ EBS', '360T ↔ Currenex'];
      const p = paths[Math.floor(Math.random() * paths.length)];
      const v = venues[Math.floor(Math.random() * venues.length)];
      const bps = +(Math.random() * 1.5 + 1.2).toFixed(1);
      const usd = (bps * 1900 + 400).toFixed(2);

      const newArb: ArbitrageOpportunity = {
        id: `arb-${Date.now()}`,
        path: p,
        profitBps: bps,
        profitUsd: `+$${Number(usd).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        executionVenue: v,
        timeAgo: 'Baru saja',
      };

      setArbs((prev) => {
        const updated = prev.slice(0, 4).map((a, idx) => ({
          ...a,
          timeAgo: idx === 0 ? '3 dtk lalu' : idx === 1 ? '7 dtk lalu' : idx === 2 ? '14 dtk lalu' : '26 dtk lalu',
        }));
        return [newArb, ...updated];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full overflow-hidden font-mono">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase truncate">
              TRIANGULAR ARB & FLOW SCANNER
            </span>
          </div>
          <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200/80">
            AUTO-HEDGE
          </span>
        </div>

        {/* Global Currency Flow Matrix */}
        <div className="grid grid-cols-4 gap-1 my-1">
          {CURRENCY_FLOW_METRICS.map((m) => (
            <div key={m.ccy} className="p-1 rounded-lg bg-slate-50 border border-slate-200/90 text-center">
              <div className="text-[8px] font-bold text-slate-400">{m.ccy}</div>
              <div className={`text-[9.5px] font-black ${m.flow.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {m.flow}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Triangular Arbitrage List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 my-1 pr-0.5 min-h-0 custom-scrollbar">
        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ArrowRightLeft className="w-2.5 h-2.5 text-indigo-500" /> RISK-FREE CROSS SPREADS
          </span>
          <span className="text-slate-500">{scannedRoutes.toLocaleString()} routes/sec</span>
        </div>

        {arbs.map((item, idx) => (
          <div
            key={item.id}
            className={`p-1.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border border-slate-200/90 flex items-center justify-between gap-1 shadow-[0_1px_2px_rgba(15,23,42,0.03)] ${
              idx === 0 ? 'ring-1 ring-emerald-500/40 animate-in fade-in duration-200' : ''
            }`}
          >
            <div className="min-w-0">
              <div className="text-[8.5px] font-black text-slate-800 truncate">{item.path}</div>
              <div className="text-[7.5px] text-slate-400 mt-0.5">
                {item.executionVenue} • {item.profitBps} bps spread
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs font-black text-emerald-600">{item.profitUsd}</div>
              <div className="text-[7.5px] text-slate-400">{item.timeAgo}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] text-slate-500 mt-1 shrink-0">
        <span>SETTLEMENT: T+0</span>
        <span className="text-emerald-600 font-bold">100% RECONCILED</span>
      </div>
    </div>
  );
};
