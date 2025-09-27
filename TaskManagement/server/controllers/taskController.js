const Task = require('../models/taskModel');

// Assign Task
const assignTask = async (req,res)=>{
  const {title,description,assignedTo} = req.body;
  const task = new Task({title,description,assignedTo,assignedBy:req.userId});
  await task.save();
  res.json({ message:"Task assigned", task });
}

// Get tasks with pagination, search, sort
const getTasks = async (req,res)=>{
  const {page=1,limit=5,search='',sort='date'} = req.query;
  let filter = {};
  if(req.userRole==='user') filter = {assignedTo:req.userId};
  if(search) filter.title = {$regex:search,$options:'i'};

  const tasks = await Task.find(filter)
    .sort({[sort]:1})
    .skip((page-1)*limit)
    .limit(parseInt(limit))
    .populate('assignedTo','name email')
    .populate('assignedBy','name email');

  const count = await Task.countDocuments(filter);
  res.json({ tasks,count });
}

// Edit Task (Owner only)
const editTask = async (req,res)=>{
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json({ message:"Task updated", task });
}

// Delete Task (Owner only)
const deleteTask = async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message:"Task deleted" });
}

// Submit Task (User)
const submitTask = async (req,res)=>{
  const task = await Task.findById(req.params.id);
  if(task.assignedTo.toString() !== req.userId) return res.status(403).json({ message:"Access denied" });
  task.status = 'completed';
  await task.save();
  res.json({ message:"Task submitted", task });
}
module.exports={
  assignTask,
  getTasks,
  editTask,
  deleteTask,
  submitTask

}
