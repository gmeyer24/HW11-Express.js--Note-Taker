const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use('/api', api);


// GET Route for notes.html page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// // GET Route for api/notes page do i need this too?
// app.get('/api/notes', (req, res) =>
// res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

// GET Route for index page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// DELETE Route for note page 
app.delete('./api/notes/:id', ( req, res) =>
    res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

