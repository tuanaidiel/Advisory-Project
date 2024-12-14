const express = require('express');
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'laravel_test'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database.');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.set('views', './views');

function isAdmin(req, res, next) {
  if (req.session.role_type === 'a') {
    return next();
  }
  res.redirect('/login');
}

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        req.session.user_id = results[0].id;
        req.session.role_type = results[0].role_type;
        if (results[0].role_type === 'a') {
          res.redirect('/admin/listings');
        } else {
          res.send('Access restricted for non-admin users.');
        }
      } else {
        res.send('Invalid credentials.');
      }
    }
  );
});

app.get('/admin/listings', isAdmin, (req, res) => {
  db.query('SELECT * FROM listings', (err, results) => {
    if (err) throw err;
    res.render('listings', { listings: results });
  });
});

app.post('/admin/listings/add', isAdmin, (req, res) => {
  const { name, latitude, longitude } = req.body;
  db.query(
    'INSERT INTO listings (name, latitude, longitude, user_id) VALUES (?, ?, ?, ?)',
    [name, latitude, longitude, req.session.user_id],
    (err) => {
      if (err) throw err;
      res.redirect('/admin/listings');
    }
  );
});

app.post('/admin/listings/edit', isAdmin, (req, res) => {
  const { id, name, latitude, longitude } = req.body;
  db.query(
    'UPDATE listings SET name = ?, latitude = ?, longitude = ? WHERE id = ?',
    [name, latitude, longitude, id],
    (err) => {
      if (err) throw err;
      res.redirect('/admin/listings');
    }
  );
});

app.post('/admin/listings/delete', isAdmin, (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM listings WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/admin/listings');
  });
});

app.use('/auth', authRoutes);
app.use('/listing', listingRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
