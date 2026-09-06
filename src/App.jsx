import React, { useState } from "react";
import ShopTabs from "./components/shop/ShopTabs.jsx";
import BlankTab from "./components/shop/BlankTab.jsx";
import MarketplaceListing from "./components/marketplace/MarketplaceListing.jsx";
import ProductDetail from "./components/product/ProductDetail.jsx";
import AutopayMandate from "./components/product/AutopayMandate.jsx";
import Confirmation from "./components/product/Confirmation.jsx";
import HomeTab from "./components/tabs/HomeTab.jsx";
import PledgeTab from "./components/tabs/PledgeTab.jsx";
import ProfileTab from "./components/tabs/ProfileTab.jsx";
import BottomNav from "./components/common/BottomNav.jsx";
import Toast from "./components/common/Toast.jsx";
import { T } from "./theme/tokens.js";

// Top-level navigation state machine:
// listing -> detail -> mandate -> confirmation
export default function App() {
  const [footerTab, setFooterTab] = useState("shop"); // home | shop | pledge | profile
  const [shopTab, setShopTab] = useState("marketplace"); // brands | nearby | marketplace
  const [screen, setScreen] = useState("listing"); // listing | detail | mandate | confirmation
  const [activeProductId, setActiveProductId] = useState(null);
  const [orderDraft, setOrderDraft] = useState(null);
  const [finalOrder, setFinalOrder] = useState(null);
  const [wishlistedIds, setWishlistedIds] = useState(["iphone-17-pro"]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const toggleWishlist = (product) => {
    setWishlistedIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const openProduct = (id) => {
    setActiveProductId(id);
    setScreen("detail");
  };

  const handleProceedToMandate = (product, variant, plan) => {
    setOrderDraft({ product, variant, plan });
    setScreen("mandate");
  };

  const handleConfirmMandate = (completedOrder) => {
    setFinalOrder(completedOrder);
    setScreen("confirmation");
    showToast("0% EMI plan activated successfully!", "success");
  };

  const backToListing = () => {
    setScreen("listing");
    setOrderDraft(null);
    setFinalOrder(null);
  };

  const handleFooterTabChange = (tabId) => {
    setFooterTab(tabId);
    setScreen("listing");
  };

  return (
    <div className="min-h-screen flex justify-center" style={{ background: "#E9E7F2" }}>
      <Toast toast={toast} />
      <div className="w-full max-w-md min-h-screen flex flex-col relative shadow-xl" style={{ background: T.bg }}>
        <div className="flex-1">
          {screen === "listing" && (
            <>
              {footerTab === "home" && (
                <HomeTab
                  onNavigateToShop={() => setFooterTab("shop")}
                  onNavigateToPledge={() => setFooterTab("pledge")}
                />
              )}

              {footerTab === "shop" && (
                <>
                  <ShopTabs tab={shopTab} setTab={setShopTab} />
                  {shopTab === "brands" && <BlankTab title="Top Brands" />}
                  {shopTab === "nearby" && <BlankTab title="Nearby Stores" />}
                  {shopTab === "marketplace" && (
                    <MarketplaceListing
                      onOpenProduct={openProduct}
                      wishlistedIds={wishlistedIds}
                      onToggleWishlist={toggleWishlist}
                    />
                  )}
                </>
              )}

              {footerTab === "pledge" && (
                <PledgeTab onNavigateToShop={() => setFooterTab("shop")} />
              )}

              {footerTab === "profile" && (
                <ProfileTab wishlistedCount={wishlistedIds.length} />
              )}
            </>
          )}

          {screen === "detail" && (
            <ProductDetail
              productId={activeProductId}
              onBack={backToListing}
              onProceed={handleProceedToMandate}
              isWishlisted={wishlistedIds.includes(activeProductId)}
              onToggleWishlist={toggleWishlist}
              onShowToast={showToast}
            />
          )}

          {screen === "mandate" && orderDraft && (
            <AutopayMandate
              order={orderDraft}
              onBack={() => setScreen("detail")}
              onConfirmMandate={handleConfirmMandate}
            />
          )}

          {screen === "confirmation" && finalOrder && (
            <Confirmation
              order={finalOrder}
              onDone={backToListing}
              onShowToast={showToast}
            />
          )}
        </div>

        {screen === "listing" && (
          <BottomNav activeTab={footerTab} onChangeTab={handleFooterTabChange} />
        )}
      </div>
    </div>
  );
}
