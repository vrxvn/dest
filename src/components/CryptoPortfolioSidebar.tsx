import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Coins,
  TrendingUp,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { VAULT_COINS_BASE } from './ColdVaultCustody';

export interface CryptoPortfolioSidebarProps {
  glassCardClassName?: string;
  onSelectCoin?: (symbol: string) => void;
}

const STAKING_RATES: Record<string, number> = {
  ETH: 0.038,
  SOL: 0.068,
  SUI: 0.052,
  NEAR: 0.085,
  ADA: 0.032,
  DOT: 0.114,
  ATOM: 0.142,
  APT: 0.070,
};

const STABLECOIN_RESERVE_USD = 1850000; // $1.85M USDC Liquid Buffer

export const CryptoPortfolioSidebar: React.FC<CryptoPortfolioSidebarProps> = ({
  glassCardClassName = '',
}) => {
  const [prices, setPrices] = useState<Record<string, { price: number; change24h: number }>>(() => {
    const init: Record<string, { price: number; change24h: number }> = {};
    VAULT_COINS_BASE.forEach((c) => {
      init[c.asset] = { price: c.fallbackPrice, change24h: 3.12 };
    });
    return init;
  });

  const [lastSync, setLastSync] = useState<string>('Live');

  const fetchLivePrices = useCallback(async () => {
    try {
      const symbols = VAULT_COINS_BASE.map((c) => `${c.asset}USDT`);
      const url =
        'https://api.binance.com/api/v3/ticker/24hr?symbols=' +
        encodeURIComponent(JSON.stringify(symbols));
      const res = await fetch(url);
      if (!res.ok) return;

      const data = await res.json();
      if (!Array.isArray(data)) return;

      const map: Record<string, { price: number; change24h: number }> = {};
      data.forEach((item: any) => {
        const raw = item.symbol.replace('USDT', '');
        map[raw] = {
          price: parseFloat(item.lastPrice),
          change24h: parseFloat(item.priceChangePercent),
        };
      });

      setPrices((prev) => ({ ...prev, ...map }));
      setLastSync(
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch {
      // keep fallback
    }
  }, []);

  useEffect(() => {
    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 6000);
    return () => clearInterval(interval);
  }, [fetchLivePrices]);

  // Calculations
  const { totalAumUsd, totalPnlUsd, pnlPercent, annualYieldUsd, dailyYieldUsd, blendedApy, bufferRatio } =
    useMemo(() => {
      let coinsVal = 0;
      let pnl24h = 0;
      let stakingVal = 0;
      let annualStaking = 0;

      VAULT_COINS_BASE.forEach((item) => {
        const p = prices[item.asset] || { price: item.fallbackPrice, change24h: 0 };
        const currentVal = p.price * item.balanceQty;
        coinsVal += currentVal;

        const prevVal = currentVal / (1 + p.change24h / 100);
        pnl24h += currentVal - prevVal;

        const rate = STAKING_RATES[item.asset];
        if (rate) {
          stakingVal += currentVal;
          annualStaking += currentVal * rate;
        }
      });

      const totalAum = coinsVal + STABLECOIN_RESERVE_USD;
      const pct = coinsVal > 0 ? (pnl24h / (coinsVal - pnl24h)) * 100 : 0;
      const apy = stakingVal > 0 ? (annualStaking / stakingVal) * 100 : 5.8;
      const dailyYield = annualStaking / 365;
      const bufferPct = ((STABLECOIN_RESERVE_USD / totalAum) * 100).toFixed(1);

      return {
        totalAumUsd: totalAum,
        totalPnlUsd: pnl24h,
        pnlPercent: pct,
        annualYieldUsd: annualStaking,
        dailyYieldUsd: dailyYield,
        blendedApy: apy,
        bufferRatio: bufferPct,
      };
    }, [prices]);

  const formatCurrency = (val: number, showDecimals = false) => {
    return `$${val.toLocaleString('en-US', {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    })}`;
  };

  const isPnlUp = totalPnlUsd >= 0;
  const [viewMode, setViewMode] = useState<'aum_pnl' | 'yield_buffer'>('aum_pnl');

  return (
    <>
      {viewMode === 'aum_pnl' ? (
        <>
          {/* BLOK 1: Total Valuasi Portofolio (Live AUM) */}
          <div className={`${glassCardClassName} flex flex-col justify-between p-2.5 sm:p-3 h-full overflow-hidden`}>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9.5px] xl:text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
                  TOTAL VALUASI (AUM)
                </span>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode('yield_buffer')}
                    title="Beralih ke Staking & Buffer"
                    className="text-[8px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 border border-slate-200 transition-colors cursor-pointer"
                  >
                    Yield ⇄
                  </button>
                </div>
              </div>

              <div className="my-1">
                <div className="text-lg sm:text-xl xl:text-2xl font-black text-slate-900 tracking-tight font-mono flex items-baseline gap-1">
                  <span>{formatCurrency(totalAumUsd)}</span>
                  <span className="text-[10px] font-semibold text-slate-400">USD</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[8.5px] font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
                    Staking: +{blendedApy.toFixed(1)}% APY
                  </span>
                </div>
              </div>

              {/* Mini Sparkline Chart Pergerakan AUM */}
              <div className="w-full my-1 pt-0.5">
                <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400 mb-0.5">
                  <span>7D VALUATION TREND</span>
                  <span className="text-indigo-600 font-bold">↗ ALL-TIME HIGH</span>
                </div>
                <div className="h-9 w-full relative">
                  <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,22 Q 15,24 30,16 T 60,14 T 85,7 T 100,4 L 100,28 L 0,28 Z"
                      fill="url(#aumGrad)"
                    />
                    <path
                      d="M 0,22 Q 15,24 30,16 T 60,14 T 85,7 T 100,4"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="4" r="2.5" fill="#4f46e5" />
                    <circle cx="100" cy="4" r="5" fill="#6366f1" opacity="0.3" className="animate-ping" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8.5px] xl:text-[9px] font-mono">
              <span className="text-slate-400">13 Koin Cold Vault</span>
              <span className="text-indigo-600 font-bold">+12.4% MoM</span>
            </div>
          </div>

          {/* BLOK 2: Total PnL Pasar 24 Jam */}
          <div className={`${glassCardClassName} flex flex-col justify-between p-2.5 sm:p-3 h-full overflow-hidden`}>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9.5px] xl:text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
                  TOTAL PNL 24 JAM
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[8px] font-black border font-mono ${
                    isPnlUp
                      ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
                  }`}
                >
                  {isPnlUp ? (
                    <ArrowUpRight className="w-2.5 h-2.5 stroke-[2.8]" />
                  ) : (
                    <ArrowDownRight className="w-2.5 h-2.5 stroke-[2.8]" />
                  )}
                  {isPnlUp ? '+' : ''}
                  {pnlPercent.toFixed(2)}%
                </span>
              </div>

              <div className="my-1">
                <div
                  className={`text-lg sm:text-xl xl:text-2xl font-black tracking-tight font-mono ${
                    isPnlUp ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isPnlUp ? '+' : ''}
                  {formatCurrency(totalPnlUsd)}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[8.5px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200/60">
                    Buffer: {bufferRatio}% (${(STABLECOIN_RESERVE_USD / 1000000).toFixed(2)}M)
                  </span>
                </div>
              </div>

              {/* Mini Sparkline Chart Pergerakan PnL 24 Jam */}
              <div className="w-full my-1 pt-0.5">
                <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400 mb-0.5">
                  <span>24H INTRADAY SWING</span>
                  <span className={isPnlUp ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                    {isPnlUp ? 'BULLISH MOMENTUM' : 'PULLBACK'}
                  </span>
                </div>
                <div className="h-9 w-full relative">
                  <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isPnlUp ? '#10b981' : '#f43f5e'} stopOpacity="0.28" />
                        <stop offset="100%" stopColor={isPnlUp ? '#10b981' : '#f43f5e'} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="100" y2="20" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2,2" />
                    <path
                      d={
                        isPnlUp
                          ? 'M 0,22 C 20,24 35,12 50,15 C 65,18 80,7 100,3 L 100,28 L 0,28 Z'
                          : 'M 0,8 C 20,6 35,16 50,14 C 65,18 80,24 100,26 L 100,28 L 0,28 Z'
                      }
                      fill="url(#pnlGrad)"
                    />
                    <path
                      d={
                        isPnlUp
                          ? 'M 0,22 C 20,24 35,12 50,15 C 65,18 80,7 100,3'
                          : 'M 0,8 C 20,6 35,16 50,14 C 65,18 80,24 100,26'
                      }
                      fill="none"
                      stroke={isPnlUp ? '#059669' : '#e11d48'}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy={isPnlUp ? 3 : 26} r="2.5" fill={isPnlUp ? '#059669' : '#e11d48'} />
                    <circle
                      cx="100"
                      cy={isPnlUp ? 3 : 26}
                      r="5"
                      fill={isPnlUp ? '#10b981' : '#f43f5e'}
                      opacity="0.3"
                      className="animate-ping"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8.5px] xl:text-[9px] font-mono">
              <span className="text-slate-400">Intraday Sharpe</span>
              <span className="text-emerald-700 font-bold">Sharpe: 2.84</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* BLOK 1 ALTERNATIF: Passive Staking Yield (APY Terkini) */}
          <div className={`${glassCardClassName} flex flex-col justify-between p-2.5 sm:p-3 h-full overflow-hidden`}>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9.5px] xl:text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
                  PASSIVE STAKING
                </span>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[8px] font-black bg-amber-500/10 text-amber-700 border border-amber-500/20 font-mono">
                    +{blendedApy.toFixed(1)}% APY
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode('aum_pnl')}
                    title="Beralih ke Valuasi AUM & PnL"
                    className="text-[8px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 border border-slate-200 transition-colors cursor-pointer"
                  >
                    AUM ⇄
                  </button>
                </div>
              </div>

              <div className="my-1">
                <div className="text-lg sm:text-xl xl:text-2xl font-black text-amber-600 tracking-tight font-mono flex items-baseline gap-1">
                  <span>+{formatCurrency(annualYieldUsd)}</span>
                  <span className="text-[10px] font-semibold text-slate-400">/thn</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[8.5px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
                    +{formatCurrency(dailyYieldUsd)} / hari akrual
                  </span>
                </div>
              </div>

              {/* Mini Sparkline Chart Pergerakan Akumulasi Staking */}
              <div className="w-full my-1 pt-0.5">
                <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400 mb-0.5">
                  <span>COMPOUND REWARDS</span>
                  <span className="text-amber-600 font-bold">AUTO-REINVEST</span>
                </div>
                <div className="h-9 w-full relative">
                  <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="stakingGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,25 Q 25,23 50,15 T 75,9 T 100,3 L 100,28 L 0,28 Z"
                      fill="url(#stakingGrad)"
                    />
                    <path
                      d="M 0,25 Q 25,23 50,15 T 75,9 T 100,3"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="3" r="2.5" fill="#d97706" />
                    <circle cx="100" cy="3" r="5" fill="#f59e0b" opacity="0.3" className="animate-ping" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8.5px] xl:text-[9px] font-mono">
              <span className="text-slate-400">Akrual PoS</span>
              <span className="text-amber-700 font-bold">+{formatCurrency(dailyYieldUsd)}/hr</span>
            </div>
          </div>

          {/* BLOK 2 ALTERNATIF: Cadangan Likuiditas / Cash Buffer (USDC) */}
          <div className={`${glassCardClassName} flex flex-col justify-between p-2.5 sm:p-3 h-full overflow-hidden`}>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9.5px] xl:text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
                  CASH BUFFER
                </span>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[8px] font-black bg-blue-500/10 text-blue-700 border border-blue-500/20 font-mono">
                    {bufferRatio}% BUFFER
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode('aum_pnl')}
                    title="Beralih ke Valuasi AUM & PnL"
                    className="text-[8px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 border border-slate-200 transition-colors cursor-pointer"
                  >
                    AUM ⇄
                  </button>
                </div>
              </div>

              <div className="my-1">
                <div className="text-lg sm:text-xl xl:text-2xl font-black text-slate-900 tracking-tight font-mono flex items-baseline gap-1">
                  <span>{formatCurrency(STABLECOIN_RESERVE_USD)}</span>
                  <span className="text-[10px] font-semibold text-blue-600">USDC</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[8.5px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200/60">
                    Liquid Reserve Buffer (100% Pegged)
                  </span>
                </div>
              </div>

              {/* Mini Sparkline Chart Cadangan Likuiditas */}
              <div className="w-full my-1 pt-0.5">
                <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-400 mb-0.5">
                  <span>RESERVE STABILITY</span>
                  <span className="text-blue-600 font-bold">$1.00 PEG LOCK</span>
                </div>
                <div className="h-9 w-full relative">
                  <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="bufferGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="12" x2="100" y2="12" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="3,3" />
                    <path
                      d="M 0,13 C 20,11 35,14 55,12 C 75,9 85,13 100,11 L 100,28 L 0,28 Z"
                      fill="url(#bufferGrad)"
                    />
                    <path
                      d="M 0,13 C 20,11 35,14 55,12 C 75,9 85,13 100,11"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="11" r="2.5" fill="#2563eb" />
                    <circle cx="100" cy="11" r="5" fill="#3b82f6" opacity="0.3" className="animate-ping" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8.5px] xl:text-[9px] font-mono">
              <span className="text-slate-400">Dip Protection</span>
              <span className="text-blue-700 font-bold">0% Slippage</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
