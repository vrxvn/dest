import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Users,
  Activity,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Clock,
  Filter,
  Eye,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BarChart2,
  RefreshCw,
  Search,
  Radio,
  Zap,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  SlidersHorizontal,
  Lock,
  Pause,
  ShieldAlert,
} from 'lucide-react';
import {
  TRADER_EMPLOYEES,
  ALL_EMPLOYEE_POSITIONS,
  ALL_EMPLOYEE_PENDING_ORDERS,
  ALL_EMPLOYEE_TRADE_HISTORY,
  generateCandleData,
  type TraderEmployee,
  type EmployeePosition,
  type EmployeePendingOrder,
  type EmployeeTradeHistory,
  type CandleData,
} from '../data/dummy/tradingSurveillanceData';

export const TradingOperations: React.FC = () => {
  // Filter trader yang sedang dipantau (null = Semua Karyawan)
  const [selectedTraderId, setSelectedTraderId] = useState<string | null>(null);

  // Tab di tabel bawah: 'OPEN_POSITIONS' | 'PENDING_ORDERS' | 'HISTORY'
  const [activeTab, setActiveTab] = useState<'OPEN_POSITIONS' | 'PENDING_ORDERS' | 'HISTORY'>('OPEN_POSITIONS');

  // Pilihan instrumen trading di chart
  const [selectedInstrument, setSelectedInstrument] = useState<string>('BTC/USDT');

  // Time frame chart
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1M' | '5M' | '15M' | '1H' | '1D'>('15M');

  // Mode tampilan grafik (Candlestick vs Line Area)
  const [chartMode, setChartMode] = useState<'CANDLE' | 'LINE'>('CANDLE');

  // Mode layar lebar / maksimalkan lebar chart (100% Full Width)
  const [isWideChart, setIsWideChart] = useState<boolean>(false);

  // Kontrol Tinggi Fisik Kontainer Chart: 'COMPACT' (380px) | 'MEDIUM' (490px) | 'TALL' (590px) | 'MAX' (Full flex)
  const [chartHeightMode, setChartHeightMode] = useState<'COMPACT' | 'MEDIUM' | 'TALL' | 'MAX'>('MEDIUM');

  // Kontrol Zoom Skala Vertikal Lilin (Bisa ditinggikan / direndahkan seperti TradingView)
  const [verticalZoom, setVerticalZoom] = useState<number>(1.0);

  // Hover state lilin untuk menampilkan OHLC layaknya chart TradingView
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);

  // Hover state pada posisi untuk menyorot garis di chart
  const [hoveredPositionId, setHoveredPositionId] = useState<string | null>(null);

  // Koordinat mouse untuk Crosshair garis kursor
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number } | null>(null);

  // 3D Solid Ceramic Glass aesthetic konsisten dengan tema aplikasi
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  // State harga pasar real-time untuk semua 6 instrumen
  const [livePrices, setLivePrices] = useState<
    Record<string, { price: number; change24h: number; direction: 'UP' | 'DOWN'; lastTickTime: number }>
  >({
    'BTC/USDT': { price: 84082.0, change24h: 1.85, direction: 'UP', lastTickTime: Date.now() },
    'XAU/USD': { price: 2845.2, change24h: 0.94, direction: 'UP', lastTickTime: Date.now() },
    'EUR/USD': { price: 1.0842, change24h: -0.18, direction: 'DOWN', lastTickTime: Date.now() },
    'ETH/USDT': { price: 2690.0, change24h: 2.12, direction: 'UP', lastTickTime: Date.now() },
    'USD/JPY': { price: 154.65, change24h: -0.32, direction: 'DOWN', lastTickTime: Date.now() },
    NVDA: { price: 131.75, change24h: 1.45, direction: 'UP', lastTickTime: Date.now() },
  });

  // State candlestick aktif yang bergerak real-time (36 batang untuk bidang pandang lebar)
  const [candles, setCandles] = useState<CandleData[]>(() => {
    return generateCandleData(84082.0, 36);
  });

  // Indikator sinkronisasi real-time - DIHENTIKAN & DIKUNCI
  const [lastSyncStr] = useState<string>('DIHENTIKAN (FROZEN)');
  const [tickCounter] = useState<number>(0);

  // 1. Fetch static candles untuk instrumen terpilih
  const fetchCandlesForInstrument = useCallback(async (sym: string, tf: string) => {
    if (sym === 'BTC/USDT' || sym === 'ETH/USDT') {
      try {
        const binanceSym = sym.replace('/', '');
        const tfMap: Record<string, string> = {
          '1M': '1m',
          '5M': '5m',
          '15M': '15m',
          '1H': '1h',
          '1D': '1d',
        };
        const interval = tfMap[tf] || '15m';
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${binanceSym}&interval=${interval}&limit=36`
        );
        if (res.ok) {
          const raw = await res.json();
          if (Array.isArray(raw) && raw.length > 0) {
            const mapped: CandleData[] = raw.map((k: any) => ({
              time: new Date(k[0]).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              open: parseFloat(k[1]),
              high: parseFloat(k[2]),
              low: parseFloat(k[3]),
              close: parseFloat(k[4]),
              volume: Math.round(parseFloat(k[5])),
            }));
            setCandles(mapped);
            return;
          }
        }
      } catch {
        // Fallback to local live generator
      }
    }

    // Default generator untuk instrumen lainnya (Gold, Forex, Equities)
    const base = livePrices[sym]?.price || 2845.2;
    setCandles(generateCandleData(base, 36));
  }, [livePrices]);

  // Efek ganti instrumen atau timeframe
  useEffect(() => {
    fetchCandlesForInstrument(selectedInstrument, selectedTimeframe);
  }, [selectedInstrument, selectedTimeframe, fetchCandlesForInstrument]);

  // 2. Real-Time Price Poller & Tick Stream - TELAH DIHENTIKAN & DIKUNCI
  useEffect(() => {
    // Sesi trading telah dihentikan (HALTED) sesuai protokol kepatuhan
  }, [selectedInstrument]);

  // 3. Kalkulasi Real-Time Posisi Karyawan berdasarkan Live Market Price
  const livePositions: EmployeePosition[] = useMemo(() => {
    return ALL_EMPLOYEE_POSITIONS.map((pos) => {
      const currentLive = livePrices[pos.instrument]?.price || pos.entryPrice;
      const isBuy = pos.direction === 'BUY';

      // Multiplier lot tergantung instrumen
      let multiplier = 1;
      if (pos.instrument.includes('BTC')) multiplier = 1;
      else if (pos.instrument.includes('ETH')) multiplier = 1;
      else if (pos.instrument.includes('XAU')) multiplier = 100; // 100 oz per lot emas
      else if (pos.instrument.includes('EUR') || pos.instrument.includes('JPY') || pos.instrument.includes('GBP'))
        multiplier = 100000; // 100K unit forex
      else multiplier = 100; // Saham

      let rawPnl = 0;
      if (isBuy) {
        if (pos.instrument.includes('EUR') || pos.instrument.includes('JPY')) {
          rawPnl = (currentLive - pos.entryPrice) * pos.lots * 10000;
        } else {
          rawPnl = (currentLive - pos.entryPrice) * pos.lots * (multiplier > 1 ? multiplier * 0.1 : 1);
        }
      } else {
        if (pos.instrument.includes('EUR') || pos.instrument.includes('JPY')) {
          rawPnl = (pos.entryPrice - currentLive) * pos.lots * 10000;
        } else {
          rawPnl = (pos.entryPrice - currentLive) * pos.lots * (multiplier > 1 ? multiplier * 0.1 : 1);
        }
      }

      // Nilai floating yang realistis
      const finalPnl = Math.round(rawPnl);
      const isProfit = finalPnl >= 0;
      const pnlStr = `${isProfit ? '+' : '-'}$${Math.abs(finalPnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      const pnlPct = `${isProfit ? '+' : ''}${((finalPnl / 150000) * 100).toFixed(2)}%`;

      return {
        ...pos,
        currentPrice: currentLive,
        floatingPnl: finalPnl,
        floatingPnlStr: pnlStr,
        floatingPnlPercent: pnlPct,
        isProfit,
      };
    });
  }, [livePrices]);

  // Posisi yang difilter berdasarkan karyawan yang dipilih
  const filteredPositions = useMemo(() => {
    if (!selectedTraderId) return livePositions;
    return livePositions.filter((p) => p.traderId === selectedTraderId);
  }, [selectedTraderId, livePositions]);

  // Order pending yang difilter
  const filteredPendingOrders = useMemo(() => {
    if (!selectedTraderId) return ALL_EMPLOYEE_PENDING_ORDERS;
    return ALL_EMPLOYEE_PENDING_ORDERS.filter((o) => o.traderId === selectedTraderId);
  }, [selectedTraderId]);

  // Riwayat transaksi yang difilter
  const filteredHistory = useMemo(() => {
    if (!selectedTraderId) return ALL_EMPLOYEE_TRADE_HISTORY;
    return ALL_EMPLOYEE_TRADE_HISTORY.filter((h) => h.traderId === selectedTraderId);
  }, [selectedTraderId]);

  // Posisi karyawan yang relevan dengan instrumen yang sedang dilihat di chart
  const chartPositions = useMemo(() => {
    return filteredPositions.filter((p) => p.instrument === selectedInstrument);
  }, [filteredPositions, selectedInstrument]);

  // Trader aktif terpilih
  const selectedTrader = useMemo(() => {
    if (!selectedTraderId) return null;
    return TRADER_EMPLOYEES.find((t) => t.id === selectedTraderId) || null;
  }, [selectedTraderId]);

  // Total Floating PnL Tim Real-Time
  const totalFloatingPnl = useMemo(() => {
    return livePositions.reduce((acc, p) => acc + p.floatingPnl, 0);
  }, [livePositions]);

  const totalOpenPositionsCount = livePositions.length;
  const activeTradersCount = TRADER_EMPLOYEES.filter((t) => t.status === 'IN_TRADE').length;
  const currentInstrumentLive = livePrices[selectedInstrument]?.price || 84082.0;
  const currentInstrumentDir = livePrices[selectedInstrument]?.direction || 'UP';

  // Lilin aktif paling mutakhir untuk display OHLC default
  const activeLatestCandle = candles[candles.length - 1] || {
    open: currentInstrumentLive,
    high: currentInstrumentLive,
    low: currentInstrumentLive,
    close: currentInstrumentLive,
    volume: 85,
    time: 'Live',
  };
  const displayCandle = hoveredCandle || activeLatestCandle;

  // Skala harga chart untuk SVG dengan dukungan Zoom Vertikal (Tinggi / Rendah)
  const { minPrice, maxPrice, priceRange, scaledMin, scaledMax, scaledRange } = useMemo(() => {
    if (candles.length === 0)
      return { minPrice: 0, maxPrice: 100, priceRange: 100, scaledMin: 0, scaledMax: 100, scaledRange: 100 };

    let min = Math.min(...candles.map((c) => c.low));
    let max = Math.max(...candles.map((c) => c.high));

    // Sertakan harga market terkini dan posisi karyawan ke dalam skala
    min = Math.min(min, currentInstrumentLive);
    max = Math.max(max, currentInstrumentLive);

    chartPositions.forEach((pos) => {
      min = Math.min(min, pos.entryPrice);
      max = Math.max(max, pos.entryPrice);
      if (pos.stopLoss > 0) min = Math.min(min, pos.stopLoss);
      if (pos.takeProfit > 0) max = Math.max(max, pos.takeProfit);
    });

    const padding = (max - min) * 0.1 || 1;
    const baseMin = min - padding;
    const baseMax = max + padding;
    const baseRange = baseMax - baseMin;

    // Terapkan verticalZoom (skala vertikal lilin agar bisa ditinggikan / direndahkan)
    const mid = (baseMax + baseMin) / 2;
    const half = baseRange / 2 / verticalZoom;
    const sMin = mid - half;
    const sMax = mid + half;
    const sRange = sMax - sMin;

    return {
      minPrice: baseMin,
      maxPrice: baseMax,
      priceRange: baseRange,
      scaledMin: sMin,
      scaledMax: sMax,
      scaledRange: sRange,
    };
  }, [candles, chartPositions, currentInstrumentLive, verticalZoom]);

  // Helper konversi harga ke koordinat Y di canvas SVG (tinggi = 360)
  const getY = (price: number) => {
    if (scaledRange === 0) return 180;
    const ratio = (price - scaledMin) / scaledRange;
    return 360 - ratio * 290 - 35;
  };

  // Helper konversi koordinat Y ke estimasi harga
  const getPriceFromY = (yCoord: number) => {
    const ratio = (360 - 35 - yCoord) / 290;
    return scaledMin + ratio * scaledRange;
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5 select-none font-mono">
      {/* BANNER PERINGATAN: OPERASIONAL TRADING DIHENTIKAN & DIKUNCI TOTAL */}
      <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-rose-50 via-rose-100/60 to-rose-50 border-t-2 border-t-white border-x border-rose-200 border-b-2 border-b-rose-300 text-rose-900 flex items-center justify-between gap-2 shadow-xs shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Lock className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-black uppercase tracking-tight flex items-center gap-1.5">
              <span>OPERASIONAL TRADING TELAH DIHENTIKAN & DIKUNCI</span>
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            </div>
            <div className="text-[10px] text-rose-700 font-medium truncate">
              Chart pasar dihentikan (HALTED), live candlestick dibekukan, dan seluruh posisi serta data karyawan dikunci total (Ngeblur).
            </div>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-black text-[9px] uppercase tracking-wider flex items-center gap-1 flex-shrink-0 shadow-xs">
          <ShieldAlert className="w-3 h-3" /> DEFCON 1 • LOCKED
        </span>
      </div>

      {/* ============================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU KPI EXECUTIVE SURVEILLANCE              */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Card 1: Total Karyawan Aktif - DIKUNCI */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-rose-600 stroke-[2.3]" />
              KARYAWAN TRADING (DIKUNCI)
            </span>
            <span className="text-[9px] font-black text-rose-700 bg-rose-50 px-2 py-0.2 rounded-full border border-rose-200/80 font-mono flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> DIKUNCI TOTAL
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono flex items-baseline gap-1.5">
              <span>0 Online</span>
              <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                12 Akun Dibekukan
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">TOTAL 5 DIVISI PASAR</span>
            <span className="text-rose-700 font-extrabold">STATUS: DIHENTIKAN</span>
          </div>
        </div>

        {/* Card 2: Total Biji Posisi Terbuka */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              TOTAL BIJI POSISI TERBUKA
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-black bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              7 BUY / 3 SELL
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-blue-700 tracking-tight font-mono flex items-baseline gap-1.5">
              <span>{totalOpenPositionsCount} Posisi</span>
              <span className="text-xs text-slate-400 font-medium">Aktif di Pasar</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">TOTAL EKSPOSUR LOT</span>
            <span className="text-blue-800 font-extrabold">33.20 LOTS ($2.7M)</span>
          </div>
        </div>

        {/* Card 3: Floating PnL Tim Real-Time (Dinamis Berubah Setiap Detik) */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              LIVE FLOATING PNL KARYAWAN
            </span>
            <span
              className={`inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[9px] font-black border font-mono transition-colors ${
                totalFloatingPnl >= 0
                  ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
              }`}
            >
              {totalFloatingPnl >= 0 ? (
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              ) : (
                <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
              )}
              {totalFloatingPnl >= 0 ? '+2.45%' : '-0.85%'}
            </span>
          </div>

          <div className="my-0.5">
            <div
              className={`text-xl sm:text-2xl font-black tracking-tight font-mono transition-all duration-300 ${
                totalFloatingPnl >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {totalFloatingPnl >= 0 ? '+' : '-'}$
              {Math.abs(totalFloatingPnl).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">REAL-TIME TICK: #{tickCounter}</span>
            <span className="text-emerald-700 font-bold">100% DINAMIS</span>
          </div>
        </div>

        {/* Card 4: Pengawasan Margin & Batas Resiko */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              PENGAWASAN MARGIN & RESIKO
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[8.5px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              AMAN (SAFE)
            </span>
          </div>

          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono flex items-baseline gap-1.5">
              <span>13.8%</span>
              <span className="text-xs font-semibold text-slate-400">Margin Terpakai</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">MAX DRAWDOWN TIM</span>
            <span className="text-indigo-600 font-extrabold">-2.1% (BATAS: 5.0%)</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BODY UTAMA: [KIRI: GRAFIK TRADING + ORDER TABLE]            */}
      {/*                [KANAN: ROSTER KARYAWAN & FILTER]              */}
      {/* ============================================================== */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 overflow-hidden">
        {/* ============================================================ */}
        {/* KOLOM UTAMA: CHART LEBAR & TABEL ORDER                      */}
        {/* ============================================================ */}
        <div
          className={`${
            isWideChart ? 'lg:col-span-12 xl:col-span-12' : 'lg:col-span-10 xl:col-span-10'
          } flex flex-col gap-2 sm:gap-2.5 h-full min-h-0 overflow-hidden transition-all duration-300`}
        >
          {/* SECTION GRAFIK TRADING MULTI-KARYAWAN INTERAKTIF REAL-TIME */}
          <div
            className={`${glassCard} ${
              chartHeightMode === 'COMPACT'
                ? 'h-[380px] min-h-[380px]'
                : chartHeightMode === 'MEDIUM'
                ? 'h-[490px] min-h-[460px] flex-[2.8]'
                : chartHeightMode === 'TALL'
                ? 'h-[590px] min-h-[560px] flex-[3.5]'
                : 'flex-1 min-h-[600px]'
            } flex flex-col justify-between overflow-hidden p-2.5 sm:p-3.5 transition-all duration-300`}
          >
            {/* Header Baris 1: Simbol, Harga Live, dan Toolbars */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1 border-b border-slate-200/80 shrink-0">
              <div className="flex items-center gap-2">
                {/* Selector Simbol Pasangan Instrumen */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
                  {['BTC/USDT', 'XAU/USD', 'EUR/USD', 'ETH/USDT', 'USD/JPY', 'NVDA'].map((sym) => {
                    const isSelected = selectedInstrument === sym;
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => setSelectedInstrument(sym)}
                        className={`px-2 py-0.5 rounded-lg text-[9px] font-black tracking-tight cursor-pointer transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <span>{sym}</span>
                        {isSelected && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              livePrices[sym]?.direction === 'UP' ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Badge Harga Real-Time dengan Flash Direction */}
                <div
                  className={`text-[11px] font-black font-mono px-2 py-0.5 rounded-lg border transition-colors duration-300 flex items-center gap-1.5 ${
                    currentInstrumentDir === 'UP'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-rose-50 text-rose-700 border-rose-300'
                  }`}
                >
                  {currentInstrumentDir === 'UP' ? (
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 stroke-[3]" />
                  )}
                  <span>
                    ${currentInstrumentLive >= 10
                      ? currentInstrumentLive.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : currentInstrumentLive.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Toolbar Kanan: Pengatur Tinggi & Lebar Chart Sesuai Keinginan User */}
              <div className="flex items-center gap-1.5">
                {/* 1. Pengatur Skala Tinggi Lilin (Zoom In / Out Vertikal) */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
                  <span className="text-[7.5px] font-bold text-slate-500 px-1">SKALA:</span>
                  <button
                    type="button"
                    onClick={() => setVerticalZoom((z) => Math.min(2.5, +(z + 0.2).toFixed(2)))}
                    className="p-1 rounded bg-white text-slate-700 hover:text-indigo-600 shadow-2xs border border-slate-200 cursor-pointer"
                    title="Tinggikan Lilin (Zoom In Vertikal)"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setVerticalZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))}
                    className="p-1 rounded bg-white text-slate-700 hover:text-indigo-600 shadow-2xs border border-slate-200 cursor-pointer"
                    title="Rendahkan Lilin (Zoom Out Vertikal)"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setVerticalZoom(1.0)}
                    className="p-1 rounded bg-white text-slate-500 hover:text-indigo-600 shadow-2xs border border-slate-200 cursor-pointer"
                    title="Reset Skala Vertikal Normal"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                  </button>
                  <span className="text-[7.5px] font-black text-indigo-700 px-1 font-mono">
                    {(verticalZoom * 100).toFixed(0)}%
                  </span>
                </div>

                {/* 2. Pengatur Tinggi Fisik Panel Chart (Compact, Sedang, Tinggi, Maksimal) */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-[7.5px] font-bold">
                  <button
                    type="button"
                    onClick={() => setChartHeightMode('COMPACT')}
                    className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                      chartHeightMode === 'COMPACT'
                        ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Tinggi Rendah (380px)"
                  >
                    380px
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartHeightMode('MEDIUM')}
                    className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                      chartHeightMode === 'MEDIUM'
                        ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Tinggi Sedang (490px)"
                  >
                    490px
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartHeightMode('TALL')}
                    className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                      chartHeightMode === 'TALL'
                        ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Sangat Tinggi (590px)"
                  >
                    590px
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartHeightMode('MAX')}
                    className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                      chartHeightMode === 'MAX'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Maksimal Penuh"
                  >
                    MAX
                  </button>
                </div>

                {/* 3. Timeframe Selector */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
                  {(['1M', '5M', '15M', '1H', '1D'] as const).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setSelectedTimeframe(tf)}
                      className={`px-1.5 py-0.2 rounded text-[7.5px] font-bold cursor-pointer transition-all ${
                        selectedTimeframe === tf
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                {/* 4. Mode Chart: Candlestick vs Line */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setChartMode('CANDLE')}
                    title="Grafik Candlestick"
                    className={`px-1.5 py-0.2 rounded text-[7.5px] font-bold cursor-pointer transition-all ${
                      chartMode === 'CANDLE'
                        ? 'bg-white text-slate-800 shadow-xs border border-slate-200'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Lilin 🕯️
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartMode('LINE')}
                    title="Grafik Garis Area"
                    className={`px-1.5 py-0.2 rounded text-[7.5px] font-bold cursor-pointer transition-all ${
                      chartMode === 'LINE'
                        ? 'bg-white text-slate-800 shadow-xs border border-slate-200'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Garis 📈
                  </button>
                </div>

                {/* 5. Tombol Maksimalkan Lebar Chart (100% Full Width Mode) */}
                <button
                  type="button"
                  onClick={() => setIsWideChart(!isWideChart)}
                  className={`px-2 py-0.5 rounded-lg text-[7.5px] font-bold cursor-pointer transition-all flex items-center gap-1 border ${
                    isWideChart
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
                  }`}
                  title={isWideChart ? 'Kembali ke Ukuran Standar' : 'Perlebar Chart Layar Penuh (100% Full Width)'}
                >
                  {isWideChart ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                  <span>{isWideChart ? 'NORMAL' : 'LEBAR PENUH ⛶'}</span>
                </button>

                {/* 6. Indikator Filter Aktif */}
                {selectedTrader ? (
                  <button
                    type="button"
                    onClick={() => setSelectedTraderId(null)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[8px] font-bold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-all cursor-pointer"
                  >
                    <span>Fokus: {selectedTrader.name}</span>
                    <span className="font-black text-rose-600">✕</span>
                  </button>
                ) : (
                  <span className="text-[8px] font-bold text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded-md">
                    Semua Karyawan
                  </span>
                )}
              </div>
            </div>

            {/* Header Baris 2: Pro TradingView Standard OHLCV Status Bar */}
            <div className="flex items-center justify-between py-1 px-2 my-0.5 bg-slate-50/80 rounded-lg border border-slate-200/60 text-[8px] font-mono shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-bold">
                  {selectedInstrument} • {selectedTimeframe}
                </span>
                <span className="text-slate-600">
                  O: <strong className="text-slate-900">${displayCandle.open}</strong>
                </span>
                <span className="text-slate-600">
                  H: <strong className="text-emerald-700">${displayCandle.high}</strong>
                </span>
                <span className="text-slate-600">
                  L: <strong className="text-rose-700">${displayCandle.low}</strong>
                </span>
                <span className="text-slate-600">
                  C: <strong className="text-slate-900">${displayCandle.close}</strong>
                </span>
                <span className="text-slate-600">
                  VOL: <strong className="text-indigo-700">{displayCandle.volume} Lots</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">
                  WAKTU: <strong className="text-slate-700">{displayCandle.time}</strong>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold flex items-center gap-1 font-mono">
                  <Lock className="w-2.5 h-2.5" /> DIKUNCI / FROZEN
                </span>
              </div>
            </div>

            {/* AREA GRAFIK TRADING PRO BIDANG LUAS (1000x360) DENGAN KONTROL SKALA TINGGI & RENDAH */}
            <div
              className="flex-1 relative w-full my-1 overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 1000;
                const y = ((e.clientY - rect.top) / rect.height) * 360;
                setCrosshairPos({ x, y });

                // Temukan lilin terdekat dengan posisi X
                const candleIdx = Math.round(((x - 35) / 800) * (candles.length - 1));
                if (candleIdx >= 0 && candleIdx < candles.length) {
                  setHoveredCandle(candles[candleIdx]);
                }
              }}
              onMouseLeave={() => {
                setCrosshairPos(null);
                setHoveredCandle(null);
              }}
            >
              {/* Frosted Blur Lock Overlay on Candlestick Chart */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/15 backdrop-blur-[3px] rounded-xl p-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-white via-rose-50 to-rose-100 border-t border-t-white border-x border-rose-200 border-b-2 border-b-rose-300 shadow-[0_6px_16px_rgba(225,29,72,0.2)] flex items-center justify-center text-rose-600 mb-2">
                  <Lock className="w-6 h-6 stroke-[2.4]" />
                </div>
                <div className="text-sm sm:text-base font-black text-slate-900 font-mono tracking-tight uppercase">
                  GRAFIK TRADING DIHENTIKAN & DIKUNCI
                </div>
                <div className="text-xs font-mono text-slate-600 max-w-md mt-1 leading-snug">
                  Sesi grafik live telah dihentikan (HALTED). Seluruh streaming lilin, tick harga, dan eksekusi orderbook dikunci dalam status proteksi.
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-300/80 text-[10px] font-mono font-bold text-rose-700 shadow-xs">
                  <ShieldAlert className="w-3 h-3" /> DEFCON 1 • SYSTEM FROZEN & LOCKED
                </div>
              </div>

              <svg viewBox="0 0 1000 360" className="w-full h-full overflow-visible opacity-45 filter blur-[0.6px]">
                <defs>
                  <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Garis Grid Horizontal Luas & Label Samping */}
                {[0.12, 0.28, 0.44, 0.6, 0.76, 0.92].map((ratio, idx) => {
                  const y = 360 * ratio;
                  const priceVal = scaledMax - ratio * scaledRange;
                  return (
                    <g key={idx}>
                      <line x1="0" y1={y} x2="1000" y2={y} stroke="#cbd5e1" strokeDasharray="3 3" opacity="0.35" />
                      <text x="995" y={y - 3} textAnchor="end" className="text-[8px] font-mono fill-slate-400">
                        ${priceVal >= 10 ? priceVal.toFixed(2) : priceVal.toFixed(4)}
                      </text>
                    </g>
                  );
                })}

                {/* Histogram Volume Real-Time di Bagian Bawah Canvas */}
                {candles.map((c, i) => {
                  const x = (i / (candles.length - 1)) * 800 + 35;
                  const maxVol = Math.max(...candles.map((cd) => cd.volume), 1);
                  const volHeight = (c.volume / maxVol) * 45;
                  const yVol = 355 - volHeight;
                  const isGreen = c.close >= c.open;
                  return (
                    <rect
                      key={`vol-${i}`}
                      x={x - 4}
                      y={yVol}
                      width="8"
                      height={volHeight}
                      rx="1"
                      fill={isGreen ? '#10b981' : '#f43f5e'}
                      opacity="0.2"
                    />
                  );
                })}

                {/* Visual Lilin (Candlestick) Real-Time Tebal & Jelas */}
                {chartMode === 'CANDLE' &&
                  candles.map((c, i) => {
                    const x = (i / (candles.length - 1)) * 800 + 35;
                    const yOpen = getY(c.open);
                    const yClose = getY(c.close);
                    const yHigh = getY(c.high);
                    const yLow = getY(c.low);
                    const isGreen = c.close >= c.open;
                    const bodyTop = Math.min(yOpen, yClose);
                    const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));
                    const isLastCandle = i === candles.length - 1;
                    const color = isGreen ? '#10b981' : '#f43f5e';

                    return (
                      <g key={i}>
                        {/* Sumbu Lilin (Wick) */}
                        <line
                          x1={x}
                          y1={yHigh}
                          x2={x}
                          y2={yLow}
                          stroke={color}
                          strokeWidth={isLastCandle ? '2.2' : '1.5'}
                        />
                        {/* Batang Lilin (Body) */}
                        <rect
                          x={x - 5}
                          y={bodyTop}
                          width="10"
                          height={bodyHeight}
                          rx="1.5"
                          fill={color}
                          stroke={color}
                          strokeWidth="0.8"
                        />
                      </g>
                    );
                  })}

                {/* Visual Garis Area (jika mode LINE) */}
                {chartMode === 'LINE' && (
                  <>
                    <path
                      d={`M 35,${getY(candles[0]?.close || 0)} ${candles
                        .map((c, i) => `L ${(i / (candles.length - 1)) * 800 + 35},${getY(c.close)}`)
                        .join(' ')} L 835,360 L 35,360 Z`}
                      fill="url(#chartAreaGrad)"
                    />
                    <path
                      d={`M 35,${getY(candles[0]?.close || 0)} ${candles
                        .map((c, i) => `L ${(i / (candles.length - 1)) * 800 + 35},${getY(c.close)}`)
                        .join(' ')}`}
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </>
                )}

                {/* GARIS REAL-TIME HARGA PASAR SAAT INI (CYAN DASHED SOLID TAG) */}
                {(() => {
                  const yLive = getY(currentInstrumentLive);
                  return (
                    <g className="transition-all duration-300">
                      <line
                        x1="0"
                        y1={yLive}
                        x2="815"
                        y2={yLive}
                        stroke="#0284c7"
                        strokeWidth="1.8"
                        strokeDasharray="4 2"
                      />
                      <circle cx="815" cy={yLive} r="3" fill="#0284c7" />
                      <g transform={`translate(820, ${yLive - 9})`}>
                        <rect width="175" height="18" rx="3.5" fill="#0369a1" className="shadow-xs" />
                        <text x="6" y="12" className="text-[7.5px] font-mono font-black fill-white">
                          ● LIVE: ${currentInstrumentLive >= 10 ? currentInstrumentLive.toFixed(2) : currentInstrumentLive.toFixed(4)}
                        </text>
                      </g>
                    </g>
                  );
                })()}

                {/* OVERLAY GARIS LEVEL ENTRY POSISI KARYAWAN LANGSUNG DI CHART */}
                {chartPositions.map((pos) => {
                  const yEntry = getY(pos.entryPrice);
                  const yTp = getY(pos.takeProfit);
                  const ySl = getY(pos.stopLoss);
                  const isHovered = hoveredPositionId === pos.id;
                  const isBuy = pos.direction === 'BUY';
                  const entryColor = isBuy ? '#10b981' : '#f43f5e';

                  return (
                    <g key={pos.id} className="transition-all duration-200">
                      {/* Garis Take Profit (Hijau Putus-putus) */}
                      {pos.takeProfit > 0 && (
                        <g>
                          <line
                            x1="0"
                            y1={yTp}
                            x2="815"
                            y2={yTp}
                            stroke="#059669"
                            strokeWidth="1.2"
                            strokeDasharray="4 2"
                            opacity={isHovered ? 0.95 : 0.45}
                          />
                          <text x="820" y={yTp + 3} className="text-[7px] font-mono font-bold fill-emerald-700">
                            TP: ${pos.takeProfit}
                          </text>
                        </g>
                      )}

                      {/* Garis Stop Loss (Merah Putus-putus) */}
                      {pos.stopLoss > 0 && (
                        <g>
                          <line
                            x1="0"
                            y1={ySl}
                            x2="815"
                            y2={ySl}
                            stroke="#dc2626"
                            strokeWidth="1.2"
                            strokeDasharray="4 2"
                            opacity={isHovered ? 0.95 : 0.45}
                          />
                          <text x="820" y={ySl + 3} className="text-[7px] font-mono font-bold fill-rose-600">
                            SL: ${pos.stopLoss}
                          </text>
                        </g>
                      )}

                      {/* Garis Entry Posisi Karyawan (Solid Highlight) */}
                      <line
                        x1="0"
                        y1={yEntry}
                        x2="815"
                        y2={yEntry}
                        stroke={entryColor}
                        strokeWidth={isHovered ? '2.6' : '1.8'}
                        strokeDasharray={isHovered ? 'none' : '6 3'}
                      />

                      {/* Badge Nama Karyawan & Posisi di ujung kanan garis */}
                      <g transform={`translate(820, ${yEntry - 9})`}>
                        <rect
                          width="175"
                          height="18"
                          rx="4"
                          fill={isBuy ? '#064e3b' : '#881337'}
                          stroke={isHovered ? '#ffffff' : entryColor}
                          strokeWidth="1.2"
                          className="shadow-sm"
                        />
                        <text x="6" y="12" className="text-[7.5px] font-mono font-bold fill-white">
                          {isBuy ? '▲ BUY' : '▼ SELL'} {pos.lots}L • {pos.traderName.split(' ')[0]} (
                          {pos.floatingPnlStr})
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* CROSSHAIR INTERAKTIF TRADINGVIEW (Garis Pandu Kursor & Harga Tepat) */}
                {crosshairPos && (
                  <g pointerEvents="none">
                    <line
                      x1="0"
                      y1={crosshairPos.y}
                      x2="900"
                      y2={crosshairPos.y}
                      stroke="#64748b"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1={crosshairPos.x}
                      y1="0"
                      x2={crosshairPos.x}
                      y2="360"
                      stroke="#64748b"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    {/* Badge Harga Crosshair Samping */}
                    <g transform={`translate(905, ${crosshairPos.y - 8})`}>
                      <rect width="90" height="16" rx="2" fill="#0f172a" />
                      <text x="5" y="11" className="text-[7.5px] font-mono fill-white font-bold">
                        ${getPriceFromY(crosshairPos.y).toFixed(2)}
                      </text>
                    </g>
                  </g>
                )}
              </svg>
            </div>

            {/* Footer Baris Bawah Chart */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                POSISI TERPLOT DI CHART: <strong className="text-slate-800">{chartPositions.length} Biji Posisi Karyawan</strong>
              </span>
              <span className="text-indigo-600 font-bold">
                REAL-TIME SYNC: {lastSyncStr} WIB • LATENSI 1.2MS
              </span>
            </div>
          </div>

          {/* SECTION TABEL MANAJEMEN TRANSAKSI & LIMIT KARYAWAN */}
          <div className={`${glassCard} flex-1 min-h-[170px] max-h-[220px] flex flex-col justify-between overflow-hidden p-2 sm:p-2.5`}>
            {/* Header Tabs */}
            <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-200/80 shrink-0">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('OPEN_POSITIONS')}
                  className={`px-2.5 py-1 rounded-xl text-[9px] font-black cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeTab === 'OPEN_POSITIONS'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>POSISI BERJALAN ({filteredPositions.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('PENDING_ORDERS')}
                  className={`px-2.5 py-1 rounded-xl text-[9px] font-black cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeTab === 'PENDING_ORDERS'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>ORDER LIMIT & PENDING ({filteredPendingOrders.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('HISTORY')}
                  className={`px-2.5 py-1 rounded-xl text-[9px] font-black cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeTab === 'HISTORY'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>RIWAYAT TERTUTUP ({filteredHistory.length})</span>
                </button>
              </div>

              <div className="text-[8px] text-slate-400 font-mono">
                {selectedTrader ? `Menampilkan: ${selectedTrader.name}` : 'Semua Karyawan Tergabung'}
              </div>
            </div>

            {/* TABEL CONTENT SESUAI TAB AKTIF - DIKUNCI & NGEBLUR TOTAL */}
            <div className="flex-1 relative overflow-hidden my-1 pr-0.5 min-h-0">
              <div className="w-full h-full overflow-x-auto overflow-y-auto custom-scrollbar filter blur-[5px] select-none pointer-events-none opacity-25">
              {/* TAB 1: POSISI BERJALAN KARYAWAN */}
              {activeTab === 'OPEN_POSITIONS' && (
                <table className="w-full text-left font-mono text-[9px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-[7.5px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="py-1 px-1.5">Tiket / Karyawan</th>
                      <th className="py-1 px-1">Instrumen</th>
                      <th className="py-1 px-1 text-center">Arah</th>
                      <th className="py-1 px-1 text-right">Lot (Size)</th>
                      <th className="py-1 px-1 text-right">Harga Masuk</th>
                      <th className="py-1 px-1 text-right">Harga Live</th>
                      <th className="py-1 px-1 text-center">TP / SL</th>
                      <th className="py-1 px-1 text-right">Floating PnL Live</th>
                      <th className="py-1 px-1.5 text-right">Durasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPositions.map((pos) => {
                      const isBuy = pos.direction === 'BUY';
                      const isHovered = hoveredPositionId === pos.id;

                      return (
                        <tr
                          key={pos.id}
                          onMouseEnter={() => setHoveredPositionId(pos.id)}
                          onMouseLeave={() => setHoveredPositionId(null)}
                          className={`transition-colors cursor-pointer ${
                            isHovered ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-1 px-1.5">
                            <div className="font-black text-slate-800 leading-tight">{pos.traderName}</div>
                            <div className="text-[7.5px] text-slate-400">{pos.id} • {pos.orderExecution}</div>
                          </td>

                          <td className="py-1 px-1 font-black text-slate-800">
                            <button
                              type="button"
                              onClick={() => setSelectedInstrument(pos.instrument)}
                              className="text-left hover:underline text-indigo-700 flex items-center gap-1"
                              title="Klik untuk tampilkan di chart"
                            >
                              <span>{pos.instrument}</span>
                              {pos.instrument === selectedInstrument && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              )}
                            </button>
                          </td>

                          <td className="py-1 px-1 text-center">
                            <span
                              className={`inline-block px-1.5 py-0.2 rounded text-[7px] font-black border ${
                                isBuy
                                  ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                                  : 'bg-rose-500/10 text-rose-700 border-rose-500/30'
                              }`}
                            >
                              {pos.direction}
                            </span>
                          </td>

                          <td className="py-1 px-1 text-right font-black text-slate-800">
                            {pos.lots} Lot
                            <span className="text-[7px] text-slate-400 block font-normal">{pos.sizeUsd}</span>
                          </td>

                          <td className="py-1 px-1 text-right font-bold text-slate-700">
                            ${pos.entryPrice >= 10 ? pos.entryPrice.toLocaleString() : pos.entryPrice}
                          </td>

                          <td className="py-1 px-1 text-right font-black text-slate-900 transition-colors">
                            <span className="bg-slate-100 px-1 py-0.2 rounded">
                              ${pos.currentPrice >= 10
                                ? pos.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                : pos.currentPrice.toFixed(4)}
                            </span>
                          </td>

                          <td className="py-1 px-1 text-center text-[7.5px]">
                            <span className="text-emerald-700 font-bold block">
                              TP: {pos.takeProfit > 0 ? pos.takeProfit : '-'}
                            </span>
                            <span className="text-rose-600 font-bold block">
                              SL: {pos.stopLoss > 0 ? pos.stopLoss : '-'}
                            </span>
                          </td>

                          <td className="py-1 px-1 text-right">
                            <span
                              className={`font-black transition-all duration-300 ${
                                pos.isProfit ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                            >
                              {pos.floatingPnlStr}
                            </span>
                            <span className="text-[7.5px] text-emerald-700 block font-bold">
                              {pos.floatingPnlPercent}
                            </span>
                          </td>

                          <td className="py-1 px-1.5 text-right text-slate-500 text-[8px]">
                            <span>{pos.duration}</span>
                            <span className="text-[7px] text-slate-400 block">{pos.openTime}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {/* TAB 2: ORDER LIMIT & PENDING KARYAWAN */}
              {activeTab === 'PENDING_ORDERS' && (
                <table className="w-full text-left font-mono text-[9px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-[7.5px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="py-1 px-1.5">Order ID / Karyawan</th>
                      <th className="py-1 px-1">Instrumen</th>
                      <th className="py-1 px-1 text-center">Tipe Order</th>
                      <th className="py-1 px-1 text-right">Lot</th>
                      <th className="py-1 px-1 text-right">Target Harga</th>
                      <th className="py-1 px-1 text-right">Harga Pasar</th>
                      <th className="py-1 px-1 text-right">Jarak Trigger</th>
                      <th className="py-1 px-1 text-center">TP / SL</th>
                      <th className="py-1 px-1.5 text-right">Waktu Pasang</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPendingOrders.map((ord) => {
                      const cur = livePrices[ord.instrument]?.price || ord.currentPrice;
                      return (
                        <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-1 px-1.5">
                            <div className="font-black text-slate-800">{ord.traderName}</div>
                            <div className="text-[7.5px] text-slate-400">{ord.id}</div>
                          </td>

                          <td className="py-1 px-1 font-black text-indigo-700">{ord.instrument}</td>

                          <td className="py-1 px-1 text-center">
                            <span className="px-1.5 py-0.2 rounded text-[7px] font-black bg-amber-50 text-amber-700 border border-amber-200">
                              {ord.type}
                            </span>
                          </td>

                          <td className="py-1 px-1 text-right font-black text-slate-800">{ord.lots} Lot</td>

                          <td className="py-1 px-1 text-right font-black text-indigo-600">
                            ${ord.targetPrice >= 10 ? ord.targetPrice.toLocaleString() : ord.targetPrice}
                          </td>

                          <td className="py-1 px-1 text-right text-slate-600 font-bold">
                            ${cur >= 10 ? cur.toLocaleString() : cur.toFixed(4)}
                          </td>

                          <td className="py-1 px-1 text-right font-bold text-amber-600">{ord.distance}</td>

                          <td className="py-1 px-1 text-center text-[7.5px]">
                            <span className="text-emerald-700 font-bold block">TP: {ord.takeProfit}</span>
                            <span className="text-rose-600 font-bold block">SL: {ord.stopLoss}</span>
                          </td>

                          <td className="py-1 px-1.5 text-right text-slate-400 text-[8px]">{ord.placedTime}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {/* TAB 3: RIWAYAT TRANSAKSI TERTUTUP */}
              {activeTab === 'HISTORY' && (
                <table className="w-full text-left font-mono text-[9px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-[7.5px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="py-1 px-1.5">Tiket / Karyawan</th>
                      <th className="py-1 px-1">Instrumen</th>
                      <th className="py-1 px-1 text-center">Arah</th>
                      <th className="py-1 px-1 text-right">Lot</th>
                      <th className="py-1 px-1 text-right">Entry / Exit</th>
                      <th className="py-1 px-1 text-right">Realized PnL</th>
                      <th className="py-1 px-1 text-center">Hasil Penutupan</th>
                      <th className="py-1 px-1.5 text-right">Waktu Eksekusi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredHistory.map((his) => (
                      <tr key={his.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1 px-1.5">
                          <div className="font-black text-slate-800">{his.traderName}</div>
                          <div className="text-[7.5px] text-slate-400">{his.id}</div>
                        </td>

                        <td className="py-1 px-1 font-black text-slate-800">{his.instrument}</td>

                        <td className="py-1 px-1 text-center">
                          <span
                            className={`px-1.5 py-0.2 rounded text-[7px] font-black border ${
                              his.direction === 'BUY'
                                ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                                : 'bg-rose-500/10 text-rose-700 border-rose-500/30'
                            }`}
                          >
                            {his.direction}
                          </span>
                        </td>

                        <td className="py-1 px-1 text-right font-black text-slate-800">{his.lots} Lot</td>

                        <td className="py-1 px-1 text-right text-slate-700">
                          <span className="block">${his.entryPrice} → ${his.closePrice}</span>
                          <span className="text-[7px] text-emerald-600 font-bold block">{his.pipsOrPoints}</span>
                        </td>

                        <td className="py-1 px-1 text-right font-black text-emerald-600">
                          {his.realizedPnl}
                        </td>

                        <td className="py-1 px-1 text-center">
                          <span
                            className={`px-1.5 py-0.2 rounded text-[7px] font-black border ${
                              his.closedReason === 'TAKE_PROFIT'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : his.closedReason === 'STOP_LOSS'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            {his.closedReason.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="py-1 px-1.5 text-right text-slate-400 text-[7.5px]">
                          {his.closeTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              </div>

              {/* Lock Overlay on Employee Tables */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-slate-900/10 backdrop-blur-[4px] rounded-xl border border-slate-300/80 text-center">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-white via-rose-50 to-rose-100 border-t border-t-white border-x border-rose-200 border-b-2 border-b-rose-300 shadow-[0_4px_12px_rgba(225,29,72,0.18)] flex items-center justify-center text-rose-600 mb-1.5">
                  <Lock className="w-5 h-5 stroke-[2.4]" />
                </div>
                <div className="text-xs sm:text-sm font-black text-slate-900 tracking-tight font-mono uppercase">
                  DATA & POSISI KARYAWAN DIKUNCI TOTAL (NGEBLUR)
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-slate-600 max-w-sm mt-0.5 leading-snug">
                  Surveillance posisi live, pending order, dan riwayat trading seluruh karyawan telah disensor & dikunci demi protokol kepatuhan.
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-300/80 text-[8.5px] font-mono font-bold text-rose-700">
                  <ShieldAlert className="w-2.5 h-2.5" /> AKSES TRADER DIBEKUKAN • PROTOKOL PENGUNCIAN
                </div>
              </div>
            </div>

            {/* Footer Tabel */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] font-mono text-slate-500 shrink-0">
              <span className="text-rose-600 font-bold flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> DATA POSISI KARYAWAN DIBEKUKAN
              </span>
              <span className="text-rose-700 font-bold">CIRCUIT BREAKER DIKUNCI TOTAL</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* KOLOM KANAN: ROSTER KARYAWAN & CONTROLLER                    */}
        {/* ============================================================ */}
        <div
          className={`${glassCard} ${
            isWideChart ? 'hidden' : 'lg:col-span-2 xl:col-span-2'
          } h-full flex flex-col justify-between overflow-hidden p-2.5 sm:p-3 transition-all duration-300`}
        >
          {/* Header Roster */}
          <div className="shrink-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase font-mono">
                  ROSTER KARYAWAN
                </span>
              </div>

              {selectedTraderId ? (
                <button
                  type="button"
                  onClick={() => setSelectedTraderId(null)}
                  className="text-[7.5px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 hover:bg-indigo-100 cursor-pointer transition-all"
                >
                  LIHAT SEMUA
                </button>
              ) : (
                <span className="text-[7.5px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                  {TRADER_EMPLOYEES.length} KARYAWAN
                </span>
              )}
            </div>

            <div className="text-[8px] text-slate-400 pb-1 mb-1 border-b border-slate-200/80">
              Klik nama karyawan untuk memfilter chart & posisi miliknya saja.
            </div>
          </div>

          {/* List Karyawan Trading - DIKUNCI TOTAL & NGEBLUR */}
          <div className="flex-1 relative overflow-hidden pr-0.5 min-h-0">
            <div className="w-full h-full overflow-y-auto space-y-1.5 pr-0.5 min-h-0 custom-scrollbar filter blur-[4px] select-none pointer-events-none opacity-25">
            {TRADER_EMPLOYEES.map((trader) => {
              const isSelected = selectedTraderId === trader.id;

              // Hitung floating PnL karyawan ini secara dinamis dari livePositions
              const traderPositions = livePositions.filter((p) => p.traderId === trader.id);
              const traderLiveFloatingPnl = traderPositions.reduce((acc, p) => acc + p.floatingPnl, 0);
              const hasPnl = traderPositions.length > 0;
              const pnlDisplay = hasPnl
                ? `${traderLiveFloatingPnl >= 0 ? '+' : '-'}$${Math.abs(traderLiveFloatingPnl).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}`
                : trader.floatingPnl;

              return (
                <div
                  key={trader.id}
                  onClick={() =>
                    setSelectedTraderId(isSelected ? null : trader.id)
                  }
                  className={`p-2 rounded-xl transition-all cursor-pointer font-mono border ${
                    isSelected
                      ? 'bg-gradient-to-b from-indigo-50 via-white to-indigo-100/50 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                      : 'bg-gradient-to-b from-white to-[#f5f8fc] border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Baris 1: Avatar, Nama, Status */}
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-slate-900 text-white font-black text-[9px] flex items-center justify-center shrink-0">
                        {trader.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-slate-900 truncate leading-tight">
                          {trader.name}
                        </div>
                        <div className="text-[7px] text-slate-400 truncate">{trader.role}</div>
                      </div>
                    </div>

                    <span
                      className={`px-1.5 py-0.2 rounded text-[7px] font-black shrink-0 border ${
                        trader.status === 'IN_TRADE'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : trader.status === 'ACTIVE'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {trader.status === 'IN_TRADE' ? '● TRADING' : trader.status}
                    </span>
                  </div>

                  {/* Baris 2: Indikator Biji Posisi Terbuka */}
                  <div className="flex items-center justify-between bg-slate-100/80 p-1 rounded-lg border border-slate-200/60 mb-1 text-[8px]">
                    <span className="text-slate-500 font-bold">POSISI TERBUKA:</span>
                    <span
                      className={`font-black px-1.5 py-0.2 rounded ${
                        trader.openPositionsCount > 0
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {trader.openPositionsCount} Biji Posisi
                    </span>
                  </div>

                  {/* Baris 3: Lot Exposure & Floating PnL Live */}
                  <div className="grid grid-cols-2 gap-1 text-[7.5px] pt-0.5 border-t border-slate-200/60">
                    <div>
                      <span className="text-slate-400 block">EXPOSURE LOT:</span>
                      <span className="font-black text-slate-800 truncate block">
                        {trader.totalLotExposure}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 block">FLOATING LIVE:</span>
                      <span
                        className={`font-black truncate block transition-all duration-300 ${
                          (hasPnl ? traderLiveFloatingPnl : trader.floatingPnlNum) >= 0
                            ? 'text-emerald-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {pnlDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Baris 4: Win Rate & Margin Terpakai */}
                  <div className="flex items-center justify-between text-[7px] text-slate-500 pt-1 mt-0.5 border-t border-slate-200/40">
                    <span>
                      WIN: <strong className="text-indigo-600">{trader.winRate}</strong>
                    </span>
                    <span>
                      MARGIN: <strong className="text-slate-700">{trader.usedMargin}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
            </div>

            {/* Lock Overlay on Roster */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-3 bg-slate-900/10 backdrop-blur-[3px] rounded-xl border border-slate-300/80 text-center">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-b from-white via-rose-50 to-rose-100 border-t border-t-white border-x border-rose-200 border-b-2 border-b-rose-300 shadow-[0_4px_10px_rgba(225,29,72,0.18)] flex items-center justify-center text-rose-600 mb-1.5">
                <Lock className="w-4 h-4 stroke-[2.4]" />
              </div>
              <div className="text-[11px] font-black text-slate-900 font-mono uppercase">
                ROSTER DIKUNCI
              </div>
              <div className="text-[8px] font-mono text-slate-600 mt-0.5">
                12 Akun Karyawan Dibekukan
              </div>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-[7.5px] font-mono font-bold text-rose-700">
                <Lock className="w-2 h-2" /> RESTRICTED
              </div>
            </div>
          </div>

          {/* Footer Roster */}
          <div className="pt-1.5 border-t border-slate-200/80 mt-1 shrink-0 text-[8px] font-mono text-slate-500 flex items-center justify-between">
            <span className="text-rose-600 font-bold flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> DIKUNCI
            </span>
            <span className="text-rose-700 font-bold">CIRCUIT BREAKER</span>
          </div>
        </div>
      </div>
    </div>
  );
};
