import { INDICATORS } from "../config";

export type Indicator = typeof INDICATORS[number];

export interface IndicatorState {
  id: Indicator;
  label: string;
  value: number;
  lastChangedAt: number;
}

export interface DamageTarget {
  indicator: Indicator;
  amount: number;
}

const LABELS: Record<Indicator, string> = {
  ictrisk: "ICT Risk",
  incidents: "Incidents",
  thirdparty: "Third-Party",
  testing: "Testing",
  reporting: "Reporting"
};

export class ComplianceBoard {
  private readonly indicators = new Map<Indicator, IndicatorState>();

  constructor() {
    for (const indicator of INDICATORS) {
      this.indicators.set(indicator, {
        id: indicator,
        label: LABELS[indicator],
        value: 100,
        lastChangedAt: 0
      });
    }
  }

  getAll(): IndicatorState[] {
    return INDICATORS.map((indicator) => ({ ...this.requireIndicator(indicator) }));
  }

  getValue(indicator: Indicator): number {
    return this.requireIndicator(indicator).value;
  }

  damage(indicator: Indicator, amount: number, changedAt = performance.now()): number {
    const state = this.requireIndicator(indicator);
    state.value = this.clamp(state.value - Math.max(0, amount));
    state.lastChangedAt = changedAt;
    return state.value;
  }

  restore(indicator: Indicator, amount: number, changedAt = performance.now()): number {
    const state = this.requireIndicator(indicator);
    state.value = this.clamp(state.value + Math.max(0, amount));
    state.lastChangedAt = changedAt;
    return state.value;
  }

  damageMany(targets: DamageTarget[], changedAt = performance.now()): void {
    for (const target of targets) {
      this.damage(target.indicator, target.amount, changedAt);
    }
  }

  getLowest(): IndicatorState {
    return this.getAll().reduce((lowest, current) => (
      current.value < lowest.value ? current : lowest
    ));
  }

  isFailed(): boolean {
    return this.getAll().some((indicator) => indicator.value <= 0);
  }

  private requireIndicator(indicator: Indicator): IndicatorState {
    const state = this.indicators.get(indicator);

    if (!state) {
      throw new Error(`Unknown compliance indicator: ${indicator}`);
    }

    return state;
  }

  private clamp(value: number): number {
    return Math.min(100, Math.max(0, Math.round(value)));
  }
}
