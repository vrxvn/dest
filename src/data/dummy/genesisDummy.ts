/**
/**
 * DATA MODEL: GENESIS QUANTITATIVE AI & ALGO FOUNDRY
 * Realistic Hedge Fund R&D Architecture ($15.0M Incubated Capital)
 */

export interface AlgoModel {
  id: string;
  name: string;
  version: string;
  architecture: string;
  assetClass: 'CRYPTO' | 'FX' | 'MULTI-ASSET' | 'HFT';
  sharpeRatio: number;
  sortinoRatio: number;
  winRate: string;
  maxDrawdown: string;
  backtestPnl: string;
  allocatedCapital: string;
  stage: 'RESEARCH' | 'BACKTEST STRESS' | 'PAPER ALPHA' | 'LIVE PRODUCTION';
  description: string;
  latencyMicroseconds: number;
  confidence: string;
  chartPoints: number[];
}

export const ALGO_MODELS: AlgoModel[] = [
  {
    id: 'algo-1',
    name: 'KAIROS-GENESIS V4',
    version: '4.2.1',
    architecture: 'Deep Reinforcement RL-Q Transformer',
    assetClass: 'MULTI-ASSET',
    sharpeRatio: 3.84,
    sortinoRatio: 5.12,
    winRate: '79.2%',
    maxDrawdown: '-1.8%',
    backtestPnl: '+$642,000',
    allocatedCapital: '$4,500,000',
    stage: 'LIVE PRODUCTION',
    description: 'Multi-modal reinforcement learning engine extracting cross-market orderbook asymmetries.',
    latencyMicroseconds: 820,
    confidence: '99.4%',
    chartPoints: [100, 104, 108, 106, 114, 118, 124, 122, 131, 138, 142, 149],
  },
  {
    id: 'algo-2',
    name: 'AETHER ARB HFT',
    version: '2.0.8',
    architecture: 'Cross-L2 Microstructure Co-location',
    assetClass: 'CRYPTO',
    sharpeRatio: 4.12,
    sortinoRatio: 6.45,
    winRate: '82.5%',
    maxDrawdown: '-0.9%',
    backtestPnl: '+$489,000',
    allocatedCapital: '$3,800,000',
    stage: 'LIVE PRODUCTION',
    description: 'Sub-millisecond triangular arbitrage routing through FPGA and zero-gas execution pipes.',
    latencyMicroseconds: 340,
    confidence: '99.8%',
    chartPoints: [100, 103, 107, 111, 115, 119, 125, 129, 134, 140, 145, 152],
  },
  {
    id: 'algo-3',
    name: 'NEBULA STAT-ARB',
    version: '1.4.0',
    architecture: 'Ornstein-Uhlenbeck Coinscribed Pairs',
    assetClass: 'FX',
    sharpeRatio: 3.25,
    sortinoRatio: 4.18,
    winRate: '74.0%',
    maxDrawdown: '-2.4%',
    backtestPnl: '+$284,000',
    allocatedCapital: '$2,400,000',
    stage: 'PAPER ALPHA',
    description: 'Mean-reverting cointegration scanner capturing G10 interbank yield divergences.',
    latencyMicroseconds: 1240,
    confidence: '98.6%',
    chartPoints: [100, 102, 105, 103, 108, 112, 116, 114, 120, 125, 128, 134],
  },
  {
    id: 'algo-4',
    name: 'CHRONOS SENTIMENT',
    version: '3.1.0',
    architecture: 'LLM Macro-News Token Classifier',
    assetClass: 'MULTI-ASSET',
    sharpeRatio: 2.95,
    sortinoRatio: 3.82,
    winRate: '70.8%',
    maxDrawdown: '-3.1%',
    backtestPnl: '+$194,000',
    allocatedCapital: '$1,800,000',
    stage: 'BACKTEST STRESS',
    description: 'Real-time NLP parser processing Central Bank statements and geopolitical alerts in <15ms.',
    latencyMicroseconds: 2100,
    confidence: '97.2%',
    chartPoints: [100, 101, 104, 102, 107, 109, 113, 115, 118, 121, 124, 129],
  },
  {
    id: 'algo-5',
    name: 'TITAN VOL SURF',
    version: '1.0.2',
    architecture: 'SVI Stochastic Volatility Arbitrage',
    assetClass: 'CRYPTO',
    sharpeRatio: 3.60,
    sortinoRatio: 4.90,
    winRate: '76.4%',
    maxDrawdown: '-1.5%',
    backtestPnl: '+$145,000',
    allocatedCapital: '$1,500,000',
    stage: 'RESEARCH',
    description: 'Skew and term-structure arbitrage trading options delta neutrality across Deribit & CME.',
    latencyMicroseconds: 1680,
    confidence: '98.9%',
    chartPoints: [100, 103, 102, 106, 109, 112, 114, 117, 121, 123, 127, 131],
  },
  {
    id: 'algo-6',
    name: 'HYPERION LIQ-MAKER',
    version: '0.9.4',
    architecture: 'Avellaneda-Stoikov Adaptive Spreader',
    assetClass: 'HFT',
    sharpeRatio: 3.42,
    sortinoRatio: 4.50,
    winRate: '84.1%',
    maxDrawdown: '-1.1%',
    backtestPnl: '+$98,000',
    allocatedCapital: '$1,000,000',
    stage: 'RESEARCH',
    description: 'Continuous order placement on Tier-1 books capturing maker rebate yields with inventory skew.',
    latencyMicroseconds: 480,
    confidence: '99.1%',
    chartPoints: [100, 102, 104, 107, 109, 111, 114, 116, 119, 122, 124, 128],
  },
];

