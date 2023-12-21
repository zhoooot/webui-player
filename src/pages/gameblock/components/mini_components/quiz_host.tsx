import React, { useState } from 'react';

interface QuizData {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface QuizProps {
  quizData: QuizData;
}

const Quiz: React.FC<QuizProps> = ({ quizData }) => {
  // Check if quizData is defined before destructuring its properties
  if (!quizData) {
    return null;
  }

  const { question, answers, correctAnswer } = quizData;
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']

  return (
    <div className="absolute bottom-1 border-2 w-screen border-gray-600 p-7 rounded-lg bg-gray-200">
      <h1 className="ml-4 mt-2">{question}</h1>
      <ul className="grid grid-cols-2 gap-4 answer-grid">
        {answers.map((answer, index) => {
          const isCorrectAnswer = index === correctAnswer;
          const opacity = isCorrectAnswer ? 1 : 0.25; // Adjust opacity as needed

          return (
            <li
              key={index}
              style={{
                cursor: 'pointer',
                opacity: opacity,
              }}
              className={`p-6 m-4 border border-gray-300 rounded-md cursor-pointer ${colors[index]}`}
            >
              {index}. {answer}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Quiz;
