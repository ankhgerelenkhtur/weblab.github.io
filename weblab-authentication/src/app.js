const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const pool = require('./db');  
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/public')); 

app.post('/api/auth/signup', async (req, res) => {
    try {
      const { email, username, newPassword } = req.body;
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      const result = await pool.query(
        'INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING *',
        [email, username, hashedPassword]
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
        res.status(401).json({ success: false, error: 'Invalid credentials' });
        return;
      }
  
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
        return;
      }
  
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
