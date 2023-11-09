// components/Answer.js
import React from 'react';

interface AnswerProps {
  correctAnswer: number; // Assuming correctAnswer is a number
  isCorrect: boolean;
}

const Answer: React.FC<AnswerProps> = ({ correctAnswer, isCorrect }) => {
  return (
    <div>
      <h1>Answer Page</h1>
      <p>Correct Answer: {correctAnswer}</p>
      {isCorrect ? <p>Your answer is correct!</p> : <p>Your answer is incorrect.</p>}
      {/* Add more details or content as needed */}
    </div>
  );
};

export default Answer;