const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  status: { type:String, enum:['pending','completed'], default:'pending' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
