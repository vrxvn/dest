/**
 * DUMMY DATA: WORKFORCE & DESK PERSONNEL
 * Format proporsional & masuk akal (Elite Boutique Quant Hedge Fund - 48 Personil).
 */

export interface Employee {
  empId: string;
  name: string;
  role: string;
  desk: string;
  capitalSupervised: string;
  pnlContribution: string;
  sharpe: string;
  reviewStatus: string;
}

export interface DivisionRoleItem {
  roleTitle: string;
  headcount: number;
  countLabel: string;
  description: string;
  badge: string;
}

export interface DivisionEmployee {
  empId: string;
  name: string;
  role: string;
  level: string;
  salary: string;
  capital: string;
  pnl: string;
  sharpe: string;
  status: string;
  education: string;
}

export interface DivisionWorkforce {
  divisionId: string;
  divisionNumber: number;
  divisionName: string;
  divisionShort: string;
  badge: string;
  color: string;
  bgBadge: string;
  iconBg: string;
  headOfDesk: string;
  totalMembers: number;
  totalMembersLabel: string;
  focus: string;
  totalSalaryMonthly: string;
  totalSalaryAnnual: string;
  avgSalaryPerStaff: string;
  totalSupervisedCapital: string;
  totalPnlContribution: string;
  avgSharpe: string;
  status: string;
  description: string;
  mandate: string;
  riskLimit: string;
  clearingExecution: string;
  winRate: string;
  roleBreakdown: DivisionRoleItem[];
  employees: DivisionEmployee[];
}

export const TOTAL_STAFF_COUNT = 48;
export const TOTAL_MONTHLY_PAYROLL = '$356,000 / bln';
export const TOTAL_ANNUAL_PAYROLL = '$4,272,000 / thn';

