// Phase3.js

import React from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import HostResult from './mini_components/quiz_host_result';
import Quiz from './mini_components/quiz_host';

interface QuizData {
    question: string;
    answers: string[];
    correctAnswer: number;
  }

interface Phase3Props {
  onComplete: () => void;
  duration: number; 
  quizData: QuizData;
  quizResult: number[];
}

const Phase3: React.FC<Phase3Props> = ({ onComplete, duration, quizData, quizResult }) => {
  return (
    <div>
      <div className="absolute top-10 left-10">
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          size={50}
          strokeWidth={10}
          colors={'#A30000'}
          onComplete={() => {
            onComplete();
          }}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>

      <HostResult Correct={quizResult} />
      <Quiz quizData={quizData} />
    </div>
  );
};

export default Phase3;
