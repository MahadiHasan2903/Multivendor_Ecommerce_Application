import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  serviceProvider: null,
  serviceProviders: [],
  error: null,
  success: false,
};

export const serviceProviderReducer = createReducer(initialState, {
  // Get a service provider by ID
  getServiceProviderByIdRequest: (state) => {
    state.isLoading = true;
  },
  getServiceProviderByIdSuccess: (state, action) => {
    state.isLoading = false;
    state.serviceProvider = action.payload;
  },

  getServiceProviderByIdFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearServiceProviderDetails: (state) => {
    state.serviceProvider = null;
  },

  // Get all service providers
  getAllServiceProvidersRequest: (state) => {
    state.isLoading = true;
  },
  getAllServiceProvidersSuccess: (state, action) => {
    state.isLoading = false;
    state.serviceProviders = action.payload;
  },
  getAllServiceProvidersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete service provider by ID
  deleteServiceProviderRequest: (state) => {
    state.isLoading = true;
  },
  deleteServiceProviderSuccess: (state) => {
    state.isLoading = false;
    state.success = true;
  },
  deleteServiceProviderFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Get transporters
  getTransportersRequest: (state) => {
    state.isLoading = true;
  },
  getTransportersSuccess: (state, action) => {
    state.isLoading = false;
    state.serviceProviders = action.payload;
  },
  getTransportersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get deliverymen
  getDeliverymenRequest: (state) => {
    state.isLoading = true;
  },
  getDeliverymenSuccess: (state, action) => {
    state.isLoading = false;
    state.serviceProviders = action.payload;
  },
  getDeliverymenFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // Get all assigned orders for a service provider
  getAllAssignedOrdersRequest: (state) => {
    state.isLoading = true;
  },
  getAllAssignedOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.assignedOrders = action.payload;
  },
  getAllAssignedOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get all accepted orders for a service provider
  getAllAcceptedOrdersRequest: (state) => {
    state.isLoading = true;
  },
  getAllAcceptedOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.acceptedOrders = action.payload;
  },
  getAllAcceptedOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get all transported orders for a service provider
  getAllTransportedOrdersRequest: (state) => {
    state.isLoading = true;
  },
  getAllTransportedOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.transportedOrders = action.payload;
  },
  getAllTransportedOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Reject an assigned order by service Provider
  rejectAssignedOrderRequest: (state) => {
    state.isLoading = true;
  },
  rejectAssignedOrderSuccess: (state) => {
    state.isLoading = false;
    state.success = true;
  },
  rejectAssignedOrderFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
