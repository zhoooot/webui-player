import React from 'react';
import Quiz from './mini_components/quiz_host_1';
import Next from './mini_components/next_button';

interface QuizData {
    content: string;
    answers: string[];
    correctAnswer: number;
    time: number;
    permit: boolean;
  }

interface Phase3Props {
  next: () => void;
  duration: number; 
  quizData: QuizData;
  quizResult: number[];
}

const Phase3: React.FC<Phase3Props> = ({ next, duration, quizData, quizResult }) => {
  return (
    <div>
      
      <Quiz quizData={quizData} quizResult={quizResult} next={next} />
    </div>
  );
};

export default Phase3;
