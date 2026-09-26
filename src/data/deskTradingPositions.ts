export interface DeskTraderPosition {
  id: string;
  traderName: string;
  traderRole: string;
  traderAvatar: string;
  assetSymbol: string;
  side: 'LONG' | 'SHORT';
  orderType: 'MARKET' | 'LIMIT';
  amount: number; // Berapa biji koin (quantity)
  entryPrice: number;
  tpPrice?: number;
  slPrice?: number;
  leverage: number; // 1 = Spot, 3x, 5x, 10x
  status: 'ACTIVE_OPEN' | 'PENDING_LIMIT';
  openedAt: string;
  timestamp: number;
  note: string;
}

export const INITIAL_DESK_POSITIONS: DeskTraderPosition[] = [
  {
    id: 'desk-pos-1',
    traderName: 'Aldi Prasetya',
    traderRole: 'Senior Scalper',
    traderAvatar: 'AP',
    assetSymbol: 'BTC',
    side: 'LONG',
    orderType: 'MARKET',
    amount: 1.25, // 1.25 biji BTC
    entryPrice: 83420,
    tpPrice: 85800,
    slPrice: 82400,
    leverage: 5,
    status: 'ACTIVE_OPEN',
    openedAt: '24m lalu',
    timestamp: Date.now() - 24 * 60 * 1000,
    note: 'Breakout trendline H4 & dorongan ETF spot inflow',
  },
  {
    id: 'desk-pos-2',
    traderName: 'Rian Hidayat',
    traderRole: 'Lead Momentum Desk',
    traderAvatar: 'RH',
    assetSymbol: 'BTC',
    side: 'LONG',
    orderType: 'LIMIT',
    amount: 2.50, // 2.50 biji BTC
    entryPrice: 82500,
    tpPrice: 86000,
    slPrice: 81200,
    leverage: 3,
    status: 'PENDING_LIMIT',
    openedAt: '45m lalu',
    timestamp: Date.now() - 45 * 60 * 1000,
    note: 'Limit Buy antre di zona demand support EMA-200',
  },
  {
    id: 'desk-pos-3',
    traderName: 'Siti Rahma',
    traderRole: 'Swing Strategist',
    traderAvatar: 'SR',
    assetSymbol: 'ETH',
    side: 'LONG',
    orderType: 'MARKET',
    amount: 24.0, // 24 biji ETH
    entryPrice: 2642,
    tpPrice: 2780,
    slPrice: 2580,
    leverage: 1, // Spot
    status: 'ACTIVE_OPEN',
    openedAt: '1j lalu',
    timestamp: Date.now() - 60 * 60 * 1000,
    note: 'Akumulasi swing pasca upgrade validator & staking',
  },
  {
    id: 'desk-pos-4',
    traderName: 'Kevin Tan',
    traderRole: 'Altcoin Desk',
    traderAvatar: 'KT',
    assetSymbol: 'SOL',
    side: 'LONG',
    orderType: 'MARKET',
    amount: 350.0, // 350 biji SOL
    entryPrice: 118.2,
    tpPrice: 128.5,
    slPrice: 114.0,
    leverage: 3,
    status: 'ACTIVE_OPEN',
    openedAt: '18m lalu',
    timestamp: Date.now() - 18 * 60 * 1000,
    note: 'Volume transaksi DEX Solana cetak rekor TPS tinggi',
  },
  {
    id: 'desk-pos-5',
    traderName: 'Dimas Pratama',
    traderRole: 'Derivatives & Hedge',
    traderAvatar: 'DP',
    assetSymbol: 'BTC',
    side: 'SHORT',
    orderType: 'MARKET',
    amount: 0.75, // 0.75 biji BTC
    entryPrice: 84650,
    tpPrice: 83100,
    slPrice: 85250,
    leverage: 5,
    status: 'ACTIVE_OPEN',
    openedAt: '12m lalu',
    timestamp: Date.now() - 12 * 60 * 1000,
    note: 'Hedge taktis jangka pendek antisipasi pullback intraday',
  },
  {
    id: 'desk-pos-6',
    traderName: 'Farhan Quant',
    traderRole: 'Algorithmic Bot',
    traderAvatar: 'FQ',
    assetSymbol: 'SOL',
    side: 'LONG',
    orderType: 'LIMIT',
    amount: 200.0, // 200 biji SOL
    entryPrice: 116.0,
    tpPrice: 124.0,
    slPrice: 112.5,
    leverage: 2,
    status: 'PENDING_LIMIT',
    openedAt: '35m lalu',
    timestamp: Date.now() - 35 * 60 * 1000,
    note: 'Grid limit order batch #4 pasang jaring harga diskon',
  },
];
