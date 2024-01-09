// pages/game.tsx
import React, { useEffect, useState } from "react";
import PinInput from "./components/pinInput";
import Image from "next/image";
import Image0 from "/public/images/app_logo.svg";
import router from "next/router";
import axios from "axios";
import { GAMEINFO_URL } from "@/config";

const InputPinPage: React.FC = () => {
  const [isValid, setIsValid] = useState(true);
  const [isExist, setIsExist] = useState(true);
  const handlePinSubmit = (pin: string) => {
    // Handle the submitted PIN (e.g., check it against the correct PIN).
    console.log("Submitted PIN:", pin);
    // router.push('/join/nameInput');
    // Add your game logic here.
    if (!pin) {
      setIsValid(false);
      return;
    } else setIsValid(true);

    // when submit button is onclick, move to page lobby
    axios
      .get(`${GAMEINFO_URL}/api/game/check/${pin}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          router.push({
            pathname: "../join/nameInput",
            query: { pin: pin },
          });
        } else {
          alert("Wrong pin");
          setIsExist(false);
        }
      })
      .catch((err) => {
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
      {!isValid ? (
        <>
          <div className="absolute bottom-0 w-full h-16 bg-red-500">
            <div className="font-bold text-white text-lg p-4 text-center ">
              {" "}
              Please enter a valid pin
            </div>
          </div>
        </>
      ) : null}
      {!isExist ? (
        <>
          <div className="absolute bottom-0 w-full h-16 bg-red-500">
            <div className="font-bold text-white text-lg p-4 text-center ">
              {" "}
              The pin does not exist
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default InputPinPage;
