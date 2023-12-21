// Phase3.js

import React from 'react';
import Next from './mini_components/next_button';

interface player {
    name: string;
    score: number;
}

interface Phase4Props {
    next: () => void;
    list: player[];

}


const Phase4: React.FC<Phase4Props> = ({ next, list }) => {
    return (
        
        <div className='absolute right-0 bottom-0 w-screen h-full justify-start items-center flex flex-col p-3 bg-gray-300 overflow-auto gap-1'>
            <Next onClick={next}></Next>
            {list.map((player, index) => (
                <div className='flex flex-row items-center justify-around w-1/2 bg-gray-500 p-2 text-white'>
                    <div className='flex flex-row items-center'>
                        <div className='ml-2'>{player.name}</div>
                    </div>
                    <div>{player.score}</div>
                </div>
            ))}
        </div>
    );
};

export default Phase4;
