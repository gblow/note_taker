const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/utils');
const { json } = require('express');


// Api GET route for retreieving all notes
notes.get('/', (req, res) =>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Api POST route to post a new tip
notes.post('/', (req, res) =>{
    const {title, text} =  req.body;
    console.log(req.body)

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note Added')
    }else {
        res.json('Error in adding note please try again')
    }
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        console.log(noteId)
        const filteredJSON = json.filter((note) => note.id !== noteId);

        writeToFile('./db/db.json', filteredJSON);

        res.json("Note Has been removed")
    });
});

module.exports = notes


