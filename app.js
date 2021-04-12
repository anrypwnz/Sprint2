const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const data = require('./static/testData');
console.log(data);
const app = express();
const PORT = 3000;

nunjucks.configure('dist', {
  autoescape: true,
  express: app
});

app.get('/', (req, res) => {
  return res.render(path.resolve(__dirname + '/dist/index.html'), data);
});

// app.get('*', (req, res) => {
//   console.log(404 + ' page')
//   res.render(path.resolve(__dirname + '/dist/404.html'));
// });

app.use(express.static('dist'));

app.get('*', function(req, res){
  res.status(404).render(path.resolve(__dirname + '/dist/404.html'));
});

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
