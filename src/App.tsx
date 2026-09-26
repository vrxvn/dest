import { useState } from 'react';
import { Search, Lock, ShieldCheck, X } from 'lucide-react';
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
import { SIDEBAR_MENU_SCHEMA, type SidebarMenuItem } from './data/sidebarSchema';

export default function App() {
  // Pertama kali buka web langsung memunculkan Dashboard (Overview)
  const [activeItem, setActiveItem] = useState<SidebarMenuItem>(SIDEBAR_MENU_SCHEMA[0]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const renderActiveView = () => {
    switch (activeItem.id) {
      case 'overview':
        return <DashboardGrid />;
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
        return <DashboardGrid />;
    }
  };

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden bg-radial from-[#d5e7f4] via-[#e2eef7] to-[#ccdff0] pt-[5px] pb-0 px-2 sm:px-4 md:px-5 flex flex-col font-sans antialiased select-none">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating 3D Solid Sidebar (Left edge 5px / 10px) */}
      <Sidebar
        activeId={activeItem.id}
        onSelect={(item) => {
          if (item.id === 'logout') {
            setShowLogoutModal(true);
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
        {/* Top Header Bar: Aligned tightly 5px from top screen edge */}
        <div className="flex items-center justify-end w-full mb-1 flex-shrink-0">
          <div className="flex items-center gap-2">
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

      {/* Logout / Terminal Lock Confirmation Modal (3D Solid Style) */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_20px_40px_-8px_rgba(15,23,42,0.3),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-5 sm:p-6 text-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-rose-50 to-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shadow-xs">
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-black font-mono tracking-tight text-slate-900 uppercase">
                    Lock Terminal Desk
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    SESSION ID: SEC-EXEC-9921
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              Apakah Anda ingin mengunci sesi executive trading terminal ini? Seluruh feed audit real-time akan tetap berjalan di background secara aman.
            </p>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300/80 text-slate-700 font-bold text-xs tracking-wider uppercase font-mono transition-all cursor-pointer"
              >
                Batalkan
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutModal(false);
                  setActiveItem(SIDEBAR_MENU_SCHEMA[0]);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-b from-rose-600 to-rose-700 hover:brightness-110 active:translate-y-[1px] text-white font-black text-xs tracking-wider uppercase font-mono border-t border-t-rose-400 border-b-2 border-b-rose-900 shadow-[0_4px_10px_rgba(225,29,72,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Kunci & Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
