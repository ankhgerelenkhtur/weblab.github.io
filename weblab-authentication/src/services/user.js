const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config(); 

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users(email, username, password) VALUES($1, $2, $3) RETURNING *',
      [email, username, hashedPassword]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Error signing up:', error.message);
    res.status(500).json({ success: false, error: 'Error signing up' });
  }
};

const authenticateUser = async (req, res) => {
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

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ success: false, error: 'Error logging in' });
  }
};

module.exports = { registerUser, authenticateUser };
