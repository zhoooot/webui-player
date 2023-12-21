import React from 'react';
import PlayerBar from './playerbar';
interface LoadingProps {
    point: number;
    name: string;
    index: number;
}

const Loading: React.FC<LoadingProps> = ({ point, name, index }) => {
    return (
        <div className="mx-auto  w-screen h-screen bg-gray-200">
            <div className='flex flex-col h-full'>
                
                <div className='self-center flex flex-grow'>
                
                    <div className='flex flex-col items-center h-full justify-center '>
                    
                       
                        <div className='self-center text-2xl font-bold mt-8'>
                            Genius Machine?
                            </div>
                    </div>
                </div>
                <div className='bg-white self-end'>
                    <PlayerBar name={name} point={point} />
                </div>
            </div>
        </div>
    );
};
export default Loading;