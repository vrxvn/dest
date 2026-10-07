import React from 'react';
import { ShieldAlert, AlertTriangle, X, CheckCircle2, Lock, Radio } from 'lucide-react';

interface GenesisKillSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  isActivated: boolean;
  onToggleKillSwitch: () => void;
}

export const GenesisKillSwitchModal: React.FC<GenesisKillSwitchModalProps> = ({
  isOpen,
  onClose,
  isActivated,
  onToggleKillSwitch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border-t-2 border-t-white border-x border-slate-200 border-b-4 border-b-slate-300 shadow-2xl p-5 sm:p-6 overflow-hidden font-mono text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
              isActivated ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
            }`}>
              <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-900 uppercase">
                {isActivated ? 'PULIHKAN TRADING ROUTER (RESUME)' : 'EMERGENCY KILL-SWITCH & SAFE-HALT (ODCA)'}
              </h3>
              <p className="text-[10px] text-slate-500 font-bold">
                Order Disconnect & Cancel All • SEC Rule 15c3-5 Compliance
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Warning Callout */}
        <div className={`p-3 rounded-2xl border mb-4 text-xs ${
          isActivated
            ? 'bg-amber-50 border-amber-200 text-amber-800'
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1 text-[11px] leading-relaxed">
              <span className="font-black uppercase block">
                {isActivated
                  ? 'SISTEM SEDANG DALAM STATUS HALT PENUH'
                  : 'PERINGATAN PROTOKOL DARURAT KUANTITATIF'}
              </span>
              <p>
                {isActivated
                  ? 'Mengaktifkan kembali router akan membuka sesi FIX 4.4, menghubungkan kembali kuotasi HFT, dan mengizinkan algoritma mengirimkan pesanan ke bursa.'
                  : 'Tindakan ini akan langsung memutus seluruh sesi FIX 4.4, membatalkan 14 pesanan terbuka ($1.82M notional), dan menghentikan pengiriman sinyal dari 6 model Genesis.'}
              </p>
            </div>
          </div>
        </div>

        {/* Impact Scope Grid */}
        <div className="space-y-2 mb-4">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            CAKUPAN PROTOKOL SISTEM
          </span>
          <div className="grid grid-cols-2 gap-2 text-[10.5px]">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[9px] text-slate-400 block uppercase">STATUS ORDER TERBUKA</span>
              <span className="font-black text-rose-600 block mt-0.5">
                {isActivated ? 'TERHENTI (0 OPEN)' : '14 ORDER AKTIF ($1.82M)'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[9px] text-slate-400 block uppercase">GATEWAY BURSA</span>
              <span className="font-black text-slate-800 block mt-0.5">
                CME, BINANCE VIP, EBS, COINBASE
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[9px] text-slate-400 block uppercase">MODEL TERDAMPAK</span>
              <span className="font-black text-indigo-700 block mt-0.5">
                6 MODEL GENESIS QUANT
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[9px] text-slate-400 block uppercase">DELTA HEDGING</span>
              <span className="font-black text-emerald-600 block mt-0.5">
                NETRAL (0.02 BETA)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onToggleKillSwitch();
              onClose();
            }}
            className={`px-4 py-2 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5 ${
              isActivated
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
            }`}
          >
            {isActivated ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                Lanjutkan Trading (Resume)
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                Aktifkan Safe-Halt Sekarang
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
