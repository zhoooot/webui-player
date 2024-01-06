import React, { useState } from 'react';
import PlayerBar from './playerbar';
import Image from 'next/image';
import Svg1 from '/public/images/answers/triangle.svg';
import Svg2 from '/public/images/answers/diamond.svg';
import Svg3 from '/public/images/answers/circle.svg';
import Svg4 from '/public/images/answers/square.svg';
import QuizTypes from 'public/images/quiz_types.svg';

interface QuizProps {
  quizData: IQuestion | null;
  onAnswerSelect: (selectedAnswer: number | null) => void;
}
const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']

const Quiz: React.FC<QuizProps> = ({ quizData, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Array of SVGs
  const svgs = [Svg1, Svg2, Svg3, Svg4];

  // Check if quizData is defined before destructuring its properties
  if (!quizData) {
    return null;
  }

  const { content, options, correct_ans } = quizData;

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    onAnswerSelect(index);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200">
      
      <div className='absolute bottom-0 left-0'>
      <div className="w-screen p-2 rounded-lg quiz-container">
        <div className='text-center text-xl font-bold m-2 pl-4 pr-4 pt-2 pb-2 bg-white w-2/4 break-all'>Question: {question}</div>
        <ul className="grid grid-cols-2 answer-grid gap-2">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleAnswerClick(index)}
              style={{ cursor: 'pointer' }}
              className={`p-6 m-1  text-2xl font-bold text-white ${colors[index]} cursor-pointer opacity-8 hover:opacity-100`}
            >
              <div className='flex flex-row'>
                <Image src={svgs[index]} alt="SVG Icon" width={30} height={30} className='mr-2' />
                {option}
              </div>
            </li>
          ))}
        </ul>
        
      </div>
      <div className='bg-white'>
        <PlayerBar name="Player 1" point={2222} />
      </div>
      </div>
    </div>

  );
};

export default Quiz;