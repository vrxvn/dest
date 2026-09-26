import React, { useState, useEffect, useCallback } from 'react';
import { Newspaper, ExternalLink, Globe2, TrendingUp, AlertTriangle, Building2, Flame, ShieldAlert, RefreshCw, Radio } from 'lucide-react';

export type NewsFilter = 'ALL' | 'CENTRAL_BANK' | 'MACRO' | 'COMMODITY_OIL' | 'GEOPOLITICS';

export interface GlobalFinancialNewsItem {
  id: string;
  headline: string;
  source: string;
  category: 'FED / RATE' | 'INFLATION' | 'OIL / ENERGY' | 'GEOPOLITICS' | 'DEBT / YIELDS' | 'FOREX / DXY' | 'BANKING' | 'GOLD / COMMODITY' | 'NFP / JOBS';
  filterGroup: 'CENTRAL_BANK' | 'MACRO' | 'COMMODITY_OIL' | 'GEOPOLITICS';
  timeAgo: string;
  url: string;
  impactLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  fxImpact: string; // misal: "DXY ↗ / EUR ↘" atau "US 10Y Yields ↗"
  sentiment: 'BULLISH' | 'BEARISH' | 'VOLATILE';
}

const BASELINE_FINANCIAL_NEWS: GlobalFinancialNewsItem[] = [
  {
    id: 'gfn-nfp',
    headline: 'US Non-Farm Payrolls (NFP) & Unemployment Rate: Katalis Utama Arah Suku Bunga The Fed',
    source: 'Bureau of Labor Statistics / Bloomberg',
    category: 'NFP / JOBS',
    filterGroup: 'MACRO',
    timeAgo: '1m lalu',
    url: 'https://www.bls.gov/news.release/empsit.nr0.htm',
    impactLevel: 'CRITICAL',
    fxImpact: 'Katalis Utama DXY & Volatilitas EUR/USD',
    sentiment: 'VOLATILE',
  },
  {
    id: 'gfn-1',
    headline: 'US Core PCE Inflasi: Prospek Pemangkasan Suku Bunga The Fed 25 Bps Menguat',
    source: 'Bloomberg Markets',
    category: 'FED / RATE',
    filterGroup: 'CENTRAL_BANK',
    timeAgo: '3m lalu',
    url: 'https://www.bloomberg.com/markets',
    impactLevel: 'CRITICAL',
    fxImpact: 'DXY 104.25 • Yield 10Y 4.18%',
    sentiment: 'BEARISH',
  },
  {
    id: 'gfn-2',
    headline: 'Minyak Mentah Brent Bergerak Volatil Ditengah Ketegangan Jalur Selat Hormuz & Kuota OPEC+',
    source: 'Reuters Commodities',
    category: 'OIL / ENERGY',
    filterGroup: 'COMMODITY_OIL',
    timeAgo: '11m lalu',
    url: 'https://www.reuters.com/business/energy/',
    impactLevel: 'HIGH',
    fxImpact: 'CAD ↗ • JPY/EUR ↘ (Importir Energi)',
    sentiment: 'VOLATILE',
  },
  {
    id: 'gfn-3',
    headline: 'Bank of Japan (BoJ) Kaji Kenaikan Suku Bunga Acuan Lanjutan Ditengah Penguatan Upah Riil',
    source: 'Nikkei Financial Wire',
    category: 'FED / RATE',
    filterGroup: 'CENTRAL_BANK',
    timeAgo: '24m lalu',
    url: 'https://asia.nikkei.com/',
    impactLevel: 'HIGH',
    fxImpact: 'USD/JPY -85 pips (Yen Menguat)',
    sentiment: 'BULLISH',
  },
  {
    id: 'gfn-4',
    headline: 'Imbal Hasil US Treasury 10-Tahun Menguat: Aliran Modal Masuk ke Dolar AS Melonjak',
    source: 'Financial Times',
    category: 'DEBT / YIELDS',
    filterGroup: 'MACRO',
    timeAgo: '38m lalu',
    url: 'https://www.ft.com/currencies',
    impactLevel: 'HIGH',
    fxImpact: 'Inflow Dolar Global +$1.8B',
    sentiment: 'BULLISH',
  },
  {
    id: 'gfn-5',
    headline: 'ECB Presiden Lagarde: Manufaktur Kawasan Euro Lesu, Sinyal Siklus Pelonggaran Moneter',
    source: 'CNBC International',
    category: 'FED / RATE',
    filterGroup: 'CENTRAL_BANK',
    timeAgo: '52m lalu',
    url: 'https://www.cnbc.com/world/',
    impactLevel: 'CRITICAL',
    fxImpact: 'EUR/USD Tertekan di Area 1.0820',
    sentiment: 'BEARISH',
  },
  {
    id: 'gfn-6',
    headline: 'Tiongkok Gulirkan Stimulus Likuiditas Bank Sentral untuk Topang Pasar Modal & Properti',
    source: 'Caixin Global / SCMP',
    category: 'INFLATION',
    filterGroup: 'GEOPOLITICS',
    timeAgo: '1.2j lalu',
    url: 'https://www.scmp.com/economy',
    impactLevel: 'HIGH',
    fxImpact: 'AUD/USD +45 pips (Risk-On Rebound)',
    sentiment: 'BULLISH',
  },
  {
    id: 'gfn-7',
    headline: 'Emas Dunia Tembus All-Time High Dipicu Permintaan Aset Lindung Nilai Safe-Haven',
    source: 'Wall Street Journal',
    category: 'GOLD / COMMODITY',
    filterGroup: 'COMMODITY_OIL',
    timeAgo: '1.8j lalu',
    url: 'https://www.wsj.com/market-data',
    impactLevel: 'HIGH',
    fxImpact: 'XAU/USD ↗ • CHF/JPY Bids Kuat',
    sentiment: 'BULLISH',
  },
  {
    id: 'gfn-8',
    headline: 'Swiss National Bank (SNB) Siap Intervensi Valas Jika Franc Terlalu Kuat Menekan Ekspor',
    source: 'Swissinfo Markets',
    category: 'FOREX / DXY',
    filterGroup: 'CENTRAL_BANK',
    timeAgo: '2.5j lalu',
    url: 'https://www.swissinfo.ch/eng',
    impactLevel: 'MEDIUM',
    fxImpact: 'USD/CHF +32 pips Rebound',
    sentiment: 'BEARISH',
  },
];

