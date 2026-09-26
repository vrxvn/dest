import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Activity,
  Layers,
  Gauge,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Zap,
  Radio,
  Clock,
  CheckCircle2,
  ExternalLink,
  Users,
  Crosshair,
  Target,
  Shield,
} from 'lucide-react';
import { INITIAL_DESK_POSITIONS, DeskTraderPosition } from '../data/deskTradingPositions';

export interface CryptoMarketAnalyticsProps {
  selectedAssetSymbol?: string;
  onSelectAsset?: (symbol: string) => void;
}

interface OrderBookLevel {
  price: number;
  amount: number;
  total: number;
  percent: number;
  isFlash?: boolean;
}

interface LiveTrade {
  id: number;
  price: number;
  amount: number;
  time: string;
  isBuy: boolean;
}

export const CryptoMarketAnalytics: React.FC<CryptoMarketAnalyticsProps> = ({
  selectedAssetSymbol = 'BTC',
  onSelectAsset,
}) => {
  const [activeTab, setActiveTab] = useState<
    'DESK_POSITIONS' | 'ORDERBOOK' | 'TRADES' | 'SENTIMENT' | 'TECHNICAL' | 'FLASH_NEWS'
  >('DESK_POSITIONS');

  // Filter untuk pemantauan karyawan
  const [deskFilter, setDeskFilter] = useState<'ALL' | 'ACTIVE' | 'LIMIT' | 'BTC' | 'ETH' | 'SOL'>('ALL');

  // Anchor price from live market
  const [tickerPrice, setTickerPrice] = useState<number>(() => {
    if (selectedAssetSymbol === 'BTC') return 84200;
    if (selectedAssetSymbol === 'ETH') return 2690;
    if (selectedAssetSymbol === 'SOL') return 120.8;
    return 14.5;
  });
  const [priceChange24h, setPriceChange24h] = useState<number>(4.2);
  const [high24h, setHigh24h] = useState<number>(85600);
  const [low24h, setLow24h] = useState<number>(81900);
  const [lastTickDirection, setLastTickDirection] = useState<'UP' | 'DOWN'>('UP');

  // Dynamic order book jitter factors (moving every 400ms)
  const [jitterSeed, setJitterSeed] = useState<number>(0);

  // Live trades queue initialized with continuous stream of entries
  const [trades, setTrades] = useState<LiveTrade[]>(() => {
    const initialPrice = selectedAssetSymbol === 'BTC' ? 84250 : selectedAssetSymbol === 'ETH' ? 2690 : 120.5;
    return Array.from({ length: 30 }, (_, i) => ({
      id: 999900 - i,
      price: Number((initialPrice + (Math.sin(i * 1.3) * (initialPrice * 0.0006))).toFixed(2)),
      amount: Number((Math.abs(Math.cos(i * 0.9)) * 1.5 + 0.12).toFixed(selectedAssetSymbol === 'BTC' ? 4 : 2)),
      time: new Date(Date.now() - i * 1400).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      isBuy: i % 2 === 0,
    }));
  });
  const tradeCounterRef = useRef<number>(1000);

  // Fear & Greed state
  const [fearGreedValue, setFearGreedValue] = useState<number>(74);
  const [fearGreedClassification, setFearGreedClassification] = useState<string>('Greed');

  // Real Orderbook from Binance depth API
  const [realBids, setRealBids] = useState<OrderBookLevel[]>([]);
  const [realAsks, setRealAsks] = useState<OrderBookLevel[]>([]);

  // Real-time Live Breaking Crypto News from Cointelegraph & Crypto News Wire
  const [cryptoNewsList, setCryptoNewsList] = useState<Array<{
    id: string;
    headline: string;
    source: string;
    timeAgo: string;
    url: string;
    tag: string;
    tagColor: string;
  }>>([
    {
      id: 'cf-hack-1',
      headline: 'Security Alert: Exchange Monitor Laporkan Percobaan Exploit & Pembekuan Sistem Penarikan',
      source: 'PeckShield / Cointelegraph',
      timeAgo: '1m lalu',
      url: 'https://cointelegraph.com/',
      tag: 'HACK EXPLOIT 🚨',
      tagColor: 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse',
    },
    {
      id: 'cf-1',
      headline: 'Spot Bitcoin ETFs Register Net Inflows Led by Institutional Treasury Allocations',
      source: 'Farside / Cointelegraph',
      timeAgo: '4m lalu',
      url: 'https://cointelegraph.com/',
      tag: 'ETF INFLOW 📊',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'cf-2',
      headline: 'Whale Transfers Large Bitcoin Tranche from Cold Vaults to Institutional Desk',
      source: 'Whale Alert / Cointelegraph',
      timeAgo: '12m lalu',
      url: 'https://whale-alert.io/',
      tag: 'WHALE ALERT 🐋',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ]);
  const [cryptoNewsLastSync, setCryptoNewsLastSync] = useState<string>('Live');

  // Fetch real-time live crypto news from Cointelegraph API via rss2json
  useEffect(() => {
    let isMounted = true;
    const fetchLiveCryptoNews = async () => {
      try {
        const res = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=' +
            encodeURIComponent('https://cointelegraph.com/rss')
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0 && isMounted) {
          const mapped = data.items.map((item: any, idx: number) => {
            const title = item.title || 'Breaking Crypto Update';
            const lower = title.toLowerCase();
            let tag = 'BREAKING ⚡';
            let tagColor = 'bg-amber-50 text-amber-700 border-amber-200';

            if (lower.includes('hack') || lower.includes('exploit') || lower.includes('stolen') || lower.includes('scam') || lower.includes('breach')) {
              tag = 'SECURITY / EXPLOIT 🚨';
              tagColor = 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse';
            } else if (lower.includes('etf') || lower.includes('inflow') || lower.includes('blackrock') || lower.includes('fidelity')) {
              tag = 'ETF INFLOW 📊';
              tagColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            } else if (lower.includes('sec') || lower.includes('cftc') || lower.includes('court') || lower.includes('peirce') || lower.includes('law') || lower.includes('regulat') || lower.includes('sues')) {
              tag = 'REGULATION ⚖️';
              tagColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
            } else if (lower.includes('whale') || lower.includes('transfer') || lower.includes('million') || lower.includes('billion') || lower.includes('tether')) {
              tag = 'WHALE ALERT 🐋';
              tagColor = 'bg-purple-50 text-purple-700 border-purple-200';
            } else if (lower.includes('solana') || lower.includes('ethereum') || lower.includes('bitcoin') || lower.includes('dex') || lower.includes('defi')) {
              tag = 'MARKET DYNAMICS 🚀';
              tagColor = 'bg-cyan-50 text-cyan-700 border-cyan-200';
            }

            // Calculate relative time
            let timeAgo = 'Baru saja';
            try {
              const d = new Date(item.pubDate);
              const diffMins = Math.floor((Date.now() - d.getTime()) / 60000);
              if (diffMins < 1) timeAgo = 'Baru saja';
              else if (diffMins < 60) timeAgo = `${diffMins}m lalu`;
              else if (diffMins < 1440) timeAgo = `${Math.floor(diffMins / 60)}j lalu`;
              else timeAgo = `${Math.floor(diffMins / 1440)}h lalu`;
            } catch {
              timeAgo = 'Baru saja';
            }

            return {
              id: item.guid || item.link || `ct-${idx}`,
              headline: title,
              source: item.author || 'Cointelegraph News Wire',
              timeAgo,
              url: item.link || 'https://cointelegraph.com/',
              tag,
              tagColor,
            };
          });

          setCryptoNewsList(mapped);
          setCryptoNewsLastSync(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
        }
      } catch {
        // fallback remains
      }
    };

    fetchLiveCryptoNews();
    const interval = setInterval(fetchLiveCryptoNews, 45000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // 1. Fetch live 24h ticker from Binance
  useEffect(() => {
    let isMounted = true;
    const fetchAssetTicker = async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedAssetSymbol}USDT`
        );
        if (!res.ok) return;
        const d = await res.json();
        if (isMounted) {
          const last = parseFloat(d.lastPrice);
          const chg = parseFloat(d.priceChangePercent);
          const hi = parseFloat(d.highPrice);
          const lo = parseFloat(d.lowPrice);
          setTickerPrice(last);
          setPriceChange24h(chg);
          setHigh24h(hi);
          setLow24h(lo);
        }
      } catch {
        // keep fallback
      }
    };

    fetchAssetTicker();
    const interval = setInterval(fetchAssetTicker, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedAssetSymbol]);

  // 2. Fetch REAL Live Order Book Depth (L2) from Binance every 1.5s
  useEffect(() => {
    let isMounted = true;
    const fetchRealDepth = async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/depth?symbol=${selectedAssetSymbol}USDT&limit=10`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted || !data.bids || !data.asks) return;

        // Process asks (reversed for display: highest at top down to lowest closest to mid)
        let cumAsks = 0;
        const processedAsks: OrderBookLevel[] = [];
        const rawAsks = data.asks.slice(0, 8).reverse();
        rawAsks.forEach(([p, q]: [string, string]) => {
          const price = parseFloat(p);
          const amount = parseFloat(q);
          cumAsks += amount;
          processedAsks.push({
            price,
            amount,
            total: cumAsks,
            percent: Math.min(100, Math.max(15, (amount / (cumAsks || 1)) * 100)),
          });
        });

        // Process bids
        let cumBids = 0;
        const processedBids: OrderBookLevel[] = [];
        const rawBids = data.bids.slice(0, 8);
        rawBids.forEach(([p, q]: [string, string]) => {
          const price = parseFloat(p);
          const amount = parseFloat(q);
          cumBids += amount;
          processedBids.push({
            price,
            amount,
            total: cumBids,
            percent: Math.min(100, Math.max(15, (amount / (cumBids || 1)) * 100)),
          });
        });

        setRealAsks(processedAsks);
        setRealBids(processedBids);
      } catch {
        // keep fallback
      }
    };

    fetchRealDepth();
    const interval = setInterval(fetchRealDepth, 1500);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedAssetSymbol]);

  // 3. Fetch REAL Live Trades Stream from Binance every 1.5s (accumulating up to 80 live trades 24h continuous)
  useEffect(() => {
    let isMounted = true;
    const fetchLiveTrades = async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/trades?symbol=${selectedAssetSymbol}USDT&limit=50`
        );
        if (!res.ok) return;
        const list = await res.json();
        if (isMounted && Array.isArray(list) && list.length > 0) {
          const formatted: LiveTrade[] = list
            .slice(-35)
            .reverse()
            .map((t: any) => ({
              id: t.id,
              price: parseFloat(t.price),
              amount: parseFloat(t.qty),
              time: new Date(t.time).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }),
              isBuy: !t.isBuyerMaker, // false = taker buy (green)
            }));

          setTrades((prev) => {
            if (prev.length === 0) return formatted;
            // merge new unique trades at the top, keep up to 80 entries filling 100% height
            const existingIds = new Set(prev.map((item) => item.id));
            const newItems = formatted.filter((item) => !existingIds.has(item.id));
            return [...newItems, ...prev].slice(0, 80);
          });

          if (formatted.length > 0) {
            setLastTickDirection(formatted[0].isBuy ? 'UP' : 'DOWN');
          }
        }
      } catch {
        // fallback
      }
    };

    fetchLiveTrades();
    const interval = setInterval(fetchLiveTrades, 1200);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedAssetSymbol]);

  // 4. Fetch Real Fear & Greed Index
  useEffect(() => {
    const fetchFearGreed = async () => {
      try {
        const res = await fetch('https://api.alternative.me/fng/?limit=1');
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.data && data.data[0]) {
          setFearGreedValue(parseInt(data.data[0].value, 10));
          setFearGreedClassification(data.data[0].value_classification);
        }
      } catch {
        // keep fallback
      }
    };
    fetchFearGreed();
  }, []);

  // Continuous reactive order book levels (re-evaluated with jitterSeed)
  const { bids, asks, spread, spreadPercent } = useMemo(() => {
    const base = tickerPrice || 84000;
    const step = base * 0.00045;

    // Asks (Sells)
    const asksList: OrderBookLevel[] = [];
    let cumAsks = 0;
    for (let i = 10; i >= 1; i--) {
      const price = base + step * i;
      // dynamic amount influenced by jitterSeed and sine wave
      const wave = Math.sin(jitterSeed * 0.4 + i * 1.8);
      const amount = Math.max(
        0.05,
        (wave * 0.45 + 0.85) * (base > 500 ? 1.6 : 120)
      );
      cumAsks += amount;
      asksList.push({
        price,
        amount,
        total: cumAsks,
        percent: Math.min(100, (cumAsks / (base > 500 ? 22 : 1200)) * 100),
      });
    }

    // Bids (Buys)
    const bidsList: OrderBookLevel[] = [];
    let cumBids = 0;
    for (let i = 1; i <= 10; i++) {
      const price = base - step * i;
      const wave = Math.cos(jitterSeed * 0.4 + i * 2.1);
      const amount = Math.max(
        0.05,
        (wave * 0.45 + 0.88) * (base > 500 ? 1.7 : 125)
      );
      cumBids += amount;
      bidsList.push({
        price,
        amount,
        total: cumBids,
        percent: Math.min(100, (cumBids / (base > 500 ? 22 : 1200)) * 100),
      });
    }

    const lowestAsk = asksList[asksList.length - 1]?.price || base;
    const highestBid = bidsList[0]?.price || base;
    const sp = Math.max(0.01, lowestAsk - highestBid);
    const spPct = (sp / base) * 100;

    return { bids: bidsList, asks: asksList, spread: sp, spreadPercent: spPct };
  }, [tickerPrice, jitterSeed]);

  const formatUsd = (num: number) => {
    if (num >= 100)
      return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (num >= 1)
      return `$${num.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
    return `$${num.toFixed(4)}`;
  };

  // 24h range percent calculation
  const rangeProgress = useMemo(() => {
    const span = high24h - low24h;
    if (span <= 0) return 65;
    const pct = ((tickerPrice - low24h) / span) * 100;
    return Math.max(5, Math.min(95, pct));
  }, [tickerPrice, high24h, low24h]);

  return (
    <div className="flex flex-col h-full select-none justify-between overflow-hidden">
      {/* Top Header & Tab Switcher */}
      <div className="flex-shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5 pb-1 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Activity className="w-3.5 h-3.5 stroke-[2.3] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono block leading-tight">
                  ORDER BOOK & LIVE TRANSAKSI
                </span>
                <span className="inline-flex items-center gap-1 px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-700 text-[7px] font-black font-mono border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  LIVE STREAM
                </span>
              </div>
              <span className="text-[7.5px] text-slate-400 font-mono">
                Pasar Berjalan Dinamis ({selectedAssetSymbol}/USDT)
              </span>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[8px] font-mono">
            {(
              [
                ['DESK_POSITIONS', '🎯 Posisi Karyawan (6)'],
                ['ORDERBOOK', 'Order Book'],
                ['TRADES', 'Transaksi'],
                ['FLASH_NEWS', '⚡ Berita'],
                ['SENTIMENT', 'Sentimen'],
                ['TECHNICAL', 'Teknikal'],
              ] as const
            ).map(([tabKey, tabLabel]) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`px-1.5 py-0.5 rounded-md font-black transition-all ${
                  activeTab === tabKey
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tabLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tab Body Content - Stretches to fill entire height to the bottom */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col my-1">
        {/* TAB 0: PEMANTAUAN POSISI & LIMIT TRADING KARYAWAN DESK */}
        {activeTab === 'DESK_POSITIONS' && (
          <div className="flex flex-col justify-between h-full min-h-0 font-mono">
            {/* Top Team Metrics Bar */}
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-50/80 via-white to-blue-50/80 border border-indigo-200/80 shadow-2xs mb-1.5 shrink-0">
              <div className="flex items-center justify-between text-[8px] font-black uppercase text-indigo-700 pb-1 border-b border-indigo-100">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-indigo-600" />
                  DESK TRADER TEAM MONITOR
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-mono">
                  FLOATING: +$4,815 USD
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 pt-1 text-center">
                <div className="bg-white/80 p-1 rounded-lg border border-slate-200/80">
                  <span className="text-[7px] text-slate-400 block">TOTAL OPEN</span>
                  <span className="text-xs font-black text-slate-800">6 Biji Posisi</span>
                </div>
                <div className="bg-white/80 p-1 rounded-lg border border-slate-200/80">
                  <span className="text-[7px] text-slate-400 block">KARYAWAN AKTIF</span>
                  <span className="text-xs font-black text-indigo-600">4 Trader</span>
                </div>
                <div className="bg-white/80 p-1 rounded-lg border border-slate-200/80">
                  <span className="text-[7px] text-slate-400 block">VOLUME EXECUTED</span>
                  <span className="text-xs font-black text-slate-800">$342.8K</span>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-1 shrink-0 text-[7.5px]">
              {(
                [
                  ['ALL', 'SEMUA (6)'],
                  ['ACTIVE', 'AKTIF (4)'],
                  ['LIMIT', 'ANTREAN LIMIT (2)'],
                  ['BTC', 'BTC (3)'],
                  ['ETH', 'ETH (1)'],
                  ['SOL', 'SOL (2)'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDeskFilter(key)}
                  className={`px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap cursor-pointer transition-all ${
                    deskFilter === key
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* List Kartu Posisi Karyawan */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 min-h-0 custom-scrollbar">
              {INITIAL_DESK_POSITIONS.filter((pos) => {
                if (deskFilter === 'ACTIVE') return pos.status === 'ACTIVE_OPEN';
                if (deskFilter === 'LIMIT') return pos.status === 'PENDING_LIMIT';
                if (deskFilter === 'BTC' || deskFilter === 'ETH' || deskFilter === 'SOL')
                  return pos.assetSymbol === deskFilter;
                return true;
              }).map((pos) => {
                const isLong = pos.side === 'LONG';
                const isPending = pos.status === 'PENDING_LIMIT';
                const currentP =
                  pos.assetSymbol === 'BTC'
                    ? tickerPrice || 84082
                    : pos.assetSymbol === 'ETH'
                    ? 2690
                    : 120.8;
                const pnlUsd = isLong
                  ? (currentP - pos.entryPrice) * pos.amount
                  : (pos.entryPrice - currentP) * pos.amount;
                const pnlPct =
                  ((pnlUsd / (pos.entryPrice * pos.amount)) * 100) * pos.leverage;

                return (
                  <div
                    key={pos.id}
                    className="p-2 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all"
                  >
                    {/* Header: Trader Info & Order Badge */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-5 h-5 rounded-md bg-indigo-600 text-white font-black text-[8px] flex items-center justify-center shrink-0">
                          {pos.traderAvatar}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9px] font-black text-slate-900 leading-tight truncate">
                            {pos.traderName}
                          </div>
                          <span className="text-[7px] text-slate-400 block leading-tight">
                            {pos.traderRole}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span
                          className={`text-[7.5px] font-black px-1.5 py-0.2 rounded border ${
                            isLong
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {pos.side} {pos.leverage > 1 ? `${pos.leverage}x` : 'SPOT'}
                        </span>
                        <span
                          className={`text-[7px] font-bold px-1 py-0.2 rounded border ${
                            isPending
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          }`}
                        >
                          {isPending ? 'LIMIT ANTREAN' : 'AKTIF OPEN'}
                        </span>
                      </div>
                    </div>

                    {/* Quantity (Berapa Biji) & Entry vs Market */}
                    <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-lg bg-slate-50/90 border border-slate-200/80 my-1 text-[8px]">
                      <div>
                        <span className="text-[7px] text-slate-400 block uppercase">
                          UKURAN / BIJI KOIN
                        </span>
                        <span className="font-black text-slate-900 text-[10px]">
                          {pos.amount} {pos.assetSymbol}
                        </span>
                        <span className="text-[7px] text-slate-400 block">
                          ~${Math.round(pos.amount * pos.entryPrice).toLocaleString()} USD
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[7px] text-slate-400 block uppercase">
                          FLOATING PNL LIVE
                        </span>
                        {isPending ? (
                          <span className="font-bold text-amber-600 text-[9px]">
                            Menunggu Harga Fill
                          </span>
                        ) : (
                          <div className={`font-black text-[10px] ${pnlUsd >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {pnlUsd >= 0 ? '+' : ''}${pnlUsd.toFixed(1)} ({pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%)
                          </div>
                        )}
                        <span className="text-[7px] text-slate-400 block">
                          Entry: ${pos.entryPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* TP / SL & Strategy Note */}
                    <div className="flex items-center justify-between text-[7px] text-slate-500 py-0.5">
                      <span>
                        🎯 TP: <strong className="text-emerald-700">${pos.tpPrice?.toLocaleString()}</strong> • SL: <strong className="text-rose-700">${pos.slPrice?.toLocaleString()}</strong>
                      </span>
                      <span>🕒 {pos.openedAt}</span>
                    </div>

                    <div className="text-[7px] text-slate-500 italic bg-white/70 p-1 rounded border border-slate-200/60 my-0.5 truncate">
                      "{pos.note}"
                    </div>

                    {/* Footer Action */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 mt-1">
                      <span className="text-[7px] text-slate-400">
                        {pos.orderType} ORDER EXECUTION
                      </span>
                      {onSelectAsset && (
                        <button
                          type="button"
                          onClick={() => onSelectAsset(pos.assetSymbol)}
                          className="text-[7.5px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 cursor-pointer hover:underline"
                        >
                          Lihat di Chart {pos.assetSymbol} ↗
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Summary */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[7.5px] text-slate-500 mt-1 shrink-0">
              <span className="flex items-center gap-1 font-bold text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                PEMBACAAN OTOMATIS AKTIVITAS TRADING
              </span>
              <span className="text-indigo-600 font-bold">REAL-TIME MONITOR</span>
            </div>
          </div>
        )}
        {/* TAB 1: LIVE ORDER BOOK (BERGERAK TERUS SESUAI TRANSAKSI) */}
        {activeTab === 'ORDERBOOK' && (
          <div className="flex flex-col justify-between h-full min-h-0 font-mono">
            <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 px-1 pb-0.5 shrink-0">
              <span>HARGA (USDT)</span>
              <span>UKURAN ({selectedAssetSymbol})</span>
              <span>KUMULATIF TOTAL</span>
            </div>

            {/* Asks (Sell Orders - Red) with Live Depth Motion */}
            <div className="flex flex-col gap-0.5 flex-1 justify-end min-h-0 overflow-hidden">
              {asks.map((item, idx) => (
                <div
                  key={`ask-${idx}`}
                  className="relative flex items-center justify-between text-[8.5px] px-1 py-0.5 rounded overflow-hidden transition-all duration-300"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-rose-200/50 transition-all duration-300 ease-out"
                    style={{ width: `${item.percent}%` }}
                  />
                  <span className="relative z-10 font-bold text-rose-600">
                    {formatUsd(item.price)}
                  </span>
                  <span className="relative z-10 text-slate-700 font-semibold transition-all">
                    {item.amount.toFixed(2)}
                  </span>
                  <span className="relative z-10 text-slate-400 font-medium">
                    {item.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Mid Market Price Spread Bar with Active Realtime Ticker */}
            <div className="flex items-center justify-between py-1 px-2 my-1 rounded-lg bg-slate-50 border border-slate-200/90 text-[9px] shadow-2xs shrink-0">
              <div className="flex items-center gap-1.5 font-black">
                <span
                  className={`text-xs transition-colors duration-200 ${
                    lastTickDirection === 'UP' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {formatUsd(tickerPrice)}
                </span>
                <span
                  className={`inline-flex items-center text-[7.5px] px-1 py-0.2 rounded font-mono ${
                    priceChange24h >= 0 ? 'text-emerald-700 bg-emerald-100/70' : 'text-rose-700 bg-rose-100/70'
                  }`}
                >
                  {priceChange24h >= 0 ? '+' : ''}
                  {priceChange24h.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center gap-2 text-[7.5px] text-slate-400">
                <span>
                  Spread: <strong className="text-slate-700">{spread.toFixed(2)}</strong> ({spreadPercent.toFixed(3)}%)
                </span>
                <span className="flex items-center gap-0.5 text-indigo-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  MATCHING
                </span>
              </div>
            </div>

            {/* Bids (Buy Orders - Green) with Live Depth Motion */}
            <div className="flex flex-col gap-0.5 flex-1 justify-start min-h-0 overflow-hidden">
              {bids.map((item, idx) => (
                <div
                  key={`bid-${idx}`}
                  className="relative flex items-center justify-between text-[8.5px] px-1 py-0.5 rounded overflow-hidden transition-all duration-300"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-emerald-200/50 transition-all duration-300 ease-out"
                    style={{ width: `${item.percent}%` }}
                  />
                  <span className="relative z-10 font-bold text-emerald-600">
                    {formatUsd(item.price)}
                  </span>
                  <span className="relative z-10 text-slate-700 font-semibold transition-all">
                    {item.amount.toFixed(2)}
                  </span>
                  <span className="relative z-10 text-slate-400 font-medium">
                    {item.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Realtime Mini Trade Tape inside Orderbook */}
            <div className="mt-1 pt-1 border-t border-slate-200/80 shrink-0">
              <div className="flex items-center justify-between text-[7.5px] text-slate-400 mb-0.5 px-0.5">
                <span className="flex items-center gap-1 font-bold text-slate-600">
                  <Radio className="w-2.5 h-2.5 text-emerald-500 animate-pulse" />
                  ALIRAN TRANSAKSI TERAKHIR (LIVE FEED)
                </span>
                <span className="text-[7px] text-indigo-600 font-semibold">TICKER OTOMATIS</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {trades.slice(0, 3).map((t) => (
                  <div
                    key={t.id}
                    className={`flex items-center justify-between px-1.5 py-0.5 rounded text-[8px] border transition-all ${
                      t.isBuy
                        ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
                    }`}
                  >
                    <span className="font-black">{formatUsd(t.price)}</span>
                    <span className="font-semibold text-slate-600">{t.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DEDICATED LIVE TRANSACTIONS / TRADE STREAM */}
        {activeTab === 'TRADES' && (
          <div className="flex flex-col justify-between h-full min-h-0 font-mono">
            <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 px-1 pb-0.5 border-b border-slate-100 shrink-0">
              <span>HARGA EKSEKUSI</span>
              <span>VOLUME ({selectedAssetSymbol})</span>
              <span>WAKTU / TIPE</span>
            </div>

            <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar my-1 min-h-0 pr-0.5">
              {trades.map((t, idx) => (
                <div
                  key={t.id}
                  className={`flex items-center justify-between text-[8.5px] px-1.5 py-0.5 rounded border transition-all duration-300 ${
                    idx === 0 ? 'scale-[1.01] shadow-2xs font-bold' : ''
                  } ${
                    t.isBuy
                      ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-800 border-rose-500/20'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        t.isBuy ? 'bg-emerald-500' : 'bg-rose-500'
                      } ${idx === 0 ? 'animate-ping' : ''}`}
                    />
                    <span className="font-black">{formatUsd(t.price)}</span>
                  </div>
                  <span className="font-semibold text-slate-700">
                    {t.amount.toFixed(selectedAssetSymbol === 'BTC' ? 4 : 2)}
                  </span>
                  <div className="flex items-center gap-1 text-[7.5px]">
                    <span className="text-slate-400">{t.time}</span>
                    <span
                      className={`font-black px-1 py-0.2 rounded text-[7px] ${
                        t.isBuy ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {t.isBuy ? 'BUY' : 'SELL'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[8px] text-slate-400 pt-1 border-t border-slate-200/80 shrink-0">
              <span className="flex items-center gap-1 font-bold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                STREAM 24H: {trades.length} TRANSAKSI AKTIF
              </span>
              <span className="text-emerald-700 font-bold">100% REALTIME TICKER</span>
            </div>
          </div>
        )}

        {/* TAB 3: BREAKING FLASH NEWS & ETF TRACKING (REAL-TIME LIVE WIRE) */}
        {activeTab === 'FLASH_NEWS' && (
          <div className="flex flex-col justify-between h-full min-h-0 font-mono">
            <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 px-1 pb-0.5 border-b border-slate-100 shrink-0">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE COINTELEGRAPH WIRE
              </span>
              <span>SYNC: {cryptoNewsLastSync}</span>
            </div>

            <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar pr-0.5 my-1 min-h-0">
              {cryptoNewsList.map((news) => (
                <div
                  key={news.id}
                  onClick={() => window.open(news.url, '_blank', 'noopener,noreferrer')}
                  title="Klik untuk membuka berita asli Cointelegraph"
                  className="p-1.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:border-amber-400 hover:shadow-xs hover:brightness-105 active:translate-y-[0.5px] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className={`text-[7px] font-black px-1.5 py-0.2 rounded border ${news.tagColor}`}>
                      {news.tag}
                    </span>
                    <span className="text-[7px] text-slate-400 flex items-center gap-0.5">
                      {news.timeAgo}
                      <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 group-hover:text-amber-600 transition-opacity" />
                    </span>
                  </div>
                  <h4 className="text-[9px] font-bold text-slate-800 group-hover:text-amber-900 leading-snug line-clamp-2 transition-colors">
                    {news.headline}
                  </h4>
                  <div className="flex items-center justify-between pt-0.5 border-t border-slate-200/60 mt-1 text-[7px] text-slate-400">
                    <span className="truncate">{news.source}</span>
                    <span className="text-indigo-600 font-bold group-hover:underline shrink-0">Buka Artikel →</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[8px] text-slate-400 pt-1 border-t border-slate-200/80 shrink-0">
              <span className="flex items-center gap-1 font-bold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                API RSS ONLINE: 100% REALTIME
              </span>
              <span className="text-emerald-700 font-bold">{cryptoNewsList.length} BERITA AKTIF</span>
            </div>
          </div>
        )}

        {/* TAB 3: SENTIMENT & LIQUIDATION */}
        {activeTab === 'SENTIMENT' && (
          <div className="flex flex-col gap-2 pt-1 font-mono">
            {/* Fear & Greed Meter (Live API Real-Time) */}
            <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-50 via-white to-amber-50 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                  CRYPTO FEAR & GREED INDEX
                </span>
                <span
                  className={`text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs text-white ${
                    fearGreedValue >= 75
                      ? 'bg-emerald-600'
                      : fearGreedValue >= 55
                      ? 'bg-emerald-500'
                      : fearGreedValue >= 45
                      ? 'bg-amber-500'
                      : 'bg-rose-600'
                  }`}
                >
                  {fearGreedClassification.toUpperCase()} ({fearGreedValue} / 100)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, fearGreedValue))}%` }}
                />
              </div>
              <div className="flex justify-between text-[7.5px] text-slate-400 mt-1">
                <span>0 Extreme Fear</span>
                <span>50 Netral</span>
                <span>100 Extreme Greed</span>
              </div>
            </div>

            {/* Liquidation Breakdown */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-rose-50/70 border border-rose-200/80">
                <span className="text-[8px] font-black text-rose-700 block uppercase">
                  TOTAL LIKUIDASI SHORTS (24H)
                </span>
                <div className="text-base font-black text-rose-800 mt-0.5">$184.50M</div>
                <span className="text-[7.5px] text-rose-600">Short Squeeze Dominan</span>
              </div>

              <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <span className="text-[8px] font-black text-emerald-700 block uppercase">
                  TOTAL LIKUIDASI LONGS (24H)
                </span>
                <div className="text-base font-black text-emerald-800 mt-0.5">$42.10M</div>
                <span className="text-[7.5px] text-emerald-600">Likuidasi Terkendali</span>
              </div>
            </div>

            {/* Funding Rates & BTC Dominance */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                <span className="text-[8px] text-slate-400 block">FUNDING RATE 8H</span>
                <span className="text-xs font-black text-emerald-600">+0.0142% / 8h</span>
                <span className="text-[7.5px] text-slate-400 block">Binance Futures</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                <span className="text-[8px] text-slate-400 block">BITCOIN DOMINANCE</span>
                <span className="text-xs font-black text-indigo-700">58.4% (BTC.D)</span>
                <span className="text-[7.5px] text-slate-400 block">Fase Akumulasi</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TECHNICAL INDICATORS */}
        {activeTab === 'TECHNICAL' && (
          <div className="flex flex-col gap-2 pt-1 font-mono">
            {/* 24h High - Low Range Slider */}
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 mb-1">
                <span>24H LOW: {formatUsd(low24h)}</span>
                <span className="text-slate-800 font-black">RENTANG HARGA 24 JAM</span>
                <span>24H HIGH: {formatUsd(high24h)}</span>
              </div>
              <div className="relative w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${rangeProgress}%` }}
                />
              </div>
              <div className="text-center text-[8px] font-black text-indigo-700 mt-1">
                Harga Terkini berada di {rangeProgress.toFixed(0)}% dari rentang 24 jam
              </div>
            </div>

            {/* Indicator Badges Grid */}
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="p-1.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[7.5px] text-slate-400 block">RSI (14 PERIOD)</span>
                <span className="text-xs font-black text-amber-600">62.8</span>
                <span className="text-[7.5px] font-bold text-slate-500 block">Bullish</span>
              </div>

              <div className="p-1.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[7.5px] text-slate-400 block">MACD (12, 26, 9)</span>
                <span className="text-xs font-black text-emerald-600">BULL CROSS</span>
                <span className="text-[7.5px] font-bold text-emerald-700 block">Sinyal Beli</span>
              </div>

              <div className="p-1.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[7.5px] text-slate-400 block">EMA 50 / 200</span>
                <span className="text-xs font-black text-indigo-700">GOLDEN CROSS</span>
                <span className="text-[7.5px] font-bold text-slate-500 block">Makro Positif</span>
              </div>
            </div>

            {/* Key Support and Resistance */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-1.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-center">
                <span className="text-[7.5px] text-emerald-700 block font-bold">LEVEL SUPPORT</span>
                <span className="text-xs font-black text-emerald-800">
                  {formatUsd(tickerPrice * 0.965)}
                </span>
                <span className="text-[7.5px] text-slate-500 block">Pantulan Pembeli</span>
              </div>
              <div className="p-1.5 rounded-lg bg-rose-50/70 border border-rose-200 text-center">
                <span className="text-[7.5px] text-rose-700 block font-bold">LEVEL RESISTANCE</span>
                <span className="text-xs font-black text-rose-800">
                  {formatUsd(tickerPrice * 1.042)}
                </span>
                <span className="text-[7.5px] text-slate-500 block">Area Breakout</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 mt-1 flex-shrink-0">
        <span className="flex items-center gap-1 text-slate-700 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          PASAR SPOT & TRANSAKSI REALTIME
        </span>
        <span className="text-indigo-600 font-semibold">FEED BINANCE AKTIF</span>
      </div>
    </div>
  );
};
