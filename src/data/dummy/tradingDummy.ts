/**
 * DUMMY DATA: TRADING OPERATIONS
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
 */

export interface TeamTrader {
  traderId: string;
  managedCapital: string;
  executedSignals: number;
  winRate: string;
  realizedPnl: string;
  isProfit: boolean;
  avgLatencyMs: string;
}

export interface ActivePosition {
  instrument: string;
  direction: 'BUY' | 'SELL';
  positionSize: string;
  entryPrice: string;
  markPrice: string;
  floatingPnl: string;
  isProfit: boolean;
}

export interface ClearingVenue {
  venue: string;
  type: string;
  volumeRouted: string;
  fillRate: string;
  latencyMs: string;
  status: 'OPTIMAL' | 'CONNECTED';
}

export interface DivisionTopTrader {
  division: string;
  divisionShort: string;
  badgeColor: string;
  traderId: string;
  name: string;
  capital: string;
  pnl: string;
  pnlRate: string;
  winRate: string;
  latency: string;
  status: string;
}

export interface AssetBreakdownItem {
  asset: string;
  name: string;
  amount: string;
  share: string;
  color: string;
  bg: string;
}

export const CLEARING_VENUES: ClearingVenue[] = [
  {
    venue: 'CME INSTITUTIONAL',
    type: 'FUTURES',
    volumeRouted: '$28,400,000',
    fillRate: '99.98%',
    latencyMs: '6.8 ms',
    status: 'OPTIMAL',
  },
  {
    venue: 'BINANCE PRIME',
    type: 'PERP/SPOT',
    volumeRouted: '$24,200,000',
    fillRate: '99.94%',
    latencyMs: '8.2 ms',
    status: 'OPTIMAL',
  },
  {
    venue: 'LMAX GLOBAL',
    type: 'FX MAJORS',
    volumeRouted: '$14,650,000',
    fillRate: '100.0%',
    latencyMs: '7.4 ms',
    status: 'CONNECTED',
  },
  {
    venue: 'COINBASE CUSTODY',
    type: 'SPOT CUST',
    volumeRouted: '$11,200,000',
    fillRate: '99.96%',
    latencyMs: '9.5 ms',
    status: 'OPTIMAL',
  },
  {
    venue: 'DERIBIT BLOCK',
    type: 'OPTIONS',
    volumeRouted: '$6,200,000',
    fillRate: '99.90%',
    latencyMs: '10.1 ms',
    status: 'CONNECTED',
  },
];

export const TOP_DIVISION_TRADERS: DivisionTopTrader[] = [
  {
    division: 'CRYPTO & DIGITAL ASSETS',
    divisionShort: 'CRYPTO',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    traderId: 'TRD-084',
    name: 'A. Sterling',
    capital: '$24,800,000',
    pnl: '+$1,842,500',
    pnlRate: '+38.4%',
    winRate: '78.4%',
    latency: '8.4 ms',
    status: 'OPTIMAL',
  },
  {
    division: 'HIGH-BETA HFT ARBITRAGE',
    divisionShort: 'HFT ARB',
    badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
    traderId: 'TRD-132',
    name: 'K. Vance',
    capital: '$21,400,000',
    pnl: '+$1,328,900',
    pnlRate: '+31.2%',
    winRate: '74.2%',
    latency: '9.2 ms',
    status: 'OPTIMAL',
  },
  {
    division: 'COMMODITIES & METALS',
    divisionShort: 'METALS',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    traderId: 'TRD-215',
    name: 'M. Chen',
    capital: '$18,250,000',
    pnl: '+$842,300',
    pnlRate: '+24.6%',
    winRate: '71.5%',
    latency: '10.8 ms',
    status: 'PASSED',
  },
  {
    division: 'TECH EQUITIES FLOW',
    divisionShort: 'EQUITIES',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    traderId: 'TRD-309',
    name: 'H. Weber',
    capital: '$16,850,000',
    pnl: '+$438,750',
    pnlRate: '+19.8%',
    winRate: '68.0%',
    latency: '12.4 ms',
    status: 'COMPLIANT',
  },
  {
    division: 'FX & CROSS-CURRENCY',
    divisionShort: 'FX DESK',
    badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
    traderId: 'TRD-047',
    name: 'R. Rossi',
    capital: '$11,200,000',
    pnl: '+$614,200',
    pnlRate: '+22.5%',
    winRate: '69.8%',
    latency: '11.5 ms',
    status: 'PASSED',
  },
];

