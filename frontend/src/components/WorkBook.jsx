import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import { DataContext } from "../context/dataContext.jsx";

export default function WorkBook() {
  const [workData, setWorkData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Assuming `data` is used somewhere, otherwise remove it
  const { data } = useContext(DataContext);

  // Function to handle search input changes
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Function to open the modal
  const modalOpen = () => setIsOpen(true);
  // Function to close the modal
  const modalClose = () => setIsOpen(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/workitems");
        setWorkData(res.data);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };
    fetchData();
    console.log(data);
  }, [data]); // Added `data` to dependencies if it's changing and needed

  // Function to handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/workitems/delete/${id}`);
      setWorkData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error in deleting work item", error);
    }
  };

  // Function to handle edit action
  const handleEdit = (item) => {
    setSelectedItem(item);
    modalOpen();
  };

  // Function to handle update action
  const handleUpdate = async (updatedItem) => {
    console.log(updatedItem._id);
    try {
      // Update the work item
      await axios.patch(
        `http://localhost:8001/api/workitems/update/${updatedItem._id}`,
        updatedItem
      );

      // Fetch the updated list of work items
      const { data } = await axios.get("http://localhost:8001/api/workitems");
      setWorkData(data);

      // Close the modal after a successful update
      modalClose();
    } catch (error) {
      // Improved error handling
      console.error(
        "Error updating work item:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to update the work item. Please try again."); // Optional user feedback
    }
  };

  // Filter workData based on search term
  const filteredWorkData = workData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="items" className="p-6 lg:p-8 my-6 max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Work Book</h2>

        {/* Search Form */}
        <form className="flex items-center space-x-2 mb-4">
          <input
            value={search}
            onChange={handleSearch}
            type="search"
            placeholder="Search"
            className="text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out w-full max-w-xs lg:max-w-sm"
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out"
            // No need to call handleSearch here since it's already managed by input change
          >
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">S. No.</th>
              <th className="px-4 py-2 text-left">Work</th>
              <th className="px-4 py-2 text-left">Work Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkData.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Form Modal */}
      {isOpen && (
        <UpdateForm
          isOpen={isOpen}
          modalClose={modalClose}
          selectedItem={selectedItem}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
