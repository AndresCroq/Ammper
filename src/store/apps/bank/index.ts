// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export interface Bank {
  _id: string
  category: string | null;
  accountCategory: string;
  merchantName: string;
  amount: number;
  type: string;
  status: string;
  balance: number;
  valueDate: string;
}

type BankFilters = {
  [K in keyof Bank]: string[];
};

type RequiredProps = 'status' | 'accountCategory' | 'type'

type Filter = Pick<BankFilters, RequiredProps> & Partial<Omit<BankFilters, RequiredProps>>;

export interface ResponseBank extends Bank {
  id: string
}

interface FilterWithPagination extends Partial<Bank> {
  limit: number;
  skip: number;
}

interface BankReducer {
  data: Bank[]
  params: any
  total: number
  allData: Bank[]
  filters: Filter
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appBank/fetchData', async ({ limit, skip }: { limit: number, skip: number }) => {
  try {
    const { data } = await axios.post<{ banks: Bank[], count: number }>(`${process.env.NEXT_PUBLIC_BACK}/bank?format=table&limit=${limit}&skip=${skip}`)

    const banksWithId: ResponseBank[] = data.banks.map((e) => ({ id: e._id, ...e }));


    const filters: Filter = {
      accountCategory: ['CREDIT_CARD', 'LOAN_ACCOUNT', 'CHECKING_ACCOUNT'],
      status: ['PENDING', 'PROCESSED'],
      type: ['INFLOW', 'OUTFLOW'],
    }

    const dispatchableData = {
      allData: { coreData: banksWithId },
      banks: { coreData: banksWithId },
      total: data.count,
      filters: filters as Filter
    }
    
    return dispatchableData as any;
  } catch (err) {
    console.error(err);
  }
})

export const addFromSocket = createAsyncThunk('appBank/addFromSocket', async () => {
  return 1
})


export const clearData = createAsyncThunk('appBank/clearData', async () => {
  return []
})

export const filterData = createAsyncThunk('appBank/filterData', async (
  { limit, skip, ...filters }: FilterWithPagination
) => {
  try {
    const { data } = await axios.post<{ banks: Bank[], count: number }>(`${process.env.NEXT_PUBLIC_BACK}/bank?format=table&limit=${limit}&skip=${skip}`, filters)

    const banksWithId: ResponseBank[] = data.banks.map((e) => ({ id: e._id, ...e }));

    const response = { 
      data: banksWithId,
      total: data.count
    }
    
    return response as any
  } catch (err) {
    console.error(err);
  }
})

export const appBanksSlice = createSlice({
  name: 'appBank',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    filters: { category: [], accountCategory: [], balance: [], type: [], status: [], amount: [] }
  } as BankReducer,
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

export default appBanksSlice.reducer
