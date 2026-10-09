import React, { useState, useMemo } from 'react';
import {
  PieChart,
  TrendingUp,
  DollarSign,
  Users,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  FileText,
  Search,
  Layers,
  Briefcase,
  ExternalLink,
  Download,
  Eye,
  FileDown,
  Info,
  Check,
  Shield,
  ArrowDownToLine,
  Receipt,
  PlusCircle,
  ArrowDownRight,
  ArrowUpLeft,
  RefreshCw,
  Coins,
  CreditCard,
  Send,
  Sliders,
  Calculator,
  Lock,
  Award,
  FileCheck,
  Landmark,
  FolderCheck,
  Percent,
} from 'lucide-react';
import {
  INVESTORS,
  TOTAL_COMMITTED_CAPITAL,
  TOTAL_CURRENT_NAV,
  TOTAL_LP_NET_PROFIT,
  TOTAL_DIVIDEND_PAYABLE,
  TOTAL_DIVIDEND_WITHDRAWN,
  TOTAL_DIVIDEND_REINVESTED,
  TOTAL_EXTERNAL_CAPITAL_INFLOW,
  LP_CONCENTRATION_BY_TYPE,
  WATERFALL_METRICS,
  INITIAL_TRANSACTIONS,
  LP_DOCUMENTS,
  DIVIDEND_WATERFALL_CALENDAR,
  LP_TIER_CONFIG,
  type InvestorAccount,
  type CapitalTransaction,
  type CapitalTransactionType,
  type LpDocumentItem,
  type DividendWaterfallQuarter,
} from '../data/dummy/investorDummy';

// Dataset Nav Appreciation dengan detail per periode untuk tooltip
const NAV_HISTORY = [
  { period: 'Q1 2024', nav: '$1,000.00', returnPct: '+0.00%', aum: '$10.0M', x: 20, y: 76 },
  { period: 'Q2 2024', nav: '$1,065.00', returnPct: '+6.50%', aum: '$10.8M', x: 110, y: 64 },
  { period: 'Q3 2024', nav: '$1,120.00', returnPct: '+12.00%', aum: '$11.6M', x: 200, y: 50 },
  { period: 'Q4 2024', nav: '$1,185.00', returnPct: '+18.50%', aum: '$12.5M', x: 290, y: 38 },
  { period: 'Q1 2025', nav: '$1,225.00', returnPct: '+22.50%', aum: '$13.8M', x: 380, y: 26 },
  { period: 'YTD 2025', nav: '$1,274.00', returnPct: '+27.40%', aum: '$15.3M', x: 470, y: 14 },
];

// Dataset Distribusi Modal Kuartalan untuk tooltip
const DISTRIBUTION_HISTORY = [
  { quarter: 'Q1 2024', amount: '$240K', hurdle: 'Met', status: 'Distributed', height: 42, x: 35 },
  { quarter: 'Q2 2024', amount: '$310K', hurdle: 'Met', status: 'Distributed', height: 50, x: 105 },
  { quarter: 'Q3 2024', amount: '$380K', hurdle: 'Met', status: 'Distributed', height: 56, x: 175 },
  { quarter: 'Q4 2024', amount: '$460K', hurdle: 'Met', status: 'Distributed', height: 68, x: 245 },
  { quarter: 'Q1 2025', amount: '$520K', hurdle: 'Met', status: 'Distributed', height: 76, x: 315 },
  { quarter: 'Q2 2025', amount: '$590K', hurdle: 'Met', status: 'Distributed', height: 84, x: 385 },
  { quarter: 'Q3 2025 (Est)', amount: '$680K', hurdle: 'Targeted', status: 'Projected', height: 92, x: 455 },
];