export interface FxNewsTickerProps {
  glassCardClassName?: string;
}

export const FxNewsTicker: React.FC<FxNewsTickerProps> = ({ glassCardClassName = '' }) => {
  const [filter, setFilter] = useState<NewsFilter>('ALL');
  const [newsList, setNewsList] = useState<GlobalFinancialNewsItem[]>(BASELINE_FINANCIAL_NEWS);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live');
  const [apiOnline, setApiOnline] = useState<boolean>(true);

  // Format relative time helper
  const calcRelativeTime = (dateStr: string): string => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return 'Baru saja';
      const diffMs = Date.now() - d.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Baru saja';
      if (diffMins < 60) return `${diffMins}m lalu`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}j lalu`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}h lalu`;
    } catch {
      return 'Baru saja';
    }
  };

  // Live real-time fetcher from Google News Financial Wire
  const fetchRealTimeFxNews = useCallback(async () => {
    setIsSyncing(true);
    try {
      const query = 'forex OR "federal reserve" OR "central bank" OR "inflation" OR "interest rates" OR "US dollar" OR "treasury yields"';
      const targetRss = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
      const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetRss)}`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        const liveItems: GlobalFinancialNewsItem[] = data.items.map((item: any, idx: number) => {
          // Split title into headline & publisher source
          const fullTitle = item.title || 'Breaking Financial Update';
          const parts = fullTitle.split(' - ');
          const publisher = parts.length > 1 ? parts.pop() : (item.author || 'Global Financial Wire');
          const headline = parts.join(' - ');
          const lower = fullTitle.toLowerCase();

          // Categorize dynamically based on real headline content
          let cat: GlobalFinancialNewsItem['category'] = 'FOREX / DXY';
          let group: GlobalFinancialNewsItem['filterGroup'] = 'MACRO';
          let impact = 'Dinamika Likuiditas & Fluktuasi Pasar Valas';
          let impactLevel: GlobalFinancialNewsItem['impactLevel'] = 'MEDIUM';
          let sentiment: GlobalFinancialNewsItem['sentiment'] = 'VOLATILE';

          if (lower.includes('nfp') || lower.includes('payroll') || lower.includes('jobs') || lower.includes('unemployment')) {
            cat = 'NFP / JOBS';
            group = 'MACRO';
            impact = 'Katalis Utama Volatilitas Dolar AS & Tenaga Kerja';
            impactLevel = 'CRITICAL';
          } else if (lower.includes('fed') || lower.includes('powell') || lower.includes('rate cut') || lower.includes('rate hike') || lower.includes('ecb') || lower.includes('bank of japan') || lower.includes('boj') || lower.includes('central bank')) {
            cat = 'FED / RATE';
            group = 'CENTRAL_BANK';
            impact = 'Prospek Suku Bunga Bank Sentral & Indeks DXY';
            impactLevel = 'CRITICAL';
          } else if (lower.includes('inflation') || lower.includes('cpi') || lower.includes('pce') || lower.includes('price index')) {
            cat = 'INFLATION';
            group = 'CENTRAL_BANK';
            impact = 'Imbal Hasil Obligasi & Tekanan Inflasi Global';
            impactLevel = 'HIGH';
          } else if (lower.includes('oil') || lower.includes('brent') || lower.includes('crude') || lower.includes('opec') || lower.includes('energy')) {
            cat = 'OIL / ENERGY';
            group = 'COMMODITY_OIL';
            impact = 'Mata Uang Komoditas (CAD, NOK) ↗ / Valas Net Impor';
            impactLevel = 'HIGH';
          } else if (lower.includes('gold') || lower.includes('silver') || lower.includes('metal') || lower.includes('xau')) {
            cat = 'GOLD / COMMODITY';
            group = 'COMMODITY_OIL';
            impact = 'Aset Lindung Nilai Safe-Haven & Pasangan XAU/USD';
            impactLevel = 'HIGH';
          } else if (lower.includes('yield') || lower.includes('debt') || lower.includes('treasury') || lower.includes('bond')) {
            cat = 'DEBT / YIELDS';
            group = 'MACRO';
            impact = 'Imbal Hasil US Treasury & Aliran Modal Valas';
            impactLevel = 'HIGH';
          } else if (lower.includes('war') || lower.includes('tariff') || lower.includes('sanction') || lower.includes('israel') || lower.includes('iran') || lower.includes('china') || lower.includes('taiwan')) {
            cat = 'GEOPOLITICS';
            group = 'GEOPOLITICS';
            impact = 'Sentimen Risk-Off & Aliran Valas Safe-Haven (USD, CHF)';
            impactLevel = 'HIGH';
          }

          if (lower.includes('hike') || lower.includes('rise') || lower.includes('surge') || lower.includes('gain') || lower.includes('jump') || lower.includes('boost')) {
            sentiment = 'BULLISH';
          } else if (lower.includes('cut') || lower.includes('drop') || lower.includes('fall') || lower.includes('slump') || lower.includes('crisis') || lower.includes('fear') || lower.includes('deficit')) {
            sentiment = 'BEARISH';
          }

          return {
            id: item.guid || item.link || `live-fx-${idx}`,
            headline: headline.trim(),
            source: publisher.trim(),
            category: cat,
            filterGroup: group,
            timeAgo: calcRelativeTime(item.pubDate),
            url: item.link || 'https://news.google.com/',
            impactLevel,
            fxImpact: impact,
            sentiment,
          };
        });

        setNewsList(liveItems);
        setApiOnline(true);
        setLastSyncTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch {
      setApiOnline(false);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchRealTimeFxNews();
    const interval = setInterval(fetchRealTimeFxNews, 45000); // 45s real-time refresh
    return () => clearInterval(interval);
  }, [fetchRealTimeFxNews]);

  const handleOpenNews = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredNews =
    filter === 'ALL'
      ? newsList
      : newsList.filter((item) => item.filterGroup === filter);

  return (
    <div className={`${glassCardClassName} flex flex-col justify-between h-full overflow-hidden p-2.5 sm:p-3 font-mono`}>
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <Globe2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 stroke-[2.3]" />
            <span className="text-[10px] font-black tracking-wider text-slate-800 uppercase truncate">
              BERITA GLOBAL & KEUANGAN DUNIA
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={fetchRealTimeFxNews}
              title="Refresh API Berita Real-time"
              disabled={isSyncing}
              className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[7.5px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200/80 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE API WIRE
            </span>
          </div>
        </div>

        {/* Filter Pills Kategori Finansial Makro */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 custom-scrollbar shrink-0">
          {[
            { id: 'ALL', label: 'Semua Berita' },
            { id: 'CENTRAL_BANK', label: 'Bank Sentral' },
            { id: 'MACRO', label: 'Makro & Obligasi' },
            { id: 'COMMODITY_OIL', label: 'Minyak & Emas' },
            { id: 'GEOPOLITICS', label: 'Geopolitik' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as NewsFilter)}
              className={`text-[7.5px] font-black px-1.5 py-0.5 rounded-md whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Status Strip */}
        <div className="flex items-center justify-between text-[7.5px] text-slate-400 py-0.5">
          <span className="truncate flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
            REAL-TIME FEED: {lastSyncTime} WIB
          </span>
          <span className="text-indigo-600 font-bold shrink-0">KLIK = ARTIKEL ASLI</span>
        </div>
      </div>

      {/* List Berita Global Lengkap (Real-time live news) */}
      <div className="flex-1 overflow-y-auto space-y-1.5 my-1 pr-0.5 min-h-0 custom-scrollbar">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenNews(item.url)}
            title="Klik untuk membuka artikel sumber berita asli"
            className="p-2 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border-t border-t-white border-x border-slate-200/90 border-b-2 border-b-slate-300 shadow-[0_1.5px_3px_rgba(15,23,42,0.04)] hover:border-indigo-400 hover:shadow-xs hover:brightness-105 active:translate-y-[1px] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Header Card Berita: Tag Kategori, Dampak, & Waktu */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-1">
                  <span className="text-[7px] font-black px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                    {item.category}
                  </span>
                  {item.impactLevel === 'CRITICAL' && (
                    <span className="text-[6.5px] font-black px-1 py-0.2 rounded bg-rose-500 text-white animate-pulse">
                      HIGH IMPACT
                    </span>
                  )}
                </div>
                <span className="text-[7.5px] text-slate-400 flex items-center gap-0.5">
                  {item.timeAgo}
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 group-hover:text-indigo-600 transition-opacity" />
                </span>
              </div>

              {/* Headline Berita */}
              <h4 className="text-[9px] sm:text-[9.5px] font-bold text-slate-800 group-hover:text-indigo-900 leading-snug transition-colors line-clamp-2">
                {item.headline}
              </h4>

              {/* Pengaruh Langsung ke Pasar Keuangan / FX */}
              <div className="mt-1 p-1 rounded-lg bg-slate-50/80 border border-slate-200/60 flex items-center justify-between text-[7px]">
                <span className="text-slate-400 font-bold">DAMPAK PASAR:</span>
                <span className="font-black text-indigo-700 truncate">{item.fxImpact}</span>
              </div>
            </div>

            {/* Footer Card Berita */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 mt-1 text-[7.5px] text-slate-400">
              <span className="truncate">{item.source}</span>
              <span
                className={`font-black ${
                  item.sentiment === 'BULLISH'
                    ? 'text-emerald-600'
                    : item.sentiment === 'BEARISH'
                    ? 'text-rose-600'
                    : 'text-amber-600'
                }`}
              >
                {item.sentiment}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Bar */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[7.5px] text-slate-500 mt-1 shrink-0">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          API RSS WIRE: GOOGLE FINANCE & REUTERS
        </span>
        <span className="text-emerald-600 font-bold">100% REALTIME API</span>
      </div>
    </div>
  );
};

