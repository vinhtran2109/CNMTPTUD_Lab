const bcrypt = require('bcrypt');
const db = require('../db/mysql');

// Show login page
exports.showLogin = (req, res) => {
  res.render('login', { error: null });
};

// Handle login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.render('login', { error: 'Invalid username or password' });
    }
    
    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      return res.render('login', { error: 'Invalid username or password' });
    }
    
    // Set session
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.fullname = user.fullname;
    
    res.redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'An error occurred during login' });
  }
};

// Show register page
exports.showRegister = (req, res) => {
  res.render('register', { error: null });
};

// Handle registration
exports.register = async (req, res) => {
  const { username, password, fullname } = req.body;
  
  try {
    // Check if username already exists
    const [existing] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (existing.length > 0) {
      return res.render('register', { error: 'Username already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user
    await db.query(
      'INSERT INTO users (username, password, fullname) VALUES (?, ?, ?)',
      [username, hashedPassword, fullname]
    );
    
    res.redirect('/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', { error: 'An error occurred during registration' });
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/login');
  });
};
