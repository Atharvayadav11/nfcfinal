const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRoutes=require("./routes/authRoutes")
require('dotenv').config(); // 
const complaintRoutes = require('./routes/complaintRoutes');
require('dotenv').config(); // For environment variables
const complaintFetchRoutes = require('./routes/complaintFetchRoutes');
const geminiRoute=require("./routes/geminiRoute")
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', complaintRoutes);
app.use("/api", authRoutes);
app.use('/api', complaintFetchRoutes);
app.use('/api',geminiRoute)
// Error Handling Middleware
app.use(errorMiddleware);

// MongoDB connection
mongoose.connect("")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running on port ${ port }`);
});
