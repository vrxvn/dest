/**
 * DUMMY DATA: GENESIS ALGORITHMIC PIPELINE
 * Angka backtest & laba realistis (Fund Scale ~$15.3M).
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
  { name: 'KAIROS-GENESIS V4', version: '4.2.1', architecture: 'Deep Reinforcement RL-Q', sharpeRatio: '3.84', winRate: '79.2%', backtestPnl: '+$642,000', stage: 'ALPHA LIVE' },
  { name: 'AETHER ARB HFT', version: '2.0.8', architecture: 'Cross-L2 Microstructure', sharpeRatio: '4.12', winRate: '82.5%', backtestPnl: '+$489,000', stage: 'ALPHA LIVE' },
  { name: 'NEBULA STAT-ARB', version: '1.4.0', architecture: 'Ornstein-Uhlenbeck Pairs', sharpeRatio: '3.25', winRate: '74.0%', backtestPnl: '+$284,000', stage: 'STRESS TEST' },
  { name: 'CHRONOS SENTIMENT', version: '3.1.0', architecture: 'LLM Multi-Modal Signal', sharpeRatio: '2.95', winRate: '70.8%', backtestPnl: '+$194,000', stage: 'INCUBATION' },
  { name: 'TITAN VOL SURF', version: '1.0.2', architecture: 'SVI Volatility Arbitrage', sharpeRatio: '3.60', winRate: '76.4%', backtestPnl: '+$145,000', stage: 'INCUBATION' },
];
