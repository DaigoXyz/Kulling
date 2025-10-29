let foodtrucks = [
  { id: 1, name: 'Burger Bros', location: 'Jakarta', menu: ['Burger', 'Fries'] },
  { id: 2, name: 'Taco Town', location: 'Depok', menu: ['Taco', 'Nachos'] }
];

exports.getFoodTrucks = (req, res) => {
  res.json(foodtrucks);
};
