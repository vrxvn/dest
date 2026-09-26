/**
 * DUMMY DATA: OVERVIEW (DASHBOARD GRID)
 * Angka-angka proporsional & masuk akal (AUM ~$15.3M).
 */

export interface EmployeeTrade {
  id: string;
  employee: string;
  market: string;
  action: 'BUY' | 'SELL' | 'TP';
  positionValue: string;
  floatingPnl: string;
  isProfit?: boolean;
  speed?: 'FAST' | 'MODERATE';
  timestamp: string;
}

export const INITIAL_EMPLOYEE_TRADES: EmployeeTrade[] = [
  {
    id: 't-1',
    employee: 'T.132',
    market: 'NVDA GLOBAL',
    positionValue: '$48,500',
    floatingPnl: '+$3,420',
    isProfit: true,
    action: 'BUY',
    speed: 'FAST',
    timestamp: 'Baru saja',
  },
  {
    id: 't-2',
    employee: 'T.084',
    market: 'S&P 500',
    positionValue: '$85,000',
    floatingPnl: '+$5,120',
    isProfit: true,
    action: 'BUY',
    speed: 'FAST',
    timestamp: '4 dtk lalu',
  },
  {
    id: 't-3',
    employee: 'T.215',
    market: 'XAU (EMAS)',
    positionValue: '$62,000',
    floatingPnl: '-$450',
    isProfit: false,
    action: 'SELL',
    speed: 'MODERATE',
    timestamp: '9 dtk lalu',
  },
  {
    id: 't-4',
    employee: 'T.047',
    market: 'BTC/USDT',
    positionValue: '$125,000',
    floatingPnl: '+$8,450',
    isProfit: true,
    action: 'BUY',
    speed: 'FAST',
    timestamp: '15 dtk lalu',
  },
  {
    id: 't-5',
    employee: 'T.309',
    market: 'NASDAQ 100',
    positionValue: '$74,000',
    floatingPnl: '+$4,200',
    isProfit: true,
    action: 'BUY',
    speed: 'FAST',
    timestamp: '22 dtk lalu',
  },
  {
    id: 't-6',
    employee: 'T.198',
    market: 'EUR/USD',
    positionValue: '$58,000',
    floatingPnl: '+$1,850',
    isProfit: true,
    action: 'TP',
    speed: 'MODERATE',
    timestamp: '30 dtk lalu',
  },
];

export const TRADE_STREAM_POOL: Omit<EmployeeTrade, 'id' | 'timestamp'>[] = [
  { employee: 'T.132', market: 'NVDA GLOBAL', positionValue: '$48,500', floatingPnl: '+$3,420', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.084', market: 'S&P 500', positionValue: '$85,000', floatingPnl: '+$5,120', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.215', market: 'XAU (EMAS)', positionValue: '$62,000', floatingPnl: '-$450', isProfit: false, action: 'SELL', speed: 'MODERATE' },
  { employee: 'T.047', market: 'BTC/USDT', positionValue: '$125,000', floatingPnl: '+$8,450', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.309', market: 'NASDAQ 100', positionValue: '$74,000', floatingPnl: '+$4,200', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.198', market: 'EUR/USD', positionValue: '$58,000', floatingPnl: '+$1,850', isProfit: true, action: 'TP', speed: 'MODERATE' },
  { employee: 'T.132', market: 'ETH/USDT', positionValue: '$65,000', floatingPnl: '+$3,600', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.084', market: 'TSLA GLOBAL', positionValue: '$42,000', floatingPnl: '+$2,750', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.215', market: 'BRENT OIL', positionValue: '$38,000', floatingPnl: '-$320', isProfit: false, action: 'SELL', speed: 'MODERATE' },
  { employee: 'T.412', market: 'SOL/USDT', positionValue: '$55,000', floatingPnl: '+$4,150', isProfit: true, action: 'BUY', speed: 'FAST' },
  { employee: 'T.309', market: 'MSFT GLOBAL', positionValue: '$68,000', floatingPnl: '+$2,900', isProfit: true, action: 'TP', speed: 'FAST' },
];

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

export const DUMMY_WALLET_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

export const TREASURY_METRICS = {
  totalAum: '$15,324,000.00',
  ytdReturn: '+27.4% YTD',
  treasuryAmount: '$4,850,000',
  treasuryYield: '+6.8% YIELD',
  stakingAmount: '$2,450,000',
  stakingApr: '8.2% APR',
};

export const PRIME_VAULT_METRICS = {
  coldVaultAmount: '$2,450,000',
  coldVaultStatus: 'SECURED',
  creditFacilityAmount: '$750,000',
  creditFacilityStatus: '28.5% USED',
  primeStatus: 'ONLINE • HSM L3',
};

export const EXECUTION_METRICS = {
  otc: {
    title: 'USDT → USD OTC BLOCK',
    amount: '+$350,000',
    status: 'FILLED',
    slippage: '0.001%',
    speed: '4.2ms',
  },
  arbitrage: {
    title: 'BTC LIQUIDITY ROUTE',
    amount: '+$850,000',
    status: 'SETTLED',
    poolsLinked: '3 POOLS LINKED',
    route: '99.99%',
  },
  strategySkill: {
    title: 'QUANT MOMENTUM & FLASH ARBITRAGE',
    realisedProfit: '+$384,250',
    roi: '+31.4%',
  },
};

export const ALLOCATION_METRICS = {
  utilized: '78.4%',
  status: 'OPTIMAL',
  liquid: '78%',
  yield: '62%',
};

export interface InstitutionalInvestor {
  code: string;
  name: string;
  investment: string;
  share: string;
  status: string;
}

export const GLOBAL_INSTITUTIONAL_INVESTMENTS = {
  totalInvestment: '$12,450,000',
  totalCount: '8 INSTITUSI',
  growth: '+27.4% YoY',
  investors: [
    {
      code: 'BX',
      name: 'Blackstone Multi-Strategy',
      investment: '$3,000,000',
      share: '24.1%',
      status: 'VERIFIED',
    },
    {
      code: 'ADQ',
      name: 'Abu Dhabi Sovereign Wealth',
      investment: '$2,500,000',
      share: '20.1%',
      status: 'VERIFIED',
    },
    {
      code: 'TMS',
      name: 'Temasek Global Macro',
      investment: '$1,800,000',
      share: '14.5%',
      status: 'VERIFIED',
    },
    {
      code: 'CAL',
      name: 'CalPERS Private Assets',
      investment: '$1,500,000',
      share: '12.0%',
      status: 'VERIFIED',
    },
    {
      code: 'SNB',
      name: 'Swiss National Wealth Desk',
      investment: '$1,200,000',
      share: '9.6%',
      status: 'VERIFIED',
    },
    {
      code: 'OTP',
      name: 'Ontario Teachers Pension',
      investment: '$1,000,000',
      share: '8.0%',
      status: 'VERIFIED',
    },
    {
      code: 'RTH',
      name: 'Rothschild Capital Partners',
      investment: '$850,000',
      share: '6.8%',
      status: 'VERIFIED',
    },
    {
      code: 'TYO',
      name: 'Tokyo Prime Asset Custody',
      investment: '$600,000',
      share: '4.8%',
      status: 'VERIFIED',
    },
  ] as InstitutionalInvestor[],
};

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
