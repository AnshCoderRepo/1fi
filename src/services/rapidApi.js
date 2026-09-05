// RapidAPI Service for mobile-phones2 & live device APIs
// Authentication configured via VITE_MOBILE_API_KEY in .env

const RAPID_API_HOST = "mobile-phones2.p.rapidapi.com";
const RAPID_API_KEY = (typeof import.meta !== "undefined" && import.meta.env?.VITE_MOBILE_API_KEY) || "";

const headers = {
  "x-rapidapi-host": RAPID_API_HOST,
  "x-rapidapi-key": RAPID_API_KEY,
  "Content-Type": "application/json",
};

/**
 * Fetch brands from RapidAPI
 */
export async function fetchRapidApiBrands() {
  try {
    const res = await fetch(`https://${RAPID_API_HOST}/brands`, {
      method: "GET",
      headers,
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data?.data || data || null;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch phones by brand from RapidAPI
 */
export async function fetchRapidApiPhonesByBrand(brandSlug) {
  try {
    const res = await fetch(`https://${RAPID_API_HOST}/brands/${brandSlug}`, {
      method: "GET",
      headers,
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data?.data?.phones || data?.phones || data || null;
  } catch (err) {
    return null;
  }
}
