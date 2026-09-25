import { useState } from 'react';
import { Search } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DashboardGrid } from './components/DashboardGrid';
import { SIDEBAR_MENU_SCHEMA, type SidebarMenuItem } from './data/sidebarSchema';

export default function App() {
  const [activeItem, setActiveItem] = useState<SidebarMenuItem>(SIDEBAR_MENU_SCHEMA[0]);

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden bg-radial from-[#d5e7f4] via-[#e2eef7] to-[#ccdff0] pt-[5px] pb-3 px-2 sm:px-4 md:px-5 flex flex-col font-sans antialiased select-none">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating 3D Solid Sidebar (Left edge 5px / 10px) */}
      <Sidebar
        activeId={activeItem.id}
        onSelect={(item) => setActiveItem(item)}
      />

      {/* Company Brand (Tepi layar, sejajar dengan menu) */}
      <div className="fixed top-[5px] left-[5px] sm:left-[10px] z-40 flex items-center">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-2xl border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-[0_6px_14px_rgba(15,23,42,0.12),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:translate-y-[1px] transition-all cursor-pointer">
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
        </div>
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

        {/* Dashboard Grid Canvas */}
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <DashboardGrid />
        </main>
      </div>
    </div>
  );
}
