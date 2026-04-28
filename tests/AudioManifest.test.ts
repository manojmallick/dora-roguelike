import { describe, expect, it } from "vitest";
import { getAudioManifest } from "../src/audio/elevenlabs";
import { RegulatorAI } from "../src/game/RegulatorAI";

describe("audio manifest", () => {
  it("contains every regulator attack dialogue line", () => {
    const manifestIds = new Set(getAudioManifest().map((asset) => asset.id));
    const attackIds = new RegulatorAI().getAttacks().map((attack) => attack.lineId);
    const dutchAttackIds = new RegulatorAI().getAttacks().map((attack) => attack.lineIdNl);
    const gdprAttackIds = new RegulatorAI().getAttacks("gdpr").map((attack) => attack.lineId);
    const dutchGdprAttackIds = new RegulatorAI().getAttacks("gdpr").map((attack) => attack.lineIdNl);
    const hardAttackIds = new RegulatorAI().getAttacks("dora", "hard").map((attack) => attack.lineId);
    const dutchHardAttackIds = new RegulatorAI().getAttacks("dora", "hard").map((attack) => attack.lineIdNl);

    expect(attackIds.every((lineId) => manifestIds.has(lineId))).toBe(true);
    expect(dutchAttackIds.every((lineId) => manifestIds.has(lineId))).toBe(true);
    expect(gdprAttackIds.every((lineId) => manifestIds.has(lineId))).toBe(true);
    expect(dutchGdprAttackIds.every((lineId) => manifestIds.has(lineId))).toBe(true);
    expect(hardAttackIds.every((lineId) => manifestIds.has(lineId))).toBe(true);
    expect(dutchHardAttackIds.every((lineId) => manifestIds.has(lineId))).toBe(true);
  });

  it("contains the legal counsel response line", () => {
    expect(getAudioManifest().some((asset) => asset.id === "lawyer_counsel")).toBe(true);
    expect(getAudioManifest().some((asset) => asset.id === "nl_lawyer_counsel")).toBe(true);
  });

  it("uses public mp3 paths for generated files", () => {
    expect(getAudioManifest().every((asset) => asset.src.startsWith("/audio/"))).toBe(true);
    expect(getAudioManifest().every((asset) => asset.src.endsWith(".mp3"))).toBe(true);
  });
});
