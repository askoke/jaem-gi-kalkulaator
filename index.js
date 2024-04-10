const express = require('express');
const app = express();
const path = require('path')

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html')

app.use(express.static('views'))

app.get('/', (req, res) => {
    res.render('./index.html')
  })

app.listen(3040, () => {
    console.log('http://localhost:3040/');
});