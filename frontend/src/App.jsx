import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/notes/');
      setNotes(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch notes:", error.message);
      alert("Something went wrong while fetching notes!");
    }
  };

  const addNote = async () => {
    try {
      await axios.post('http://localhost:5000/notes', { text });
      setText('');
      fetchNotes();
    } catch (error) {
      console.error("❌ Failed to add note:", error.message);
      alert("Failed to add note!");
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("❌ Failed to delete note:", error.message);
      alert("Failed to delete note!");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>DevNoteX 📝</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write your note..."
      />
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            {note.text}
            <button onClick={() => deleteNote(note._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
