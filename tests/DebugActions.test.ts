import { describe, expect, it } from "vitest";
import { getDebugActionForKey } from "../src/game/DebugActions";

describe("DebugActions", () => {
  it("maps QA shortcut keys", () => {
    expect(getDebugActionForKey("n")).toBe("next-round");
    expect(getDebugActionForKey("b")).toBe("force-boss");
    expect(getDebugActionForKey("v")).toBe("force-victory");
    expect(getDebugActionForKey("f")).toBe("force-defeat");
  });

  it("ignores unrelated keys", () => {
    expect(getDebugActionForKey("x")).toBeUndefined();
  });
});
