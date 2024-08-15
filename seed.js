const mongoose = require('mongoose');
const Customer = require('./models/customer'); // Create and export your model schema
mongoose.connect('mongodb://localhost:27017/bankingSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const customers = [
    { name: 'John Doe', email: 'john@example.com', balance: 5000 },
    { name: 'Jane Smith', email: 'jane@example.com', balance: 7000 },
    { name: 'Michael Johnson', email: 'michael@example.com', balance: 10000 },
    { name: 'Emily Davis', email: 'emily@example.com', balance: 3000 },
    { name: 'Sarah Brown', email: 'sarah@example.com', balance: 4000 },
    { name: 'David Wilson', email: 'david@example.com', balance: 2500 },
    { name: 'Laura Moore', email: 'laura@example.com', balance: 1500 },
    { name: 'James Taylor', email: 'james@example.com', balance: 12000 },
    { name: 'Olivia Harris', email: 'olivia@example.com', balance: 9000 },
    { name: 'William Martinez', email: 'william@example.com', balance: 500 }

  // Add 8 more customers...
];

Customer.insertMany(customers)
  .then(() => {
    console.log('Dummy data added');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
