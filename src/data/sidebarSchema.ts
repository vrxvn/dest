export interface SidebarMenuItem {
  id: string;
  name: string;
  tooltip: string;
  icon: string;
  path: string;
}

export const SIDEBAR_MENU_SCHEMA: SidebarMenuItem[] = [
  {
    id: "overview",
    name: "Overview",
    tooltip: "Overview",
    icon: "Home",
    path: "/overview"
  },
  {
    id: "trading",
    name: "Trading",
    tooltip: "Trading",
    icon: "TrendingUp",
    path: "/trading"
  },
  {
    id: "fx-flow",
    name: "FX Flow",
    tooltip: "FX Flow",
    icon: "ArrowLeftRight",
    path: "/fx-flow"
  },
  {
    id: "crypto",
    name: "Crypto",
    tooltip: "Crypto",
    icon: "Coins",
    path: "/crypto"
  },
  {
    id: "genesis",
    name: "Genesis",
    tooltip: "Genesis",
    icon: "Sparkles",
    path: "/genesis"
  },
  {
    id: "investor",
    name: "Investor",
    tooltip: "Investor",
    icon: "PieChart",
    path: "/investor"
  },
  {
    id: "workforce",
    name: "Workforce",
    tooltip: "Workforce",
    icon: "Users",
    path: "/workforce"
  },
  {
    id: "security",
    name: "Security",
    tooltip: "Security",
    icon: "ShieldCheck",
    path: "/security"
  },
  {
    id: "server",
    name: "Server",
    tooltip: "Server",
    icon: "Server",
    path: "/server"
  },
  {
    id: "legal",
    name: "Legal",
    tooltip: "Legal",
    icon: "Scale",
    path: "/legal"
  },
  {
    id: "admin",
    name: "Admin",
    tooltip: "Admin",
    icon: "SlidersHorizontal",
    path: "/admin"
  },
  {
    id: "report",
    name: "Report",
    tooltip: "Report",
    icon: "FileBarChart",
    path: "/report"
  }
];

export const SIDEBAR_BOTTOM_SCHEMA: SidebarMenuItem[] = [
  {
    id: "settings",
    name: "Settings",
    tooltip: "Settings",
    icon: "Settings",
    path: "/settings"
  },
  {
    id: "logout",
    name: "Logout",
    tooltip: "Logout",
    icon: "LogOut",
    path: "/logout"
  }
];
