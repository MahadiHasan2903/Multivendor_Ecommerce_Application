import axios from "axios";
import { server } from "../../server";

export const createEvent = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const response = await axios.post(`${server}/event/create-event`, data);
    console.log("Response:", response);

    const event = response.data;
    console.log("Event:", event);

    dispatch({
      type: "eventCreateSuccess",
      payload: event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteeventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};

// Get single product by ID
export const getEventById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getEventByIdRequest",
    });

    console.log("Requesting event data...");

    const { data } = await axios.get(`${server}/event/get-event/${id}`);

    console.log("Received event data:", data);

    dispatch({
      type: "getEventByIdSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "getEventByIdFailed",
      payload: error.response.data.message,
    });
  }
};

// Update product by ID
export const updateEvent = (id, updates) => async (dispatch) => {
  try {
    console.log("Updated Event ID:", id);
    console.log("Updated Event details:", updates);
    dispatch({
      type: "updateEventRequest",
    });

    const { data } = await axios.put(
      `${server}/event/update-event/${id}`,
      updates
    );

    dispatch({
      type: "updateEventSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "updateEventFailed",
      payload: error.response.data.message,
    });
  }
};
