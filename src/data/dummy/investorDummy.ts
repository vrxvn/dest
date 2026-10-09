/**
 * DUMMY DATA: INVESTOR & LP ACCOUNTS (REALISTIC SIZED FUND)
 * Angka-angka realistis (ngotak) berstandar Private Equity / Hedge Fund skala menengah (AUM ~$12M - $15M).
 */

export interface InvestorAccount {
  lpId: string;
  entityName: string;
  sector: string;
  tierClass: string;
  committedCapital: string;
  currentNav: string;
  netReturn: string;
  netReturnNum: number;
  lockupExpiry: string;
  lockupStatus: string;
  status: 'Active' | 'Pending KYC' | 'Redeem Requested' | 'Capital Call Pending';
  domicile: string;
  hurdleRate: string;
  managementFee: string;
  performanceFee: string;
  subscriptionDate: string;
  custodianBank: string;
}

export type CapitalTransactionType =
  | 'PENARIKAN_DEVIDEN'
  | 'PENAMBAHAN_HASIL_DEVIDEN'
  | 'PENAMBAHAN_CAPITAL_LUAR';

export interface CapitalTransaction {
  id: string;
  txCode: string;
  timestamp: string;
  type: CapitalTransactionType;
  typeLabel: string;
  lpId: string;
  lpName: string;
  amount: number;
  amountFormatted: string;
  status: 'COMPLETED' | 'PENDING_SETTLEMENT' | 'SCHEDULED';
  bankChannel: string;
  referenceNote: string;
}

