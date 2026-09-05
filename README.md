# 1Fi Marketplace — Shop Page Assignment

A modern React implementation of the **1Fi Marketplace** inside the 1Fi application, built for the 1Fi SDE Intern take-home assignment with extended fintech features.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Run the automated unit test suite (Vitest)
npm test

# Build for production
npm run build
```

---

## Highlights & Extended Features

Beyond the baseline assignment requirements, this implementation includes features tailored for **1Fi's credit and 0% EMI ecosystem**:

### 1. 🌐 Exclusively Live API Device Data (MobileAPI.dev)
- **Zero Mock / Demo Data**: Products are fetched dynamically from `https://api.mobileapi.dev` authenticated via `VITE_MOBILE_API_KEY` configured in `.env`.
- **Live Device Categories**: Real mobile phones (Apple iPhones, Samsung Galaxy, OnePlus, Pixel), tablets & iPads (iPad Pro, iPad Air, Galaxy Tab), laptops, and audio accessories.
- **Specifications & Photos**: Renders authentic base64/URL device photos, display resolution, battery, camera, and hardware specs from the API.

### 2. 🔍 Live Search, Brand Strip Filtering & Sorting
- **Instant Search**: Real-time filtering across brand, product name, and category.
- **Interactive Brand Strip**: Tapping brand chips (*Apple, OnePlus, Sony, boAt, Lenskart*) filters the catalog with active state toggles.
- **Catalog Sorting**: Sort by *Featured*, *Price: Low to High*, *Price: High to Low*, and *Lowest Monthly EMI*.

### 2. 💳 1Fi Pre-Approved Credit Line Context
- Displays the user's active **1Fi Credit Line limit (₹1,50,000)** backed by mutual funds/investments.
- Highlights 1-tap instant approval and 0% financing eligibility.

### 3. 🎛️ Interactive Down-Payment & EMI Customizer
- **Down Payment Slider**: Users can adjust a down payment (₹0 to 50% with presets: ₹0, 10%, 25%, 50%) and watch the financed amount and monthly tenure recalculate in real-time.
- **Interest Savings Callout**: Dynamic card calculating total interest saved vs. standard 16% APR bank credit card EMIs.

### 4. 🏷️ Voucher / Promo Code Engine
- Supports coupon codes like `1FIFIRST` (₹500 instant discount) and `ZEROFEES` (waives convenience fees).

### 5. ⚡ NPCI / RBI-Compliant AutoPay Mandate Setup
- An interactive e-mandate setup step prior to confirmation supporting **UPI AutoPay**, **NetBanking e-Mandate**, and **Debit Card e-Mandate**.

### 6. ❤️ Wishlist & Floating Toast Feedback
- Bookmark products directly from the listing grid or detail screen.
- Floating micro-feedback toast notifications.

### 7. 🧪 Automated Unit Test Suite (Vitest)
- Pure math calculations in `utils/emi.js` and formatters in `utils/format.js` are tested with 100% test coverage.

---

## Architecture & Code Structure

```
src/
├── theme/
│   └── tokens.js              # Design tokens (violet gradient, lime badge, typography)
├── data/
│   └── products.js            # Catalog source (isolated from UI components)
├── services/
│   └── api.js                 # Network layer (fetchProducts, fetchProductDetail, fetchEmiPlans)
├── utils/
│   ├── emi.js                 # Pure financial calculations & savings comparison
│   ├── format.js              # Indian Rupee (₹ INR) and calendar date formatters
│   └── __tests__/             # Automated unit tests (Vitest)
├── components/
│   ├── common/                # Pill, SkeletonCard, ErrorState, EmptyState, TopBar, BottomNav, Toast
│   ├── shop/                  # ShopTabs, BlankTab
│   ├── marketplace/           # CreditLimitBanner, PromoBanner, SearchBar, BrandStrip, CategoryChips, SortDropdown, ProductCard, MarketplaceListing
│   └── product/               # VariantSelector, DownPaymentSlider, PromoCodeInput, InterestSavingsBanner, ProductHighlights, EmiPlanRow, MonthlySchedule, AutopayMandate, ProductDetail, Confirmation
└── App.jsx                    # Navigation state machine (Listing ⇄ Detail ⇄ Mandate ⇄ Confirmation)
```

---

## Reviewer Guide

1. **Brand & Search Filter**: On the Marketplace screen, click "Apple" or "Sony" on the brand strip, or type "air" into the search bar.
2. **Product Detail**: Open **iPhone 17 Pro** or **MacBook Air M4**.
3. **Customize EMI**:
   - Move the **Down Payment slider** to see the tenure amounts recalculate.
   - Click the promo code shortcut **`1FIFIRST`** or **`ZEROFEES`** to see discounts and fee waivers.
   - Expand the **Monthly Table** dropdown to inspect the month-by-month instalment schedule.
4. **Setup Mandate & Confirm**:
   - Click **"Proceed to pay"** to view the NPCI / RBI AutoPay Mandate screen.
   - Click **"Authorize & Activate EMI"** to view the complete order and financing breakdown.
5. **Simulate Network Errors**: Click *"Simulate network error (for review)"* at the bottom of the marketplace to verify loading skeletons, error fallbacks, and the retry mechanism.
