import React, { useState, useEffect } from 'react';
import TimeBar from './components/mini_components/timeBar';
import Phase2 from './components/phase_host_2';
import Phase3 from './components/phase_host_3';
import Phase4 from './components/phase_host_4';
import router from 'next/router';

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
];

const list: string | any[] = [
  {name: "a", score: 13},
  {name: "b", score: 12},
  {name: "c", score: 35},
  {name: "d", score: 42},
  {name: "e", score: 5},
  {name: "f", score: 63},
  {name: "g", score: 7},
  {name: "h", score: 28},
  {name: "i", score: 9},
  {name: "j", score: 10},
  {name: "k", score: 113},
  {name: "l", score: 192},
  {name: "m", score: 137},
  {name: "n", score: 144},
  {name: "o", score: 115},
  {name: "p", score: 163},
];

const Quizzes_Host = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [Phase, setPhase] = useState(0);

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
              <div className='self-end w-full h-auto mb-8'>
                <div className='col items-center justify-center'>
                  <TimeBar duration={5000} onFinished={() => {
                    setPhase(1);
                  }} />
                </div>
              </div>

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
                next={() => {
                  setPhase(3);
                }}
                duration={5}
                quizData={quizData[currentQuestion]}
                quizResult={[4,3,2,5]}/>
            </div>
          )}

          {/*Phase 4*/}
          {Phase === 3 && (
            <div>
              <Phase4
                next={() => {
                  setPhase(0);
                  setCurrentQuestion(currentQuestion + 1);
                }}
                list={list}/>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Quizzes_Host;