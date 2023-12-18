import React, { useState, useEffect } from 'react';
import TimeBar from './components/mini_components/timeBar';
import Phase2 from './components/phase_host_2';
import Phase3 from './components/phase_host_3';

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

const Quizzes_Host = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [Phase, setPhase] = useState(0);

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
            <Phase2
              onComplete={() => {
                setPhase(2);
              }}
              duration={5}
              quizData={quizData[currentQuestion]}/>
          </>
          )}

          {/*Phase 3*/}
          {Phase === 2 && (
            <div>
              <Phase3
                onComplete={() => {
                  setPhase(0);
                  setCurrentQuestion(currentQuestion + 1);
                }}
                duration={5}
                quizData={quizData[currentQuestion]}
                quizResult={[4,3,2,5]}/>
            </div>
            
          )}
        </div>
      )}
    </div>
  );
};

export default Quizzes_Host;