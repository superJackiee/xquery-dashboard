import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.info = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProject } = projectSlice.actions

export default projectSlice.reducer