/**
 * DUMMY DATA: REPORT & AUDITED FINANCIAL STATEMENTS
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
 */

export interface ReportFile {
  reportId: string;
  title: string;
  period: string;
  generatedDate: string;
  auditor: string;
  format: string;
  size: string;
  status: 'AUDITED' | 'PUBLISHED';
}

export const REPORT_FILES: ReportFile[] = [
  { reportId: 'REP-2026-Q3-NAV', title: 'Q3 2026 Institutional Executive NAV Statement', period: 'Q3 2026', generatedDate: 'SEP 2026', auditor: 'Deloitte & Touche LLP', format: 'PDF / XBRL', size: '4.8 MB', status: 'AUDITED' },
  { reportId: 'REP-2026-M09-PNL', title: 'September 2026 Alpha Desk Attribution & VaR Audit', period: 'M09 2026', generatedDate: 'SEP 2026', auditor: 'Internal Risk & KPMG', format: 'PDF / CSV', size: '2.4 MB', status: 'AUDITED' },
  { reportId: 'REP-2026-AUDIT-TAX', title: 'Annual Cross-Border Tax Withholding Schedule (FATCA/CRS)', period: 'FY 2025/26', generatedDate: 'AUG 2026', auditor: 'Ernst & Young Global', format: 'PDF / XML', size: '8.1 MB', status: 'PUBLISHED' },
  { reportId: 'REP-2026-SOC2-TY2', title: 'SOC-2 Type II Cybersecurity & Multi-Sig Vault Attestation', period: 'ANNUAL 2026', generatedDate: 'JUL 2026', auditor: 'Coalfire Security Labs', format: 'PDF', size: '3.6 MB', status: 'AUDITED' },
  { reportId: 'REP-2026-EXEC-LP', title: 'Quarterly Executive LP Factsheet & Strategy Outlook', period: 'Q2/Q3 2026', generatedDate: 'SEP 2026', auditor: 'Investor Relations Desk', format: 'PDF', size: '1.9 MB', status: 'PUBLISHED' },
];
