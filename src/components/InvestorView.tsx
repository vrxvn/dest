import React, { useState } from 'react';
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
  Lock,
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
  INITIAL_TRANSACTIONS,
  type InvestorAccount,
  type CapitalTransaction,
  type CapitalTransactionType,
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
  // Tab tampilan utama: 'register' (Institutional LP Register) atau 'transactions' (Halaman Transaksi Deviden & Capital)
  const [activeMainTab, setActiveMainTab] = useState<'register' | 'transactions'>('register');

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

  // Interaktivitas hover tooltip pada chart
  const [hoveredNavPoint, setHoveredNavPoint] = useState<typeof NAV_HISTORY[0] | null>(null);
  const [hoveredDistribBar, setHoveredDistribBar] = useState<typeof DISTRIBUTION_HISTORY[0] | null>(null);

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
      amountFormatted: `$${numAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      status: 'COMPLETED',
      bankChannel: newTxBank,
      referenceNote: newTxNote || 'Transaksi Berhasil Dicatat ke Ledger Fund Master',
    };

    setTransactions([createdTx, ...transactions]);
    setIsAddTxModalOpen(false);
    showToast(`Transaksi ${createdTx.txCode} (${createdTx.typeLabel}) sebesar ${createdTx.amountFormatted} Berhasil Diproses!`);
  };

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

  // Indikator Status Lockup dengan warna kontras
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
          <Lock className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
          <span className="font-black text-[8px] leading-tight text-emerald-950">{expiry}</span>
        </div>
        <span className="text-[6.5px] font-black text-emerald-700 uppercase tracking-tighter">
          AMAN • {statusText.toUpperCase()}
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
    <div className="w-full h-full flex flex-col gap-1.5 sm:gap-2 overflow-hidden pr-0.5 pb-0">
      {/* Toast Alert Interaksi */}
      {toastMessage && (
        <div className="fixed top-3 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white shadow-xl border border-slate-700 font-mono text-[10px] animate-in fade-in slide-in-from-top-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. TOP KPI CARDS: DENGAN CARD 4 = TOTAL DEVIDEN YANG HARUS DIKELUARKAN */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Card 1: Total Committed AUM */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              TOTAL COMMITTED AUM
            </span>
            <span className="text-[9px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/90 font-mono">
              FUND III LP
            </span>
          </div>
          <div className="my-1">
            <div className="text-2xl sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight font-mono leading-none">
              {TOTAL_COMMITTED_CAPITAL}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">8 INSTITUTIONAL LPs</span>
            <span className="text-indigo-600 font-black">100% DRAWNDOWN</span>
          </div>
        </div>

        {/* Card 2: Audited Net NAV */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              AUDITED NET NAV
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              +23.08% NET
            </span>
          </div>
          <div className="my-1">
            <div className="text-2xl sm:text-[26px] lg:text-[28px] font-black text-emerald-600 tracking-tight font-mono leading-none">
              {TOTAL_CURRENT_NAV}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">UNREALIZED PROFIT</span>
            <span className="text-emerald-700 font-black">{TOTAL_LP_NET_PROFIT}</span>
          </div>
        </div>

        {/* Card 3: Net IRR (Annualized) */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              NET IRR (ANNUALIZED)
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-blue-500/10 text-blue-600 border border-blue-500/20 font-mono">
              HURDLE 6.0%
            </span>
          </div>
          <div className="my-1">
            <div className="text-2xl sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight font-mono leading-none">
              +27.42% NET
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">AFTER 2/20 FEE</span>
            <span className="text-blue-700 font-black">HIGH-WATER MARK</span>
          </div>
        </div>

        {/* Card 4: TOTAL DEVIDEN YANG HARUS DIKELUARKAN (CSS Selector Target) */}
        <div
          onClick={() => setActiveMainTab('transactions')}
          className={`${glassCard} cursor-pointer group hover:border-amber-400/90 hover:shadow-lg hover:brightness-[1.02] transition-all`}
          title="Klik untuk membuka Halaman Transaksi Penarikan Deviden, Penambahan Hasil Deviden & Capital Luar"
        >
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-amber-700 uppercase font-mono flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-amber-600 stroke-[2.3]" />
              TOTAL DEVIDEN HARUS DIKELUARKAN
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[8.5px] font-black bg-amber-500/15 text-amber-800 border border-amber-500/30 font-mono">
              SIAP DICAIRKAN
            </span>
          </div>
          <div className="my-1">
            <div className="text-2xl sm:text-[26px] lg:text-[28px] font-black text-amber-600 tracking-tight font-mono leading-none">
              {TOTAL_DIVIDEND_PAYABLE}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[9.5px] font-mono">
            <span className="text-slate-500 font-medium truncate max-w-[55%]">Q3/Q4 DISTRIBUTION</span>
            <span className="text-amber-800 font-black group-hover:text-indigo-600 flex items-center gap-0.5 transition-colors">
              BUKA TRANSAKSI →
            </span>
          </div>
        </div>
      </section>

      {/* 2. MIDDLE CHARTS: FINANCIAL DARK THEME AESTHETIC & INTERACTIVE TOOLTIPS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Chart 1: NAV Appreciation & Cumulative Return */}
        <div className="bg-gradient-to-b from-[#0f172a] via-[#162032] to-[#0b1120] text-white rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-slate-700 border-x border-slate-800 border-b-[4px] border-b-slate-950 shadow-[0_16px_34px_-6px_rgba(0,0,0,0.4)] p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-black tracking-wider text-slate-200 uppercase">
                  NAV APPRECIATION & CUMULATIVE RETURN
                </span>
              </div>
              <span className="text-[9.5px] font-black text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-700/80 shadow-xs">
                NET NAV $1,274.00
              </span>
            </div>

            {/* Dark Chart Canvas with Interactive SVG Points */}
            <div className="w-full h-24 my-1 relative">
              <svg viewBox="0 0 500 90" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="darkNavGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="20" x2="500" y2="20" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
                <line x1="0" y1="50" x2="500" y2="50" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#334155" strokeWidth="0.8" opacity="0.5" />

                <path d="M 20,76 C 80,68 150,52 240,40 C 330,28 400,18 470,14 L 470,80 L 20,80 Z" fill="url(#darkNavGrad)" />
                <path d="M 20,76 C 80,68 150,52 240,40 C 330,28 400,18 470,14" fill="none" stroke="#22d3ee" strokeWidth="2.8" strokeLinecap="round" />

                {NAV_HISTORY.map((pt, idx) => (
                  <g key={idx} className="cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredNavPoint?.period === pt.period ? 6 : 4}
                      fill="#0891b2"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-all duration-100"
                      onMouseEnter={() => setHoveredNavPoint(pt)}
                      onMouseLeave={() => setHoveredNavPoint(null)}
                    />
                  </g>
                ))}
              </svg>

              {hoveredNavPoint && (
                <div
                  style={{ left: `${(hoveredNavPoint.x / 500) * 88}%`, top: '-6px' }}
                  className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900/95 border border-cyan-500/80 rounded-lg p-2 text-white font-mono text-[8px] shadow-xl backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="font-black text-cyan-300 text-[9px] border-b border-slate-700 pb-0.5 mb-1">
                    {hoveredNavPoint.period}
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-300">
                    <span>NAV Per Unit:</span>
                    <span className="font-extrabold text-white">{hoveredNavPoint.nav}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-300">
                    <span>Kumulatif Imbal Hasil:</span>
                    <span className="font-extrabold text-emerald-400">{hoveredNavPoint.returnPct}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-300">
                    <span>Total AUM Portofolio:</span>
                    <span className="font-extrabold text-slate-100">{hoveredNavPoint.aum}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-slate-800 text-[8px] font-mono text-center">
            <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[7px] text-slate-400 block">BASE NAV</span>
              <span className="font-black text-slate-200">$1,000.00</span>
            </div>
            <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[7px] text-slate-400 block">CURRENT NAV</span>
              <span className="font-black text-cyan-400">$1,274.00</span>
            </div>
            <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[7px] text-slate-400 block">YTD RETURN</span>
              <span className="font-black text-emerald-400">+27.40%</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-950/60 border border-emerald-800/80">
              <span className="text-[7px] text-emerald-400 block">INDEP AUDIT</span>
              <span className="font-black text-emerald-300">DELOITTE</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Quarterly LP Capital Distribution */}
        <div className="bg-gradient-to-b from-[#0f172a] via-[#162032] to-[#0b1120] text-white rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-slate-700 border-x border-slate-800 border-b-[4px] border-b-slate-950 shadow-[0_16px_34px_-6px_rgba(0,0,0,0.4)] p-3 sm:p-3.5 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black tracking-wider text-slate-200 uppercase">
                  QUARTERLY LP CAPITAL DISTRIBUTION
                </span>
              </div>
              <span className="text-[8.5px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/80 font-mono">
                HURDLE 6.0% ACHIEVED
              </span>
            </div>

            <div className="w-full h-24 my-1 relative">
              <svg viewBox="0 0 500 90" className="w-full h-full overflow-visible">
                <line x1="0" y1="85" x2="500" y2="85" stroke="#334155" strokeWidth="1" />

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
                        fill={isHovered ? '#34d399' : '#10b981'}
                        opacity={idx === DISTRIBUTION_HISTORY.length - 1 ? 0.75 : 0.95}
                        stroke={isHovered ? '#ffffff' : '#059669'}
                        strokeWidth={isHovered ? 2 : 1}
                        className="transition-all duration-100"
                        onMouseEnter={() => setHoveredDistribBar(bar)}
                        onMouseLeave={() => setHoveredDistribBar(null)}
                      />
                      <text
                        x={bar.x}
                        y="92"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="6.5"
                        fontFamily="monospace"
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
                  className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900/95 border border-emerald-500/80 rounded-lg p-2 text-white font-mono text-[8px] shadow-xl backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="font-black text-emerald-300 text-[9px] border-b border-slate-700 pb-0.5 mb-1">
                    {hoveredDistribBar.quarter}
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-300">
                    <span>Jumlah Distribusi:</span>
                    <span className="font-extrabold text-white">{hoveredDistribBar.amount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-300">
                    <span>Hurdle Benchmark:</span>
                    <span className="font-extrabold text-emerald-400">{hoveredDistribBar.hurdle}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-300">
                    <span>Status Pencairan:</span>
                    <span className="font-extrabold text-slate-100">{hoveredDistribBar.status}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-slate-800 text-[8px] font-mono text-center">
            <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[7px] text-slate-400 block">Q1 DISTRIB</span>
              <span className="font-black text-slate-200">$380K</span>
            </div>
            <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[7px] text-slate-400 block">Q2 DISTRIB</span>
              <span className="font-black text-slate-200">$460K</span>
            </div>
            <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[7px] text-slate-400 block">Q3 DISTRIB</span>
              <span className="font-black text-slate-200">$520K</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-950/60 border border-emerald-800/80">
              <span className="text-[7px] text-emerald-400 block">Q4 PROYEKSI</span>
              <span className="font-black text-emerald-300">$680K</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KONTEN TAB: AKUN INSTITUTIONAL LP ATAU HALAMAN TRANSAKSI DEVIDEN & CAPITAL */}
      {activeMainTab === 'register' ? (
        /* TAB 1: INSTITUTIONAL LP CAPITAL REGISTER */
        <section className={`${glassCard} flex-1 min-h-0 overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between`}>
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Table Header Bar with Integrated Tab Selector (REGISTER / RIWAYAT) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1 pb-1.5 border-b border-slate-200/80 flex-shrink-0">
              <div className="flex items-center gap-1.5 bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/80 font-mono">
                <button
                  type="button"
                  onClick={() => setActiveMainTab('register')}
                  className="px-3 py-1 rounded-lg text-[9.5px] font-black uppercase transition-all cursor-pointer bg-white text-indigo-700 shadow-sm border border-slate-200"
                >
                  REGISTER
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMainTab('transactions')}
                  className="px-3 py-1 rounded-lg text-[9.5px] font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 text-slate-700 hover:text-amber-800 font-extrabold"
                >
                  <Receipt className="w-3 h-3 stroke-[2.5]" />
                  <span>RIWAYAT</span>
                </button>
              </div>

              {/* Quick Status Filter Tabs & Search */}
              <div className="flex items-center gap-1.5 flex-wrap font-mono">
                <div className="relative">
                  <Search className="w-2.5 h-2.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari LP / Entitas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-5 pr-2 py-0.5 text-[8px] rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 w-32 sm:w-40 font-mono"
                  />
                </div>

                <div className="flex items-center gap-1 text-[7.5px]">
                  {['ALL', 'Active', 'Pending KYC', 'Redeem Requested'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFilterStatus(st)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        filterStatus === st
                          ? 'bg-indigo-600 text-white font-black shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st === 'ALL' ? 'SEMUA' : st.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Smooth Horizontal Scroll Wrapper */}
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
                            className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
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
          </div>

          {/* Table Footer Summary Strip */}
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
        </section>
      ) : (
        /* TAB 2: HALAMAN TRANSAKSI PENARIKAN DEVIDEN & PENAMBAHAN CAPITAL DARI LUAR */
        <section className={`${glassCard} flex-1 min-h-0 overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between`}>
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Header Tab Selector & Action Button */}
            <div className="flex items-center justify-between gap-1.5 mb-2 pb-1.5 border-b border-slate-200/80 flex-shrink-0 font-mono">
              <div className="flex items-center gap-1.5 bg-slate-200/80 p-0.5 rounded-xl border border-slate-300/80">
                <button
                  type="button"
                  onClick={() => setActiveMainTab('register')}
                  className="px-3 py-1 rounded-lg text-[9.5px] font-black uppercase transition-all cursor-pointer text-slate-600 hover:text-slate-900"
                >
                  REGISTER
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMainTab('transactions')}
                  className="px-3 py-1 rounded-lg text-[9.5px] font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 bg-amber-500 text-white shadow-sm border border-amber-600"
                >
                  <Receipt className="w-3 h-3 stroke-[2.5]" />
                  <span>RIWAYAT</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsAddTxModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[9px] font-black uppercase tracking-wider shadow-xs cursor-pointer active:translate-y-0.5 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[2.3]" />
                <span>INPUT TRANSAKSI BARU</span>
              </button>
            </div>

            {/* Header Ringkasan Arus Kas Deviden & Capital */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 flex-shrink-0 font-mono">
              <div className="p-2 rounded-xl bg-white border border-rose-200 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[7.5px] font-bold text-rose-700 uppercase block">
                    TOTAL PENARIKAN DEVIDEN (WITHDRAWN)
                  </span>
                  <span className="text-base font-black text-rose-800 block">
                    {TOTAL_DIVIDEND_WITHDRAWN}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                  <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-emerald-200 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[7.5px] font-bold text-emerald-700 uppercase block">
                    PENAMBAHAN HASIL DEVIDEN (REINVEST)
                  </span>
                  <span className="text-base font-black text-emerald-800 block">
                    {TOTAL_DIVIDEND_REINVESTED}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-blue-200 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[7.5px] font-bold text-blue-700 uppercase block">
                    PENAMBAHAN CAPITAL DARI LUAR (INFLOW)
                  </span>
                  <span className="text-base font-black text-blue-800 block">
                    {TOTAL_EXTERNAL_CAPITAL_INFLOW}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                  <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Filter Bar Transaksi */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5 pb-1 border-b border-slate-200/80 flex-shrink-0 font-mono">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[9px] font-black text-slate-800 uppercase mr-1">
                  FILTER TRANSAKSI:
                </span>
                {[
                  { id: 'ALL', label: `SEMUA (${transactions.length})` },
                  { id: 'PENARIKAN_DEVIDEN', label: 'PENARIKAN DEVIDEN' },
                  { id: 'PENAMBAHAN_HASIL_DEVIDEN', label: 'HASIL DEVIDEN (REINVEST)' },
                  { id: 'PENAMBAHAN_CAPITAL_LUAR', label: 'CAPITAL DARI LUAR' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFilterTxType(t.id)}
                    className={`px-2 py-0.5 rounded text-[7.5px] font-black cursor-pointer transition-colors ${
                      filterTxType === t.id
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                  placeholder="Cari No. TX / Entitas / Bank..."
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
                              : 'text-blue-600'
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
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 text-[7px] font-black uppercase transition-colors shadow-2xs cursor-pointer inline-flex items-center gap-1"
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
          </div>

          {/* Footer Ledger Transaksi */}
          <div className="flex-shrink-0 flex items-center justify-between pt-1 border-t border-slate-200/80 text-[7.5px] sm:text-[8px] font-mono text-slate-500 mt-1">
            <span>AUDITED LEDGER FUND III • WIRE SWIFT MT103 / FEDWIRE COMPLIANT</span>
            <div className="flex items-center gap-2">
              <span className="text-amber-800 font-extrabold">SISA DEVIDEN PAYABLE: {TOTAL_DIVIDEND_PAYABLE}</span>
            </div>
          </div>
        </section>
      )}

      {/* MODAL 1: FORM INPUT TRANSAKSI BARU (PENARIKAN DEVIDEN, HASIL DEVIDEN, CAPITAL LUAR) */}
      {isAddTxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-100">
          <div className="w-full max-w-lg bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_20px_40px_-8px_rgba(15,23,42,0.3)] p-4 sm:p-5 text-slate-800 font-mono">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
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
                        ? 'bg-blue-50 border-blue-300 text-blue-800 font-black shadow-xs'
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
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-sm cursor-pointer flex items-center gap-1.5"
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
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                Unduh Laporan (PDF)
              </button>

              <button
                type="button"
                onClick={() => setSelectedLP(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Tutup Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
