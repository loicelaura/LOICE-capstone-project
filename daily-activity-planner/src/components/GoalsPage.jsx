import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState("");

    const fetchGoals = async () => {
        const querySnapshot = await getDocs(collection(db, "goals"));
        const goalsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setGoals(goalsData);
    };

    const addGoal = async () => {
        if (newGoal.trim() === "") return;
        await addDoc(collection(db, "goals"), { title: newGoal, progress: 0 });
        setNewGoal("");
        fetchGoals(); // Refresh goals
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">🎯 My Goals</h1>
            <input 
                className="border p-2 mt-4 w-full"
                placeholder="Enter new goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={addGoal}>
                Add Goal
            </button>

            <div className="mt-4 space-y-4">
                {goals.map(goal => (
                    <div key={goal.id} className="p-4 bg-white rounded-lg shadow-md">
                        <h3 className="font-bold text-lg">{goal.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoalsPage;
