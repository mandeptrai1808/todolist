const knex = require('../database/knex');


exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await knex('tasks').select('*');
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};


exports.createTask = async (req, res) => {
    const { title, description, priority } = req.body;
    const user_id = req.user.id; 
  
    try {
      const [taskId] = await knex('tasks').insert({
        title,
        description,
        priority,
        user_id, 
      });
  
      const task = await knex('tasks').where({ id: taskId }).first();
      res.status(201).json({ task });
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  };


exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status, priority } = req.body;
  try {
    await knex('tasks').where({ id: taskId }).update({ title, description, status, priority });
    const task = await knex('tasks').where({ id: taskId }).first();
    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};


exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await knex('tasks').where({ id: taskId }).del();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};


exports.getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await knex('tasks').where({ id: taskId }).first();
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
};

exports.getTasksByUserId = async (req, res) => {
    const user_id = req.user.id;
  
    try {
      const tasks = await knex('tasks').where({ user_id }).select('*');
      res.json({ tasks });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user tasks', error });
    }
  };
