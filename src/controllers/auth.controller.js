const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../database/knex'); // Giả sử bạn có kết nối knex ở đây
const { JWT_SECRET } = process.env;

// Đăng ký người dùng mới
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await knex('users').insert({ username, email, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  };
  
  // Đăng nhập người dùng
  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await knex('users').where({ email }).first();
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };
  
  // Lấy thông tin người dùng hiện tại
  exports.getUserInfo = async (req, res) => {
    const userId = req.user.id;
    try {
      const user = await knex('users').where({ id: userId }).first();
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.json({ user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user info', error });
    }
  };
  
// Xem danh sách người dùng (chỉ dành cho admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await knex('users').select('id', 'username', 'email', 'role', 'created_at');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users list', error });
  }
};

// Cập nhật thông tin người dùng (chỉ dành cho admin)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  try {
    await knex('users').where({ id }).update({ username, email, role });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Xóa người dùng (chỉ dành cho admin)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await knex('users').where({ id }).del();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Thêm người dùng mới (chỉ dành cho admin)
exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await knex('users').insert({ username, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};
