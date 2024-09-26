import  WorkItem  from '../model/schema.js';
import { isValidObjectId } from "mongoose";

export const createWorkItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const workItem = new WorkItem({ title, description });
    await workItem.save();

    res.status(201).json({ message: "Work item has been saved", workItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving work item" });
  }
};

export const getWorkItems = async (req, res) => {
  try {
    const workItems = await WorkItem.find();
    res.status(200).json(workItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting work items" });
  }
};

export const deleteWorkItem = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid work item ID' });
  }

  try {
    const deletedWorkItem = await WorkItem.findByIdAndDelete(id);
    if (!deletedWorkItem) {
      return res.status(404).json({ message: 'Work item not found' });
    }
    res.status(200).json({ message: 'Work item deleted successfully' });
  } catch (error) {
    console.error('Error deleting work item:', error);
    res.status(500).json({ message: 'Failed to delete work item' });
  }
};

export const updateWorkItem = async (req, res) => {
  const { id } = req.params; // Destructure id from params
  const updateData = req.body; // Store req.body in a variable

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).send({ message: "Request body cannot be empty" });
  }

  try {
    const updatedWork = await WorkItem.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedWork) {
      return res.status(404).send({ message: "Work item not found" });
    }

    res.status(200).send(updatedWork);
  } catch (error) {
    console.error('Error updating work item:', error.message); // Log the error message
    res.status(500).send({ message: 'Failed to update work item', error: error.message });
  }
};


export const deleteAllWorkItems = async (req, res) => {
  try {
    await WorkItem.deleteMany();
    res.status(200).json({ message: 'All work items deleted successfully' });
  } catch (error) {
    console.error('Error deleting work items:', error);
    res.status(500).json({ message: 'Failed to delete work items' });
  }
};
