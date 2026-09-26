import React, { useState, useEffect, useCallback } from 'react';
import { Lock, ShieldCheck, ArrowUpRight, ArrowDownRight, RefreshCw, KeyRound, Radio } from 'lucide-react';

export interface VaultCoinItem {
  asset: string;
  name: string;
  balanceQty: number;
  balanceStr: string;
  fallbackPrice: number;
  custody: string;
  multisig: string;
  color: string;
}

export const VAULT_COINS_BASE: VaultCoinItem[] = [
  { asset: 'BTC', name: 'Bitcoin Core Treasury', balanceQty: 35.5, balanceStr: '35.50 BTC', fallbackPrice: 84020, custody: 'Fireblocks HSM', multisig: '4 of 7 Multi-Sig', color: '#f59e0b' },
  { asset: 'ETH', name: 'Ethereum Beacon Reserve', balanceQty: 420.0, balanceStr: '420.00 ETH', fallbackPrice: 2690, custody: 'Coinbase Prime', multisig: '3 of 5 Multi-Sig', color: '#6366f1' },
  { asset: 'SOL', name: 'Solana High-Speed Reserve', balanceQty: 5800.0, balanceStr: '5,800.00 SOL', fallbackPrice: 120.8, custody: 'Anchorage Digital', multisig: '3 of 5 Multi-Sig', color: '#06b6d4' },
  { asset: 'XRP', name: 'Ripple Ledger Stash', balanceQty: 250000.0, balanceStr: '250,000 XRP', fallbackPrice: 1.56, custody: 'BitGo Trust', multisig: '3 of 5 Multi-Sig', color: '#3b82f6' },
  { asset: 'BNB', name: 'BNB Chain Treasury', balanceQty: 450.0, balanceStr: '450.00 BNB', fallbackPrice: 774.0, custody: 'Fireblocks HSM', multisig: '4 of 7 Multi-Sig', color: '#eab308' },
  { asset: 'SUI', name: 'Sui Network Core', balanceQty: 120000.0, balanceStr: '120,000 SUI', fallbackPrice: 1.16, custody: 'Ledger Enterprise', multisig: '3 of 5 Multi-Sig', color: '#0ea5e9' },
  { asset: 'NEAR', name: 'NEAR Sharding Vault', balanceQty: 40000.0, balanceStr: '40,000 NEAR', fallbackPrice: 4.88, custody: 'Copper ClearLoop', multisig: '3 of 5 Multi-Sig', color: '#10b981' },
  { asset: 'AVAX', name: 'Avalanche Subnet Stash', balanceQty: 18000.0, balanceStr: '18,000 AVAX', fallbackPrice: 10.68, custody: 'BitGo Trust', multisig: '3 of 5 Multi-Sig', color: '#ef4444' },
  { asset: 'ADA', name: 'Cardano Shelley Reserve', balanceQty: 350000.0, balanceStr: '350,000 ADA', fallbackPrice: 0.38, custody: 'Fireblocks HSM', multisig: '3 of 5 Multi-Sig', color: '#2563eb' },
  { asset: 'DOT', name: 'Polkadot Relay Custody', balanceQty: 25000.0, balanceStr: '25,000 DOT', fallbackPrice: 4.25, custody: 'Anchorage Digital', multisig: '3 of 5 Multi-Sig', color: '#e11d48' },
  { asset: 'DOGE', name: 'Dogecoin Scrypt Cold', balanceQty: 1000000.0, balanceStr: '1,000,000 DOGE', fallbackPrice: 0.098, custody: 'Coinbase Prime', multisig: '2 of 3 Multi-Sig', color: '#d97706' },
  { asset: 'ATOM', name: 'Cosmos Hub Reserve', balanceQty: 18000.0, balanceStr: '18,000 ATOM', fallbackPrice: 4.65, custody: 'Copper ClearLoop', multisig: '3 of 5 Multi-Sig', color: '#64748b' },
  { asset: 'APT', name: 'Aptos L1 Allocation', balanceQty: 12000.0, balanceStr: '12,000 APT', fallbackPrice: 6.85, custody: 'Ledger Enterprise', multisig: '3 of 5 Multi-Sig', color: '#14b8a6' },
];

export interface ColdVaultCustodyProps {
  selectedAssetSymbol?: string;
  onSelectAsset?: (symbol: string) => void;
}

