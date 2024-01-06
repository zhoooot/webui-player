// components/GridItem.js or components/GridItem.tsx
import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface GridItemProps {
  imageUrl: StaticImageData;
  index: number;
  onClick: (index: number) => void;
  clicked: boolean;
}

const GridItem: React.FC<GridItemProps> = ({ imageUrl, index, onClick, clicked }) => {

  return (
    <div
      className={` text-black-700 mt-24 font-semibold hover:ring-primary-500 hover:ring-4 p-4 rounded-lg ${
        clicked ?'ring-4 p-4 ring-red-900' : 'bg-transparent'
      }`}
      onClick={() => onClick(index)}
    >
      <div className="justify-items-center grid w-52 h-52">
        {/* Use the Image component correctly */}
        <Image src={imageUrl} alt={`Item ${index + 1}`} className="object-none w-44 h-44 scale-150" />
        <div className="font-bold text-xl mt-2">Shut the fuk up</div>
      </div>
    </div>
  );
};

export default GridItem;