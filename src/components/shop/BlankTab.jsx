import React from "react";
import { T } from "../../theme/tokens.js";

// "Top Brands" and "Nearby Stores" are explicitly out of scope per the
// assignment brief — this is a deliberate placeholder, not an unfinished
// screen.
export default function BlankTab({ title }) {
  return (
    <div className="flex flex-col items-center text-center py-24 px-6">
      <p className="font-semibold mb-1" style={{ color: T.ink }}>{title}</p>
      <p className="text-sm" style={{ color: T.sub }}>Coming soon.</p>
    </div>
  );
}
