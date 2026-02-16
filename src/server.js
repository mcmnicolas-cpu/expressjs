// src/server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express(); // <-- this is essential!

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// About page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/about.html'));
});

// Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/contact.html'));
});

// Blog page
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/blog.html'));
});

// API route to get blog posts
app.get('/api/posts', (req, res) => {
  const postsPath = path.join(__dirname, '../data/posts.json'); // go up from src/ to project root
  fs.readFile(postsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Cannot read posts' });
    res.json(JSON.parse(data));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
