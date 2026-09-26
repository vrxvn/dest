/**
 * DUMMY DATA: FX FLOW (INSTITUTIONAL DESK)
 * Angka proporsional & masuk akal (Total FX Volume ~$6.5M).
 */

export interface CurrencyFlow {
  code: string;
  name: string;
  share: string;
  volume: string;
  netFlow: string;
  isPositive: boolean;
  color: string;
  bg: string;
}

export interface FxPairData {
  pair: string;
  spotRate: string;
  change24h: string;
  isChangePositive: boolean;
  volume24h: string;
  netBias: 'BUY (LONG)' | 'SELL (SHORT)';
  spreadBps: string;
}

export interface LiquidityPool {
  poolName: string;
  venueType: string;
  volumeMatched: string;
  clsStatus: 'SETTLED' | 'MATCHED' | 'CONFIRMED';
  latencyMs: string;
}

export interface FxDeskTrader {
  traderId: string;
  pairFocus: string;
  notional: string;
  pnl: string;
  isPnlPositive: boolean;
  latencyMs: string;
}

export interface DevisaDetail {
  code: string;
  name: string;
  subName: string;
  badge: string;
  share: string;
  volume: string;
  netFlow: string;
  isPositive: boolean;
  color: string;
  bg: string;
  spotPair: string;
  spotRate: string;
  change24h: string;
  isChangePositive: boolean;
  spread: string;
  latency: string;
  matchedVenue: string;
  settlementRate: string;
  description: string;
  reserveRatio: string;
  curveTenors: Array<{ tenor: string; rate: string; spread: string }>;
  interbankPairs: Array<{ pair: string; rate: string; vol: string; change: string; isUp: boolean }>;
}

