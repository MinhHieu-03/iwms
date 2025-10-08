import apiClient from "@/lib/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: Record<string, unknown>;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isLoggedIn") === "true",
  loading: false,
  error: null,
  user: {},
};

interface LoginCredentials {
  username: string;
  password: string;
}

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { username, password } = credentials;
      const { data } = await apiClient.post("/auth/login", {
        name: username,
        password,
      });
      const { metaData, msg } = data;
      console.log("Login response:", metaData.access_token);
      if (metaData && metaData.access_token) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("access_token", metaData.access_token);
        localStorage.setItem("user", JSON.stringify(metaData.user));
        return metaData;
      } else {
        return rejectWithValue("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    // Navigate to login page - we'll handle this in the component
    return true;
  }
);

const authSlice = createSlice({
  name: "auth",
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
        state.user = state.user || {};
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
