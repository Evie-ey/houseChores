import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { IArea } from '../../../screens/area/types'

// export interface AreaState {
//   data: IArea[]
//   selectedArea: any
// }

const initialState = {
  user: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload

    },

  },
})

// Action creators are generated for each case reducer function
export const { login} = loginSlice.actions

export default loginSlice.reducer
