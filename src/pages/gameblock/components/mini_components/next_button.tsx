import React from 'react';

type NextProps = {
    onClick: () => void;
};

const Next: React.FC<NextProps> = ({ onClick }) => {
    return (
        <button className='absolute text-purple-700 top-20 right-10 rounded-full bg-white hover:bg-gray-100 pt-2 pb-2 pr-8 pl-8 text-lg z-10' onClick={onClick}>
            Next
        </button>
    );
};

export default Next;
