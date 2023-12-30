import React from 'react';
import Image from 'next/image';
import Next from './mini_components/next_button';

interface player {
    name: string;
    score: number;
}

interface Phase4Props {
    next: () => void;
    list: player[];
}

function top5(list: player[]){
    const sortedList = list.sort((a, b) => b.score - a.score);
    const top5 = sortedList.slice(0, 5);
      
    return top5;
}

const Phase4: React.FC<Phase4Props> = ({ next, list }) => {
    list = top5(list);

    return (
        
        <div className='flex flex-col w-screen h-screen justify-start items-center flex flex-col p-3 bg-gray-300 overflow-auto gap-1'>
            <Next onClick={next}></Next>
            <div className='p-2 text-2xl font-bold bg-white mt-3'>Scoreboard</div>
            <div className='flex flex-col h-5/6 gap-1 w-1/2 justify-center'>
                {list.map((player) => (
                <div className='flex flex-row items-center justify-between w-full bg-gray-500 p-2 text-white'>
                    <div className='flex flex-row items-center'>
                        <div className='flex relative bg-gray-100 w-10 h-10'>
                            <Image src='/images/powerups/1.png' layout='fill' objectFit='contain' alt='avatar' />
                        </div>
                        
                        <div className='ml-5'>{player.name}</div>
                    </div>
                    <div className='mr-5'>{player.score}</div>
                </div>
            ))}
            </div>
            
        </div>
    );
};

export default Phase4;
