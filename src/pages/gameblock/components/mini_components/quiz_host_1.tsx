import React, { useState } from 'react';
import PlayerBar from './playerbar';
import Image from 'next/image';
import Svg1 from '/public/images/answers/triangle.svg';
import Svg2 from '/public/images/answers/diamond.svg';
import Svg3 from '/public/images/answers/circle.svg';
import Svg4 from '/public/images/answers/square.svg';
import QuizTypes from 'public/images/quiz_types.svg';

interface QuizData {
    question: string;
    answers: string[];
    correctAnswer: number;
}

interface QuizProps {
    quizData: QuizData;
}
const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']

const Quiz: React.FC<QuizProps> = ({ quizData }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    // Array of SVGs
    const svgs = [Svg1, Svg2, Svg3, Svg4];

    // Check if quizData is defined before destructuring its properties
    if (!quizData) {
        return null;
    }

    const { question, answers, correctAnswer } = quizData;



    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <div className='absolute top-0 left-0 right-0 m-2 '>
                <div className='flex flex-col self-center items-center h-full justify-center '>
                    <Image src={QuizTypes} alt="Quiz Types" width={200} height={200} className='ml-2 mt-2 items-center' />
                </div>

            </div>
            <div className='absolute top-0 left-0 right-0 bottom-0 m-2  '>
                <div className='flex flex-col self-center items-center h-full justify-center '>
                    <div className='font-bold text-4xl text-center p-4 align-middle flex items-center bg-white'>
                        {question}
                    </div>
                </div>
            </div>
            <div className='absolute bottom-4 left-0'>
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

    );
};

export default Quiz;