export const TEAM_PERFORMANCE: TeamTrader[] = [
  {
    traderId: 'TRD-084',
    managedCapital: '$24,800,000',
    executedSignals: 2840,
    winRate: '78.4%',
    realizedPnl: '+$1,842,500',
    isProfit: true,
    avgLatencyMs: '8.4 ms',
  },
  {
    traderId: 'TRD-132',
    managedCapital: '$21,400,000',
    executedSignals: 3120,
    winRate: '74.2%',
    realizedPnl: '+$1,328,900',
    isProfit: true,
    avgLatencyMs: '9.2 ms',
  },
  {
    traderId: 'TRD-215',
    managedCapital: '$18,250,000',
    executedSignals: 1490,
    winRate: '71.5%',
    realizedPnl: '+$842,300',
    isProfit: true,
    avgLatencyMs: '10.8 ms',
  },
  {
    traderId: 'TRD-047',
    managedCapital: '$11,200,000',
    executedSignals: 1180,
    winRate: '69.8%',
    realizedPnl: '+$614,200',
    isProfit: true,
    avgLatencyMs: '11.5 ms',
  },
  {
    traderId: 'TRD-309',
    managedCapital: '$9,000,000',
    executedSignals: 902,
    winRate: '68.0%',
    realizedPnl: '+$193,440',
    isProfit: true,
    avgLatencyMs: '12.4 ms',
  },
];

export const ACTIVE_POSITIONS: ActivePosition[] = [
  {
    instrument: 'BTC/USD PERPETUAL',
    direction: 'BUY',
    positionSize: '$38,200,000',
    entryPrice: '$64,180.00',
    markPrice: '$66,240.50',
    floatingPnl: '+$1,066,220',
    isProfit: true,
  },
  {
    instrument: 'XAU/USD GOLD SPOT',
    direction: 'SELL',
    positionSize: '$18,400,000',
    entryPrice: '$2,365.40',
    markPrice: '$2,352.10',
    floatingPnl: '+$103,400',
    isProfit: true,
  },
  {
    instrument: 'NVDA GLOBAL DEC26',
    direction: 'BUY',
    positionSize: '$16,850,000',
    entryPrice: '$128.40',
    markPrice: '$131.75',
    floatingPnl: '+$438,750',
    isProfit: true,
  },
  {
    instrument: 'EUR/USD INSTITUTIONAL',
    direction: 'SELL',
    positionSize: '$11,200,000',
    entryPrice: '1.0910',
    markPrice: '1.0892',
    floatingPnl: '+$18,520',
    isProfit: true,
  },
];

export const ASSET_BREAKDOWN: AssetBreakdownItem[] = [
  { asset: 'BTC', name: 'Bitcoin Perpetual', amount: '$38,200,000', share: '45.1%', color: '#4f46e5', bg: 'bg-indigo-600' },
  { asset: 'XAU', name: 'Gold Spot Hedge', amount: '$18,400,000', share: '21.7%', color: '#f59e0b', bg: 'bg-amber-500' },
  { asset: 'NVDA', name: 'Tech Equities', amount: '$16,850,000', share: '19.9%', color: '#10b981', bg: 'bg-emerald-500' },
  { asset: 'FX', name: 'Forex Majors', amount: '$11,200,000', share: '13.3%', color: '#06b6d4', bg: 'bg-cyan-500' },
];
