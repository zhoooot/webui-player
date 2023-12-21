import router from 'next/router';
import React from 'react';

interface PlayerBarProps {
    point: number;
    name:string;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ point, name}) => {
    

    return (
        <div className='bg-white w-screen item-center flex flex-row p-2 mt-2'>
            <div className="avatar ml-2">
                <div className="w-16 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className='ml-4 self-center font-bold'>{name}</div>

            <div className='absolute right-0  flex flex-row self-center'>
                <div className='rounded-md bg-gray-600 p-2 self-end text-white text-1xl font-bold '>
                    {point}
                </div>
            </div>
        </div>
    );
};

export default PlayerBar;