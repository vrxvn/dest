import React from 'react';
import {
  Settings,
  Monitor,
  Bell,
  Clock,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { SYSTEM_SETTINGS } from '../data/dummy/settingsDummy';

export const SettingsView: React.FC = () => {
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5">
      {/* 1. TOP CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              SYSTEM PREFERENCES
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              READ-ONLY
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              EXECUTIVE PROFILE
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">ROLE: CHIEF INVESTMENT OFFICER</span>
            <span className="text-indigo-600 font-extrabold">VERIFIED</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              FEED REFRESH RATE
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              HIGH TICK
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              100 MS POLL
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">STREAM PROTOCOL</span>
            <span className="text-emerald-700 font-bold">WEBSOCKET SYNC</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              SESSION TIMEOUT
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono">
              SECURE
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              15 MIN INACTIVITY
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">HARDWARE TOKEN BIND</span>
            <span className="text-blue-700 font-extrabold">AUTO LOCK</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              TELEMETRY LOGGING
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              ENABLED
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              SECURE COMPLIANT
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">ZERO PII LEAK</span>
            <span className="text-indigo-600 font-extrabold">ENCRYPTED AT REST</span>
          </div>
        </div>
      </section>

      {/* 2. SETTINGS REGISTER TABLE */}
      <section className={`${glassCard} flex-1 min-h-0 overflow-hidden p-2.5 sm:p-3`}>
        <div>
          <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
              EXECUTIVE DASHBOARD CLIENT SETTINGS & ENVIRONMENT RUNTIME
            </span>
            <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              SYSTEM PROFILE
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[9.5px]">
              <thead>
                <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400">
                  <th className="py-1 px-1">Setting Key</th>
                  <th className="py-1 px-1">Configuration Scope</th>
                  <th className="py-1 px-1 text-right">Value</th>
                  <th className="py-1 px-1 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SYSTEM_SETTINGS.map((s) => (
                  <tr key={s.key} className="hover:bg-indigo-50/30">
                    <td className="py-1.5 px-1 font-black text-slate-800">{s.key}</td>
                    <td className="py-1.5 px-1 text-slate-600">{s.scope}</td>
                    <td className="py-1.5 px-1 text-right font-black text-indigo-700">{s.value}</td>
                    <td className="py-1.5 px-1 text-center font-bold text-emerald-600">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
          <span>SECURITY & DISPLAY POLICIES GOVERNED BY ENTERPRISE DEVICE MANAGEMENT</span>
          <span className="text-emerald-600 font-bold">100% SECURE</span>
        </div>
      </section>
    </div>
  );
};
