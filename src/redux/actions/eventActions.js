import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import { toast } from "react-toastify";

export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/events?page=${credentials?.pageNo ?? 1}&limit=${
          credentials?.limit ?? 10
        }`
      );
      return {
        total: response.data.data.total,
        events: response.data.data.events,
      };
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/create",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      await api.post("/events", credentials);
      dispatch(fetchEvents());
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "event/update",
  async ({ eventId, ...restCredentials }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/events/${eventId}`, restCredentials);
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(fetchEvents());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/delete",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/events/${credentials?.eventId}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(fetchEvents());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const esvpEvent = createAsyncThunk(
  "event/rsvp",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/events/${credentials?.eventId}/rsvp`, {
        attending: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(fetchEvents());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
