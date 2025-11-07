const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'img')));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const foodtruckRoutes = require('./routes/FTRoutes');
const truckRoutes = require("./routes/truckRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const bahanRoutes = require("./routes/bahanRoutes");

// Use routes
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/foodtrucks', foodtruckRoutes);
app.use("/api/truck", truckRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/bahan", bahanRoutes);

// Root
app.get('/', (req, res) => res.send('FoodTruck API running ✅'));

// Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
