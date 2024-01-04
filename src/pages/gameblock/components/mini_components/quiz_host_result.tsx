import React from 'react';
import Image from 'next/image';
import Svg1 from '/public/images/answers/triangle.svg';
import Svg2 from '/public/images/answers/diamond.svg';
import Svg3 from '/public/images/answers/circle.svg';
import Svg4 from '/public/images/answers/square.svg';
interface HostResultProps {
  Correct: number[];
  correctAnswer: number;
}

const HostResult: React.FC<HostResultProps> = ({ Correct, correctAnswer }) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']
    const svgs = [Svg1, Svg2, Svg3, Svg4];
  return (
    <div className='mt-32'>
        <div className="flex flex-row items-end justify-center h-full w-screen">
        {Correct && Correct.map((number, index) => (
            <div
            key={index}
            className={`w-1/12 m-2 ${colors[index]} flex flex-col items-baseline justify-end`}
            style={{height: `${number * 25}px` }}
            >
            <div className='flex flex-row items-center justify-center w-full bg-black bg-opacity-50'>
                <Image src={svgs[index]} alt="SVG Icon" width={15} height={15} className='mr-2' />
                <div className='font-bold text-white self-center text-lg'>
                {number}
                </div>
                {index === correctAnswer && (
                <div className='font-bold text-white self-center text-lg ml-2'>
                    ✓
                </div>
                )}
                </div>
            </div>
        ))}
        </div>
    </div>  );
};

export default HostResult;