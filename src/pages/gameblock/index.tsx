import React, { useState, useEffect } from 'react';
import Quiz from './components/mini_components/quiz_player';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Loading from './components/mini_components/waiting';
import TimeBar from './components/mini_components/timeBar';
import Answer from './components/mini_components/quiz_player_result';
import PlayerBar from './components/mini_components/playerbar';
import router from 'next/router';

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


  useEffect(() => {
    if (currentQuestion >= quizData.length) {
      router.push('/gameover'); // replace '/new-route' with the path you want to navigate to
    }
  }, [currentQuestion]);
  return (
    <div>
      {currentQuestion < quizData.length && (
        <div key={currentQuestion}>
          {/*Phase 1*/}
          {Phase === 0 && (
            <div className='flex flex-col items-center justify-center w-screen h-screen bg-gray-200'>
              <div className='font-bold text-4xl text-center h-full align-middle flex items-center'>
                {quizData[currentQuestion].question}
              </div>
              <div className='self-end w-full h-auto'>
                <div className='col items-center justify-center'>
                  <TimeBar duration={5000} onFinished={() => {
                    setPhase(1);
                  }} />
                  <PlayerBar point={2222} name="Player 1" />
                </div>
              </div>

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
                <Loading point={2222} name={'shut the fuk up'} index={currentQuestion} />

              ) :
                (
                  <Quiz
                    quizData={quizData[currentQuestion]}
                    onAnswerSelect={handleAnswerSelect}
                  />
                )
              }
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
                    setCurrentQuestion(currentQuestion+1);
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
                plusPoint={(selected &&
                  quizData[currentQuestion].correctAnswer === quizResults
                ) ? 100 : 0}
              />
            </div>

          )}
        </div>
      )}
                  
    </div>
  );
};

export default Quizzes_Player;