import { describe, expect, it } from "vitest";
import { getCoopRoleLabel, parseCoopView, shouldShowAuditIntel, shouldShowCards } from "../src/game/CoopMode";

describe("CoopMode", () => {
  it("defaults to a solo combined view", () => {
    const view = parseCoopView("");

    expect(view).toEqual({ mode: "solo", role: "combined" });
    expect(shouldShowCards(view)).toBe(true);
    expect(shouldShowAuditIntel(view)).toBe(true);
  });

  it("supports a card-hand role for player one", () => {
    const view = parseCoopView("?mode=coop&role=cards");

    expect(shouldShowCards(view)).toBe(true);
    expect(shouldShowAuditIntel(view)).toBe(false);
    expect(getCoopRoleLabel(view)).toContain("PLAYER 1");
  });

  it("supports a board and regulator intent role for player two", () => {
    const view = parseCoopView("?mode=coop&role=board");

    expect(shouldShowCards(view)).toBe(false);
    expect(shouldShowAuditIntel(view)).toBe(true);
    expect(getCoopRoleLabel(view)).toContain("PLAYER 2");
  });
});
