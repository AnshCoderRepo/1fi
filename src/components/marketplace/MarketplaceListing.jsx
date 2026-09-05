import React, { useState, useEffect, useCallback, useMemo } from "react";
import PromoBanner from "./PromoBanner.jsx";
import CreditLimitBanner from "./CreditLimitBanner.jsx";
import SearchBar from "./SearchBar.jsx";
import BrandStrip from "./BrandStrip.jsx";
import CategoryChips from "./CategoryChips.jsx";
import SortDropdown from "./SortDropdown.jsx";
import ProductCard from "./ProductCard.jsx";
import SkeletonCard from "../common/SkeletonCard.jsx";
import ErrorState from "../common/ErrorState.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { fetchProducts, armNextRequestToFail } from "../../services/api.js";

export default function MarketplaceListing({ onOpenProduct, wishlistedIds = [], onToggleWishlist }) {
  const [category, setCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const load = useCallback(async (cat) => {
    setStatus("loading");
    try {
      const data = await fetchProducts(cat);
      setProducts(data);
      setStatus("ready");
    } catch (e) {
      setErrorMsg(e.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load(category);
  }, [category, load]);

  // Derived filtered and sorted products
  const displayedProducts = useMemo(() => {
    let result = [...products];

    if (selectedBrand) {
      const sb = selectedBrand.toLowerCase();
      result = result.filter(
        (p) => (p.brand && p.brand.toLowerCase().includes(sb)) || p.name.toLowerCase().includes(sb)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price)));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Math.min(...b.variants.map((v) => v.price)) - Math.min(...a.variants.map((v) => v.price)));
    } else if (sortBy === "emi-asc") {
      result.sort((a, b) => Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price)));
    }

    return result;
  }, [products, selectedBrand, searchQuery, sortBy]);

  return (
    <div className="pb-8">
      <CreditLimitBanner limit={150000} available={150000} />
      <PromoBanner />
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery("")}
      />
      <BrandStrip
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
      />
      <div className="pt-2">
        <CategoryChips active={category} onSelect={setCategory} />
      </div>

      <SortDropdown value={sortBy} onChange={setSortBy} />

      <div className="px-4 pt-2">
        {status === "loading" && (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {status === "error" && <ErrorState message={errorMsg} onRetry={() => load(category)} />}
        {status === "ready" && displayedProducts.length === 0 && (
          <EmptyState
            label={
              searchQuery || selectedBrand
                ? "No products matched your search or brand filters."
                : "No products in this category yet."
            }
          />
        )}
        {status === "ready" && displayedProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {displayedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpen={onOpenProduct}
                isWishlisted={wishlistedIds.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dev affordance for reviewers to exercise the error state on demand */}
      <div className="px-4 pt-6 text-center">
        <button
          onClick={() => { armNextRequestToFail(); load(category); }}
          className="text-[11px] font-medium underline text-gray-500 hover:text-purple-700"
        >
          Simulate network error (for review)
        </button>
      </div>
    </div>
  );
}
