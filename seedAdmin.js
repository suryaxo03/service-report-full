const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./models/Admin');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Define admin credentials
    const username = 'ssss';
    const password = '1234';  // Use a secure password

    // Check if the admin already exists
    let admin = await Admin.findOne({ username });
    if (admin) {
      console.log('Admin already exists');
    } else {
      // Create the admin user; the password will be hashed by the Admin model
      admin = new Admin({ username, password });

      await admin.save();
      console.log('Admin user created successfully');
    }

    mongoose.disconnect();
  })
  .catch(err => console.error('Error connecting to MongoDB', err));
