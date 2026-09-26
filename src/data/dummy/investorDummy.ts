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