export const INVESTORS: InvestorAccount[] = [
  {
    lpId: 'LP-801',
    entityName: 'Blackstone Multi-Strategy Fund',
    sector: 'Global Asset Management & PE',
    tierClass: 'Founder Tier',
    committedCapital: '$3,000,000',
    currentNav: '$3,842,000',
    netReturn: '+28.06%',
    netReturnNum: 28.06,
    lockupExpiry: '15 Dec 2027',
    lockupStatus: '21 Months Left',
    status: 'Active',
    domicile: 'New York, USA',
    hurdleRate: '6.0% Hurdle',
    managementFee: '1.5%',
    performanceFee: '15%',
    subscriptionDate: '15 Dec 2023',
    custodianBank: 'BNY Mellon Trust',
  },
  {
    lpId: 'LP-642',
    entityName: 'Abu Dhabi Sovereign Wealth Desk',
    sector: 'Sovereign Wealth Fund (SWF)',
    tierClass: 'Class A LP',
    committedCapital: '$2,500,000',
    currentNav: '$3,185,000',
    netReturn: '+27.40%',
    netReturnNum: 27.40,
    lockupExpiry: '31 Mar 2028',
    lockupStatus: '24 Months Left',
    status: 'Active',
    domicile: 'Abu Dhabi, UAE',
    hurdleRate: '6.0% Hurdle',
    managementFee: '2.0%',
    performanceFee: '20%',
    subscriptionDate: '31 Mar 2024',
    custodianBank: 'State Street Global',
  },
  {
    lpId: 'LP-419',
    entityName: 'Temasek Global Macro Portfolio',
    sector: 'State Sovereign Holding',
    tierClass: 'Class A LP',
    committedCapital: '$1,800,000',
    currentNav: '$2,270,000',
    netReturn: '+26.11%',
    netReturnNum: 26.11,
    lockupExpiry: '30 Nov 2026',
    lockupStatus: '8 Months Left',
    status: 'Active',
    domicile: 'Singapore',
    hurdleRate: '6.0% Hurdle',
    managementFee: '2.0%',
    performanceFee: '20%',
    subscriptionDate: '30 Nov 2023',
    custodianBank: 'JPMorgan Chase NY',
  },
  {
    lpId: 'LP-312',
    entityName: 'Harvard Endowment Alpha Partners',
    sector: 'University Endowment Fund',
    tierClass: 'Class A LP',
    committedCapital: '$1,500,000',
    currentNav: '$1,860,000',
    netReturn: '+24.00%',
    netReturnNum: 24.00,
    lockupExpiry: '15 Oct 2026',
    lockupStatus: 'Lockup Matured',
    status: 'Redeem Requested',
    domicile: 'Boston, MA, USA',
    hurdleRate: '6.0% Hurdle',
    managementFee: '2.0%',
    performanceFee: '20%',
    subscriptionDate: '15 Oct 2022',
    custodianBank: 'Northern Trust Co.',
  },
  {
    lpId: 'LP-210',
    entityName: 'Zurich Family Office Alpha',
    sector: 'Multi-Family Wealth Office',
    tierClass: 'Class B LP',
    committedCapital: '$1,200,000',
    currentNav: '$1,502,000',
    netReturn: '+25.17%',
    netReturnNum: 25.17,
    lockupExpiry: '30 Jun 2027',
    lockupStatus: '15 Months Left',
    status: 'Active',
    domicile: 'Zurich, Switzerland',
    hurdleRate: '6.0% Hurdle',
    managementFee: '2.0%',
    performanceFee: '20%',
    subscriptionDate: '30 Jun 2024',
    custodianBank: 'UBS Switzerland AG',
  },
  {
    lpId: 'LP-178',
    entityName: 'CalPERS Asia Tactical Mandate',
    sector: 'Public Pension Reserve Fund',
    tierClass: 'Class B LP',
    committedCapital: '$1,000,000',
    currentNav: '$1,000,000',
    netReturn: '0.00%',
    netReturnNum: 0.00,
    lockupExpiry: '01 Sep 2028',
    lockupStatus: 'Onboarding Phase',
    status: 'Pending KYC',
    domicile: 'Sacramento, CA, USA',
    hurdleRate: '6.0% Hurdle',
    managementFee: '2.0%',
    performanceFee: '20%',
    subscriptionDate: '01 Mar 2026',
    custodianBank: 'State Street Global',
  },
  {
    lpId: 'LP-095',
    entityName: 'Rothschild Capital Partners',
    sector: 'Merchant Banking & Private Wealth',
    tierClass: 'Class B LP',
    committedCapital: '$850,000',
    currentNav: '$1,065,000',
    netReturn: '+25.29%',
    netReturnNum: 25.29,
    lockupExpiry: '30 Sep 2026',
    lockupStatus: '6 Months Left',
    status: 'Active',
    domicile: 'Paris, France / London',
    hurdleRate: '6.0% Hurdle',
    managementFee: '2.0%',
    performanceFee: '20%',
    subscriptionDate: '30 Sep 2023',
    custodianBank: 'Rothschild & Co Martin Maurel',
  },
  {
    lpId: 'LP-054',
    entityName: 'Tokyo Prime Asset Custody',
    sector: 'Institutional Trust Bank',
    tierClass: 'Class B LP',
    committedCapital: '$600,000',
    currentNav: '$600,000',
    netReturn: '0.00%',
    netReturnNum: 0.00,
    lockupExpiry: '31 Dec 2027',
    lockupStatus: 'Drawdown Notice Sent',
    status: 'Capital Call Pending',
    domicile: 'Tokyo, Japan',
    hurdleRate: '6.0% Hurdle',
    managementFee: '2.0%',
    performanceFee: '20%',
    subscriptionDate: '15 Feb 2026',
    custodianBank: 'Mitsubishi UFJ Trust',
  },
];

// Angka Ringkasan Agregat yang Realistis & Masuk Akal (Total Committed: $12.45M, NAV: $15.32M)
export const TOTAL_COMMITTED_CAPITAL = '$12,450,000.00';
export const TOTAL_CURRENT_NAV = '$15,324,000.00';
export const TOTAL_LP_NET_PROFIT = '+$2,874,000.00';

// Total Deviden yang Harus Dikeluarkan (Payable Realistis Q3/Q4)
export const TOTAL_DIVIDEND_PAYABLE = '$1,850,000.00';
export const TOTAL_DIVIDEND_WITHDRAWN = '$1,240,000.00';
export const TOTAL_DIVIDEND_REINVESTED = '$610,000.00';
export const TOTAL_EXTERNAL_CAPITAL_INFLOW = '$2,500,000.00';

