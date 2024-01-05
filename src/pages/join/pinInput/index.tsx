// pages/game.tsx
import React, { useEffect } from "react";
import PinInput from "./components/pinInput";
import Image from "next/image";
import Image0 from "/public/images/app_logo.svg";
import router from "next/router";
import axios from "axios";

const InputPinPage: React.FC = () => {
  const handlePinSubmit = (pin: string) => {
    // Handle the submitted PIN (e.g., check it against the correct PIN).
    console.log("Submitted PIN:", pin);

    // Add your game logic here.


    // when submit button is onclick, move to page lobby
    axios.get(`http://192.168.137.38:8080/api/game/check/${pin}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data);
      if (res.data) {
        router.push({
          pathname: "../join/nameInput",
          query: { pin: pin },
        });
      } else {
        alert("Wrong pin");
      }
    }).catch((err) => {
      console.log(err);
    });
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
