const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON and urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// PostgreSQL client setup
const client = new Client({
  user: 'ankhaa',
  host: 'localhost',
  database: 'ankhaa',
  password: '12345678',
  port: 5432,
});

// Connect to PostgreSQL
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((error) => {
    console.error('Error connecting to the PostgreSQL database:', error.message);
  });

app.post('/signup', async (req, res) => {
    try {
        const { email, newUsername, newPassword } = req.body;

        const result = await client.query(
            'INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING *',
            [email, newUsername, newPassword]
        );

        res.json({ success: true, user: result.rows[0] });
    } catch (error) {
        console.error('Error signing up:', error.message);
        res.status(500).json({ success: false, error: 'Error signing up' });
    }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await client.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ success: false, error: 'Error logging in' });
  }
});
process.on('SIGINT', () => {
    client.end();
    process.exit();
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });