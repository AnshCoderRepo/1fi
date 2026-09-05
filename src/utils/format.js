export const rupee = (n) => "\u20B9" + n.toLocaleString("en-IN");

export const monthLabel = (offset) =>
  new Date(2026, 9 + offset, 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
