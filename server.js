require('dotenv').config();
const express = require('express');
const userRoute = require('./src/routes/user_route');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/user', userRoute);
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