export const WORKFORCE_DIVISIONS: DivisionWorkforce[] = [
  {
    divisionId: 'DIV-1-QUANT',
    divisionNumber: 1,
    divisionName: 'Divisi Quant & Software Engineering',
    divisionShort: 'QUANT & SOFTWARE ENG',
    badge: '14 PERSONIL',
    color: 'text-indigo-700',
    bgBadge: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    iconBg: 'from-indigo-600 to-indigo-800',
    headOfDesk: 'Dr. Evelyn Reed (Lead R&D Model Bot 98%)',
    totalMembers: 14,
    totalMembersLabel: '14 Personil',
    focus: 'AI Bot, C++ Low-Latency, Algoritma & API Bursa',
    totalSalaryMonthly: '$112,000 / bln',
    totalSalaryAnnual: '$1.34M / thn',
    avgSalaryPerStaff: 'Rata-rata: $8,000/staf',
    totalSupervisedCapital: '$5,200,000',
    totalPnlContribution: '+$842,000',
    avgSharpe: '3.92',
    status: 'OPTIMAL',
    description: 'Pusat komputasi kuantitatif inti: R&D bot AI 98%, engine eksekusi C++/Rust, analisis backtest statistik, konektivitas FIX/API, dan pipelines MLOps.',
    mandate: 'Pengembangan Model Prediksi AI/ML, C++ Sub-Milidetik Engine, & Integrasi API Bursa Global',
    riskLimit: 'Hard-Coded Slippage Cap 0.05% • Algorithmic Auto-Halt pada Latensi >10ms • Model Win Rate Floor 75%',
    clearingExecution: 'Direct Memory Access FPGA C++ & Dark Fiber FIX 4.4 Gateways',
    winRate: '79.2%',
    roleBreakdown: [
      {
        roleTitle: 'Head of AI & Chief Quant Architect',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Lead R&D Model Bot 98%',
        badge: 'R&D LEAD',
      },
      {
        roleTitle: 'Lead HFT C++ / Rust Engine Developers',
        headcount: 4,
        countLabel: '4 Orang',
        description: 'Sistem transaksi cepat sub-milidetik',
        badge: 'C++ / RUST',
      },
      {
        roleTitle: 'Quantitative Researchers & Backtesters',
        headcount: 4,
        countLabel: '4 Orang',
        description: 'Analisis data histori & statistik mendalam',
        badge: 'RESEARCH',
      },
      {
        roleTitle: 'API & Exchange Integration Engineers',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Koneksi bursa global & broker FIX protocols',
        badge: 'INTEGRATION',
      },
      {
        roleTitle: 'Data Engineers & MLOps',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Pipelines data masif & pemeliharaan model AI',
        badge: 'MLOPS',
      },
    ],
    employees: [
      {
        empId: 'EMP-014',
        name: 'Dr. Evelyn Reed',
        role: 'Chief Quant Architect',
        level: 'Partner / MD',
        salary: '$14,500/bln',
        capital: '$5.20M',
        pnl: '+$842K',
        sharpe: '3.92',
        status: 'TOP RATED',
        education: 'PhD MIT Physics',
      },
      {
        empId: 'EMP-019',
        name: 'Dr. Lucas Vance',
        role: 'Lead AI Model Bot',
        level: 'Director',
        salary: '$12,000/bln',
        capital: '$2.80M',
        pnl: '+$450K',
        sharpe: '3.78',
        status: 'ACTIVE',
        education: 'PhD Stanford ML',
      },
      {
        empId: 'EMP-022',
        name: 'Aria Thorne',
        role: 'Lead C++/Rust Architect',
        level: 'VP Engineering',
        salary: '$11,500/bln',
        capital: 'INFRA',
        pnl: 'Zero-Lag',
        sharpe: '4.10',
        status: 'EXCELLENT',
        education: 'MSc Oxford CS',
      },
      {
        empId: 'EMP-025',
        name: 'Marcus Zhao',
        role: 'Senior HFT Kernel Dev',
        level: 'Lead Engineer',
        salary: '$9,800/bln',
        capital: '$1.40M',
        pnl: '+$210K',
        sharpe: '3.85',
        status: 'ACTIVE',
        education: 'MSc Tsinghua CS',
      },
      {
        empId: 'EMP-027',
        name: 'Elena Rostova',
        role: 'Quant Backtest Specialist',
        level: 'Senior Analyst',
        salary: '$8,200/bln',
        capital: '$950K',
        pnl: '+$145K',
        sharpe: '3.65',
        status: 'ACTIVE',
        education: 'MSc Moscow State',
      },
    ],
  },
  {
    divisionId: 'DIV-2-TRADING',
    divisionNumber: 2,
    divisionName: 'Divisi Global Market Execution & Trading',
    divisionShort: 'GLOBAL EXECUTION & TRADING',
    badge: '15 PERSONIL',
    color: 'text-cyan-700',
    bgBadge: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    iconBg: 'from-cyan-600 to-cyan-800',
    headOfDesk: 'Alexander Sterling (Supervisi Regional)',
    totalMembers: 15,
    totalMembersLabel: '15 Personil',
    focus: 'Eksekusi Pasar 24/7, Arbitrase & Pengawasan Slippage',
    totalSalaryMonthly: '$105,000 / bln',
    totalSalaryAnnual: '$1.26M / thn',
    avgSalaryPerStaff: 'Rata-rata: $7,000/staf',
    totalSupervisedCapital: '$4,800,000',
    totalPnlContribution: '+$712,000',
    avgSharpe: '3.84',
    status: 'EXCEEDS',
    description: 'Operasional trading interbank & kripto 24/7 non-stop lintas 3 shift regional (Tokyo/China, Jakarta, London/NY), arbitrase selisih harga, pengawasan slippage, dan meja likuiditas OTC.',
    mandate: 'Eksekusi Pasar 24/7 Shift 3 Regional, Cross-Market Arbitrage, & Pengawasan Ketat Slippage',
    riskLimit: 'Maksimum Slippage Tolerated 0.08% • Single Desk Exposure Cap $3.5M • VaR 99% $210K',
    clearingExecution: 'LMAX Interbank, CME Globex, & Multi-CEX OTC Prime Pools',
    winRate: '82.5%',
    roleBreakdown: [
      {
        roleTitle: 'Head of Trading Desk & Portfolio Managers',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Supervisi regional komprehensif',
        badge: 'REGIONAL LEAD',
      },
      {
        roleTitle: 'Senior Execution Traders (Shift 24/7)',
        headcount: 6,
        countLabel: '6 Orang',
        description: 'Shift rotasi regional (Tokyo, JKT, London)',
        badge: '24/7 SHIFT',
      },
      {
        roleTitle: 'Cross-Market Arbitrage Specialists',
        headcount: 4,
        countLabel: '4 Orang',
        description: 'Pencari & eksekutor selisih harga lintas bursa',
        badge: 'ARBITRAGE',
      },
      {
        roleTitle: 'Slippage & Risk Controllers',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Pemantau real-time penyimpangan harga eksekusi',
        badge: 'CONTROLLER',
      },
      {
        roleTitle: 'OTC & Institutional Crypto Desk',
        headcount: 1,
        countLabel: '1 Orang',
        description: 'Pencairan aset likuiditas volume besar',
        badge: 'OTC PRIME',
      },
    ],
    employees: [
      {
        empId: 'EMP-028',
        name: 'Alexander Sterling',
        role: 'Head of Global Trading',
        level: 'Managing Director',
        salary: '$15,000/bln',
        capital: '$4.80M',
        pnl: '+$712K',
        sharpe: '3.84',
        status: 'EXCEEDS',
        education: 'BSc Cambridge Finance',
      },
      {
        empId: 'EMP-031',
        name: 'Chen Wei',
        role: 'Tokyo/Asia Shift Lead',
        level: 'Director',
        salary: '$11,000/bln',
        capital: '$2.10M',
        pnl: '+$340K',
        sharpe: '3.75',
        status: 'OPTIMAL',
        education: 'MSc Tsinghua Finance',
      },
      {
        empId: 'EMP-035',
        name: 'Budi Santoso',
        role: 'Jakarta Desk Lead',
        level: 'Director',
        salary: '$9,500/bln',
        capital: '$1.45M',
        pnl: '+$215K',
        sharpe: '3.68',
        status: 'OPTIMAL',
        education: 'MSc UI / NUS',
      },
      {
        empId: 'EMP-038',
        name: 'Tran Van Duc',
        role: 'London/Cross Desk',
        level: 'Associate Director',
        salary: '$8,800/bln',
        capital: '$980K',
        pnl: '+$142K',
        sharpe: '3.70',
        status: 'ACTIVE',
        education: 'MSc Foreign Trade Hanoi',
      },
      {
        empId: 'EMP-042',
        name: 'Liam O\'Connor',
        role: 'Cross-Market Arbitrageur',
        level: 'Senior Trader',
        salary: '$7,800/bln',
        capital: '$750K',
        pnl: '+$118K',
        sharpe: '3.82',
        status: 'ACTIVE',
        education: 'BSc London LSE',
      },
    ],
  },
  {
    divisionId: 'DIV-3-INFRA',
    divisionNumber: 3,
    divisionName: 'Divisi Infrastructure & Cybersecurity',
    divisionShort: 'INFRASTRUCTURE & CYBERSECURITY',
    badge: '8 PERSONIL',
    color: 'text-amber-700',
    bgBadge: 'bg-amber-50 border-amber-200 text-amber-700',
    iconBg: 'from-amber-600 to-amber-800',
    headOfDesk: 'Daria Petrova (Chief Low-Latency Architect)',
    totalMembers: 8,
    totalMembersLabel: '8 Personil',
    focus: 'Server Fisik (HPC), Server Dalam (Network/Linux), & Cold Wallet',
    totalSalaryMonthly: '$56,000 / bln',
    totalSalaryAnnual: '$672K / thn',
    avgSalaryPerStaff: 'Rata-rata: $7,000/staf',
    totalSupervisedCapital: '$2,450,000 (BTC VAULT)',
    totalPnlContribution: 'Zero-Downtime',
    avgSharpe: '4.50',
    status: 'OPTIMAL',
    description: 'Pemeliharaan kluster server fisik HPC datacenter & sistem pendingin, optimasi Linux network kernel & ping, otorisasi multi-sig cold wallet BTC, serta pertahanan firewall anti-DDoS 24/7.',
    mandate: 'Ketersediaan Server 99.999% Tanpa Downtime, Proteksi Cold Wallet Multi-Sig, & Keamanan Cyber',
    riskLimit: 'Zero Naked Key Exposure • Multi-Sig Quorum 4-of-7 Thales HSM • DDOS Mitigation <1s',
    clearingExecution: 'Equinix TY3, LD4, NY4 Optical Cross-Connect + Fireblocks HSM',
    winRate: '99.99%',
    roleBreakdown: [
      {
        roleTitle: 'Data Center & Hardware Tech',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Pemeliharaan server fisik & pendingin HPC',
        badge: 'HARDWARE / DC',
      },
      {
        roleTitle: 'Linux SysAdmin & Low-Latency Ops',
        headcount: 3,
        countLabel: '3 Orang',
        description: 'Pemeliharaan server dalam & optimasi ping sub-ms',
        badge: 'SYSADMIN',
      },
      {
        roleTitle: 'Cold Wallet Custody & Multi-Sig',
        headcount: 1,
        countLabel: '1 Orang',
        description: 'Pemegang kunci keamanan dompet cadangan BTC',
        badge: 'COLD WALLET',
      },
      {
        roleTitle: 'Cybersecurity & Anti-DDoS Ops',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Penjaga firewall, penetrasi sistem & mitigasi DDoS',
        badge: 'SECURITY',
      },
    ],
    employees: [
      {
        empId: 'EMP-071',
        name: 'Daria Petrova',
        role: 'Chief Low-Latency Architect',
        level: 'Principal Engineer',
        salary: '$13,500/bln',
        capital: 'INFRA HPC',
        pnl: '99.999% SLA',
        sharpe: '4.50',
        status: 'TOP RATED',
        education: 'MSc ETH Zurich CS',
      },
      {
        empId: 'EMP-073',
        name: 'Nguyen Van Minh',
        role: 'Lead Hardware & DC Tech',
        level: 'VP Operations',
        salary: '$9,200/bln',
        capital: 'PHYSICAL',
        pnl: 'Zero Incident',
        sharpe: '4.20',
        status: 'ACTIVE',
        education: 'BSc HUST Vietnam',
      },
      {
        empId: 'EMP-077',
        name: 'Hendra Gunawan',
        role: 'Chief Security Officer',
        level: 'Director',
        salary: '$10,500/bln',
        capital: 'MULTI-SIG',
        pnl: '100% Guarded',
        sharpe: '4.40',
        status: 'EXCELLENT',
        education: 'MSc ITB Infosec',
      },
      {
        empId: 'EMP-079',
        name: 'Viktor Kozlov',
        role: 'Linux Network Kernel Eng',
        level: 'Senior Specialist',
        salary: '$8,000/bln',
        capital: 'SYSADMIN',
        pnl: 'Zero Jitter',
        sharpe: '4.15',
        status: 'ACTIVE',
        education: 'BSc SPbSTU CS',
      },
      {
        empId: 'EMP-081',
        name: 'Sarah Lin',
        role: 'Multi-Sig Vault Custodian',
        level: 'Security Officer',
        salary: '$7,500/bln',
        capital: 'VAULT 4/7',
        pnl: '100% Verified',
        sharpe: '4.30',
        status: 'ACTIVE',
        education: 'MSc NTU Singapore',
      },
    ],
  },
  {
    divisionId: 'DIV-4-TREASURY',
    divisionNumber: 4,
    divisionName: 'Divisi Treasury, FX & Cross-Border Finance',
    divisionShort: 'TREASURY, FX & FINANCE',
    badge: '6 PERSONIL',
    color: 'text-emerald-700',
    bgBadge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    iconBg: 'from-emerald-600 to-emerald-800',
    headOfDesk: 'David Vance (Chief Financial Officer)',
    totalMembers: 6,
    totalMembersLabel: '6 Personil',
    focus: 'Arus Kas Multi-Currency, Pencairan BTC, & Akuntansi Audit',
    totalSalaryMonthly: '$48,000 / bln',
    totalSalaryAnnual: '$576K / thn',
    avgSalaryPerStaff: 'Rata-rata: $8,000/staf',
    totalSupervisedCapital: '$2,874,000',
    totalPnlContribution: '+$465,000',
    avgSharpe: '3.65',
    status: 'OPTIMAL',
    description: 'Manajemen perbendaharaan multi-mata uang, pemantauan arus kas, operasional pencairan likuidasi BTC, dan pembukuan audit akuntansi pajak.',
    mandate: 'Likuiditas Valas, Otorisasi Pencairan BTC, & Kepatuhan Audit Pajak',
    riskLimit: 'Cross-Margin Collateral Ratio Min 140% • Max FX Exposure $2.5M • FATCA/CRS Audited',
    clearingExecution: 'PVP Continuous Linked Settlement (CLS) + Prime Multi-Currency Clearing',
    winRate: '88.4%',
    roleBreakdown: [
      {
        roleTitle: 'Chief Financial Officer & Treasury Lead',
        headcount: 1,
        countLabel: '1 Orang',
        description: 'Pimpinan strategi perbendaharaan korporat',
        badge: 'CFO / EXEC',
      },
      {
        roleTitle: 'Cross-Border FX Managers',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Lalu lintas valas & hedging posisi',
        badge: 'FX DESK',
      },
      {
        roleTitle: 'BTC Treasury & Liquidation Ops',
        headcount: 1,
        countLabel: '1 Orang',
        description: 'Eksekusi rutin pencairan likuidasi cadangan BTC',
        badge: 'BTC LIQUIDITY',
      },
      {
        roleTitle: 'Tax & Financial Accountants',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Pembukuan keuangan & audit pajak',
        badge: 'TAX & AUDIT',
      },
    ],
    employees: [
      {
        empId: 'EMP-082',
        name: 'David Vance',
        role: 'Chief Financial Officer',
        level: 'CFO / Partner',
        salary: '$14,000/bln',
        capital: '$2.87M',
        pnl: '+$465K',
        sharpe: '3.65',
        status: 'TOP RATED',
        education: 'CPA / MBA Wharton',
      },
      {
        empId: 'EMP-085',
        name: 'Li Na',
        role: 'Lead FX Desk Manager',
        level: 'Director',
        salary: '$9,500/bln',
        capital: '$1.25M',
        pnl: '+$210K',
        sharpe: '3.58',
        status: 'ACTIVE',
        education: 'MSc Fudan Econ',
      },
      {
        empId: 'EMP-089',
        name: 'Siti Rahmawati',
        role: 'Senior Tax & Audit Lead',
        level: 'VP Accounting',
        salary: '$8,500/bln',
        capital: 'AUDITED',
        pnl: 'Zero Tax Penalty',
        sharpe: '3.80',
        status: 'EXCELLENT',
        education: 'CPA / M.Ak UI',
      },
      {
        empId: 'EMP-091',
        name: 'Hoang Nam',
        role: 'Settlement PM',
        level: 'Senior Manager',
        salary: '$7,200/bln',
        capital: '$680K',
        pnl: '+$95K',
        sharpe: '3.62',
        status: 'ACTIVE',
        education: 'BSc Banking Acad VN',
      },
    ],
  },
  {
    divisionId: 'DIV-5-LEGAL',
    divisionNumber: 5,
    divisionName: 'Divisi Legal, Compliance & Regional Facility',
    divisionShort: 'LEGAL, COMPLIANCE & FACILITY',
    badge: '5 PERSONIL',
    color: 'text-purple-700',
    bgBadge: 'bg-purple-50 border-purple-200 text-purple-700',
    iconBg: 'from-purple-600 to-purple-800',
    headOfDesk: 'Sarah Jenkins, Esq. (General Counsel)',
    totalMembers: 5,
    totalMembersLabel: '5 Personil',
    focus: 'Perizinan Lintas Negara, Kepatuhan Regulasi, & Payroll',
    totalSalaryMonthly: '$35,000 / bln',
    totalSalaryAnnual: '$420K / thn',
    avgSalaryPerStaff: 'Rata-rata: $7,000/staf',
    totalSupervisedCapital: 'FUND GOVERNANCE',
    totalPnlContribution: '100% COMPLIANT',
    avgSharpe: '4.80',
    status: 'OPTIMAL',
    description: 'Tata kelola perizinan lintas yurisdiksi, kepatuhan regulasi & anti-pencucian uang (AML/KYC), fasilitas operasional, dan manajemen payroll 48 personil.',
    mandate: 'Kepatuhan Regulasi SEC Reg D, OJK & Regional, serta Payroll 48 Staf',
    riskLimit: 'Zero Regulatory Sanctions • AML/KYC 100% Verified • On-Time Payroll SLA 100%',
    clearingExecution: 'SEC Reg D / Rule 506(c) & Regional Regulatory Filings',
    winRate: '100.0%',
    roleBreakdown: [
      {
        roleTitle: 'Regional Legal Counsel',
        headcount: 1,
        countLabel: '1 Orang',
        description: 'Spesialis regulasi & tata kelola dana',
        badge: 'LEGAL COUNSEL',
      },
      {
        roleTitle: 'Regulatory & AML Officers',
        headcount: 2,
        countLabel: '2 Orang',
        description: 'Kepatuhan hukum perizinan, KYC & anti-pencucian uang',
        badge: 'AML / COMPLIANCE',
      },
      {
        roleTitle: 'Facility & Operations Coordinator',
        headcount: 1,
        countLabel: '1 Orang',
        description: 'Operasional kantor & koordinasi vendor',
        badge: 'FACILITY OPS',
      },
      {
        roleTitle: 'HRD & Payroll Specialist',
        headcount: 1,
        countLabel: '1 Orang',
        description: 'Manajemen kompensasi & gaji untuk 48 staf',
        badge: 'PAYROLL 48 STAF',
      },
    ],
    employees: [
      {
        empId: 'EMP-092',
        name: 'Sarah Jenkins, Esq.',
        role: 'General Counsel & Head of Legal',
        level: 'Partner / Legal Head',
        salary: '$13,500/bln',
        capital: 'REGULATORY',
        pnl: 'Full Compliance',
        sharpe: '4.80',
        status: 'TOP RATED',
        education: 'JD Harvard Law',
      },
      {
        empId: 'EMP-095',
        name: 'Bambang Wijaya, S.H.',
        role: 'Compliance Lead',
        level: 'Senior Legal Officer',
        salary: '$8,500/bln',
        capital: 'REGIONAL',
        pnl: 'Zero Sanction',
        sharpe: '4.60',
        status: 'ACTIVE',
        education: 'LLM NUS / FHUI',
      },
      {
        empId: 'EMP-098',
        name: 'Mai Phuong Linh',
        role: 'HR & Payroll Specialist (48 Staf)',
        level: 'HR Lead',
        salary: '$7,200/bln',
        capital: '48 PAYROLL',
        pnl: '100% On-Time',
        sharpe: '4.70',
        status: 'EXCELLENT',
        education: 'MSc NEU Hanoi',
      },
      {
        empId: 'EMP-101',
        name: 'Arthur Pendelton',
        role: 'Senior AML/KYC Counsel',
        level: 'Senior Legal Mgr',
        salary: '$8,000/bln',
        capital: 'AML AUDIT',
        pnl: 'Zero Flag',
        sharpe: '4.75',
        status: 'ACTIVE',
        education: 'LLM Columbia Law',
      },
    ],
  },
];

export const EMPLOYEES: Employee[] = [
  { empId: 'EMP-014', name: 'Dr. Evelyn Reed', role: 'Head of AI & Chief Quant Architect', desk: 'Quant & Software Engineering (14 Staf)', capitalSupervised: '$5,200,000', pnlContribution: '+$842,000', sharpe: '3.92', reviewStatus: 'EXCEEDS EXPECTATIONS' },
  { empId: 'EMP-028', name: 'Alexander Sterling', role: 'Head of Trading Desk & PM', desk: 'Global Market Execution & Trading (15 Staf)', capitalSupervised: '$4,800,000', pnlContribution: '+$712,000', sharpe: '3.84', reviewStatus: 'EXCEEDS EXPECTATIONS' },
  { empId: 'EMP-071', name: 'Daria Petrova', role: 'Chief Low-Latency Architect', desk: 'Infrastructure & Cybersecurity (8 Staf)', capitalSupervised: '$2,450,000', pnlContribution: 'Zero-Downtime', sharpe: '4.50', reviewStatus: 'TOP RATED' },
  { empId: 'EMP-082', name: 'David Vance', role: 'Chief Financial Officer', desk: 'Treasury, FX & Cross-Border (6 Staf)', capitalSupervised: '$2,874,000', pnlContribution: '+$465,000', sharpe: '3.65', reviewStatus: 'OPTIMAL' },
  { empId: 'EMP-092', name: 'Sarah Jenkins, Esq.', role: 'General Counsel & Regional Legal', desk: 'Legal, Compliance & Facility (5 Staf)', capitalSupervised: '48 STAFF OPS', pnlContribution: 'Full Compliance', sharpe: '4.80', reviewStatus: 'OPTIMAL' },
];
