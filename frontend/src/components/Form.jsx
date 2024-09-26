import React, { useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/dataContext.jsx";

function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { setData } = useContext(DataContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/workitems",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setData(response.data)
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClear = async () => {
    if (window.confirm("Are you sure you want to clear all items?")) {
      try {
        await axios.delete("http://localhost:8001/api/workitems/deleteAll");
        console.log("All items deleted successfully");
      } catch (error) {
        console.error("Error in deleting items:", error);
      }
    } else {
      console.log("Action cancelled by user");
    }

    // Reset form fields
    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-6 lg:p-8 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">
            Work
          </label>
          <textarea
            type="text"
            value={title}
            rows="4"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="title"
            aria-describedby="workHelp"
            placeholder="Enter the work title"
          />
          <small id="workHelp" className="text-gray-500">
            Add Your Pending Works Here
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold">
            Your Work Description
          </label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a description of the work"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            id="add"
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Add to Your Work Book
          </button>
          <button
            type="button"
            id="clear"
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Clear Work Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
