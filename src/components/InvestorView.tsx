import React from 'react';
import {
  PieChart,
  TrendingUp,
  DollarSign,
  Users,
  ArrowUpRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { INVESTORS, type InvestorAccount } from '../data/dummy/investorDummy';

export const InvestorView: React.FC = () => {
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5">
      {/* 1. TOP CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              TOTAL COMMITTED AUM
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              AUDITED NAV
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              $107,540,000.00
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">CLASS A + B LPs</span>
            <span className="text-indigo-600 font-extrabold">100% DRAWNDOWN</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              NET IRR (ANNUALIZED)
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              +27.42% NET
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              +$22,890,000.00
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">AFTER 2/20 FEE</span>
            <span className="text-emerald-700 font-bold">HIGH-WATER MARK</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              ACTIVE LP ACCOUNTS
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono">
              SEC REG D
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              18 INSTITUTIONS
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">KYC/AML VERIFIED</span>
            <span className="text-blue-700 font-extrabold">ZERO REDEMPTIONS</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              LOCKUP COMPLIANCE
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              STABLE
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              24 MONTHS AVG
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">GATE RESTRICTION 5%</span>
            <span className="text-indigo-600 font-extrabold">PRUDENT LIQUIDITY</span>
          </div>
        </div>
      </section>

      {/* 2. MIDDLE CHARTS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-2.5 flex-1 min-h-0">
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                NAV APPRECIATION & CUMULATIVE RETURN
              </span>
              <span className="text-[10px] font-black text-slate-800 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">
                NAV $1,384.20
              </span>
            </div>
            <div className="w-full h-32 my-0.5 relative">
              <svg viewBox="0 0 500 110" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="navApprecGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0,85 C 80,75 160,50 240,42 C 320,34 400,20 500,14 L 500,90 L 0,90 Z" fill="url(#navApprecGrad)" />
                <path d="M 0,85 C 80,75 160,50 240,42 C 320,34 400,20 500,14" fill="none" stroke="#4f46e5" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-slate-200/80 text-[9px] font-mono text-center">
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">BASE NAV</span>
              <span className="font-extrabold text-slate-800">$1,000.00</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">CURRENT NAV</span>
              <span className="font-extrabold text-slate-800">$1,384.20</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">YTD GAIN</span>
              <span className="font-extrabold text-emerald-600">+38.42%</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
              <span className="text-[7.5px] text-emerald-700 block">AUDIT</span>
              <span className="font-extrabold text-emerald-800">DELOITTE</span>
            </div>
          </div>
        </div>

        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                QUARTERLY LP CAPITAL DISTRIBUTION
              </span>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80 font-mono">
                HURDLE 6.0% MET
              </span>
            </div>
            <div className="w-full h-32 my-0.5 relative">
              <svg viewBox="0 0 500 110" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="distribGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0,82 Q 70,55 140,60 T 280,35 T 420,25 L 500,20 L 500,90 L 0,90 Z" fill="url(#distribGrad)" />
                <path d="M 0,82 Q 70,55 140,60 T 280,35 T 420,25 L 500,20" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-slate-200/80 text-[9px] font-mono text-center">
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">Q1 DISTRIB</span>
              <span className="font-extrabold text-slate-800">$4.2M</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">Q2 DISTRIB</span>
              <span className="font-extrabold text-slate-800">$5.8M</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">Q3 DISTRIB</span>
              <span className="font-extrabold text-slate-800">$6.4M</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
              <span className="text-[7.5px] text-emerald-700 block">PROJECTED</span>
              <span className="font-extrabold text-emerald-800">$7.1M</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INVESTOR TABLE */}
      <section className={`${glassCard} flex-1 min-h-0 overflow-hidden p-2.5 sm:p-3`}>
        <div>
          <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
              INSTITUTIONAL LP CAPITAL REGISTER
            </span>
            <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              {INVESTORS.length} KEY LPs
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[9.5px]">
              <thead>
                <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400">
                  <th className="py-1 px-1">LP ID & Institution</th>
                  <th className="py-1 px-1">Tier</th>
                  <th className="py-1 px-1 text-right">Contributed</th>
                  <th className="py-1 px-1 text-right">Current NAV</th>
                  <th className="py-1 px-1 text-right">Net Return</th>
                  <th className="py-1 px-1 text-center">Lockup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INVESTORS.map((i) => (
                  <tr key={i.lpId} className="hover:bg-indigo-50/30">
                    <td className="py-1.5 px-1">
                      <span className="font-black text-slate-800">{i.lpId}</span>
                      <span className="text-slate-500 text-[8.5px] ml-1">({i.institution})</span>
                    </td>
                    <td className="py-1.5 px-1 text-slate-600">{i.tier}</td>
                    <td className="py-1.5 px-1 text-right font-black text-slate-800">{i.capitalContributed}</td>
                    <td className="py-1.5 px-1 text-right font-black text-indigo-700">{i.currentNav}</td>
                    <td className="py-1.5 px-1 text-right font-black text-emerald-600">{i.netReturn}</td>
                    <td className="py-1.5 px-1 text-center font-bold text-slate-600">{i.lockupExpiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
          <span>FUND STRUCTURE: DELAWARE LP / CAYMAN MASTER-FEEDER</span>
          <span className="text-emerald-600 font-bold">TOTAL CAPITAL MANAGED: $107,540,000.00</span>
        </div>
      </section>
    </div>
  );
};
