const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Update existing note using: PUT "/api/notes/updatenote/:id". Login required

//The route path is /api/notes/updatenote/:id, where :id is a parameter representing the ID of the note to be updated.
router.put('/updatenote/:id', fetchuser, async (req, res) => { //It uses the HTTP method PUT to indicate that it's used for updating resources.
  try {
    const { title, description, tag } = req.body; //It extracts title, description, and tag from the request body.
    const newNote = {};
//Checks if title, description, or tag exists in the request body.
//If they exist, assigns their values to the corresponding properties in newNote.

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id); //Uses await Note.findById(req.params.id) to find the note in the database based on the provided :id parameter.

    if (!note) { //Checks if the note with the specified ID exists
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) { //Compares the user ID associated with the note to the ID of the authenticated user.
//this ensures one user modifying the other notes
      return res.status(401).send("Not Allowed");
    }

    // Use findByIdAndUpdate to update the note with the new values
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4: delete existing note using: PUT "/api/notes/deleteenote/:id". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => { //It uses the HTTP method PUT to indicate that it's used for updating resources.
  try {
    const { title, description, tag } = req.body; //It extracts title, description, and tag from the request body.
    const newNote = {};
//Checks if title, description, or tag exists in the request body.
//If they exist, assigns their values to the corresponding properties in newNote.

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id); 
    if (!note) { 
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) { //Compares the user ID associated with the note to the ID of the authenticated user.
//this ensures one user modifying the other notes
      return res.status(401).send("Not Allowed");
    }

    // Use findByIdAndUpdate to update the note with the new values
    note = await Note.findByIdAndDelete(req.params.id, { $set: newNote }, { new: true });

    res.json({sucess:"note was deleted",note:note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
