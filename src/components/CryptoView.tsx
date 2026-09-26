import React, { useState } from 'react';
import { CryptoHistoricalChart } from './CryptoHistoricalChart';
import { TrendingTokensMonitor } from './TrendingTokensMonitor';
import { TopEcosystemTokens } from './TopEcosystemTokens';
import { ColdVaultCustody } from './ColdVaultCustody';
import { CryptoMarketAnalytics } from './CryptoMarketAnalytics';
import { CryptoMacroMetrics } from './CryptoMacroMetrics';
import { CryptoPortfolioSidebar } from './CryptoPortfolioSidebar';
import { WhaleLiquidationStream } from './WhaleLiquidationStream';
import { OnChainRadar } from './OnChainRadar';

export const CryptoView: React.FC = () => {
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>('BTC');

  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5">
      {/* 1. TOP KPI CARDS - Barometer Makro Pasar Global Crypto */}
      <CryptoMacroMetrics glassCard={glassCard} />

      {/* 2. BODY CONTENT: [KIRI & TENGAH: Portofolio + Chart + 3 Block Bawah] + [KANAN: Order Book / Market Analytics Full Tinggi] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 flex-1 min-h-0 overflow-hidden">
        {/* KOLOM KIRI & TENGAH (9 DARI 12 KOLOM) */}
        <div className="lg:col-span-9 xl:col-span-9 flex flex-col gap-2 sm:gap-2.5 h-full min-h-0 overflow-hidden">
          {/* Baris Atas: [Portofolio Vault 4 Kolom] + [Chart Utama 8 Kolom] */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-2.5 flex-1 min-h-0">
            {/* Sebelah Kiri Chart: 4 Blok Portofolio (2x2 Grid) */}
            <div className="md:col-span-4 xl:col-span-4 grid grid-cols-2 gap-2 sm:gap-2.5 h-full min-h-0">
              <CryptoPortfolioSidebar glassCardClassName={glassCard} onSelectCoin={(sym) => setSelectedAssetSymbol(sym)} />
            </div>

            {/* Tengah: Realtime & Historical Crypto Chart */}
            <div className={`${glassCard} md:col-span-8 xl:col-span-8 flex flex-col justify-between overflow-hidden p-2.5 sm:p-3 h-full min-h-0`}>
              <CryptoHistoricalChart
                selectedAssetSymbol={selectedAssetSymbol}
                onSelectAsset={(sym) => setSelectedAssetSymbol(sym)}
              />
            </div>
          </section>

          {/* Baris Bawah: 3 Realtime Institutional Streams */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0">
            {/* 1. Whale Liquidation Stream */}
            <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3 h-full min-h-0`}>
              <WhaleLiquidationStream
                onSelectToken={(sym) => setSelectedAssetSymbol(sym)}
              />
            </div>

            {/* 2. Token Hits & Top Transaksi */}
            <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3 h-full min-h-0`}>
              <TrendingTokensMonitor
                selectedSymbol={selectedAssetSymbol}
                onSelectToken={(sym) => setSelectedAssetSymbol(sym)}
              />
            </div>

            {/* 3. On-Chain Radar & DEX Swaps */}
            <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3 h-full min-h-0`}>
              <OnChainRadar />
            </div>
          </section>
        </div>

        {/* KOLOM KANAN (3 DARI 12 KOLOM): REALTIME ORDER BOOK & MARKET ANALYTICS TINGGI SAMPAI TEPI BAWAH LAYAR */}
        <div className="lg:col-span-3 xl:col-span-3 h-full min-h-0 flex flex-col">
          <div className={`${glassCard} h-full min-h-0 flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
            <CryptoMarketAnalytics
              selectedAssetSymbol={selectedAssetSymbol}
              onSelectAsset={(sym) => setSelectedAssetSymbol(sym)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
