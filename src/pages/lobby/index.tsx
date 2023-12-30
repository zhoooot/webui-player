import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pin from "./components/head_line_component/pin";
import Ad from "./components/head_line_component/ad";
import Start from "./components/head_line_component/start";
import PlayerCount from "./components/head_line_component/player_count";
import Setting from "./components/head_line_component/setting";
import Player from "./components/body_component/player";
import { Socket, io } from "socket.io-client";
import { Host } from "@/logic/host";
import { ClientPlayer } from "@/logic/client-player";

const Lobby = () => {
  const router = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = Host.getHostClient().socketClient;

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      newSocket.emit("host", {
        room: router.query.pin as string,
        username: "host",
      });
    });

    setSocket(newSocket);

    return () => {
      if (socket) socket.close();
    };
  }, []);

  const [players, setPlayers] = useState<string[]>([]);

  console.log(players)

  useEffect(() => {
    socket?.on('join', (message: any) => {
      console.log('Join event received', message);
      setPlayers([...players, message.username]);
    });
  });

  const pin = (router.query.pin as string) || "";

  localStorage.setItem("hostpin", router.query.pin as string);

  const handleStart = () => {
    if (socket) {
      socket.emit("start", {
        room: router.query.pin as string,
      });
      router.replace("../gameblock/host/");
    } else {
      console.log("Socket is null");
    }
  };

  return (
    <div className="bg-yellow-100 flex flex-col h-screen justify-start items-center">
      {/* Headline*/}
      <div className="flex flex-row justify-between items-center gap-2">
        <Ad />
        <Pin pin={pin} />
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
