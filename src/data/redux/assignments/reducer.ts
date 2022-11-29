import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IArea, IAssign } from '../../../screens/area/types'
import { IResident } from '../../../screens/residents/type'

export interface ResidentState {
  data: IAssign[]
}

const initialState: ResidentState = {
  data: []
}

export const assignmentSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    fetchAssignmentData: (state, action) => {
      console.log(action.payload, 'assignesssssssss in reducer')
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = action.payload

    },
    addAssignment: (state, action) => {
      state.data.push(action.payload)
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { fetchAssignmentData, addAssignment } = assignmentSlice.actions

export default assignmentSlice.reducer
