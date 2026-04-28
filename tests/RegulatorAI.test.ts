import { describe, expect, it } from "vitest";
import { RegulatorAI } from "../src/game/RegulatorAI";

describe("RegulatorAI", () => {
  it("provides 15 configured rounds", () => {
    const ai = new RegulatorAI();

    expect(ai.getTotalRounds()).toBe(15);
    expect(ai.getAttack(1)).toMatchObject({ round: 1, voice: "standard" });
    expect(ai.getAttack(15)).toMatchObject({ round: 15, voice: "grand" });
  });

  it("provides Dutch text and audio ids for locale mode", () => {
    const ai = new RegulatorAI();
    const attack = ai.getAttack(9);

    expect(ai.getText(attack, "nl")).toContain("Artikel 28");
    expect(ai.getLineId(attack, "nl")).toBe("nl_dialogue_16_article_28");
    expect(ai.getText(attack, "en")).toContain("Article 28");
    expect(ai.getLineId(attack, "en")).toBe("dialogue_16_article_28");
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

  it("can swap rounds 11 through 15 to GDPR boss attacks", () => {
    const ai = new RegulatorAI();
    const attack = ai.getAttack(11, "gdpr");

    expect(attack.lineId).toBe("gdpr_boss_01_transparency");
    expect(attack.text).toContain("Data Protection Authority");
    expect(ai.getAttack(10, "gdpr").lineId).toBe("dialogue_18_reporting");
    expect(ai.getAttack(15, "gdpr").text).toContain("Article 83");
  });

  it("throws for unconfigured rounds", () => {
    const ai = new RegulatorAI();

    expect(() => ai.getAttack(16)).toThrow("No regulator attack configured");
  });
});
