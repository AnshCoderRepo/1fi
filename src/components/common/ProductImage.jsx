import React, { useState } from "react";

export default function ProductImage({
  product,
  className = "h-20 object-contain",
  iconSize = 36,
}) {
  const [stage, setStage] = useState("primary"); // "primary" | "fallback" | "icon"
  const Icon = product.icon;

  const handlePrimaryError = () => {
    if (product.fallbackImageUrl && stage === "primary") {
      setStage("fallback");
    } else {
      setStage("icon");
    }
  };

  const handleFallbackError = () => {
    setStage("icon");
  };

  if (stage === "primary" && product.imageUrl) {
    return (
      <img
        src={product.imageUrl}
        alt={product.name}
        className={className}
        loading="lazy"
        onError={handlePrimaryError}
      />
    );
  }

  if (stage === "fallback" && product.fallbackImageUrl) {
    return (
      <img
        src={product.fallbackImageUrl}
        alt={product.name}
        className={className}
        loading="lazy"
        onError={handleFallbackError}
      />
    );
  }

  return <Icon size={iconSize} color={product.tint || "#4C1690"} strokeWidth={1.5} />;
}
