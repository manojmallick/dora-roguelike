import { describe, expect, it } from "vitest";
import { COLORS } from "../src/config";
import { getRegulatorAccent } from "../src/ui/RegulatorRenderer";

describe("RegulatorRenderer", () => {
  it("uses EU blue for the standard regulator", () => {
    expect(getRegulatorAccent("standard")).toBe(COLORS.euBlue);
  });

  it("uses danger red for the grand regulator", () => {
    expect(getRegulatorAccent("grand")).toBe(COLORS.dangerRed);
  });
});
