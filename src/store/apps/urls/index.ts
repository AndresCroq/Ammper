// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface Url {
  url: string
  code: string
}

export type UrlWithId = Url & { id: string }

// ** Fetch Users
export const fetchData = createAsyncThunk('appUrl/fetchData', async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACK}/admin/all`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const urls: Url[] = await response.json();

    const urlsWithId: UrlWithId[] = urls.map((e) => {
      const withId = { id: e.code, ...e }; 

      return withId;
    })

    const dispatchableData = {
        allData: urlsWithId,
        urls: urlsWithId,
        total: urlsWithId.length
      }
    
    return dispatchableData as any;
  } catch (err) {
    console.log(err);
  }
})

export const appUrlssSlice = createSlice({
  name: 'appUrl',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.urls
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appUrlssSlice.reducer
