// EMI plans are modelled as a pure function of price so the logic is
// independently testable and easy to swap for a real pricing endpoint
// later — nothing about it is tied to React or to any component.
export function computeEmiPlans(price, options = {}) {
  const { downPayment = 0, discount = 0, waiveFee = false } = options;
  const netFinancedAmount = Math.max(0, price - discount - downPayment);
  const tenures = [3, 6, 9, 12];

  return tenures.map((months) => {
    const rawConvenienceFee = months <= 3 ? 0 : Math.round(netFinancedAmount * 0.006 * (months / 3));
    const convenienceFee = waiveFee ? 0 : rawConvenienceFee;
    const totalPayable = netFinancedAmount + convenienceFee;
    const monthly = netFinancedAmount === 0 ? 0 : Math.ceil(totalPayable / months);

    // Standard credit card EMI benchmark (16% annual reducing rate) for comparison savings
    const monthlyRate = 0.16 / 12;
    const standardCardMonthly = netFinancedAmount === 0
      ? 0
      : (netFinancedAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    const standardTotalPayable = Math.round(standardCardMonthly * months);
    const estimatedSavings = Math.max(0, standardTotalPayable - totalPayable);

    return {
      months,
      monthly,
      convenienceFee,
      totalPayable,
      netFinancedAmount,
      downPayment,
      discount,
      zeroInterest: true,
      estimatedSavings,
    };
  });
}