// Komposisi Diversifikasi LP Berdasarkan Tipe Institusi
export const LP_CONCENTRATION_BY_TYPE = [
  { type: 'Sovereign Wealth Funds (SWF)', pct: 34.5, amount: '$4,300,000', color: '#6366f1' },
  { type: 'Global Private Equity & Asset Mgrs', pct: 24.1, amount: '$3,000,000', color: '#0ea5e9' },
  { type: 'University Endowments', pct: 12.0, amount: '$1,500,000', color: '#10b981' },
  { type: 'Multi-Family Wealth Offices', pct: 16.5, amount: '$2,050,000', color: '#f59e0b' },
  { type: 'Public Pension Reserve Funds', pct: 12.9, amount: '$1,600,000', color: '#a855f7' },
];

// Metrik Waterfall 2/20 & Carried Interest (Hurdle Rate 6.0%)
export const WATERFALL_METRICS = {
  totalGrossProfit: '$3,592,500.00',
  preferredHurdle6Pct: '$747,000.00',
  gpCatchUp20Pct: '$186,750.00',
  lpSplit80Pct: '$2,127,000.00',
  gpCarriedInterest20Pct: '$531,750.00',
  totalLpNetProfit: '$2,874,000.00',
  totalGpHurdleEarned: '$718,500.00',
  highWaterMarkStatus: 'ACHIEVED (+$2.87M above peak)',
  quarterlyGateCapPct: '5.0%',
  quarterlyGateMaxAmount: '$766,200.00',
  activeRedemptionRequests: '$372,000.00',
  availableGateBuffer: '$394,200.00',
  liquiditySafetyRating: 'AAA (100% SEC Reg D Compliant)',
};

export const INITIAL_TRANSACTIONS: CapitalTransaction[] = [
  {
    id: 'tx-001',
    txCode: 'TX-DIV-9841',
    timestamp: '25 Sep 2026, 14:15 WIB',
    type: 'PENARIKAN_DEVIDEN',
    typeLabel: 'Penarikan Deviden (Withdrawal)',
    lpId: 'LP-801',
    lpName: 'Blackstone Multi-Strategy Fund',
    amount: 350000,
    amountFormatted: '$350,000.00',
    status: 'COMPLETED',
    bankChannel: 'BNY Mellon Wire NY #9921',
    referenceNote: 'Distribusi Dividen Kuartal Q3 (Hurdle 6% Met)',
  },
  {
    id: 'tx-002',
    txCode: 'TX-CAP-9842',
    timestamp: '24 Sep 2026, 11:30 WIB',
    type: 'PENAMBAHAN_CAPITAL_LUAR',
    typeLabel: 'Penambahan Capital dari Luar',
    lpId: 'LP-642',
    lpName: 'Abu Dhabi Sovereign Wealth Desk',
    amount: 1200000,
    amountFormatted: '$1,200,000.00',
    status: 'COMPLETED',
    bankChannel: 'First Abu Dhabi Bank (FAB) SWIFT',
    referenceNote: 'Injeksi Modal Eksternal Tambahan (Top-up AUM)',
  },
  {
    id: 'tx-003',
    txCode: 'TX-REI-9843',
    timestamp: '23 Sep 2026, 16:45 WIB',
    type: 'PENAMBAHAN_HASIL_DEVIDEN',
    typeLabel: 'Penambahan Hasil Deviden (Reinvestasi)',
    lpId: 'LP-419',
    lpName: 'Temasek Global Macro Portfolio',
    amount: 240000,
    amountFormatted: '$240,000.00',
    status: 'COMPLETED',
    bankChannel: 'Internal Compounding Ledger',
    referenceNote: 'Rekapitulasi Deviden Masuk Modal Pokok (Compounding)',
  },
  {
    id: 'tx-004',
    txCode: 'TX-DIV-9844',
    timestamp: '22 Sep 2026, 09:20 WIB',
    type: 'PENARIKAN_DEVIDEN',
    typeLabel: 'Penarikan Deviden (Withdrawal)',
    lpId: 'LP-210',
    lpName: 'Zurich Family Office Alpha',
    amount: 185000,
    amountFormatted: '$185,000.00',
    status: 'COMPLETED',
    bankChannel: 'UBS Switzerland AG Wire',
    referenceNote: 'Pencairan Deviden Semester I 2026',
  },
  {
    id: 'tx-005',
    txCode: 'TX-CAP-9845',
    timestamp: '20 Sep 2026, 13:10 WIB',
    type: 'PENAMBAHAN_CAPITAL_LUAR',
    typeLabel: 'Penambahan Capital dari Luar',
    lpId: 'LP-178',
    lpName: 'CalPERS Asia Tactical Mandate',
    amount: 800000,
    amountFormatted: '$800,000.00',
    status: 'PENDING_SETTLEMENT',
    bankChannel: 'State Street Global Custody',
    referenceNote: 'Drawdown Call Tahap 1 Onboarding Institusional',
  },
  {
    id: 'tx-006',
    txCode: 'TX-DIV-9846',
    timestamp: '18 Sep 2026, 17:00 WIB',
    type: 'PENARIKAN_DEVIDEN',
    typeLabel: 'Penarikan Deviden (Withdrawal)',
    lpId: 'LP-095',
    lpName: 'Rothschild Capital Partners',
    amount: 120000,
    amountFormatted: '$120,000.00',
    status: 'COMPLETED',
    bankChannel: 'Rothschild & Co Martin Maurel Paris',
    referenceNote: 'Distribusi Hasil Kinerja Tahunan Berjalan',
  },
  {
    id: 'tx-007',
    txCode: 'TX-REI-9847',
    timestamp: '15 Sep 2026, 10:00 WIB',
    type: 'PENAMBAHAN_HASIL_DEVIDEN',
    typeLabel: 'Penambahan Hasil Deviden (Reinvestasi)',
    lpId: 'LP-801',
    lpName: 'Blackstone Multi-Strategy Fund',
    amount: 370000,
    amountFormatted: '$370,000.00',
    status: 'COMPLETED',
    bankChannel: 'Internal Compounding Ledger',
    referenceNote: 'Auto-Reinvestment Deviden ke High-Frequency Strategy',
  },
  {
    id: 'tx-008',
    txCode: 'TX-CAP-9848',
    timestamp: '10 Sep 2026, 11:00 WIB',
    type: 'PENAMBAHAN_CAPITAL_LUAR',
    typeLabel: 'Penambahan Capital dari Luar',
    lpId: 'LP-054',
    lpName: 'Tokyo Prime Asset Custody',
    amount: 500000,
    amountFormatted: '$500,000.00',
    status: 'SCHEDULED',
    bankChannel: 'Mitsubishi UFJ Trust Fedwire',
    referenceNote: 'Jadwal Setoran Modal Tahap II (Q4 2026)',
  },
];

