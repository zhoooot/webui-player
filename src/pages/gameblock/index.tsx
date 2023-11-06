import React, { useState, useEffect } from 'react';
import Quiz from './components/quiz';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from './components/quiz-styles.module.css';
import { Waiting } from './components/waiting';

const quizData: string | any[] = [
  {question: "What is the capital of France?",
  answers: ["Paris", "London", "Berlin", "Madrid"],
  correctAnswer: 0,},
  {question: "What is the ?",
  answers: ["aaaa", "don", "bbb", "ssss"],
  correctAnswer: 3,},
  {question: "What is the capital of Germany?",
  answers: ["Berlin", "Paris", "London", "Madrid"],
  correctAnswer: 0,},
  {question: "What is the capital of Spain?",
  answers: ["Madrid", "Paris", "London", "Berlin"],
  correctAnswer: 0,},
  {question: "What is the capital of UK?",
  answers: ["London", "Paris", "Berlin", "Madrid"],
  correctAnswer: 0,}
];

const Quizzes = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [remainingTime, setReaminingTime] = useState<number>(5);
  const [selected, setSelected] = useState(false);

  const handleAnswerSelect = () => {
    setSelected(true);
  };

  return (
    <div>
      {currentQuestion < quizData.length && (
        <div key={currentQuestion}>
          <div className={styles["timer-container"]}>
            <CountdownCircleTimer
              isPlaying
              duration={remainingTime}
              size={50}
              strokeWidth={10}
              colors={'#A30000'}
              onComplete={() => {
                setSelected(false);
                setCurrentQuestion(currentQuestion + 1);
              }}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>
          
          {selected ? (<Waiting/>) : (<Quiz
            quizData={quizData[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
          />)}
        </div>
      )}
    </div>
  );
};

export default Quizzes;