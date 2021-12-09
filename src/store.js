import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './pages/Users/UserSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
  },
})