export const ColdVaultCustody: React.FC<ColdVaultCustodyProps> = ({
  selectedAssetSymbol = 'BTC',
  onSelectAsset,
}) => {
  const [prices, setPrices] = useState<Record<string, { price: number; change24h: number }>>(() => {
    const initial: Record<string, { price: number; change24h: number }> = {};
    VAULT_COINS_BASE.forEach((c) => {
      initial[c.asset] = { price: c.fallbackPrice, change24h: 2.5 };
    });
    return initial;
  });
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live');

  const fetchLiveCoinPrices = useCallback(async () => {
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
      setLastSyncTime(
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    } catch {
      // keep fallback
    }
  }, []);

  useEffect(() => {
    fetchLiveCoinPrices();
    const interval = setInterval(fetchLiveCoinPrices, 7000);
    return () => clearInterval(interval);
  }, [fetchLiveCoinPrices]);

  const totalVaultValueUsd = VAULT_COINS_BASE.reduce((sum, item) => {
    const curPrice = prices[item.asset]?.price ?? item.fallbackPrice;
    return sum + curPrice * item.balanceQty;
  }, 0);

  const formatPrice = (p: number) => {
    if (p >= 100) return `$${p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (p >= 1) return `$${p.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
    return `$${p.toFixed(4)}`;
  };

  const formatTotalUsd = (val: number) => {
    if (val >= 1e6) {
      return `$${(val / 1e6).toFixed(2)}M`;
    }
    return `$${Math.round(val / 1e3)}k`;
  };

  return (
    <div className="flex flex-col h-full select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80 flex-shrink-0">
        <div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono leading-tight">
              COLD VAULT CUSTODY (KOIN SAJA)
            </span>
          </div>
          <span className="text-[8px] text-slate-400 font-mono block">
            {VAULT_COINS_BASE.length} Koin Native Layer-1 • Air-Gapped Cold Storage
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-black text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-200/80 font-mono">
            TOTAL: {formatTotalUsd(totalVaultValueUsd)}
          </span>
          <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/80 font-mono flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5" />
            HSM 100%
          </span>
        </div>
      </div>

      {/* Realtime Table - Fills Full Height to the Bottom */}
      <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto pr-0.5 custom-scrollbar">
        <table className="w-full text-left font-mono text-[9px]">
          <thead>
            <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
              <th className="py-1 px-1">Koin</th>
              <th className="py-1 px-1 text-right">Saldo Koin</th>
              <th className="py-1 px-1 text-right">Harga Live</th>
              <th className="py-1 px-1 text-right">Nilai USD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {VAULT_COINS_BASE.map((item) => {
              const isSelected = selectedAssetSymbol === item.asset;
              const live = prices[item.asset] || { price: item.fallbackPrice, change24h: 0 };
              const currentValUsd = live.price * item.balanceQty;
              const isUp = live.change24h >= 0;

              return (
                <tr
                  key={item.asset}
                  onClick={() => onSelectAsset?.(item.asset)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-50/90 font-bold' : 'hover:bg-slate-50'
                  }`}
                  title={`Klik untuk melihat grafik harga ${item.asset}`}
                >
                  <td className="py-1.5 px-1 font-black text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-black text-slate-900">{item.asset}</span>
                      <span className="text-[7.5px] text-slate-400 font-normal hidden sm:inline truncate max-w-[60px]">
                        {item.name.split(' ')[0]}
                      </span>
                    </div>
                  </td>

                  <td className="py-1.5 px-1 text-right text-slate-700 font-bold">
                    {item.balanceStr}
                  </td>

                  <td className="py-1.5 px-1 text-right font-black text-slate-800">
                    <div className="flex items-center justify-end gap-1">
                      <span>{formatPrice(live.price)}</span>
                      <span
                        className={`text-[7.5px] font-bold ${
                          isUp ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {isUp ? `+${live.change24h.toFixed(1)}%` : `${live.change24h.toFixed(1)}%`}
                      </span>
                    </div>
                  </td>

                  <td className="py-1.5 px-1 text-right font-black text-slate-900">
                    {formatTotalUsd(currentValUsd)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1 flex-shrink-0">
        <span className="flex items-center gap-1 text-indigo-700 font-bold">
          <KeyRound className="w-2.5 h-2.5" />
          FIREBLOCKS & COINBASE PRIME CUSTODY
        </span>
        <span className="text-slate-400">Sinkron: {lastSyncTime}</span>
      </div>
    </div>
  );
};
