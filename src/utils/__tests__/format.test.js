import { describe, it, expect } from "vitest";
import { rupee, monthLabel } from "../format.js";

describe("format helpers", () => {
  it("formats Indian rupee currency correctly", () => {
    expect(rupee(125900)).toBe("₹1,25,900");
    expect(rupee(1499)).toBe("₹1,499");
    expect(rupee(0)).toBe("₹0");
  });

  it("generates month labels", () => {
    const label0 = monthLabel(0);
    const label1 = monthLabel(1);
    expect(typeof label0).toBe("string");
    expect(label0.length).toBeGreaterThan(3);
    expect(label0).not.toBe(label1);
  });
});
