// require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const foodtruckRoutes = require('./routes/FTRoutes');
const truckRoutes = require("./routes/truckRoutes");
const menuRoutes = require("./routes/menuRoutes");

// Routing
app.use('/api', authRoutes);         // /api/register, /api/login
app.use('/api/users', userRoutes);   // /api/users
app.use('/api/foodtrucks', foodtruckRoutes); // /api/foodtrucks
app.use("/api/truck", truckRoutes);
app.use("/api/menu", menuRoutes);

// Root
app.get('/', (req, res) => res.send('FoodTruck API running ✅'));

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
