// const mongoose=require('mongoose');

// const Task= mongoose.Schema(
//     {
//         title: {type: String, required:true},
//         description: {type: String, required:true},
//         priority: String,
//         dueDate: Date,
//         status: String, // backlog, todo, in-progress, done
//         sharedWith: [], // Users who have read-only access
//         createdBy: {type: String}, // User ID
//         assignedTo: String, // User ID
//       },
//       {timestamps:true}
      
// )

// module.exports=mongoose.model("Task", Task);

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {type: String, required:true},
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['backlog', 'todo', 'in-progress', 'done'],
    default: 'backlog',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
