const express = require("express");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary").v2;

const {
  isSeller,
  isAdmin,
  isAuthenticated,
} = require("../middleware/authmiddleware");
const router = express.Router();
const fs = require("fs");

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i], {
            folder: "products",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;

        const event = await Event.create(productData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400)); // Fixed error handling
    }
  })
);

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) {
        return next(new ErrorHandler("Event is not found with this id", 404));
      }

      for (let i = 0; i < event.images.length; i++) {
        const result = await cloudinary.uploader.destroy(
          event.images[i].public_id
        );
      }

      await Event.deleteOne({ _id: req.params.id });

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get single event
router.get(
  "/get-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findById(eventId);

      if (!event) {
        return next(new ErrorHandler("Event not found", 404));
      }

      res.status(200).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Update event by ID
router.put(
  "/update-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const updates = req.body;

      console.log("Event ID:", eventId);
      console.log("Updates:", updates);

      const event = await Event.findById(eventId);

      if (!event) {
        console.log("Event not found");
        return next(new ErrorHandler("Event not found", 404));
      }

      // Update each field individually
      for (let key in updates) {
        event[key] = updates[key];
      }

      console.log("Updated Event:", event);

      await event.save();

      res.status(200).json({
        success: true,
        message: "Event updated successfully!",
        event,
      });
    } catch (error) {
      console.log("Error:", error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
