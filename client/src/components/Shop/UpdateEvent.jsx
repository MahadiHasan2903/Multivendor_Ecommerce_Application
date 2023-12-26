import { useEffect, useState } from "react";
import { categoriesData } from "../../data/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getEventById, updateEvent } from "../../redux/actions/eventAction";
import { RxCross1 } from "react-icons/rx";

const UpdateEvent = ({ eventId, setOpen }) => {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.events);
  console.log(event);

  const [formData, setFormData] = useState({
    images: [],
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
  });

  useEffect(() => {
    if (eventId && (!event || eventId !== event._id)) {
      dispatch(getEventById(eventId));
    } else {
      console.log("No eventID is found or event already fetched.");
    }
  }, [dispatch, eventId, event]);

  useEffect(() => {
    if (event) {
      console.log(event);
      setFormData({
        images: event.images || [],
        name: event.name || "",
        description: event.description || "",
        category: event.category || "",
        tags: event.tags || "",
        originalPrice: event.originalPrice || "",
        discountPrice: event.discountPrice || "",
        stock: event.stock || "",
      });
    } else {
      ("NO events found");
    }
  }, [event]);

  const handleClose = () => {
    setOpen(false);
    setFormData({
      images: [],
      name: "",
      description: "",
      category: "",
      tags: "",
      originalPrice: "",
      discountPrice: "",
      stock: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateEvent(eventId, formData));

      console.log("Product updated successfully!");
      setOpen(false);

      // Clear the form fields
      setFormData({
        images: [],
        name: "",
        description: "",
        category: "",
        tags: "",
        originalPrice: "",
        discountPrice: "",
        stock: "",
      });
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          updatedImages.push(reader.result);
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: [...prevFormData.images, ...updatedImages],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="absolute bg-red w-[70%] h-[600px] text-whtie flex items-center justify-center">
      <div className=" relative w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
        <div className="flex justify-end w-full p-3">
          <RxCross1
            size={30}
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <h5 className="text-[30px] font-Poppins text-center">Update Event</h5>
        {/* update product form */}
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleInputChange}
              placeholder="Enter your product name..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              cols="30"
              required
              rows="8"
              type="text"
              name="description"
              value={formData.description}
              className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleInputChange}
              placeholder="Enter your product description..."
            ></textarea>
          </div>
          <br />
          <div>
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Choose a category">Choose a category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <label className="pb-2">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleInputChange}
              placeholder="Enter your product tags..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Original Price</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleInputChange}
              placeholder="Enter your product price..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Price (With Discount) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleInputChange}
              placeholder="Enter your product price with discount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleInputChange}
              placeholder="Enter your product stock..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name=""
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />
            <div className="flex flex-wrap items-center w-full">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {formData.images &&
                formData.images.map((image, index) => (
                  <img
                    src={image.url}
                    key={index}
                    alt={`Product ${index + 1}`}
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
            </div>
            <br />
            <div>
              <input
                type="submit"
                value="Update"
                className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
