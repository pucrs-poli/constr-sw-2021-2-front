import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API = axios.create({
  baseURL: `http://18.188.93.243:8000/`,
});

const initialState = {
  users: [],
  originUsers: [],
  fetchStatus: 'idle',
  status: 'idle',
  error: null,
}

export const fetchUsers = createAsyncThunk('users', async () => {
  const response = await API.get('usuarios')
  return response.data
})

export const addNewUser = createAsyncThunk(
  'addUser',
  async (newUser) => {
    const response = await API.post('usuarios', newUser)
    return response.data
  }
)

export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (userId) => {
    await API.delete(`usuarios/${userId}`)
    return userId
  }
)

export const updateUser = createAsyncThunk(
  'updateUser',
  async (userId, userNewValues) => {
    const response = await API.put(`usuarios/${userId}`, userNewValues)
    return response.data
  }
)

export const getUserById = createAsyncThunk(
  'users',
  async (userId) => {
    const response = await API.get(`usuarios/${userId}`)
    return response.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload
    },
    resetErrorStatus(state, action) {
        state.status = 'idle'
    }
   },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.fetchStatus = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded'
        state.users = action.payload
        state.originUsers = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("deu erro aqui")
        state.fetchStatus = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.users = state.users.concat(action.payload)
        state.originUsers = state.users
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload, "update payload")
        const user = state.users.find((user) => user.id === action.payload.id)
        var newUsers = state.users.filter((user) => user.id !== action.payload)
        newUsers.includes(user);
        state.users = newUsers
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setUsers, resetErrorStatus } = usersSlice.actions

export default usersSlice.reducer

export const selectAllUsers = (state) => state.users.users
export const originUsers = (state) => state.users.originUsers

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId)