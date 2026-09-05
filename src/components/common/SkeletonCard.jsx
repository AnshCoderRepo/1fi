import React from "react";
import { T } from "../../theme/tokens.js";

export default function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white p-3 border" style={{ borderColor: T.line }}>
      <div className="rounded-xl animate-pulse mb-3" style={{ background: T.line, height: 96 }} />
      <div className="animate-pulse rounded mb-2" style={{ background: T.line, height: 12, width: "70%" }} />
      <div className="animate-pulse rounded" style={{ background: T.line, height: 12, width: "45%" }} />
    </div>
  );
}
