const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const app = express();
const port = 3000;
const path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/api/auth/signup', async (req, res) => {
  try {
      const { email, username, newPassword } = req.body;

      console.log('Received signup request:', { email, username, newPassword });

      if (!newPassword) {
          res.status(400).json({ success: false, error: 'New password is required' });
          return;
      }

      const result = await pool.query(
          'INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING *',
          [email, username, newPassword] 
      );

      res.json({ success: true, user: result.rows[0] });
  } catch (error) {
      console.error('Error signing up:', error.message);
      res.status(500).json({ success: false, error: 'Error signing up' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      console.log('User not found');
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const user = result.rows[0];
    console.log('Query result:', result.rows);

    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      console.log('Password match: false');
      res.status(401).json({ success: false, error: 'Invalid password' });
      return;
    }

    console.log('Login successful');
    const token = jwt.sign({ userId: user.id, username: user.username }, 'yourSecretKey', {
      expiresIn: '1h',
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ success: false, error: 'Error logging in' });
  }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/api/users/add', async (req, res) => {
  try {
      const { email, username, newPassword } = req.body;

      const result = await pool.query(
          'INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING *',
          [email, username, newPassword]
      );

      res.json({ success: true, user: result.rows[0] });
  } catch (error) {
      console.error('Error adding user:', error.message);
      res.status(500).json({ success: false, error: 'Error adding user' });
  }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
