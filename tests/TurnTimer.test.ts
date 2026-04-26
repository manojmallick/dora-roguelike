import { describe, expect, it } from "vitest";
import { TurnTimer } from "../src/game/TurnTimer";

describe("TurnTimer", () => {
  it("starts at the configured duration", () => {
    const timer = new TurnTimer(15);

    timer.start();

    expect(timer.getRemainingSeconds()).toBe(15);
  });

  it("counts down while running and clamps at zero", () => {
    const timer = new TurnTimer(15);

    timer.start();
    timer.update(4.5);
    timer.update(20);

    expect(timer.getRemainingSeconds()).toBe(0);
    expect(timer.isExpired()).toBe(true);
  });

  it("ignores negative deltas", () => {
    const timer = new TurnTimer(15);

    timer.start();
    timer.update(-2);

    expect(timer.getRemainingSeconds()).toBe(15);
  });

  it("prevents double resolution", () => {
    const timer = new TurnTimer(15);

    timer.start();

    expect(timer.resolve()).toBe(true);
    expect(timer.resolve()).toBe(false);
  });
});