export const FOUR_MAJOR_DEVISA: DevisaDetail[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    subName: 'Dolar Amerika Serikat (Cadangan Devisa Primer)',
    badge: 'GLOBAL RESERVE • FEDWIRE',
    share: '44.2%',
    volume: '$2,850,000',
    netFlow: '+$420,000',
    isPositive: true,
    color: '#4f46e5',
    bg: 'bg-indigo-600',
    spotPair: 'DXY INDEX',
    spotRate: '105.42',
    change24h: '+0.42%',
    isChangePositive: true,
    spread: '0.08 bps',
    latency: '3.8 ms',
    matchedVenue: 'CME & Fedwire Interbank Prime',
    settlementRate: '99.99%',
    description: 'Pilar utama likuiditas pasar global dengan volume transaksi terbesar dan settlement PVP CLS instan.',
    reserveRatio: '58.4% Cadangan Global',
    curveTenors: [
      { tenor: 'O/N', rate: '5.32%', spread: '+0.01' },
      { tenor: '1M', rate: '5.28%', spread: '+0.02' },
      { tenor: '3M', rate: '5.15%', spread: '+0.04' },
      { tenor: '6M', rate: '4.98%', spread: '+0.05' },
      { tenor: '1Y', rate: '4.75%', spread: '+0.08' },
    ],
    interbankPairs: [
      { pair: 'EUR/USD', rate: '1.0892', vol: '$1.45M', change: '-0.24%', isUp: false },
      { pair: 'USD/JPY', rate: '154.65', vol: '$1.12M', change: '+0.58%', isUp: true },
      { pair: 'GBP/USD', rate: '1.2740', vol: '$820K', change: '+0.15%', isUp: true },
      { pair: 'USD/CHF', rate: '0.9024', vol: '$540K', change: '+0.09%', isUp: true },
    ],
  },
  {
    code: 'EUR',
    name: 'Eurozone Euro',
    subName: 'Euro (Pasar Tunggal Uni Eropa)',
    badge: 'EUROZONE CORE • TARGET2',
    share: '24.5%',
    volume: '$1,650,000',
    netFlow: '-$180,000',
    isPositive: false,
    color: '#06b6d4',
    bg: 'bg-cyan-500',
    spotPair: 'EUR/USD',
    spotRate: '1.0892',
    change24h: '-0.24%',
    isChangePositive: false,
    spread: '0.12 bps',
    latency: '4.2 ms',
    matchedVenue: 'EBS Spot ICAP (LD4 London)',
    settlementRate: '99.96%',
    description: 'Jalur kliring cross-border ECB, likuiditas interbank Frankfurt & London dengan spread ketat.',
    reserveRatio: '20.1% Cadangan Global',
    curveTenors: [
      { tenor: 'O/N', rate: '3.65%', spread: '+0.02' },
      { tenor: '1M', rate: '3.58%', spread: '+0.03' },
      { tenor: '3M', rate: '3.42%', spread: '+0.05' },
      { tenor: '6M', rate: '3.25%', spread: '+0.06' },
      { tenor: '1Y', rate: '3.08%', spread: '+0.09' },
    ],
    interbankPairs: [
      { pair: 'EUR/USD', rate: '1.0892', vol: '$1.45M', change: '-0.24%', isUp: false },
      { pair: 'EUR/GBP', rate: '0.8549', vol: '$580K', change: '-0.38%', isUp: false },
      { pair: 'EUR/JPY', rate: '168.45', vol: '$640K', change: '+0.34%', isUp: true },
      { pair: 'EUR/CHF', rate: '0.9830', vol: '$320K', change: '-0.15%', isUp: false },
    ],
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    subName: 'Yen Jepang (Devisa Asia & Safe Haven)',
    badge: 'BOJ MONETARY • CARRY ROUTE',
    share: '14.8%',
    volume: '$980,000',
    netFlow: '-$120,000',
    isPositive: false,
    color: '#f59e0b',
    bg: 'bg-amber-500',
    spotPair: 'USD/JPY',
    spotRate: '154.65',
    change24h: '+0.58%',
    isChangePositive: true,
    spread: '0.18 bps',
    latency: '5.1 ms',
    matchedVenue: 'Tokyo TY3 JPX / BATS Direct',
    settlementRate: '99.94%',
    description: 'Mata uang safe haven primer Asia dengan pemanfaatan carry trade arb bunga rendah BoJ.',
    reserveRatio: '5.7% Cadangan Global',
    curveTenors: [
      { tenor: 'O/N', rate: '0.25%', spread: '+0.01' },
      { tenor: '1M', rate: '0.28%', spread: '+0.02' },
      { tenor: '3M', rate: '0.35%', spread: '+0.04' },
      { tenor: '6M', rate: '0.45%', spread: '+0.05' },
      { tenor: '1Y', rate: '0.62%', spread: '+0.07' },
    ],
    interbankPairs: [
      { pair: 'USD/JPY', rate: '154.65', vol: '$1.12M', change: '+0.58%', isUp: true },
      { pair: 'EUR/JPY', rate: '168.45', vol: '$640K', change: '+0.34%', isUp: true },
      { pair: 'GBP/JPY', rate: '197.10', vol: '$450K', change: '+0.72%', isUp: true },
      { pair: 'AUD/JPY', rate: '102.88', vol: '$380K', change: '+0.26%', isUp: true },
    ],
  },
  {
    code: 'GBP',
    name: 'British Pound',
    subName: 'Poundsterling Inggris (Cable Interbank Desk)',
    badge: 'BANK OF ENGLAND • G10 CABLE',
    share: '9.6%',
    volume: '$640,000',
    netFlow: '+$95,000',
    isPositive: true,
    color: '#10b981',
    bg: 'bg-emerald-500',
    spotPair: 'GBP/USD',
    spotRate: '1.2740',
    change24h: '+0.15%',
    isChangePositive: true,
    spread: '0.22 bps',
    latency: '4.5 ms',
    matchedVenue: 'LMAX Global / Currenex Aggregator',
    settlementRate: '99.98%',
    description: 'Pusat likuiditas sesi Eropa/London dengan kedalaman order book cable dan volume cross swap tinggi.',
    reserveRatio: '4.8% Cadangan Global',
    curveTenors: [
      { tenor: 'O/N', rate: '5.00%', spread: '+0.02' },
      { tenor: '1M', rate: '4.95%', spread: '+0.03' },
      { tenor: '3M', rate: '4.82%', spread: '+0.05' },
      { tenor: '6M', rate: '4.68%', spread: '+0.06' },
      { tenor: '1Y', rate: '4.45%', spread: '+0.08' },
    ],
    interbankPairs: [
      { pair: 'GBP/USD', rate: '1.2740', vol: '$820K', change: '+0.15%', isUp: true },
      { pair: 'EUR/GBP', rate: '0.8549', vol: '$580K', change: '-0.38%', isUp: false },
      { pair: 'GBP/JPY', rate: '197.10', vol: '$450K', change: '+0.72%', isUp: true },
      { pair: 'GBP/CHF', rate: '1.1495', vol: '$280K', change: '+0.21%', isUp: true },
    ],
  },
];

