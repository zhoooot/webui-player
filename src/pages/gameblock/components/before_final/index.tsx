import React from "react";
import Image from "next/image";
import Image0 from "/public/images/badges/badge.png";
import { motion } from "framer-motion";
interface RankUserProps {
  points: number;
}
const RankUser: React.FC<RankUserProps> = ({ points }) => {
  return (
    //add background image

    <motion.div
      className=" w-full h-screen 
    "
      style={{
        backgroundImage: `url('/images/background/background-classroom.svg')`,

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="self-start flex flex-col justify-center items-center p-10">
        <motion.div
          className="font-bold text-2xl self-center text-white drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black m-6 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          shut the fuk up
        </motion.div>
        <motion.div
          className="flex justify-center items-center flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div
            className="w-64 h-64  rounded-full bg-gradient-segments animate-spin-slow"
            style={{
              background:
                "conic-gradient(rgba(255, 255, 255, 0.8) 0% 6.25%, transparent 6.25% 12.5%, rgba(255, 255, 255, 0.8) 12.5% 18.75%, transparent 18.75% 25%, rgba(255, 255, 255, 0.8) 25% 31.25%, transparent 31.25% 37.5%, rgba(255, 255, 255, 0.8) 37.5% 43.75%, transparent 43.75% 50%, rgba(255, 255, 255, 0.8) 50% 56.25%, transparent 56.25% 62.5%, rgba(255, 255, 255, 0.8) 62.5% 68.75%, transparent 68.75% 75%, rgba(255, 255, 255, 0.8) 75% 81.25%, transparent 81.25% 87.5%, rgba(255, 255, 255, 0.8) 87.5% 93.75%, transparent 93.75% 100%), radial-gradient(circle, rgba(255, 255, 255, 0), transparent 100%)",
            }}
          ></div>
          <div className="z-10 flex justify-center items-center flex-col absolute">
            <Image src={Image0} alt="badge" className="scale-100 w-52 h-52" />
          </div>
        </motion.div>
        <motion.div
          className="font-bold text-xl self-center text-white drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black mt-4 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          0 points
        </motion.div>
        <motion.div
          className="font-bold text-2xl self-center text-white drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Knowledge champ!
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RankUser;
