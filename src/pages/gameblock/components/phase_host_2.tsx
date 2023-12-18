// Phase1.js

import React, { useState } from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import Quiz from './mini_components/quiz_host';

interface QuizData {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface Phase2Props {
    onComplete: () => void;
    duration: number;
    quizData: QuizData; // Use the imported QuizData type
}

const Phase2: React.FC<Phase2Props> = ({ onComplete, duration, quizData }) => {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <div className="absolute top-10 left-10">
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          size={50}
          strokeWidth={10}
          colors={'#A30000'}
          onComplete={() => {
            setSelected(true);
            onComplete();
          }}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>

      <Quiz quizData={quizData} />
    </>
  );
};

export default Phase2;
