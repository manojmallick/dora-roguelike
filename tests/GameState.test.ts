import { describe, expect, it } from "vitest";
import { GameState } from "../src/game/GameState";

describe("GameState", () => {
  it("starts in LOADING by default", () => {
    const state = new GameState();

    expect(state.getPhase()).toBe("LOADING");
  });

  it("changes phase and resets elapsed time", () => {
    const state = new GameState("MENU");

    state.update(2.5);
    state.setPhase("PLAYER_TURN");

    expect(state.getPhase()).toBe("PLAYER_TURN");
    expect(state.getElapsedSeconds()).toBe(0);
  });

  it("ignores negative frame deltas", () => {
    const state = new GameState();

    state.update(1);
    state.update(-10);

    expect(state.getElapsedSeconds()).toBe(1);
  });
});
