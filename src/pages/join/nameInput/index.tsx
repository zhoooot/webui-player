// pages/game.tsx
import React from "react";
import NameInput from "./components/nameInput";
import Image from "next/image";
import Image0 from "/public/images/app_logo.svg";
import router from "next/router";
import axios from "axios";

const InputNamePage: React.FC = () => {

  const handleNameSubmit = (name: string) => {
    // Handle the submitted PIN (e.g., check it against the correct PIN).
    console.log("Submitted Name:", name);

    // Add your game logic here.
    localStorage.setItem("pin", router.query.pin as string)
    localStorage.setItem("username", name);

    // push router
    router.push("../choose_powerups");

  };

  return (
      <div className="w-screen h-screen bg-purple-600 relative">
        <div className="w-auto h-auto flex flex-col justify-center top-0 left-0 right-0 bottom-0 absolute mb-20">
          <div className="self-center">
            <Image src={Image0} alt="App logo" />
          </div>
          <div className="self-center h-10 w-3/12">
            <NameInput onSubmit={handleNameSubmit} />
          </div>
        </div>
      </div>
  );
};

export default InputNamePage;
