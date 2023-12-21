import axios from "axios";
import { server } from "../../server";

// Action to get a service provider by ID
export const getServiceProviderById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getServiceProviderByIdRequest" });

    const response = await axios.get(
      `${server}/service-provider/get-service-provider/${id}`
    );

    dispatch({
      type: "getServiceProviderByIdSuccess",
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: "getServiceProviderByIdFail",
      payload: error.response.data.message,
    });
  }
};

export const clearServiceProviderDetails = () => ({
  type: "clearServiceProviderDetails",
});
// Action to get all service providers
export const getAllServiceProviders = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllServiceProvidersRequest",
    });

    const { data } = await axios.get(
      `${server}/service-provider/get-all-service-providers`
    );

    dispatch({
      type: "getAllServiceProvidersSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "getAllServiceProvidersFail",
      payload: error.response.data.message,
    });
  }
};

// Action to delete a service provider by ID
export const deleteServiceProvider = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteServiceProviderRequest",
    });

    const { data } = await axios.delete(
      `${server}/service-provider/delete-service-provider/${id}`
    );

    dispatch({
      type: "deleteServiceProviderSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteServiceProviderFail",
      payload: error.response.data.message,
    });
  }
};

// Action to get transporters
export const getTransporters = () => async (dispatch) => {
  try {
    dispatch({
      type: "getTransportersRequest",
    });

    const { data } = await axios.get(
      `${server}/service-provider/get-transporters`
    );

    dispatch({
      type: "getTransportersSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "getTransportersFail",
      payload: error.response.data.message,
    });
  }
};

// Action to get deliverymen
export const getDeliverymen = () => async (dispatch) => {
  try {
    dispatch({
      type: "getDeliverymenRequest",
    });

    const { data } = await axios.get(
      `${server}/service-provider/get-deliverymen`
    );

    dispatch({
      type: "getDeliverymenSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "getDeliverymenFail",
      payload: error.response.data.message,
    });
  }
};

// Action to get all assigned orders for a service provider
export const getAllAssignedOrders = (serviceProviderId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllAssignedOrdersRequest" });

    const response = await axios.get(
      `${server}/service-provider/get-all-assigned-orders/${serviceProviderId}`
    );

    dispatch({
      type: "getAllAssignedOrdersSuccess",
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: "getAllAssignedOrdersFail",
      payload: error.response.data.message,
    });
  }
};

// Action to get all accepted orders for a service provider
export const getAllAcceptedOrders = (serviceProviderId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllAcceptedOrdersRequest" });

    const response = await axios.get(
      `${server}/service-provider/get-all-accepted-orders/${serviceProviderId}`
    );
    console.log(response.data.data);

    dispatch({
      type: "getAllAcceptedOrdersSuccess",
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: "getAllAcceptedOrdersFail",
      payload: error.response.data.message,
    });
  }
};

// Action to get all transported orders for a service provider
export const getAllTransportedOrders =
  (serviceProviderId) => async (dispatch) => {
    try {
      dispatch({ type: "getAllTransportedOrdersRequest" });

      const response = await axios.get(
        `${server}/service-provider/get-all-transported-orders/${serviceProviderId}`
      );

      dispatch({
        type: "getAllTransportedOrdersSuccess",
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: "getAllTransportedOrdersFail",
        payload: error.response.data.message,
      });
    }
  };

// Action to reject an assigned order by ID for a service provider
export const rejectAssignedOrder =
  (serviceProviderId, orderId) => async (dispatch) => {
    try {
      dispatch({ type: "rejectAssignedOrderRequest" });

      const response = await axios.delete(
        `${server}/service-provider/delete-order/${serviceProviderId}/${orderId}`
      );

      dispatch({
        type: "rejectAssignedOrderSuccess",
        payload: response.data.message,
      });

      dispatch(getAllAssignedOrders(serviceProviderId));
    } catch (error) {
      dispatch({
        type: "rejectAssignedOrderFail",
        payload: error.response.data.message,
      });
    }
  };

export const acceptAssignedOrder =
  (serviceProviderId, orderId) => async (dispatch) => {
    try {
      dispatch({ type: "acceptAssignedOrderRequest" });

      const response = await axios.put(
        `${server}/service-provider/accept-order`,
        {
          serviceProviderId,
          orderId,
        }
      );

      dispatch({
        type: "acceptAssignedOrderSuccess",
        payload: response.data.message,
      });

      dispatch(getAllAssignedOrders(serviceProviderId));
    } catch (error) {
      dispatch({
        type: "acceptAssignedOrderFail",
        payload: error.response.data.message,
      });
    }
  };
