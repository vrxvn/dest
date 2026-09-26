import { useState } from 'react';
import { Search, ShieldCheck, X, Activity, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DashboardGrid } from './components/DashboardGrid';
import { TradingOperations } from './components/TradingOperations';
import { FxFlow } from './components/FxFlow';
import { CryptoView } from './components/CryptoView';
import { GenesisView } from './components/GenesisView';
import { InvestorView } from './components/InvestorView';
import { WorkforceView } from './components/WorkforceView';
import { SecurityView } from './components/SecurityView';
import { ServerView } from './components/ServerView';
import { LegalView } from './components/LegalView';
import { AdminView } from './components/AdminView';
import { ReportView } from './components/ReportView';
import { SettingsView } from './components/SettingsView';
import { SIDEBAR_MENU_SCHEMA, SIDEBAR_BOTTOM_SCHEMA, type SidebarMenuItem } from './data/sidebarSchema';

// Real-time synchronization metrics for all 12 institutional desk menus
const DESK_SYNC_STATUS = [
  { id: 'overview', label: 'OVERVIEW', metric: '$15.32M AUM', color: 'emerald' },
  { id: 'trading', label: 'TRADING', metric: '+$384.5K PnL', color: 'indigo' },
  { id: 'fx-flow', label: 'FX FLOW', metric: '$1.84M Flow', color: 'blue' },
  { id: 'crypto', label: 'CRYPTO', metric: '$6.40M • 41.7%', color: 'amber' },
  { id: 'genesis', label: 'GENESIS', metric: 'Sharpe 3.55', color: 'purple' },
  { id: 'investor', label: 'INVESTOR', metric: '$12.45M LP', color: 'emerald' },
  { id: 'workforce', label: 'WORKFORCE', metric: '48 Desks', color: 'slate' },
  { id: 'security', label: 'SECURITY', metric: 'DEFCON 5', color: 'emerald' },
  { id: 'server', label: 'SERVER', metric: '1.08ms', color: 'indigo' },
  { id: 'legal', label: 'LEGAL', metric: '5/5 Compliant', color: 'blue' },
  { id: 'admin', label: 'ADMIN', metric: '78.4% Matrix', color: 'amber' },
  { id: 'report', label: 'REPORT', metric: 'Deloitte OK', color: 'emerald' },
];

const METRIC_COLOR_CONFIG: Record<
  string,
  { dot: string; text: string; bg: string; border: string; category: string }
> = {
  emerald: {
    dot: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50/70',
    border: 'border-emerald-200/90',
    category: 'AUM & Capital',
  },
  indigo: {
    dot: 'bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.7)]',
    text: 'text-indigo-700',
    bg: 'bg-indigo-50/70',
    border: 'border-indigo-200/90',
    category: 'PnL & Latency',
  },
  blue: {
    dot: 'bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.7)]',
    text: 'text-sky-700',
    bg: 'bg-sky-50/70',
    border: 'border-sky-200/90',
    category: 'Flow & Liquidity',
  },
  amber: {
    dot: 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.7)]',
    text: 'text-amber-700',
    bg: 'bg-amber-50/70',
    border: 'border-amber-200/90',
    category: 'Allocation & Ratio',
  },
  purple: {
    dot: 'bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.7)]',
    text: 'text-purple-700',
    bg: 'bg-purple-50/70',
    border: 'border-purple-200/90',
    category: 'Quant & AI Models',
  },
  slate: {
    dot: 'bg-slate-400 shadow-[0_0_6px_rgba(148,163,184,0.7)]',
    text: 'text-slate-700',
    bg: 'bg-slate-100/70',
    border: 'border-slate-300/80',
    category: 'Operations',
  },
};

const STATUS_LEGENDS = [
  { key: 'emerald', label: 'AUM & Capital', sample: 'e.g., $15.32M AUM / LP' },
  { key: 'indigo', label: 'PnL & Alpha', sample: 'e.g., +$384.5K PnL / 1.08ms' },
  { key: 'blue', label: 'Flow & Liquidity', sample: 'e.g., $1.84M Flow / Compliant' },
  { key: 'amber', label: 'Allocation', sample: 'e.g., 41.7% Crypto / Matrix' },
  { key: 'purple', label: 'Quant & Risk', sample: 'e.g., Sharpe 3.55' },
  { key: 'slate', label: 'Operations', sample: 'e.g., 48 Active Desks' },
];

