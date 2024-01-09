import router from "next/router";
import React, { useEffect, useState } from "react";
import { Player } from "@/logic/player";
import { ClientPlayer } from "@/logic/client-player";
import { Socket } from "socket.io-client";

interface PlayerProps {
  index: number;
  name: string;
}

const PlayerBar: React.FC<PlayerProps> = ({ index, name }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleClick = () => {
    console.log("Button clicked");

    if (index == 0) {
      const userResponse = window.confirm(
        "You have not chosen any power-ups. Want to skip?"
      );
      if (userResponse) {
        if (socket)
          socket.emit("join", {
            room: localStorage.getItem("pin"),
            username: localStorage.getItem("username"),
          });
          
          router.push("../get-ready");
      }
    }
  };

  useEffect(() => {
    const newSocket = Player.getPlayerClient().socketClient;
    setSocket(newSocket);
    return () => {
      if (socket) socket.close();
    };
  }, []);

  return (
    <div className="bg-white w-screen item-center flex flex-row absolute bottom-0 left-0 p-2 ">
      <div className="avatar">
        <div className="w-16 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="ml-4 self-center font-bold">{name}</div>

      <div className="absolute right-0  flex flex-row self-center">
        <div className="rounded-md bg-gray-600 p-2 pl-4 pr-4 self-end text-white text-1xl font-bold ">
          {index}
        </div>

        <button
          onClick={handleClick}
          className="p-2 self-end ml-4 mr-4 bg-indigo-500 text-1xl hover:bg-indigo-700 text-white font-bold rounded-md"
        >
          Play game!
        </button>
      </div>
    </div>
  );
};

export default PlayerBar;
