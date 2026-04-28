import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("submission assets", () => {
  it("includes a social cover image with the project and fine hook", () => {
    const coverPath = "public/cover-social.svg";
    const cover = readFileSync(coverPath, "utf8");

    expect(existsSync(coverPath)).toBe(true);
    expect(cover).toContain("DORA");
    expect(cover).toContain("EUR 10,000,000 FINE");
    expect(cover).toContain("ElevenLabs");
  });
});
