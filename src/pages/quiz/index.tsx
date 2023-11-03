import styles from './quiz-styles.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import React, { useState, useEffect } from 'react';

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
      <div className={styles['pie-timer']}>
        <CountdownCircleTimer
          isPlaying
          duration={60}
          size={50}
          strokeWidth={10}
          colors={'#FF0000'}
        >
          {({ remainingTime }) => (
            <div className={styles['timer-content']}>
              <div className={styles['timer-number']}>
                {remainingTime}
              </div>
            </div>
          )}
        </CountdownCircleTimer>
      </div>
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
            {index}.  {answer}
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