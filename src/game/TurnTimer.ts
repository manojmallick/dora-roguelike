export class TurnTimer {
  private readonly durationSeconds: number;
  private remainingSeconds: number;
  private running = false;
  private resolved = false;

  constructor(durationSeconds: number) {
    this.durationSeconds = durationSeconds;
    this.remainingSeconds = durationSeconds;
  }

  start(): void {
    this.remainingSeconds = this.durationSeconds;
    this.running = true;
    this.resolved = false;
  }

  stop(): void {
    this.running = false;
  }

  update(deltaSeconds: number): void {
    if (!this.running || this.resolved) {
      return;
    }

    this.remainingSeconds = Math.max(0, this.remainingSeconds - Math.max(0, deltaSeconds));
  }

  resolve(): boolean {
    if (this.resolved) {
      return false;
    }

    this.resolved = true;
    this.running = false;
    return true;
  }

  isExpired(): boolean {
    return this.running && !this.resolved && this.remainingSeconds <= 0;
  }

  getRemainingSeconds(): number {
    return this.remainingSeconds;
  }
}
