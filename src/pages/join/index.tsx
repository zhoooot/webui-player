// pages/game.tsx
import React from "react";
import PinInput from "./components/pinInput";
import { io } from "socket.io-client";
import { ClientPlayer } from "@/logic/client-player";

const InputPinPage: React.FC = () => {
  const handlePinSubmit = (pin: string) => {
    // Handle the submitted PIN (e.g., check it against the correct PIN).
    console.log("Submitted PIN:", pin);

    // Add your game logic here.
    const client = new ClientPlayer();
    client.sendMessage(pin);
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col justify-center align-middle">
        <div className="self-center">
          <h1>Input the Game PIN</h1>
        </div>
        <div className="self-center lg:w-2/12 md:w-4/12 xs:w-10/12">
          <PinInput onSubmit={handlePinSubmit} />
        </div>
      </div>
    </div>
  );
};

export default InputPinPage;
