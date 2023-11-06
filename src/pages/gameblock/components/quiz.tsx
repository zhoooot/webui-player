import styles from './quiz-styles.module.css'
import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface QuizData {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface QuizProps {
  quizData: QuizData;
  onAnswerSelect: () => void;
}

const Quiz: React.FC<QuizProps> = ({ quizData, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // dummy data for quizData

  // Check if quizData is defined before destructuring its properties
  if (!quizData) {
    return null;
  }

  const { question, answers, correctAnswer } = quizData;

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    onAnswerSelect();
  };

  return (
    <div className={styles['quiz-container']}>
      <h1>{question}</h1>
      <ul className={styles['answer-grid']}>
        {answers.map((answer, index) => (
          <li
            key={index}
            onClick={() => handleAnswerClick(index)}
            style={{
              backgroundColor: index === selectedAnswer ? 'lightblue' : 'white',
              cursor: 'pointer',
            }}
          >
            {index}. {answer}
          </li>
        ))}
      </ul>
      {selectedAnswer !== null && selectedAnswer === correctAnswer && (
        <p>Correct!</p>
      )}
    </div>
  );
};

export default Quiz;