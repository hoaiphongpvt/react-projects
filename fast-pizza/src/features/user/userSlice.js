import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async (_, { rejectWithValue }) => {
  try {
    // 1) Get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Use reverse geocoding API to get the user's address
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Return the position and address
    return { position, address };
  } catch (error) {
    // Handle errors like geolocation denied or API issues
    return rejectWithValue(error.message || 'Failed to fetch address');
  }
});

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  errors: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.username = action.payload
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchAddress.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchAddress.fulfilled, (state, action) => {
      state.position = action.payload.position;
      state.address = action.payload.address;
      state.status = 'idle';
    })
    .addCase(fetchAddress.rejected, (state, action) => {
      state.status = 'error';
      state.errors = 'There was a problem getting your address. Make sure to fill this filed!';
    })
})

export const { updateName } = userSlice.actions

export default userSlice.reducer
