/**
 * DUMMY DATA: CRYPTO & DIGITAL ASSETS
 * Angka proporsional & masuk akal (Total Crypto Holdings ~$6.4M).
 */

export interface CryptoVault {
  asset: string;
  name: string;
  balance: string;
  notionalUsd: string;
  apy: string;
  stakedShare: string;
  custody: string;
}

export interface LiquidityPoolData {
  protocol: string;
  network: string;
  tvl: string;
  fee24h: string;
  impermanentRisk: string;
  status: 'ACTIVE' | 'BALANCED' | 'OPTIMAL';
}

export interface ValidatorNode {
  nodeId: string;
  chain: string;
  stakedAmount: string;
  uptime: string;
  slashingRisk: string;
  rewards24h: string;
}

export const CRYPTO_VAULTS: CryptoVault[] = [
  { asset: 'BTC', name: 'Wrapped / Institutional Cold', balance: '35.50 BTC', notionalUsd: '$2,425,000', apy: '4.8%', stakedShare: '37.9%', custody: 'Fireblocks HSM' },
  { asset: 'ETH', name: 'Lido stETH / Native Validator', balance: '420.00 ETH', notionalUsd: '$1,450,000', apy: '3.6%', stakedShare: '22.7%', custody: 'Coinbase Custody' },
  { asset: 'USDC', name: 'BlackRock BUIDL / Treasury', balance: '1,200,000 USDC', notionalUsd: '$1,200,000', apy: '5.2%', stakedShare: '18.8%', custody: 'Circle Direct' },
  { asset: 'SOL', name: 'Solana High-Speed Staking', balance: '5,800.00 SOL', notionalUsd: '$842,000', apy: '6.9%', stakedShare: '13.2%', custody: 'Copper ClearLoop' },
  { asset: 'AVAX', name: 'Subnet Institutional Prime', balance: '18,000.00 AVAX', notionalUsd: '$480,000', apy: '7.8%', stakedShare: '7.4%', custody: 'BitGo Trust' },
];

export const CRYPTO_LIQUIDITY_POOLS: LiquidityPoolData[] = [
  { protocol: 'UNISWAP V3 HIGH-BETA', network: 'ETHEREUM L1', tvl: '$1,650,000', fee24h: '+$3,420', impermanentRisk: '0.02% (HEDGED)', status: 'OPTIMAL' },
  { protocol: 'CURVE TRICRYPTO NG', network: 'ARBITRUM ONE', tvl: '$1,250,000', fee24h: '+$2,180', impermanentRisk: '0.00% (STABLE)', status: 'ACTIVE' },
  { protocol: 'RAYDIUM CLMM POOL', network: 'SOLANA MAINNET', tvl: '$950,000', fee24h: '+$1,850', impermanentRisk: '0.04% (DELTA-NEUT)', status: 'OPTIMAL' },
  { protocol: 'AAVE V3 TREASURY COLLAT', network: 'OPTIMISM', tvl: '$820,000', fee24h: '+$1,240', impermanentRisk: '0.00% (OVER-COLLAT)', status: 'BALANCED' },
];

export const VALIDATOR_NODES: ValidatorNode[] = [
  { nodeId: 'VAL-ETH-01', chain: 'Ethereum Beacon', stakedAmount: '160 ETH', uptime: '99.99%', slashingRisk: '0.00%', rewards24h: '+$280' },
  { nodeId: 'VAL-SOL-04', chain: 'Solana Epoch 620', stakedAmount: '4,200 SOL', uptime: '100.0%', slashingRisk: '0.00%', rewards24h: '+$190' },
  { nodeId: 'VAL-AVAX-02', chain: 'Avalanche P-Chain', stakedAmount: '8,500 AVAX', uptime: '99.98%', slashingRisk: '0.00%', rewards24h: '+$110' },
  { nodeId: 'VAL-NEAR-01', chain: 'Near Sharded Node', stakedAmount: '45,000 NEAR', uptime: '99.95%', slashingRisk: '0.00%', rewards24h: '+$75' },
];
