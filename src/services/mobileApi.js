// MobileAPI.dev official integration
// Authentication configured via VITE_MOBILE_API_KEY in .env

import { Smartphone, Tablet, Laptop, Watch } from "lucide-react";
import { SEED_REAL_DEVICES } from "../data/seedDevices.js";

const API_BASE = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? "/api-mobile"
  : "https://api.mobileapi.dev";

const API_KEY = (typeof import.meta !== "undefined" && import.meta.env?.VITE_MOBILE_API_KEY) || "";

const headers = {
  Authorization: API_KEY ? `Bearer ${API_KEY}` : undefined,
  "Content-Type": "application/json",
};

/**
 * Format raw MobileAPI device into standard 1Fi Marketplace product
 */
export function formatMobileApiDevice(device, categoryOverride) {
  if (!device) return null;

  const rawType = (device.device_type || "").toLowerCase();
  const category =
    categoryOverride ||
    (rawType.includes("tablet") || device.name.toLowerCase().includes("ipad") || device.name.toLowerCase().includes("tab")
      ? "tablets"
      : rawType.includes("laptop") || device.name.toLowerCase().includes("macbook")
      ? "laptops"
      : rawType.includes("wearable") || device.name.toLowerCase().includes("watch")
      ? "wearables"
      : "phones");

  const icon =
    category === "tablets"
      ? Tablet
      : category === "laptops"
      ? Laptop
      : category === "wearables"
      ? Watch
      : Smartphone;

  const brand = device.manufacturer_name || (device.manufacturer && device.manufacturer.name) || "Apple";
  const name = device.name.toLowerCase().includes(brand.toLowerCase()) ? device.name : `${brand} ${device.name}`;

  const primaryImg = device.image_url || (device.image_b64 ? `data:image/jpeg;base64,${device.image_b64}` : null);
  const fallbackImg = device.image_b64 ? `data:image/jpeg;base64,${device.image_b64}` : null;

  // Realistic Indian Rupee pricing
  let basePrice = 49990;
  if (name.includes("Pro Max") || name.includes("Ultra")) basePrice = 134900;
  else if (name.includes("Pro") || name.includes("MacBook Pro")) basePrice = 119900;
  else if (name.includes("MacBook Air")) basePrice = 99900;
  else if (name.includes("iPad") || name.includes("Tab S")) basePrice = 49900;
  else if (name.includes("Watch") || category === "wearables") basePrice = 24900;
  else if (name.includes("Plus") || name.includes("Air")) basePrice = 69900;
  else if (brand === "OnePlus" || brand === "Xiaomi") basePrice = 42990;
  else if (brand === "Acer" || brand === "Alcatel") basePrice = 14990;

  const primaryStorage = device.storage || "128GB";
  const secondaryStorage = primaryStorage.includes("256") ? "512GB" : "256GB";

  return {
    id: `mobileapi-${device.id}`,
    name,
    brand,
    category,
    icon,
    tint: brand === "Apple" ? "#1D1D1F" : brand === "Samsung" ? "#0F172A" : brand === "OnePlus" ? "#991B1B" : "#4C1690",
    imageUrl: primaryImg,
    fallbackImageUrl: fallbackImg,
    description:
      device.description ||
      `${name} featuring ${device.screen_resolution ? `${device.screen_resolution} display, ` : ""}${device.storage ? `${device.storage} storage, ` : ""}${device.camera ? `${device.camera} camera system, ` : ""}${device.battery_capacity ? `${device.battery_capacity} battery, ` : ""}${device.hardware ? `powered by ${device.hardware}.` : "flagship performance."}`,
    specs: {
      screen: device.screen_resolution,
      storage: device.storage,
      battery: device.battery_capacity,
      camera: device.camera,
      hardware: device.hardware,
      weight: device.weight ? `${device.weight}g` : null,
      release: device.release_date,
    },
    variants: [
      { id: "v1", label: `${primaryStorage}`, price: basePrice },
      { id: "v2", label: `${secondaryStorage} / Upgraded`, price: Math.round(basePrice * 1.18 / 100) * 100 - 1 },
    ],
  };
}

/**
 * Fetch devices by type with resilient fallback to pre-cached MobileAPI catalog
 */
export async function fetchDevicesByTypeLive(type, limit = 15) {
  try {
    const res = await fetch(`${API_BASE}/devices/by-type/?type=${type}&limit=${limit}`, {
      headers,
      signal: AbortSignal.timeout(1000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.devices) && data.devices.length > 0) {
        return data.devices.map((d) => formatMobileApiDevice(d)).filter(Boolean);
      }
    }
  } catch (err) {
    // Graceful fallback to real seed devices on DNS / offline error
  }

  const filtered = SEED_REAL_DEVICES.filter((d) => {
    const dt = (d.device_type || "").toLowerCase();
    if (type === "tablet") return dt.includes("tablet") || d.name.toLowerCase().includes("ipad") || d.name.toLowerCase().includes("tab");
    if (type === "laptop") return dt.includes("laptop") || d.name.toLowerCase().includes("macbook");
    if (type === "wearable") return dt.includes("wearable") || d.name.toLowerCase().includes("watch");
    return dt.includes("phone") || (!dt.includes("tablet") && !dt.includes("laptop") && !dt.includes("wearable"));
  });

  return filtered.slice(0, limit).map((d) => formatMobileApiDevice(d)).filter(Boolean);
}

/**
 * Live search devices
 */
export async function searchDevicesLive(query) {
  try {
    const res = await fetch(`${API_BASE}/devices/search/?name=${encodeURIComponent(query)}`, {
      headers,
      signal: AbortSignal.timeout(1000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.devices) && data.devices.length > 0) {
        return data.devices.map((d) => formatMobileApiDevice(d)).filter(Boolean);
      }
    }
  } catch (err) {
    // Fallback search
  }

  const q = query.toLowerCase();
  return SEED_REAL_DEVICES.filter(
    (d) => d.name.toLowerCase().includes(q) || (d.manufacturer_name && d.manufacturer_name.toLowerCase().includes(q))
  ).map((d) => formatMobileApiDevice(d)).filter(Boolean);
}

/**
 * Live autocomplete suggestions
 */
export async function fetchLiveAutocomplete(query) {
  if (!query || query.length < 2) return [];
  try {
    const res = await fetch(`${API_BASE}/devices/autocomplete/?q=${encodeURIComponent(query)}&limit=6`, {
      headers,
      signal: AbortSignal.timeout(800),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {}

  const q = query.toLowerCase();
  return SEED_REAL_DEVICES.filter((d) => d.name.toLowerCase().includes(q))
    .slice(0, 6)
    .map((d) => ({
      id: d.id,
      name: d.name,
      brand: d.manufacturer_name || "Apple",
      full_name: `${d.manufacturer_name || "Apple"} ${d.name}`,
    }));
}
