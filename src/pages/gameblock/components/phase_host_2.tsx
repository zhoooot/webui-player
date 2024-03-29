import React, { useState } from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import Quiz from './mini_components/quiz_host';
import Next from './mini_components/next_button';
import IQuestion from '../interface/iquestion';

interface QuizData {
  content: string;
  answers: string[];
  correctAnswer: number;
  time: number;
  permit: boolean;
}

interface Phase2Props {
    onComplete: () => void;
    next: () => void;
    duration: number;
    quizData: IQuestion | null; // Use the imported QuizData type
}

const Phase2: React.FC<Phase2Props> = ({ onComplete, next, duration, quizData }) => {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <div className="absolute top-20 left-20">
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
      <Next onClick={next}></Next>
      <Quiz quizData={quizData} />
    </>
  );
};

export default Phase2;
