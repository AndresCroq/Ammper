// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import bank from 'src/store/apps/bank'
import user from 'src/store/apps/user'
import url from 'src/store/apps/urls'

export const store = configureStore({
  reducer: {
    bank,
    url,
    user,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
