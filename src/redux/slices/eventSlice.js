const { createSlice } = require("@reduxjs/toolkit");
const {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../actions/eventActions");

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    total: 0,
    events: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.events = action.payload.events;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
