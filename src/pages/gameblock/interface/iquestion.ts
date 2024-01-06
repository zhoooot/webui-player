import React from 'react';

interface IQuestion {
    content: string;
    correct_ans: number;
    options: string[];
    time: number;
    allow_power: boolean;
}

export default IQuestion;
