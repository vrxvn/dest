import React, { useState, useEffect } from 'react';
import { Clock, Globe2, Zap, Activity } from 'lucide-react';

interface MarketSession {
  city: string;
  flag: string;
  code: string;
  openUtc: number; // 0-23
  closeUtc: number; // 0-23
  timezone: string;
  weight: string;
}

const SESSIONS: MarketSession[] = [
  { city: 'Sydney', flag: '🇦🇺', code: 'SYD', openUtc: 22, closeUtc: 7, timezone: 'AEST', weight: '4%' },
  { city: 'Tokyo', flag: '🇯🇵', code: 'TYO', openUtc: 0, closeUtc: 9, timezone: 'JST', weight: '19%' },
  { city: 'London', flag: '🇬🇧', code: 'LDN', openUtc: 8, closeUtc: 17, timezone: 'BST', weight: '38%' },
  { city: 'New York', flag: '🇺🇸', code: 'NYC', openUtc: 13, closeUtc: 22, timezone: 'EDT', weight: '31%' },
];

export const FxMarketSessionsCard: React.FC<{ glassCardClassName: string }> = ({ glassCardClassName }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentUtcHour = time.getUTCHours();
  const currentUtcMinute = time.getUTCMinutes();

  const isSessionOpen = (session: MarketSession) => {
    if (session.openUtc > session.closeUtc) {
      // Over midnight (e.g. Sydney 22:00 - 07:00)
      return currentUtcHour >= session.openUtc || currentUtcHour < session.closeUtc;
    }
    return currentUtcHour >= session.openUtc && currentUtcHour < session.closeUtc;
  };

  const activeSessions = SESSIONS.filter(isSessionOpen);
  const isOverlap = activeSessions.length >= 2;
  const isLondonNyOverlap =
    isSessionOpen(SESSIONS[2]) && isSessionOpen(SESSIONS[3]); // London + NY

  const timeUtcStr = `${String(currentUtcHour).padStart(2, '0')}:${String(currentUtcMinute).padStart(2, '0')} UTC`;
  const timeWibStr = time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  return (
    <div className={glassCardClassName}>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
          GLOBAL FX SESSIONS
        </span>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold font-mono ${
            isLondonNyOverlap
              ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
              : isOverlap
              ? 'bg-indigo-500/10 text-indigo-700 border border-indigo-500/20'
              : 'bg-blue-500/10 text-blue-700 border border-blue-500/20'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {isLondonNyOverlap
            ? 'LDN-NYC OVERLAP'
            : isOverlap
            ? 'MULTI-SESSION'
            : `${activeSessions[0]?.code || 'GLOBAL'} ACTIVE`}
        </span>
      </div>

      <div className="my-0.5">
        <div className="flex items-baseline justify-between">
          <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
            {activeSessions.length} OPEN
          </div>
          <span className="text-[9.5px] font-mono text-slate-500 font-bold">
            {timeWibStr} ({timeUtcStr})
          </span>
        </div>

        {/* 4 Session Indicator Pills */}
        <div className="grid grid-cols-4 gap-1 mt-1 font-mono text-[8px]">
          {SESSIONS.map((s) => {
            const open = isSessionOpen(s);
            return (
              <div
                key={s.code}
                className={`py-0.5 px-1 rounded-md text-center transition-all border flex items-center justify-center gap-1 ${
                  open
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-black shadow-2xs'
                    : 'bg-slate-100/70 text-slate-400 border-slate-200/80 font-medium'
                }`}
              >
                <span className="text-[9px]">{s.flag}</span>
                <span>{s.code}</span>
                {open && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
        <span className="text-slate-400 truncate">
          {isLondonNyOverlap ? 'PEAK LIQUIDITY WINDOW' : '24H INTERBANK ROTATION'}
        </span>
        <span className="text-indigo-600 font-extrabold shrink-0">
          {isOverlap ? 'SPREAD MINIMAL' : 'NORMAL SPREAD'}
        </span>
      </div>
    </div>
  );
};
