import React from 'react';
import Image from 'next/image';
import Player from '@/pages/lobby/components/body_component/player';
import PlayerBar from './playerbar';

interface AnswerProps {
  correctAnswer: number; // Assuming correctAnswer is a number
  isCorrect: boolean;
  plusPoint: number;

}

const Answer: React.FC<AnswerProps> = ({ correctAnswer, isCorrect, plusPoint }) => {
  return (
    <div>
      <body className="flex items-center justify-center h-screen">
        {isCorrect ? (
          <div className="p-8 flex flex-col items-center justify-center overflow-hidden w-3/12">
            <b className="text-xl mb-4">Correct</b>
            <Image src="/icons/Correct.png" width={50} height={50} alt="Icon" />
            <div className="bg-gray-500 text-white text-center w-full p-2 mt-4">+ {plusPoint}</div>
            <div className='absolute bottom-0 left-0'>
              <PlayerBar name="Player 1" point={0} />

            </div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center overflow-hidden w-3/12">
            <b className="text-xl mb-4">Incorrect</b>
            <Image src="/icons/Incorrect.png" width={50} height={50} alt="Icon" />
            <div className="bg-gray-500 text-white text-center p-2 mt-4 w-full">Great Try!</div>
            <div className='absolute bottom-0 left-0'>
              <PlayerBar name="Player 1" point={0} />

            </div>          </div>
        )}
      </body>
    </div>
  );
};

export default Answer;