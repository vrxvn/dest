/**
 * DUMMY DATA: ADMIN & GOVERNANCE RISK PARAMETERS
 * Parameter governance proporsional untuk dana kelolaan ~$15.3M.
 */

export interface SystemParam {
  paramKey: string;
  category: string;
  currentValue: string;
  safetyThreshold: string;
  governance: string;
  lastUpdated: string;
}

export const SYSTEM_PARAMS: SystemParam[] = [
  { paramKey: 'MAX_PORTFOLIO_LEVERAGE', category: 'Risk Control', currentValue: '1.62x', safetyThreshold: '2.50x Hard Stop', governance: 'Risk Committee', lastUpdated: '2H AGO' },
  { paramKey: 'SINGLE_DESK_EXPOSURE_CAP', category: 'Risk Control', currentValue: '$3,500,000', safetyThreshold: '$5,000,000 Cap', governance: 'Chief Risk Officer', lastUpdated: '1D AGO' },
  { paramKey: 'ALGO_KILL_SWITCH_LATENCY', category: 'Execution', currentValue: '25.0 ms Trigger', safetyThreshold: '50.0 ms Auto-Halt', governance: 'Automated Daemon', lastUpdated: 'REALTIME' },
  { paramKey: 'CROSS_MARGIN_COLLAT_RATIO', category: 'Treasury', currentValue: '142.5%', safetyThreshold: '120.0% Minimum', governance: 'Treasury Desk', lastUpdated: '4H AGO' },
  { paramKey: 'MULTI_SIG_SIGNER_ROTATION', category: 'Security', currentValue: '90 Days Cycle', safetyThreshold: '120 Days Maximum', governance: 'Chief Security Officer', lastUpdated: '3D AGO' },
];
