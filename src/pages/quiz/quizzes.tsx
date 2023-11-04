import React, { useState, useEffect } from 'react';
import {Quiz} from './index';

const quizData: string | any[] = [
    {question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: 0,},
    {question: "What is the ?",
    answers: ["aaaa", "don", "bbb", "ssss"],
    correctAnswer: 3,}
];

const Quizzes = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerSelect = () => {
    // Handle the logic when an answer is selected.
    // After a delay, move to the next question.

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Handle the end of the quiz or other actions
        console.log('End of quiz');
      }
    }, 10000); // 10 seconds (10000 milliseconds)
  };

  return (
    <div>
      {currentQuestion < quizData.length && (
        <Quiz
          quizData={quizData[currentQuestion]}
          onAnswerSelect={handleAnswerSelect} // Pass the callback prop
        />
      )}
    </div>
  );
};

export {Quizzes};