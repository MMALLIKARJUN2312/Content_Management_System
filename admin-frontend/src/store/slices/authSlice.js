import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

export const loginAdmin = createAsyncThunk('auth/loginAdmin', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const fetchCurrentAdmin = createAsyncThunk('auth/fetchCurrentAdmin', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/auth/me');
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Not authenticated');
  }
});

export const logoutAdmin = createAsyncThunk('auth/logoutAdmin', async () => {
  await api.post('/auth/logout');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    admin: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.admin = action.payload.admin;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.admin = action.payload.admin;
      })
      .addCase(fetchCurrentAdmin.rejected, (state) => {
        state.isAuthenticated = false;
        state.admin = null;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.admin = null;
      });
  },
});

export default authSlice.reducer;
