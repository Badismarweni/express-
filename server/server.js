const express = require('express');
const app = express();

const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('Sorry, the website is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

app.use(express.static('public')); 
app.use(workingHoursMiddleware); 

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
