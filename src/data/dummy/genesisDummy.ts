/**
 * DUMMY DATA: GENESIS ALGORITHMIC PIPELINE
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
 */

export interface AlgoModel {
  name: string;
  version: string;
  architecture: string;
  sharpeRatio: string;
  winRate: string;
  backtestPnl: string;
  stage: 'ALPHA LIVE' | 'INCUBATION' | 'STRESS TEST';
}

export const ALGO_MODELS: AlgoModel[] = [
  { name: 'KAIROS-GENESIS V4', version: '4.2.1', architecture: 'Deep Reinforcement RL-Q', sharpeRatio: '3.84', winRate: '79.2%', backtestPnl: '+$6,420,000', stage: 'ALPHA LIVE' },
  { name: 'AETHER ARB HFT', version: '2.0.8', architecture: 'Cross-L2 Microstructure', sharpeRatio: '4.12', winRate: '82.5%', backtestPnl: '+$4,890,000', stage: 'ALPHA LIVE' },
  { name: 'NEBULA STAT-ARB', version: '1.4.0', architecture: 'Ornstein-Uhlenbeck Pairs', sharpeRatio: '3.25', winRate: '74.0%', backtestPnl: '+$2,840,000', stage: 'STRESS TEST' },
  { name: 'CHRONOS SENTIMENT', version: '3.1.0', architecture: 'LLM Multi-Modal Signal', sharpeRatio: '2.95', winRate: '70.8%', backtestPnl: '+$1,940,000', stage: 'INCUBATION' },
  { name: 'TITAN VOL SURF', version: '1.0.2', architecture: 'SVI Volatility Arbitrage', sharpeRatio: '3.60', winRate: '76.4%', backtestPnl: '+$1,450,000', stage: 'INCUBATION' },
];
