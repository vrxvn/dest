/**
 * DATA SURVEILLANCE & PEMANTAUAN TRADING KARYAWAN
 * Khusus untuk Owner / Head of Desk memantau seluruh transaksi, limit, dan posisi terbuka karyawan.
 */

export interface TraderEmployee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  division: string;
  divisionColor: string;
  status: 'IN_TRADE' | 'ACTIVE' | 'STANDBY';
  openPositionsCount: number; // Berapa biji posisi sedang terbuka
  totalLotExposure: string;
  allocatedCapital: string;
  usedMargin: string;
  floatingPnl: string;
  floatingPnlNum: number;
  realizedToday: string;
  winRate: string;
  drawdown: string;
}

export interface EmployeePosition {
  id: string; // Tiket transaksi
  traderId: string;
  traderName: string;
  instrument: string;
  category: 'CRYPTO' | 'FOREX' | 'METALS' | 'EQUITIES';
  direction: 'BUY' | 'SELL';
  orderExecution: 'MARKET' | 'LIMIT TRIGGER';
  lots: number;
  sizeUsd: string;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit: number;
  floatingPnl: number;
  floatingPnlStr: string;
  floatingPnlPercent: string;
  isProfit: boolean;
  marginUsed: string;
  openTime: string;
  duration: string;
}

export interface EmployeePendingOrder {
  id: string;
  traderId: string;
  traderName: string;
  instrument: string;
  type: 'LIMIT BUY' | 'LIMIT SELL' | 'STOP BUY' | 'STOP SELL';
  lots: number;
  targetPrice: number;
  currentPrice: number;
  distance: string;
  takeProfit: number;
  stopLoss: number;
  placedTime: string;
  expiration: string;
  status: 'PENDING' | 'TRIGGERED';
}

