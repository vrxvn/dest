import React from 'react';
import { Landmark, Calendar, Clock, ChevronRight, TrendingUp, AlertTriangle } from 'lucide-react';

interface CentralBankRate {
  bank: string;
  currency: string;
  rate: string;
  stance: 'HAWKISH' | 'NEUTRAL' | 'DOVISH';
  nextMeeting: string;
}

const CENTRAL_BANKS: CentralBankRate[] = [
  { bank: 'Federal Reserve', currency: 'USD', rate: '5.25% - 5.50%', stance: 'NEUTRAL', nextMeeting: 'Nov 07' },
  { bank: 'European Central Bank', currency: 'EUR', rate: '3.75%', stance: 'DOVISH', nextMeeting: 'Oct 17' },
  { bank: 'Bank of Japan', currency: 'JPY', rate: '0.25%', stance: 'HAWKISH', nextMeeting: 'Oct 31' },
  { bank: 'Bank of England', currency: 'GBP', rate: '5.00%', stance: 'NEUTRAL', nextMeeting: 'Nov 07' },
];

interface MacroEvent {
  time: string;
  event: string;
  currency: string;
  impact: 'HIGH' | 'MED';
  forecast: string;
  previous: string;
}

const UPCOMING_EVENTS: MacroEvent[] = [
  { time: '14:30 WIB', event: 'US Core PCE Price Index', currency: 'USD', impact: 'HIGH', forecast: '2.6%', previous: '2.6%' },
  { time: '16:00 WIB', event: 'Eurozone Flash CPI YoY', currency: 'EUR', impact: 'HIGH', forecast: '2.2%', previous: '2.4%' },
  { time: '19:30 WIB', event: 'BOE Gov Bailey Speech', currency: 'GBP', impact: 'MED', forecast: '-', previous: '-' },
];

export const FxCentralBankRadar: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-full overflow-hidden font-mono">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase truncate">
              CENTRAL BANK & MACRO RADAR
            </span>
          </div>
          <span className="text-[8px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded-full border border-amber-200/80">
            FED / ECB / BOJ
          </span>
        </div>

        {/* Central Banks Policy Rates */}
        <div className="grid grid-cols-2 gap-1.5 my-1">
          {CENTRAL_BANKS.map((cb) => (
            <div
              key={cb.currency}
              className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold text-slate-400">{cb.bank}</span>
                <span
                  className={`text-[7px] font-black px-1 rounded ${
                    cb.stance === 'HAWKISH'
                      ? 'bg-rose-100 text-rose-700'
                      : cb.stance === 'DOVISH'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {cb.stance}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xs font-black text-slate-900">{cb.currency} {cb.rate}</span>
                <span className="text-[7.5px] text-slate-400">{cb.nextMeeting}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Impact Economic Calendar */}
      <div className="flex-1 overflow-y-auto space-y-1.5 my-1 pr-0.5 min-h-0 custom-scrollbar">
        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <Calendar className="w-2.5 h-2.5 text-indigo-500" /> UPCOMING HIGH IMPACT RELEASES
        </div>
        {UPCOMING_EVENTS.map((item, idx) => (
          <div
            key={idx}
            className="p-1.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border border-slate-200/90 flex items-center justify-between gap-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  item.impact === 'HIGH' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[8.5px] font-black text-slate-800 truncate">
                  <span className="text-indigo-600 font-black">{item.currency}</span>
                  <span className="truncate">{item.event}</span>
                </div>
                <div className="text-[7.5px] text-slate-400">
                  Forecast: <span className="font-bold text-slate-700">{item.forecast}</span> (Prev: {item.previous})
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5 text-slate-400" /> {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] text-slate-500 mt-1 shrink-0">
        <span>BLOOMBERG CONSENSUS</span>
        <span className="text-amber-700 font-bold">RATE CUT ODDS: 84%</span>
      </div>
    </div>
  );
};
