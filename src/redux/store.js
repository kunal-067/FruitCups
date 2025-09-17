import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice"
import checkOutSlice from "./slices/checkOutSlice"
import authSlice from "./slices/authSlice"
import {
    persistReducer,
    persistStore
} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  product: productSlice,
  checkout: checkOutSlice,
  auth: authSlice
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'checkout', 'auth'],
};
const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store);