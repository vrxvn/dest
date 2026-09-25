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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const renderItem = (item: SidebarMenuItem) => {
    const IconComponent = ICON_MAP[item.icon] || Home;
    const isActive = activeId === item.id;
    const isHovered = hoveredId === item.id;

    return (
      <div
        key={item.id}
        className="relative group flex items-center justify-center"
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <button
          type="button"
          onClick={() => onSelect(item)}
          aria-label={item.tooltip}
          className={`relative flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 md:w-9 md:h-9 rounded-full transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:translate-y-[1.5px] ${
            isActive
              ? 'bg-gradient-to-b from-[#2d3748] via-[#1a202c] to-[#0f172a] text-white border-t-[1.5px] border-t-slate-400 border-x border-slate-700 border-b-[2.5px] border-b-black shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.25),inset_0_-1.5px_2px_rgba(0,0,0,0.8)] scale-[1.03]'
              : 'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e4e9f2] text-slate-700 hover:text-slate-950 border-t-[1.5px] border-t-white border-x border-slate-200 border-b-[2.5px] border-b-slate-300/90 shadow-[0_3px_5px_rgba(0,0,0,0.1),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(148,163,184,0.3)] hover:brightness-105 active:border-b-[1px] active:shadow-xs'
          }`}
        >
          <IconComponent className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Ringkas Hover Tooltip */}
        {isHovered && (
          <div
            role="tooltip"
            className="absolute left-[calc(100%+12px)] z-50 px-2.5 py-1.5 bg-[#1b253d] text-white text-xs font-medium tracking-tight rounded-md shadow-lg pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1.5"
          >
            {/* Tooltip triangle indicator */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1b253d] rotate-45" />
            <span className="relative z-10">{item.tooltip}</span>
          </div>
        )}
      </div>
    );
  };

  const allItems = [...SIDEBAR_MENU_SCHEMA, ...SIDEBAR_BOTTOM_SCHEMA];

  return (
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
  );
};
