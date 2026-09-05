import React, { useState, useEffect, useCallback } from "react";
import { ShieldCheck, Heart, Share2 } from "lucide-react";
import TopBar from "../common/TopBar.jsx";
import SkeletonCard from "../common/SkeletonCard.jsx";
import ErrorState from "../common/ErrorState.jsx";
import ProductImage from "../common/ProductImage.jsx";
import VariantSelector from "./VariantSelector.jsx";
import DownPaymentSlider from "./DownPaymentSlider.jsx";
import PromoCodeInput from "./PromoCodeInput.jsx";
import InterestSavingsBanner from "./InterestSavingsBanner.jsx";
import ProductHighlights from "./ProductHighlights.jsx";
import EmiPlanRow from "./EmiPlanRow.jsx";
import MonthlySchedule from "./MonthlySchedule.jsx";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";
import { fetchProductDetail, fetchEmiPlans } from "../../services/api.js";

export default function ProductDetail({
  productId,
  onBack,
  onProceed,
  isWishlisted,
  onToggleWishlist,
  onShowToast,
}) {
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(null);
  const [planStatus, setPlanStatus] = useState("idle");
  const [downPayment, setDownPayment] = useState(0);
  const [promo, setPromo] = useState(null);

  const loadProduct = useCallback(async () => {
    setStatus("loading");
    try {
      const p = await fetchProductDetail(productId);
      setProduct(p);
      setVariant(p.variants[0]);
      setStatus("ready");
    } catch (e) {
      setErrorMsg(e.message);
      setStatus("error");
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const loadPlans = useCallback(async (price, dp, currentPromo) => {
    setPlanStatus("loading");
    try {
      const options = {
        downPayment: dp,
        discount: currentPromo?.discount || 0,
        waiveFee: Boolean(currentPromo?.waiveFee),
      };
      const data = await fetchEmiPlans(price, options);
      setPlans(data);
      // Retain the current tenure or default to the first
      setPlan((prev) => (prev ? data.find((p) => p.months === prev.months) || data[0] : data[0]));
      setPlanStatus("ready");
    } catch (e) {
      setPlanStatus("error");
    }
  }, []);

  useEffect(() => {
    if (variant) {
      loadPlans(variant.price, downPayment, promo);
    }
  }, [variant, downPayment, promo, loadPlans]);

  const handleApplyPromo = (promoObj) => {
    setPromo(promoObj);
    onShowToast?.(`Promo code ${promoObj.code} applied!`, "success");
  };

  const handleRemovePromo = () => {
    setPromo(null);
    onShowToast?.("Promo code removed", "info");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    onShowToast?.("Product link copied to clipboard!", "success");
  };

  if (status === "loading") {
    return (
      <div>
        <TopBar title="Loading…" onBack={onBack} />
        <div className="p-4 space-y-3">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <TopBar title="Product" onBack={onBack} />
        <ErrorState message={errorMsg} onRetry={loadProduct} />
      </div>
    );
  }

  const Icon = product.icon;
  const netEffectivePrice = Math.max(0, variant.price - (promo?.discount || 0));

  return (
    <div className="pb-32">
      <TopBar
        title={product.name}
        onBack={onBack}
        rightAction={
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <Share2 size={16} color={T.sub} />
            </button>
            <button
              onClick={() => {
                onToggleWishlist(product);
                onShowToast?.(
                  isWishlisted ? "Removed from wishlist" : "Saved to wishlist!",
                  isWishlisted ? "info" : "success"
                );
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <Heart
                size={18}
                color={isWishlisted ? "#DC2626" : T.sub}
                fill={isWishlisted ? "#DC2626" : "none"}
              />
            </button>
          </div>
        }
      />

      {/* Product Hero Tile */}
      <div className="px-4 pt-4">
        <div
          className="rounded-2xl flex items-center justify-center shadow-sm overflow-hidden p-4"
          style={{ height: 210, background: `${product.tint || "#4C1690"}12` }}
        >
          <ProductImage
            product={product}
            className="h-44 max-w-[90%] object-contain drop-shadow-md"
            iconSize={72}
          />
        </div>
        <p className="text-xs font-medium mt-3" style={{ color: T.sub }}>{product.brand}</p>
        <p className="text-lg font-bold" style={{ color: T.ink }}>{product.name}</p>

        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-xl font-extrabold" style={{ color: T.ink }}>
            {rupee(netEffectivePrice)}
          </p>
          {promo?.discount > 0 && (
            <p className="text-sm line-through text-gray-400 font-medium">
              {rupee(variant.price)}
            </p>
          )}
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#EEF8D3", color: T.limeDark }}>
            0% Interest
          </span>
        </div>
      </div>

      <VariantSelector
        variants={product.variants}
        selected={variant}
        onSelect={(newVar) => {
          setVariant(newVar);
          setDownPayment(0);
        }}
      />

      <ProductHighlights />

      {product.description && (
        <div className="px-4 pt-4">
          <p className="text-xs font-semibold mb-1" style={{ color: T.sub }}>ABOUT PRODUCT</p>
          <p className="text-xs leading-relaxed" style={{ color: T.ink }}>{product.description}</p>
        </div>
      )}

      {product.specs && (
        <div className="px-4 pt-4">
          <p className="text-xs font-semibold mb-2" style={{ color: T.sub }}>KEY SPECIFICATIONS</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {product.specs.screen && (
              <div className="p-2.5 rounded-xl border bg-white" style={{ borderColor: T.line }}>
                <p className="text-[10px] text-gray-500 font-medium">Display</p>
                <p className="font-semibold mt-0.5 line-clamp-1" style={{ color: T.ink }}>{product.specs.screen}</p>
              </div>
            )}
            {product.specs.battery && (
              <div className="p-2.5 rounded-xl border bg-white" style={{ borderColor: T.line }}>
                <p className="text-[10px] text-gray-500 font-medium">Battery</p>
                <p className="font-semibold mt-0.5 line-clamp-1" style={{ color: T.ink }}>{product.specs.battery}</p>
              </div>
            )}
            {product.specs.camera && (
              <div className="p-2.5 rounded-xl border bg-white" style={{ borderColor: T.line }}>
                <p className="text-[10px] text-gray-500 font-medium">Camera</p>
                <p className="font-semibold mt-0.5 line-clamp-1" style={{ color: T.ink }}>{product.specs.camera}</p>
              </div>
            )}
            {product.specs.hardware && (
              <div className="p-2.5 rounded-xl border bg-white" style={{ borderColor: T.line }}>
                <p className="text-[10px] text-gray-500 font-medium">Performance</p>
                <p className="font-semibold mt-0.5 line-clamp-1" style={{ color: T.ink }}>{product.specs.hardware}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <PromoCodeInput
        activePromo={promo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      <DownPaymentSlider
        totalAmount={netEffectivePrice}
        downPayment={downPayment}
        onChange={setDownPayment}
      />

      {/* EMI Plan Section */}
      <div className="px-4 pt-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold" style={{ color: T.sub }}>SELECT EMI TENURE</p>
          <span className="text-[11px] font-medium text-purple-700">All plans 0% Interest</span>
        </div>

        {planStatus === "loading" && (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: T.line }} />)}
          </div>
        )}
        {planStatus === "error" && (
          <ErrorState
            message="Couldn't load EMI options."
            onRetry={() => loadPlans(variant.price, downPayment, promo)}
          />
        )}
        {planStatus === "ready" && plans.map((p) => (
          <EmiPlanRow key={p.months} plan={p} selected={plan} onSelect={setPlan} />
        ))}
      </div>

      <InterestSavingsBanner plan={plan} />

      <MonthlySchedule plan={plan} />

      <div className="px-4 pt-4 flex items-start gap-2">
        <ShieldCheck size={16} color={T.purple700} className="mt-0.5 shrink-0" />
        <p className="text-[11px] text-gray-600 leading-relaxed">
          100% Digital process · No physical verification · Instant e-mandate via UPI/NetBanking
        </p>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none z-20">
        <div className="w-full max-w-md pointer-events-auto">
          <div
            className="mx-4 mb-4 p-3.5 rounded-2xl flex items-center justify-between border"
            style={{
              background: T.card,
              borderColor: T.line,
              boxShadow: "0 10px 30px rgba(46,11,92,0.18)",
            }}
          >
            <div>
              <p className="text-[11px] font-medium" style={{ color: T.sub }}>
                {plan ? `${plan.months} months tenure` : "Choose a plan"}
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-lg font-black" style={{ color: T.ink }}>
                  {plan ? `${rupee(plan.monthly)}/mo` : "—"}
                </p>
                {downPayment > 0 && (
                  <span className="text-[10px] text-gray-500">
                    (+{rupee(downPayment)} down)
                  </span>
                )}
              </div>
            </div>
            <button
              disabled={!plan}
              onClick={() => onProceed(product, variant, plan)}
              className="px-6 py-3 rounded-xl text-white text-sm font-bold disabled:opacity-50 transition-transform active:scale-95 shadow-md"
              style={{ background: T.purple700 }}
            >
              Proceed to pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