export interface LiveAiSignal {
  id: string;
  modelName: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'ARB_ROUTE';
  price: string;
  confidence: number;
  expectedAlphaBps: number;
  timeAgo: string;
}

export const INITIAL_AI_SIGNALS: LiveAiSignal[] = [
  { id: 'sig-1', modelName: 'KAIROS-GENESIS V4', symbol: 'BTC/USD', action: 'BUY', price: '$84,120', confidence: 91.4, expectedAlphaBps: 42.5, timeAgo: 'Baru saja' },
  { id: 'sig-2', modelName: 'AETHER ARB HFT', symbol: 'SOL ⇄ USDC', action: 'ARB_ROUTE', price: '$120.85', confidence: 96.8, expectedAlphaBps: 28.2, timeAgo: '3 dtk lalu' },
  { id: 'sig-3', modelName: 'NEBULA STAT-ARB', symbol: 'EUR/USD', action: 'SELL', price: '1.0842', confidence: 88.2, expectedAlphaBps: 18.4, timeAgo: '7 dtk lalu' },
  { id: 'sig-4', modelName: 'CHRONOS SENTIMENT', symbol: 'ETH/USD', action: 'BUY', price: '$2,692', confidence: 84.5, expectedAlphaBps: 34.0, timeAgo: '14 dtk lalu' },
  { id: 'sig-5', modelName: 'TITAN VOL SURF', symbol: 'BTC-28MAR-C', action: 'BUY', price: '$4,120', confidence: 89.0, expectedAlphaBps: 22.8, timeAgo: '22 dtk lalu' },
  { id: 'sig-6', modelName: 'KAIROS-GENESIS V4', symbol: 'GBP/USD', action: 'BUY', price: '1.2985', confidence: 93.1, expectedAlphaBps: 31.4, timeAgo: '35 dtk lalu' },
  { id: 'sig-7', modelName: 'AETHER ARB HFT', symbol: 'ETH/USDT', action: 'ARB_ROUTE', price: '$2,694.50', confidence: 97.4, expectedAlphaBps: 26.8, timeAgo: '48 dtk lalu' },
  { id: 'sig-8', modelName: 'CHRONOS SENTIMENT', symbol: 'SOL/USD', action: 'BUY', price: '$121.10', confidence: 87.6, expectedAlphaBps: 39.2, timeAgo: '1 mnt lalu' },
  { id: 'sig-9', modelName: 'NEBULA STAT-ARB', symbol: 'USD/JPY', action: 'SELL', price: '154.20', confidence: 90.2, expectedAlphaBps: 19.5, timeAgo: '1 mnt lalu' },
  { id: 'sig-10', modelName: 'TITAN VOL SURF', symbol: 'ETH-OPT-SKEW', action: 'ARB_ROUTE', price: '$184.20', confidence: 94.8, expectedAlphaBps: 25.1, timeAgo: '2 mnt lalu' },
  { id: 'sig-11', modelName: 'KAIROS-GENESIS V4', symbol: 'BTC/EUR', action: 'BUY', price: '€77,450', confidence: 92.0, expectedAlphaBps: 36.7, timeAgo: '2 mnt lalu' },
  { id: 'sig-12', modelName: 'AETHER ARB HFT', symbol: 'AVAX ⇄ USDC', action: 'ARB_ROUTE', price: '$28.45', confidence: 95.9, expectedAlphaBps: 21.0, timeAgo: '3 mnt lalu' },
];

export interface GpuClusterNode {
  nodeId: string;
  name: string;
  gpuCount: number;
  gpuModel: string;
  vramGb: number;
  loadPct: number;
  tempC: number;
  throughput: string;
  activeTask: string;
}

