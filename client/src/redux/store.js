import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { userReducer } from "./reducers/userReducer";
import { sellerReducer } from "./reducers/sellerReducer";
import { productReducer } from "./reducers/productReducer";
import { eventReducer } from "./reducers/eventReducer";
import { cartReducer } from "./reducers/cartReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import { orderReducer } from "./reducers/orderReducer";
import { serviceProviderReducer } from "./reducers/serviceProviderReducer";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  user: userReducer,
  seller: sellerReducer,
  products: productReducer,
  events: eventReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
  serviceProvider: serviceProviderReducer,
});

const persistConfig = {
  key: "root", // key for the root of the persisted state
  storage, // the storage to use (e.g., local storage, async storage)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(Store);

export { Store, persistor };
