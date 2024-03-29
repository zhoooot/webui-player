import React, { useState } from 'react';
import Image from 'next/image';
import Svg1 from '/public/images/answers/triangle.svg';
import Svg2 from '/public/images/answers/diamond.svg';
import Svg3 from '/public/images/answers/circle.svg';
import Svg4 from '/public/images/answers/square.svg';
import IQuestion from '../../interface/iquestion';

interface QuizData {
  content: string;
  answers: string[];
  correctAnswer: number;
  time: number;
  permit: boolean;
}

interface QuizProps {
  quizData: IQuestion | null;
}
const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']

const Quiz: React.FC<QuizProps> = ({ quizData }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Array of SVGs
  const svgs = [Svg1, Svg2, Svg3, Svg4];

  // Check if quizData is defined before destructuring its properties
  if (!quizData) {
    return <div>Oops! There&apos; nothing in here</div>;
  }

  const { content, options, correct_ans, time, allow_power } = quizData;



  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200">

      
      <div className='absolute bottom-4 left-0'>
        <div className="w-screen p-2 flex flex-col rounded-lg quiz-container">
          <div className='font-bold text-2xl self-center text-center p-4 align-middle mb-4 bg-white w-2/4 break-all'>
          {content}
        </div>
          <ul className="grid grid-cols-2 answer-grid gap-2">
            {options && options.map((option, index) => (
              <li
                key={index}
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

      </div>
    </div>

  );
};

export default Quiz;