const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('success')
  })

app.listen(3040, () => {
    console.log('http://localhost:3040/');
});