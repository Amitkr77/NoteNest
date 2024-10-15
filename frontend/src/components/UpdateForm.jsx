import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateForm({ isOpen, modalClose, selectedItem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setDescription(selectedItem.description);
    }
  }, [selectedItem]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace the URL with your actual endpoint
      const response = await axios.patch(
        `https://notenest-backend-3j7p.onrender.com/api/workitems/update/${selectedItem._id}`,
        {
          title,
          description,
        }
      );
      // Handle response as needed
      console.log("Update successful:", response.data);
      modalClose(); // Close the modal after update
    } catch (error) {
      console.error("Error updating work item:", error);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl relative">
        <button
          onClick={modalClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <div className="max-w-md mx-auto space-y-6">
          {/* Title and Description Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md p-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md p-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter description"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-teal-400 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Update Work Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
