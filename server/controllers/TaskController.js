const Task = require('../models/Task');
const User = require('../models/User');

const getTasks = async (req, res) => {
  const { filter } = req.query;
  const userId = req.user._id;
  const userEmail = req.user.email;

  let query = {
    $or: [
      { user: userId },
      { sharedWith: userEmail }
    ]
  };

  const now = new Date();
  const tomorrow = new Date(now);
  const tomorrow1= new Date(now);
  tomorrow.setDate(now.getDate()-1);
  tomorrow1.setData(now.getDate());

  if (filter === 'today') {
    const startOfDay = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59, 999);
    query.dueDate = { $gte: startOfDay, $lte: endOfDay };
  } else if (filter === 'week') {
    const startOfWeek = new Date(tomorrow);
    startOfWeek.setDate(tomorrow.getDate() - tomorrow.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(now);
    endOfWeek.setDate(tomorrow.getDate() - tomorrow.getDay() + 7);
    endOfWeek.setHours(23, 59, 59, 999);

    query.dueDate = { $gte: startOfWeek, $lte: endOfWeek };
  } else if (filter === 'month') {
    const startOfMonth = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(tomorrow.getFullYear(), tomorrow.getMonth() + 1, 0, 23, 59, 59, 999);
    query.dueDate = { $gte: startOfMonth, $lte: endOfMonth };
  }
  
  try {
    
    const tasks = await Task.find(query).sort({ dueDate: 1 }); // Sort tasks by dueDate in ascending order
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};



const GetTaskbyId= async (req,res)=>{
  const {id}=req.params;
  try{
    const task= await Task.findById(id);
    if(!task){
      return res.status(400).json("Task not found");
    }
    res.status(200).json(task);
  }
  catch(err){
    res.status(500).json(err)
  }
}
// Create a new task
const createTask = async (req, res) => {
  const { title, priority, dueDate, status, sharedWith, checklist } = req.body;

  try {
    const task = new Task({
      title,
      priority,
      dueDate,
      status,
      user: req.user._id,
      sharedWith,
      checklist,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error creating task' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, priority, dueDate, status, sharedWith, checklist } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    task.title = title || task.title;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;
    task.sharedWith = sharedWith || task.sharedWith;
    task.checklist = checklist || task.checklist;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      await Task.findByIdAndDelete(taskId);
      res.status(200).json({ message: 'Task successfully deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Share a task
const shareTask = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the task by id
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the task is already shared with this user
    if (task.sharedWith.includes(user._id)) {
      return res.status(400).json({ message: 'Task is already shared with this user' });
    }

    // Add the user to the sharedWith array
    task.sharedWith.push(user._id);
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { getTasks, GetTaskbyId, createTask, updateTask, deleteTask, shareTask };
