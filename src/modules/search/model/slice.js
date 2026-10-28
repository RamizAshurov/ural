import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAnalogues, fetchManufacturers } from '@api/service.js'

// status: 'idle' | 'loading' | 'succeeded' | 'failed'
const idleRequest = { status: 'idle', data: null, error: null, requestId: null }

const initialState = {
  selectedBrand: null,
  manufacturers: idleRequest,
  analogues: idleRequest,
}

export const loadManufacturers = createAsyncThunk(
  'search/loadManufacturers',
  (query, { signal }) => fetchManufacturers(query, { signal }),
)

export const loadAnalogues = createAsyncThunk(
  'search/loadAnalogues',
  ({ query, brand }, { signal }) => fetchAnalogues(query, brand, { signal }),
)

const loadingRequest = (requestId) => ({ ...idleRequest, status: 'loading', requestId })

// ответ устарел, если после запроса стартовал новый (или был сброс)
const isStale = (request, meta) => meta.requestId !== request.requestId

function addSettledCases(builder, thunk, key) {
  builder
    .addCase(thunk.fulfilled, (state, { meta, payload }) => {
      if (isStale(state[key], meta)) return
      state[key].status = 'succeeded'
      state[key].data = payload
    })
    .addCase(thunk.rejected, (state, { meta, error }) => {
      if (isStale(state[key], meta)) return
      // отменён без замены (уход со страницы) — возвращаемся в idle, а не висим в loading
      state[key] = meta.aborted
        ? idleRequest
        : { ...state[key], status: 'failed', error: error.message }
    })
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearch: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadManufacturers.pending, (_, { meta }) => ({
        ...initialState,
        manufacturers: loadingRequest(meta.requestId),
      }))
      .addCase(loadAnalogues.pending, (state, { meta }) => {
        state.selectedBrand = meta.arg.brand
        state.analogues = loadingRequest(meta.requestId)
      })
    addSettledCases(builder, loadManufacturers, 'manufacturers')
    addSettledCases(builder, loadAnalogues, 'analogues')
  },
  selectors: {
    selectSelectedBrand: (state) => state.selectedBrand,
    selectManufacturers: (state) => state.manufacturers,
    selectAnalogues: (state) => state.analogues,
  },
})

export const { resetSearch } = searchSlice.actions
export const { selectAnalogues, selectManufacturers, selectSelectedBrand } = searchSlice.selectors
export const searchReducer = searchSlice.reducer
