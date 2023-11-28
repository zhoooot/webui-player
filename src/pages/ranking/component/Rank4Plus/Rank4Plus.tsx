import React from 'react';
import Placement from './component/Placement';

interface Rank4PlusProps {
  items: string[];
}

const Rank4Plus: React.FC<Rank4PlusProps> = ({items}) => {
  return (
    <div className=" absolute bottom-4 rounded-lg items-center justify-start w-1/4 grid grid-cols-2 gap-x-5 gap-y-8 h-1/6 bg-gray-300 p-4 z-30 overflow-hidden">
      {items.map((index) => (
        <li 
          key={index}
          className='flex items-center'
        >
          <Placement />
        </li>
      ))}
    </div>
  );
};

export default Rank4Plus;
