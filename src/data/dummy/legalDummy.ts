/**
 * DUMMY DATA: LEGAL & REGULATORY FILINGS
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
 */

export interface LegalFiling {
  filingId: string;
  regulatoryBody: string;
  jurisdiction: string;
  scope: string;
  status: 'CURRENT' | 'APPROVED' | 'COMPLIANT';
  renewalDate: string;
}

export const LEGAL_FILINGS: LegalFiling[] = [
  { filingId: 'SEC-FORM-ADV', regulatoryBody: 'U.S. Securities & Exchange Comm.', jurisdiction: 'United States (Delaware)', scope: 'Exempt Reporting Adviser (ERA)', status: 'APPROVED', renewalDate: 'MAR 2027' },
  { filingId: 'CFTC-NFA-PQR', regulatoryBody: 'Commodity Futures Trading Comm.', jurisdiction: 'United States (Illinois)', scope: 'Commodity Pool Operator (CPO)', status: 'COMPLIANT', renewalDate: 'JAN 2027' },
  { filingId: 'FCA-FRN-782', regulatoryBody: 'Financial Conduct Authority', jurisdiction: 'United Kingdom (London)', scope: 'Cross-Border Wholesale Broker', status: 'APPROVED', renewalDate: 'OCT 2027' },
  { filingId: 'MAS-CMSL-94', regulatoryBody: 'Monetary Authority of Singapore', jurisdiction: 'Singapore (Raffles)', scope: 'Capital Markets Services License', status: 'CURRENT', renewalDate: 'NOV 2026' },
  { filingId: 'CIMA-SIBA-04', regulatoryBody: 'Cayman Islands Monetary Auth.', jurisdiction: 'Cayman Islands', scope: 'Registered Private Fund Category', status: 'APPROVED', renewalDate: 'DEC 2026' },
];
