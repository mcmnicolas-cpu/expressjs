const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Blog route (HTML page)
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/blog.html'));
});

// API route to serve blog posts as JSON
app.get('/api/posts', (req, res) => {
  const postsPath = path.join(__dirname, '../data/posts.json');
  fs.readFile(postsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read posts' });
    }
    res.json(JSON.parse(data));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});