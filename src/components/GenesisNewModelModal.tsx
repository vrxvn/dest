import React, { useState } from 'react';
import {
  X,
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  DollarSign,
  ShieldCheck,
  Cpu,
  Layers,
} from 'lucide-react';
import { type AlgoModel } from '../data/dummy/genesisDummy';

interface GenesisNewModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddModel: (newModel: AlgoModel) => void;
}

export const GenesisNewModelModal: React.FC<GenesisNewModelModalProps> = ({
  isOpen,
  onClose,
  onAddModel,
}) => {
  const [name, setName] = useState('AEGIS VOLATILITY V1');
  const [architecture, setArchitecture] = useState('Deep Reinforcement RL-Q Transformer');
  const [assetClass, setAssetClass] = useState<'CRYPTO' | 'FX' | 'MULTI-ASSET' | 'HFT'>('CRYPTO');
  const [capitalAlloc, setCapitalAlloc] = useState<number>(2000000);
  const [targetSharpe, setTargetSharpe] = useState<number>(3.65);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const createdModel: AlgoModel = {
        id: `algo-${Date.now()}`,
        name: name.trim().toUpperCase(),
        version: '1.0.0',
        architecture,
        assetClass,
        sharpeRatio: targetSharpe,
        sortinoRatio: +(targetSharpe * 1.35).toFixed(2),
        winRate: '78.5%',
        maxDrawdown: '-1.4%',
        backtestPnl: '+$185,000',
        allocatedCapital: `$${(capitalAlloc / 1e6).toFixed(1)}M`,
        stage: 'RESEARCH',
        description: `Algoritma kuantitatif inkubasi baru berbasis ${architecture} untuk pasar ${assetClass}.`,
        latencyMicroseconds: 640,
        confidence: '99.0%',
        chartPoints: [100, 102, 105, 108, 112, 115, 118, 122, 127, 131, 135, 140],
      };

      onAddModel(createdModel);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  const architectures = [
    'Deep Reinforcement RL-Q Transformer',
    'Cross-L2 Microstructure Co-location',
    'Ornstein-Uhlenbeck Coinscribed Pairs',
    'LLM Macro-News Token Classifier',
    'SVI Stochastic Volatility Arbitrage',
    'Avellaneda-Stoikov Adaptive Spreader',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in font-mono"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] rounded-[26px] border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-400 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] p-4 sm:p-5 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 stroke-[2.3]" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight flex items-center gap-1.5">
                DAFTARKAN MODEL ALGORITMA BARU
              </h3>
              <span className="text-[9.5px] text-slate-400">
                GENESIS QUANT LAB • STAGE RESEARCH INCUBATION
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form / Success Banner */}
        {isSuccess ? (
          <div className="py-6 text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-xs">
              <CheckCircle2 className="w-7 h-7 stroke-[2.4]" />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase">
              MODEL BERHASIL DIDAFTARKAN KE QUANT LAB
            </h4>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              Model telah terdaftar di pipeline dengan status <strong className="text-indigo-600">RESEARCH</strong> dan dialokasikan ke kluster GPU NVIDIA H100.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-[10px]">
            {/* Nama Model */}
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">
                NAMA MODEL ALGORITMA
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-black outline-none focus:border-indigo-500 shadow-2xs"
                placeholder="CONTOH: AEGIS VOLATILITY V1"
              />
            </div>

            {/* Arsitektur & Kelas Aset */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">
                  ARSITEKTUR MODEL
                </label>
                <select
                  value={architecture}
                  onChange={(e) => setArchitecture(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold outline-none cursor-pointer shadow-2xs text-[9px]"
                >
                  {architectures.map((arch) => (
                    <option key={arch} value={arch}>
                      {arch}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">
                  KELAS ASET UTAMA
                </label>
                <select
                  value={assetClass}
                  onChange={(e) => setAssetClass(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold outline-none cursor-pointer shadow-2xs text-[9px]"
                >
                  <option value="CRYPTO">CRYPTO (L1/L2 & Derivatif)</option>
                  <option value="FX">FX (G10 Interbank Spot)</option>
                  <option value="MULTI-ASSET">MULTI-ASSET (Macro Cross)</option>
                  <option value="HFT">HFT (High-Frequency Microstructure)</option>
                </select>
              </div>
            </div>

            {/* Alokasi Modal & Target Sharpe */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">
                    ALOKASI SEED CAPITAL
                  </span>
                  <span className="font-black text-indigo-700">
                    ${(capitalAlloc / 1e6).toFixed(1)}M USD
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={5000000}
                  step={250000}
                  value={capitalAlloc}
                  onChange={(e) => setCapitalAlloc(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">
                    TARGET SHARPE RATIO
                  </span>
                  <span className="font-black text-emerald-700">{targetSharpe.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={2.0}
                  max={5.0}
                  step={0.05}
                  value={targetSharpe}
                  onChange={(e) => setTargetSharpe(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Info Kotak Audit Otomatis */}
            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200/90 text-[8.5px] text-slate-600 space-y-1">
              <div className="flex items-center justify-between">
                <span>Alokasi Kluster Komputasi:</span>
                <span className="font-black text-slate-800">8x NVIDIA H100 GPU (Dedicated Worker)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Protokol Verifikasi:</span>
                <span className="font-black text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Walk-Forward Cross Validation 10-Fold
                </span>
              </div>
            </div>

            {/* Tombol Simpan */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
              >
                BATAL
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase transition-all cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>MENDAFTARKAN...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" />
                    <span>SIMPAN & INKUBASI MODEL</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
