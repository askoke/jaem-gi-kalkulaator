const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let sum

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'), {
    sum: req.query.sum
  })
})

app.post('/', (req, res) => {
  const prices = req.body.price.map(p => parseFloat(p));
  const state = req.body.State;
  const pre_discount = parseInt(req.body.Discount);
  const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);
  let state_tax

  if (state == 'California' || state == 'Alaska') {
    state_tax = 7.25
  } else if (state == 'Ohio') {
    state_tax = 5.75
  } else if (state == 'Oklahoma') {
    state_tax = 4.50
  } else if (state == 'Texas') {
    state_tax = 6.25
  }

  let full_price = Math.round(((((100 + state_tax) * totalPrice) / 100) + Number.EPSILON) * 100) / 100

  if (pre_discount > 0) {
    sum = Math.round(((((100 - pre_discount) * full_price) / 100) + Number.EPSILON) * 100) / 100;
  } else {
    sum = full_price;
  }

  res.redirect(`/?sum=${sum}`)
})

app.listen(3040, () => {
  console.log('http://localhost:3040/');
});