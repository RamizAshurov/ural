import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from '@modules/search'

export const store = configureStore({
  reducer: { search: searchReducer },
})
