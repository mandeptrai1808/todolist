const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

module.exports = require('knex')({
  // client: 'mysql', 
  client: 'pg', //deploy

  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    
  },
  pool: { min: 0, max: 10 },
});

async function testDatabaseConnection() {
  try {
    await db.raw('SELECT 1'); // Thực hiện truy vấn kiểm tra
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

// Gọi hàm này tại entry point (ví dụ: server.js)
testDatabaseConnection();