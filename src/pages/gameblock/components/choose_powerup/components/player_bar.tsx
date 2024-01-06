import router from "next/router";
import React, { useEffect, useState } from "react";
import { Player } from "@/logic/player";
import { ClientPlayer } from "@/logic/client-player";
import { Socket } from "socket.io-client";

interface PlayerProps {
  index: number;
  name: string;
  onClick?: () => void;
}

const PlayerBar: React.FC<PlayerProps> = ({ index, name, onClick}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  

 

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
          onClick={onClick}
          className="p-2 self-end ml-4 mr-4 bg-indigo-500 text-1xl hover:bg-indigo-700 text-white font-bold rounded-md"
        >
          Choose
        </button>
      </div>
    </div>
  );
};

export default PlayerBar;
