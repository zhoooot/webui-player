import React, { useState } from 'react';

interface QuizData {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface QuizProps {
  quizData: QuizData;
  onAnswerSelect: (selectedAnswer: number | null) => void;
}

const Quiz: React.FC<QuizProps> = ({ quizData, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // dummy data for quizData

  // Check if quizData is defined before destructuring its properties
  if (!quizData) {
    return null;
  }

  const { question, answers, correctAnswer } = quizData;
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    onAnswerSelect(index);
  };

  return (
    <div className="absolute bottom-1 border-2 w-screen border-gray-600 p-7 rounded-lg bg-gray-200 quiz-container">
      <h1 className="ml-4 mt-2">{question}</h1>
      <ul className="grid grid-cols-2 gap-4 answer-grid">
        {answers.map((answer, index) => (
          <li
            key={index}
            onClick={() => handleAnswerClick(index)}
            style={{
              cursor: 'pointer',
            }}
            className={`p-6 m-4 border border-gray-300 rounded-md cursor-pointer ${colors[index]} opacity-8 hover:opacity-100`}
          >
            {index}. {answer}
          </li>
        ))}
      </ul>
      {selectedAnswer !== null && selectedAnswer === correctAnswer && (
        <p>Correct!</p>
      )}
    </div>
  );
};

export default Quiz;