export interface LpDocumentItem {
  id: string;
  title: string;
  category: 'AUDIT' | 'LEGAL' | 'TAX' | 'PERFORMANCE';
  fileSize: string;
  date: string;
  issuer: string;
  checksum: string;
  description: string;
}

export const LP_DOCUMENTS: LpDocumentItem[] = [
  {
    id: 'doc-001',
    title: 'Aether Fund III - Q3 2026 Audited Financial Statement',
    category: 'AUDIT',
    fileSize: '4.8 MB',
    date: '30 Sep 2026',
    issuer: 'Deloitte & Touche LLP',
    checksum: 'SHA256: 9b2d8...f41e',
    description: 'Laporan keuangan triwulanan yang diaudit secara independen, verifikasi NAV $15.32M dan cadangan kas.',
  },
  {
    id: 'doc-002',
    title: 'Private Placement Memorandum (PPM) - SEC Reg D 506(c)',
    category: 'LEGAL',
    fileSize: '8.2 MB',
    date: '15 Jan 2026',
    issuer: 'Gibson, Dunn & Crutcher LLP',
    checksum: 'SHA256: 4a7c1...8e33',
    description: 'Dokumen penawaran resmi restricted institutional investor, struktur master-feeder Delaware & Cayman.',
  },
  {
    id: 'doc-003',
    title: 'Schedule K-1 (Form 1065) Partner Tax Reporting Package',
    category: 'TAX',
    fileSize: '2.4 MB',
    date: '15 Mar 2026',
    issuer: 'PricewaterhouseCoopers (PwC)',
    checksum: 'SHA256: 1c3f9...d288',
    description: 'Paket pelaporan pajak mitra US & deklarasi withholding foreign investor W-8BEN-E.',
  },
  {
    id: 'doc-004',
    title: 'Monthly LP Performance & Alpha Attribution (September 2026)',
    category: 'PERFORMANCE',
    fileSize: '3.1 MB',
    date: '02 Oct 2026',
    issuer: 'Aether Quant Risk Committee',
    checksum: 'SHA256: 7d9e4...b12a',
    description: 'Rincian alpha kuantitatif, analisis Sharpe 3.55, drawdown 2.18%, dan dekomposisi faktor macro.',
  },
  {
    id: 'doc-005',
    title: 'BNY Mellon Trust Custodian Safekeeping Confirmation',
    category: 'AUDIT',
    fileSize: '1.9 MB',
    date: '28 Sep 2026',
    issuer: 'The Bank of New York Mellon',
    checksum: 'SHA256: 6e1a2...c905',
    description: 'Sertifikat kustodian pihak ketiga independen atas aset sekuritas dan margin liquidity balance.',
  },
  {
    id: 'doc-006',
    title: 'Cayman Islands Monetary Authority (CIMA) Fund Registration',
    category: 'LEGAL',
    fileSize: '1.5 MB',
    date: '01 Feb 2026',
    issuer: 'Maples and Calder / CIMA',
    checksum: 'SHA256: 8f4b0...e771',
    description: 'Sertifikat registrasi reksa dana luar negeri berlisensi Mutual Funds Act (Revised).',
  },
];

