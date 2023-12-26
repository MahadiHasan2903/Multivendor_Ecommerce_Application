import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, {
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  eventCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all events of shop
  getAlleventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAlleventsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete event of a shop
  deleteeventRequest: (state) => {
    state.isLoading = true;
  },
  deleteeventSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteeventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all events
  getAlleventsRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAlleventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  //Get single event
  getEventByIdRequest: (state) => {
    state.isLoading = true;
    state.event = null;
    state.error = null;
  },
  getEventByIdSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  getEventByIdFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  //Update event
  updateEventRequest: (state) => {
    state.isLoading = true;
    state.error = null;
  },
  updateEventSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  updateEventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
