const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => {
    console.error("MongoDB connection error ❌", err);
    process.exit(1);
  });

// Schema
const Note = mongoose.model('Note', { text: String });

// Routes

// GET all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// POST a new note
app.post('/notes', async (req, res) => {
  try {
    const note = new Note({ text: req.body.text });
    await note.save();
    res.status(201).json(note); // 201 = Created
  } catch (err) {
    console.error('Error saving note:', err);
    res.status(500).json({ error: "Failed to save note" });
  }
});

// DELETE a note by ID
app.delete('/notes/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.sendStatus(204); // No content
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ error: "Failed to delete note" });
  }
});


app.listen(process.env.PORT, () => console.log(`Server  runnign on PORT ${process.env.PORT}`));
