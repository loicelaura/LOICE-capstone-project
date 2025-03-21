import React, { useState } from 'react';
import { auth } from "../firebase"; // Use "../" to go up one level
import { createUserWithEmailAndPassword } from 'firebase/auth'; 

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User signed up successfully
      console.log('User signed up!');
    } catch (err) {
      setError(err.message);
      console.error('Signup error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}className="w-full p-2 border rounded"
      />
      <button type="submit"className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded">Sign Up</button>
    </form>
  );
}

export default SignupForm;