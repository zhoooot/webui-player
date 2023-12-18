import React from 'react';
import Image from 'next/image';

interface AnswerProps {
  correctAnswer: number; // Assuming correctAnswer is a number
  isCorrect: boolean;
}

const Answer: React.FC<AnswerProps> = ({ correctAnswer, isCorrect }) => {
  return (
    <div>
      <body className="flex items-center justify-center h-screen">
        {isCorrect ? (
          <div className="p-8 flex flex-col items-center justify-center overflow-hidden">
            <b className="text-xl">Correct</b>
            <Image src="/icons/Correct.png" width={50} height={50} alt="Icon" />
            <div className="bg-gray-500 text-white text-center w-full p-2 mt-2">Great Try</div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center overflow-hidden">
            <b className="text-xl">Incorrect</b>
            <Image src="/icons/Incorrect.png" width={50} height={50} alt="Icon" />
            <div className="bg-gray-500 text-white text-center p-2 mt-2 w-full">Great Try</div>
          </div>
        )}
      </body>
    </div>
  );
};

export default Answer;