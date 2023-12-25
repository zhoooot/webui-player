import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pin from "./components/head_line_component/pin";
import Ad from "./components/head_line_component/ad";
import Start from "./components/head_line_component/start";
import PlayerCount from "./components/head_line_component/player_count";
import Setting from "./components/head_line_component/setting";
import Player from "./components/body_component/player";
import { io } from "socket.io-client";
import { Host } from "@/logic/host";

const Lobby = () => {
  const router = useRouter();

  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    Host.client.sendMessage({ type: "join", room: "1234", username: "host" });
    setInitialized(true);
  }

  const handleStart = () => {
    Host.client.sendMessage({type: "start", room: "1234"})
    router.push("../gameblock");
  };

  const [players, setPlayers] = useState<string[]>([]);

  Host.client.socketClient.on('joinGame', (message) => {
    console.log(message)
    setPlayers((players) => [...players, message.username])
  })

  return (
    <div className="bg-yellow-100 flex flex-col h-screen justify-start items-center">
      {/* Headline*/}
      <div className="flex flex-row justify-between items-center gap-2">
        <Ad />
        <Pin pin={123456} />
        <div className="flex flex-col items-center justify-between h-full w-36 gap-3">
          <div className="flex flex-row justify-between h-full w-full gap-2">
            <PlayerCount count={players.length} />
            <Setting onClick={() => {}} />
          </div>
          <Start onClick={handleStart} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-wrap p-4 gap-3 justify-center items-start bg-gray-500 mt-10 w-11/12">
        {players.map((player) => (
          <Player key={player} name={player} />
        ))}
      </div>
    </div>
  );
};

export default Lobby;
