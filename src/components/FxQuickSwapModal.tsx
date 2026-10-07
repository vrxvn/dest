import React, { useState } from 'react';
import {
  ArrowLeftRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  X,
  Zap,
  DollarSign,
  AlertCircle,
  Copy,
} from 'lucide-react';

interface FxQuickSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFromCurrency?: string;
  initialToCurrency?: string;
  liveRates?: {
    EUR?: number;
    JPY?: number;
    GBP?: number;
    IDR?: number;
    CHF?: number;
    [key: string]: any;
  } | null;
}

export const FxQuickSwapModal: React.FC<FxQuickSwapModalProps> = ({
  isOpen,
  onClose,
  initialFromCurrency = 'USD',
  initialToCurrency = 'EUR',
  liveRates,
}) => {
  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState(initialToCurrency);
  const [amount, setAmount] = useState<string>('500000');
  const [tenor, setTenor] = useState<'SPOT' | 'TOM_NEXT' | '1W_FORWARD'>('SPOT');
  const [venue, setVenue] = useState<string>('EBS Market');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    txId: string;
    timestamp: string;
    fromAmount: number;
    toAmount: number;
    rate: number;
  } | null>(null);

  if (!isOpen) return null;

  // Rate calculation
  const getRate = (from: string, to: string): number => {
    // Default base rates
    const baseRates: Record<string, number> = {
      USD: 1.0,
      EUR: 1.0842,
      GBP: 1.2985,
      JPY: 0.006466, // 1 / 154.65
      CHF: 1.1305, // 1 / 0.8845
      AUD: 0.6580,
      CAD: 0.7255, // 1 / 1.3780
    };

    if (liveRates) {
      if (liveRates.EUR) baseRates.EUR = 1 / liveRates.EUR;
      if (liveRates.GBP) baseRates.GBP = 1 / liveRates.GBP;
      if (liveRates.JPY) baseRates.JPY = 1 / liveRates.JPY;
    }

    const fromInUsd = baseRates[from] || 1.0;
    const toInUsd = baseRates[to] || 1.0;

    return fromInUsd / toInUsd;
  };

  const currentRate = getRate(fromCurrency, toCurrency);
  const numericAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const calculatedOutput = numericAmount * currentRate;

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult({
        txId: `CLS-FX-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        fromAmount: numericAmount,
        toAmount: calculatedOutput,
        rate: currentRate,
      });
    }, 700);
  };

  const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD'];
  const presets = [100000, 250000, 500000, 1000000, 2500000];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in font-mono"
      onClick={() => {
        if (!isExecuting) {
          onClose();
          setExecutionResult(null);
        }
      }}
    >
      <div
        className="w-full max-w-lg bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] rounded-[26px] border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-400 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] p-4 sm:p-5 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <ArrowLeftRight className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight">
                  INSTITUTIONAL FX SWAP & DEALING TERMINAL
                </h3>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[9.5px] text-slate-400">
                PVP GUARANTEE • T+0 CLS SETTLEMENT • ZERO HERSTATT RISK
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              setExecutionResult(null);
            }}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Jika belum dieksekusi atau ingin order baru */}
        {!executionResult ? (
          <div className="flex flex-col gap-3">
            {/* Input Form Swap */}
            <div className="relative p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
              {/* Row 1: Dari Devisa (Selling) */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                  <span>JUAL (DEVISA ASAL)</span>
                  <span>RATE: 1.0000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                      className="w-full text-lg sm:text-xl font-black text-slate-900 outline-none bg-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xs border border-slate-300 outline-none cursor-pointer"
                  >
                    {currencies.map((c) => (
                      <option key={c} value={c} disabled={c === toCurrency}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tombol Balik (Switch) */}
              <div className="relative flex items-center justify-center my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <button
                  type="button"
                  onClick={handleSwapCurrencies}
                  title="Balik Devisa"
                  className="relative z-10 w-7 h-7 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 flex items-center justify-center shadow-xs cursor-pointer hover:rotate-180 transition-all duration-200"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 stroke-[2.3]" />
                </button>
              </div>

              {/* Row 2: Ke Devisa (Buying) */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                  <span>BELI (DEVISA TARGET)</span>
                  <span className="text-emerald-700 font-extrabold">
                    SPOT: {currentRate.toFixed(toCurrency === 'JPY' ? 2 : 4)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="text-lg sm:text-xl font-black text-emerald-600">
                      {calculatedOutput.toLocaleString('en-US', {
                        minimumFractionDigits: toCurrency === 'JPY' ? 0 : 2,
                        maximumFractionDigits: toCurrency === 'JPY' ? 0 : 2,
                      })}
                    </div>
                  </div>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xs border border-slate-300 outline-none cursor-pointer"
                  >
                    {currencies.map((c) => (
                      <option key={c} value={c} disabled={c === fromCurrency}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Presets Notional Volume */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[8px] font-bold text-slate-400 shrink-0">PRESET:</span>
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(p.toString())}
                    className="px-2 py-0.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[8px] font-black text-slate-700 border border-slate-200 cursor-pointer transition-all shrink-0"
                  >
                    ${p >= 1e6 ? `${p / 1e6}M` : `${p / 1e3}K`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenor & Settlement Options */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[8.5px] font-bold text-slate-400 uppercase block mb-1">
                  STRUKTUR TENOR SWAP
                </span>
                <div className="grid grid-cols-3 gap-1 text-[9px] font-bold">
                  {(['SPOT', 'TOM_NEXT', '1W_FORWARD'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTenor(t)}
                      className={`py-1 rounded-lg border text-center cursor-pointer transition-all ${
                        tenor === t
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t === 'SPOT' ? 'SPOT (T+0)' : t === 'TOM_NEXT' ? 'TOM-NEXT' : '1-WEEK'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[8.5px] font-bold text-slate-400 uppercase block mb-1">
                  INTERBANK EXECUTION VENUE
                </span>
                <select
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-black text-slate-800 outline-none cursor-pointer"
                >
                  <option value="EBS Market">EBS Market (Tier-1 Primary CLS)</option>
                  <option value="Currenex ECN">Currenex ECN (Multilateral)</option>
                  <option value="LMAX Prime">LMAX Prime (Ultra-Low Latency)</option>
                  <option value="360T Multi-Bank">360T Multi-Bank Liquidity</option>
                </select>
              </div>
            </div>

            {/* Breakdown Ringkasan Eksekusi */}
            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200/90 text-[9.5px] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Estimasi Spread Interbank:</span>
                <span className="font-black text-slate-800">0.2 pips (~$12.50)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Protokol Kliring:</span>
                <span className="font-black text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Continuous Linked Settlement (CLS)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Imbal Hasil Rollover (Overnight Swap):</span>
                <span className="font-black text-indigo-700">+1.85 bps (+Carry Positif)</span>
              </div>
            </div>

            {/* Tombol Eksekusi Swap */}
            <button
              type="button"
              onClick={handleExecute}
              disabled={isExecuting || numericAmount <= 0}
              className="w-full py-2.5 rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-md active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>MEMPROSES ORDER KLIRING DI {venue}...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>
                    EKSEKUSI SWAP {fromCurrency} → {toCurrency} (${numericAmount.toLocaleString('en-US')})
                  </span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Struk Konfirmasi Sukses Eksekusi */
          <div className="flex flex-col gap-3 text-center py-2 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7 stroke-[2.4]" />
            </div>

            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase">
                SWAP DEVISA BERHASIL DIEKSEKUSI
              </h4>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mt-0.5">
                STATUS: T+0 CLS MATCHED & SETTLED
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-200 text-left text-xs space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <span className="text-slate-400 text-[10px]">TRANSACTION ID:</span>
                <span className="font-black text-slate-800 flex items-center gap-1">
                  {executionResult.txId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">NILAI DILEPAS:</span>
                <span className="font-black text-rose-600">
                  -{executionResult.fromAmount.toLocaleString('en-US')} {fromCurrency}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">NILAI DITERIMA:</span>
                <span className="font-black text-emerald-600 text-sm">
                  +{executionResult.toAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {toCurrency}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-400 text-[10px]">EFFECTIVE RATE:</span>
                <span className="font-black text-slate-800">
                  1 {fromCurrency} = {executionResult.rate.toFixed(4)} {toCurrency}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">KLIRING VENUE & WAKTU:</span>
                <span className="font-black text-indigo-700 text-[10px]">
                  {venue} • {executionResult.timestamp} WIB
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setExecutionResult(null)}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                SWAP LAGI
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setExecutionResult(null);
                }}
                className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                SELESAI & TUTUP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
