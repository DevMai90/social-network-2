const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// Initialize express. Need a variable to hold express because it is not a default part of Node.
const app = express();

// Connect Database
connectDB();

// Initialize bodyparser middleware. Allows us to get data from req.body
app.use(express.json({ extended: false }));

// Define Routes - mount route handlers from paths. A router instance is a complete middleware and routing system.
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/jobs', require('./routes/api/jobs'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
