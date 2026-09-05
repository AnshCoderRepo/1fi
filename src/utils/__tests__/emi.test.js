import { describe, it, expect } from "vitest";
import { computeEmiPlans } from "../emi.js";

describe("computeEmiPlans", () => {
  it("computes 3, 6, 9, 12 month plans correctly", () => {
    const plans = computeEmiPlans(60000);
    expect(plans).toHaveLength(4);
    expect(plans.map((p) => p.months)).toEqual([3, 6, 9, 12]);
  });

  it("has zero convenience fee for 3 months tenure", () => {
    const plans = computeEmiPlans(60000);
    const threeMonth = plans.find((p) => p.months === 3);
    expect(threeMonth.convenienceFee).toBe(0);
    expect(threeMonth.totalPayable).toBe(60000);
    expect(threeMonth.monthly).toBe(20000);
  });

  it("handles down payment and reduces financed amount", () => {
    const plans = computeEmiPlans(60000, { downPayment: 10000 });
    const threeMonth = plans.find((p) => p.months === 3);
    expect(threeMonth.netFinancedAmount).toBe(50000);
    expect(threeMonth.monthly).toBe(Math.ceil(50000 / 3));
    expect(threeMonth.downPayment).toBe(10000);
  });

  it("handles discount coupon correctly", () => {
    const plans = computeEmiPlans(60000, { discount: 5000 });
    const threeMonth = plans.find((p) => p.months === 3);
    expect(threeMonth.netFinancedAmount).toBe(55000);
    expect(threeMonth.discount).toBe(5000);
  });

  it("waives convenience fee when waiveFee is true", () => {
    const plans = computeEmiPlans(60000, { waiveFee: true });
    const twelveMonth = plans.find((p) => p.months === 12);
    expect(twelveMonth.convenienceFee).toBe(0);
    expect(twelveMonth.totalPayable).toBe(60000);
  });

  it("calculates positive estimated interest savings vs 16% credit cards", () => {
    const plans = computeEmiPlans(120000);
    const twelveMonth = plans.find((p) => p.months === 12);
    expect(twelveMonth.estimatedSavings).toBeGreaterThan(0);
  });
});
