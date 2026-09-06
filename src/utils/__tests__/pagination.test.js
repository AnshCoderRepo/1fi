import { describe, it, expect } from "vitest";

describe("Pagination logic", () => {
  it("calculates total pages correctly", () => {
    const totalItems = 38;
    const pageSize = 6;
    const totalPages = Math.ceil(totalItems / pageSize);
    expect(totalPages).toBe(7);
  });

  it("calculates slice bounds for page 1", () => {
    const pageSize = 6;
    const page = 1;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    expect(start).toBe(0);
    expect(end).toBe(6);
  });

  it("calculates slice bounds for page 2", () => {
    const pageSize = 6;
    const page = 2;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    expect(start).toBe(6);
    expect(end).toBe(12);
  });

  it("handles empty items without division by zero errors", () => {
    const totalItems = 0;
    const pageSize = 6;
    const totalPages = Math.ceil(totalItems / pageSize);
    expect(totalPages).toBe(0);
  });
});
