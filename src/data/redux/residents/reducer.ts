import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IArea } from '../../../screens/area/types'
import { IResident } from '../../../screens/residents/type'

export interface ResidentState {
  data: IResident[]
}

const initialState: ResidentState = {
  data: []
}

export const residentSlice = createSlice({
  name: 'resident',
  initialState,
  reducers: {
    fetchResidentsData: (state, action) => {
      console.log(action.payload, 'actions')
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = action.payload

    },
    addResident: (state, action) => {
      state.data.push(action.payload)
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { fetchResidentsData, addResident } = residentSlice.actions

export default residentSlice.reducer
