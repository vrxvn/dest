/**
 * DUMMY DATA: CRYPTO & DIGITAL ASSETS
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
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
  { asset: 'BTC', name: 'Wrapped / Institutional Cold', balance: '542.80 BTC', notionalUsd: '$35,955,072', apy: '4.8%', stakedShare: '42.5%', custody: 'Fireblocks HSM' },
  { asset: 'ETH', name: 'Lido stETH / Native Validator', balance: '5,840.00 ETH', notionalUsd: '$20,790,400', apy: '3.6%', stakedShare: '24.6%', custody: 'Coinbase Custody' },
  { asset: 'SOL', name: 'Solana High-Speed Staking', balance: '84,200.00 SOL', notionalUsd: '$12,217,420', apy: '6.9%', stakedShare: '14.4%', custody: 'Copper ClearLoop' },
  { asset: 'USDC', name: 'BlackRock BUIDL / Treasury', balance: '10,500,000 USDC', notionalUsd: '$10,500,000', apy: '5.2%', stakedShare: '12.4%', custody: 'Circle Direct' },
  { asset: 'AVAX', name: 'Subnet Institutional Prime', balance: '142,000.00 AVAX', notionalUsd: '$5,183,000', apy: '7.8%', stakedShare: '6.1%', custody: 'BitGo Trust' },
];

export const CRYPTO_LIQUIDITY_POOLS: LiquidityPoolData[] = [
  { protocol: 'UNISWAP V3 HIGH-BETA', network: 'ETHEREUM L1', tvl: '$18,400,000', fee24h: '+$42,800', impermanentRisk: '0.02% (HEDGED)', status: 'OPTIMAL' },
  { protocol: 'CURVE TRICRYPTO NG', network: 'ARBITRUM ONE', tvl: '$14,250,000', fee24h: '+$28,400', impermanentRisk: '0.00% (STABLE)', status: 'ACTIVE' },
  { protocol: 'RAYDIUM CLMM POOL', network: 'SOLANA MAINNET', tvl: '$11,800,000', fee24h: '+$34,500', impermanentRisk: '0.04% (DELTA-NEUT)', status: 'OPTIMAL' },
  { protocol: 'AAVE V3 TREASURY COLLAT', network: 'OPTIMISM', tvl: '$8,600,000', fee24h: '+$19,200', impermanentRisk: '0.00% (OVER-COLLAT)', status: 'BALANCED' },
];

export const VALIDATOR_NODES: ValidatorNode[] = [
  { nodeId: 'VAL-ETH-01', chain: 'Ethereum Beacon', stakedAmount: '3,200 ETH', uptime: '99.99%', slashingRisk: '0.00%', rewards24h: '+$3,420' },
  { nodeId: 'VAL-SOL-04', chain: 'Solana Epoch 620', stakedAmount: '62,000 SOL', uptime: '100.0%', slashingRisk: '0.00%', rewards24h: '+$2,840' },
  { nodeId: 'VAL-AVAX-02', chain: 'Avalanche P-Chain', stakedAmount: '85,000 AVAX', uptime: '99.98%', slashingRisk: '0.00%', rewards24h: '+$1,190' },
  { nodeId: 'VAL-NEAR-01', chain: 'Near Sharded Node', stakedAmount: '450,000 NEAR', uptime: '99.95%', slashingRisk: '0.00%', rewards24h: '+$840' },
];
