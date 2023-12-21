import React from 'react';
import PlayerBar from './playerbar';
interface LoadingProps {
    point: number;
    name: string;
    index: number;
}

const Loading: React.FC<LoadingProps> = ({ point, name, index }) => {
    return (
        <div className="mx-auto pt-4 pl-4 pr-4 w-full h-screen bg-gray-200">
            <div className='flex flex-col h-full'>
                <div className='mt-3 ml-4 self-start'>
                    <div className='bg-white w-10 h-10 rounded-full p-2 text-gray-500 font-bold text-1xl text-center'>
                        {index}
                    </div>
                </div>
                <div className='self-center flex flex-grow'>
                
                    <div className='flex flex-col items-center h-full justify-center '>
                    <div className='self-center text-2xl font-bold mb-8'>
                            Get Ready!
                            </div>
                        <div className='self-center text-white'>
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                        <div className='self-center text-2xl font-bold mt-8'>
                            Loading...
                            </div>
                    </div>
                </div>
                <div className='bg-white self-end left-0'>
                    <PlayerBar name={name} point={point} />
                </div>
            </div>
        </div>
    );
};
export default Loading;