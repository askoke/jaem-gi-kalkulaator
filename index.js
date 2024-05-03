const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const { disconnect } = require('process');

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
  console.log(req.body.State)

  const price = parseFloat(req.body.price);
  const state = req.body.State;
  const pre_discount = parseInt(req.body.Discount);

  let state_tax

  if(state == 'California'){
    state_tax = 7.25
  } else if(state == 'Alaska'){
    state_tax = 7.25
  } else if(state == 'Ohio'){
    state_tax = 5.75
  } else if(state == 'Oklahoma'){
    state_tax = 4.50
  } else if(state == 'Texas'){
    state_tax = 6.25
  }

  let full_price = Math.round(((((100 + state_tax) * price) / 100) + Number.EPSILON) * 100) / 100

  if(pre_discount == 0){
    sum = full_price
  } else if(pre_discount == 5){
    sum = Math.round(((((100 - 5) * full_price) / 100) + Number.EPSILON) * 100) / 100
  } else if(pre_discount == 10){
    sum = Math.round(((((100 - 10) * full_price) / 100) + Number.EPSILON) * 100) / 100
  } else if(pre_discount == 15){
    sum = Math.round(((((100 - 15) * full_price) / 100) + Number.EPSILON) * 100) / 100
  } else if(pre_discount == 20){
    sum = Math.round(((((100 - 20) * full_price) / 100) + Number.EPSILON) * 100) / 100
  }
  
  console.log(sum)
  console.log(full_price)
  console.log(state_tax)
  console.log(state)

  res.redirect(`/?sum=${sum}`)
}) 

app.listen(3040, () => {
    console.log('http://localhost:3040/');
});