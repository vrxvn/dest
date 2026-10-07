import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  TrendingUp,
  BrainCircuit,
  TestTube,
  ArrowUpRight,
  Gauge,
  Workflow,
  Cpu,
  Play,
  Layers,
  Activity,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Radio,
  Server,
  Zap,
  FileCheck,
  Plus,
  Scale,
  ShieldAlert,
  BarChart2,
  RefreshCw,
  Lock,
} from 'lucide-react';
import {
  ALGO_MODELS,
  INITIAL_AI_SIGNALS,
  GPU_CLUSTER_NODES,
  GENESIS_PERFORMANCE_TIMEFRAMES,
  type AlgoModel,
  type LiveAiSignal,
} from '../data/dummy/genesisDummy';
import { GenesisModelDetailModal } from './GenesisModelDetailModal';
import { GenesisNewModelModal } from './GenesisNewModelModal';
import { GenesisAuditDossierModal } from './GenesisAuditDossierModal';
import { GenesisKillSwitchModal } from './GenesisKillSwitchModal';

/**
 * High-fidelity Catmull-Rom to Cubic Bezier smooth spline generator.
 * Produces C1 continuous curvature with zero kinks, zero sharp angles, and zero jagged bumps.
 */
function generateSmoothSpline(points: { x: number; y: number }[], tension: number = 0.2): string {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;
  if (points.length === 2) {
    const midX = (points[0].x + points[1].x) / 2;
    return `M ${points[0].x.toFixed(2)},${points[0].y.toFixed(2)} C ${midX.toFixed(2)},${points[0].y.toFixed(2)} ${midX.toFixed(2)},${points[1].y.toFixed(2)} ${points[1].x.toFixed(2)},${points[1].y.toFixed(2)}`;
  }

  let path = `M ${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    path += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return path;
}

export const GenesisView: React.FC = () => {
  const [models, setModels] = useState<AlgoModel[]>(ALGO_MODELS);
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [activeTimeframe, setActiveTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('1M');
  const [rightPanelTab, setRightPanelTab] = useState<'LOSS_CURVE' | 'GPU_NODES'>('LOSS_CURVE');
  const [selectedModel, setSelectedModel] = useState<AlgoModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModelModalOpen, setIsNewModelModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [liveSignals, setLiveSignals] = useState<LiveAiSignal[]>(INITIAL_AI_SIGNALS);
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    yGenesis: number;
    ySignal: number;
    yBtc: number;
    ySp500: number;
    label: string;
    genesisVal: number;
    signalVal: number;
    spVal: number;
    btcVal: number;
  } | null>(null);

  const [hoveredLossPoint, setHoveredLossPoint] = useState<{
    x: number;
    yVal: number;
    yTrain: number;
    epoch: number;
    valLoss: number;
    trainLoss: number;
  } | null>(null);

  const [hoveredMcPoint, setHoveredMcPoint] = useState<{
    x: number;
    yMedian: number;
    yUpper: number;
    yDrawdown: number;
    yVaR: number;
    step: string;
    medianVal: number;
    upperVal: number;
    ddVal: number;
    varVal: number;
  } | null>(null);

  // State for 4th Section: OFI Chart & SOR Gateway Block
  const [hoveredOfiPoint, setHoveredOfiPoint] = useState<{
    x: number;
    yOptimal: number;
    yPassive: number;
    yBenchmark: number;
    yTail: number;
    ticketSize: string;
    optimalBps: number;
    passiveBps: number;
    benchmarkBps: number;
    tailBps: number;
    savedDollars: string;
    route: string;
  } | null>(null);

  const [sorThrottleMode, setSorThrottleMode] = useState<'NORMAL' | 'DEFENSIVE' | 'SHIELD'>('NORMAL');
  const [isKillSwitchModalOpen, setIsKillSwitchModalOpen] = useState(false);
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const [resyncSuccess, setResyncSuccess] = useState(false);

  // Periodic signal streaming
  useEffect(() => {
    const interval = setInterval(() => {
      const symbols = ['BTC/USD', 'ETH/USD', 'SOL ⇄ USDC', 'EUR/USD', 'GBP/USD', 'BTC-OPT'];
      const modelNames = ['KAIROS-GENESIS V4', 'AETHER ARB HFT', 'NEBULA STAT-ARB', 'CHRONOS SENTIMENT', 'TITAN VOL SURF'];
      const actions: ('BUY' | 'SELL' | 'ARB_ROUTE')[] = ['BUY', 'SELL', 'ARB_ROUTE'];

      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      const mName = modelNames[Math.floor(Math.random() * modelNames.length)];
      const act = actions[Math.floor(Math.random() * actions.length)];
      const conf = +(Math.random() * 12 + 86).toFixed(1);
      const alphaBps = +(Math.random() * 25 + 15).toFixed(1);

      const newSig: LiveAiSignal = {
        id: `sig-${Date.now()}`,
        modelName: mName,
        symbol: sym,
        action: act,
        price: sym.includes('BTC') ? '$84,240' : sym.includes('ETH') ? '$2,695' : '$121.20',
        confidence: conf,
        expectedAlphaBps: alphaBps,
        timeAgo: 'Baru saja',
      };

      setLiveSignals((prev) => [newSig, ...prev.slice(0, 14)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handlePromoteModel = (modelId: string) => {
    setModels((prev) =>
      prev.map((m) => (m.id === modelId ? { ...m, stage: 'LIVE PRODUCTION' } : m))
    );
  };

  const filteredModels = models.filter((m) => {
    if (selectedStage === 'ALL') return true;
    return m.stage === selectedStage;
  });

  // 3D Solid Ceramic Glass aesthetic matching application theme
  const glassCard =
    'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e6ecf4] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border-t-[2.5px] border-t-white border-x-[1.5px] border-slate-200/90 border-b-[4px] border-b-slate-300 shadow-[0_16px_34px_-6px_rgba(15,23,42,0.14),0_6px_14px_-2px_rgba(15,23,42,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2.5px_3px_rgba(148,163,184,0.35)] p-3 sm:p-3.5 flex flex-col justify-between transition-all';

  const currentDataset = GENESIS_PERFORMANCE_TIMEFRAMES[activeTimeframe] || GENESIS_PERFORMANCE_TIMEFRAMES['1M'];

  // Dynamic returns for header badge and legend
  const latestGenesisRet = ((currentDataset.genesisFund[currentDataset.genesisFund.length - 1] - 100)).toFixed(1);
  const latestSignalRet = ((currentDataset.signal ? currentDataset.signal[currentDataset.signal.length - 1] : currentDataset.genesisFund[currentDataset.genesisFund.length - 1] * 0.95) - 100).toFixed(1);
  const latestBtcRet = ((currentDataset.btc[currentDataset.btc.length - 1] - 100)).toFixed(1);
  const latestSpRet = ((currentDataset.sp500[currentDataset.sp500.length - 1] - 100)).toFixed(1);
  const netOutperformance = (parseFloat(latestGenesisRet) - parseFloat(latestSpRet)).toFixed(1);

  // -------------------------------------------------------------
  // 1. LEFT CHART: GENESIS ALPHA CUMULATIVE TRAJECTORY
  // -------------------------------------------------------------
  const padLeft = 20;
  const padRight = 485;
  const padTop = 16;
  const padBottom = 96;
  const plotWidth = padRight - padLeft;
  const plotHeight = padBottom - padTop;

  // Compute maximum return for clean proportional scaling
  const maxReturnVal = useMemo(() => {
    const rawSignal = currentDataset.signal || currentDataset.genesisFund.map((v) => v * 0.95);
    const maxRet = Math.max(
      ...currentDataset.genesisFund.map((v) => v - 100),
      ...rawSignal.map((v) => v - 100),
      ...currentDataset.btc.map((v) => v - 100),
      25
    );
    return Math.ceil(maxRet / 10) * 10;
  }, [currentDataset]);

  const { coordsGenesis, coordsSignal, coordsBtc, coordsSp500 } = useMemo(() => {
    const rawSignal = currentDataset.signal || currentDataset.genesisFund.map((v) => v * 0.95);

    const mapSeries = (series: number[]) => {
      const n = series.length;
      return series.map((val, i) => {
        const ret = Math.max(0, val - 100);
        return {
          x: padLeft + (i / (n - 1)) * plotWidth,
          y: padBottom - (ret / maxReturnVal) * plotHeight,
          val,
          ret,
        };
      });
    };

    return {
      coordsGenesis: mapSeries(currentDataset.genesisFund),
      coordsSignal: mapSeries(rawSignal),
      coordsBtc: mapSeries(currentDataset.btc),
      coordsSp500: mapSeries(currentDataset.sp500),
    };
  }, [currentDataset, plotWidth, plotHeight, padLeft, padBottom, maxReturnVal]);

  const splineGenesis = useMemo(() => generateSmoothSpline(coordsGenesis, 0.22), [coordsGenesis]);
  const splineSignal = useMemo(() => generateSmoothSpline(coordsSignal, 0.22), [coordsSignal]);
  const splineBtc = useMemo(() => generateSmoothSpline(coordsBtc, 0.20), [coordsBtc]);
  const splineSp500 = useMemo(() => generateSmoothSpline(coordsSp500, 0.20), [coordsSp500]);

  const areaGenesis = useMemo(() => {
    if (coordsGenesis.length === 0) return '';
    const firstX = coordsGenesis[0].x.toFixed(2);
    const lastX = coordsGenesis[coordsGenesis.length - 1].x.toFixed(2);
    return `${splineGenesis} L ${lastX},${padBottom} L ${firstX},${padBottom} Z`;
  }, [splineGenesis, coordsGenesis, padBottom]);

  // Dynamic X-axis milestone labels along bottom
  const leftXAxisMilestones = useMemo(() => {
    const labels = currentDataset.labels;
    const n = labels.length;
    if (n <= 4) {
      return labels.map((lbl, idx) => ({
        label: lbl,
        x: padLeft + (idx / (n - 1)) * plotWidth,
      }));
    }
    const step = (n - 1) / 3;
    const indices = [0, Math.round(step), Math.round(step * 2), n - 1];
    return indices.map((idx) => ({
      label: labels[idx],
      x: padLeft + (idx / (n - 1)) * plotWidth,
    }));
  }, [currentDataset, padLeft, plotWidth]);

  // -------------------------------------------------------------
  // 2. RIGHT CHART: HPC LOSS CURVE
  // -------------------------------------------------------------
  const lossPadLeft = 18;
  const lossPadRight = 358;
  const lossPadTop = 16;
  const lossPadBottom = 96;
  const lossPlotW = lossPadRight - lossPadLeft;
  const lossPlotH = lossPadBottom - lossPadTop;

  const lossCheckpoints = useMemo(
    () => [
      { epoch: 0, valLoss: 0.842, trainLoss: 0.776 },
      { epoch: 60, valLoss: 0.584, trainLoss: 0.512 },
      { epoch: 120, valLoss: 0.405, trainLoss: 0.342 },
      { epoch: 200, valLoss: 0.278, trainLoss: 0.225 },
      { epoch: 300, valLoss: 0.186, trainLoss: 0.145 },
      { epoch: 420, valLoss: 0.124, trainLoss: 0.098 },
      { epoch: 550, valLoss: 0.086, trainLoss: 0.068 },
      { epoch: 680, valLoss: 0.063, trainLoss: 0.051 },
      { epoch: 780, valLoss: 0.051, trainLoss: 0.043 },
      { epoch: 860, valLoss: 0.046, trainLoss: 0.040 },
      { epoch: 940, valLoss: 0.043, trainLoss: 0.038 },
      { epoch: 1000, valLoss: 0.042, trainLoss: 0.038 },
    ],
    []
  );

  const { coordsValLoss, coordsTrainLoss } = useMemo(() => {
    const minL = 0.035;
    const maxL = 0.86;
    const n = lossCheckpoints.length;

    const coordsVal = lossCheckpoints.map((pt, i) => {
      const normalizedRatio = 1 - (pt.valLoss - minL) / (maxL - minL);
      return {
        x: lossPadLeft + (i / (n - 1)) * lossPlotW,
        y: lossPadTop + normalizedRatio * lossPlotH,
        ...pt,
      };
    });

    const coordsTrain = lossCheckpoints.map((pt, i) => {
      const normalizedRatio = 1 - (pt.trainLoss - minL) / (maxL - minL);
      return {
        x: lossPadLeft + (i / (n - 1)) * lossPlotW,
        y: lossPadTop + normalizedRatio * lossPlotH,
        ...pt,
      };
    });

    return { coordsValLoss: coordsVal, coordsTrainLoss: coordsTrain };
  }, [lossCheckpoints, lossPlotW, lossPlotH, lossPadLeft, lossPadTop]);

  const splineValLoss = useMemo(() => generateSmoothSpline(coordsValLoss, 0.22), [coordsValLoss]);
  const splineTrainLoss = useMemo(() => generateSmoothSpline(coordsTrainLoss, 0.22), [coordsTrainLoss]);

  const areaValLoss = useMemo(() => {
    if (coordsValLoss.length === 0) return '';
    const firstX = coordsValLoss[0].x.toFixed(2);
    const lastX = coordsValLoss[coordsValLoss.length - 1].x.toFixed(2);
    return `${splineValLoss} L ${lastX},${lossPadBottom} L ${firstX},${lossPadBottom} Z`;
  }, [splineValLoss, coordsValLoss, lossPadBottom]);

  // -------------------------------------------------------------
  // 3. NEW CHART: MONTE CARLO VaR & DRAWDOWN TRAJECTORY LOGIC
  // -------------------------------------------------------------
  const mcPadLeft = 18;
  const mcPadRight = 326;
  const mcPadTop = 16;
  const mcPadBottom = 75; // Baseline 0.0%
  const mcPadLowest = 98; // -5% Tail level
  const mcPlotW = mcPadRight - mcPadLeft;

  const mcMilestones = useMemo(
    () => [
      { step: 'T+0', median: 0.0, upper: 0.0, dd: 0.0, varTail: -0.5 },
      { step: 'T+4', median: 3.2, upper: 5.8, dd: -0.4, varTail: -1.2 },
      { step: 'T+8', median: 6.8, upper: 11.4, dd: -0.8, varTail: -1.8 },
      { step: 'T+12', median: 10.5, upper: 16.8, dd: -0.5, varTail: -2.3 },
      { step: 'T+16', median: 14.8, upper: 22.4, dd: -1.2, varTail: -2.9 },
      { step: 'T+20', median: 18.2, upper: 27.5, dd: -1.8, varTail: -3.4 },
      { step: 'T+24', median: 22.4, upper: 32.8, dd: -1.1, varTail: -3.9 },
      { step: 'T+28', median: 25.8, upper: 36.2, dd: -0.9, varTail: -4.2 },
      { step: 'T+30', median: 28.4, upper: 39.5, dd: -0.7, varTail: -4.5 },
    ],
    []
  );

  const { coordsMcMedian, coordsMcUpper, coordsMcDrawdown, coordsMcVaR } = useMemo(() => {
    const n = mcMilestones.length;
    const mapY = (ret: number) => {
      if (ret >= 0) {
        return mcPadBottom - (ret / 40) * (mcPadBottom - mcPadTop);
      } else {
        return mcPadBottom + (-ret / 5) * (mcPadLowest - mcPadBottom);
      }
    };

    const cMedian = mcMilestones.map((pt, i) => ({
      x: mcPadLeft + (i / (n - 1)) * mcPlotW,
      y: mapY(pt.median),
      ...pt,
    }));

    const cUpper = mcMilestones.map((pt, i) => ({
      x: mcPadLeft + (i / (n - 1)) * mcPlotW,
      y: mapY(pt.upper),
      ...pt,
    }));

    const cDrawdown = mcMilestones.map((pt, i) => ({
      x: mcPadLeft + (i / (n - 1)) * mcPlotW,
      y: mapY(pt.dd),
      ...pt,
    }));

    const cVaR = mcMilestones.map((pt, i) => ({
      x: mcPadLeft + (i / (n - 1)) * mcPlotW,
      y: mapY(pt.varTail),
      ...pt,
    }));

    return {
      coordsMcMedian: cMedian,
      coordsMcUpper: cUpper,
      coordsMcDrawdown: cDrawdown,
      coordsMcVaR: cVaR,
    };
  }, [mcMilestones, mcPadLeft, mcPadRight, mcPadTop, mcPadBottom, mcPadLowest, mcPlotW]);

  const splineMcMedian = useMemo(() => generateSmoothSpline(coordsMcMedian, 0.22), [coordsMcMedian]);
  const splineMcUpper = useMemo(() => generateSmoothSpline(coordsMcUpper, 0.22), [coordsMcUpper]);
  const splineMcDrawdown = useMemo(() => generateSmoothSpline(coordsMcDrawdown, 0.22), [coordsMcDrawdown]);
  const splineMcVaR = useMemo(() => generateSmoothSpline(coordsMcVaR, 0.22), [coordsMcVaR]);

  const areaMcDrawdown = useMemo(() => {
    if (coordsMcDrawdown.length === 0) return '';
    const firstX = coordsMcDrawdown[0].x.toFixed(2);
    const lastX = coordsMcDrawdown[coordsMcDrawdown.length - 1].x.toFixed(2);
    return `${splineMcDrawdown} L ${lastX},${mcPadBottom} L ${firstX},${mcPadBottom} Z`;
  }, [splineMcDrawdown, coordsMcDrawdown, mcPadBottom]);

  // -------------------------------------------------------------
  // 4. NEW CHART: ORDER FLOW MICROSTRUCTURE & SLIPPAGE DYNAMICS
  // -------------------------------------------------------------
  const ofiPadLeft = 32;
  const ofiPadRight = 550;
  const ofiPadTop = 18;
  const ofiPadBottom = 88; // 0.0 bps baseline
  const ofiPadLowest = 112; // -0.5 bps maker rebate floor
  const ofiPlotW = ofiPadRight - ofiPadLeft;

  const ofiMilestones = useMemo(
    () => [
      { ticketSize: '$50K', optimalBps: 0.02, passiveBps: -0.15, benchmarkBps: 0.18, tailBps: 0.35, savedDollars: '$80', route: 'Binance VIP • Maker Rebate' },
      { ticketSize: '$150K', optimalBps: 0.05, passiveBps: -0.10, benchmarkBps: 0.42, tailBps: 0.78, savedDollars: '$550', route: 'CME Globex • Spread Capture' },
      { ticketSize: '$300K', optimalBps: 0.08, passiveBps: -0.05, benchmarkBps: 0.85, tailBps: 1.32, savedDollars: '$2,310', route: 'EBS Spot • Primary Top' },
      { ticketSize: '$500K', optimalBps: 0.12, passiveBps: 0.02, benchmarkBps: 1.45, tailBps: 2.10, savedDollars: '$6,650', route: 'Cross-Venue SOR • Hybrid' },
      { ticketSize: '$1.0M', optimalBps: 0.18, passiveBps: 0.08, benchmarkBps: 2.20, tailBps: 3.05, savedDollars: '$20,200', route: 'Dark Pool Iceberg • TWAP' },
      { ticketSize: '$2.5M', optimalBps: 0.26, passiveBps: 0.15, benchmarkBps: 3.40, tailBps: 4.25, savedDollars: '$78,500', route: 'POV Micro-Burst • Chicago' },
      { ticketSize: '$5.0M', optimalBps: 0.38, passiveBps: 0.24, benchmarkBps: 4.85, tailBps: 5.90, savedDollars: '$223,500', route: 'Multi-Block Liquidity Router' },
    ],
    []
  );

  const { coordsOfiOptimal, coordsOfiPassive, coordsOfiBenchmark, coordsOfiTail } = useMemo(() => {
    const n = ofiMilestones.length;
    const maxBps = 6.0;
    const minBps = -0.5;

    const mapY = (bps: number) => {
      if (bps >= 0) {
        return ofiPadBottom - (bps / maxBps) * (ofiPadBottom - ofiPadTop);
      } else {
        return ofiPadBottom + (-bps / -minBps) * (ofiPadLowest - ofiPadBottom);
      }
    };

    const cOptimal = ofiMilestones.map((pt, i) => ({
      x: ofiPadLeft + (i / (n - 1)) * ofiPlotW,
      y: mapY(pt.optimalBps),
      ...pt,
    }));

    const cPassive = ofiMilestones.map((pt, i) => ({
      x: ofiPadLeft + (i / (n - 1)) * ofiPlotW,
      y: mapY(pt.passiveBps),
      ...pt,
    }));

    const cBenchmark = ofiMilestones.map((pt, i) => ({
      x: ofiPadLeft + (i / (n - 1)) * ofiPlotW,
      y: mapY(pt.benchmarkBps),
      ...pt,
    }));

    const cTail = ofiMilestones.map((pt, i) => ({
      x: ofiPadLeft + (i / (n - 1)) * ofiPlotW,
      y: mapY(pt.tailBps),
      ...pt,
    }));

    return {
      coordsOfiOptimal: cOptimal,
      coordsOfiPassive: cPassive,
      coordsOfiBenchmark: cBenchmark,
      coordsOfiTail: cTail,
    };
  }, [ofiMilestones, ofiPadLeft, ofiPlotW, ofiPadTop, ofiPadBottom, ofiPadLowest]);

  const splineOfiOptimal = useMemo(() => generateSmoothSpline(coordsOfiOptimal, 0.22), [coordsOfiOptimal]);
  const splineOfiPassive = useMemo(() => generateSmoothSpline(coordsOfiPassive, 0.22), [coordsOfiPassive]);
  const splineOfiBenchmark = useMemo(() => generateSmoothSpline(coordsOfiBenchmark, 0.22), [coordsOfiBenchmark]);
  const splineOfiTail = useMemo(() => generateSmoothSpline(coordsOfiTail, 0.22), [coordsOfiTail]);

  const areaOfiOptimal = useMemo(() => {
    if (coordsOfiOptimal.length === 0) return '';
    const firstX = coordsOfiOptimal[0].x.toFixed(2);
    const lastX = coordsOfiOptimal[coordsOfiOptimal.length - 1].x.toFixed(2);
    return `${splineOfiOptimal} L ${lastX},${ofiPadBottom} L ${firstX},${ofiPadBottom} Z`;
  }, [splineOfiOptimal, coordsOfiOptimal, ofiPadBottom]);

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-2.5 overflow-y-auto xl:overflow-hidden custom-scrollbar pr-0.5 pb-0 font-mono">
      {/* ============================================================== */}
      {/* 1. TOP CARDS: 4 KEY METRIC CARDS                                */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 flex-shrink-0">
        {/* Card 1: Seed Capital Incubated */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 stroke-[2.3]" />
              SEED CAPITAL INCUBATED
            </span>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full border border-indigo-200/80 font-mono">
              QUANT LAB
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              $15,000,000.00
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">6 ACTIVE ALGOS</span>
            <span className="text-indigo-600 font-extrabold">ALPHA ALLOCATED</span>
          </div>
        </div>

        {/* Card 2: Mean Sharpe & Sortino */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.3]" />
              MEAN SHARPE RATIO
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              3.55 SHARPE
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight font-mono">
              +$3,842,100.00
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">MAX DRAWDOWN -1.8%</span>
            <span className="text-emerald-700 font-bold">SORTINO 4.82</span>
          </div>
        </div>

        {/* Card 3: GPU HPC Cluster */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600 stroke-[2.3]" />
              NVIDIA H100 CLUSTER
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              64x SXM5
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              98.4% LOAD
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">MEMORY 3.8 TB/s</span>
            <span className="text-blue-700 font-extrabold">1.2M TICK/DETIK</span>
          </div>
        </div>

        {/* Card 4: Monte Carlo Simulations */}
        <div className={glassCard}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] xl:text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono flex items-center gap-1.5">
              <TestTube className="w-3.5 h-3.5 text-amber-500 stroke-[2.3]" />
              MONTE CARLO CONFIDENCE
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-mono">
              10M RUNS
            </span>
          </div>
          <div className="my-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-mono">
              99.8% CERTAINTY
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] font-mono">
            <span className="text-slate-400">BLACK SWAN STRESS</span>
            <span className="text-indigo-600 font-extrabold">ZERO RUIN PROB</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. MIDDLE ROW: SPECIFIC CHARTS (SPACIOUS & PERFECTLY ALIGNED)  */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-2 sm:gap-2.5 flex-[0.85] min-h-[160px]">
        {/* Left (5 Columns): GENESIS ALPHA CUMULATIVE TRAJECTORY */}
        <div className={`xl:col-span-5 ${glassCard} flex flex-col justify-between h-full min-h-0 overflow-hidden p-2 sm:p-2.5`}>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[10px] xl:text-[11px] font-black tracking-wider text-slate-800 uppercase truncate">
                GENESIS ALPHA CUMULATIVE TRAJECTORY
              </span>
              <span className="text-[8px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 shadow-2xs shrink-0 font-mono">
                Alpha +{latestGenesisRet}%
              </span>
            </div>

            {/* Timeframe selector & Audit Dossier Button */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[8px] font-mono">
                {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setActiveTimeframe(tf)}
                    className={`px-1.5 py-0.5 rounded-lg font-black transition-all cursor-pointer ${
                      activeTimeframe === tf
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsAuditModalOpen(true)}
                className="px-2 py-0.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[8px] uppercase tracking-wider shadow-xs flex items-center gap-1 cursor-pointer transition-all"
                title="Buka Lembar Audit Kuantitatif Komite Investasi"
              >
                <FileCheck className="w-3 h-3 text-emerald-400" />
                <span className="hidden sm:inline">AUDIT DOSSIER</span>
              </button>
            </div>
          </div>

          {/* Clean Legend Bar */}
          <div className="flex items-center justify-between text-[7.5px] font-bold text-slate-600 py-0.5 shrink-0">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="flex items-center gap-1 text-indigo-700">
                <span className="w-2.5 h-1 rounded-full bg-indigo-600 shadow-2xs" /> Genesis Fund (+{latestGenesisRet}%)
              </span>
              <span className="flex items-center gap-1 text-sky-600">
                <span className="w-2.5 h-1 rounded-full bg-sky-400 shadow-2xs" /> Signal (+{latestSignalRet}%)
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-2.5 h-0.5 bg-amber-500" /> BTC (+{latestBtcRet}%)
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-0.5 border-t border-dashed border-slate-400" /> S&P 500 (+{latestSpRet}%)
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[7px] hidden sm:inline">OUTPERFORMANCE: +{netOutperformance}%</span>
          </div>

          {/* Dynamic SVG Container inside subtle glass instrument bezel */}
          <div className="flex-1 min-h-[75px] w-full relative overflow-hidden my-0.5 rounded-xl bg-gradient-to-b from-white/95 via-slate-50/70 to-indigo-50/20 border border-slate-200/90 p-1 shadow-2xs">
            <svg
              viewBox="0 0 540 125"
              preserveAspectRatio="none"
              className="w-full h-full cursor-crosshair"
              style={{ shapeRendering: 'geometricPrecision' }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width;
                const ptsCount = coordsGenesis.length;
                const idx = Math.min(ptsCount - 1, Math.max(0, Math.round(relX * (ptsCount - 1))));
                setHoveredPoint({
                  x: coordsGenesis[idx].x,
                  yGenesis: coordsGenesis[idx].y,
                  ySignal: coordsSignal[idx].y,
                  yBtc: coordsBtc[idx].y,
                  ySp500: coordsSp500[idx].y,
                  label: currentDataset.labels[idx],
                  genesisVal: currentDataset.genesisFund[idx],
                  signalVal: currentDataset.signal ? currentDataset.signal[idx] : currentDataset.genesisFund[idx] * 0.95,
                  spVal: currentDataset.sp500[idx],
                  btcVal: currentDataset.btc[idx],
                });
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="genesisAlphaGradLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Reference Gridlines */}
              <line x1={padLeft} y1="16" x2={padRight} y2="16" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
              <line x1={padLeft} y1="42.7" x2={padRight} y2="42.7" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
              <line x1={padLeft} y1="69.3" x2={padRight} y2="69.3" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
              <line x1={padLeft} y1={padBottom} x2={padRight} y2={padBottom} stroke="#cbd5e1" strokeWidth="1.2" opacity="0.8" />

              {/* Y-Axis Value Labels (Right Column) */}
              <text x="492" y="19" className="text-[7.5px] font-mono font-bold fill-slate-400 select-none">+{maxReturnVal}%</text>
              <text x="492" y="45.7" className="text-[7px] font-mono font-medium fill-slate-400 select-none">+{Math.round((maxReturnVal * 2) / 3)}%</text>
              <text x="492" y="72.3" className="text-[7px] font-mono font-medium fill-slate-400 select-none">+{Math.round(maxReturnVal / 3)}%</text>
              <text x="492" y="99" className="text-[7.5px] font-mono font-bold fill-slate-500 select-none">0.0%</text>

              {/* X-Axis Milestone Dates (Bottom Row) */}
              {leftXAxisMilestones.map((ms, idx) => (
                <text
                  key={idx}
                  x={ms.x}
                  y="114"
                  textAnchor={idx === 0 ? 'start' : idx === leftXAxisMilestones.length - 1 ? 'end' : 'middle'}
                  className="text-[7px] font-mono font-bold fill-slate-400 select-none"
                >
                  {ms.label}
                </text>
              ))}

              {/* Benchmark S&P 500 (Dotted Grey - Ultra Smooth) */}
              <path
                d={splineSp500}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.6"
                strokeDasharray="3.5 3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Benchmark BTC Core (Dashed Amber - Ultra Smooth) */}
              <path
                d={splineBtc}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.8"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Signal (Sky Blue Companion - Ultra Smooth) */}
              <path
                d={splineSignal}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeOpacity="0.18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={splineSignal}
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Genesis Alpha Fund Line (Dark Blue/Indigo + Subtle Gradient Fill) */}
              <path
                d={areaGenesis}
                fill="url(#genesisAlphaGradLight)"
              />
              <path
                d={splineGenesis}
                fill="none"
                stroke="#4f46e5"
                strokeWidth="5.5"
                strokeOpacity="0.22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={splineGenesis}
                fill="none"
                stroke="#312e81"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Live Pulsing Beacon on Lead Head */}
              {coordsGenesis.length > 0 && (
                <g>
                  <circle
                    cx={coordsGenesis[coordsGenesis.length - 1].x}
                    cy={coordsGenesis[coordsGenesis.length - 1].y}
                    r="4"
                    fill="#312e81"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={coordsGenesis[coordsGenesis.length - 1].x}
                    cy={coordsGenesis[coordsGenesis.length - 1].y}
                    r="7"
                    fill="#4338ca"
                    opacity="0.3"
                    className="animate-ping"
                  />
                </g>
              )}

              {/* Dynamic Crosshair Guide and Active Data Points */}
              {hoveredPoint && (
                <g>
                  <line
                    x1={hoveredPoint.x}
                    y1={padTop - 4}
                    x2={hoveredPoint.x}
                    y2={padBottom + 2}
                    stroke="#4f46e5"
                    strokeWidth="1.5"
                    strokeDasharray="2.5 2.5"
                    opacity="0.85"
                  />
                  <circle cx={hoveredPoint.x} cy={hoveredPoint.yGenesis} r="4.5" fill="#312e81" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={hoveredPoint.x} cy={hoveredPoint.ySignal} r="3.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={hoveredPoint.x} cy={hoveredPoint.yBtc} r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={hoveredPoint.x} cy={hoveredPoint.ySp500} r="3" fill="#94a3b8" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              )}
            </svg>

            {/* Interactive Tooltip Card on Hover */}
            {hoveredPoint && (
              <div
                className="absolute pointer-events-none top-2 z-20 px-2 py-1 rounded-xl bg-slate-900/95 text-white border border-slate-700 shadow-xl backdrop-blur-md text-[7.5px] transform -translate-x-1/2 font-mono"
                style={{ left: `${Math.min(420, Math.max(80, hoveredPoint.x)) / 5.4}%` }}
              >
                <div className="font-bold text-slate-400 border-b border-slate-800 pb-0.5 mb-0.5">
                  PERIODE: {hoveredPoint.label}
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-indigo-400 font-bold">Genesis Alpha:</span>
                  <span className="font-black text-emerald-400">+{hoveredPoint.genesisVal.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-sky-400 font-bold">Signal:</span>
                  <span className="font-bold text-sky-300">+{hoveredPoint.signalVal.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-amber-400 font-bold">BTC Core:</span>
                  <span className="font-bold text-amber-300">+{hoveredPoint.btcVal.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-slate-400 font-bold">S&P 500:</span>
                  <span className="font-bold text-slate-300">+{hoveredPoint.spVal.toFixed(1)}%</span>
                </div>
                <div className="pt-0.5 mt-0.5 border-t border-slate-800 text-[7px] text-emerald-300 font-extrabold text-right">
                  Net Alpha: +{(hoveredPoint.genesisVal - hoveredPoint.spVal).toFixed(1)}%
                </div>
              </div>
            )}
          </div>

          {/* 4 Bottom Stats */}
          <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-200/80 text-[8.5px] text-center font-mono shrink-0">
            <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[7px] text-slate-400 block uppercase">ALPHA RATE</span>
              <span className="font-extrabold text-slate-800">+{latestGenesisRet}%</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[7px] text-slate-400 block uppercase">BETA EXP</span>
              <span className="font-extrabold text-slate-800">0.02x</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[7px] text-slate-400 block uppercase">MAX DD</span>
              <span className="font-extrabold text-emerald-600">-1.8%</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80 shadow-2xs">
              <span className="text-[7px] text-emerald-700 block uppercase">SORTINO</span>
              <span className="font-extrabold text-emerald-800">4.82</span>
            </div>
          </div>
        </div>

        {/* Center (4 Columns): NEW CHART - MONTE CARLO VaR & DRAWDOWN TRAJECTORY */}
        <div className={`xl:col-span-4 ${glassCard} flex flex-col justify-between h-full min-h-0 overflow-hidden p-2 sm:p-2.5`}>
          {/* Header */}
          <div className="flex items-center justify-between gap-1 pb-1 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <TestTube className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="text-[10px] xl:text-[11px] font-black uppercase text-slate-800 tracking-wider truncate">
                MONTE CARLO VaR & DRAWDOWN
              </span>
            </div>
            <span className="text-[8px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 shrink-0 font-mono">
              VaR 99%: -$142.5K
            </span>
          </div>

          {/* Clean Legend Bar */}
          <div className="flex items-center justify-between text-[7.5px] font-bold text-slate-600 py-0.5 shrink-0">
            <span className="flex items-center gap-1 text-indigo-700">
              <span className="w-2.5 h-1 rounded-full bg-indigo-600" /> Median Alpha (+28.4%)
            </span>
            <span className="flex items-center gap-1 text-rose-600">
              <span className="w-2 h-2 rounded-xs bg-rose-400/50" /> Drawdown (-1.8%)
            </span>
            <span className="flex items-center gap-1 text-rose-700">
              <span className="w-2.5 h-0.5 border-t border-dashed border-rose-500" /> VaR Tail (-4.5%)
            </span>
          </div>

          {/* Dynamic SVG Container */}
          <div className="flex-1 min-h-[75px] w-full relative overflow-hidden my-0.5 rounded-xl bg-gradient-to-b from-white/95 via-slate-50/70 to-rose-50/15 border border-slate-200/90 p-1 shadow-2xs">
            <svg
              viewBox="0 0 380 125"
              preserveAspectRatio="none"
              className="w-full h-full cursor-crosshair"
              style={{ shapeRendering: 'geometricPrecision' }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width;
                const count = coordsMcMedian.length;
                const idx = Math.min(count - 1, Math.max(0, Math.round(relX * (count - 1))));
                setHoveredMcPoint({
                  x: coordsMcMedian[idx].x,
                  yMedian: coordsMcMedian[idx].y,
                  yUpper: coordsMcUpper[idx].y,
                  yDrawdown: coordsMcDrawdown[idx].y,
                  yVaR: coordsMcVaR[idx].y,
                  step: mcMilestones[idx].step,
                  medianVal: mcMilestones[idx].median,
                  upperVal: mcMilestones[idx].upper,
                  ddVal: mcMilestones[idx].dd,
                  varVal: mcMilestones[idx].varTail,
                });
              }}
              onMouseLeave={() => setHoveredMcPoint(null)}
            >
              <defs>
                <linearGradient id="mcDrawdownGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.04" />
                </linearGradient>
                <linearGradient id="mcFanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Reference Gridlines */}
              <line x1={mcPadLeft} y1="16" x2={mcPadRight} y2="16" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
              <line x1={mcPadLeft} y1="45.5" x2={mcPadRight} y2="45.5" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
              <line x1={mcPadLeft} y1={mcPadBottom} x2={mcPadRight} y2={mcPadBottom} stroke="#cbd5e1" strokeWidth="1.2" opacity="0.8" />
              <line x1={mcPadLeft} y1={mcPadLowest} x2={mcPadRight} y2={mcPadLowest} stroke="#fecdd3" strokeDasharray="3 3" opacity="0.75" />

              {/* Y-Axis Labels */}
              <text x="332" y="19" className="text-[7px] font-mono font-bold fill-slate-400 select-none">+40%</text>
              <text x="332" y="48.5" className="text-[7px] font-mono font-medium fill-slate-400 select-none">+20%</text>
              <text x="332" y="78" className="text-[7px] font-mono font-bold fill-slate-500 select-none">0.0%</text>
              <text x="332" y="101" className="text-[7px] font-mono font-bold fill-rose-500 select-none">-5%</text>

              {/* X-Axis Milestones */}
              <text x={mcPadLeft} y="114" textAnchor="start" className="text-[7px] font-mono font-bold fill-slate-400 select-none">T+0</text>
              <text x="95" y="114" textAnchor="middle" className="text-[7px] font-mono font-bold fill-slate-400 select-none">T+8</text>
              <text x="172" y="114" textAnchor="middle" className="text-[7px] font-mono font-bold fill-slate-400 select-none">T+16</text>
              <text x="249" y="114" textAnchor="middle" className="text-[7px] font-mono font-bold fill-slate-400 select-none">T+24</text>
              <text x={mcPadRight} y="114" textAnchor="end" className="text-[7px] font-mono font-bold fill-slate-400 select-none">T+30</text>

              {/* 95% Upper Cone Path */}
              <path
                d={splineMcUpper}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.6"
                strokeDasharray="3 3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Drawdown Area (Below Baseline) */}
              <path
                d={areaMcDrawdown}
                fill="url(#mcDrawdownGrad)"
              />
              <path
                d={splineMcDrawdown}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 5% Tail VaR Line */}
              <path
                d={splineMcVaR}
                fill="none"
                stroke="#e11d48"
                strokeWidth="1.6"
                strokeDasharray="3.5 3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Median Alpha Trajectory */}
              <path
                d={splineMcMedian}
                fill="none"
                stroke="#4f46e5"
                strokeWidth="5"
                strokeOpacity="0.18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={splineMcMedian}
                fill="none"
                stroke="#312e81"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Live Endpoints */}
              {coordsMcMedian.length > 0 && (
                <g>
                  <circle
                    cx={coordsMcMedian[coordsMcMedian.length - 1].x}
                    cy={coordsMcMedian[coordsMcMedian.length - 1].y}
                    r="3.5"
                    fill="#312e81"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={coordsMcDrawdown[coordsMcDrawdown.length - 1].x}
                    cy={coordsMcDrawdown[coordsMcDrawdown.length - 1].y}
                    r="3"
                    fill="#f43f5e"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* Hover Crosshair & Indicators */}
              {hoveredMcPoint && (
                <g>
                  <line
                    x1={hoveredMcPoint.x}
                    y1={mcPadTop - 4}
                    x2={hoveredMcPoint.x}
                    y2={mcPadLowest + 2}
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeDasharray="2.5 2.5"
                    opacity="0.85"
                  />
                  <circle cx={hoveredMcPoint.x} cy={hoveredMcPoint.yMedian} r="4" fill="#312e81" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={hoveredMcPoint.x} cy={hoveredMcPoint.yUpper} r="3" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={hoveredMcPoint.x} cy={hoveredMcPoint.yDrawdown} r="3.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={hoveredMcPoint.x} cy={hoveredMcPoint.yVaR} r="3" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              )}
            </svg>

            {/* Interactive Tooltip Card for Monte Carlo */}
            {hoveredMcPoint && (
              <div
                className="absolute pointer-events-none top-2 z-20 px-2 py-1 rounded-xl bg-slate-900/95 text-white border border-slate-700 shadow-xl backdrop-blur-md text-[7.5px] transform -translate-x-1/2 font-mono"
                style={{ left: `${Math.min(290, Math.max(70, hoveredMcPoint.x)) / 3.8}%` }}
              >
                <div className="font-bold text-slate-400 border-b border-slate-800 pb-0.5 mb-0.5">
                  HORIZON: {hoveredMcPoint.step}
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-indigo-400 font-bold">Median Alpha:</span>
                  <span className="font-black text-emerald-400">+{hoveredMcPoint.medianVal.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-sky-400 font-bold">95% Upper Cone:</span>
                  <span className="font-bold text-sky-300">+{hoveredMcPoint.upperVal.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-rose-400 font-bold">Drawdown:</span>
                  <span className="font-bold text-rose-300">{hoveredMcPoint.ddVal.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-amber-400 font-bold">5% VaR Tail:</span>
                  <span className="font-bold text-amber-300">{hoveredMcPoint.varVal.toFixed(1)}%</span>
                </div>
              </div>
            )}
          </div>

          {/* 4 Bottom Metric Pills */}
          <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-200/80 text-[8.5px] text-center font-mono shrink-0">
            <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[7px] text-slate-400 block uppercase">1D VaR 99%</span>
              <span className="font-extrabold text-rose-600">-$142.5K</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[7px] text-slate-400 block uppercase">COND VaR</span>
              <span className="font-extrabold text-slate-800">-$218.0K</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[7px] text-slate-400 block uppercase">MAX DD</span>
              <span className="font-extrabold text-emerald-600">-1.8%</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80 shadow-2xs">
              <span className="text-[7px] text-emerald-700 block uppercase">RUIN PROB</span>
              <span className="font-extrabold text-emerald-800">0.00%</span>
            </div>
          </div>
        </div>

        {/* Right (3 Columns): HPC COMPUTE & MODEL CONVERGENCE */}
        <div className={`xl:col-span-3 ${glassCard} flex flex-col justify-between h-full min-h-0 overflow-hidden p-2 sm:p-2.5`}>
          {/* Header */}
          <div className="flex items-center justify-between gap-1 pb-1 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <Cpu className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-[10px] xl:text-[11px] font-black uppercase text-slate-800 tracking-wider truncate">
                HPC COMPUTE & MODEL CONVERGENCE
              </span>
            </div>

            {/* Tab Selector */}
            <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[8px] font-mono shrink-0">
              <button
                type="button"
                onClick={() => setRightPanelTab('LOSS_CURVE')}
                className={`px-2 py-0.5 rounded-lg font-black transition-all cursor-pointer ${
                  rightPanelTab === 'LOSS_CURVE'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                LOSS CURVE
              </button>
              <button
                type="button"
                onClick={() => setRightPanelTab('GPU_NODES')}
                className={`px-2 py-0.5 rounded-lg font-black transition-all cursor-pointer ${
                  rightPanelTab === 'GPU_NODES'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                H100 NODES
              </button>
            </div>
          </div>

          {/* Tab 1: Loss Curve */}
          {rightPanelTab === 'LOSS_CURVE' ? (
            <>
              {/* Clean Legend Bar */}
              <div className="flex items-center justify-between text-[7.5px] font-bold text-slate-600 py-0.5 shrink-0">
                <span className="flex items-center gap-1 text-emerald-700 font-extrabold">
                  <span className="w-2.5 h-1 rounded-full bg-emerald-500" /> Validation Loss: 0.042
                </span>
                <span className="flex items-center gap-1 text-indigo-700 font-extrabold">
                  <span className="w-2.5 h-0.5 border-t border-dashed border-indigo-500" /> Training Loss: 0.038
                </span>
                <span className="text-emerald-700 font-mono text-[7px] font-black hidden sm:inline">CONVERGED (P&lt;0.001)</span>
              </div>

              {/* Dynamic SVG Container */}
              <div className="flex-1 min-h-[75px] w-full relative overflow-hidden my-0.5 rounded-xl bg-gradient-to-b from-white/95 via-slate-50/70 to-emerald-50/20 border border-slate-200/90 p-1 shadow-2xs">
                <svg
                  viewBox="0 0 420 125"
                  preserveAspectRatio="none"
                  className="w-full h-full cursor-crosshair"
                  style={{ shapeRendering: 'geometricPrecision' }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const relX = (e.clientX - rect.left) / rect.width;
                    const count = coordsValLoss.length;
                    const idx = Math.min(count - 1, Math.max(0, Math.round(relX * (count - 1))));
                    setHoveredLossPoint({
                      x: coordsValLoss[idx].x,
                      yVal: coordsValLoss[idx].y,
                      yTrain: coordsTrainLoss[idx].y,
                      epoch: lossCheckpoints[idx].epoch,
                      valLoss: lossCheckpoints[idx].valLoss,
                      trainLoss: lossCheckpoints[idx].trainLoss,
                    });
                  }}
                  onMouseLeave={() => setHoveredLossPoint(null)}
                >
                  <defs>
                    <linearGradient id="lossGradGreenRefined" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.16" />
                      <stop offset="70%" stopColor="#10b981" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  <line x1={lossPadLeft} y1="16" x2={lossPadRight} y2="16" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
                  <line x1={lossPadLeft} y1="42.7" x2={lossPadRight} y2="42.7" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
                  <line x1={lossPadLeft} y1="69.3" x2={lossPadRight} y2="69.3" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
                  <line x1={lossPadLeft} y1={lossPadBottom} x2={lossPadRight} y2={lossPadBottom} stroke="#cbd5e1" strokeWidth="1.2" opacity="0.8" />

                  {/* Y-Axis Value Labels (Right Column) */}
                  <text x="366" y="19" className="text-[7.5px] font-mono font-bold fill-slate-400 select-none">0.85</text>
                  <text x="366" y="45.7" className="text-[7px] font-mono font-medium fill-slate-400 select-none">0.50</text>
                  <text x="366" y="72.3" className="text-[7px] font-mono font-medium fill-slate-400 select-none">0.20</text>
                  <text x="366" y="99" className="text-[7.5px] font-mono font-bold fill-emerald-600 select-none">0.04</text>

                  {/* X-Axis Milestone Epochs (Bottom Row) */}
                  <text x={lossPadLeft} y="114" textAnchor="start" className="text-[7px] font-mono font-bold fill-slate-400 select-none">0 Ep</text>
                  <text x="103" y="114" textAnchor="middle" className="text-[7px] font-mono font-bold fill-slate-400 select-none">250 Ep</text>
                  <text x="188" y="114" textAnchor="middle" className="text-[7px] font-mono font-bold fill-slate-400 select-none">500 Ep</text>
                  <text x="274" y="114" textAnchor="middle" className="text-[7px] font-mono font-bold fill-slate-400 select-none">750 Ep</text>
                  <text x={lossPadRight} y="114" textAnchor="end" className="text-[7px] font-mono font-bold fill-slate-400 select-none">1,000 Ep</text>

                  {/* Validation Loss Curve with Refined Soft Fill */}
                  <path
                    d={areaValLoss}
                    fill="url(#lossGradGreenRefined)"
                  />
                  {/* Soft glow under Validation Loss */}
                  <path
                    d={splineValLoss}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="5.5"
                    strokeOpacity="0.22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={splineValLoss}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Training Loss Curve (Indigo Dashed Smooth Spline) */}
                  <path
                    d={splineTrainLoss}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="1.8"
                    strokeDasharray="3.5 3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Live Endpoint Markers */}
                  {coordsValLoss.length > 0 && (
                    <g>
                      <circle
                        cx={coordsValLoss[coordsValLoss.length - 1].x}
                        cy={coordsValLoss[coordsValLoss.length - 1].y}
                        r="3.5"
                        fill="#059669"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx={coordsTrainLoss[coordsTrainLoss.length - 1].x}
                        cy={coordsTrainLoss[coordsTrainLoss.length - 1].y}
                        r="3"
                        fill="#6366f1"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}

                  {/* Hover crosshair and points */}
                  {hoveredLossPoint && (
                    <g>
                      <line
                        x1={hoveredLossPoint.x}
                        y1={lossPadTop - 4}
                        x2={hoveredLossPoint.x}
                        y2={lossPadBottom + 2}
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeDasharray="2.5 2.5"
                        opacity="0.85"
                      />
                      <circle cx={hoveredLossPoint.x} cy={hoveredLossPoint.yVal} r="4" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                      <circle cx={hoveredLossPoint.x} cy={hoveredLossPoint.yTrain} r="3.5" fill="#6366f1" stroke="#ffffff" strokeWidth="1.5" />
                    </g>
                  )}
                </svg>

                {/* Interactive Tooltip Card for Loss Curve */}
                {hoveredLossPoint && (
                  <div
                    className="absolute pointer-events-none top-2 z-20 px-2 py-1 rounded-xl bg-slate-900/95 text-white border border-slate-700 shadow-xl backdrop-blur-md text-[7.5px] transform -translate-x-1/2 font-mono"
                    style={{ left: `${Math.min(320, Math.max(70, hoveredLossPoint.x)) / 4.2}%` }}
                  >
                    <div className="font-bold text-slate-400 border-b border-slate-800 pb-0.5 mb-0.5">
                      EPOCH: {hoveredLossPoint.epoch} / 1000
                    </div>
                    <div className="flex items-center justify-between gap-2.5">
                      <span className="text-emerald-400 font-bold">Val Loss:</span>
                      <span className="font-black text-emerald-300">{hoveredLossPoint.valLoss.toFixed(3)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2.5">
                      <span className="text-indigo-400 font-bold">Train Loss:</span>
                      <span className="font-bold text-indigo-300">{hoveredLossPoint.trainLoss.toFixed(3)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 4 Bottom Metric Pills (Matching Left Card Structure) */}
              <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-200/80 text-[8.5px] text-center font-mono shrink-0">
                <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[7px] text-slate-400 block uppercase">EPOCHS</span>
                  <span className="font-extrabold text-slate-800">1,000 / 1K</span>
                </div>
                <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[7px] text-slate-400 block uppercase">COSINE LR</span>
                  <span className="font-extrabold text-indigo-600">1e-5</span>
                </div>
                <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[7px] text-slate-400 block uppercase">THROUGHPUT</span>
                  <span className="font-extrabold text-slate-800">142 PFLOPS</span>
                </div>
                <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80 shadow-2xs">
                  <span className="text-[7px] text-emerald-700 block uppercase">VERIF</span>
                  <span className="font-extrabold text-emerald-800">PASS</span>
                </div>
              </div>
            </>
          ) : (
            /* TAB 2: GPU H100 Nodes Telemetry */
            <>
              <div className="flex-1 min-h-[85px] w-full overflow-y-auto custom-scrollbar my-0.5 space-y-1 pr-0.5">
                {GPU_CLUSTER_NODES.map((node) => (
                  <div
                    key={node.nodeId}
                    className="p-1 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between text-[7.5px]"
                  >
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-black text-slate-800">{node.name}</span>
                        <span className="text-[6.5px] text-indigo-700 font-bold bg-indigo-50 px-1 rounded">
                          {node.gpuCount}x H100
                        </span>
                      </div>
                      <span className="text-[6.5px] text-slate-400 block truncate max-w-[170px]">
                        {node.activeTask}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-emerald-700 block">{node.loadPct}% LOAD</span>
                      <span className="text-[6.5px] text-slate-500 font-bold">{node.tempC}°C • {node.throughput}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 4 Bottom Metric Pills for GPU Nodes */}
              <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-200/80 text-[8.5px] text-center font-mono shrink-0">
                <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[7px] text-slate-400 block uppercase">NODES</span>
                  <span className="font-extrabold text-slate-800">4 ACTIVE</span>
                </div>
                <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[7px] text-slate-400 block uppercase">MEAN TEMP</span>
                  <span className="font-extrabold text-slate-800">59.8°C</span>
                </div>
                <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[7px] text-slate-400 block uppercase">AVG LOAD</span>
                  <span className="font-extrabold text-emerald-700">95.2%</span>
                </div>
                <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80 shadow-2xs">
                  <span className="text-[7px] text-emerald-700 block uppercase">HEALTH</span>
                  <span className="font-extrabold text-emerald-800">OPTIMAL</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LOWER AREA: PIPELINE TABLE, FACTOR RADAR, LIVE SIGNALS & SOR */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-2 sm:gap-2.5 flex-1 min-h-0 pb-0">
        {/* Left (5 Columns): GENESIS INCUBATED ALGORITHMIC PIPELINE Table */}
        <div className={`xl:col-span-5 ${glassCard} flex flex-col justify-between h-full min-h-0 overflow-hidden p-2.5 sm:p-3`}>
          <div className="flex-1 min-h-0 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-1 pb-1 border-b border-slate-200/80 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-800">
                  GENESIS INCUBATED ALGORITHMIC PIPELINE
                </span>
                <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200 font-mono">
                  {filteredModels.length} MODELS
                </span>
              </div>

              {/* Stage Filter Selector & Register Button */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[7.5px]">
                  {['ALL', 'LIVE PRODUCTION', 'PAPER ALPHA', 'BACKTEST STRESS', 'RESEARCH'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStage(st)}
                      className={`px-1.5 py-0.5 rounded-lg font-black transition-all cursor-pointer ${
                        selectedStage === st
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st === 'ALL' ? 'SEMUA' : st.replace('LIVE ', '')}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsNewModelModalOpen(true)}
                  className="px-2 py-0.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[7.5px] uppercase tracking-wider shadow-xs flex items-center gap-1 cursor-pointer transition-all"
                  title="Daftarkan model baru ke pipeline"
                >
                  <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                  <span className="hidden sm:inline">DAFTARKAN MODEL</span>
                </button>
              </div>
            </div>

            {/* Table of Models - Flex-1 with overflow-y-auto */}
            <div className="flex-1 min-h-[90px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left text-[9px] font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-[7.5px] font-black uppercase text-slate-400">
                    <th className="py-1 px-1">Model & Arsitektur</th>
                    <th className="py-1 px-1">Aset</th>
                    <th className="py-1 px-1 text-right">Sharpe / Sortino</th>
                    <th className="py-1 px-1 text-right">Win Rate</th>
                    <th className="py-1 px-1 text-right">Backtest PnL</th>
                    <th className="py-1 px-1 text-center">Stage</th>
                    <th className="py-1 px-1 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredModels.map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => {
                        setSelectedModel(m);
                        setIsModalOpen(true);
                      }}
                      className="hover:bg-indigo-50/40 cursor-pointer transition-colors"
                    >
                      <td className="py-1 px-1">
                        <div className="font-black text-slate-800">{m.name}</div>
                        <span className="text-[7.5px] text-slate-400 block leading-none truncate max-w-[150px]">
                          {m.architecture}
                        </span>
                      </td>
                      <td className="py-1 px-1">
                        <span className="text-[7.5px] font-black px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200">
                          {m.assetClass}
                        </span>
                      </td>
                      <td className="py-1 px-1 text-right font-black text-indigo-700">
                        {m.sharpeRatio} <span className="text-[7.5px] text-slate-400 font-normal">/ {m.sortinoRatio}</span>
                      </td>
                      <td className="py-1 px-1 text-right text-slate-700 font-bold">{m.winRate}</td>
                      <td className="py-1 px-1 text-right font-black text-emerald-600">{m.backtestPnl}</td>
                      <td className="py-1 px-1 text-center">
                        <span
                          className={`inline-block px-1.5 py-0.2 rounded text-[7px] font-black border ${
                            m.stage === 'LIVE PRODUCTION'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : m.stage === 'PAPER ALPHA'
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : 'bg-amber-50 text-amber-700 border-amber-300'
                          }`}
                        >
                          {m.stage}
                        </span>
                      </td>
                      <td className="py-1 px-1 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedModel(m);
                            setIsModalOpen(true);
                          }}
                          className="px-2 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 font-bold text-[7.5px] cursor-pointer"
                        >
                          SIMULASI
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[8px] text-slate-500 mt-0.5 shrink-0">
            <span>KLIK MODEL UNTUK SIMULASI STRES</span>
            <span className="text-emerald-700 font-bold">Total PnL: +$1,852,000.00</span>
          </div>
        </div>

        {/* Center (4 Columns): NEW BLOCK - QUANT FACTOR ATTRIBUTION & RISK RADAR */}
        <div className={`xl:col-span-4 ${glassCard} flex flex-col justify-between h-full min-h-0 overflow-hidden p-2.5 sm:p-3`}>
          {/* Header */}
          <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="text-[10px] font-black uppercase text-slate-800">
                FACTOR ATTRIBUTION & RISK RADAR
              </span>
            </div>
            <span className="text-[7.5px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200 font-mono">
              FAMA-FRENCH 5-F
            </span>
          </div>

          {/* 5 Factor Exposure Meters */}
          <div className="flex-1 min-h-[90px] flex flex-col justify-between py-0.5 space-y-1 font-mono text-[8px]">
            {/* Factor 1: Market Beta */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Market Beta (MKT-RF)
                </span>
                <span className="font-black text-emerald-700">0.02x • NEUTRAL</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden relative">
                <div className="absolute left-1/2 w-0.5 h-full bg-slate-300" />
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '4%', marginLeft: '50%' }} />
              </div>
            </div>

            {/* Factor 2: Momentum Tilt */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Momentum Alpha (WML)
                </span>
                <span className="font-black text-indigo-700">+1.42x • OVERWEIGHT</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden relative">
                <div className="absolute left-1/2 w-0.5 h-full bg-slate-300" />
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '38%', marginLeft: '50%' }} />
              </div>
            </div>

            {/* Factor 3: Carry / Yield Arbitrage */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  Carry & Interbank Spread
                </span>
                <span className="font-black text-sky-700">+0.85x • POSITIVE</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden relative">
                <div className="absolute left-1/2 w-0.5 h-full bg-slate-300" />
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '26%', marginLeft: '50%' }} />
              </div>
            </div>

            {/* Factor 4: Volatility Skew Tilt */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Volatility Skew (VOL-SVI)
                </span>
                <span className="font-black text-amber-700">-0.40x • GAMMA HEDGED</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden relative">
                <div className="absolute left-1/2 w-0.5 h-full bg-slate-300" />
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '16%', marginLeft: '34%' }} />
              </div>
            </div>

            {/* Factor 5: Liquidity Premium */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Liquidity Maker Premium
                </span>
                <span className="font-black text-teal-700">+0.65x • REBATE CAPTURE</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden relative">
                <div className="absolute left-1/2 w-0.5 h-full bg-slate-300" />
                <div className="h-full bg-teal-500 rounded-full" style={{ width: '22%', marginLeft: '50%' }} />
              </div>
            </div>
          </div>

          {/* Bottom Dual KPI Pill & Action Button */}
          <div className="pt-1.5 border-t border-slate-200/80 flex items-center justify-between gap-1 text-[8px] font-mono shrink-0">
            <div>
              <span className="text-slate-400 block text-[7px] uppercase">CAPITAL ACTIVE</span>
              <span className="font-black text-slate-800">$14.25M / 95%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[7px] uppercase">CASH BUFFER</span>
              <span className="font-black text-emerald-600">$750K (5%)</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAuditModalOpen(true)}
              className="px-2 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-[7.5px] cursor-pointer transition-all"
            >
              STRESS MATRIX
            </button>
          </div>
        </div>

        {/* Right (3 Columns, Spanning 2 Rows to Bottom Edge): LIVE AI SIGNAL STREAM Panel */}
        <div className={`xl:col-span-3 xl:row-span-2 ${glassCard} flex flex-col justify-between h-full min-h-0 overflow-hidden p-2.5 sm:p-3`}>
          <div className="flex-1 min-h-0 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-200/80 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[10px] font-black uppercase text-slate-800">
                  LIVE AI SIGNAL STREAM
                </span>
              </div>
              <span className="text-[7.5px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                REAL-TIME
              </span>
            </div>

            {/* Stream List - Flex-1 with overflow-y-auto */}
            <div className="flex-1 min-h-[90px] space-y-1 overflow-y-auto custom-scrollbar pr-0.5">
              {liveSignals.map((sig) => (
                <div
                  key={sig.id}
                  className="p-1.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#edf3fa] border border-slate-200/90 shadow-2xs flex items-center justify-between text-[8px]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-[7px] font-black px-1 rounded ${
                          sig.action === 'BUY'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sig.action === 'SELL'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {sig.action}
                      </span>
                      <span className="font-black text-slate-900">{sig.symbol}</span>
                      <span className="text-[7px] text-slate-400 font-mono">@{sig.price}</span>
                      <span className="text-[6px] font-black px-1 py-0.2 rounded bg-slate-100 text-slate-600">
                        {sig.symbol.includes('BTC') ? 'CME Globex • 340μs' : sig.symbol.includes('SOL') ? 'Binance VIP • 280μs' : 'EBS Spot • 420μs'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[7px] text-slate-500 truncate max-w-[140px]">
                        {sig.modelName}
                      </span>
                      <span className="text-[6px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded border border-emerald-200">
                        AUTO-MATCHED
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-black text-emerald-600 block leading-tight">
                      +{sig.expectedAlphaBps} bps
                    </span>
                    <span className="text-[7px] text-slate-400 block">{sig.confidence}% conf</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[7.5px] text-slate-400 mt-0.5 shrink-0">
            <span>THROUGHPUT: 142 SIGNAL/S</span>
            <span className="text-indigo-600 font-bold">LATENSI: 480μs</span>
          </div>
        </div>

        {/* Row 2 Left (5 Columns): NEW CHART - ORDER FLOW MICROSTRUCTURE & SLIPPAGE DYNAMICS */}
        <div className={`xl:col-span-5 ${glassCard} flex flex-col justify-between h-full min-h-0 overflow-hidden p-2.5 sm:p-3`}>
          {/* Header */}
          <div className="flex items-center justify-between gap-1 pb-1 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <Zap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="text-[10px] xl:text-[11px] font-black uppercase text-slate-800 tracking-wider truncate">
                ORDER FLOW MICROSTRUCTURE & SLIPPAGE DYNAMICS
              </span>
            </div>
            <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200 shrink-0 font-mono">
              OFI ALPHA • SUB-BPS IMPACT
            </span>
          </div>

          {/* Clean Legend Bar */}
          <div className="flex items-center justify-between text-[7.5px] font-bold text-slate-600 py-0.5 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="flex items-center gap-1 text-indigo-700 font-extrabold">
                <span className="w-2.5 h-1 rounded-full bg-indigo-600 shadow-2xs" /> Smart Routed Optimal (+0.18 bps)
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-extrabold">
                <span className="w-2.5 h-1 rounded-full bg-emerald-500 shadow-2xs" /> Passive Rebate (-0.12 bps)
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-2.5 h-0.5 border-t border-dashed border-amber-500" /> Market Impact (+2.20 bps)
              </span>
              <span className="flex items-center gap-1 text-rose-600">
                <span className="w-2.5 h-0.5 border-t border-dotted border-rose-500" /> 99% Tail (+3.05 bps)
              </span>
            </div>
            <span className="text-emerald-700 font-mono text-[7px] font-black hidden sm:inline">ALFA PRESERVED: +$84,200</span>
          </div>

          {/* Dynamic SVG Container inside subtle glass instrument bezel */}
          <div className="flex-1 min-h-[110px] w-full relative overflow-hidden my-1 rounded-xl bg-gradient-to-b from-white/95 via-slate-50/70 to-indigo-50/20 border border-slate-200/90 p-1.5 shadow-2xs">
            <svg
              viewBox="0 0 620 125"
              preserveAspectRatio="none"
              className="w-full h-full cursor-crosshair"
              style={{ shapeRendering: 'geometricPrecision' }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width;
                const count = coordsOfiOptimal.length;
                const idx = Math.min(count - 1, Math.max(0, Math.round(relX * (count - 1))));
                setHoveredOfiPoint({
                  x: coordsOfiOptimal[idx].x,
                  yOptimal: coordsOfiOptimal[idx].y,
                  yPassive: coordsOfiPassive[idx].y,
                  yBenchmark: coordsOfiBenchmark[idx].y,
                  yTail: coordsOfiTail[idx].y,
                  ticketSize: ofiMilestones[idx].ticketSize,
                  optimalBps: ofiMilestones[idx].optimalBps,
                  passiveBps: ofiMilestones[idx].passiveBps,
                  benchmarkBps: ofiMilestones[idx].benchmarkBps,
                  tailBps: ofiMilestones[idx].tailBps,
                  savedDollars: ofiMilestones[idx].savedDollars,
                  route: ofiMilestones[idx].route,
                });
              }}
              onMouseLeave={() => setHoveredOfiPoint(null)}
            >
              <defs>
                <linearGradient id="ofiOptimalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.20" />
                  <stop offset="60%" stopColor="#4f46e5" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Reference Gridlines */}
              <line x1={ofiPadLeft} y1="16" x2={ofiPadRight} y2="16" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
              <line x1={ofiPadLeft} y1="48" x2={ofiPadRight} y2="48" stroke="#e2e8f0" strokeDasharray="3 3" opacity="0.6" />
              <line x1={ofiPadLeft} y1={ofiPadBottom} x2={ofiPadRight} y2={ofiPadBottom} stroke="#cbd5e1" strokeWidth="1.2" opacity="0.85" />
              <line x1={ofiPadLeft} y1={ofiPadLowest} x2={ofiPadRight} y2={ofiPadLowest} stroke="#a7f3d0" strokeDasharray="3 3" opacity="0.75" />

              {/* Y-Axis Value Labels (Right Column) */}
              <text x="566" y="19" className="text-[7.5px] font-mono font-bold fill-rose-500 select-none">+6.0 bps</text>
              <text x="566" y="51" className="text-[7px] font-mono font-medium fill-slate-400 select-none">+3.0 bps</text>
              <text x="566" y="91" className="text-[7.5px] font-mono font-bold fill-slate-500 select-none">0.0 bps</text>
              <text x="566" y="113" className="text-[7.5px] font-mono font-bold fill-emerald-600 select-none">-0.5 bps</text>

              {/* X-Axis Milestone Ticket Sizes (Bottom Row) */}
              {ofiMilestones.map((ms, idx) => {
                const xCoord = ofiPadLeft + (idx / (ofiMilestones.length - 1)) * ofiPlotW;
                return (
                  <text
                    key={idx}
                    x={xCoord}
                    y="122"
                    textAnchor={idx === 0 ? 'start' : idx === ofiMilestones.length - 1 ? 'end' : 'middle'}
                    className="text-[7px] font-mono font-bold fill-slate-400 select-none"
                  >
                    {ms.ticketSize}
                  </text>
                );
              })}

              {/* 99% Tail Slippage (Dotted Rose) */}
              <path
                d={splineOfiTail}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="1.6"
                strokeDasharray="2.5 3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Unhedged Raw Market Impact (Dashed Amber) */}
              <path
                d={splineOfiBenchmark}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.8"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Passive Liquidity Capture Curve (Solid Emerald) */}
              <path
                d={splineOfiPassive}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Smart Routed Optimal Execution (Smooth Indigo with Soft Glow & Gradient Area) */}
              <path
                d={areaOfiOptimal}
                fill="url(#ofiOptimalGrad)"
              />
              <path
                d={splineOfiOptimal}
                fill="none"
                stroke="#4f46e5"
                strokeWidth="5.5"
                strokeOpacity="0.20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={splineOfiOptimal}
                fill="none"
                stroke="#312e81"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Live Endpoints */}
              {coordsOfiOptimal.length > 0 && (
                <g>
                  <circle
                    cx={coordsOfiOptimal[coordsOfiOptimal.length - 1].x}
                    cy={coordsOfiOptimal[coordsOfiOptimal.length - 1].y}
                    r="3.5"
                    fill="#312e81"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={coordsOfiOptimal[coordsOfiOptimal.length - 1].x}
                    cy={coordsOfiOptimal[coordsOfiOptimal.length - 1].y}
                    r="6.5"
                    fill="#4338ca"
                    opacity="0.3"
                    className="animate-ping"
                  />
                  <circle
                    cx={coordsOfiPassive[coordsOfiPassive.length - 1].x}
                    cy={coordsOfiPassive[coordsOfiPassive.length - 1].y}
                    r="3"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* Interactive Crosshair & Indicator Points */}
              {hoveredOfiPoint && (
                <g>
                  <line
                    x1={hoveredOfiPoint.x}
                    y1={ofiPadTop - 4}
                    x2={hoveredOfiPoint.x}
                    y2={ofiPadLowest + 2}
                    stroke="#4f46e5"
                    strokeWidth="1.5"
                    strokeDasharray="2.5 2.5"
                    opacity="0.85"
                  />
                  <circle cx={hoveredOfiPoint.x} cy={hoveredOfiPoint.yOptimal} r="4" fill="#312e81" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={hoveredOfiPoint.x} cy={hoveredOfiPoint.yPassive} r="3" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={hoveredOfiPoint.x} cy={hoveredOfiPoint.yBenchmark} r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={hoveredOfiPoint.x} cy={hoveredOfiPoint.yTail} r="3" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              )}
            </svg>

            {/* Interactive Tooltip Card for OFI Slippage */}
            {hoveredOfiPoint && (
              <div
                className="absolute pointer-events-none top-2 z-20 px-2 py-1.5 rounded-xl bg-slate-900/95 text-white border border-slate-700 shadow-xl backdrop-blur-md text-[7.5px] transform -translate-x-1/2 font-mono"
                style={{ left: `${Math.min(500, Math.max(90, hoveredOfiPoint.x)) / 6.2}%` }}
              >
                <div className="font-bold text-slate-400 border-b border-slate-800 pb-0.5 mb-0.5">
                  TICKET SIZE: {hoveredOfiPoint.ticketSize} • {hoveredOfiPoint.route}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-indigo-400 font-bold">Smart Routed:</span>
                  <span className="font-black text-emerald-400">+{hoveredOfiPoint.optimalBps.toFixed(2)} bps</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-emerald-400 font-bold">Passive Rebate:</span>
                  <span className="font-bold text-emerald-300">{hoveredOfiPoint.passiveBps.toFixed(2)} bps</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-amber-400 font-bold">Market Impact:</span>
                  <span className="font-bold text-amber-300">+{hoveredOfiPoint.benchmarkBps.toFixed(2)} bps</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-rose-400 font-bold">99% Tail:</span>
                  <span className="font-bold text-rose-300">+{hoveredOfiPoint.tailBps.toFixed(2)} bps</span>
                </div>
                <div className="pt-0.5 mt-0.5 border-t border-slate-800 text-[7px] text-emerald-300 font-extrabold text-right">
                  Alpha Preserved: +{hoveredOfiPoint.savedDollars}
                </div>
              </div>
            )}
          </div>

          {/* 4 Bottom Metric Pills */}
          <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-200/80 text-[8.5px] text-center font-mono shrink-0">
            <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[7px] text-slate-400 block uppercase">MEAN SLIPPAGE</span>
              <span className="font-extrabold text-emerald-600">-0.12 bps</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[7px] text-slate-400 block uppercase">MAKER REBATE</span>
              <span className="font-extrabold text-slate-800">84.2%</span>
            </div>
            <div className="p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[7px] text-slate-400 block uppercase">TICK SPEED</span>
              <span className="font-extrabold text-indigo-700">280 μs</span>
            </div>
            <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80 shadow-2xs">
              <span className="text-[7px] text-emerald-700 block uppercase">ALPHA SAVED</span>
              <span className="font-extrabold text-emerald-800">+$84.2K</span>
            </div>
          </div>
        </div>

        {/* Row 2 Center (4 Columns): NEW BLOCK - AUTONOMOUS SMART ORDER ROUTING (SOR) GATEWAY */}
        <div className={`xl:col-span-4 ${glassCard} flex flex-col justify-between h-full min-h-0 overflow-hidden p-2.5 sm:p-3`}>
          {/* Header */}
          <div className="flex items-center justify-between gap-1 pb-1 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <Radio className="w-3.5 h-3.5 text-indigo-600 shrink-0 animate-pulse" />
              <span className="text-[10px] xl:text-[11px] font-black uppercase text-slate-800 tracking-wider truncate">
                AUTONOMOUS SMART ORDER ROUTER (SOR) GATEWAY
              </span>
            </div>
            <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded border shrink-0 font-mono ${
              killSwitchActive
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {killSwitchActive ? 'HALT SAFE-STOP' : 'FIX 4.4 / ITCH ACTIVE'}
            </span>
          </div>

          {/* 4 Real-time Venue Latency Nodes */}
          <div className="grid grid-cols-2 gap-1.5 my-1">
            <div className="p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-[8px]">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-800">CME GLOBEX DIRECT</span>
                <span className="text-[7px] font-black text-emerald-600">340 μs</span>
              </div>
              <div className="flex items-center justify-between text-[7px] text-slate-400 mt-0.5">
                <span>Aurora DC3 • FIX 4.4</span>
                <span className="font-bold text-slate-700">100% HEALTH</span>
              </div>
            </div>

            <div className="p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-[8px]">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-800">BINANCE VIP INST.</span>
                <span className="text-[7px] font-black text-emerald-600">280 μs</span>
              </div>
              <div className="flex items-center justify-between text-[7px] text-slate-400 mt-0.5">
                <span>Tokyo TY3 • VIP-9 ECN</span>
                <span className="font-bold text-slate-700">100% HEALTH</span>
              </div>
            </div>

            <div className="p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-[8px]">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-800">EBS SPOT FX PRIMARY</span>
                <span className="text-[7px] font-black text-emerald-600">420 μs</span>
              </div>
              <div className="flex items-center justify-between text-[7px] text-slate-400 mt-0.5">
                <span>London LD4 • Top-of-Book</span>
                <span className="font-bold text-slate-700">100% HEALTH</span>
              </div>
            </div>

            <div className="p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-[8px]">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-800">COINBASE PRIME OTC</span>
                <span className="text-[7px] font-black text-emerald-600">510 μs</span>
              </div>
              <div className="flex items-center justify-between text-[7px] text-slate-400 mt-0.5">
                <span>New York NY4 • Cold Vault</span>
                <span className="font-bold text-slate-700">100% HEALTH</span>
              </div>
            </div>
          </div>

          {/* Routing Algorithm Distribution Meter */}
          <div className="my-1 p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-[8px]">
              <span className="font-black text-slate-700">EXECUTION ALGO ROUTING MIX</span>
              <span className="text-[7.5px] font-bold text-indigo-700">1,420 ORDERS/SEC</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 flex overflow-hidden">
              <div className="h-full bg-indigo-600" style={{ width: '34%' }} title="TWAP Adaptive 34%" />
              <div className="h-full bg-sky-500" style={{ width: '28%' }} title="POV Micro-Burst 28%" />
              <div className="h-full bg-emerald-500" style={{ width: '26%' }} title="Sniper Cross-Venue 26%" />
              <div className="h-full bg-amber-500" style={{ width: '12%' }} title="Dark Pool Stealth 12%" />
            </div>
            <div className="flex items-center justify-between text-[7px] font-bold pt-0.5 text-slate-500">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> TWAP 34%</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> POV 28%</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Sniper 26%</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Dark 12%</span>
            </div>
          </div>

          {/* Interactive Safety & Throttle Controls */}
          <div className="pt-1.5 border-t border-slate-200/80 flex items-center justify-between gap-1 text-[8px] font-mono shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-[7px] text-slate-400 uppercase">THROTTLE:</span>
              {(['NORMAL', 'DEFENSIVE', 'SHIELD'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSorThrottleMode(mode)}
                  className={`px-1.5 py-0.5 rounded text-[7px] font-black transition-all cursor-pointer ${
                    sorThrottleMode === mode
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setResyncSuccess(true);
                  setTimeout(() => setResyncSuccess(false), 2000);
                }}
                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[7.5px] cursor-pointer transition-all flex items-center gap-1"
                title="Sinkronisasi ulang koneksi FIX 4.4"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${resyncSuccess ? 'text-emerald-600 animate-spin' : ''}`} />
                {resyncSuccess ? 'SYNC OK' : 'RE-SYNC'}
              </button>

              <button
                type="button"
                onClick={() => setIsKillSwitchModalOpen(true)}
                className={`px-2.5 py-1 rounded-lg font-black text-[7.5px] uppercase tracking-wider shadow-xs cursor-pointer transition-all flex items-center gap-1 ${
                  killSwitchActive
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-rose-600 hover:bg-rose-700 text-white'
                }`}
              >
                <ShieldAlert className="w-3 h-3 stroke-[2.2]" />
                {killSwitchActive ? 'RESUME TRADING' : 'KILL-SWITCH'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DETAIL MODEL & MONTE CARLO SIMULATOR */}
      <GenesisModelDetailModal
        model={selectedModel}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedModel(null);
        }}
        onPromoteModel={handlePromoteModel}
      />

      {/* MODAL DAFTARKAN MODEL BARU */}
      <GenesisNewModelModal
        isOpen={isNewModelModalOpen}
        onClose={() => setIsNewModelModalOpen(false)}
        onAddModel={(newModel) => setModels((prev) => [newModel, ...prev])}
      />

      {/* MODAL QUANTITATIVE AUDIT DOSSIER */}
      <GenesisAuditDossierModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      {/* MODAL EMERGENCY KILL-SWITCH & SAFE-HALT */}
      <GenesisKillSwitchModal
        isOpen={isKillSwitchModalOpen}
        onClose={() => setIsKillSwitchModalOpen(false)}
        isActivated={killSwitchActive}
        onToggleKillSwitch={() => setKillSwitchActive((prev) => !prev)}
      />
    </div>
  );
};
