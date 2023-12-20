import router from 'next/router';
import React from 'react';

interface PlayerProps {
    index: number;
}

const PlayerBar: React.FC<PlayerProps> = ({ index }) => {
    const handleClick = () => {
        console.log('Button clicked');
        // router.push('../join/get_ready');

    };

    return (
        <div className='bg-white w-screen item-center flex flex-row absolute bottom-0 left-0 p-2 '>
            <div className="avatar">
                <div className="w-16 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className='ml-4 self-center font-bold'>Shut the fuck up</div>

            <div className='absolute right-0  flex flex-row self-center'>
                <div className='rounded-md bg-gray-600 p-2 self-end text-white text-1xl font-bold '>
                    {index}
                </div>

                <button onClick={handleClick} className='p-2 self-end ml-4 bg-gray-600 text-1xl hover:bg-gray-900 text-white font-bold rounded-md'>
                    Play game!
                </button>
            </div>
        </div>
    );
};

export default PlayerBar;