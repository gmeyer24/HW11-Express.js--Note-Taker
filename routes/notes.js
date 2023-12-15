const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    let notes = fs.readFileSync("./db/db.json", "utf8");
    notes = JSON.parse(notes)
    res.json(notes);
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

//  read db from file and convert to json
let notes = fs.readFileSync("./db/db.json", "utf8");
notes = JSON.parse(notes);
// push new note on to db
notes.push(newNote)
// write stringified db to file
fs.writeFileSync('./db/db.json', JSON.stringify(notes), 'utf8');

    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/:id', (req, res) => {
    let notes = fs.readFileSync("./db/db.json", "utf8");
    notes = JSON.parse(notes);
    const filteredNotes = notes.filter((note) => req.params.id !== note.id )

    fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes), 'utf8');

    res.json(`Note removed successfully`);
})

module.exports = notes;