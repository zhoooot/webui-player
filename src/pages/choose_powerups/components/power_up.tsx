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
      className={` text-black-700 font-semibold hover:ring-primary-500 hover:ring-4 p-1 rounded-lg ${
        clicked ?'ring-4 p-1 ring-red-900' : 'bg-transparent'
      }`}
      onClick={() => onClick(index)}
    >
      <div className="h-30 w-40 justify-items-center grid">
        {/* Use the Image component correctly */}
        <Image src={imageUrl} alt={`Item ${index + 1}`} className="object-none" />
        <div className="m-1">Shut the fuk up</div>
      </div>
    </div>
  );
};

export default GridItem;