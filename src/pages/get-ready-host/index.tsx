import React from "react";
import Image from "next/image";
import Image0 from "/public/images/background/spring.png";
import { motion } from "framer-motion";
const GetReadyHostPage: React.FC = () => {
    return (
        <div
        className="w-screen h-screen"
        style={
            {
                backgroundImage: `url('/images/background/spring.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        }
        >
            <div className="flex flex-col justify-items-center items-center">
                <div className="capitalize bg-white p-4 font-bold mt-24 text-6xl">get ready to join</div>
                <div className="flex flex-row w-2/5 h-5/6 p-4 bg-white mt-20 justify-between">
                    <div className="text-3xl grow ">Join at <b>www.zhoot.it</b></div>
                    <div className="text-3xl ml-2 grow">  |</div>
                    <div className="text-3xl ml-2 font-bold grow animate-blink "
                     
                    >Loading game...</div>
                </div>
            </div>

        </div>
    );
}
export default GetReadyHostPage