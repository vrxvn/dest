import React, { useState } from 'react';
import { CryptoHistoricalChart } from './CryptoHistoricalChart';
import { TrendingTokensMonitor } from './TrendingTokensMonitor';
import { TopEcosystemTokens } from './TopEcosystemTokens';
import { ColdVaultCustody } from './ColdVaultCustody';
import { CryptoMarketAnalytics } from './CryptoMarketAnalytics';
import { CryptoMacroMetrics } from './CryptoMacroMetrics';
import { CryptoPortfolioSidebar } from './CryptoPortfolioSidebar';

export const CryptoView: React.FC = () => {
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>('BTC');

  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-y-auto overflow-x-hidden pr-0.5 pb-0.5 custom-scrollbar">
      {/* 1. TOP KPI CARDS - Barometer Makro Pasar Global Crypto */}
      <CryptoMacroMetrics glassCard={glassCard} />

      {/* 2. MIDDLE SECTION: [PORTOFOLIO VAULT (SEBELAH KIRI - 1 BARIS 2 BLOK SAJA)] + [CHART UTAMA (TENGAH)] + [MARKET ANALYTICS (KANAN)] */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 flex-1 min-h-[350px] sm:min-h-[380px]">
        {/* 1. Sebelah Kiri Chart: 1 Baris 2 Blok Saja */}
        <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-2 gap-2 sm:gap-2.5">
          <CryptoPortfolioSidebar glassCardClassName={glassCard} onSelectCoin={(sym) => setSelectedAssetSymbol(sym)} />
        </div>

        {/* 2. Tengah: Realtime & Historical Crypto Chart */}
        <div className={`${glassCard} lg:col-span-7 xl:col-span-5 flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <CryptoHistoricalChart
            selectedAssetSymbol={selectedAssetSymbol}
            onSelectAsset={(sym) => setSelectedAssetSymbol(sym)}
          />
        </div>

        {/* 3. Sebelah Kanan Chart: Realtime Market Depth, L2 Orderbook & Sentiment Analytics */}
        <div className={`${glassCard} lg:col-span-12 xl:col-span-3 flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <CryptoMarketAnalytics selectedAssetSymbol={selectedAssetSymbol} />
        </div>
      </section>

      {/* 3. BOTTOM 3 BLOCKS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-2.5 min-h-[300px] flex-1">
        {/* 1. Cold Vault Custody Ledger (Koin Saja) */}
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <ColdVaultCustody
            selectedAssetSymbol={selectedAssetSymbol}
            onSelectAsset={(sym) => setSelectedAssetSymbol(sym)}
          />
        </div>

        {/* 2. Top 100 Crypto Tokens (Solana SPL, Ethereum ERC-20, L2 - Bukan Koin) */}
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <TopEcosystemTokens
            selectedSymbol={selectedAssetSymbol}
            onSelectToken={(sym) => setSelectedAssetSymbol(sym)}
          />
        </div>

        {/* 3. Token Hits & Top Transaksi (Realtime Binance API Feed) */}
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <TrendingTokensMonitor
            selectedSymbol={selectedAssetSymbol}
            onSelectToken={(sym) => setSelectedAssetSymbol(sym)}
          />
        </div>
      </section>
    </div>
  );
};
