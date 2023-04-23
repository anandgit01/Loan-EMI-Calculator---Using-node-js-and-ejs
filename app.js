const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', { monthlyPayment: 0 });
  });
  

app.post('/', (req, res) => {
  const loanAmount = parseFloat(req.body.loanAmount);
  const interestRate = parseFloat(req.body.interestRate) / 100 / 12;
  const loanTermYears = parseFloat(req.body.loanTermYears);
  const numberOfMonths = loanTermYears * 12;
  const monthlyPayment =
    (loanAmount * interestRate) /
    (1 - Math.pow(1 + interestRate, -numberOfMonths));

  res.render('index', { monthlyPayment });
});

app.listen(3000, () => console.log('Server running on port 3000'));
