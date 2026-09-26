import React, { useState } from 'react';
import {
  Home,
  TrendingUp,
  ArrowLeftRight,
  Coins,
  Sparkles,
  PieChart,
  Users,
  ShieldCheck,
  Server,
  Scale,
  SlidersHorizontal,
  FileBarChart,
  Settings,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { SIDEBAR_MENU_SCHEMA, SIDEBAR_BOTTOM_SCHEMA, type SidebarMenuItem } from '../data/sidebarSchema';

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  TrendingUp,
  ArrowLeftRight,
  Coins,
  Sparkles,
  PieChart,
  Users,
  ShieldCheck,
  Server,
  Scale,
  SlidersHorizontal,
  FileBarChart,
  Settings,
  LogOut,
};

interface SidebarProps {
  activeId: string;
  onSelect: (item: SidebarMenuItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect }) => {
  const [hovered, setHovered] = useState<{ item: SidebarMenuItem; top: number } | null>(null);

  const handleMouseEnter = (item: SidebarMenuItem, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHovered({
      item,
      top: rect.top + rect.height / 2,
    });
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const renderItem = (item: SidebarMenuItem) => {
    const IconComponent = ICON_MAP[item.icon] || Home;
    const isActive = activeId === item.id;

    return (
      <div
        key={item.id}
        className="relative group flex items-center justify-center"
        onMouseEnter={(e) => handleMouseEnter(item, e)}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => onSelect(item)}
          title={item.name}
          aria-label={item.name}
          className={`relative flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 md:w-9 md:h-9 rounded-full transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:translate-y-[1.5px] ${
            isActive
              ? 'bg-gradient-to-b from-[#2d3748] via-[#1a202c] to-[#0f172a] text-white border-t-[1.5px] border-t-slate-400 border-x border-slate-700 border-b-[2.5px] border-b-black shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.25),inset_0_-1.5px_2px_rgba(0,0,0,0.8)] scale-[1.03]'
              : 'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e4e9f2] text-slate-700 hover:text-slate-950 border-t-[1.5px] border-t-white border-x border-slate-200 border-b-[2.5px] border-b-slate-300/90 shadow-[0_3px_5px_rgba(0,0,0,0.1),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:shadow-xs'
          }`}
        >
          <IconComponent className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    );
  };

  const allItems = [...SIDEBAR_MENU_SCHEMA, ...SIDEBAR_BOTTOM_SCHEMA];

  return (
    <>
      <aside className="fixed left-[5px] sm:left-[10px] top-1/2 -translate-y-1/2 z-30 flex flex-col items-center w-auto select-none">
        <div className="flex flex-col items-center gap-1 sm:gap-1.5 w-auto px-1.5 py-2.5 sm:px-2 sm:py-3 bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] rounded-full border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_32px_-4px_rgba(15,23,42,0.22),0_6px_12px_rgba(15,23,42,0.1),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2px_3px_rgba(148,163,184,0.35)] max-h-[calc(100vh-16px)] overflow-y-auto no-scrollbar">
          {allItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {index === SIDEBAR_MENU_SCHEMA.length && (
                <div className="w-6 h-[2px] bg-slate-300 shadow-[0_1px_0_rgba(255,255,255,1)] my-1 rounded-full" />
              )}
              {renderItem(item)}
            </React.Fragment>
          ))}
        </div>
      </aside>

      {/* Floating 3D Solid Tooltip positioned outside of the scrollable sidebar container */}
      {hovered && (() => {
        const menuIdx = SIDEBAR_MENU_SCHEMA.findIndex((m) => m.id === hovered.item.id);
        const itemNumber = menuIdx !== -1 ? menuIdx + 1 : null;

        return (
          <div
            role="tooltip"
            style={{ top: `${hovered.top}px` }}
            className="fixed left-[56px] sm:left-[68px] md:left-[72px] -translate-y-1/2 z-50 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] text-slate-800 text-xs font-bold tracking-tight rounded-xl border-t-2 border-t-white border-x-[1.5px] border-slate-200/90 border-b-[3.5px] border-b-slate-300 shadow-[0_12px_24px_-4px_rgba(15,23,42,0.18),0_4px_10px_rgba(15,23,42,0.08),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(148,163,184,0.35)] pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
          >
            {/* 3D Solid Arrow indicator pointing back to sidebar */}
            <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#f5f8fc] rotate-45 border-l-[1.5px] border-b-[2px] border-l-slate-200 border-b-slate-300 shadow-[-2px_2px_3px_rgba(15,23,42,0.06)]" />

            {/* 3D Solid Number Tag (e.g. 1, 2, ..., 12) */}
            {itemNumber !== null && (
              <span className="relative z-10 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-md bg-gradient-to-b from-[#ffffff] to-[#e4eaf4] text-indigo-600 font-mono text-[10px] font-black border-t border-t-white border-x border-slate-200 border-b-[1.5px] border-b-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_1px_white]">
                {itemNumber}
              </span>
            )}

            {/* Menu Name */}
            <span className="relative z-10 font-sans font-extrabold text-slate-800 text-xs tracking-wide">
              {hovered.item.name}
            </span>

            {/* Active Indicator dot if current page */}
            {activeId === hovered.item.id && (
              <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)] animate-pulse ml-0.5" />
            )}
          </div>
        );
      })()}
    </>
  );
};
