import React, { useState } from 'react';
import {
  Coins,
  ShieldCheck,
  TrendingUp,
  Cpu,
  ArrowUpRight,
  Zap,
  Layers,
  Flame,
  PieChart,
  Lock,
} from 'lucide-react';
import {
  CRYPTO_VAULTS,
  CRYPTO_LIQUIDITY_POOLS as LIQUIDITY_POOLS,
  VALIDATOR_NODES,
  type CryptoVault,
  type LiquidityPoolData,
  type ValidatorNode,
} from '../data/dummy/cryptoDummy';

export const CryptoView: React.FC = () => {
  const [hoveredAsset, setHoveredAsset] = useState<number | null>(null);

  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5">
      {/* 1. TOP KPI CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              TOTAL CRYPTO AUM
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              ON-CHAIN COLD
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              $84,645,892.00
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">5 MULTI-SIG HSMs</span>
            <span className="text-indigo-600 font-extrabold">+12.4% MoM GROWTH</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              STAKING & YIELD APY
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              +5.14% BLENDED
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              +$4,350,800/yr
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">DAILY ACCRUAL</span>
            <span className="text-emerald-700 font-bold">+$11,920 / DAY</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              SMART CONTRACT SAFETY
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono">
              FORMAL VERIF
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              99.99% AUDIT SCORE
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">ZERO EXPLOITS</span>
            <span className="text-blue-700 font-extrabold">TRAIL OF BITS / CERTIK</span>
          </div>
        </div>

        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              VALIDATOR STAKE POOL
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              100% UPTIME
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              12 ACTIVE NODES
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">SLASHING RESILIENT</span>
            <span className="text-indigo-600 font-extrabold">TIER-4 DATACENTERS</span>
          </div>
        </div>
      </section>

      {/* 2. MIDDLE CHARTS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-2.5 flex-1 min-h-0">
        {/* Left: Asset Distribution */}
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-b from-[#ffffff] to-[#e4eaf4] text-indigo-600 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <PieChart className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono block leading-tight">
                    CRYPTO ASSET ALLOCATION BY RESERVE
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    BTC • ETH • SOL • USDC • AVAX ($84.65M)
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-black text-slate-800 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">
                100% AUDITED
              </span>
            </div>

            <div className="w-full h-3 bg-slate-200/90 rounded-full overflow-hidden p-0.5 shadow-inner border border-slate-300/50 flex gap-1 my-1.5">
              {CRYPTO_VAULTS.map((item, idx) => (
                <div
                  key={item.asset}
                  className={`h-full rounded-full transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] cursor-pointer ${
                    idx === 0 ? 'bg-indigo-600' : idx === 1 ? 'bg-cyan-500' : idx === 2 ? 'bg-amber-500' : idx === 3 ? 'bg-emerald-500' : 'bg-purple-500'
                  } ${hoveredAsset === idx ? 'brightness-125 scale-y-110' : ''}`}
                  style={{ width: item.stakedShare }}
                  onMouseEnter={() => setHoveredAsset(idx)}
                  onMouseLeave={() => setHoveredAsset(null)}
                />
              ))}
            </div>

            <div className="w-full h-24 my-0.5 relative">
              <svg viewBox="0 0 500 90" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="cryptoWave1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="20" x2="500" y2="20" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                <line x1="0" y1="50" x2="500" y2="50" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#94a3b8" opacity="0.7" />
                <path d="M 0,68 C 70,58 130,22 210,28 C 290,34 370,12 430,20 C 470,24 490,16 500,18 L 500,85 L 0,85 Z" fill="url(#cryptoWave1)" />
                <path d="M 0,68 C 70,58 130,22 210,28 C 290,34 370,12 430,20 C 470,24 490,16 500,18" fill="none" stroke="#4f46e5" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 pt-1.5 border-t border-slate-200/80 text-[9px] font-mono">
            {CRYPTO_VAULTS.map((item, idx) => (
              <div
                key={item.asset}
                className={`p-1 rounded-lg bg-gradient-to-b from-white to-[#f5f8fc] border border-slate-200/80 ${
                  hoveredAsset === idx ? 'ring-1 ring-indigo-500 shadow-xs' : ''
                }`}
                onMouseEnter={() => setHoveredAsset(idx)}
                onMouseLeave={() => setHoveredAsset(null)}
              >
                <div className="flex items-center justify-between text-slate-500 mb-0.5">
                  <span className="font-black text-slate-800 text-[10px]">{item.asset}</span>
                  <span className="text-[8px] font-bold text-indigo-600">{item.stakedShare}</span>
                </div>
                <div className="text-[9.5px] font-black text-slate-900 truncate">{item.notionalUsd}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: On-Chain Gas & MEV Arb Yield */}
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-b from-[#ffffff] to-[#e4eaf4] text-emerald-600 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Flame className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono block leading-tight">
                    ON-CHAIN MEMPOOL & MEV-CAPTURE AUDIT
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    PRIVATE ORDERFLOW (MEV-BOOST) FLASHBOTS ROUTING
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[9px]">
                <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80">
                  ZERO SANDWICH RISK
                </span>
              </div>
            </div>

            <div className="w-full h-28 my-0.5 relative">
              <svg viewBox="0 0 500 110" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="mevZoneGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="25" x2="500" y2="25" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                <line x1="0" y1="55" x2="500" y2="55" stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.5" />
                <line x1="0" y1="85" x2="500" y2="85" stroke="#94a3b8" opacity="0.7" />
                <path d="M 0,78 Q 60,54 120,58 T 240,32 T 360,42 T 480,22 L 500,20 L 500,85 L 0,85 Z" fill="url(#mevZoneGrad)" />
                <path d="M 0,78 Q 60,54 120,58 T 240,32 T 360,42 T 480,22 L 500,20" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-slate-200/80 text-[9px] font-mono text-center">
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">GAS PRICE</span>
              <span className="font-extrabold text-slate-800">12 Gwei</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">MEV CAPTURED</span>
              <span className="font-extrabold text-emerald-600">+$248,500</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80">
              <span className="text-[7.5px] text-slate-400 block">PRIVATE BLOCK</span>
              <span className="font-extrabold text-slate-800">99.4% HIT</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
              <span className="text-[7.5px] text-emerald-700 block">TX FAILURE</span>
              <span className="font-extrabold text-emerald-800">0.00%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOTTOM 3 BLOCKS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0">
        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
              <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                COLD VAULT CUSTODY LEDGER
              </span>
              <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200/80 font-mono">
                FIREBLOCKS
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[9.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400">
                    <th className="py-1 px-1">Asset</th>
                    <th className="py-1 px-1 text-right">Holdings</th>
                    <th className="py-1 px-1 text-right">Notional</th>
                    <th className="py-1 px-1 text-right">APY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CRYPTO_VAULTS.map((v) => (
                    <tr key={v.asset} className="hover:bg-indigo-50/30">
                      <td className="py-1.5 px-1 font-black text-slate-800">{v.asset}</td>
                      <td className="py-1.5 px-1 text-right text-slate-600">{v.balance}</td>
                      <td className="py-1.5 px-1 text-right font-black text-slate-900">{v.notionalUsd}</td>
                      <td className="py-1.5 px-1 text-right font-bold text-emerald-600">{v.apy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
            <span>COLD HSM MULTI-SIG</span>
            <span className="text-emerald-600 font-bold">100% AIR-GAPPED</span>
          </div>
        </div>

        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
              <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                INSTITUTIONAL DEFI POOLS
              </span>
              <span className="text-[8px] font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.2 rounded-full border border-cyan-200/80 font-mono">
                {LIQUIDITY_POOLS.length} PROTOCOLS
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[9.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400">
                    <th className="py-1 px-1">Protocol</th>
                    <th className="py-1 px-1 text-right">TVL</th>
                    <th className="py-1 px-1 text-right">Fee 24h</th>
                    <th className="py-1 px-1 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LIQUIDITY_POOLS.map((l) => (
                    <tr key={l.protocol} className="hover:bg-cyan-50/30">
                      <td className="py-1.5 px-1 font-black text-slate-800 truncate max-w-[110px]">{l.protocol}</td>
                      <td className="py-1.5 px-1 text-right font-black text-slate-800">{l.tvl}</td>
                      <td className="py-1.5 px-1 text-right font-black text-emerald-600">{l.fee24h}</td>
                      <td className="py-1.5 px-1 text-center">
                        <span className="inline-block px-1.5 py-0.2 rounded text-[7px] font-black bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
            <span>DEFI TVL: $53.05M</span>
            <span className="text-cyan-700 font-bold">DELTA-HEDGED</span>
          </div>
        </div>

        <div className={`${glassCard} flex flex-col justify-between overflow-hidden p-2.5 sm:p-3`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
              <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                VALIDATOR STAKE MONITOR
              </span>
              <span className="text-[8px] font-bold text-emerald-700 bg-emerald-500/10 px-1.5 py-0.2 rounded-full border border-emerald-500/20 font-mono">
                {VALIDATOR_NODES.length} NODES
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[9.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400">
                    <th className="py-1 px-1">Node</th>
                    <th className="py-1 px-1 text-right">Stake</th>
                    <th className="py-1 px-1 text-right">Uptime</th>
                    <th className="py-1 px-1 text-right">Rewards 24h</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {VALIDATOR_NODES.map((n) => (
                    <tr key={n.nodeId} className="hover:bg-slate-50">
                      <td className="py-1.5 px-1 font-black text-slate-800">{n.nodeId}</td>
                      <td className="py-1.5 px-1 text-right text-slate-700 font-bold">{n.stakedAmount}</td>
                      <td className="py-1.5 px-1 text-right font-extrabold text-indigo-600">{n.uptime}</td>
                      <td className="py-1.5 px-1 text-right font-black text-emerald-600">{n.rewards24h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1">
            <span>STAKE: $38.4M</span>
            <span className="text-emerald-600 font-bold">SLASHING RISK 0%</span>
          </div>
        </div>
      </section>
    </div>
  );
};
