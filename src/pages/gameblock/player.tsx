import React, { useState, useEffect } from 'react';
import Quiz from './components/quiz_player';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Waiting } from './components/waiting';
import Answer from './components/answer';
import TimeBar from './components/timeBar';

const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: 1,
  },
  {
    question: "What is the ?",
    answers: ["aaaa", "don", "bbb", "ssss"],
    correctAnswer: 2,
  },
  {
    question: "What is the capital of Germany?",
    answers: ["Berlin", "Paris", "London", "Madrid"],
    correctAnswer: 3,
  },
  {
    question: "What is the capital of Spain?",
    answers: ["Madrid", "Paris", "London", "Berlin"],
    correctAnswer: 0,
  },
  {
    question: "What is the capital of UK?",
    answers: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1,
  },
];

const Quizzes_Player = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [remainingTime, setRemainingTime] = useState(5);
  const [selected, setSelected] = useState(false);
  const [Phase, setPhase] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [quizResults, setQuizResults] = useState<number | null>(null);

  const handleAnswerSelect = (selectedAnswer: number | null) => {
    setSelected(true);
    setQuizResults(selectedAnswer);
  };

  useEffect(() => {
    if (Phase) {
      setTimerKey((prevKey) => prevKey + 1); // Change the timer key to reset the timer
    }
  }, [Phase]);

  return (
    <div>
      {currentQuestion < quizData.length && (
        <div key={currentQuestion}>
          {/*Phase 1*/}
          {Phase === 0 && (
            <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gray-200'>
              <b>{quizData[currentQuestion].question}</b>
              <TimeBar duration={5000} onFinished={() => {
                  setPhase(1);
                }}/>
            </div>
          )}

          {/*Phase 2*/}
          {Phase === 1 && (
            <>
            <div className="absolute top-10 left-10">
              <CountdownCircleTimer
                key={timerKey}
                isPlaying
                duration={remainingTime}
                size={50}
                strokeWidth={10}
                colors={'#A30000'}
                onComplete={() => {
                  setSelected(true);
                  setPhase(2);
                }}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>
            {selected ? (
              <Waiting />
            ) : (
              <Quiz
                quizData={quizData[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
              />
            )}
          </>
          )}

          {/*Phase 3*/}
          {Phase === 2 && (
            <div>
              <div className="absolute top-10 left-10">
              <CountdownCircleTimer
                key={timerKey}
                isPlaying
                duration={remainingTime}
                size={50}
                strokeWidth={10}
                colors={'#A30000'}
                onComplete={() => {
                  setSelected(false);
                  setPhase(0);
                }}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>
              <Answer
                correctAnswer={quizData[currentQuestion].correctAnswer}
                isCorrect={
                selected &&
                quizData[currentQuestion].correctAnswer === quizResults
              }
            />
            </div>
            
          )}
        </div>
      )}
    </div>
  );
};

export default Quizzes_Player;