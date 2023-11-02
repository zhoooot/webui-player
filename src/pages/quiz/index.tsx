import styles from './quiz-styles.module.css'
import React, { useState } from 'react';

interface QuizData {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface QuizProps {
  quizData: QuizData;
}

const Quiz: React.FC<QuizProps> = ({ quizData }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  const { question, answers, correctAnswer } = quizData;

  return (
    <div className={styles['quiz-container']}>
      <h1>{question}</h1>
      <ul>
        {answers.map((answer, index) => (
          <li
            key={index}
            onClick={() => handleAnswerClick(index)}
            style={{
              backgroundColor: index === selectedAnswer ? 'lightblue' : 'white',
              cursor: 'pointer',
            }}
          >
            {answer}
          </li>
        ))}
      </ul>
      {selectedAnswer !== null && selectedAnswer === correctAnswer && (
        <p>Correct!</p>
      )}
    </div>
  );
};

export {Quiz};