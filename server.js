// require('dotenv').config();
// const app = require('./src/app');

// //Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const app = require('./src/app');

// Cấu hình CORS - cho phép tất cả các nguồn gốc
app.use(cors());

// Hoặc giới hạn CORS cho các domain cụ thể (thay thế 'https://your-frontend-domain.com' bằng domain thực tế của bạn)
// app.use(cors({ origin: 'https://your-frontend-domain.com' }));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});


