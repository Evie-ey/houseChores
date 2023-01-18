import { configureStore } from '@reduxjs/toolkit';
import AreaReducer from './redux/areas/reducer';
import ResidentReducer from './redux/residents/reducer';
import AssignmentReducer from './redux/assignments/reducer';
import LoginReducer from './coreReducer'

export const store = configureStore({
  reducer: {
    area: AreaReducer,
    resident: ResidentReducer,
    assignmnent: AssignmentReducer,
    login: LoginReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
