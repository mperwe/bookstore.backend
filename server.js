const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/bd');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
