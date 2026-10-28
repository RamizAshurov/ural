import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAnalogues, fetchManufacturers } from '@api/service.js'

const idleRequest = { data: null, isLoading: false, error: null, requestId: null }

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

const loadingRequest = (requestId) => ({ ...idleRequest, isLoading: true, requestId })

// ответ устарел, если запрос отменён или после него стартовал новый (или был сброс)
const isStale = (request, meta) => meta.aborted || meta.requestId !== request.requestId

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearch: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // новый артикул: бренд и аналоги от прошлого артикула сбрасываются
      .addCase(loadManufacturers.pending, (_, { meta }) => ({
        ...initialState,
        manufacturers: loadingRequest(meta.requestId),
      }))
      .addCase(loadManufacturers.fulfilled, (state, { meta, payload }) => {
        if (isStale(state.manufacturers, meta)) return
        state.manufacturers.isLoading = false
        state.manufacturers.data = payload
      })
      .addCase(loadManufacturers.rejected, (state, { meta, error }) => {
        if (isStale(state.manufacturers, meta)) return
        state.manufacturers.isLoading = false
        state.manufacturers.error = error.message
      })
      .addCase(loadAnalogues.pending, (state, { meta }) => {
        state.selectedBrand = meta.arg.brand
        state.analogues = loadingRequest(meta.requestId)
      })
      .addCase(loadAnalogues.fulfilled, (state, { meta, payload }) => {
        if (isStale(state.analogues, meta)) return
        state.analogues.isLoading = false
        state.analogues.data = payload
      })
      .addCase(loadAnalogues.rejected, (state, { meta, error }) => {
        if (isStale(state.analogues, meta)) return
        state.analogues.isLoading = false
        state.analogues.error = error.message
      })
  },
})

export const { resetSearch } = searchSlice.actions
export const searchReducer = searchSlice.reducer
export const selectSearch = (state) => state.search
