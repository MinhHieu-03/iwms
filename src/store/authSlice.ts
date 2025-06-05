import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('isLoggedIn') === 'true',
  loading: false,
  error: null,
};

interface LoginCredentials {
  username: string;
  password: string;
}

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're just checking hardcoded values
      // Add a slight delay to simulate a network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (credentials.username === 'admin' && credentials.password === 'password') {
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      } else {
        return rejectWithValue('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('isLoggedIn');
    // Navigate to login page - we'll handle this in the component
    return true;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
