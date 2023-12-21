const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const {
  isAuthenticated,
  isSeller,
  isAdmin,
} = require("../middleware/authmiddleware");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");
const Event = require("../model/event");

// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, paymentInfo } = req.body;

      // Group cart items by shopId using Array.reduce
      const shopItemsMap = cart.reduce((map, item) => {
        const shopId = item.shopId;
        const existingItems = map.get(shopId) || [];
        return map.set(shopId, [...existingItems, item]);
      }, new Map());

      // Create orders using Array.from with the shopItemsMap
      const orders = Array.from(shopItemsMap).map(async ([shopId, items]) => {
        console.log("Shop ID:", shopId);
        console.log("Items:", items);

        const totalPricePerShop = items.reduce((total, item) => {
          console.log("Item Price:", item.originalPrice);
          return total + item.originalPrice;
        }, 0);

        console.log("Total Price for Shop:", totalPricePerShop);

        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice: totalPricePerShop,
          paymentInfo,
        });
        return order;
      });

      const createdOrders = await Promise.all(orders);

      res.status(201).json({
        success: true,
        orders: createdOrders,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      console.log("Order:", order);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      order.status = req.body.status;
      console.log("Order status:", order.status);

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * 0.1;
        await updateSellerInfo(order.totalPrice - serviceCharge);

        // Update the stock and sold amount of products in the order
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        let product = await Event.findById(id);

        if (!product) {
          product = await Product.findById(id);
        }

        if (product) {
          console.log("Product:", product);

          product.stock -= qty;
          product.sold_out += qty;

          await product.save({ validateBeforeSave: false });
        } else {
          throw new Error("Product not found");
        }
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);

        seller.availableBalance += amount;

        await seller.save();
      }
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        let product = await Event.findById(id);

        if (!product) {
          product = await Product.findById(id);
        }

        if (product) {
          product.stock += qty;
          product.sold_out -= qty;

          await product.save({ validateBeforeSave: false });
        }
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update assignedToTransporter
router.put(
  "/update-assignment/transporter/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const { serviceProviderId } = req.body;

      const order = await Order.findById(orderId);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      // Check if already assigned to a transporter
      if (order.assignedToTransporter.length > 0) {
        return next(
          new ErrorHandler("Order is already assigned to a transporter", 400)
        );
      }

      order.assignedToTransporter.push(serviceProviderId);
      await order.save();

      res.status(200).json({
        success: true,
        order,
        message: "Assignment to transporter updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update assignedToDeliveryman
router.put(
  "/update-assignment/deliveryman/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const { serviceProviderId } = req.body;

      console.log("Order ID:", orderId);
      console.log("Service Provider ID:", serviceProviderId);

      const order = await Order.findById(orderId);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      // Check if already assigned to a transporter
      if (order.assignedToDeliveryman.length > 0) {
        return next(
          new ErrorHandler("Order is already assigned to a transporter", 400)
        );
      }

      order.assignedToDeliveryman.push(serviceProviderId);
      await order.save();

      res.status(200).json({
        success: true,
        order,
        message: "Assignment to deliveryman updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
