
const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  dueDate: { type: Date },
  status: { type: String, enum: ['backlog', 'todo', 'in-progress', 'done'], default: 'backlog' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  checklist: [checklistItemSchema],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
