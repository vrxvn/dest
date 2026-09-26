import React, { useState, useEffect } from 'react';
import {
  Users,
  Award,
  TrendingUp,
  Briefcase,
  ArrowUpRight,
  ShieldCheck,
  Binary,
  Zap,
  Coins,
  Globe,
  CheckCircle2,
  Maximize2,
  Minimize2,
  ArrowLeft,
  X,
  Sparkles,
  Layers,
  ChevronRight,
  Server,
  DollarSign,
  Scale,
  Building2,
  Cpu,
} from 'lucide-react';
import {
  WORKFORCE_DIVISIONS,
  TOTAL_STAFF_COUNT,
  type DivisionWorkforce,
} from '../data/dummy/workforceDummy';

export const WorkforceView: React.FC = () => {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(null);

  // Listener tombol Escape untuk menutup halaman lebar & kembali ke 5 divisi awal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDivisionId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedDivisi =
    WORKFORCE_DIVISIONS.find((d) => d.divisionId === selectedDivisionId) || null;

  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  const getDivisionIcon = (num: number) => {
    switch (num) {
      case 1:
        return Binary;
      case 2:
        return Zap;
      case 3:
        return Server;
      case 4:
        return DollarSign;
      case 5:
        return Scale;
      default:
        return Briefcase;
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-hidden pr-0.5 pb-0.5">
      {/* 1. TOP CARDS (REKAPITULASI 2.209 PERSONIL 5 DIVISI) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Card 1: Total Staf */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              TOTAL WORKFORCE
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              3 NEGARA
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              {TOTAL_STAFF_COUNT.toLocaleString()} PERSONIL
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">5 DIVISI TERSTRUKTUR</span>
            <span className="text-indigo-600 font-extrabold">CHINA • INDO • VIETNAM</span>
          </div>
        </div>

        {/* Card 2: Quant & Trading Force */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              QUANT & TRADING FORCE
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              54.8% TOTAL
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              1.210 STAF
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">DIVISI 1 & 2</span>
            <span className="text-emerald-700 font-bold">550 QUANT + 660 TRADING</span>
          </div>
        </div>

        {/* Card 3: Infra & Cyber Core */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              INFRA & CYBERSECURITY
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 font-mono">
              HPC / COLD
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              440 PERSONIL
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">DIVISI 3</span>
            <span className="text-amber-700 font-extrabold">SERVER FISIK & BTC VAULT</span>
          </div>
        </div>

        {/* Card 4: Treasury & Regional Legal */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-purple-600 stroke-[2.3]" />
              TREASURY, LEGAL & HR
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20 font-mono">
              PAYROLL 2.209
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              559 PERSONIL
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">DIVISI 4 & 5</span>
            <span className="text-purple-700 font-extrabold">265 FX + 294 LEGAL/HR</span>
          </div>
        </div>
      </section>

      {/* 2. BAGIAN 5 DIVISI KARYAWAN: TAMPILAN AWAL (5 KOLOM MEMANJANG KE BAWAH) ATAU TAMPILAN MELEBAR */}
      {!selectedDivisi ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-2.5 flex-1 min-h-0 h-full overflow-hidden pb-0.5">
          {WORKFORCE_DIVISIONS.map((divisi) => {
            const Icon = getDivisionIcon(divisi.divisionNumber);

            return (
              <div
                key={divisi.divisionId}
                onClick={() => setSelectedDivisionId(divisi.divisionId)}
                className={`${glassCard} flex flex-col justify-between h-full min-h-0 overflow-hidden p-2.5 sm:p-3 cursor-pointer group hover:border-indigo-400/80 hover:shadow-lg hover:brightness-[1.02] transition-all`}
                title={`Klik untuk membuka Divisi ${divisi.divisionNumber} secara lebar`}
              >
                {/* Header Divisi */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80">
                    <div className="flex items-center gap-1.5 truncate">
                      <div
                        className={`w-6 h-6 rounded-lg bg-gradient-to-b ${divisi.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-xs font-mono font-bold text-[10px]`}
                      >
                        #{divisi.divisionNumber}
                      </div>
                      <div className="truncate">
                        <span className="text-[9.5px] font-black text-slate-800 uppercase font-mono tracking-tight block leading-tight truncate">
                          DIVISI {divisi.divisionNumber}
                        </span>
                        <span className="text-[7.5px] text-slate-400 font-mono block leading-none truncate">
                          {divisi.divisionShort}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[7px] font-black px-1.5 py-0.2 rounded-full border font-mono flex-shrink-0 ${divisi.bgBadge}`}
                    >
                      {divisi.badge}
                    </span>
                  </div>

                  {/* Baris Fokus Divisi */}
                  <div className="mb-1.5 p-1 rounded-lg bg-slate-100/90 border border-slate-200/80 font-mono">
                    <span className="text-[6.5px] font-bold text-slate-400 uppercase block leading-none">
                      FOKUS DIVISI
                    </span>
                    <span className="text-[8px] font-extrabold text-slate-700 leading-tight block truncate mt-0.5">
                      {divisi.focus}
                    </span>
                  </div>
                </div>

                {/* Body Formasi Jabatan & Personil Divisi (Scrollable Memanjang) */}
                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1 pr-0.5 my-0.5">
                  <div className="flex items-center justify-between text-[7px] font-black uppercase text-slate-400 font-mono mb-0.5">
                    <span>STRUKTUR PERSONIL</span>
                    <span className="text-indigo-700 font-bold">{divisi.roleBreakdown.length} FORMASI</span>
                  </div>

                  {divisi.roleBreakdown.map((role, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-all font-mono"
                    >
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[7.5px] font-black text-slate-800 truncate block leading-tight">
                          {role.roleTitle}
                        </span>
                        <span className="text-[7px] font-black px-1 py-0.1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0">
                          {role.countLabel}
                        </span>
                      </div>
                      <span className="text-[6.5px] text-slate-500 leading-tight block truncate">
                        {role.description}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Divisi dengan tombol interaktif untuk melebarkan */}
                <div className="flex-shrink-0 flex items-center justify-between pt-1 border-t border-slate-200/80 text-[7px] font-mono text-slate-500 mt-1">
                  <span className="truncate max-w-[50%]">LEAD: {divisi.headOfDesk.split('(')[0]}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDivisionId(divisi.divisionId);
                    }}
                    className="flex items-center gap-0.5 text-[7px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/90 px-1.5 py-0.5 rounded-full shadow-2xs transition-all flex-shrink-0 cursor-pointer"
                  >
                    <span>BUKA MELEBAR</span>
                    <Maximize2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        /* ============================================================== */
        /* TAMPILAN HALAMAN DIVISI MELEBAR SECARA PENUH                    */
        /* ============================================================== */
        <section className={`${glassCard} flex-1 min-h-0 h-full overflow-hidden p-3 sm:p-4 flex flex-col justify-between`}>
          {/* 1. Header Bar Halaman Lebar */}
          <div className="flex-shrink-0 pb-2 border-b border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              {/* Info Divisi Terbuka */}
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-b ${selectedDivisi.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-md font-mono font-black text-base`}
                >
                  #{selectedDivisi.divisionNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm sm:text-base font-black font-mono tracking-tight text-slate-900 uppercase">
                      DIVISI {selectedDivisi.divisionNumber}: {selectedDivisi.divisionName.toUpperCase()}
                    </h2>
                    <span
                      className={`text-[8.5px] font-extrabold px-2.5 py-0.5 rounded-full border font-mono ${selectedDivisi.bgBadge}`}
                    >
                      {selectedDivisi.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[8px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      {selectedDivisi.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Kontrol Tombol Tutup / Kembali */}
              <div className="flex items-center gap-1.5 self-end sm:self-center font-mono">
                {/* Tombol Utama: Tutup & Kembali ke 5 Divisi Awal */}
                <button
                  type="button"
                  onClick={() => setSelectedDivisionId(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-b from-white via-slate-50 to-slate-200 text-slate-800 hover:text-indigo-700 border-t border-t-white border-x border-slate-200 border-b-2 border-b-slate-300 shadow-xs font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:translate-y-[1px]"
                  title="Tutup halaman melebar dan kembali ke tampilan 5 divisi (Shortcut: Tekan Esc)"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>TUTUP & KEMBALI</span>
                  <span className="text-[8px] bg-slate-200/90 text-slate-600 px-1 py-0.2 rounded font-mono">
                    ESC
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Isi Halaman Melebar (Grid 2 Kolom Lebar & Proporsional) */}
          <div className="flex-1 min-h-0 overflow-y-auto my-2 pr-0.5 flex flex-col gap-2.5">
            {/* Top 4 KPI Metrics Strip Divisi */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono flex-shrink-0">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[8px] text-slate-400 font-bold block uppercase">TOTAL PERSONIL DIVISI</span>
                <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight my-0.5">
                  {selectedDivisi.totalMembersLabel}
                </div>
                <span className="text-[8px] text-indigo-600 font-extrabold">
                  {((selectedDivisi.totalMembers / TOTAL_STAFF_COUNT) * 100).toFixed(1)}% DARI TOTAL STAF
                </span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[8px] text-slate-400 font-bold block uppercase">KAPITAL / ASET FUNGSI</span>
                <div className="text-base sm:text-lg font-black text-slate-800 tracking-tight my-0.5">
                  {selectedDivisi.totalSupervisedCapital}
                </div>
                <span className="text-[8px] text-slate-500 font-bold">MANAGED ASSETS / OPS</span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[8px] text-slate-400 font-bold block uppercase">TARGET KINERJA / PNL</span>
                <div className="text-base sm:text-lg font-black text-emerald-600 tracking-tight my-0.5">
                  {selectedDivisi.totalPnlContribution}
                </div>
                <span className="text-[8px] text-emerald-700 font-bold">DIVISI ATTRIBUTION</span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[8px] text-slate-400 font-bold block uppercase">SHARPE / KEPATUHAN</span>
                <div className="text-sm sm:text-base font-black text-indigo-700 tracking-tight my-0.5 truncate">
                  {selectedDivisi.avgSharpe} <span className="text-xs text-slate-400 font-normal">/ {selectedDivisi.winRate}</span>
                </div>
                <span className="text-[8px] text-slate-500 font-bold">REGIONAL VERIFIED</span>
              </div>
            </div>

            {/* Konten Utama 2 Kolom: Kiri Rincian Formasi Personil Lengkap, Kanan Roster Karyawan */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 flex-1 min-h-0">
              {/* Kolom Kiri: Rincian Lengkap Formasi Personel Sesuai Tugas (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-2">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs font-mono">
                  <div className="flex items-center justify-between gap-1 text-[9px] font-black text-slate-700 uppercase mb-2 pb-1.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      <span>STRUKTUR & JUMLAH PERSONIL ({selectedDivisi.totalMembersLabel})</span>
                    </div>
                    <span className="text-[8px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.2 rounded border border-indigo-200">
                      FORMASI LENGKAP
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {selectedDivisi.roleBreakdown.map((role, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col gap-0.5"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[9px] font-black text-slate-900 leading-tight">
                            {role.roleTitle}
                          </span>
                          <span className="text-[8.5px] font-black px-2 py-0.2 rounded-full bg-indigo-600 text-white shadow-2xs flex-shrink-0">
                            {role.countLabel}
                          </span>
                        </div>
                        <span className="text-[8px] text-slate-500 leading-snug">
                          {role.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mandat & Batas Risiko */}
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs font-mono text-[8.5px]">
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-700 uppercase mb-1 pb-1 border-b border-slate-100">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                    <span>MANDAT & BATAS RISIKO DIVISI</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-1.5">
                    <strong>Mandat:</strong> {selectedDivisi.mandate}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-1.5">
                    <strong>Risk Limit:</strong> {selectedDivisi.riskLimit}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Kliring/Jalur:</strong> {selectedDivisi.clearingExecution}
                  </p>
                </div>
              </div>

              {/* Kolom Kanan: Roster Karyawan Senior & Lead Personel (7 cols) */}
              <div className="lg:col-span-7 p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5 pb-1.5 border-b border-slate-200 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-indigo-600" />
                      <span className="text-[10.5px] font-black text-slate-800 uppercase tracking-tight">
                        REPRESENTATIVE SENIOR LEAD & ROSTER ({selectedDivisi.divisionShort})
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200">
                      LEADERSHIP
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-[9px]">
                      <thead>
                        <tr className="border-b border-slate-200 text-[8px] font-black uppercase text-slate-400 tracking-wider">
                          <th className="py-1.5 px-1.5">Karyawan / ID</th>
                          <th className="py-1.5 px-1.5">Jabatan / Senioritas</th>
                          <th className="py-1.5 px-1.5">Pendidikan</th>
                          <th className="py-1.5 px-1.5 text-right">Kapital / Unit</th>
                          <th className="py-1.5 px-1.5 text-right">Kinerja</th>
                          <th className="py-1.5 px-1.5 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedDivisi.employees.map((emp) => (
                          <tr key={emp.empId} className="hover:bg-indigo-50/40 transition-colors">
                            <td className="py-2 px-1.5">
                              <div className="flex items-center gap-1.5">
                                <div className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-700 font-black text-[7.5px] flex items-center justify-center border border-indigo-200 flex-shrink-0">
                                  {emp.empId.split('-')[1]}
                                </div>
                                <div>
                                  <span className="font-black text-slate-900 block leading-tight">
                                    {emp.name}
                                  </span>
                                  <span className="text-[7.5px] text-slate-400 block leading-none">
                                    {emp.empId}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-2 px-1.5 text-slate-700">
                              <span className="font-bold block leading-tight">{emp.role}</span>
                              <span className="text-[7.5px] text-slate-400 block leading-none">{emp.level}</span>
                            </td>
                            <td className="py-2 px-1.5 text-slate-500 font-semibold">{emp.education}</td>
                            <td className="py-2 px-1.5 text-right font-black text-slate-900">{emp.capital}</td>
                            <td className="py-2 px-1.5 text-right font-black text-emerald-600">{emp.pnl}</td>
                            <td className="py-2 px-1.5 text-center">
                              <span className="inline-block px-1.5 py-0.2 rounded text-[7.5px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {emp.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-[8px] font-mono text-slate-500 mt-2">
                  <span>OPERASIONAL DIVISI MEMBAWAHI SELURUH ANGGOTA TIM DI 3 KANTOR REGIONAL</span>
                  <span className="text-emerald-600 font-bold">100% REGULATED</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Footer Bar Halaman Lebar */}
          <div className="flex-shrink-0 flex items-center justify-between pt-2 border-t border-slate-200/80 text-[8.5px] font-mono text-slate-500">
            <span className="truncate">
              MEMBACA DETAIL LENGKAP DIVISI {selectedDivisi.divisionNumber}: {selectedDivisi.divisionName} • DILINDUNGI HAK CIPTA AETHER CAPITAL
            </span>
          </div>
        </section>
      )}
    </div>
  );
};
