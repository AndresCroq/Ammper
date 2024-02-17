// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


interface Shipment {
  _id: string
  coreData: CoreData
}

interface Filter {
  sellerAddress: string[];
  seller: string[];
  deliveryTime: string[];
  deliveryPreferences: string[];
  status: string[];
}

interface Response {
  shipments: Shipment[]
  filters: Filter
  count: number
}


export interface ResponseShipment {
  _id: string
  id: string
  coreData: CoreData
}

export interface CoreData {
  id: number
  buyer: string
  address: string
  zipCode: string
  seller: string
  sellerAddress: string
  deliveryPreferences: string
  destinationLatitude: number;
  destinationLongitude: number;
  status: string;
  originLatitude?: number;
  originLongitude?: number;
  deliveryTime?: string
  order?: number | string;
  deliveryType?: string;
}

interface FilterWithPagination {
  limit: number;
  skip: number;
  sellerAddress?: string;
  seller?: string;
  deliveryTime?: string;
  deliveryPreferences?: string;
  status?: string;
  q?: string;
}

interface ShipmentReducer {
  data: Shipment[]
  params: any
  total: number
  allData: Shipment[]
  filters: Filter
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appShipment/fetchData', async ({ limit, skip }: { limit: number, skip: number }) => {
  try {
    const { data } = await axios.post<Response>(`${process.env.NEXT_PUBLIC_BACK}/shipments`,
      {
        limit,
        skip
      })

    const shipmentsWithId: ResponseShipment[] = data.shipments.map((e) => {
      const withId = { id: e._id, ...e }; 

      return withId;
    })

    const dispatchableData = {
      allData: shipmentsWithId,
      shipments: shipmentsWithId,
      total: data.count,
      filters: data.filters
    }
    
    return dispatchableData as any;
  } catch (err) {
    console.log(err);
  }
})

export const addFromSocket = createAsyncThunk('appShipment/addFromSocket', async () => {
  return 1
})


export const clearData = createAsyncThunk('appShipment/clearData', async () => {
  return []
})

export const filterData = createAsyncThunk('appShipment/filterData', async (
  { limit, skip, ...filters }: FilterWithPagination
) => {
  try {
    const { data } = await axios.post<Response>(`${process.env.NEXT_PUBLIC_BACK}/shipments`, {
      limit,
      skip,
      ...filters
    })

    const shipmentsWithId: ResponseShipment[] = data.shipments.map((e) => {
      const withId = { id: e._id, ...e }; 

      return withId;
    })

    const response = { 
      data: shipmentsWithId,
      total: data.count
    }
    
    return response as any
  } catch (err) {
    console.log(err);
  }
})

export const appShipmentsSlice = createSlice({
  name: 'appShipment',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    filters: { seller: [], sellerAddress: [], deliveryTime: [], deliveryPreferences: [], status: [] }
  } as ShipmentReducer,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.filters = action.payload.filters
    })
    builder.addCase(clearData.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(addFromSocket.fulfilled, (state) => {
      state.total = state.total + 1
    })
    builder.addCase(filterData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
    })
  }
})

export default appShipmentsSlice.reducer
