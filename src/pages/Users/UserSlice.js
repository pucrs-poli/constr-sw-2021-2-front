import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API = axios.create({
  baseURL: `http://18.188.93.243:8000/`,
});

const initialState = {
  users: [],
  status: 'idle',
  error: null,
}

export const fetchUsers = createAsyncThunk('getUsers', async () => {
  // const response = await API.get('usuarios')
  const mockUser = {
    email: "rabeloexample.com",
    login: "string",
    nome: "string",
    papeis: [],
    matricula: "string",
    senha: "string"
  };
  // console.log(response);
  return mockUser//response.data
})

export const addNewUser = createAsyncThunk(
  'createUser',
  async (newUser) => {
    const response = await API.post('usuarios', newUser)
    return response.data
  }
)

export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (userId) => {
    const response = await API.delete(`usuarios/${userId}`)
    return response.data
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
  'getUserById',
  async (userId) => {
    const response = await API.get(`usuarios/${userId}`)
    return response.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { userId, reaction } = action.payload
      const existingUser = state.users.find((user) => user.id === userId)
      if (existingUser) {
        existingUser.reactions[reaction]++
      }
    },
    userUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingUser = state.users.find((user) => user.id === id)
      if (existingUser) {
        existingUser.title = title
        existingUser.content = content
      }
    },

  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = state.users.concat(action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { userUpdated, reactionAdded } = usersSlice.actions

export default usersSlice.reducer

export const selectAllUsers = (state) => state.users.users

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId)