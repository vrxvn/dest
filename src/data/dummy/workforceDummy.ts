/**
 * DUMMY DATA: WORKFORCE & DESK PERSONNEL
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
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

export const TOTAL_STAFF_COUNT = 2209;

export const WORKFORCE_DIVISIONS: DivisionWorkforce[] = [
  {
    divisionId: 'DIV-1-QUANT',
    divisionNumber: 1,
    divisionName: 'Divisi Quant & Software Engineering',
    divisionShort: 'QUANT & SOFTWARE ENG',
    badge: '550 PERSONIL',
    color: 'text-indigo-700',
    bgBadge: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    iconBg: 'from-indigo-600 to-indigo-800',
    headOfDesk: 'Dr. Evelyn Reed (Lead R&D Model Bot 98%)',
    totalMembers: 550,
    totalMembersLabel: '550 Personil',
    focus: 'AI Bot, C++ Low-Latency, Algoritma & API Bursa',
    totalSupervisedCapital: '$45,000,000',
    totalPnlContribution: '+$3,420,000',
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
        headcount: 5,
        countLabel: '5 Orang',
        description: 'Lead R&D Model Bot 98%',
        badge: 'R&D LEAD',
      },
      {
        roleTitle: 'Lead HFT C++ / Rust Engine Developers',
        headcount: 120,
        countLabel: '120 Orang',
        description: 'Sistem transaksi cepat sub-milidetik',
        badge: 'C++ / RUST',
      },
      {
        roleTitle: 'Quantitative Researchers & Backtesters',
        headcount: 175,
        countLabel: '175 Orang',
        description: 'Analisis data histori & statistik mendalam',
        badge: 'RESEARCH',
      },
      {
        roleTitle: 'API & Exchange Integration Engineers',
        headcount: 150,
        countLabel: '150 Orang',
        description: 'Koneksi bursa global & broker FIX protocols',
        badge: 'INTEGRATION',
      },
      {
        roleTitle: 'Data Engineers & MLOps',
        headcount: 100,
        countLabel: '100 Orang',
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
        capital: '$45.0M',
        pnl: '+$3.42M',
        sharpe: '3.92',
        status: 'TOP RATED',
        education: 'PhD MIT Physics',
      },
      {
        empId: 'EMP-019',
        name: 'Dr. Lucas Vance',
        role: 'Lead AI Model Bot',
        level: 'Director',
        capital: '$18.5M',
        pnl: '+$1.45M',
        sharpe: '3.78',
        status: 'ACTIVE',
        education: 'PhD Stanford ML',
      },
      {
        empId: 'EMP-022',
        name: 'Aria Thorne',
        role: 'Lead C++/Rust Architect',
        level: 'VP Engineering',
        capital: 'INFRA',
        pnl: 'Zero-Lag',
        sharpe: '4.10',
        status: 'EXCELLENT',
        education: 'MSc Oxford CS',
      },
    ],
  },
  {
    divisionId: 'DIV-2-TRADING',
    divisionNumber: 2,
    divisionName: 'Divisi Global Market Execution & Trading',
    divisionShort: 'GLOBAL EXECUTION & TRADING',
    badge: '660 PERSONIL',
    color: 'text-cyan-700',
    bgBadge: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    iconBg: 'from-cyan-600 to-cyan-800',
    headOfDesk: 'Alexander Sterling (Supervisi Regional)',
    totalMembers: 660,
    totalMembersLabel: '660 Personil',
    focus: 'Eksekusi Pasar 24/7, Arbitrase & Pengawasan Slippage',
    totalSupervisedCapital: '$42,500,000',
    totalPnlContribution: '+$2,680,000',
    avgSharpe: '3.84',
    status: 'EXCEEDS',
    description: 'Operasional trading interbank & kripto 24/7 non-stop lintas 3 regional (China 100, Indo 75, VN 75), arbitrase selisih harga, pengawasan slippage, dan meja likuidasi OTC volume besar.',
    mandate: 'Eksekusi Pasar 24/7 Shift 3 Regional, Cross-Market Arbitrage, & Pengawasan Ketat Slippage',
    riskLimit: 'Maksimum Slippage Tolerated 0.08% • Single Desk Exposure Cap $35M • VaR 99% $2.1M',
    clearingExecution: 'LMAX Interbank, CME Globex, & Multi-CEX OTC Prime Pools',
    winRate: '82.5%',
    roleBreakdown: [
      {
        roleTitle: 'Head of Trading Desk & Portfolio Managers',
        headcount: 10,
        countLabel: '10 Orang',
        description: 'Supervisi regional komprehensif',
        badge: 'REGIONAL LEAD',
      },
      {
        roleTitle: 'Senior Execution Traders (Shift 24/7)',
        headcount: 250,
        countLabel: '250 Orang',
        description: 'Shift rotasi regional (China: 100, Indo: 75, VN: 75)',
        badge: '24/7 SHIFT',
      },
      {
        roleTitle: 'Cross-Market Arbitrage Specialists',
        headcount: 200,
        countLabel: '200 Orang',
        description: 'Pencari & eksekutor selisih harga lintas bursa',
        badge: 'ARBITRAGE',
      },
      {
        roleTitle: 'Slippage & Risk Controllers',
        headcount: 120,
        countLabel: '120 Orang',
        description: 'Pemantau real-time penyimpangan harga eksekusi',
        badge: 'CONTROLLER',
      },
      {
        roleTitle: 'OTC & Institutional Crypto Desk',
        headcount: 80,
        countLabel: '80 Orang',
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
        capital: '$24.8M',
        pnl: '+$1.84M',
        sharpe: '3.84',
        status: 'EXCEEDS',
        education: 'BSc Cambridge Finance',
      },
      {
        empId: 'EMP-031',
        name: 'Chen Wei',
        role: 'China Shift Desk Lead',
        level: 'Director',
        capital: '$16.5M',
        pnl: '+$1.12M',
        sharpe: '3.75',
        status: 'OPTIMAL',
        education: 'MSc Tsinghua Finance',
      },
      {
        empId: 'EMP-035',
        name: 'Budi Santoso',
        role: 'Indonesia Desk Lead',
        level: 'Director',
        capital: '$12.2M',
        pnl: '+$840K',
        sharpe: '3.68',
        status: 'OPTIMAL',
        education: 'MSc UI / NUS',
      },
    ],
  },
  {
    divisionId: 'DIV-3-INFRA',
    divisionNumber: 3,
    divisionName: 'Divisi Infrastructure & Cybersecurity',
    divisionShort: 'INFRASTRUCTURE & CYBERSECURITY',
    badge: '440 PERSONIL',
    color: 'text-amber-700',
    bgBadge: 'bg-amber-50 border-amber-200 text-amber-700',
    iconBg: 'from-amber-600 to-amber-800',
    headOfDesk: 'Daria Petrova (Chief Low-Latency Architect)',
    totalMembers: 440,
    totalMembersLabel: '440 Personil',
    focus: 'Server Fisik (HPC), Server Dalam (Network/Linux), & Cold Wallet',
    totalSupervisedCapital: '$35,955,000 (BTC VAULT)',
    totalPnlContribution: 'Zero-Downtime',
    avgSharpe: '4.50',
    status: 'OPTIMAL',
    description: 'Pemeliharaan kluster server fisik HPC datacenter & sistem pendingin gedung, optimasi Linux network kernel & ping, otorisasi multi-sig cold wallet BTC, serta pertahanan firewall anti-DDoS 24/7.',
    mandate: 'Ketersediaan Server 99.999% Tanpa Downtime, Proteksi Cold Wallet Multi-Sig, & Keamanan Cyber',
    riskLimit: 'Zero Naked Key Exposure • Multi-Sig Quorum 4-of-7 Thales HSM • DDOS Mitigation <1s',
    clearingExecution: 'Equinix TY3, LD4, NY4 Optical Cross-Connect + Fireblocks HSM',
    winRate: '99.99%',
    roleBreakdown: [
      {
        roleTitle: 'Data Center & Physical Hardware Engineers',
        headcount: 150,
        countLabel: '150 Orang',
        description: 'Pemeliharaan server fisik & pendingin gedung HPC',
        badge: 'HARDWARE / DC',
      },
      {
        roleTitle: 'Linux SysAdmin & Low-Latency Network Ops',
        headcount: 130,
        countLabel: '130 Orang',
        description: 'Pemeliharaan server dalam & optimasi ping sub-ms',
        badge: 'SYSADMIN',
      },
      {
        roleTitle: 'Cold Wallet Custody & Multi-Sig Officers',
        headcount: 60,
        countLabel: '60 Orang',
        description: 'Pemegang kunci keamanan dompet cadangan BTC',
        badge: 'COLD WALLET',
      },
      {
        roleTitle: 'Cybersecurity & Anti-DDoS Engineers',
        headcount: 100,
        countLabel: '100 Orang',
        description: 'Penjaga firewall, penetrasi sistem, & mitigasi DDoS',
        badge: 'SECURITY',
      },
    ],
    employees: [
      {
        empId: 'EMP-071',
        name: 'Daria Petrova',
        role: 'Chief Low-Latency Architect',
        level: 'Principal Engineer',
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
        capital: 'MULTI-SIG',
        pnl: '100% Guarded',
        sharpe: '4.40',
        status: 'EXCELLENT',
        education: 'MSc ITB Infosec',
      },
    ],
  },
  {
    divisionId: 'DIV-4-TREASURY',
    divisionNumber: 4,
    divisionName: 'Divisi Treasury, FX & Cross-Border Finance',
    divisionShort: 'TREASURY, FX & FINANCE',
    badge: '265 PERSONIL',
    color: 'text-emerald-700',
    bgBadge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    iconBg: 'from-emerald-600 to-emerald-800',
    headOfDesk: 'David Vance (Chief Financial Officer)',
    totalMembers: 265,
    totalMembersLabel: '265 Personil',
    focus: 'Arus Kas 3 Negara (CNY, IDR, VND), Pencairan BTC, & Akuntansi',
    totalSupervisedCapital: '$32,400,000',
    totalPnlContribution: '+$1,757,800',
    avgSharpe: '3.65',
    status: 'OPTIMAL',
    description: 'Manajemen perbendaharaan multi-mata uang, pemantauan arus kas 3 negara (CNY, IDR, VND), operasional pencairan likuidasi BTC, dan pembukuan audit akuntansi pajak lokal.',
    mandate: 'Likuiditas Valas 3 Koridor (CNY, IDR, VND), Otorisasi Pencairan BTC, & Audit Pajak',
    riskLimit: 'Cross-Margin Collateral Ratio Min 140% • Max FX Exposure $25M • FATCA/CRS Audited',
    clearingExecution: 'PVP Continuous Linked Settlement (CLS) + Prime Multi-Currency Clearing',
    winRate: '88.4%',
    roleBreakdown: [
      {
        roleTitle: 'Chief Financial Officer & Treasury Leads',
        headcount: 5,
        countLabel: '5 Orang',
        description: 'Pimpinan strategi perbendaharaan korporat',
        badge: 'CFO / EXEC',
      },
      {
        roleTitle: 'Cross-Border FX Managers',
        headcount: 80,
        countLabel: '80 Orang',
        description: 'Lalu lintas valas China (CNY), Indo (IDR), VN (VND)',
        badge: 'FX 3 NEGARA',
      },
      {
        roleTitle: 'BTC Treasury & July Liquidation Ops',
        headcount: 30,
        countLabel: '30 Orang',
        description: 'Eksekusi rutin pencairan likuidasi cadangan BTC',
        badge: 'BTC LIQUIDITY',
      },
      {
        roleTitle: 'Corporate Tax & Financial Accountants',
        headcount: 150,
        countLabel: '150 Orang',
        description: 'Pembukuan keuangan & audit pajak lokal 3 negara',
        badge: 'TAX & AUDIT',
      },
    ],
    employees: [
      {
        empId: 'EMP-082',
        name: 'David Vance',
        role: 'Chief Financial Officer',
        level: 'CFO / Partner',
        capital: '$32.4M',
        pnl: '+$1.75M',
        sharpe: '3.65',
        status: 'TOP RATED',
        education: 'CPA / MBA Wharton',
      },
      {
        empId: 'EMP-085',
        name: 'Li Na',
        role: 'Lead CNY/IDR/VND FX Desk',
        level: 'Director',
        capital: '$18.2M',
        pnl: '+$940K',
        sharpe: '3.58',
        status: 'ACTIVE',
        education: 'MSc Fudan Econ',
      },
      {
        empId: 'EMP-089',
        name: 'Siti Rahmawati',
        role: 'Senior Tax & Audit Lead',
        level: 'VP Accounting',
        capital: 'AUDITED',
        pnl: 'Zero Tax Penalty',
        sharpe: '3.80',
        status: 'EXCELLENT',
        education: 'CPA / M.Ak UI',
      },
    ],
  },
  {
    divisionId: 'DIV-5-LEGAL',
    divisionNumber: 5,
    divisionName: 'Divisi Legal, Compliance & Regional Facility',
    divisionShort: 'LEGAL, COMPLIANCE & FACILITY',
    badge: '294 PERSONIL',
    color: 'text-purple-700',
    bgBadge: 'bg-purple-50 border-purple-200 text-purple-700',
    iconBg: 'from-purple-600 to-purple-800',
    headOfDesk: 'Sarah Jenkins, Esq. (General Counsel)',
    totalMembers: 294,
    totalMembersLabel: '294 Personil',
    focus: 'Perizinan Lintas Negara, Gedung Kantor, & Payroll',
    totalSupervisedCapital: 'REGIONAL ASSETS',
    totalPnlContribution: '100% COMPLIANT',
    avgSharpe: '4.80',
    status: 'OPTIMAL',
    description: 'Tata kelola perizinan lintas negara (PBOC China, OJK Indonesia, SBV Vietnam), kepatuhan regulasi & anti-pencucian uang (AML), fasilitas operasional gedung kantor 3 negara, dan manajemen payroll 2.209 staf.',
    mandate: 'Kepatuhan Regulasi PBOC, OJK & SBV, Operasional Gedung 3 Negara, & Payroll 2.209 Staf',
    riskLimit: 'Zero Regulatory Sanctions • AML/KYC 100% Verified • On-Time Payroll SLA 100%',
    clearingExecution: 'OJK Regulatory Sandbox, PBOC Cross-Border Gateway, & SBV Direct Fx Filing',
    winRate: '100.0%',
    roleBreakdown: [
      {
        roleTitle: 'Regional Legal Counsel',
        headcount: 44,
        countLabel: '44 Orang',
        description: 'Spesialis regulasi PBOC, OJK, dan SBV',
        badge: 'LEGAL COUNSEL',
      },
      {
        roleTitle: 'Regulatory & Anti-Money Laundering Officers',
        headcount: 100,
        countLabel: '100 Orang',
        description: 'Kepatuhan hukum perizinan, KYC & anti-pencucian uang',
        badge: 'AML / COMPLIANCE',
      },
      {
        roleTitle: 'Facility & Building Maintenance Team',
        headcount: 70,
        countLabel: '70 Orang',
        description: 'Operasional fisik gedung kantor di 3 negara',
        badge: 'FACILITY OPS',
      },
      {
        roleTitle: 'HRD & Regional Payroll Operations',
        headcount: 80,
        countLabel: '80 Orang',
        description: 'Manajemen kompensasi & gaji untuk 2.209 staf',
        badge: 'PAYROLL 2.209 STAF',
      },
    ],
    employees: [
      {
        empId: 'EMP-092',
        name: 'Sarah Jenkins, Esq.',
        role: 'General Counsel & Head of Legal',
        level: 'Partner / Legal Head',
        capital: 'REGULATORY',
        pnl: 'Full Compliance',
        sharpe: '4.80',
        status: 'TOP RATED',
        education: 'JD Harvard Law',
      },
      {
        empId: 'EMP-095',
        name: 'Bambang Wijaya, S.H.',
        role: 'OJK & PBOC Compliance Lead',
        level: 'Senior Legal Officer',
        capital: 'REGIONAL',
        pnl: 'Zero Sanction',
        sharpe: '4.60',
        status: 'ACTIVE',
        education: 'LLM NUS / FHUI',
      },
      {
        empId: 'EMP-098',
        name: 'Mai Phuong Linh',
        role: 'Head of Regional Payroll (2.209 Staf)',
        level: 'VP People & HR Ops',
        capital: '2.209 PAYROLL',
        pnl: '100% On-Time',
        sharpe: '4.70',
        status: 'EXCELLENT',
        education: 'MSc NEU Hanoi',
      },
    ],
  },
];

export const EMPLOYEES: Employee[] = [
  { empId: 'EMP-014', name: 'Dr. Evelyn Reed', role: 'Head of AI & Chief Quant Architect', desk: 'Quant & Software Engineering (550 Staf)', capitalSupervised: '$45,000,000', pnlContribution: '+$3,420,000', sharpe: '3.92', reviewStatus: 'EXCEEDS EXPECTATIONS' },
  { empId: 'EMP-028', name: 'Alexander Sterling', role: 'Head of Trading Desk & PM', desk: 'Global Market Execution & Trading (660 Staf)', capitalSupervised: '$24,800,000', pnlContribution: '+$1,842,500', sharpe: '3.84', reviewStatus: 'EXCEEDS EXPECTATIONS' },
  { empId: 'EMP-071', name: 'Daria Petrova', role: 'Chief Low-Latency Architect', desk: 'Infrastructure & Cybersecurity (440 Staf)', capitalSupervised: '$35,955,000', pnlContribution: 'Zero-Downtime', sharpe: '4.50', reviewStatus: 'TOP RATED' },
  { empId: 'EMP-082', name: 'David Vance', role: 'Chief Financial Officer', desk: 'Treasury, FX & Cross-Border (265 Staf)', capitalSupervised: '$32,400,000', pnlContribution: '+$1,757,800', sharpe: '3.65', reviewStatus: 'OPTIMAL' },
  { empId: 'EMP-092', name: 'Sarah Jenkins, Esq.', role: 'General Counsel & Regional Legal', desk: 'Legal, Compliance & Facility (294 Staf)', capitalSupervised: '2.209 STAFF OPS', pnlContribution: 'Full Compliance', sharpe: '4.80', reviewStatus: 'OPTIMAL' },
];
