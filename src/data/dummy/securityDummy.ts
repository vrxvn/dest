/**
 * DUMMY DATA: SECURITY & MULTI-SIG VAULTS
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
 */

export interface VaultPolicy {
  policyId: string;
  vaultName: string;
  quorum: string;
  dailyLimit: string;
  hsmModule: string;
  status: 'ACTIVE' | 'ENFORCED' | 'LOCKED';
}

export const VAULT_POLICIES: VaultPolicy[] = [
  { policyId: 'POL-01', vaultName: 'Master Treasury Cold Vault', quorum: '4 of 7 Multi-Sig', dailyLimit: '$25,000,000', hsmModule: 'Thales Luna PCIe Level 4', status: 'ENFORCED' },
  { policyId: 'POL-02', vaultName: 'Hot Trading Liquidity Buffer', quorum: '2 of 3 Algorithmic Key', dailyLimit: '$10,000,000', hsmModule: 'Fireblocks Cloud MPC', status: 'ACTIVE' },
  { policyId: 'POL-03', vaultName: 'DeFi Bridge Collateral Stash', quorum: '3 of 5 Time-Lock HSM', dailyLimit: '$5,000,000', hsmModule: 'YubiHSM2 Geo-Replicated', status: 'ENFORCED' },
  { policyId: 'POL-04', vaultName: 'Off-Exchange Settlement Pool', quorum: '3 of 4 Guardian Quorum', dailyLimit: '$15,000,000', hsmModule: 'Copper ClearLoop HSM', status: 'ENFORCED' },
];
