// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// simple in-memory data (demo)
let foodtrucks = [
  { id: 1, name: 'Burger Bros', location: 'Jakarta', menu: ['Burger','Fries'] },
  { id: 2, name: 'Taco Town', location: 'Depok', menu: ['Taco','Nachos'] }
];

// routes
app.get('/api/foodtrucks', (req, res) => res.json(foodtrucks));
app.get('/api/foodtrucks/:id', (req, res) => {
  const f = foodtrucks.find(x => x.id === Number(req.params.id));
  if (!f) return res.status(404).json({ message: 'Not found' });
  res.json(f);
});
app.post('/api/foodtrucks', (req, res) => {
  const { name, location, menu } = req.body;
  const newItem = { id: Date.now(), name, location, menu: menu || [] };
  foodtrucks.push(newItem);
  res.status(201).json(newItem);
});
app.put('/api/foodtrucks/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = foodtrucks.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  foodtrucks[idx] = { ...foodtrucks[idx], ...req.body };
  res.json(foodtrucks[idx]);
});
app.delete('/api/foodtrucks/:id', (req, res) => {
  foodtrucks = foodtrucks.filter(x => x.id !== Number(req.params.id));
  res.json({ message: 'Deleted' });
});

app.get('/', (req, res) => res.send('FoodTruck API running'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
