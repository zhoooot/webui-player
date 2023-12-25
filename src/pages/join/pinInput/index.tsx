// pages/game.tsx
import React from "react";
import PinInput from "./components/pinInput";
import { io } from "socket.io-client";
import { ClientPlayer } from "@/logic/client-player";
import Image from 'next/image';
import Image0 from '/public/images/app_logo.svg';
import router from "next/router";

const InputPinPage: React.FC = () => {
  const handlePinSubmit = (pin: string) => {
    // Handle the submitted PIN (e.g., check it against the correct PIN).
    console.log("Submitted PIN:", pin);

    // Add your game logic here.

    // when submit button is onclick, move to page lobby
    router.push('../join/nameInput');
  };

  return (
    <div className="w-screen h-screen bg-purple-600 relative">
      <div className="w-auto h-auto flex flex-col justify-center top-0 left-0 right-0 bottom-0 absolute mb-20">
        <div className="self-center">
          <Image src={Image0} alt="Picture of the author" />
          </div>
        <div className="self-center h-10 w-3/12">
          <PinInput onSubmit={handlePinSubmit} />
        </div>
      </div>
    </div>
  );
};

export default InputPinPage;
