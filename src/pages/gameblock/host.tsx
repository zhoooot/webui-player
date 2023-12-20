import React, { useState, useEffect } from 'react';
import TimeBar from './components/mini_components/timeBar';
import Phase2 from './components/phase_host_2';
import Phase3 from './components/phase_host_3';
import Next from './components/mini_components/next_button';
import Rank from './components/mini_components/current_rank';

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

const list: string | any[] = [
  {name: "a", score: 1},
  {name: "b", score: 2},
  {name: "c", score: 3},
  {name: "d", score: 4},
  {name: "e", score: 5},
  {name: "f", score: 6},
  {name: "g", score: 7},
  {name: "h", score: 8},
  {name: "i", score: 9},
  {name: "j", score: 10},
  {name: "k", score: 11},
  {name: "l", score: 12},
  {name: "m", score: 13},
  {name: "n", score: 14},
  {name: "o", score: 15},
  {name: "p", score: 16},
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
              <Next onClick={() => {
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
              next={() => {
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
                next={() => {
                  setPhase(0);
                  setCurrentQuestion(currentQuestion + 1);
                }}
                duration={5}
                quizData={quizData[currentQuestion]}
                quizResult={[4,3,2,5]}/>
            </div>
            
          )}

          <Rank list={list}></Rank>
        </div>
      )}
    </div>
  );
};

export default Quizzes_Host;