export interface EmployeeTradeHistory {
  id: string;
  traderId: string;
  traderName: string;
  instrument: string;
  direction: 'BUY' | 'SELL';
  lots: number;
  entryPrice: number;
  closePrice: number;
  realizedPnl: string;
  isProfit: boolean;
  pipsOrPoints: string;
  closedReason: 'TAKE_PROFIT' | 'STOP_LOSS' | 'MANUAL_CLOSE';
  openTime: string;
  closeTime: string;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const TRADER_EMPLOYEES: TraderEmployee[] = [
  {
    id: 'TRD-01',
    name: 'Rio Sterling',
    avatar: 'RS',
    role: 'Senior Crypto Arbitrageur',
    division: 'CRYPTO DESK',
    divisionColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    status: 'IN_TRADE',
    openPositionsCount: 3,
    totalLotExposure: '8.50 Lot ($714K)',
    allocatedCapital: '$2,850,000',
    usedMargin: '$425,000 (14.9%)',
    floatingPnl: '+$24,650.00',
    floatingPnlNum: 24650,
    realizedToday: '+$52,300.00',
    winRate: '78.4%',
    drawdown: '-1.4%',
  },
  {
    id: 'TRD-02',
    name: 'Kevin Vance',
    avatar: 'KV',
    role: 'HFT & Liquidity Scalper',
    division: 'HFT ALGO DESK',
    divisionColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    status: 'IN_TRADE',
    openPositionsCount: 2,
    totalLotExposure: '4.20 Lot ($352K)',
    allocatedCapital: '$2,200,000',
    usedMargin: '$280,000 (12.7%)',
    floatingPnl: '+$8,940.00',
    floatingPnlNum: 8940,
    realizedToday: '+$34,800.00',
    winRate: '74.2%',
    drawdown: '-0.9%',
  },
  {
    id: 'TRD-03',
    name: 'Sarah Chen',
    avatar: 'SC',
    role: 'Gold & Commodities Strategist',
    division: 'METALS DESK',
    divisionColor: 'bg-amber-50 text-amber-700 border-amber-200',
    status: 'IN_TRADE',
    openPositionsCount: 2,
    totalLotExposure: '6.00 Lot ($480K)',
    allocatedCapital: '$1,650,000',
    usedMargin: '$245,000 (14.8%)',
    floatingPnl: '+$6,420.00',
    floatingPnlNum: 6420,
    realizedToday: '+$21,450.00',
    winRate: '71.5%',
    drawdown: '-1.8%',
  },
  {
    id: 'TRD-04',
    name: 'Reza Rossi',
    avatar: 'RR',
    role: 'G10 Institutional FX Trader',
    division: 'FOREX DESK',
    divisionColor: 'bg-purple-50 text-purple-700 border-purple-200',
    status: 'IN_TRADE',
    openPositionsCount: 2,
    totalLotExposure: '12.00 Lot ($1.2M)',
    allocatedCapital: '$1,450,000',
    usedMargin: '$165,000 (11.3%)',
    floatingPnl: '+$3,210.00',
    floatingPnlNum: 3210,
    realizedToday: '+$18,900.00',
    winRate: '69.8%',
    drawdown: '-1.2%',
  },
  {
    id: 'TRD-05',
    name: 'David Weber',
    avatar: 'DW',
    role: 'Tech Equities & Derivatives',
    division: 'EQUITIES DESK',
    divisionColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    status: 'ACTIVE',
    openPositionsCount: 1,
    totalLotExposure: '2.50 Lot ($210K)',
    allocatedCapital: '$1,200,000',
    usedMargin: '$120,000 (10.0%)',
    floatingPnl: '+$1,840.00',
    floatingPnlNum: 1840,
    realizedToday: '+$12,400.00',
    winRate: '68.0%',
    drawdown: '-2.1%',
  },
  {
    id: 'TRD-06',
    name: 'Dimas Pratama',
    avatar: 'DP',
    role: 'Junior Flow Execution',
    division: 'CRYPTO DESK',
    divisionColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    status: 'STANDBY',
    openPositionsCount: 0,
    totalLotExposure: '0.00 Lot ($0)',
    allocatedCapital: '$650,000',
    usedMargin: '$0 (0%)',
    floatingPnl: '$0.00',
    floatingPnlNum: 0,
    realizedToday: '+$8,400.00',
    winRate: '66.7%',
    drawdown: '-0.5%',
  },
];

export const ALL_EMPLOYEE_POSITIONS: EmployeePosition[] = [
  {
    id: 'POS-89201',
    traderId: 'TRD-01',
    traderName: 'Rio Sterling',
    instrument: 'BTC/USDT',
    category: 'CRYPTO',
    direction: 'BUY',
    orderExecution: 'MARKET',
    lots: 4.5,
    sizeUsd: '$378,370',
    entryPrice: 83450.0,
    currentPrice: 84082.0,
    stopLoss: 82500.0,
    takeProfit: 86200.0,
    floatingPnl: 14220.0,
    floatingPnlStr: '+$14,220.00',
    floatingPnlPercent: '+3.76%',
    isProfit: true,
    marginUsed: '$189,185',
    openTime: '07:15:20 WIB',
    duration: '1j 55m',
  },
  {
    id: 'POS-89204',
    traderId: 'TRD-01',
    traderName: 'Rio Sterling',
    instrument: 'BTC/USDT',
    category: 'CRYPTO',
    direction: 'BUY',
    orderExecution: 'LIMIT TRIGGER',
    lots: 2.5,
    sizeUsd: '$210,205',
    entryPrice: 83780.0,
    currentPrice: 84082.0,
    stopLoss: 82800.0,
    takeProfit: 85500.0,
    floatingPnl: 6550.0,
    floatingPnlStr: '+$6,550.00',
    floatingPnlPercent: '+3.12%',
    isProfit: true,
    marginUsed: '$105,102',
    openTime: '08:04:11 WIB',
    duration: '1j 06m',
  },
  {
    id: 'POS-89212',
    traderId: 'TRD-01',
    traderName: 'Rio Sterling',
    instrument: 'ETH/USDT',
    category: 'CRYPTO',
    direction: 'BUY',
    orderExecution: 'MARKET',
    lots: 1.5,
    sizeUsd: '$125,425',
    entryPrice: 2640.0,
    currentPrice: 2690.0,
    stopLoss: 2580.0,
    takeProfit: 2780.0,
    floatingPnl: 3880.0,
    floatingPnlStr: '+$3,880.00',
    floatingPnlPercent: '+3.09%',
    isProfit: true,
    marginUsed: '$62,712',
    openTime: '08:35:40 WIB',
    duration: '35m',
  },
  {
    id: 'POS-89218',
    traderId: 'TRD-02',
    traderName: 'Kevin Vance',
    instrument: 'BTC/USDT',
    category: 'CRYPTO',
    direction: 'BUY',
    orderExecution: 'LIMIT TRIGGER',
    lots: 2.2,
    sizeUsd: '$184,980',
    entryPrice: 83620.0,
    currentPrice: 84082.0,
    stopLoss: 83100.0,
    takeProfit: 85000.0,
    floatingPnl: 5240.0,
    floatingPnlStr: '+$5,240.00',
    floatingPnlPercent: '+2.83%',
    isProfit: true,
    marginUsed: '$92,490',
    openTime: '07:50:33 WIB',
    duration: '1j 20m',
  },
  {
    id: 'POS-89222',
    traderId: 'TRD-02',
    traderName: 'Kevin Vance',
    instrument: 'EUR/USD',
    category: 'FOREX',
    direction: 'SELL',
    orderExecution: 'MARKET',
    lots: 2.0,
    sizeUsd: '$167,000',
    entryPrice: 1.0865,
    currentPrice: 1.0842,
    stopLoss: 1.0910,
    takeProfit: 1.0780,
    floatingPnl: 3700.0,
    floatingPnlStr: '+$3,700.00',
    floatingPnlPercent: '+2.21%',
    isProfit: true,
    marginUsed: '$83,500',
    openTime: '08:12:05 WIB',
    duration: '58m',
  },
  {
    id: 'POS-89230',
    traderId: 'TRD-03',
    traderName: 'Sarah Chen',
    instrument: 'XAU/USD',
    category: 'METALS',
    direction: 'BUY',
    orderExecution: 'MARKET',
    lots: 4.0,
    sizeUsd: '$320,000',
    entryPrice: 2818.5,
    currentPrice: 2845.2,
    stopLoss: 2795.0,
    takeProfit: 2880.0,
    floatingPnl: 4800.0,
    floatingPnlStr: '+$4,800.00',
    floatingPnlPercent: '+1.50%',
    isProfit: true,
    marginUsed: '$160,000',
    openTime: '06:40:15 WIB',
    duration: '2j 30m',
  },
  {
    id: 'POS-89234',
    traderId: 'TRD-03',
    traderName: 'Sarah Chen',
    instrument: 'XAU/USD',
    category: 'METALS',
    direction: 'BUY',
    orderExecution: 'LIMIT TRIGGER',
    lots: 2.0,
    sizeUsd: '$160,000',
    entryPrice: 2832.0,
    currentPrice: 2845.2,
    stopLoss: 2810.0,
    takeProfit: 2875.0,
    floatingPnl: 1620.0,
    floatingPnlStr: '+$1,620.00',
    floatingPnlPercent: '+1.01%',
    isProfit: true,
    marginUsed: '$85,000',
    openTime: '08:20:45 WIB',
    duration: '50m',
  },
  {
    id: 'POS-89240',
    traderId: 'TRD-04',
    traderName: 'Reza Rossi',
    instrument: 'USD/JPY',
    category: 'FOREX',
    direction: 'BUY',
    orderExecution: 'MARKET',
    lots: 8.0,
    sizeUsd: '$800,000',
    entryPrice: 154.2,
    currentPrice: 154.65,
    stopLoss: 153.5,
    takeProfit: 155.8,
    floatingPnl: 2450.0,
    floatingPnlStr: '+$2,450.00',
    floatingPnlPercent: '+0.31%',
    isProfit: true,
    marginUsed: '$110,000',
    openTime: '07:28:10 WIB',
    duration: '1j 42m',
  },
  {
    id: 'POS-89245',
    traderId: 'TRD-04',
    traderName: 'Reza Rossi',
    instrument: 'EUR/USD',
    category: 'FOREX',
    direction: 'SELL',
    orderExecution: 'LIMIT TRIGGER',
    lots: 4.0,
    sizeUsd: '$400,000',
    entryPrice: 1.0855,
    currentPrice: 1.0842,
    stopLoss: 1.0895,
    takeProfit: 1.0790,
    floatingPnl: 760.0,
    floatingPnlStr: '+$760.00',
    floatingPnlPercent: '+0.19%',
    isProfit: true,
    marginUsed: '$55,000',
    openTime: '08:45:00 WIB',
    duration: '25m',
  },
  {
    id: 'POS-89250',
    traderId: 'TRD-05',
    traderName: 'David Weber',
    instrument: 'NVDA',
    category: 'EQUITIES',
    direction: 'BUY',
    orderExecution: 'MARKET',
    lots: 2.5,
    sizeUsd: '$210,000',
    entryPrice: 128.4,
    currentPrice: 131.75,
    stopLoss: 124.0,
    takeProfit: 138.0,
    floatingPnl: 1840.0,
    floatingPnlStr: '+$1,840.00',
    floatingPnlPercent: '+0.88%',
    isProfit: true,
    marginUsed: '$120,000',
    openTime: '08:10:14 WIB',
    duration: '1j 00m',
  },
];

export const ALL_EMPLOYEE_PENDING_ORDERS: EmployeePendingOrder[] = [
  {
    id: 'LMT-10491',
    traderId: 'TRD-01',
    traderName: 'Rio Sterling',
    instrument: 'BTC/USDT',
    type: 'LIMIT BUY',
    lots: 3.0,
    targetPrice: 83100.0,
    currentPrice: 84082.0,
    distance: '-$982 (1.1%)',
    takeProfit: 86500.0,
    stopLoss: 82200.0,
    placedTime: '08:15:30 WIB',
    expiration: 'GTC (Good Till Cancel)',
    status: 'PENDING',
  },
  {
    id: 'LMT-10494',
    traderId: 'TRD-02',
    traderName: 'Kevin Vance',
    instrument: 'BTC/USDT',
    type: 'LIMIT SELL',
    lots: 2.0,
    targetPrice: 85200.0,
    currentPrice: 84082.0,
    distance: '+$1,118 (1.3%)',
    takeProfit: 83800.0,
    stopLoss: 85900.0,
    placedTime: '08:30:12 WIB',
    expiration: 'GTC',
    status: 'PENDING',
  },
  {
    id: 'LMT-10502',
    traderId: 'TRD-03',
    traderName: 'Sarah Chen',
    instrument: 'XAU/USD',
    type: 'LIMIT BUY',
    lots: 2.5,
    targetPrice: 2825.0,
    currentPrice: 2845.2,
    distance: '-$20.2 (0.7%)',
    takeProfit: 2875.0,
    stopLoss: 2805.0,
    placedTime: '07:45:10 WIB',
    expiration: 'End of Day',
    status: 'PENDING',
  },
  {
    id: 'LMT-10515',
    traderId: 'TRD-04',
    traderName: 'Reza Rossi',
    instrument: 'GBP/USD',
    type: 'STOP BUY',
    lots: 5.0,
    targetPrice: 1.302,
    currentPrice: 1.2985,
    distance: '+35 pips',
    takeProfit: 1.312,
    stopLoss: 1.294,
    placedTime: '08:40:55 WIB',
    expiration: 'GTC',
    status: 'PENDING',
  },
  {
    id: 'LMT-10520',
    traderId: 'TRD-06',
    traderName: 'Dimas Pratama',
    instrument: 'ETH/USDT',
    type: 'LIMIT BUY',
    lots: 2.0,
    targetPrice: 2600.0,
    currentPrice: 2690.0,
    distance: '-$90.0 (3.3%)',
    takeProfit: 2750.0,
    stopLoss: 2540.0,
    placedTime: '08:50:18 WIB',
    expiration: 'GTC',
    status: 'PENDING',
  },
];

export const ALL_EMPLOYEE_TRADE_HISTORY: EmployeeTradeHistory[] = [
  {
    id: 'HIS-77401',
    traderId: 'TRD-01',
    traderName: 'Rio Sterling',
    instrument: 'BTC/USDT',
    direction: 'BUY',
    lots: 5.0,
    entryPrice: 82100.0,
    closePrice: 83950.0,
    realizedPnl: '+$28,450.00',
    isProfit: true,
    pipsOrPoints: '+1,850 pts',
    closedReason: 'TAKE_PROFIT',
    openTime: '04:12:00 WIB',
    closeTime: '06:58:30 WIB',
  },
  {
    id: 'HIS-77405',
    traderId: 'TRD-02',
    traderName: 'Kevin Vance',
    instrument: 'BTC/USDT',
    direction: 'SELL',
    lots: 3.0,
    entryPrice: 84200.0,
    closePrice: 83500.0,
    realizedPnl: '+$14,200.00',
    isProfit: true,
    pipsOrPoints: '+700 pts',
    closedReason: 'MANUAL_CLOSE',
    openTime: '05:30:15 WIB',
    closeTime: '07:15:00 WIB',
  },
  {
    id: 'HIS-77412',
    traderId: 'TRD-03',
    traderName: 'Sarah Chen',
    instrument: 'XAU/USD',
    direction: 'BUY',
    lots: 3.5,
    entryPrice: 2795.0,
    closePrice: 2835.0,
    realizedPnl: '+$15,800.00',
    isProfit: true,
    pipsOrPoints: '+40.0 pts',
    closedReason: 'TAKE_PROFIT',
    openTime: '03:10:45 WIB',
    closeTime: '06:20:10 WIB',
  },
  {
    id: 'HIS-77418',
    traderId: 'TRD-04',
    traderName: 'Reza Rossi',
    instrument: 'USD/JPY',
    direction: 'BUY',
    lots: 6.0,
    entryPrice: 153.8,
    closePrice: 154.5,
    realizedPnl: '+$9,650.00',
    isProfit: true,
    pipsOrPoints: '+70 pips',
    closedReason: 'TAKE_PROFIT',
    openTime: '04:45:00 WIB',
    closeTime: '07:05:22 WIB',
  },
  {
    id: 'HIS-77422',
    traderId: 'TRD-05',
    traderName: 'David Weber',
    instrument: 'NVDA',
    direction: 'BUY',
    lots: 2.0,
    entryPrice: 125.5,
    closePrice: 129.8,
    realizedPnl: '+$8,600.00',
    isProfit: true,
    pipsOrPoints: '+4.3 pts',
    closedReason: 'MANUAL_CLOSE',
    openTime: '02:00:10 WIB',
    closeTime: '05:40:00 WIB',
  },
];

// Generator data candlestick realistis untuk chart trading
export function generateCandleData(basePrice: number, pointsCount = 28): CandleData[] {
  const candles: CandleData[] = [];
  let current = basePrice * 0.985;
  const now = Date.now();

  for (let i = pointsCount - 1; i >= 0; i--) {
    const time = new Date(now - i * 15 * 60 * 1000).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const change = (Math.sin(i * 0.7) + (Math.random() - 0.45)) * (basePrice * 0.004);
    const open = current;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.0025);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.0025);
    const volume = Math.floor(Math.random() * 85 + 25);

    candles.push({
      time,
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume,
    });

    current = close;
  }

  // Ensure last candle matches basePrice closely
  if (candles.length > 0) {
    const last = candles[candles.length - 1];
    last.close = basePrice;
    last.high = Math.max(last.high, basePrice);
    last.low = Math.min(last.low, basePrice);
  }

  return candles;
}
