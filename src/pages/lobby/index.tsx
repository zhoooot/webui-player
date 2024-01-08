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

let first_question = {
  content: "",
  answers: [""],
  correctAnswer: 0,
  time: 0,
  permit: false,
};

const players = ['name', 'name'];
const Lobby = () => {
  const [isNew, setIsNew] = useState("");
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 1000);

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

  useEffect(() => {


    socket?.on("join", (message: any) => {
      console.log("Join event received", message);
      setPlayers([...players, message.username]);
      setIsNew(message.username);
    });
    socket?.on("host", (message: any) => {
      // console.log('Host event received', message)
      if (message.question === undefined) {
        console.log("Question is undefined");
        return;
      }

      console.log(message);
      console.log(message.question.answers);
      try {
        let answers_list: string[] = [];
        for (let i = 0; i < message.question.answers.length; i++) {
          let answer = message.question.answers[i].content;
          answers_list.push(answer);
        }
        first_question = {
          content: message.question.content,
          answers: answers_list,
          correctAnswer: message.question.correct_answer,
          time: message.question.time,
          permit: message.question.allow_power,
        };
        console.log("Host event received", first_question);
      } catch (error) {
        console.log(error);
      }
    });
  });

  const pin = (router.query.pin as string) || "";
  if (typeof window !== "undefined") {
    localStorage.setItem("hostpin", router.query.pin as string);
  }

  const handleStart = () => {
    if (socket) {
      socket.emit("start", {
        room: router.query.pin as string,
      });
      console.log("Sending the first question to the host", first_question);
      router.replace({
        pathname: "../gameblock/host/",
        query: {
          content: first_question.content,
          time: first_question.time,
          allow_power: first_question.permit,
          answers: first_question.answers,
          correct_answer: first_question.correctAnswer,
        },
      });
    } else {
      console.log("Socket is null");
    }
  };
  const onClickRemove = (index: number) => {
    const userRespose = window.confirm("Are you sure you want to remove this player?");
    if (userRespose) {
      setIsNew("");

      const newPlayers = players.filter((_, i) => i !== index);

      // Update the players state with the new array
      setPlayers(newPlayers);
    }

  }
  return (
    <div className="bg-base-200 flex  flex-col h-screen justify-start items-center">
      {/* Headline*/}
      <div className="flex flex-row justify-between mt-4 items-center gap-2">
        <Ad />
        <Pin pin={pin} />
        <div className="flex flex-col items-center justify-between h-full w-36 gap-3">
          <div className="flex flex-row justify-between h-full w-full gap-2">
            <PlayerCount count={players.length} />
            <Setting onClick={() => { }} />
          </div>
          <Start onClick={handleStart} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-row p-4 justify-center items-start mt-10 w-11/12">
        {players.map((player, index) => (
          <Player key={player} name={player} new_member={isNew} onClick1={() => onClickRemove(index)} index={index} />
        ))}

      </div>
    </div>
  );
};

export default Lobby;
