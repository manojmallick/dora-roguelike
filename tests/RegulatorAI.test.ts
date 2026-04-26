import { describe, expect, it } from "vitest";
import { RegulatorAI } from "../src/game/RegulatorAI";

describe("RegulatorAI", () => {
  it("provides 15 configured rounds", () => {
    const ai = new RegulatorAI();

    expect(ai.getTotalRounds()).toBe(15);
    expect(ai.getAttack(1)).toMatchObject({ round: 1, voice: "standard" });
    expect(ai.getAttack(15)).toMatchObject({ round: 15, voice: "grand" });
  });

  it("marks rounds 11 through 15 as boss rounds", () => {
    const ai = new RegulatorAI();

    expect(ai.isBossRound(10)).toBe(false);
    expect(ai.isBossRound(11)).toBe(true);
  });

  it("makes boss attacks hit multiple indicators", () => {
    const ai = new RegulatorAI();

    expect(ai.getAttack(13).targets.length).toBeGreaterThanOrEqual(2);
  });

  it("throws for unconfigured rounds", () => {
    const ai = new RegulatorAI();

    expect(() => ai.getAttack(16)).toThrow("No regulator attack configured");
  });
});
