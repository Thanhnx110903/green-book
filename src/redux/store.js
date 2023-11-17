import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import categoriesReducer from './categories/categoriesSlice'
import userReducer from './user/userSlice'
import booksReducer from './books/productSlice'

const userConfig = {
  key: 'shop/user',
  storage,
  whitelist: ['isLoggedIn', 'token']
}
const rootReducer = combineReducers({
  categories: categoriesReducer,
  books: booksReducer,
  user: persistReducer(userConfig, userReducer)
})

// const persistedReducer = persistReducer(userConfig, rootReducer)
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export let persistor = persistStore(store)
