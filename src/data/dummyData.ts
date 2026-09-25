/**
 * DUMMY DATA REPOSITORY
 * 
 * Semua data tiruan/dummy untuk dashboard dipisahkan di file ini
 * agar memudahkan pembersihan (cleaning) atau penggantian dengan data API riil.
 */

// ==============================================================
// 1. DATA AKSI TRADING (GLOBAL DESK FEED)
// ==============================================================
export interface EmployeeTrade {
  id: string;
  employee: string; // e.g. "T.132"
  market: string; // e.g. "NVDA GLOBAL", "S&P 500", "XAU (EMAS)"
  action: 'BUY' | 'SELL' | 'TP';
  positionValue: string; // Nilai modal terpasang (e.g. "$5,200,000")
  floatingPnl: string; // Keuntungan/kerugian berjalan (e.g. "+$420,500")
  isProfit?: boolean;
  speed?: 'FAST' | 'MODERATE';
  timestamp: string;
}

export const INITIAL_EMPLOYEE_TRADES: EmployeeTrade[] = [
  {
    id: 't-1',
    employee: 'T.132',
    market: 'NVDA GLOBAL',
    positionValue: '$5,200,000',
    floatingPnl: '+$420,500',
    isProfit: true,
    action: 'BUY',
    speed: 'FAST',
    timestamp: 'Baru saja',
  },
  {
    id: 't-2',
    employee: 'T.084',
    market: 'S&P 500',
    positionValue: '$12,500,000',
    floatingPnl: '+$1,120,000',
    isProfit: true,
    action: 'BUY',
    speed: 'FAST',
    timestamp: '4 dtk lalu',
  },
  {
    id: 't-3',
    employee: 'T.215',
    market: 'XAU (EMAS)',
    positionValue: '$8,400,000',
    floatingPnl: '-$45,000',
    isProfit: false,
    action: 'SELL',
    speed: 'MODERATE',
    timestamp: '9 dtk lalu',
  },
  {
    id: 't-4',
    employee: 'T.047',
    market: 'BTC/USDT',
    positionValue: '$24,800,000',
    floatingPnl: '+$2,150,000',
    isProfit: true,
    action: 'BUY',
    speed: 'FAST',
    timestamp: '15 dtk lalu',
  },
  {
    id: 't-5',
    employee: 'T.309',
    market: 'NASDAQ 100',
    positionValue: '$9,600,000',
    floatingPnl: '+$680,000',
    isProfit: true,
    action: 'BUY',
    speed: 'FAST',
    timestamp: '22 dtk lalu',
  },
  {
    id: 't-6',
    employee: 'T.198',
    market: 'EUR/USD',
    positionValue: '$15,200,000',
    floatingPnl: '+$310,000',
    isProfit: true,
    action: 'TP',
    speed: 'MODERATE',
    timestamp: '30 dtk lalu',
  },
];

