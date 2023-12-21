import axios from "axios";
import { server } from "../../server";

// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};

// get all orders of seller
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersShopRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`
    );

    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersShopFailed",
      payload: error.response.data.message,
    });
  }
};

// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "adminAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};

// Action to update order assign status for transporter
export const transporterAssignedOrderStatus =
  (id, serviceProviderId) => async (dispatch) => {
    console.log(serviceProviderId);
    console.log(id);
    try {
      const response = await axios.put(
        `${server}/order/update-assignment/transporter/${id}`,
        {
          serviceProviderId,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch({
          type: "assignOrderStatusSuccess",
          payload: response.data.order,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

// Action to update order assign status for deliveryman
export const deliverymanAssignedOrderStatus =
  (id, serviceProviderId) => async (dispatch) => {
    try {
      const response = await axios.put(
        `${server}/order/update-assignment/deliveryman/${id}`,
        {
          serviceProviderId,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch({
          type: "assignOrderStatusSuccess",
          payload: response.data.order,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