export const CURRENCY_FLOWS: CurrencyFlow[] = [
  { code: 'USD', name: 'US Dollar', share: '44.2%', volume: '$2,850,000', netFlow: '+$420,000', isPositive: true, color: '#4f46e5', bg: 'bg-indigo-600' },
  { code: 'EUR', name: 'Eurozone', share: '24.5%', volume: '$1,650,000', netFlow: '-$180,000', isPositive: false, color: '#06b6d4', bg: 'bg-cyan-500' },
  { code: 'JPY', name: 'Japanese Yen', share: '14.8%', volume: '$980,000', netFlow: '-$120,000', isPositive: false, color: '#f59e0b', bg: 'bg-amber-500' },
  { code: 'GBP', name: 'British Pound', share: '9.6%', volume: '$640,000', netFlow: '+$95,000', isPositive: true, color: '#10b981', bg: 'bg-emerald-500' },
  { code: 'CHF', name: 'Swiss Franc', share: '4.2%', volume: '$280,000', netFlow: '+$42,000', isPositive: true, color: '#8b5cf6', bg: 'bg-purple-500' },
  { code: 'AUD', name: 'Australian Dollar', share: '2.7%', volume: '$190,000', netFlow: '+$28,000', isPositive: true, color: '#ec4899', bg: 'bg-pink-500' },
];

export const FX_PAIRS: FxPairData[] = [
  { pair: 'EUR/USD', spotRate: '1.0892', change24h: '-0.24%', isChangePositive: false, volume24h: '$1,450,000', netBias: 'SELL (SHORT)', spreadBps: '0.12 bps' },
  { pair: 'USD/JPY', spotRate: '154.65', change24h: '+0.58%', isChangePositive: true, volume24h: '$1,120,000', netBias: 'BUY (LONG)', spreadBps: '0.18 bps' },
  { pair: 'GBP/USD', spotRate: '1.2740', change24h: '+0.15%', isChangePositive: true, volume24h: '$820,000', netBias: 'BUY (LONG)', spreadBps: '0.22 bps' },
  { pair: 'USD/CHF', spotRate: '0.9024', change24h: '+0.09%', isChangePositive: true, volume24h: '$540,000', netBias: 'BUY (LONG)', spreadBps: '0.25 bps' },
  { pair: 'AUD/USD', spotRate: '0.6652', change24h: '-0.31%', isChangePositive: false, volume24h: '$380,000', netBias: 'SELL (SHORT)', spreadBps: '0.30 bps' },
];

export const LIQUIDITY_POOLS: LiquidityPool[] = [
  { poolName: 'LMAX INTERBANK PRIME', venueType: 'ECN / NO-LAST-LOOK', volumeMatched: '$2,450,000', clsStatus: 'SETTLED', latencyMs: '4.2 ms' },
  { poolName: 'EBS SPOT ICAP (LDN4)', venueType: 'CENTRAL LIMIT BOOK', volumeMatched: '$1,850,000', clsStatus: 'SETTLED', latencyMs: '5.1 ms' },
  { poolName: 'BLOOMBERG FXGO HUB', venueType: 'MULTI-BANK RFQ', volumeMatched: '$1,250,000', clsStatus: 'MATCHED', latencyMs: '6.8 ms' },
  { poolName: 'CURRENEX FX ENGINE', venueType: 'AGGREGATED STREAM', volumeMatched: '$780,000', clsStatus: 'CONFIRMED', latencyMs: '7.4 ms' },
  { poolName: 'CLS CONTINUOUS LINK', venueType: 'PVP SETTLEMENT', volumeMatched: '$520,000', clsStatus: 'SETTLED', latencyMs: '8.0 ms' },
];

export const FX_DESK_TRADERS: FxDeskTrader[] = [
  { traderId: 'FX-012', pairFocus: 'EUR/USD & G10 Majors', notional: '$1,450,000', pnl: '+$48,500', isPnlPositive: true, latencyMs: '5.4 ms' },
  { traderId: 'FX-047', pairFocus: 'USD/JPY & Carry Arb', notional: '$1,120,000', pnl: '+$38,200', isPnlPositive: true, latencyMs: '6.2 ms' },
  { traderId: 'FX-088', pairFocus: 'GBP/USD & Cross Swaps', notional: '$820,000', pnl: '+$24,800', isPnlPositive: true, latencyMs: '6.8 ms' },
  { traderId: 'FX-104', pairFocus: 'Commodity FX (AUD/CAD)', notional: '$540,000', pnl: '+$18,400', isPnlPositive: true, latencyMs: '7.5 ms' },
  { traderId: 'FX-211', pairFocus: 'CHF & Safe Haven Bias', notional: '$420,000', pnl: '+$12,100', isPnlPositive: true, latencyMs: '8.1 ms' },
];
