/**
 * DUMMY DATA: SETTINGS REGISTER
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
 */

export interface SystemSettingItem {
  key: string;
  scope: string;
  value: string;
  status: string;
}

export const SYSTEM_SETTINGS: SystemSettingItem[] = [
  {
    key: 'THEME_ENGINE',
    scope: '3D Tactile Ceramic Glassmorphism (High Fidelity)',
    value: 'WHITE CERAMIC 3D',
    status: 'ACTIVE',
  },
  {
    key: 'DEFAULT_LANDING',
    scope: 'Initial View upon Opening Application',
    value: 'OVERVIEW (DASHBOARD)',
    status: 'ENFORCED',
  },
  {
    key: 'EXEC_INTERACTION_MODE',
    scope: 'Order Terminal vs Analytics Interface',
    value: 'READ-ONLY ANALYTICS',
    status: 'LOCKED',
  },
  {
    key: 'DATA_FEED_SOURCE',
    scope: 'Aggregated FIX Protocol Gateway + HFT Clustered Nodes',
    value: 'DIRECT CLOUD PROXY',
    status: 'SYNCED',
  },
];
