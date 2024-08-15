const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/bankingSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  balance: Number,
});

const transferSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', customerSchema);
const Transfer = mongoose.model('Transfer', transferSchema);

app.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.render('home', { customers });
});

app.get('/view-customer/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const customers = await Customer.find(); // Fetch all customers for the transfer form
  res.render('view-customer', { customer, customers });
});

app.post('/transfer', async (req, res) => {
  const { from, to, amount } = req.body;
  const fromCustomer = await Customer.findById(from);
  const toCustomer = await Customer.findById(to);

  if (fromCustomer.balance >= amount) {
    fromCustomer.balance -= amount;
    toCustomer.balance += amount;
    await fromCustomer.save();
    await toCustomer.save();
    await new Transfer({ from: fromCustomer.name, to: toCustomer.name, amount }).save();
    res.redirect('/');
  } else {
    res.send('Insufficient balance!');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
