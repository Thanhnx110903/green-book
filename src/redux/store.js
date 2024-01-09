import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authApi from './api/auth'
import bookApi from './api/book'
import cartApi from './api/cart'
import categoryApi from './api/category'
import favoriteApi from './api/favorite'
import orderApi from './api/order'
import postApi from './api/post'
import userApi from './api/user'
import addressApi from './api/address'
import couponApi from './api/coupon'

const userConfig = {
  key: 'shop/user',
  storage,
  whitelist: ['isLoggedIn', 'token']
}
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [couponApi.reducerPath]: couponApi.reducer
})

const middlewares = [
  authApi.middleware,
  bookApi.middleware,
  cartApi.middleware,
  categoryApi.middleware,
  favoriteApi.middleware,
  orderApi.middleware,
  postApi.middleware,
  userApi.middleware,
  addressApi.middleware,
  couponApi.middleware
]

const persistedReducer = persistReducer(userConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(...middlewares)
})

export let persistor = persistStore(store)
