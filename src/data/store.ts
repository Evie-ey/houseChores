import { configureStore } from '@reduxjs/toolkit';
import AreaReducer from './redux/areas/reducer';

export const store = configureStore({
  reducer: {
    area: AreaReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
