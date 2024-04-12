import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  CheckoutPage,
  OrderSuccessPage,
  PaymentPage,
  UserOrderDetailsPage,
  UserTrackingOrderPage,
  UserInboxPage,
} from "./routes/Routes";

import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProductPage,
  ShopCreateEventsPage,
  ShopAllEventsPage,
  ShopAllCouponsPage,
  ShopPreviewPage,
  ShopAllOrdersPage,
  ShopOrderDetailsPage,
  ShopAllRefundsPage,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./routes/ShopRoutes";

import {
  AdminDashboardPage,
  AdminDashboardUsersPage,
  AdminDashboardSellersPage,
  AdminDashboardOrdersPage,
  AdminDashboardProductsPage,
  AdminDashboardEventsPage,
  AdminDashboardWithdrawPage,
  AdminAddServiceProviderPage,
  AdminAllServiceProvider,
} from "./routes/AdminRoutes";

import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import axios from "axios";
import { getAllProducts } from "./redux/actions/productAction";
import { getAllEvents } from "./redux/actions/eventAction";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  DeliveryPartnerLoginPage,
  DeliveryPartnerAssignedOrderPage,
  DeliverPartnerAcceptedOrder,
  DeliverPartnerProfilePage,
  DeliveryPartnerOrderDetialsPage,
} from "./routes/PartnerRoutes";

import PartnerProtectedRoute from "./routes/PartnerProtectedRoute";
import { loadSeller } from "./redux/actions/sellerAction";
import { getAllServiceProviders } from "./redux/actions/serviceProviderAction";

function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/payment-stripeapikey`);

    setStripeApiKey(data.stripeApikey);
  }

  console.log("stripeApikey", stripeApikey);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    Store.dispatch(getAllServiceProviders());
    getStripeApikey();
  }, []);

  return (
    <>
      <BrowserRouter>
        {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />

          <Route path="/order/success" element={<OrderSuccessPage />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <UserInboxPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <UserOrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute>
                <UserTrackingOrderPage />
              </ProtectedRoute>
            }
          />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

          {/* shop-routes */}
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProductPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrdersPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetailsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProductPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEventsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEventsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithDrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute>
                <ShopInboxPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefundsPage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-coupouns"
            element={
              <SellerProtectedRoute>
                <ShopAllCouponsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-profile"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin-users"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardUsersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-sellers"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardSellersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardOrdersPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-products"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardProductsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-events"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardEventsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-withdraw-request"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardWithdrawPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-add-service-provider"
            element={
              <ProtectedAdminRoute>
                <AdminAddServiceProviderPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-get-all-service-provider"
            element={
              <ProtectedAdminRoute>
                <AdminAllServiceProvider />
              </ProtectedAdminRoute>
            }
          />

          <Route path="/partner-login" element={<DeliveryPartnerLoginPage />} />

          <Route
            path="/partner-profile"
            element={
              <PartnerProtectedRoute>
                <DeliverPartnerProfilePage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/partner-assigned-orders"
            element={
              <PartnerProtectedRoute>
                <DeliveryPartnerAssignedOrderPage />
              </PartnerProtectedRoute>
            }
          />
          <Route
            path="/partner-accepted-orders"
            element={
              <PartnerProtectedRoute>
                <DeliverPartnerAcceptedOrder />
              </PartnerProtectedRoute>
            }
          />

          <Route
            path="/delivery-partner-order-details/:id"
            element={
              <PartnerProtectedRoute>
                <DeliveryPartnerOrderDetialsPage />
              </PartnerProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
