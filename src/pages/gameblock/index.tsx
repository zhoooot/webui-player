import React, { useState, useEffect } from 'react';
import Quiz from './components/quiz';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Waiting } from './components/waiting';
import { useRouter } from 'next/router';
import Answer from './components/answer';

const quizData: string | any[] = [
  {question: "What is the capital of France?",
  answers: ["Paris", "London", "Berlin", "Madrid"],
  correctAnswer: 1,},
  {question: "What is the ?",
  answers: ["aaaa", "don", "bbb", "ssss"],
  correctAnswer: 2,},
  {question: "What is the capital of Germany?",
  answers: ["Berlin", "Paris", "London", "Madrid"],
  correctAnswer: 3,},
  {question: "What is the capital of Spain?",
  answers: ["Madrid", "Paris", "London", "Berlin"],
  correctAnswer: 0,},
  {question: "What is the capital of UK?",
  answers: ["London", "Paris", "Berlin", "Madrid"],
  correctAnswer: 1,}
];

const Quizzes = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [remainingTime, setRemainingTime] = useState(5);
  const [selected, setSelected] = useState(false);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // Add a timer key state
  const [quizResults, setQuizResults] = useState<number | null>(null);

  const handleAnswerSelect = (selectedAnswer: number | null) => {
    setSelected(true);
    setQuizResults(selectedAnswer);
  };

  useEffect(() => {
    if (displayAnswer) {
      setTimerKey(prevKey => prevKey + 1); // Change the timer key to reset the timer
    }
  }, [displayAnswer]);

  return (
    <div>
      {currentQuestion < quizData.length && (
        <div key={currentQuestion}>
          <div className="absolute top-10 left-10">
            <CountdownCircleTimer
              key={timerKey} // Set the timer key to reset the timer
              isPlaying
              duration={remainingTime}
              size={50}
              strokeWidth={10}
              colors={'#A30000'}
              onComplete={() => {
                if (displayAnswer)
                {
                  setSelected(false);
                  setDisplayAnswer(false);
                  setCurrentQuestion(currentQuestion + 1);
                }
                else
                {
                  setDisplayAnswer(true);
                }
              }}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>

          {displayAnswer ? <Answer {...{
                    correctAnswer: quizData[currentQuestion].correctAnswer,
                    isCorrect: selected && (quizData[currentQuestion].correctAnswer === quizResults),
                  }} /> : (selected ? <Waiting/> : <Quiz quizData={quizData[currentQuestion]} onAnswerSelect={handleAnswerSelect}/>)}
        </div>
      )}
    </div>
  );
};

export default Quizzes;
