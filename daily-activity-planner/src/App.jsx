import { useState, useEffect } from 'react'; // Import useEffect
import './App.css';
import './index.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { auth } from './firebase'; // Import auth

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {user ? (
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <p className="text-center text-lg font-semibold mb-4">
            Logged in as: {user.email}
          </p>
          <div className="flex justify-center mb-6">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => auth.signOut()}
            >
              Logout
            </button>
          </div>
          <div className="flex justify-center">
            <TaskForm />
          </div>
          <div className="mt-8">
            <TaskList />
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md space-y-4">
          <div className="flex justify-center space-x-4">
            <LoginForm />
            <SignupForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;