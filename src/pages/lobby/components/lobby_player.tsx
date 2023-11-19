import React from 'react';
import { useRouter } from 'next/router';

const Lobby = () => {
  const router = useRouter();

  const handleStart = () => {
    // Navigate to the Quizzes page after the "Start" button is pressed
    router.push('../gameblock');
  };

  const handleQuit = () => {
    // Handle the action when the "Quit" button is pressed
    router.back();
  };

  return (
    <div className='bg-yellow-100 flex flex-col h-screen justify-end items-center'>
      <div className="bg-gray-100 w-4/5 h-1/2 p-4">
        {/* List of players */}
      </div>
      <div className="absolute top-10 left-10 bg-purple-300 p-2">
        <button onClick={handleQuit} className="text-blue-500">
          Quit
        </button>
      </div>
    </div>
  );
};

export default Lobby;