import React from 'react';
import {
  SlidersHorizontal,
  ShieldCheck,
  AlertOctagon,
  Key,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { SYSTEM_PARAMS, type SystemParam } from '../data/dummy/adminDummy';

export const AdminView: React.FC = () => {
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5">
      {/* 1. TOP CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              EXECUTIVE ADMIN LEVEL
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              ROOT TIER
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              SUPERADMIN PRIVILEGE
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">YUBIKEY 5 NFC AUTH</span>
            <span className="text-indigo-600 font-extrabold">SESSION VALID</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              KILL-SWITCH DAEMON
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              ARMED & READY
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              ZERO ACTIVE HALTS
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">CIRCUIT BREAKER</span>
            <span className="text-emerald-700 font-bold">AUTOMATIC RECOVERY</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              ROLE-BASED ACLs
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono">
              RBAC STRICT
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              8 PERMISSION ROLES
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">ZERO GUEST ACCESS</span>
            <span className="text-blue-700 font-extrabold">PRINCIPLE LEAST PRIV</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              AUDIT LOG IMMUTABILITY
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              WORM STORAGE
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              100% CRYPTO-SIGNED
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">7-YEAR RETENTION</span>
            <span className="text-indigo-600 font-extrabold">FORENSIC READY</span>
          </div>
        </div>
      </section>

      {/* 2. SYSTEM PARAMETERS TABLE */}
      <section className={`${glassCard} flex-1 min-h-0 overflow-hidden p-2.5 sm:p-3`}>
        <div>
          <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
              SYSTEM CONFIGURATION PARAMETER REGISTER & THRESHOLDS
            </span>
            <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              ACTIVE ENFORCEMENT
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[9.5px]">
              <thead>
                <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400">
                  <th className="py-1 px-1">Parameter Key</th>
                  <th className="py-1 px-1">Category</th>
                  <th className="py-1 px-1 text-right">Current Value</th>
                  <th className="py-1 px-1">Safety Threshold</th>
                  <th className="py-1 px-1">Governance Owner</th>
                  <th className="py-1 px-1 text-right">Sync Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SYSTEM_PARAMS.map((p) => (
                  <tr key={p.paramKey} className="hover:bg-indigo-50/30">
                    <td className="py-1.5 px-1 font-black text-slate-800">{p.paramKey}</td>
                    <td className="py-1.5 px-1 text-slate-600">{p.category}</td>
                    <td className="py-1.5 px-1 text-right font-black text-indigo-700">{p.currentValue}</td>
                    <td className="py-1.5 px-1 font-bold text-slate-700">{p.safetyThreshold}</td>
                    <td className="py-1.5 px-1 text-slate-500">{p.governance}</td>
                    <td className="py-1.5 px-1 text-right text-slate-500">{p.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
          <span>ROOT LEVEL GOVERNANCE: OPERATIONAL LIMITS SUBJECT TO RIGID AUDIT PROTOCOLS</span>
          <span className="text-emerald-600 font-bold">SYSTEMS NOMINAL</span>
        </div>
      </section>
    </div>
  );
};
