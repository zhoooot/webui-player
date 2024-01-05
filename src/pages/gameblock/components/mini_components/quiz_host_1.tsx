import React, { useState } from 'react';
import PlayerBar from './playerbar';
import Image from 'next/image';
import Svg1 from '/public/images/answers/triangle.svg';
import Svg2 from '/public/images/answers/diamond.svg';
import Svg3 from '/public/images/answers/circle.svg';
import Svg4 from '/public/images/answers/square.svg';
import QuizTypes from 'public/images/quiz_types.svg';
import HostResult from './quiz_host_result';
import Next from './next_button';

interface QuizData {
    content: string;
    answers: string[];
    correctAnswer: number;
    time: number;
    permit: boolean;
}

interface QuizProps {
    quizData: QuizData;
    quizResult: number[];
    next: () => void;

}
const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']

const Quiz: React.FC<QuizProps> = ({ quizData, quizResult, next}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    // Array of SVGs
    const svgs = [Svg1, Svg2, Svg3, Svg4];

    // Check if quizData is defined before destructuring its properties
    if (!quizData) {
        return null;
    }

    const { content, answers, correctAnswer, time, permit } = quizData;
    


    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200 overflow-hidden">
            <div className='flex flex-col h-full w-full object-scale-down'>
                <div>
                    <Next onClick={next} />
                </div>

                <div className='mt-5'>
                    <div className='flex flex-col self-center items-center h-full justify-center'>
                        <div className='font-bold text-2xl text-center p-4 align-middle flex items-center bg-white w-2/4 break-all'>
                            fjakskekttfdddddddddddddddddddddddddddddddddfdsssssssssssssssssss
                        </div>
                    </div>
                </div>

                <HostResult Correct={quizResult} correctAnswer={correctAnswer} />
                <div className='mt-2 absolute left-0 bottom-0'>
                    <div className="w-screen p-2 rounded-lg quiz-container">
                        <ul className="grid grid-cols-2 answer-grid gap-2">
                            {answers.map((answer, index) => {
                                const isCorrectAnswer = index === correctAnswer;
                                const opacity = isCorrectAnswer ? 1 : 0.25; // Adjust opacity as needed
                                return (
                                    <li
                                        key={index}
                                        style={{
                                            cursor: 'pointer',
                                            opacity: opacity,
                                        }}
                                        className={`p-6 m-1  text-2xl font-bold text-white ${colors[index]} cursor-pointer `}
                                    >
                                        <div className='flex flex-row'>
                                            <Image src={svgs[index]} alt="SVG Icon" width={30} height={30} className='mr-2' />
                                            {answer}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Quiz;