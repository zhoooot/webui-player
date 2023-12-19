import React from 'react';

type NextProps = {
    onClick: () => void;
};

const Next: React.FC<NextProps> = ({ onClick }) => {
    return (
        <button className='absolute top-10 right-8 rounded-lg bg-blue-300 hover:bg-blue-500 p-2' onClick={onClick}>
            Next
        </button>
    );
};

export default Next;
