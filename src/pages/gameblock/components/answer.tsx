// components/Answer.js
import React, { useState } from 'react';

interface AnswerProps {
  question: string;
  answers: string[];
  correctAnswer: number;
  selectedAnswer: number | null; 
}

const Answer: React.FC<AnswerProps> = ({ question, answers, correctAnswer, selectedAnswer }) => {
  return (
    <div className="absolute bottom-1 border-2 w-screen border-gray-600 p-7 rounded-lg bg-gray-200 quiz-container">
      <h1 className="ml-4 mt-2">{question}</h1>
      <ul className="grid grid-cols-2 gap-4 answer-grid">
        {answers.map((answer, index) => (
          <li
            key={index}
            style={{
              backgroundColor: index === selectedAnswer ? (index === correctAnswer ? 'green' : 'red') : (index === correctAnswer ? 'green' : 'white'),
              cursor: 'pointer',
            }}
            
            className="p-6 m-4 bg-blue-900 cursor-pointer border border-gray-300 rounded-md hover:bg-red-300"
          >
            {index}. {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export {Answer};