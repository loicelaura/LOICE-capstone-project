import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const JournalPage = () => {
    const [entries, setEntries] = useState([]);
    const [mood, setMood] = useState("😊");
    const [entry, setEntry] = useState("");

    const fetchEntries = async () => {
        const querySnapshot = await getDocs(collection(db, "journal"));
        const journalData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setEntries(journalData);
    };

    const addEntry = async () => {
        if (entry.trim() === "") return;
        await addDoc(collection(db, "journal"), { mood, entry, date: new Date().toISOString() });
        setEntry("");
        fetchEntries();
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">📖 Daily Journal</h1>
            <label className="font-semibold">How do you feel today? </label>
            <select className="ml-2 p-2 border rounded" value={mood} onChange={(e) => setMood(e.target.value)}>
                <option value="😊">😊 Happy</option>
                <option value="😢">😢 Sad</option>
                <option value="😠">😠 Angry</option>
                <option value="😌">😌 Calm</option>
            </select>

            <textarea 
                className="w-full p-4 border mt-4"
                rows="4"
                placeholder="Write your journal entry..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            ></textarea>

            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={addEntry}>
                Save Entry
            </button>

            <div className="mt-6">
                <h2 className="text-xl font-bold">Previous Entries</h2>
                {entries.map(entry => (
                    <div key={entry.id} className="p-4 bg-white rounded-lg shadow-md mt-2">
                        <p><strong>{entry.mood}</strong> - {entry.entry}</p>
                        <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JournalPage;
