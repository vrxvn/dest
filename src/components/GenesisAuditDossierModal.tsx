import React, { useState } from 'react';
import {
  X,
  FileCheck,
  ShieldCheck,
  Download,
  Printer,
  BrainCircuit,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Building,
} from 'lucide-react';

interface GenesisAuditDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenesisAuditDossierModal: React.FC<GenesisAuditDossierModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHash = () => {
    navigator.clipboard?.writeText('0x7f9a3c2e88b1f41d998246acb7014ef05819d45a901e8b2');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in font-mono"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] rounded-[26px] border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-400 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] p-4 sm:p-6 text-slate-800 max-h-[92vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <FileCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black uppercase text-slate-900 tracking-tight">
                  QUANTITATIVE COMMITTEE AUDIT DOSSIER
                </h3>
                <span className="text-[8.5px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                  OFFICIAL PASS
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                REF: GENESIS-QUANT-AUDIT-2026-Q4 • CLASSIFICATION: INSTITUTIONAL TIER-1
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

        {/* Formal Institutional Dossier Body */}
        <div className="space-y-3.5 text-xs">
          {/* Executive Overview Banner */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-[8.5px] font-bold text-slate-400 uppercase block">
                ENTITAS DILAPORKAN
              </span>
              <div className="text-sm font-black text-slate-900">
                GENESIS QUANT LAB (ALPHA INCUBATION FOUNDRY)
              </div>
              <span className="text-[9px] text-slate-500">
                AUM Dialokasikan: $15,000,000.00 • 6 Model Algoritma Aktif
              </span>
            </div>
            <div className="text-right sm:border-l sm:border-slate-100 sm:pl-3">
              <span className="text-[8px] font-bold text-slate-400 block uppercase">
                TANGGAL VALUASI & AUDIT
              </span>
              <div className="text-xs font-black text-indigo-700">OKTOBER 2026 (Q4)</div>
              <span className="text-[8px] text-emerald-600 font-bold">100% COMPLIANT ISO/FIPS</span>
            </div>
          </div>

          {/* Mathematical Risk & Performance Decomposition */}
          <div>
            <div className="text-[9.5px] font-black text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-indigo-600" />
              1. ATRIBUSI RISIKO & KINERJA MATEMATIS (REAL TIME)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[8px] text-slate-400 font-bold block uppercase">SHARPE RATIO</span>
                <span className="text-base font-black text-indigo-700">3.55</span>
                <span className="text-[7.5px] text-slate-500 block">BENCHMARK: 1.12</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[8px] text-slate-400 font-bold block uppercase">SORTINO RATIO</span>
                <span className="text-base font-black text-emerald-700">4.82</span>
                <span className="text-[7.5px] text-emerald-600 font-bold">DOWNSIDE PROTECTED</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[8px] text-slate-400 font-bold block uppercase">CALMAR RATIO</span>
                <span className="text-base font-black text-slate-800">15.7x</span>
                <span className="text-[7.5px] text-slate-500 block">CAGR / MAX DD</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[8px] text-slate-400 font-bold block uppercase">MAX DRAWDOWN</span>
                <span className="text-base font-black text-emerald-600">-1.8%</span>
                <span className="text-[7.5px] text-emerald-600 font-bold">STRESS TEST 2.1%</span>
              </div>
            </div>
          </div>

          {/* Value at Risk (VaR) & Fama-French 5-Factor Decomposition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Value at Risk */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5 text-[9.5px]">
              <span className="font-black text-slate-800 uppercase block pb-1 border-b border-slate-100">
                2. VALUE-AT-RISK (VAR) & EXPECTED SHORTFALL
              </span>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">1-Day 99% Parametric VaR:</span>
                <span className="font-black text-slate-900">$142,500 (0.95% AUM)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Expected Shortfall (CVaR 99%):</span>
                <span className="font-black text-rose-700">$184,200 (1.22% AUM)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Profit Factor (Gross Gain / Loss):</span>
                <span className="font-black text-emerald-700">2.84x Win-to-Loss</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tail-Risk Black Swan Survival:</span>
                <span className="font-black text-indigo-700">100.0% Preserved</span>
              </div>
            </div>

            {/* Fama-French 5-Factor Exposure */}
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5 text-[9.5px]">
              <span className="font-black text-slate-800 uppercase block pb-1 border-b border-slate-100">
                3. FAMA-FRENCH 5-FACTOR DECOMPOSITION
              </span>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Market Beta (Mkt-RF):</span>
                <span className="font-black text-indigo-700">0.02x (Market Neutral)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Momentum Factor (WML):</span>
                <span className="font-black text-emerald-700">+0.84 (High Alpha Driver)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Size Factor (SMB):</span>
                <span className="font-black text-slate-800">-0.12 (Large-Cap Liquidity)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Volatility Skew (VOL):</span>
                <span className="font-black text-blue-700">+0.68 (Gamma Neutral)</span>
              </div>
            </div>
          </div>

          {/* Supercomputing HPC Validation Certificate */}
          <div className="p-3 rounded-2xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black uppercase text-emerald-400">
                  HPC CERTIFICATE: 64x NVIDIA H100 SXM5 CLUSTER
                </span>
              </div>
              <span className="text-[8px] font-bold text-slate-400">
                10,000,000 MONTE CARLO ITERATIONS
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[8.5px] border-t border-slate-800 pt-2 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[7px]">WALK-FORWARD ACCURACY</span>
                <span className="font-bold text-white">99.8% Out-of-Sample</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[7px]">COMPUTE THROUGHPUT</span>
                <span className="font-bold text-white">142 PetaFLOPS FP8</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[7px]">OVERFITTING VERIFICATION</span>
                <span className="font-bold text-emerald-400">PASSED (P &lt; 0.001)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[8px] text-slate-400">
              <span className="truncate max-w-[70%]">
                Cryptographic Hash: 0x7f9a3c2e88b1f41d998246acb7014ef05819d45a901e8b2
              </span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                {isCopied ? 'TERSALIN!' : 'SALIN HASH'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 mt-3 text-xs">
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Disetujui Komite Investasi & Resiko Kuantitatif</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[9px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>CETAK AUDIT</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[9px] uppercase tracking-wider transition-all cursor-pointer"
            >
              TUTUP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
