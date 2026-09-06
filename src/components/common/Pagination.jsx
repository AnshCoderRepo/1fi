import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { T } from "../../theme/tokens.js";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to show
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pt-5 pb-2 flex flex-col items-center gap-2.5">
      <p className="text-[11px] font-medium text-gray-500">
        Showing <span className="font-bold text-gray-800">{startItem}–{endItem}</span> of{" "}
        <span className="font-bold text-gray-800">{totalItems}</span> products
      </p>

      <div className="flex items-center gap-1.5">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-8 h-8 rounded-xl border bg-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95 shadow-xs"
          style={{ borderColor: T.line }}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} color={T.ink} />
        </button>

        {pageNumbers.map((num) => {
          const isActive = num === currentPage;
          return (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className="w-8 h-8 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-xs"
              style={{
                background: isActive ? T.purple700 : "#FFFFFF",
                color: isActive ? "#FFFFFF" : T.ink,
                border: `1px solid ${isActive ? T.purple700 : T.line}`,
              }}
            >
              {num}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-8 h-8 rounded-xl border bg-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95 shadow-xs"
          style={{ borderColor: T.line }}
          aria-label="Next page"
        >
          <ChevronRight size={16} color={T.ink} />
        </button>
      </div>
    </div>
  );
}