export interface DividendWaterfallQuarter {
  quarter: string;
  recordDate: string;
  payoutDate: string;
  projectedGross: string;
  hurdleAmount: string;
  netLpDistribution: string;
  status: 'PAID' | 'READY_FOR_PAYOUT' | 'PROJECTED';
}

export const DIVIDEND_WATERFALL_CALENDAR: DividendWaterfallQuarter[] = [
  {
    quarter: 'Q1 2026',
    recordDate: '15 Mar 2026',
    payoutDate: '31 Mar 2026',
    projectedGross: '$680,000.00',
    hurdleAmount: '$186,750.00',
    netLpDistribution: '$544,000.00',
    status: 'PAID',
  },
  {
    quarter: 'Q2 2026',
    recordDate: '15 Jun 2026',
    payoutDate: '30 Jun 2026',
    projectedGross: '$820,000.00',
    hurdleAmount: '$186,750.00',
    netLpDistribution: '$656,000.00',
    status: 'PAID',
  },
  {
    quarter: 'Q3 2026',
    recordDate: '15 Sep 2026',
    payoutDate: '30 Sep 2026',
    projectedGross: '$980,000.00',
    hurdleAmount: '$186,750.00',
    netLpDistribution: '$784,000.00',
    status: 'READY_FOR_PAYOUT',
  },
  {
    quarter: 'Q4 2026 (Est)',
    recordDate: '15 Dec 2026',
    payoutDate: '31 Dec 2026',
    projectedGross: '$1,110,000.00',
    hurdleAmount: '$186,750.00',
    netLpDistribution: '$888,000.00',
    status: 'PROJECTED',
  },
];

export const LP_TIER_CONFIG = [
  {
    tier: 'Founder Tier',
    minCommitment: '$3,000,000+',
    mgmtFee: '1.5%',
    carriedInterest: '15.0%',
    hurdle: '6.0% Hurdle',
    lockup: '36 Bulan',
    investorsCount: 1,
    color: 'purple',
  },
  {
    tier: 'Class A LP',
    minCommitment: '$1,500,000 - $3,000,000',
    mgmtFee: '2.0%',
    carriedInterest: '20.0%',
    hurdle: '6.0% Hurdle',
    lockup: '24 Bulan',
    investorsCount: 3,
    color: 'indigo',
  },
  {
    tier: 'Class B LP',
    minCommitment: '$500,000 - $1,500,000',
    mgmtFee: '2.0%',
    carriedInterest: '20.0%',
    hurdle: '6.0% Hurdle',
    lockup: '12 Bulan',
    investorsCount: 4,
    color: 'slate',
  },
];
