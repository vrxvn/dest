/**
 * DUMMY DATA: SERVER & LOW-LATENCY INFRASTRUCTURE
 * Dipisahkan dari komponen script agar mudah dihapus atau diganti dengan API riil.
 */

export interface ClusterNode {
  clusterId: string;
  datacenter: string;
  crossConnect: string;
  pingMs: string;
  jitter: string;
  packetLoss: string;
  temperature: string;
  status: 'ONLINE' | 'OPTIMAL';
}

export const CLUSTERS: ClusterNode[] = [
  { clusterId: 'TYO-EQUINIX-TY3', datacenter: 'Tokyo Otemachi TY3', crossConnect: 'JPX Arrowhead Fiber', pingMs: '1.12 ms', jitter: '0.02 ms', packetLoss: '0.00%', temperature: '18.4°C', status: 'OPTIMAL' },
  { clusterId: 'LDN-EQUINIX-LD4', datacenter: 'London Slough LD4', crossConnect: 'LSE / BATS Direct Cross', pingMs: '1.45 ms', jitter: '0.01 ms', packetLoss: '0.00%', temperature: '17.9°C', status: 'OPTIMAL' },
  { clusterId: 'NYC-EQUINIX-NY4', datacenter: 'New Jersey Secaucus NY4', crossConnect: 'CME Aurora Microwave', pingMs: '1.08 ms', jitter: '0.01 ms', packetLoss: '0.00%', temperature: '18.1°C', status: 'OPTIMAL' },
  { clusterId: 'SGP-EQUINIX-SG1', datacenter: 'Singapore Ayer Rajah SG1', crossConnect: 'SGX Titan Direct Connect', pingMs: '2.04 ms', jitter: '0.04 ms', packetLoss: '0.00%', temperature: '19.2°C', status: 'ONLINE' },
  { clusterId: 'FRA-EQUINIX-FR2', datacenter: 'Frankfurt Kleyer FR2', crossConnect: 'Deutsche Börse Eurex', pingMs: '1.68 ms', jitter: '0.03 ms', packetLoss: '0.00%', temperature: '18.0°C', status: 'OPTIMAL' },
];
