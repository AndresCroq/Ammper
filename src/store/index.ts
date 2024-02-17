// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import shipment from 'src/store/apps/shipments'
import user from 'src/store/apps/user'
import url from 'src/store/apps/urls'

export const store = configureStore({
  reducer: {
    shipment,
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