export const GPU_CLUSTER_NODES: GpuClusterNode[] = [
  { nodeId: 'NODE-H100-01', name: 'Alpha Cluster Node A', gpuCount: 8, gpuModel: 'NVIDIA H100 SXM5 80GB', vramGb: 640, loadPct: 98.4, tempC: 62, throughput: '3.8 TB/s Memory BW', activeTask: 'Deep RL Backpropagation (Kairos V4)' },
  { nodeId: 'NODE-H100-02', name: 'Alpha Cluster Node B', gpuCount: 8, gpuModel: 'NVIDIA H100 SXM5 80GB', vramGb: 640, loadPct: 96.2, tempC: 60, throughput: '3.7 TB/s Memory BW', activeTask: 'Monte Carlo 10M Runs (Chronos NLP)' },
  { nodeId: 'NODE-H100-03', name: 'Alpha Cluster Node C', gpuCount: 8, gpuModel: 'NVIDIA H100 SXM5 80GB', vramGb: 640, loadPct: 94.8, tempC: 59, throughput: '3.6 TB/s Memory BW', activeTask: 'Tick Replay Simulation (Aether Arb)' },
  { nodeId: 'NODE-H100-04', name: 'Alpha Cluster Node D', gpuCount: 8, gpuModel: 'NVIDIA H100 SXM5 80GB', vramGb: 640, loadPct: 91.5, tempC: 58, throughput: '3.5 TB/s Memory BW', activeTask: 'Hyperparameter Sweep (Titan Vol)' },
];

export const GENESIS_PERFORMANCE_TIMEFRAMES: Record<string, {
  labels: string[];
  genesisFund: number[];
  signal: number[];
  sp500: number[];
  btc: number[];
}> = {
  '1M': {
    labels: ['Hari 1', 'Hari 4', 'Hari 7', 'Hari 10', 'Hari 13', 'Hari 16', 'Hari 19', 'Hari 22', 'Hari 25', 'Hari 28', 'Hari 30'],
    genesisFund: [100.0, 101.8, 103.2, 104.9, 107.5, 109.8, 114.2, 118.6, 122.1, 125.8, 128.4],
    signal: [100.0, 101.2, 102.5, 103.8, 105.9, 107.8, 111.4, 114.8, 117.5, 119.8, 121.2],
    btc: [100.0, 102.4, 105.1, 103.2, 106.8, 105.4, 109.2, 112.5, 110.8, 113.2, 114.5],
    sp500: [100.0, 100.6, 101.4, 102.1, 103.0, 103.8, 104.5, 105.6, 106.4, 107.5, 108.2],
  },
  '3M': {
    labels: ['Mgg 1', 'Mgg 2', 'Mgg 3', 'Mgg 4', 'Mgg 6', 'Mgg 7', 'Mgg 8', 'Mgg 9', 'Mgg 10', 'Mgg 11', 'Mgg 12'],
    genesisFund: [100.0, 103.5, 106.8, 110.4, 114.8, 119.5, 124.6, 130.2, 135.5, 141.8, 148.5],
    signal: [100.0, 102.8, 105.2, 108.6, 112.0, 116.2, 120.4, 125.1, 129.8, 134.6, 140.2],
    btc: [100.0, 104.8, 108.5, 106.2, 112.8, 116.5, 114.2, 122.4, 126.8, 124.5, 132.0],
    sp500: [100.0, 101.2, 102.4, 103.8, 105.1, 106.5, 107.8, 109.2, 110.5, 111.9, 113.4],
  },
  '6M': {
    labels: ['Bln 1', 'Bln 1.5', 'Bln 2', 'Bln 2.5', 'Bln 3', 'Bln 3.5', 'Bln 4', 'Bln 4.5', 'Bln 5', 'Bln 5.5', 'Bln 6'],
    genesisFund: [100.0, 106.4, 112.8, 118.5, 125.2, 132.8, 141.5, 150.2, 160.8, 172.4, 184.6],
    signal: [100.0, 104.8, 110.2, 115.4, 121.5, 128.2, 135.8, 143.6, 152.4, 162.0, 171.8],
    btc: [100.0, 112.0, 108.5, 116.8, 122.4, 129.8, 125.4, 136.2, 144.5, 139.8, 154.2],
    sp500: [100.0, 101.8, 103.5, 105.2, 107.1, 109.4, 111.2, 113.5, 115.2, 117.4, 119.8],
  },
  '1Y': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    genesisFund: [100.0, 108.2, 117.5, 128.4, 139.6, 152.0, 166.4, 181.8, 198.5, 216.4, 235.8, 258.4],
    signal: [100.0, 106.5, 114.2, 123.8, 133.5, 144.8, 157.2, 170.5, 185.0, 200.4, 217.2, 236.0],
    btc: [100.0, 114.5, 124.0, 118.2, 131.5, 138.5, 134.2, 148.6, 162.0, 155.8, 174.2, 188.5],
    sp500: [100.0, 102.5, 104.5, 107.2, 110.2, 112.8, 115.4, 116.8, 119.2, 122.5, 125.4, 128.6],
  },
  'ALL': {
    labels: ['2023 H1', '2023 H2', '2024 H1', '2024 H2', '2025 H1', '2025 H2', '2026 Q1', '2026 NOW'],
    genesisFund: [100.0, 142.5, 198.2, 264.8, 348.5, 452.0, 568.4, 684.2],
    signal: [100.0, 135.2, 184.6, 242.0, 315.4, 404.8, 502.5, 608.4],
    btc: [100.0, 155.0, 198.4, 240.2, 225.8, 298.5, 342.0, 388.5],
    sp500: [100.0, 114.2, 128.6, 144.2, 160.8, 178.4, 195.2, 210.5],
  },
};
