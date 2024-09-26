import mongoose from "mongoose";

const workItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true });

const WorkItem = mongoose.model('WorkItem', workItemSchema);
export default WorkItem;