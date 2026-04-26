export type Phase =
  | "LOADING"
  | "TAP_TO_START"
  | "MENU"
  | "PLAYER_TURN"
  | "REGULATOR_TURN"
  | "BOSS_INTRO"
  | "BOSS_TURN"
  | "VICTORY"
  | "DEFEAT";

export class GameState {
  private phase: Phase;
  private elapsedSeconds = 0;

  constructor(initialPhase: Phase = "LOADING") {
    this.phase = initialPhase;
  }

  getPhase(): Phase {
    return this.phase;
  }

  setPhase(nextPhase: Phase): void {
    this.phase = nextPhase;
    this.elapsedSeconds = 0;
  }

  update(deltaSeconds: number): void {
    this.elapsedSeconds += Math.max(0, deltaSeconds);
  }

  getElapsedSeconds(): number {
    return this.elapsedSeconds;
  }
}
