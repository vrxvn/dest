import React from 'react';
import {
  Sparkles,
  TrendingUp,
  BrainCircuit,
  TestTube,
  ArrowUpRight,
  Gauge,
  Workflow,
  Cpu,
} from 'lucide-react';
import { ALGO_MODELS, type AlgoModel } from '../data/dummy/genesisDummy';

export const GenesisView: React.FC = () => {
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5">
      {/* 1. TOP CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              SEED CAPITAL INCUBATED
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              STAGE ALPHA
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              $15,000,000.00
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">8 PROTO-DESKS</span>
            <span className="text-indigo-600 font-extrabold">ALPHA PILOT</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              MEAN SHARPE RATIO
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              3.55 SHARPE
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              +$3,842,100.00
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">MAX DRAWDOWN 2.1%</span>
            <span className="text-emerald-700 font-bold">SORTINO 4.82</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              AI MODEL PARAMETERS
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono">
              TRANSFORMER
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              4.2B WEIGHTS
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">TRAINING EPOCHS 850</span>
            <span className="text-blue-700 font-extrabold">ZERO OVERFITTING</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TestTube className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              MONTE CARLO SIMULATIONS
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              10M RUNS
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              99.8% CONFIDENCE
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">BLACK SWAN STRESS</span>
            <span className="text-indigo-600 font-extrabold">CAPITAL PRESERVED</span>
          </div>
        </div>
      </section>

      {/* 2. CHARTS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-2.5 flex-1 min-h-0">
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                GENESIS STRATEGY ALPHA TRAJECTORY
              </span>
              <span className="text-[10px] font-black text-slate-800 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">
                ALPHA +28.4%
              </span>
            </div>
            <div className="w-full h-32 my-0.5 relative">
              <svg viewBox="0 0 500 110" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="genesisAlphaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="25" x2="500" y2="25" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                <line x1="0" y1="55" x2="500" y2="55" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                <line x1="0" y1="85" x2="500" y2="85" stroke="#94a3b8" opacity="0.7" />
                <path d="M 0,85 C 80,75 140,40 220,44 C 300,48 380,20 440,24 L 500,18 L 500,85 L 0,85 Z" fill="url(#genesisAlphaGrad)" />
                <path d="M 0,85 C 80,75 140,40 220,44 C 300,48 380,20 440,24 L 500,18" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-slate-200/80 text-[9px] font-mono text-center">
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">ALPHA RATE</span>
              <span className="font-extrabold text-slate-800">+28.4%</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">BETA EXP</span>
              <span className="font-extrabold text-slate-800">0.02x</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">MAX DD</span>
              <span className="font-extrabold text-emerald-600">-1.8%</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
              <span className="text-[7.5px] text-emerald-700 block">STATUS</span>
              <span className="font-extrabold text-emerald-800">DEPLOYING</span>
            </div>
          </div>
        </div>

        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                GPU COMPUTE CLUSTER & BACKTEST ENGINE
              </span>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80 font-mono">
                64x NVIDIA H100
              </span>
            </div>
            <div className="w-full h-32 my-0.5 relative">
              <svg viewBox="0 0 500 110" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="genesisH100Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0,80 Q 60,52 120,56 T 240,28 T 360,38 T 480,18 L 500,16 L 500,85 L 0,85 Z" fill="url(#genesisH100Grad)" />
                <path d="M 0,80 Q 60,52 120,56 T 240,28 T 360,38 T 480,18 L 500,16" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-slate-200/80 text-[9px] font-mono text-center">
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">CLUSTER</span>
              <span className="font-extrabold text-slate-800">98.4% LOAD</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">THROUGHPUT</span>
              <span className="font-extrabold text-slate-800">1.2M TICK/S</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">LATENCY</span>
              <span className="font-extrabold text-slate-800">1.2 ms</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
              <span className="text-[7.5px] text-emerald-700 block">VERIF</span>
              <span className="font-extrabold text-emerald-800">PASS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MODELS TABLE */}
      <section className={`${glassCard} flex-1 min-h-0 overflow-hidden p-2.5 sm:p-3`}>
        <div>
          <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
              GENESIS INCUBATED ALGORITHMIC PIPELINE
            </span>
            <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              {ALGO_MODELS.length} MODELS
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[9.5px]">
              <thead>
                <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400">
                  <th className="py-1 px-1">Model Name</th>
                  <th className="py-1 px-1">Architecture</th>
                  <th className="py-1 px-1 text-right">Sharpe</th>
                  <th className="py-1 px-1 text-right">Win Rate</th>
                  <th className="py-1 px-1 text-right">Backtest PnL</th>
                  <th className="py-1 px-1 text-center">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ALGO_MODELS.map((m) => (
                  <tr key={m.name} className="hover:bg-indigo-50/30">
                    <td className="py-1.5 px-1 font-black text-slate-800">{m.name}</td>
                    <td className="py-1.5 px-1 text-slate-500">{m.architecture}</td>
                    <td className="py-1.5 px-1 text-right font-extrabold text-indigo-600">{m.sharpeRatio}</td>
                    <td className="py-1.5 px-1 text-right text-slate-700">{m.winRate}</td>
                    <td className="py-1.5 px-1 text-right font-black text-emerald-600">{m.backtestPnl}</td>
                    <td className="py-1.5 px-1 text-center">
                      <span className="inline-block px-1.5 py-0.2 rounded text-[7px] font-black bg-indigo-500/10 text-indigo-700 border border-indigo-500/20">
                        {m.stage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
          <span>ALGO INCUBATION: READY FOR PRODUCTION SCALE</span>
          <span className="text-emerald-600 font-bold">TOTAL BACKTEST: +$17,540,000.00</span>
        </div>
      </section>
    </div>
  );
};
