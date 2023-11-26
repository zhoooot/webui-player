import React from 'react';
import Image from 'next/image';

const Podium = () => {
  return (
    <div className="flex items-end absolute h-5/6 w-1/3 bottom-0">
        {/* Second place */}
        <div className="flex flex-col items-center justify-end h-full w-full">
            <b className='bg-white pt-2 pb-2 w-full text-center'>Name</b>
            <div className="flex flex-col items-center h-screen bg-blue-300 rounded-t-lg w-full h-4/6 z-10">
                <Image className='mt-10' src="/icons/Medal2.png" width={80} height={80} alt="Icon" />
                <b>score</b>
                <p>15 out of 16</p>
            </div>
        </div>

        {/* First place */}
        <div className="flex flex-col items-center justify-end h-full w-full">
            <b className='bg-white pt-2 pb-2 w-full text-center'>Name</b>
            <div className="flex flex-col items-center h-screen bg-blue-300 rounded-t-lg w-full h-5/6 z-20 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
                <Image className='mt-10' src="/icons/Medal1.png" width={80} height={80} alt="Icon" />
                <b>score</b>
                <p>15 out of 16</p>
            </div>
        </div>

        {/* Third place */}
        <div className="flex flex-col items-center justify-end h-full w-full">
            <b className='bg-white pt-2 pb-2 w-full text-center'>Name</b>
            <div className="flex flex-col items-center h-screen bg-blue-300 rounded-t-lg w-full h-4/6 z-10">
                <Image className='mt-10' src="/icons/Medal3.png" width={80} height={80} alt="Icon" />
                <b>score</b>
                <p>15 out of 16</p>
            </div>
        </div>
    </div>
  );
};

export default Podium;





