import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: localStorage.getItem('darkMode') || 'true',
}

export const toogleSlice = createSlice({
  name: 'toogle',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.darkMode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDarkMode } = toogleSlice.actions

export default toogleSlice.reducer