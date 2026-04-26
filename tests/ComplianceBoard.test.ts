import { describe, expect, it } from "vitest";
import { ComplianceBoard } from "../src/game/ComplianceBoard";

describe("ComplianceBoard", () => {
  it("starts every indicator at 100", () => {
    const board = new ComplianceBoard();

    expect(board.getAll().map((indicator) => indicator.value)).toEqual([100, 100, 100, 100, 100]);
  });

  it("applies damage and clamps at zero", () => {
    const board = new ComplianceBoard();

    expect(board.damage("ictrisk", 30)).toBe(70);
    expect(board.damage("ictrisk", 200)).toBe(0);
    expect(board.isFailed()).toBe(true);
  });

  it("restores indicators and clamps at 100", () => {
    const board = new ComplianceBoard();

    board.damage("thirdparty", 80);

    expect(board.restore("thirdparty", 30)).toBe(50);
    expect(board.restore("thirdparty", 999)).toBe(100);
  });

  it("damages multiple indicators and reports the lowest", () => {
    const board = new ComplianceBoard();

    board.damageMany([
      { indicator: "incidents", amount: 15 },
      { indicator: "reporting", amount: 45 }
    ]);

    expect(board.getLowest()).toMatchObject({ id: "reporting", value: 55 });
  });

  it("ignores negative damage and restore amounts", () => {
    const board = new ComplianceBoard();

    expect(board.damage("testing", -40)).toBe(100);
    expect(board.restore("testing", -40)).toBe(100);
  });
});
