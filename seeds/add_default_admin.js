const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Xóa tài khoản admin nếu đã tồn tại
  await knex('users').where({ email: 'admin@example.com' }).del();

  // Tạo tài khoản admin mới
  const hashedPassword = await bcrypt.hash('admin123', 10); // Mật khẩu mã hóa

  await knex('users').insert({
    username: 'admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin', // Đặt vai trò là admin
  });
};
