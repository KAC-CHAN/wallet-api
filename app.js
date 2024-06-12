const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'avnadmin',
  host: 'outcoin-anicadebots-6f18.i.aivencloud.com',
  database: 'defaultdb',
  password: 'AVNS_8H7Hcaa1dDetV5l6xvm',
  port: 10760,
});

app.use(express.json());

app.post('/add-coins', (req, res) => {
  const { userId, score } = req.body;
  pool.query("UPDATE users SET coins = coins + $1 WHERE user_id = $2", [score, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error adding coins' });
    } else {
      res.send({ message: 'Coins added successfully!' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
