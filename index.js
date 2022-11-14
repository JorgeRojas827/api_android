const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'b9qxen1yv5fabvjltxbj-mysql.services.clever-cloud.com',
  database: 'b9qxen1yv5fabvjltxbj',
  user: 'ujafn0e96awm1bsp',
  password: 'x04noo3kkURWzlzy7b7P',
  port: 3306,
});

app.post('/iniciosesion', (req, res) => {
  const { usuario, clave } = req.body;

  if (usuario && clave) {
    connection.query(
      'SELECT * FROM iniciosesion WHERE usuario = ? AND clave = ?',
      [usuario, clave],
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.send('-1');
        } else {
          res.send({
            result,
          });
        }
      }
    );
  } else {
    res.send('-1');
  }
});

app.get('/casas', (req, res) => {
  connection.query('SELECT * FROM casas', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server up!');
});
