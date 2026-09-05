import React from "react";
import { Heart } from "lucide-react";
import ProductImage from "../common/ProductImage.jsx";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";
import { computeEmiPlans } from "../../utils/emi.js";

export default function ProductCard({ product, onOpen, isWishlisted, onToggleWishlist }) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const cheapestMonthly = Math.min(...computeEmiPlans(minPrice).map((p) => p.monthly));

  return (
    <div
      onClick={() => onOpen(product.id)}
      className="relative group rounded-2xl bg-white p-3 border text-left cursor-pointer transition-all duration-200 hover:shadow-md hover:border-purple-200 active:scale-[0.98] flex flex-col justify-between"
      style={{ borderColor: T.line }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-sm transition-transform active:scale-90"
      >
        <Heart
          size={14}
          color={isWishlisted ? "#DC2626" : T.sub}
          fill={isWishlisted ? "#DC2626" : "none"}
        />
      </button>

      <div>
        <div
          className="rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-105 overflow-hidden"
          style={{ height: 96, background: `${product.tint || "#4C1690"}12` }}
        >
          <ProductImage
            product={product}
            className="h-20 max-w-[90%] object-contain drop-shadow-sm"
            iconSize={36}
          />
        </div>
        <p className="text-[11px] font-medium mb-0.5" style={{ color: T.sub }}>{product.brand}</p>
        <p className="text-sm font-semibold mb-1 leading-snug line-clamp-1" style={{ color: T.ink }}>{product.name}</p>
      </div>

      <div>
        <p className="text-sm font-bold" style={{ color: T.ink }}>{rupee(minPrice)}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "#EEF8D3", color: T.limeDark }}>
            0% EMI
          </span>
          <p className="text-[11px] font-medium" style={{ color: T.sub }}>
            {rupee(cheapestMonthly)}/mo
          </p>
        </div>
      </div>
    </div>
  );
}
