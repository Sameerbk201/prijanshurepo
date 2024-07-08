const mongoose = require('mongoose');

// Define the schema for a to-do item
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date
  }
},
{timestamps:true}
);

// Create the model from the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
