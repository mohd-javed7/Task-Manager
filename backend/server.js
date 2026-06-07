const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Start server immediately
app.listen(5000, () => console.log('Server running on port'));

// Connect to MongoDB separately
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));