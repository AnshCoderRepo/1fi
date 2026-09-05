// Primary API service communicating with mobileapi.dev endpoints
// Configured via environment variables in .env

import { computeEmiPlans } from "../utils/emi.js";
import {
  fetchDevicesByTypeLive,
  searchDevicesLive,
  fetchLiveAutocomplete,
} from "./mobileApi.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let forceErrorNext = false;
export function armNextRequestToFail() {
  forceErrorNext = true;
}

function maybeFail(message) {
  if (forceErrorNext) {
    forceErrorNext = false;
    throw new Error(message);
  }
}

// In-memory cache by category
const categoryCache = {};

export async function fetchProducts(categoryId) {
  await delay(250);
  maybeFail("Couldn't load live marketplace products. Check your connection.");

  if (categoryId === "all") {
    if (categoryCache["all"]) return categoryCache["all"];
    
    // Fetch phones, tablets, laptops, and wearables in parallel
    const [phones, tablets, laptops, wearables] = await Promise.all([
      fetchDevicesByTypeLive("phone", 12),
      fetchDevicesByTypeLive("tablet", 10),
      fetchDevicesByTypeLive("laptop", 10),
      fetchDevicesByTypeLive("wearable", 8),
    ]);

    const combined = [...phones, ...tablets, ...laptops, ...wearables];
    categoryCache["all"] = combined;
    return combined;
  }

  if (categoryCache[categoryId]) {
    return categoryCache[categoryId];
  }

  const typeMap = {
    phones: "phone",
    tablets: "tablet",
    laptops: "laptop",
    wearables: "wearable",
  };

  const targetType = typeMap[categoryId] || "phone";
  const devices = await fetchDevicesByTypeLive(targetType, 20);
  categoryCache[categoryId] = devices;
  return devices;
}

export async function fetchProductDetail(productId) {
  await delay(150);
  maybeFail("Couldn't load device details.");

  // Check in-memory caches
  for (const list of Object.values(categoryCache)) {
    const found = list.find((p) => p.id === productId);
    if (found) return found;
  }

  // Fallback to search query
  const rawId = productId.replace("mobileapi-", "");
  const searchResults = await searchDevicesLive(rawId);
  if (searchResults.length > 0) return searchResults[0];

  throw new Error("Device not found.");
}

export async function fetchEmiPlans(price, options = {}) {
  await delay(150);
  maybeFail("Couldn't compute 0% EMI options.");
  return computeEmiPlans(price, options);
}

export async function fetchAutocompleteSuggestions(query) {
  return fetchLiveAutocomplete(query);
}