export const InvestorView: React.FC = () => {
  // 5 Tab Institusional: 'register' | 'transactions' | 'simulator' | 'documents' | 'waterfall'
  const [activeMainTab, setActiveMainTab] = useState<
    'register' | 'transactions' | 'simulator' | 'documents' | 'waterfall'
  >('register');

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLP, setSelectedLP] = useState<InvestorAccount | null>(null);

  // State untuk transaksi
  const [transactions, setTransactions] = useState<CapitalTransaction[]>(INITIAL_TRANSACTIONS);
  const [filterTxType, setFilterTxType] = useState<string>('ALL');
  const [searchTxQuery, setSearchTxQuery] = useState<string>('');
  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState<boolean>(false);

  // Form state transaksi baru
  const [newTxType, setNewTxType] = useState<CapitalTransactionType>('PENARIKAN_DEVIDEN');
  const [newTxLpId, setNewTxLpId] = useState<string>(INVESTORS[0].lpId);
  const [newTxAmount, setNewTxAmount] = useState<string>('150000');
  const [newTxBank, setNewTxBank] = useState<string>('BNY Mellon Fedwire NYC');
  const [newTxNote, setNewTxNote] = useState<string>('Distribusi Pembagian Hasil Deviden Q3 2026');

  // State untuk Data Room & Dokumen
  const [filterDocCategory, setFilterDocCategory] = useState<string>('ALL');
  const [searchDocQuery, setSearchDocQuery] = useState<string>('');
  const [selectedDocPreview, setSelectedDocPreview] = useState<LpDocumentItem | null>(null);

  // State untuk Simulator Deviden LP Interaktif
  const [simCapital, setSimCapital] = useState<number>(1000000); // Default $1,000,000
  const [simTier, setSimTier] = useState<'Founder' | 'ClassA' | 'ClassB'>('ClassA');
  const [simReturnPct, setSimReturnPct] = useState<number>(25.0); // Estimasi return tahunan 25%
  const [simReinvestMode, setSimReinvestMode] = useState<'cash' | 'reinvest'>('cash');

  // Interaktivitas hover tooltip pada chart
  const [hoveredNavPoint, setHoveredNavPoint] = useState<(typeof NAV_HISTORY)[0] | null>(null);
  const [hoveredDistribBar, setHoveredDistribBar] = useState<(typeof DISTRIBUTION_HISTORY)[0] | null>(null);

  // Toast feedback saat unduh laporan / simpan transaksi
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const triggerDownload = (lp: InvestorAccount) => {
    showToast(`Mengunduh Dokumen Akun: ${lp.lpId}_Q3_Capital_Statement.pdf (Tersertifikasi Deloitte)`);
  };

  const triggerDownloadDoc = (doc: LpDocumentItem) => {
    showToast(`Mengunduh Dokumen Resmi: ${doc.title} (${doc.fileSize})`);
  };

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const targetLp = INVESTORS.find((i) => i.lpId === newTxLpId) || INVESTORS[0];
    const numAmount = parseFloat(newTxAmount) || 0;

    let typeLabel = 'Penarikan Deviden (Withdrawal)';
    let codePrefix = 'TX-DIV';
    if (newTxType === 'PENAMBAHAN_HASIL_DEVIDEN') {
      typeLabel = 'Penambahan Hasil Deviden (Reinvestasi)';
      codePrefix = 'TX-REI';
    } else if (newTxType === 'PENAMBAHAN_CAPITAL_LUAR') {
      typeLabel = 'Penambahan Capital dari Luar';
      codePrefix = 'TX-CAP';
    }

    const createdTx: CapitalTransaction = {
      id: `tx-${Date.now()}`,
      txCode: `${codePrefix}-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: 'Baru saja (25 Sep 2026)',
      type: newTxType,
      typeLabel,
      lpId: targetLp.lpId,
      lpName: targetLp.entityName,
      amount: numAmount,
      amountFormatted: `$${numAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      status: 'COMPLETED',
      bankChannel: newTxBank,
      referenceNote: newTxNote || 'Transaksi Berhasil Dicatat ke Ledger Fund Master',
    };

    setTransactions([createdTx, ...transactions]);
    setIsAddTxModalOpen(false);
    showToast(
      `Transaksi ${createdTx.txCode} (${createdTx.typeLabel}) sebesar ${createdTx.amountFormatted} Berhasil Diproses!`
    );
  };

  // Kalkulasi Simulator Deviden
  const simulationResults = useMemo(() => {
    const hurdleRate = 0.06; // 6% preferred hurdle
    const mgmtFeeRate = simTier === 'Founder' ? 0.015 : 0.02;
    const carryRate = simTier === 'Founder' ? 0.15 : 0.2;

    const grossAnnualProfit = simCapital * (simReturnPct / 100);
    const hurdleAmount = simCapital * hurdleRate;

    // Keuntungan di atas hurdle dikenakan carried interest
    const excessProfit = Math.max(0, grossAnnualProfit - hurdleAmount);
    const gpCarriedInterest = excessProfit * carryRate;
    const mgmtFee = simCapital * mgmtFeeRate;

    const netLpAnnualProfit = grossAnnualProfit - gpCarriedInterest - mgmtFee;
    const netLpQuarterlyPayout = netLpAnnualProfit / 4;
    const effectiveNetYieldPct = (netLpAnnualProfit / simCapital) * 100;

    // Proyeksi Pertumbuhan 3 Tahun
    const year1Nav = simCapital + (simReinvestMode === 'reinvest' ? netLpAnnualProfit : 0);
    const year2Nav =
      simReinvestMode === 'reinvest'
        ? year1Nav * (1 + effectiveNetYieldPct / 100)
        : simCapital;
    const year3Nav =
      simReinvestMode === 'reinvest'
        ? year2Nav * (1 + effectiveNetYieldPct / 100)
        : simCapital;

    const totalCashDistributed3Y =
      simReinvestMode === 'cash' ? netLpAnnualProfit * 3 : 0;

    return {
      grossAnnualProfit,
      hurdleAmount,
      mgmtFee,
      gpCarriedInterest,
      netLpAnnualProfit,
      netLpQuarterlyPayout,
      effectiveNetYieldPct,
      year1Nav,
      year2Nav,
      year3Nav,
      totalCashDistributed3Y,
    };
  }, [simCapital, simTier, simReturnPct, simReinvestMode]);

  // Desain 3D Solid Ceramic Glass yang presisi & 100% konsisten dengan tema aplikasi
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  const filteredInvestors = INVESTORS.filter((inv) => {
    const matchesStatus = filterStatus === 'ALL' || inv.status === filterStatus;
    const matchesSearch =
      inv.lpId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.tierClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = filterTxType === 'ALL' || tx.type === filterTxType;
    const matchesSearch =
      tx.txCode.toLowerCase().includes(searchTxQuery.toLowerCase()) ||
      tx.lpId.toLowerCase().includes(searchTxQuery.toLowerCase()) ||
      tx.lpName.toLowerCase().includes(searchTxQuery.toLowerCase()) ||
      tx.referenceNote.toLowerCase().includes(searchTxQuery.toLowerCase()) ||
      tx.bankChannel.toLowerCase().includes(searchTxQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filteredDocuments = LP_DOCUMENTS.filter((doc) => {
    const matchesCat = filterDocCategory === 'ALL' || doc.category === filterDocCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchDocQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getStatusBadge = (status: InvestorAccount['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 text-[7.5px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ACTIVE
          </span>
        );
      case 'Pending KYC':
        return (
          <span className="inline-flex items-center gap-1 text-[7.5px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-300 shadow-2xs font-mono">
            <Clock className="w-2.5 h-2.5 text-amber-600" />
            PENDING KYC
          </span>
        );
      case 'Redeem Requested':
        return (
          <span className="inline-flex items-center gap-1 text-[7.5px] font-black px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-300 shadow-2xs font-mono">
            <AlertTriangle className="w-2.5 h-2.5 text-rose-600" />
            REDEEM REQ
          </span>
        );
      case 'Capital Call Pending':
        return (
          <span className="inline-flex items-center gap-1 text-[7.5px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-300 shadow-2xs font-mono">
            <Clock className="w-2.5 h-2.5 text-blue-600" />
            CAPITAL CALL
          </span>
        );
      default:
        return null;
    }
  };

  // Indikator Status Lockup
  const getLockupBadge = (statusText: string, expiry: string) => {
    const isMatured = statusText.includes('Matured');
    const isNear = statusText.includes('6 Months') || statusText.includes('8 Months');
    const isOnboarding = statusText.includes('Onboarding') || statusText.includes('Drawdown');

    if (isMatured) {
      return (
        <div className="inline-flex flex-col items-center px-1.5 py-0.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 shadow-2xs">
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5 text-rose-600 stroke-[2.5]" />
            <span className="font-black text-[8px] leading-tight text-rose-900">{expiry}</span>
          </div>
          <span className="text-[6.5px] font-black text-rose-600 uppercase tracking-tighter">
            MATURED • GATE CAP 5%
          </span>
        </div>
      );
    }

    if (isNear) {
      return (
        <div className="inline-flex flex-col items-center px-1.5 py-0.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 shadow-2xs">
          <div className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-amber-600 stroke-[2.5]" />
            <span className="font-black text-[8px] leading-tight text-amber-950">{expiry}</span>
          </div>
          <span className="text-[6.5px] font-black text-amber-700 uppercase tracking-tighter">
            MENDEKATI JATUH TEMPO ({statusText})
          </span>
        </div>
      );
    }

    if (isOnboarding) {
      return (
        <div className="inline-flex flex-col items-center px-1.5 py-0.5 rounded-lg bg-blue-50 border border-blue-300 text-blue-800 shadow-2xs">
          <div className="flex items-center gap-1">
            <Shield className="w-2.5 h-2.5 text-blue-600 stroke-[2.5]" />
            <span className="font-black text-[8px] leading-tight text-blue-950">{expiry}</span>
          </div>
          <span className="text-[6.5px] font-black text-blue-700 uppercase tracking-tighter">
            {statusText.toUpperCase()}
          </span>
        </div>
      );
    }

    return (
      <div className="inline-flex flex-col items-center px-1.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 shadow-2xs">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
          <span className="font-black text-[8px] leading-tight text-emerald-950">{expiry}</span>
        </div>
        <span className="text-[6.5px] font-black text-emerald-700 uppercase tracking-tighter">
          TERBUKA • {statusText.toUpperCase()}
        </span>
      </div>
    );
  };

  const getTierBadge = (tier: string) => {
    if (tier.includes('Founder')) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    }
    if (tier.includes('Class A')) {
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getTransactionTypeBadge = (type: CapitalTransactionType) => {
    switch (type) {
      case 'PENARIKAN_DEVIDEN':
        return (
          <span className="inline-flex items-center gap-1 text-[7.5px] font-black px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-300 font-mono shadow-2xs">
            <ArrowDownRight className="w-3 h-3 text-rose-600" />
            PENARIKAN DEVIDEN
          </span>
        );
      case 'PENAMBAHAN_HASIL_DEVIDEN':
        return (
          <span className="inline-flex items-center gap-1 text-[7.5px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono shadow-2xs">
            <RefreshCw className="w-2.5 h-2.5 text-emerald-600" />
            HASIL DEVIDEN (REINVEST)
          </span>
        );
      case 'PENAMBAHAN_CAPITAL_LUAR':
        return (
          <span className="inline-flex items-center gap-1 text-[7.5px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-300 font-mono shadow-2xs">
            <ArrowUpLeft className="w-3 h-3 text-blue-600" />
            PENAMBAHAN CAPITAL LUAR
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-y-auto xl:overflow-hidden pr-0.5 pb-0 font-mono select-none">
      {/* Toast Alert Interaksi */}
      {toastMessage && (
        <div className="fixed top-3 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-slate-800 shadow-2xl border border-slate-300/90 font-mono text-[10px] animate-in fade-in slide-in-from-top-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-bold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. TOP CARDS: 4 KEY METRIC CARDS                                */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Card 1: Total Committed AUM */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              TOTAL COMMITTED AUM
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              FUND III LP
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              {TOTAL_COMMITTED_CAPITAL}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">8 INSTITUTIONAL LPs</span>
            <span className="text-indigo-600 font-extrabold">100% DRAWDOWN</span>
          </div>
        </div>

        {/* Card 2: Audited Net NAV */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              AUDITED NET NAV
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              +23.08% NET
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              {TOTAL_CURRENT_NAV}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">UNREALIZED PROFIT</span>
            <span className="text-emerald-700 font-bold">{TOTAL_LP_NET_PROFIT}</span>
          </div>
        </div>

        {/* Card 3: Net IRR (Annualized) */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              NET IRR (ANNUALIZED)
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[9px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono">
              HURDLE 6.0%
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              +27.42% NET
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">AFTER 2/20 FEE</span>
            <span className="text-blue-700 font-extrabold">HIGH-WATER MARK</span>
          </div>
        </div>

        {/* Card 4: TOTAL DEVIDEN YANG HARUS DIKELUARKAN */}
        <div
          onClick={() => setActiveMainTab('transactions')}
          className={`${glassCard} cursor-pointer group hover:border-slate-300 hover:shadow-lg transition-all`}
          title="Klik untuk membuka Halaman Transaksi Penarikan Deviden, Penambahan Hasil Deviden & Capital Luar"
        >
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-500 uppercase font-mono flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-amber-600 stroke-[2.3]" />
              TOTAL DEVIDEN HARUS DIKELUARKAN
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[8.5px] font-bold bg-amber-500/15 text-amber-800 border border-amber-500/30 font-mono">
              SIAP DICAIRKAN
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              {TOTAL_DIVIDEND_PAYABLE}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[9.5px] font-mono">
            <span className="text-slate-400 font-medium truncate max-w-[55%]">Q3/Q4 DISTRIBUTION</span>
            <span className="text-indigo-600 font-extrabold group-hover:underline flex items-center gap-0.5 transition-colors">
              BUKA TRANSAKSI →
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. MIDDLE ROW: CHARTS (MENYATU SEMPURNA DENGAN TEMA CERAMIC GLASS) */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Chart 1: NAV Appreciation & Cumulative Return */}
        <div className={`${glassCard} p-2.5 sm:p-3 flex flex-col justify-between relative overflow-hidden`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1 font-mono pb-1 border-b border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[10px] xl:text-[11px] font-black tracking-wider text-slate-800 uppercase">
                  NAV APPRECIATION & CUMULATIVE RETURN
                </span>
              </div>
              <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/80 shadow-2xs">
                NET NAV $1,274.00
              </span>
            </div>

            {/* Light Ceramic Bezel Chart Canvas */}
            <div className="w-full h-24 my-1 relative rounded-xl bg-gradient-to-b from-white/95 via-slate-50/70 to-indigo-50/20 border border-slate-200/90 p-1 shadow-2xs overflow-hidden">
              <svg viewBox="0 0 500 90" className="w-full h-full overflow-visible cursor-crosshair">
                <defs>
                  <linearGradient id="navLightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.28" />
                    <stop offset="60%" stopColor="#c7d2fe" stopOpacity="0.10" />
                    <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="20" x2="500" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.8" />
                <line x1="0" y1="50" x2="500" y2="50" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.8" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#cbd5e1" strokeWidth="1" opacity="0.9" />

                <polygon
                  points="20,76 110,64 200,50 290,38 380,26 470,14 470,85 20,85"
                  fill="url(#navLightGrad)"
                />

                <path
                  d="M 20,76 Q 65,70 110,64 T 200,50 T 290,38 T 380,26 T 470,14"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2.5"
                />

                {NAV_HISTORY.map((pt, idx) => {
                  const isHovered = hoveredNavPoint?.period === pt.period;
                  return (
                    <g key={idx} className="cursor-pointer">
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 5.5 : 3.8}
                        fill={isHovered ? '#4338ca' : '#4f46e5'}
                        stroke="#ffffff"
                        strokeWidth={isHovered ? 2.5 : 1.8}
                        className="transition-all duration-100"
                        onMouseEnter={() => setHoveredNavPoint(pt)}
                        onMouseLeave={() => setHoveredNavPoint(null)}
                      />
                      <text
                        x={pt.x}
                        y="88"
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="6.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {pt.period}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {hoveredNavPoint && (
                <div
                  style={{ left: `${(hoveredNavPoint.x / 500) * 88}%`, top: '-6px' }}
                  className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-white/95 border border-slate-300 rounded-xl p-2 text-slate-800 font-mono text-[8px] shadow-xl backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="font-black text-indigo-700 text-[9px] border-b border-slate-200 pb-0.5 mb-1">
                    {hoveredNavPoint.period} Performance
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-600">
                    <span>Net NAV Per Unit:</span>
                    <span className="font-extrabold text-slate-900">{hoveredNavPoint.nav}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-600">
                    <span>Cumulative Return:</span>
                    <span className="font-extrabold text-emerald-600">{hoveredNavPoint.returnPct}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-600">
                    <span>Fund Total AUM:</span>
                    <span className="font-extrabold text-indigo-600">{hoveredNavPoint.aum}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 pt-1.5 border-t border-slate-200/80 text-[8px] font-mono text-center">
            <div className="p-1 rounded-lg bg-white/80 border border-slate-200/80">
              <span className="text-[7px] text-slate-400 block">BASE NAV</span>
              <span className="font-black text-slate-800">$1,000.00</span>
            </div>
            <div className="p-1 rounded-lg bg-white/80 border border-slate-200/80">
              <span className="text-[7px] text-slate-400 block">CURRENT NAV</span>
              <span className="font-black text-indigo-700">$1,274.00</span>
            </div>
            <div className="p-1 rounded-lg bg-white/80 border border-slate-200/80">
              <span className="text-[7px] text-slate-400 block">YTD RETURN</span>
              <span className="font-black text-emerald-600">+27.40%</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50/70 border border-emerald-200/80">
              <span className="text-[7px] text-emerald-700 block">INDEP AUDIT</span>
              <span className="font-black text-emerald-800">DELOITTE</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Quarterly LP Capital Distribution */}
        <div className={`${glassCard} p-2.5 sm:p-3 flex flex-col justify-between relative overflow-hidden`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1 font-mono pb-1 border-b border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-[10px] xl:text-[11px] font-black tracking-wider text-slate-800 uppercase">
                  QUARTERLY LP CAPITAL DISTRIBUTION
                </span>
              </div>
              <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80 font-mono">
                HURDLE 6.0% ACHIEVED
              </span>
            </div>

            {/* Light Ceramic Bezel Chart Canvas */}
            <div className="w-full h-24 my-1 relative rounded-xl bg-gradient-to-b from-white/95 via-slate-50/70 to-emerald-50/20 border border-slate-200/90 p-1 shadow-2xs overflow-hidden">
              <svg viewBox="0 0 500 90" className="w-full h-full overflow-visible cursor-crosshair">
                <line x1="0" y1="85" x2="500" y2="85" stroke="#cbd5e1" strokeWidth="1" />

                {DISTRIBUTION_HISTORY.map((bar, idx) => {
                  const isHovered = hoveredDistribBar?.quarter === bar.quarter;
                  const barY = 85 - bar.height * 0.75;
                  const barH = bar.height * 0.75;

                  return (
                    <g key={idx} className="cursor-pointer">
                      <rect
                        x={bar.x - 14}
                        y={barY}
                        width="28"
                        height={barH}
                        rx="4"
                        fill={isHovered ? '#10b981' : '#34d399'}
                        opacity={idx === DISTRIBUTION_HISTORY.length - 1 ? 0.75 : 0.95}
                        stroke={isHovered ? '#059669' : '#10b981'}
                        strokeWidth={isHovered ? 2 : 1}
                        className="transition-all duration-100"
                        onMouseEnter={() => setHoveredDistribBar(bar)}
                        onMouseLeave={() => setHoveredDistribBar(null)}
                      />
                      <text
                        x={bar.x}
                        y="92"
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="6.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {bar.quarter.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {hoveredDistribBar && (
                <div
                  style={{ left: `${(hoveredDistribBar.x / 500) * 88}%`, top: '-6px' }}
                  className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-white/95 border border-slate-300 rounded-xl p-2 text-slate-800 font-mono text-[8px] shadow-xl backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="font-black text-emerald-700 text-[9px] border-b border-slate-200 pb-0.5 mb-1">
                    {hoveredDistribBar.quarter}
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-600">
                    <span>Jumlah Distribusi:</span>
                    <span className="font-extrabold text-slate-900">{hoveredDistribBar.amount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-600">
                    <span>Hurdle Benchmark:</span>
                    <span className="font-extrabold text-emerald-600">{hoveredDistribBar.hurdle}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-600">
                    <span>Status Pencairan:</span>
                    <span className="font-extrabold text-slate-800">{hoveredDistribBar.status}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 pt-1.5 border-t border-slate-200/80 text-[8px] font-mono text-center">
            <div className="p-1 rounded-lg bg-white/80 border border-slate-200/80">
              <span className="text-[7px] text-slate-400 block">Q1 DISTRIB</span>
              <span className="font-black text-slate-800">$380K</span>
            </div>
            <div className="p-1 rounded-lg bg-white/80 border border-slate-200/80">
              <span className="text-[7px] text-slate-400 block">Q2 DISTRIB</span>
              <span className="font-black text-slate-800">$460K</span>
            </div>
            <div className="p-1 rounded-lg bg-white/80 border border-slate-200/80">
              <span className="text-[7px] text-slate-400 block">Q3 DISTRIB</span>
              <span className="font-black text-slate-800">$520K</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50/70 border border-emerald-200/80">
              <span className="text-[7px] text-emerald-700 block">Q4 PROYEKSI</span>
              <span className="font-black text-emerald-800">$680K</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. MAIN SECTION: 5 INSTITUTIONAL TABS                           */}
      {/* ============================================================== */}
      <section className={`${glassCard} flex-1 min-h-0 overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between`}>
        {/* Universal Top Tab Switcher - SERAGAM DENGAN SISTEM DESAIN DASHBOARD */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2 pb-1.5 border-b border-slate-200/80 flex-shrink-0 font-mono">
          <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/80 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveMainTab('register')}
              className={`px-2.5 py-1 rounded-lg text-[9px] uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMainTab === 'register'
                  ? 'bg-white text-slate-900 font-black shadow-sm border border-slate-200/90'
                  : 'text-slate-600 hover:text-slate-900 font-bold hover:bg-white/40'
              }`}
            >
              <Users className="w-3 h-3 stroke-[2.4]" />
              <span>REGISTER LP</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMainTab('transactions')}
              className={`px-2.5 py-1 rounded-lg text-[9px] uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMainTab === 'transactions'
                  ? 'bg-white text-slate-900 font-black shadow-sm border border-slate-200/90'
                  : 'text-slate-600 hover:text-slate-900 font-bold hover:bg-white/40'
              }`}
            >
              <Receipt className="w-3 h-3 stroke-[2.4]" />
              <span>TRANSAKSI ({transactions.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMainTab('simulator')}
              className={`px-2.5 py-1 rounded-lg text-[9px] uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMainTab === 'simulator'
                  ? 'bg-white text-slate-900 font-black shadow-sm border border-slate-200/90'
                  : 'text-slate-600 hover:text-slate-900 font-bold hover:bg-white/40'
              }`}
            >
              <Calculator className="w-3 h-3 stroke-[2.4]" />
              <span>SIMULATOR DIVIDEN</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMainTab('documents')}
              className={`px-2.5 py-1 rounded-lg text-[9px] uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMainTab === 'documents'
                  ? 'bg-white text-slate-900 font-black shadow-sm border border-slate-200/90'
                  : 'text-slate-600 hover:text-slate-900 font-bold hover:bg-white/40'
              }`}
            >
              <FolderCheck className="w-3 h-3 stroke-[2.4]" />
              <span>DATA ROOM & AUDIT</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMainTab('waterfall')}
              className={`px-2.5 py-1 rounded-lg text-[9px] uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMainTab === 'waterfall'
                  ? 'bg-white text-slate-900 font-black shadow-sm border border-slate-200/90'
                  : 'text-slate-600 hover:text-slate-900 font-bold hover:bg-white/40'
              }`}
            >
              <Layers className="w-3 h-3 stroke-[2.4]" />
              <span>ALOKASI & WATERFALL</span>
            </button>
          </div>

          {/* Action button conditional on active tab */}
          {activeMainTab === 'transactions' && (
            <button
              type="button"
              onClick={() => setIsAddTxModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-[9px] font-black uppercase tracking-wider shadow-xs cursor-pointer active:translate-y-0.5 transition-all self-start sm:self-auto"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.3]" />
              <span>INPUT TRANSAKSI BARU</span>
            </button>
          )}

          {activeMainTab === 'documents' && (
            <div className="flex items-center gap-1 text-[8px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SEC REG D / DELOITTE AUDITED VAULT</span>
            </div>
          )}
        </div>

        {/* Tab 1: REGISTER LP */}
        {activeMainTab === 'register' && (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5 pb-1 border-b border-slate-200/80 flex-shrink-0 font-mono">
              <div className="flex items-center gap-1 flex-wrap text-[7.5px]">
                <span className="text-[9px] font-black text-slate-800 uppercase mr-1">
                  STATUS LP:
                </span>
                {['ALL', 'Active', 'Pending KYC', 'Redeem Requested', 'Capital Call Pending'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setFilterStatus(st)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      filterStatus === st
                        ? 'bg-slate-900 text-white font-black shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {st === 'ALL' ? 'SEMUA' : st.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-2.5 h-2.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari LP / Entitas / Sektor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-5 pr-2 py-0.5 text-[8px] rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 w-36 sm:w-48 font-mono"
                />
              </div>
            </div>

            {/* Table LP */}
            <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0 pr-0.5 custom-scroll">
              <table className="w-full text-left font-mono text-[9px] min-w-[960px]">
                <thead className="sticky top-0 bg-[#f8fafc]/95 backdrop-blur-sm z-10">
                  <tr className="border-b border-slate-200 text-[7.5px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-1.5 px-2">ID / Code</th>
                    <th className="py-1.5 px-2">Entity / Name</th>
                    <th className="py-1.5 px-2">Tier / Class</th>
                    <th className="py-1.5 px-2 text-right">Committed Capital</th>
                    <th className="py-1.5 px-2 text-right">Current NAV / Value</th>
                    <th className="py-1.5 px-2 text-right">Net Return (%)</th>
                    <th className="py-1.5 px-2 text-center">Lockup Status & Expiry</th>
                    <th className="py-1.5 px-2 text-center">Status</th>
                    <th className="py-1.5 px-2 text-center">Aksi Cepat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInvestors.map((i) => (
                    <tr
                      key={i.lpId}
                      onClick={() => setSelectedLP(i)}
                      className="hover:bg-indigo-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-2 px-2 font-black text-slate-900">
                        <div className="inline-flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-md bg-slate-900 text-white font-mono text-[8px] flex items-center justify-center font-bold shadow-2xs">
                            {i.lpId.replace('LP-', '')}
                          </span>
                          <span className="tracking-tight">{i.lpId}</span>
                        </div>
                      </td>

                      <td className="py-2 px-2">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-800 group-hover:text-indigo-700 transition-colors leading-tight">
                            {i.entityName}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[7.5px] text-slate-500 font-medium">
                              {i.sector}
                            </span>
                            <span className="text-[7px] text-slate-400">• {i.domicile}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 px-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[7.5px] font-black border ${getTierBadge(
                            i.tierClass
                          )}`}
                        >
                          {i.tierClass}
                        </span>
                      </td>

                      <td className="py-2 px-2 text-right font-black text-slate-900">
                        {i.committedCapital}
                      </td>

                      <td className="py-2 px-2 text-right font-black text-indigo-700">
                        {i.currentNav}
                      </td>

                      <td className="py-2 px-2 text-right">
                        <span
                          className={`font-black ${
                            i.netReturnNum > 0
                              ? 'text-emerald-600'
                              : i.netReturnNum === 0
                              ? 'text-slate-500'
                              : 'text-rose-600'
                          }`}
                        >
                          {i.netReturn}
                        </span>
                      </td>

                      <td className="py-2 px-2 text-center">
                        {getLockupBadge(i.lockupStatus, i.lockupExpiry)}
                      </td>

                      <td className="py-2 px-2 text-center">
                        {getStatusBadge(i.status)}
                      </td>

                      <td className="py-2 px-2 text-center">
                        <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setSelectedLP(i)}
                            className="w-6 h-6 rounded-lg bg-white border border-slate-200 hover:bg-slate-900 hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            title="Buka Lembar Arsip LP"
                          >
                            <Eye className="w-3 h-3 stroke-[2.2]" />
                          </button>

                          <button
                            type="button"
                            onClick={() => triggerDownload(i)}
                            className="w-6 h-6 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            title="Unduh Laporan Kuartalan (PDF)"
                          >
                            <ArrowDownToLine className="w-3 h-3 stroke-[2.2]" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              showToast(`Kustodian ${i.custodianBank} - Rekening Terverifikasi SEC Reg D`);
                            }}
                            className="w-6 h-6 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            title={`Kustodian: ${i.custodianBank}`}
                          >
                            <ShieldCheck className="w-3 h-3 stroke-[2.2]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Summary Strip */}
            <div className="flex-shrink-0 flex items-center justify-between pt-1 border-t border-slate-200/80 text-[7.5px] sm:text-[8px] font-mono text-slate-500 mt-1">
              <div className="flex items-center gap-2">
                <span>DELAWARE MASTER-FEEDER & CAYMAN LP ENTITY</span>
                <span className="hidden sm:inline text-slate-400">• 2/20 FEE STRUCTURE</span>
                <span className="hidden sm:inline text-slate-400">• HURDLE RATE 6.0%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">TOTAL COMMITTED:</span>
                <span className="text-slate-900 font-black">{TOTAL_COMMITTED_CAPITAL}</span>
                <span className="text-emerald-700 font-extrabold ml-1">NAV {TOTAL_CURRENT_NAV}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: TRANSAKSI (ARUS KAS MODAL & DIVIDEN) */}
        {activeMainTab === 'transactions' && (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Header Ringkasan Arus Kas Deviden & Capital */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 flex-shrink-0 font-mono">
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[7.5px] font-bold text-slate-500 uppercase block">
                    TOTAL PENARIKAN DEVIDEN (WITHDRAWN)
                  </span>
                  <span className="text-base font-black text-rose-700 block">
                    {TOTAL_DIVIDEND_WITHDRAWN}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                  <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[7.5px] font-bold text-slate-500 uppercase block">
                    PENAMBAHAN HASIL DEVIDEN (REINVEST)
                  </span>
                  <span className="text-base font-black text-emerald-700 block">
                    {TOTAL_DIVIDEND_REINVESTED}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[7.5px] font-bold text-slate-500 uppercase block">
                    PENAMBAHAN CAPITAL DARI LUAR (INFLOW)
                  </span>
                  <span className="text-base font-black text-indigo-700 block">
                    {TOTAL_EXTERNAL_CAPITAL_INFLOW}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
                  <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Filter Bar Transaksi */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5 pb-1 border-b border-slate-200/80 flex-shrink-0 font-mono">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[9px] font-black text-slate-800 uppercase mr-1">
                  KATEGORI:
                </span>
                {[
                  { id: 'ALL', label: `SEMUA (${transactions.length})` },
                  { id: 'PENARIKAN_DEVIDEN', label: 'PENARIKAN DEVIDEN' },
                  { id: 'PENAMBAHAN_HASIL_DEVIDEN', label: 'HASIL REINVEST' },
                  { id: 'PENAMBAHAN_CAPITAL_LUAR', label: 'CAPITAL DARI LUAR' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFilterTxType(t.id)}
                    className={`px-2 py-0.5 rounded text-[7.5px] font-black cursor-pointer transition-colors ${
                      filterTxType === t.id
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-2.5 h-2.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari TX / Entitas / Bank..."
                  value={searchTxQuery}
                  onChange={(e) => setSearchTxQuery(e.target.value)}
                  className="pl-5 pr-2 py-0.5 text-[8px] rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 w-44 font-mono"
                />
              </div>
            </div>

            {/* Tabel Riwayat Transaksi Finansial */}
            <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0 pr-0.5 custom-scroll">
              <table className="w-full text-left font-mono text-[9px] min-w-[960px]">
                <thead className="sticky top-0 bg-[#f8fafc]/95 backdrop-blur-sm z-10">
                  <tr className="border-b border-slate-200 text-[7.5px] font-black uppercase text-slate-400 tracking-wider">
                    <th className="py-1.5 px-2">ID Transaksi</th>
                    <th className="py-1.5 px-2">Tanggal & Waktu</th>
                    <th className="py-1.5 px-2">Kategori Transaksi</th>
                    <th className="py-1.5 px-2">Institusi LP / Investor</th>
                    <th className="py-1.5 px-2 text-right">Nominal ($)</th>
                    <th className="py-1.5 px-2">Jalur Bank / Kustodian</th>
                    <th className="py-1.5 px-2 text-center">Status</th>
                    <th className="py-1.5 px-2 text-center">Bukti / Slip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-2 font-black text-slate-900">
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white text-[8px] font-mono shadow-2xs">
                          {tx.txCode}
                        </span>
                      </td>

                      <td className="py-2 px-2 text-slate-600 text-[8px] whitespace-nowrap">
                        {tx.timestamp}
                      </td>

                      <td className="py-2 px-2">
                        {getTransactionTypeBadge(tx.type)}
                      </td>

                      <td className="py-2 px-2">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-800 leading-tight">
                            {tx.lpName}
                          </span>
                          <span className="text-[7px] text-slate-400">ID: {tx.lpId} • {tx.referenceNote}</span>
                        </div>
                      </td>

                      <td className="py-2 px-2 text-right font-black">
                        <span
                          className={
                            tx.type === 'PENARIKAN_DEVIDEN'
                              ? 'text-rose-600'
                              : tx.type === 'PENAMBAHAN_HASIL_DEVIDEN'
                              ? 'text-emerald-600'
                              : 'text-indigo-600'
                          }
                        >
                          {tx.type === 'PENARIKAN_DEVIDEN' ? '-' : '+'}
                          {tx.amountFormatted}
                        </span>
                      </td>

                      <td className="py-2 px-2 text-slate-700 text-[8px]">
                        {tx.bankChannel}
                      </td>

                      <td className="py-2 px-2 text-center">
                        <span
                          className={`inline-block px-1.5 py-0.2 rounded text-[7.5px] font-black border font-mono ${
                            tx.status === 'COMPLETED'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : tx.status === 'PENDING_SETTLEMENT'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>

                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            showToast(`Mengunduh Bukti Transfer SWIFT: ${tx.txCode}_Audit_Voucher.pdf`);
                          }}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:bg-slate-900 hover:text-white text-slate-700 text-[7px] font-black uppercase transition-colors shadow-2xs cursor-pointer inline-flex items-center gap-1"
                        >
                          <FileDown className="w-2.5 h-2.5" />
                          <span>SLIP</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Ledger Transaksi */}
            <div className="flex-shrink-0 flex items-center justify-between pt-1 border-t border-slate-200/80 text-[7.5px] sm:text-[8px] font-mono text-slate-500 mt-1">
              <span>AUDITED LEDGER FUND III • WIRE SWIFT MT103 / FEDWIRE COMPLIANT</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-700 font-extrabold">SISA DEVIDEN PAYABLE: {TOTAL_DIVIDEND_PAYABLE}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: SIMULATOR DIVIDEN & PROYEKSI LP */}
        {activeMainTab === 'simulator' && (
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-0.5 custom-scroll font-mono">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Sisi Kiri: Panel Input Simulator (5 kolom) */}
              <div className="lg:col-span-5 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase">
                        PARAMETER SIMULASI LP
                      </h4>
                      <span className="text-[7.5px] text-slate-400">
                        Kalkulasi Waterfall 2/20 & Hurdle 6.0%
                      </span>
                    </div>
                  </div>
                  <span className="text-[8px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    REAL-TIME
                  </span>
                </div>

                {/* 1. Modal Investasi (Slider + Direct Input) */}
                <div>
                  <div className="flex items-center justify-between text-[8px] mb-1">
                    <span className="font-bold text-slate-600 uppercase">1. KOMITMEN MODAL INVESTASI (USD)</span>
                    <span className="font-black text-indigo-700 text-[10px]">
                      ${simCapital.toLocaleString('en-US')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={simCapital}
                    onChange={(e) => setSimCapital(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[7px] text-slate-400 mt-1">
                    <span>$100K</span>
                    <span>$1.0M</span>
                    <span>$2.5M</span>
                    <span>$5.0M</span>
                  </div>
                </div>

                {/* 2. Pemilihan Tier LP */}
                <div>
                  <label className="text-[8px] font-bold text-slate-600 uppercase block mb-1">
                    2. KELAS TIER INVESTOR
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'Founder', label: 'Founder Tier', fee: '1.5% / 15%' },
                      { id: 'ClassA', label: 'Class A LP', fee: '2.0% / 20%' },
                      { id: 'ClassB', label: 'Class B LP', fee: '2.0% / 20%' },
                    ].map((tr) => (
                      <button
                        key={tr.id}
                        type="button"
                        onClick={() => setSimTier(tr.id as any)}
                        className={`p-1.5 rounded-xl border text-left cursor-pointer transition-all ${
                          simTier === tr.id
                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-[8px] font-black block leading-tight">{tr.label}</span>
                        <span className={`text-[6.5px] block mt-0.5 ${simTier === tr.id ? 'text-slate-300' : 'text-slate-400'}`}>
                          Fee: {tr.fee}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Estimasi Return Tahunan Portofolio */}
                <div>
                  <div className="flex items-center justify-between text-[8px] mb-1">
                    <span className="font-bold text-slate-600 uppercase">3. PROYEKSI RETURN TAHUNAN FUND</span>
                    <span className="font-black text-emerald-700 text-[10px]">
                      +{simReturnPct.toFixed(1)}% / TAHUN
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="40"
                    step="0.5"
                    value={simReturnPct}
                    onChange={(e) => setSimReturnPct(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[7px] text-slate-400 mt-1">
                    <span>12% (Konservatif)</span>
                    <span>25% (Rata-rata Historis)</span>
                    <span>40% (Bull Macro)</span>
                  </div>
                </div>

                {/* 4. Model Distribusi Dividen (Cash vs Reinvest) */}
                <div>
                  <label className="text-[8px] font-bold text-slate-600 uppercase block mb-1">
                    4. OPSI PENCAIRAN HASIL DEVIDEN
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSimReinvestMode('cash')}
                      className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                        simReinvestMode === 'cash'
                          ? 'bg-white border-slate-400 text-slate-900 font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <ArrowDownRight className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-[8px] font-black uppercase">Pencairan Tunai</span>
                      </div>
                      <span className="text-[7px] text-slate-500 block mt-1">
                        Dividen ditransfer tiap kuartal ke rekening bank kustodian.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSimReinvestMode('reinvest')}
                      className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                        simReinvestMode === 'reinvest'
                          ? 'bg-white border-slate-400 text-slate-900 font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[8px] font-black uppercase">Auto-Reinvestasi</span>
                      </div>
                      <span className="text-[7px] text-slate-500 block mt-1">
                        Dividen digulung kembali ke modal pokok (bunga berbunga).
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sisi Kanan: Output Proyeksi & Hasil Kalkulator (7 kolom) */}
              <div className="lg:col-span-7 flex flex-col gap-2.5">
                {/* 2 Card Hasil Utama */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[8px] font-extrabold text-slate-500 uppercase block">
                      NET DEVIDEN KUARPALAN (PER 3 BULAN)
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-600 block my-1">
                      ${simulationResults.netLpQuarterlyPayout.toLocaleString('en-US', {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                    <span className="text-[7.5px] font-bold text-slate-400">
                      Disetorkan setiap akhir kuartal setelah audit
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[8px] font-extrabold text-slate-500 uppercase block">
                      IMBAL HASIL BERSIH LP (EFFECTIVE YIELD)
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-indigo-700 block my-1">
                      +{simulationResults.effectiveNetYieldPct.toFixed(2)}% / TAHUN
                    </span>
                    <span className="text-[7.5px] font-bold text-slate-400">
                      Bersih setelah Management Fee & 20% Carried Interest
                    </span>
                  </div>
                </div>

                {/* Rincian Dekomposisi Waterfall Finansial */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-[8.5px]">
                  <h5 className="font-black text-slate-800 uppercase mb-2 border-b border-slate-100 pb-1 flex items-center justify-between">
                    <span>RINCIAN WATERFALL PEMBAGIAN HASIL (1 TAHUN)</span>
                    <span className="text-slate-400 font-normal">HURDLE RATE 6.0% PROTEKSI LP</span>
                  </h5>

                  <div className="flex flex-col gap-1.5 text-slate-600">
                    <div className="flex justify-between items-center">
                      <span>Proyeksi Keuntungan Kotor Fund (Gross Alpha):</span>
                      <span className="font-black text-slate-900">
                        +${simulationResults.grossAnnualProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-blue-700">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-blue-600" />
                        Preferred Return LP (Hurdle Rate 6% Mutlak Diterima LP Dulu):
                      </span>
                      <span className="font-bold">
                        ${simulationResults.hurdleAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-500">
                      <span>Biaya Pengelolaan Investasi (Management Fee):</span>
                      <span>
                        -${simulationResults.mgmtFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-500">
                      <span>Bagi Hasil Kinerja Pengelola (GP Carried Interest):</span>
                      <span>
                        -${simulationResults.gpCarriedInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-1.5 border-t border-slate-200 text-emerald-700 text-[9.5px]">
                      <span className="font-black">TOTAL HASIL BERSIH LP (1 TAHUN):</span>
                      <span className="font-black text-base">
                        +${simulationResults.netLpAnnualProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Proyeksi Nilai Modal Selama 3 Tahun (Tampilan Ringan Ceramic) */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-[8.5px]">
                  <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-1">
                    <span className="font-black text-slate-800 uppercase">
                      PROYEKSI NILAI AKUN MODAL LP (3 TAHUN HORIZON)
                    </span>
                    <span className="text-[7.5px] text-indigo-700 font-bold">
                      MODE: {simReinvestMode === 'cash' ? 'PENCAIRAN TUNAI' : 'COMPOUNDING REINVESTMENT'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[7px] text-slate-400 block">AKHIR TAHUN 1</span>
                      <span className="text-sm font-black text-slate-900 block mt-0.5">
                        ${simulationResults.year1Nav.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[7px] text-slate-400 block">AKHIR TAHUN 2</span>
                      <span className="text-sm font-black text-indigo-700 block mt-0.5">
                        ${simulationResults.year2Nav.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[7px] text-slate-400 block">AKHIR TAHUN 3</span>
                      <span className="text-sm font-black text-emerald-700 block mt-0.5">
                        ${simulationResults.year3Nav.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: DATA ROOM & DOKUMEN AUDIT LP */}
        {activeMainTab === 'documents' && (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden font-mono">
            {/* Filter Kategori Dokumen & Pencarian */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5 pb-1 border-b border-slate-200/80 flex-shrink-0">
              <div className="flex items-center gap-1 flex-wrap text-[7.5px]">
                <span className="text-[9px] font-black text-slate-800 uppercase mr-1">
                  KATEGORI:
                </span>
                {['ALL', 'AUDIT', 'LEGAL', 'TAX', 'PERFORMANCE'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterDocCategory(cat)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      filterDocCategory === cat
                        ? 'bg-slate-900 text-white font-black shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat === 'ALL' ? 'SEMUA DOKUMEN' : cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-2.5 h-2.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari Dokumen / Lembaga Audit..."
                  value={searchDocQuery}
                  onChange={(e) => setSearchDocQuery(e.target.value)}
                  className="pl-5 pr-2 py-0.5 text-[8px] rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 w-44 font-mono"
                />
              </div>
            </div>

            {/* Grid Dokumen Vault */}
            <div className="overflow-y-auto flex-1 min-h-0 pr-0.5 custom-scroll">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span
                          className={`text-[7px] font-black px-1.5 py-0.2 rounded uppercase border ${
                            doc.category === 'AUDIT'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : doc.category === 'LEGAL'
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : doc.category === 'TAX'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}
                        >
                          {doc.category}
                        </span>
                        <span className="text-[7px] text-slate-400">{doc.date}</span>
                      </div>

                      <h5 className="text-[10px] font-black text-slate-900 leading-tight mb-1">
                        {doc.title}
                      </h5>

                      <p className="text-[8px] text-slate-500 leading-snug mb-2 line-clamp-2">
                        {doc.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-[7.5px]">
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="font-bold">Lembaga: {doc.issuer}</span>
                        <span className="text-slate-400">{doc.fileSize}</span>
                      </div>

                      <div className="text-[6.5px] text-slate-400 font-mono truncate">
                        {doc.checksum}
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedDocPreview(doc)}
                          className="flex-1 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase text-[7.5px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <Eye className="w-2.5 h-2.5" />
                          <span>PRATINJAU</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => triggerDownloadDoc(doc)}
                          className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-[7.5px] flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        >
                          <Download className="w-2.5 h-2.5" />
                          <span>UNDUH PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Summary Vault */}
            <div className="flex-shrink-0 flex items-center justify-between pt-1 border-t border-slate-200/80 text-[7.5px] sm:text-[8px] text-slate-500 mt-1">
              <span>SECURITY LEVEL: RESTRICTED LP ONLY • SECURED 256-BIT ENCRYPTION</span>
              <span className="text-emerald-700 font-bold">SEMUA DOKUMEN TERTANDATANGAN RESMI</span>
            </div>
          </div>
        )}

        {/* Tab 5: ALOKASI LP & STRUKTUR WATERFALL */}
        {activeMainTab === 'waterfall' && (
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-0.5 custom-scroll font-mono">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Kolom Kiri: Diversifikasi Tipe Investor LP & Tier Structure (6 kolom) */}
              <div className="lg:col-span-6 flex flex-col gap-2.5">
                {/* 1. Konsentrasi Modal Berdasarkan Tipe Institusi */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                    <span className="text-[9px] font-black text-slate-900 uppercase">
                      DIVERSIFIKASI INSTITUSI LP (AUM $12.45M)
                    </span>
                    <span className="text-[7.5px] text-indigo-700 font-bold">5 KATEGORI</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {LP_CONCENTRATION_BY_TYPE.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center text-[8px] mb-0.5">
                          <span className="font-bold text-slate-700">{item.type}</span>
                          <span className="font-black text-slate-900">
                            {item.amount} ({item.pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Struktur Tier Kelas Investor (Founder, Class A, Class B) */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-[8px]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                    <span className="text-[9px] font-black text-slate-900 uppercase">
                      STRUKTUR SYARAT KELAS TIER LP
                    </span>
                    <span className="text-[7.5px] text-slate-400">TERM SHEET MASTER</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {LP_TIER_CONFIG.map((tc, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                      >
                        <div>
                          <span className="font-black text-slate-900 block leading-tight text-[8.5px]">
                            {tc.tier}
                          </span>
                          <span className="text-[6.5px] text-indigo-600 font-extrabold block mt-0.5">
                            Min: {tc.minCommitment}
                          </span>
                        </div>
                        <div className="mt-1.5 pt-1.5 border-t border-slate-200 text-[7px] text-slate-600 flex flex-col gap-0.5">
                          <span>Fee: {tc.mgmtFee} Mgmt</span>
                          <span>Carry: {tc.carriedInterest}</span>
                          <span>Hurdle: {tc.hurdle}</span>
                          <span className="text-slate-400">Lockup: {tc.lockup}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Diagram 4-Tier Waterfall & Kalender Pembayaran Dividen (6 kolom) */}
              <div className="lg:col-span-6 flex flex-col gap-2.5">
                {/* 1. Waterfall Distribution 4-Tier American Schema (Tampilan Ceramic) */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-[8px]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                    <span className="font-black text-slate-800 uppercase text-[9px]">
                      WATERFALL DISTRIBUSI HASIL (AMERICAN 4-TIER)
                    </span>
                    <span className="text-[7.5px] font-black text-emerald-700">
                      HIGH-WATER MARK TERPENUHI
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex justify-between items-center text-slate-900 font-bold mb-0.5">
                        <span>1. TIER 1: RETURN OF CAPITAL (100% KE LP)</span>
                        <span className="text-indigo-700 font-black">$12,450,000</span>
                      </div>
                      <span className="text-[7px] text-slate-500 block">
                        Seluruh pokok komitmen modal LP dipulangkan terlebih dahulu tanpa potongan.
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex justify-between items-center text-slate-900 font-bold mb-0.5">
                        <span>2. TIER 2: PREFERRED HURDLE (6.0% TAHUNAN KE LP)</span>
                        <span className="text-emerald-700 font-black">$747,000</span>
                      </div>
                      <span className="text-[7px] text-slate-500 block">
                        Imbal hasil minimum yang wajib dinikmati LP sebelum GP berhak atas bagi hasil.
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex justify-between items-center text-slate-900 font-bold mb-0.5">
                        <span>3. TIER 3: GP CATCH-UP (20% SHARE KE GP)</span>
                        <span className="text-amber-700 font-black">$186,750</span>
                      </div>
                      <span className="text-[7px] text-slate-500 block">
                        Mekanisme catch-up proporsional untuk tim manajer investasi (GP).
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex justify-between items-center text-slate-900 font-black mb-0.5">
                        <span>4. TIER 4: 80 / 20 CARRIED INTEREST SPLIT</span>
                        <span className="text-indigo-700 font-black">80% LP / 20% GP</span>
                      </div>
                      <span className="text-[7px] text-slate-500 block">
                        Sisa keuntungan kumulatif dibagi 80% ke LP dan 20% ke General Partner.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Kalender Jadwal Distribusi Dividen Kuartalan */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-[8px]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                    <span className="text-[9px] font-black text-slate-900 uppercase">
                      JADWAL DISTRIBUSI DEVIDEN KUARTALAN 2026
                    </span>
                    <span className="text-[7.5px] text-emerald-700 font-bold">RECORD & WIRE DATE</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono">
                      <thead>
                        <tr className="border-b border-slate-200 text-[7px] text-slate-400 uppercase">
                          <th className="py-1">Kuartal</th>
                          <th className="py-1">Record Date</th>
                          <th className="py-1">Payout Date</th>
                          <th className="py-1 text-right">Net LP Distribution</th>
                          <th className="py-1 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-[8px]">
                        {DIVIDEND_WATERFALL_CALENDAR.map((dw, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-1.5 font-black text-slate-900">{dw.quarter}</td>
                            <td className="py-1.5 text-slate-500">{dw.recordDate}</td>
                            <td className="py-1.5 text-slate-700 font-medium">{dw.payoutDate}</td>
                            <td className="py-1.5 text-right font-black text-emerald-700">
                              {dw.netLpDistribution}
                            </td>
                            <td className="py-1.5 text-center">
                              <span
                                className={`px-1.5 py-0.2 rounded text-[7px] font-black ${
                                  dw.status === 'PAID'
                                    ? 'bg-slate-100 text-slate-700'
                                    : dw.status === 'READY_FOR_PAYOUT'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-blue-50 text-blue-700'
                                }`}
                              >
                                {dw.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 4. MODALS (3D SOLID CERAMIC GLASS THEME)                       */}
      {/* ============================================================== */}
      {/* MODAL 1: FORM INPUT TRANSAKSI BARU */}
      {isAddTxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-100">
          <div className="w-full max-w-lg bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_20px_40px_-8px_rgba(15,23,42,0.3)] p-4 sm:p-5 text-slate-800 font-mono">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    PROSES TRANSAKSI DEVIDEN & CAPITAL
                  </h3>
                  <span className="text-[8px] text-slate-500">
                    Otorisasi Penarikan, Reinvestasi Deviden, atau Penambahan Modal Luar
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddTxModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} className="flex flex-col gap-2.5 text-xs">
              {/* Pilihan Jenis Transaksi */}
              <div>
                <label className="text-[8px] font-black text-slate-500 uppercase block mb-1">
                  1. JENIS TRANSAKSI FINANSIAL
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setNewTxType('PENARIKAN_DEVIDEN')}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      newTxType === 'PENARIKAN_DEVIDEN'
                        ? 'bg-rose-50 border-rose-300 text-rose-800 font-black shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[7.5px] uppercase block font-bold">DEVIDEN KELUAR</span>
                    <span className="text-[9px] font-black block mt-0.5">Penarikan Deviden</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewTxType('PENAMBAHAN_HASIL_DEVIDEN')}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      newTxType === 'PENAMBAHAN_HASIL_DEVIDEN'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-black shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[7.5px] uppercase block font-bold">REINVESTASI</span>
                    <span className="text-[9px] font-black block mt-0.5">Penambahan Hasil Deviden</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewTxType('PENAMBAHAN_CAPITAL_LUAR')}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      newTxType === 'PENAMBAHAN_CAPITAL_LUAR'
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-800 font-black shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[7.5px] uppercase block font-bold">INFLOW MODAL</span>
                    <span className="text-[9px] font-black block mt-0.5">Capital dari Luar</span>
                  </button>
                </div>
              </div>

              {/* Pilihan LP Investor */}
              <div>
                <label className="text-[8px] font-black text-slate-500 uppercase block mb-1">
                  2. AKUN LP / ENTITAS INVESTOR
                </label>
                <select
                  value={newTxLpId}
                  onChange={(e) => setNewTxLpId(e.target.value)}
                  className="w-full p-2 text-[9px] font-mono rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-400 font-bold"
                >
                  {INVESTORS.map((lp) => (
                    <option key={lp.lpId} value={lp.lpId}>
                      {lp.lpId} - {lp.entityName} ({lp.sector})
                    </option>
                  ))}
                </select>
              </div>

              {/* Nominal Transaksi ($) */}
              <div>
                <label className="text-[8px] font-black text-slate-500 uppercase block mb-1">
                  3. NOMINAL TRANSAKSI (USD $)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-black">$</span>
                  <input
                    type="number"
                    step="10000"
                    value={newTxAmount}
                    onChange={(e) => setNewTxAmount(e.target.value)}
                    required
                    className="w-full pl-7 pr-3 py-1.5 text-xs font-black font-mono rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-400"
                    placeholder="Contoh: 150000"
                  />
                </div>
              </div>

              {/* Bank Kustodian & Keterangan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[8px] font-black text-slate-500 uppercase block mb-1">
                    4. BANK KUSTODIAN / ROUTING
                  </label>
                  <input
                    type="text"
                    value={newTxBank}
                    onChange={(e) => setNewTxBank(e.target.value)}
                    className="w-full p-1.5 text-[8.5px] font-mono rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-400"
                    placeholder="BNY Mellon / State Street"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-black text-slate-500 uppercase block mb-1">
                    5. REFERENSI / DESKRIPSI
                  </label>
                  <input
                    type="text"
                    value={newTxNote}
                    onChange={(e) => setNewTxNote(e.target.value)}
                    className="w-full p-1.5 text-[8.5px] font-mono rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-400"
                    placeholder="Distribusi Dividen Semester II"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 mt-1">
                <button
                  type="button"
                  onClick={() => setIsAddTxModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>KIRIM & PROSES TRANSAKSI</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DOSSIER DETAIL LP (FUND MANAGEMENT ARCHIVE) */}
      {selectedLP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-100">
          <div className="w-full max-w-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_20px_40px_-8px_rgba(15,23,42,0.3)] p-4 sm:p-5 text-slate-800 font-mono">
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  {selectedLP.lpId}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-black text-slate-900 uppercase">
                      {selectedLP.entityName}
                    </h3>
                    {getStatusBadge(selectedLP.status)}
                  </div>
                  <span className="text-[9px] text-slate-500">
                    SEKTOR: {selectedLP.sector} • DOMISILI: {selectedLP.domicile}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLP(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3 text-xs">
              <div className="p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[7.5px] text-slate-400 uppercase block font-bold">
                  COMMITTED CAPITAL
                </span>
                <span className="text-sm font-black text-slate-900 block mt-0.5">
                  {selectedLP.committedCapital}
                </span>
                <span className="text-[7px] text-slate-500 font-semibold">{selectedLP.tierClass}</span>
              </div>

              <div className="p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-[7.5px] text-slate-400 uppercase block font-bold">
                  CURRENT NAV / VALUE
                </span>
                <span className="text-sm font-black text-indigo-700 block mt-0.5">
                  {selectedLP.currentNav}
                </span>
                <span className="text-[7px] text-emerald-600 font-extrabold">
                  NET PROFIT: {selectedLP.netReturn}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-white border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-[7.5px] text-slate-400 uppercase block font-bold">
                  LOCKUP STATUS
                </span>
                <span className="text-sm font-black text-slate-800 block mt-0.5">
                  {selectedLP.lockupExpiry}
                </span>
                <span className="text-[7px] text-indigo-600 font-bold">{selectedLP.lockupStatus}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[8.5px] flex flex-col gap-1.5 mb-3">
              <div className="flex items-center justify-between text-slate-600 border-b border-slate-100 pb-1">
                <span className="font-bold">Hurdle Rate:</span>
                <span className="font-black text-slate-800">{selectedLP.hurdleRate} (High-Water Mark)</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 border-b border-slate-100 pb-1">
                <span className="font-bold">Fee Agreement:</span>
                <span className="font-black text-slate-800">
                  {selectedLP.managementFee} Mgmt Fee / {selectedLP.performanceFee} Carried Interest
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 border-b border-slate-100 pb-1">
                <span className="font-bold">Custodian Bank:</span>
                <span className="font-black text-slate-800">{selectedLP.custodianBank}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-bold">Subscription Date:</span>
                <span className="font-black text-slate-800">{selectedLP.subscriptionDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  triggerDownload(selectedLP);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                Unduh Laporan (PDF)
              </button>

              <button
                type="button"
                onClick={() => setSelectedLP(null)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Tutup Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PRATINJAU DOKUMEN LP DATA ROOM */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-100">
          <div className="w-full max-w-lg bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_20px_40px_-8px_rgba(15,23,42,0.3)] p-4 sm:p-5 text-slate-800 font-mono">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                    PRATINJAU DOKUMEN RESMI LP
                  </h3>
                  <span className="text-[8px] text-slate-500">
                    Aether Capital Institutional Data Room
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-200 mb-3 text-[9px] flex flex-col gap-2">
              <div>
                <span className="text-[7.5px] font-bold text-slate-400 uppercase block">JUDUL DOKUMEN</span>
                <span className="font-black text-slate-900 text-xs mt-0.5 block">
                  {selectedDocPreview.title}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[8px] pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block">Kategori:</span>
                  <span className="font-bold text-slate-800">{selectedDocPreview.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Ukuran File:</span>
                  <span className="font-bold text-slate-800">{selectedDocPreview.fileSize}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Lembaga Penerbit:</span>
                  <span className="font-bold text-slate-800">{selectedDocPreview.issuer}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tanggal Rilis:</span>
                  <span className="font-bold text-slate-800">{selectedDocPreview.date}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 block text-[7.5px]">Ringkasan Isi & Kepatuhan:</span>
                <p className="text-slate-600 text-[8px] mt-0.5 leading-relaxed">
                  {selectedDocPreview.description}
                </p>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[7px] text-slate-500">
                <span className="font-black text-slate-700 block">Digital Verification Hash:</span>
                <span className="font-mono text-emerald-700 font-bold">{selectedDocPreview.checksum}</span>
                <span className="block mt-0.5 text-slate-400">
                  Dokumen ini telah dienkripsi dan diverifikasi dengan standar Deloitte & SEC Electronic Filing.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerDownloadDoc(selectedDocPreview);
                  setSelectedDocPreview(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>UNDUH DOKUMEN RESMI (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
