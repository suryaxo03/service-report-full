const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Import Routes
const adminAuthRoutes = require('./routes/adminAuth');
const userAuthRoutes = require('./routes/userAuth');
const reportRoutes = require('./routes/report');
// Routes
app.use('/api/admin', adminAuthRoutes);   // Admin login routes
app.use('/api/user', userAuthRoutes);     // User login routes
app.use('/api/user', userAuthRoutes); // User registration route
app.use('/api/reports', reportRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
