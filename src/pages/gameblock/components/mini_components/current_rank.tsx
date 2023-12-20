import React, { useState } from 'react';

interface player {
    name: string;
    score: number;
}

type RankProps = {
    list: player[];
};

const Rank: React.FC<RankProps> = ({ list }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <button className='absolute top-10 right-24 rounded-lg bg-blue-300 hover:bg-blue-500 p-2' 
                    onClick={() => {expanded? setExpanded(false) : setExpanded(true)}}>
                Ranking
            </button>
            {expanded? 
                <div className='absolute right-0 bottom-0 w-screen h-4/5 justify-start items-center flex flex-col p-3 bg-gray-300 overflow-auto gap-1'>
                    {list.map((player, index) => (
                        <div className='flex flex-row items-center justify-around w-1/2 bg-gray-500 p-2 text-white'>
                            <div className='flex flex-row items-center'>
                                <div className='ml-2'>{player.name}</div>
                            </div>
                            <div>{player.score}</div>
                        </div>
                    ))}
                </div> : <>
                </>
            }
        </div>
    );
};

export default Rank;