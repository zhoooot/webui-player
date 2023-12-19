import React from 'react';

interface HostResultProps {
  Correct: number[];
}

const HostResult: React.FC<HostResultProps> = ({ Correct }) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']

  return (
    <div className='absolute top-48 left-0'>
        <div className="flex flex-row items-end justify-center h-full w-screen">
        {Correct.map((number, index) => (
            <div
            key={index}
            className={`w-1/6 m-1 ${colors[index]} p-4 items-center justify-center flex flex-col`}
            style={{height: `${number * 10}px` }}
            >
            {number}
            </div>
        ))}
        </div>
    </div>
  );
};

export default HostResult;