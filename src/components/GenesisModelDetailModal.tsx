import React, { useState } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  AlertTriangle,
  BrainCircuit,
  SlidersHorizontal,
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { type AlgoModel } from '../data/dummy/genesisDummy';

interface GenesisModelDetailModalProps {
  model: AlgoModel | null;
  isOpen: boolean;
  onClose: () => void;
  onPromoteModel?: (modelId: string) => void;
}

export const GenesisModelDetailModal: React.FC<GenesisModelDetailModalProps> = ({
  model,
  isOpen,
  onClose,
  onPromoteModel,
}) => {
  const [lookbackDays, setLookbackDays] = useState<number>(180);
  const [leverage, setLeverage] = useState<number>(2);
  const [stressScenario, setStressScenario] = useState<'NORMAL' | 'FLASH_CRASH' | 'VOLATILITY_SPIKE' | 'BLACK_SWAN'>('NORMAL');
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simResult, setSimResult] = useState<{
    simulatedProfit: string;
    newSharpe: number;
    maxDrawdown: string;
    winRate: string;
    runsCount: string;
  } | null>(null);
  const [isPromoted, setIsPromoted] = useState(false);

  if (!isOpen || !model) return null;

  const handleRunSimulation = () => {
    setIsRunningSim(true);
    setSimResult(null);

    setTimeout(() => {
      setIsRunningSim(false);
      const mult = leverage * (stressScenario === 'BLACK_SWAN' ? 0.6 : stressScenario === 'VOLATILITY_SPIKE' ? 0.85 : 1.15);
      const simulatedPnl = (parseFloat(model.backtestPnl.replace(/[^0-9.-]/g, '')) * mult).toFixed(0);
      const computedSharpe = +(model.sharpeRatio * (stressScenario === 'BLACK_SWAN' ? 0.72 : 1.05)).toFixed(2);

      setSimResult({
        simulatedProfit: `+$${Number(simulatedPnl).toLocaleString('en-US')}`,
        newSharpe: computedSharpe,
        maxDrawdown: stressScenario === 'BLACK_SWAN' ? '-4.8%' : model.maxDrawdown,
        winRate: stressScenario === 'BLACK_SWAN' ? '68.2%' : model.winRate,
        runsCount: '10,000 MONTE CARLO PATHS',
      });
    }, 600);
  };

  const handlePromote = () => {
    setIsPromoted(true);
    onPromoteModel?.(model.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in font-mono"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] rounded-[26px] border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-400 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] p-4 sm:p-5 text-slate-800 max-h-[92vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <BrainCircuit className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black uppercase text-slate-900 tracking-tight">
                  {model.name} <span className="text-xs text-indigo-600 font-bold">v{model.version}</span>
                </h3>
                <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {model.assetClass}
                </span>
                <span
                  className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${
                    model.stage === 'LIVE PRODUCTION'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : model.stage === 'PAPER ALPHA'
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}
                >
                  {isPromoted ? 'LIVE PRODUCTION (PROMOTED)' : model.stage}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                {model.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Core Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[8px] text-slate-400 font-bold block uppercase">SHARPE & SORTINO</span>
            <div className="text-sm font-black text-indigo-600">{model.sharpeRatio} / {model.sortinoRatio}</div>
            <span className="text-[7.5px] text-emerald-600 font-bold">RISK-ADJUSTED ALPHA</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[8px] text-slate-400 font-bold block uppercase">WIN RATE & MAX DD</span>
            <div className="text-sm font-black text-slate-800">{model.winRate}</div>
            <span className="text-[7.5px] text-rose-600 font-bold">{model.maxDrawdown} MAX DD</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[8px] text-slate-400 font-bold block uppercase">HISTORICAL PNL</span>
            <div className="text-sm font-black text-emerald-600">{model.backtestPnl}</div>
            <span className="text-[7.5px] text-slate-400 font-bold">NET PROTOCOL GAIN</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[8px] text-slate-400 font-bold block uppercase">CAPITAL ALOKASI</span>
            <div className="text-sm font-black text-slate-900">{model.allocatedCapital}</div>
            <span className="text-[7.5px] text-indigo-600 font-bold">LATENSI {model.latencyMicroseconds}μs</span>
          </div>
        </div>

        {/* Interactive Monte Carlo & Scenario Stress Sandbox */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs mb-3 space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="text-[11px] font-black text-slate-900 uppercase flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
              MONTE CARLO STRESS TEST SANDBOX
            </span>
            <span className="text-[8px] font-bold text-slate-500">
              GPU ACCELERATED • 10M ITERASI
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[9.5px]">
            {/* Lookback window */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[8px] font-bold text-slate-400 uppercase block mb-1">
                LOOKBACK WINDOW (HARI)
              </span>
              <div className="flex items-center gap-1">
                {[90, 180, 365].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setLookbackDays(d)}
                    className={`flex-1 py-1 rounded-lg border font-black transition-all cursor-pointer ${
                      lookbackDays === d
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d}H
                  </button>
                ))}
              </div>
            </div>

            {/* Target Leverage */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[8px] font-bold text-slate-400 uppercase block mb-1">
                TARGET LEVERAGE
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 5].map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLeverage(l)}
                    className={`flex-1 py-1 rounded-lg border font-black transition-all cursor-pointer ${
                      leverage === l
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {l}x
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[8px] font-bold text-slate-400 uppercase block mb-1">
                SKENARIO PASAR
              </span>
              <select
                value={stressScenario}
                onChange={(e) => setStressScenario(e.target.value as any)}
                className="w-full py-1 px-1.5 rounded-lg bg-white border border-slate-200 font-black text-slate-800 outline-none cursor-pointer text-[9px]"
              >
                <option value="NORMAL">Normal Market Regime</option>
                <option value="FLASH_CRASH">Flash Crash Liquidity Gap</option>
                <option value="VOLATILITY_SPIKE">High Volatility Depeg</option>
                <option value="BLACK_SWAN">Black Swan Tail-Risk (2020/2022)</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={isRunningSim}
            className="w-full py-2 rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-black text-[10px] uppercase tracking-wider shadow-xs active:translate-y-[0.5px] transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isRunningSim ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>MENJALANKAN MONTE CARLO PADA H100 GPU...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>JALANKAN SIMULASI STRES MONTE CARLO</span>
              </>
            )}
          </button>

          {/* Simulation Output Card */}
          {simResult && (
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 border border-emerald-300 text-[9px] animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between mb-1 pb-1 border-b border-emerald-200">
                <span className="font-black text-emerald-900 uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  HASIL SIMULASI RESMI ({simResult.runsCount})
                </span>
                <span className="text-emerald-700 font-bold">CONFIDENCE 99.8%</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center font-mono">
                <div>
                  <span className="text-slate-500 block text-[7.5px]">PROYEKSI PNL</span>
                  <span className="font-black text-emerald-700 text-xs">{simResult.simulatedProfit}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[7.5px]">SIM SHARPE</span>
                  <span className="font-black text-indigo-700 text-xs">{simResult.newSharpe}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[7.5px]">MAX DRAWDOWN</span>
                  <span className="font-black text-rose-600 text-xs">{simResult.maxDrawdown}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[7.5px]">WIN RATE</span>
                  <span className="font-black text-slate-800 text-xs">{simResult.winRate}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
          <div className="text-[9px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Audit Model SHA-256: Verified Safe</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePromote}
              disabled={isPromoted || model.stage === 'LIVE PRODUCTION'}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-[9.5px] uppercase tracking-wider shadow-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              <span>{isPromoted || model.stage === 'LIVE PRODUCTION' ? 'SUDAH DI PRODUKSI' : 'PROMOTE KE LIVE PRODUCTION'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-[9.5px] transition-all cursor-pointer"
            >
              TUTUP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
