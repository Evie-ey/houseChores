import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IArea } from '../../../screens/area/types'

export interface AreaState {
  data: IArea[]
  selectedArea: any
}

const initialState: AreaState = {
  data: [],
  selectedArea: undefined
}

export const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    fetchAreaData: (state, action) => {

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = action.payload

    },
    addArea: (state, action) => {
      state.data.push(action.payload)
    },
    getSelected: (state, action) => {
     
      state.selectedArea = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetchAreaData, addArea, getSelected} = areaSlice.actions

export default areaSlice.reducer
