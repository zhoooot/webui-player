import React from 'react';
import Quiz from './mini_components/quiz_host_1';
import Next from './mini_components/next_button';

interface QuizData {
    question: string;
    answers: string[];
    correctAnswer: number;
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
      <Next onClick={next}></Next>
      <Quiz quizData={quizData} quizResult={quizResult} />
    </div>
  );
};

export default Phase3;
