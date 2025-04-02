import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState("");

    const fetchNotes = async () => {
        const querySnapshot = await getDocs(collection(db, "notes"));
        const notesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setNotes(notesData);
    };

    const addNote = async () => {
        if (noteText.trim() === "") return;
        await addDoc(collection(db, "notes"), { text: noteText });
        setNoteText("");
        fetchNotes();
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">📝 My Notes</h1>
            <textarea 
                className="w-full p-4 border mt-4"
                rows="2"
                placeholder="Write a note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={addNote}>
                Add Note
            </button>

            <div className="mt-4 space-y-4">
                {notes.map(note => (
                    <div key={note.id} className="p-4 bg-yellow-200 rounded-lg shadow-md">
                        {note.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesPage;
