import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IArea } from '../../../screens/area/types'

export interface AreaState {
  data: IArea[]
}

const initialState: AreaState = {
  data: []
}

export const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    fetchAreaData: (state, action) => {
      console.log(action.payload, 'actions')
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = action.payload

    },
    addArea: (state, action) => {
      state.data.push(action.payload)
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { fetchAreaData, addArea} = areaSlice.actions

export default areaSlice.reducer
