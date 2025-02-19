const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Optional: Connect to MongoDB if MONGO_URI is provided
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Routes
const taxRoutes = require('./routes/taxRoutes');
app.use('/api', taxRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
