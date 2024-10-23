import { configureStore, combineReducers } from '@reduxjs/toolkit'
import todoReducer from './features/todoSlice'
import {   
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer =combineReducers({
  todos: todoReducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const persisedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persisedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)
export default store;