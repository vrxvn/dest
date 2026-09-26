/**
 * DUMMY DATA: INVESTOR & LP ACCOUNTS
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
 */

export interface InvestorAccount {
  lpId: string;
  institution: string;
  tier: string;
  capitalContributed: string;
  currentNav: string;
  netReturn: string;
  hwmStatus: string;
  lockupExpiry: string;
}

export const INVESTORS: InvestorAccount[] = [
  { lpId: 'LP-801', institution: 'Blackstone Multi-Strategy LP', tier: 'FOUNDER TIER', capitalContributed: '$30,000,000', currentNav: '$38,420,000', netReturn: '+28.06%', hwmStatus: 'NEW HWM', lockupExpiry: 'DEC 2027' },
  { lpId: 'LP-642', institution: 'Abu Dhabi Sovereign Wealth', tier: 'INSTITUTIONAL A', capitalContributed: '$25,000,000', currentNav: '$31,850,000', netReturn: '+27.40%', hwmStatus: 'NEW HWM', lockupExpiry: 'MAR 2028' },
  { lpId: 'LP-419', institution: 'Singapore Temasek Capital', tier: 'INSTITUTIONAL A', capitalContributed: '$15,000,000', currentNav: '$18,920,000', netReturn: '+26.13%', hwmStatus: 'NEW HWM', lockupExpiry: 'NOV 2026' },
  { lpId: 'LP-210', institution: 'Zurich Family Office Alpha', tier: 'CLASS B LP', capitalContributed: '$8,500,000', currentNav: '$10,640,000', netReturn: '+25.17%', hwmStatus: 'NEW HWM', lockupExpiry: 'JUN 2027' },
  { lpId: 'LP-095', institution: 'Rothschild Capital Partners', tier: 'CLASS B LP', capitalContributed: '$6,150,000', currentNav: '$7,710,000', netReturn: '+25.36%', hwmStatus: 'NEW HWM', lockupExpiry: 'SEP 2026' },
];