export default function App() {
  // Pertama kali buka web langsung memunculkan Dashboard (Overview)
  const [activeItem, setActiveItem] = useState<SidebarMenuItem>(SIDEBAR_MENU_SCHEMA[0]);
  const [showDeskHubModal, setShowDeskHubModal] = useState(false);

  const handleNavigate = (menuId: string) => {
    const target =
      SIDEBAR_MENU_SCHEMA.find((m) => m.id === menuId) ||
      SIDEBAR_BOTTOM_SCHEMA.find((m) => m.id === menuId);
    if (target) {
      setActiveItem(target);
    }
  };

  const renderActiveView = () => {
    switch (activeItem.id) {
      case 'overview':
        return <DashboardGrid onNavigate={handleNavigate} />;
      case 'trading':
        return <TradingOperations />;
      case 'fx-flow':
        return <FxFlow />;
      case 'crypto':
        return <CryptoView />;
      case 'genesis':
        return <GenesisView />;
      case 'investor':
        return <InvestorView />;
      case 'workforce':
        return <WorkforceView />;
      case 'security':
        return <SecurityView />;
      case 'server':
        return <ServerView />;
      case 'legal':
        return <LegalView />;
      case 'admin':
        return <AdminView />;
      case 'report':
        return <ReportView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardGrid onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden bg-radial from-[#d5e7f4] via-[#e2eef7] to-[#ccdff0] pt-[5px] pb-[5px] px-2 sm:px-4 md:px-5 flex flex-col font-sans antialiased select-none">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating 3D Solid Sidebar (Left edge 5px / 10px) */}
      <Sidebar
        activeId={activeItem.id}
        onSelect={(item) => {
          if (item.id === 'logout') {
            setShowDeskHubModal(true);
          } else {
            setActiveItem(item);
          }
        }}
      />

      {/* Company Brand (Tepi layar, sejajar dengan menu) */}
      <div className="fixed top-[5px] left-[5px] sm:left-[10px] z-40 flex items-center">
        <button
          type="button"
          onClick={() => setActiveItem(SIDEBAR_MENU_SCHEMA[0])}
          className="flex items-center gap-2 px-2.5 py-1 bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-2xl border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_6px_14px_rgba(15,23,42,0.12),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:translate-y-[1px] transition-all cursor-pointer text-left"
        >
          {/* 3D Solid Logo Emblem */}
          <div className="w-7 h-7 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e4eaf4] border-t-[1.5px] border-t-white border-x border-slate-200 border-b-[2px] border-b-slate-300 shadow-xs flex items-center justify-center p-1 flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-full h-full text-indigo-600 fill-indigo-600/20 stroke-indigo-600 stroke-[2.2]">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Company Name & Sector Tag */}
          <div className="flex flex-col font-mono pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wide text-slate-800 uppercase leading-tight">
                AETHER CAPITAL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[8px] font-bold text-slate-400 tracking-wider uppercase leading-tight">
              INSTITUTIONAL DESK
            </span>
          </div>
        </button>
      </div>

      {/* Main Canvas Area Offset for Left Sidebar */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col pl-12 sm:pl-16 md:pl-20 pr-1 sm:pr-2 pt-0 h-full overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-end w-full mb-1 flex-shrink-0 gap-2">
          {/* Right Header: Search & Profile Avatar (3D Solid Style) */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search Button (3D Solid Style) */}
            <button
              type="button"
              aria-label="Search"
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] flex items-center justify-center text-slate-700 border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[2.5px] border-b-slate-300 shadow-[0_3px_6px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>

            {/* Profile Avatar (3D Solid Frame) */}
            <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full overflow-hidden border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[2.5px] border-b-slate-300 shadow-[0_3px_6px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,1)]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&auto=format&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Canvas */}
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {renderActiveView()}
        </main>
      </div>

      {/* Executive Desk Hub & Synchronization Modal (Replacing Unnecessary Lock Modal) */}
      {showDeskHubModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-150"
          onClick={() => setShowDeskHubModal(false)}
        >
          <div
            className="w-full max-w-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_20px_40px_-8px_rgba(15,23,42,0.3),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-5 sm:p-6 text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-indigo-50 to-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-xs">
                  <LayoutGrid className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-black font-mono tracking-tight text-slate-900 uppercase">
                    Aether Capital • Executive Desk Hub
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    SESSION ID: SEC-EXEC-9921 • REAL-TIME SYNC ONLINE
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeskHubModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Seluruh modul institusional aktif dan tersinkronisasi secara langsung ke live data engine:
            </p>

            {/* Small Status Legend for Desk Metric Color Categories */}
            <div className="mb-4 p-2.5 sm:p-3 bg-white/70 rounded-2xl border border-slate-200/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.03)] font-mono">
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200/70">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-indigo-600" />
                  DESK STATUS LEGEND • METRIC CATEGORIES
                </span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                  TELEMETRY TAXONOMY
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {STATUS_LEGENDS.map((item) => {
                  const cfg = METRIC_COLOR_CONFIG[item.key];
                  return (
                    <div
                      key={item.key}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border ${cfg.bg} ${cfg.border} transition-colors`}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                      <div className="min-w-0 flex-1">
                        <div className={`text-[9.5px] font-black leading-tight truncate ${cfg.text}`}>
                          {item.label}
                        </div>
                        <div className="text-[8px] text-slate-500 leading-tight mt-0.5 truncate font-medium">
                          {item.sample}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick 12 Desks Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {DESK_SYNC_STATUS.map((desk) => {
                const isCurrent = activeItem.id === desk.id;
                const cfg = METRIC_COLOR_CONFIG[desk.color] || METRIC_COLOR_CONFIG.slate;
                return (
                  <button
                    key={desk.id}
                    type="button"
                    onClick={() => {
                      handleNavigate(desk.id);
                      setShowDeskHubModal(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-gradient-to-b from-indigo-600 to-indigo-800 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300/40'
                        : 'bg-white/85 hover:bg-white text-slate-700 border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-black">
                      <span>{desk.label}</span>
                      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    </div>
                    <div
                      className={`text-[9.5px] mt-1 font-bold ${
                        isCurrent ? 'text-indigo-100' : cfg.text
                      }`}
                    >
                      {desk.metric}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200/80">
              <span className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 12 DESK ONLINE & TERVERIFIKASI
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowDeskHubModal(false);
                  setActiveItem(SIDEBAR_MENU_SCHEMA[0]);
                }}
                className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs cursor-pointer transition-colors"
              >
                KEMBALI KE OVERVIEW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