export const TRADE_STREAM_POOL: Omit<EmployeeTrade, 'id' | 'timestamp'>[] = [
  { employee: 'T.132', market: 'NVDA GLOBAL', positionValue: '$5,200,000', floatingPnl: '+$420,500', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.084', market: 'S&P 500', positionValue: '$12,500,000', floatingPnl: '+$1,120,000', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.215', market: 'XAU (EMAS)', positionValue: '$8,400,000', floatingPnl: '-$45,000', isProfit: false, action: 'SELL', speed: 'MODERATE' },
  { employee: 'T.047', market: 'BTC/USDT', positionValue: '$24,800,000', floatingPnl: '+$2,150,000', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.309', market: 'NASDAQ 100', positionValue: '$9,600,000', floatingPnl: '+$680,000', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.198', market: 'EUR/USD', positionValue: '$15,200,000', floatingPnl: '+$310,000', isProfit: true, action: 'TP', speed: 'MODERATE' },
  { employee: 'T.132', market: 'ETH/USDT', positionValue: '$18,400,000', floatingPnl: '+$890,000', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.084', market: 'TSLA GLOBAL', positionValue: '$7,850,000', floatingPnl: '+$540,000', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.215', market: 'BRENT OIL', positionValue: '$6,300,000', floatingPnl: '-$62,000', isProfit: false, action: 'SELL', speed: 'MODERATE' },
  { employee: 'T.412', market: 'SOL/USDT', positionValue: '$11,200,000', floatingPnl: '+$975,000', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.309', market: 'MSFT GLOBAL', positionValue: '$14,600,000', floatingPnl: '+$430,000', isProfit: true, action: 'TP', speed: 'FAST' },
];

// ==============================================================
// 2. DATA TIMEFRAME GRAFIK CAPITAL FLOW
// ==============================================================
export const CHART_DATASETS: Record<string, { pts1: number[]; pts2: number[] }> = {
  '1D': {
    pts1: [14, 16, 15, 18, 17, 19, 21, 20, 23, 22, 25, 27],
    pts2: [10, 11, 12, 13, 13, 15, 16, 15, 17, 16, 18, 20],
  },
  '1W': {
    pts1: [12, 15, 14, 17, 16, 20, 19, 24, 22, 26, 25, 29],
    pts2: [9, 10, 12, 11, 14, 13, 15, 17, 18, 20, 19, 22],
  },
  '1M': {
    pts1: [10, 13, 16, 14, 19, 23, 21, 27, 24, 30, 28, 34],
    pts2: [7, 10, 12, 11, 14, 17, 16, 19, 18, 22, 20, 25],
  },
  '1Y': {
    pts1: [8, 12, 16, 20, 18, 25, 29, 27, 34, 39, 44, 52],
    pts2: [6, 8, 11, 13, 15, 18, 21, 20, 24, 28, 31, 36],
  },
  'ALL': {
    pts1: [5, 9, 14, 18, 24, 30, 36, 43, 50, 58, 66, 76],
    pts2: [4, 7, 9, 13, 16, 21, 26, 30, 35, 41, 47, 54],
  },
};

// ==============================================================
// 3. DATA WALLET ADDRESS
// ==============================================================
export const DUMMY_WALLET_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

// ==============================================================
// 4. DATA METRIK TREASURY, STAKING & TOTAL AUM
// ==============================================================
export const TREASURY_METRICS = {
  totalAum: '$142,850,290.45',
  ytdReturn: '+28.4% YTD',
  treasuryAmount: '$84,200,000',
  treasuryYield: '+14.8% YIELD',
  stakingAmount: '$58,650,290',
  stakingApr: '18.2% APR',
};

// ==============================================================
// 5. DATA PRIME CUSTODY & VAULT
// ==============================================================
export const PRIME_VAULT_METRICS = {
  coldVaultAmount: '$42,850,000',
  coldVaultStatus: 'SECURED',
  creditFacilityAmount: '$12,000,000',
  creditFacilityStatus: '38.5% USED',
  primeStatus: 'ONLINE • HSM L3',
};

// ==============================================================
// 6. DATA EKSEKUSI OTC & ARBITRASE
// ==============================================================
export const EXECUTION_METRICS = {
  otc: {
    title: 'USDT → USD OTC BLOCK',
    amount: '+$5,200,000',
    status: 'FILLED',
    slippage: '0.001%',
    speed: '4.2ms',
  },
  arbitrage: {
    title: 'BTC LIQUIDITY ROUTE',
    amount: '+$12,450,000',
    status: 'SETTLED',
    poolsLinked: '3 POOLS LINKED',
    route: '99.99%',
  },
  strategySkill: {
    title: 'QUANT MOMENTUM & FLASH ARBITRAGE',
    realisedProfit: '+$3,842,500',
    roi: '+42.8%',
  },
};

// ==============================================================
// 7. DATA ALLOCATION GAUGE
// ==============================================================
export const ALLOCATION_METRICS = {
  utilized: '78.4%',
  status: 'OPTIMAL',
  liquid: '78%',
  yield: '62%',
};

// ==============================================================
// 8. DATA INVESTASI PERUSAHAAN FINANCIAL GLOBAL
// ==============================================================
export interface InstitutionalInvestor {
  code: string; // Singkatan perusahaan financial global
  name: string; // Nama perusahaan
  investment: string; // Jumlah investasi
  share: string; // Persentase
  status: string; // Status
}

export const GLOBAL_INSTITUTIONAL_INVESTMENTS = {
  totalInvestment: '$182,450,000',
  totalCount: '7 INSTITUSI',
  growth: '+31.4% YoY',
  investors: [
    {
      code: 'BLK',
      name: 'BlackRock Financial',
      investment: '$48,500,000',
      share: '26.6%',
      status: 'VERIFIED',
    },
    {
      code: 'VGD',
      name: 'Vanguard Group',
      investment: '$36,200,000',
      share: '19.8%',
      status: 'VERIFIED',
    },
    {
      code: 'FID',
      name: 'Fidelity Investments',
      investment: '$28,400,000',
      share: '15.6%',
      status: 'VERIFIED',
    },
    {
      code: 'CIT',
      name: 'Citadel Securities',
      investment: '$22,750,000',
      share: '12.5%',
      status: 'VERIFIED',
    },
    {
      code: 'GS',
      name: 'Goldman Sachs Global',
      investment: '$18,900,000',
      share: '10.4%',
      status: 'VERIFIED',
    },
    {
      code: 'JPM',
      name: 'JPMorgan Chase',
      investment: '$15,600,000',
      share: '8.5%',
      status: 'VERIFIED',
    },
    {
      code: 'MS',
      name: 'Morgan Stanley',
      investment: '$12,100,000',
      share: '6.6%',
      status: 'VERIFIED',
    },
  ] as InstitutionalInvestor[],
};

// ==============================================================
// 9. DATA LIVE TICKER PASAR GLOBAL
// ==============================================================
export const LIVE_MARKET_TICKERS = {
  crypto: {
    title: 'PASAR KRIPTO UTAMA',
    status: 'LIVE 24/7',
    primary: {
      symbol: 'BTC/USD',
      name: 'Bitcoin',
      price: '$96,420.00',
      change: '+3.84%',
      isUp: true,
    },
    secondary: {
      symbol: 'ETH/USD',
      name: 'Ethereum',
      price: '$3,480.50',
      change: '+5.12%',
      isUp: true,
    },
    footerLeft: 'VOL 24H $1.42B',
    footerRight: 'ORDERBOOK SOLID',
  },
  commodities: {
    title: 'KOMODITAS & VALUTA GLOBAL',
    status: 'MARKET OPEN',
    primary: {
      symbol: 'XAU/USD',
      name: 'Emas Murni',
      price: '$2,845.20',
      unit: '/oz',
      change: '+1.42%',
      isUp: true,
    },
    secondary: {
      symbol: 'BRENT',
      name: 'Minyak Mentah',
      price: '$78.60',
      unit: '/bbl',
      change: '+0.85%',
      isUp: true,
    },
    footerLeft: 'SPREAD 0.01',
    footerRight: 'TIER-1 LIQUIDITY',
  },
};


