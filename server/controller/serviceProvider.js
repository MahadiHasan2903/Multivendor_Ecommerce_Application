const express = require("express");
const path = require("path");
const ServiceProvider = require("../model/serviceProvider");
const Order = require("../model/order");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const sendServiceProviderToken = require("../utils/serviceProvider");
const { isAuthenticated, isAdmin } = require("../middleware/authmiddleware");
const cloudinary = require("cloudinary").v2;

const bcrypt = require("bcrypt");

// Create service provider
router.post(
  "/create-service-provider",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { name, email, password, avatar, nid, role, phoneNumber, address } =
        req.body;
      console.log(req.body);
      const serviceProviderEmail = await ServiceProvider.findOne({ email });

      if (serviceProviderEmail) {
        return next(new ErrorHandler("ServiceProvider already exists", 400));
      }

      const myCloud = await cloudinary.uploader.upload(avatar, {
        folder: "avatars",
      });

      const newServiceProvider = new ServiceProvider({
        name: name,
        email: email,
        password: password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        nid: nid,
        role: role,
        phoneNumber,
        address,
      });

      await newServiceProvider.save();

      res.status(201).json({
        success: true,
        message: `Registration Successful`,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// login Service Provider
router.post(
  "/login-service-provider",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const serviceProvider = await ServiceProvider.findOne({ email }).select(
        "+password"
      );

      if (!serviceProvider) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await serviceProvider.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendServiceProviderToken(serviceProvider, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out
router.get(
  "/logout-service-provider",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("service_provider_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all service providers
router.get(
  "/get-all-service-providers",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allServiceProviders = await ServiceProvider.find();
      // console.log(allServiceProviders);

      if (!allServiceProviders || allServiceProviders.length === 0) {
        return next(new ErrorHandler("No service providers found", 404));
      }

      res.status(200).json({
        success: true,
        data: allServiceProviders,
      });
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get service provider by ID
router.get(
  "/get-service-provider/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const serviceProvider = await ServiceProvider.findById(id);

    if (!serviceProvider) {
      return next(new ErrorHandler("Service Provider not found", 404));
    }

    res.status(200).json({
      success: true,
      data: serviceProvider,
    });
  })
);

// Delete service provider by ID
router.delete(
  "/delete-service-provider/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);

    try {
      const serviceProvider = await ServiceProvider.findById(id);

      if (!serviceProvider) {
        return next(new ErrorHandler("Service Provider not found", 404));
      }

      await ServiceProvider.deleteOne({ _id: id });

      res.status(200).json({
        success: true,
        message: "Service Provider deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Error deleting service provider", 500));
    }
  })
);

// Update service provider by ID
router.put(
  "/update-service-provider/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        oldPassword,
        newPassword,
        nid,
        role,
        phoneNumber,
        address,
        isAvailable,
      } = req.body;

      console.log("Request Body of Update:", req.body);

      const serviceProvider = await ServiceProvider.findById(id).select(
        "+password"
      );

      if (!serviceProvider) {
        return next(new ErrorHandler("Service Provider not found", 404));
      }

      if (oldPassword !== "" && newPassword !== "") {
        const isPasswordValid = await serviceProvider.comparePassword(
          oldPassword
        );

        if (!isPasswordValid) {
          return next(new ErrorHandler("Invalid old password", 400));
        }

        serviceProvider.password = newPassword;
      }

      serviceProvider.name = name || serviceProvider.name;
      serviceProvider.email = email || serviceProvider.email;
      serviceProvider.nid = nid || serviceProvider.nid;
      serviceProvider.role = role || serviceProvider.role;
      serviceProvider.phoneNumber = phoneNumber || serviceProvider.phoneNumber;
      serviceProvider.address = address || serviceProvider.address;
      serviceProvider.isAvailable = isAvailable;

      await serviceProvider.save();

      res.status(200).json({
        success: true,
        message: "Service Provider updated successfully",
        data: serviceProvider,
      });
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get service providers with role transporter
router.get(
  "/get-transporters",
  catchAsyncErrors(async (req, res, next) => {
    const transporters = await ServiceProvider.find({
      role: "Transporter",
      isAvailable: true,
    });

    if (!transporters || transporters.length === 0) {
      return next(new ErrorHandler("No available transporters found", 404));
    }

    res.status(200).json({
      success: true,
      data: transporters,
    });
  })
);

// Get service providers with role deliveryman
router.get(
  "/get-deliverymen",
  catchAsyncErrors(async (req, res, next) => {
    const deliverymen = await ServiceProvider.find({
      role: "Deliveryman",
      isAvailable: true,
    });

    if (!deliverymen || deliverymen.length === 0) {
      return next(new ErrorHandler("No deliverymen found", 404));
    }

    res.status(200).json({
      success: true,
      data: deliverymen,
    });
  })
);

// Assign order to a service provider
router.post(
  "/assign-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { orderId, serviceProviderId } = req.body;
      console.log("Request Body:", req.body);

      const serviceProvider = await ServiceProvider.findById(serviceProviderId);

      if (!serviceProvider) {
        return next(new ErrorHandler("Service Provider not found", 404));
      }

      if (!Array.isArray(serviceProvider.assignedOrders)) {
        serviceProvider.assignedOrders = []; // Initialize if not an array
      }

      serviceProvider.assignedOrders.push(orderId);
      await serviceProvider.save();

      console.log("Response:", {
        success: true,
        message: "Order assigned to the service provider",
      });

      res.status(200).json({
        success: true,
        message: "Order assigned to the service provider",
      });
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Service provider accepts an order
router.put(
  "/accept-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // console.log("Request Body:", req.body);

      const { orderId, serviceProviderId } = req.body;

      const serviceProvider = await ServiceProvider.findById(serviceProviderId);

      if (!serviceProvider) {
        return next(new ErrorHandler("Service Provider not found", 404));
      }

      const index = serviceProvider.assignedOrders.indexOf(orderId);
      if (index !== -1) {
        serviceProvider.assignedOrders.splice(index, 1);
        serviceProvider.acceptedOrders.push(orderId);
        await serviceProvider.save();

        console.log("Response:", {
          success: true,
          message: "Order accepted by the service provider",
        });

        res.status(200).json({
          success: true,
          message: "Order accepted by the service provider",
        });
      } else {
        console.error("Error: Order not found in assigned orders");
        return next(
          new ErrorHandler("Order not found in assigned orders", 404)
        );
      }
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update order status
router.put(
  "/provider-update-order-status/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      console.log("Order ID :", orderId);
      console.log("Order Status :", status);

      // Find the order by ID
      const order = await Order.findById(orderId);

      if (!order) {
        return next(new ErrorHandler("Order not found", 404));
      }

      // Update the status
      order.status = status;
      await order.save();

      // Logic to move orders based on status
      if (status === "Transferred to delivery partner") {
        // Move order from acceptedOrder array to transportedOrder array
        const index = order.assignedOrder.findIndex((id) => id === orderId);
        if (index !== -1) {
          order.assignedOrder.splice(index, 1); // Remove from assignedOrder
          order.transportedOrder.push(orderId); // Add to transportedOrder
          await order.save();
        }
      } else if (status === "delivered") {
        // Remove order from acceptedOrder array
        const index = order.assignedOrder.findIndex((id) => id === orderId);
        if (index !== -1) {
          order.assignedOrder.splice(index, 1); // Remove from assignedOrder
          await order.save();
        }
        // Add order to transportedOrder array
        order.transportedOrder.push(orderId);
        await order.save();
      }

      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
      });
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all assigned orders for a service provider
router.get(
  "/get-all-assigned-orders/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;

      const serviceProvider = await ServiceProvider.findById(id);

      if (!serviceProvider) {
        return next(new ErrorHandler("Service Provider not found", 404));
      }

      const assignedOrders = await Order.find({
        _id: { $in: serviceProvider.assignedOrders },
      });

      console.log(assignedOrders);

      res.status(200).json({
        success: true,
        data: assignedOrders,
      });
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all accepted orders for a service provider
router.get(
  "/get-all-accepted-orders/:serviceProviderId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { serviceProviderId } = req.params;
      console.log("Service Provider Id", req.params);

      const serviceProvider = await ServiceProvider.findById(serviceProviderId);

      if (!serviceProvider) {
        return next(new ErrorHandler("Service Provider not found", 404));
      }

      const acceptedOrders = await Order.find({
        _id: { $in: serviceProvider.acceptedOrders },
      });

      console.log(acceptedOrders);

      res.status(200).json({
        success: true,
        data: acceptedOrders,
      });
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all transported orders for a service provider
router.get(
  "/get-all-transported-orders/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { serviceProviderId } = req.params;

      const serviceProvider = await ServiceProvider.findById(serviceProviderId);

      if (!serviceProvider) {
        return next(new ErrorHandler("Service Provider not found", 404));
      }

      const transportedOrders = await Order.find({
        _id: { $in: serviceProvider.transportedOrders },
      });

      res.status(200).json({
        success: true,
        data: transportedOrders,
      });
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete specific order for a service provider
router.delete(
  "/delete-order/:serviceProviderId/:orderId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { serviceProviderId, orderId } = req.params;

      const serviceProvider = await ServiceProvider.findById(serviceProviderId);

      if (!serviceProvider) {
        return next(new ErrorHandler("Service Provider not found", 404));
      }

      const orderIndex = serviceProvider.assignedOrders.indexOf(orderId);

      if (orderIndex === -1) {
        return next(
          new ErrorHandler("Order not found for this service provider", 404)
        );
      }

      serviceProvider.assignedOrders.splice(orderIndex, 1);
      await serviceProvider.save();

      res.status(200).json({
        success: true,
        message: "Order deleted for the service provider",
      });
    } catch (error) {
      console.error("Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
