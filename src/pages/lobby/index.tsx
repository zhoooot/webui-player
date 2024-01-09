import React, { useEffect, useState, useRef } from "react";
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
import Image from "next/image";
import Image0 from "/public/icons/random.png";
import Image1 from "/public/images/background/spring.png";
import Image2 from "/public/images/background/summer.png";
import Image3 from "/public/images/background/autumn.jpeg";
import Image4 from "/public/images/background/winter.jpeg";

let first_question = {
  content: "",
  answers: [""],
  correctAnswer: 0,
  time: 0,
  permit: false,
};

const players = ["name", "name"];
const Lobby = () => {
  const [isNew, setIsNew] = useState("");
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [background, setBackground] = useState(0);
  const musicTitles = [
    "Is It Over Now?",
    "The Great War",
    "End Game",
    "Born To Die",
  ];
  const [musicTitle, setMusicTitle] = useState(musicTitles[0]);
  const [audioSrc, setAudioSrc] = useState("/music/is-it-over-now.mp3");
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMusicTitle(e.target.value);
  };
  useEffect(() => {
    switch (musicTitle) {
      case "Is It Over Now?":
        setAudioSrc("/music/is-it-over-now.mp3");
        break;
      case "The Great War":
        setAudioSrc("/music/the-great-war.mp3");
        break;
      case "End Game":
        setAudioSrc("/music/end-game.mp3");
        break;
      case "Born To Die":
        setAudioSrc("/music/born-to-die.mp3");
        break;
      default:
        setAudioSrc("/music/is-it-over-now.mp3");
    }
  }, [musicTitle]);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
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
    const userRespose = window.confirm(
      "Are you sure you want to remove this player?"
    );
    if (userRespose) {
      setIsNew("");

      const newPlayers = players.filter((_, i) => i !== index);

      // Update the players state with the new array
      setPlayers(newPlayers);
    }
  };
  return (
    <div className="flex flex-row">
      <audio autoPlay loop src={audioSrc} />;
      <div
        className="flex grow flex-col h-screen justify-start items-center"
        style={
          background == 0
            ? {
                backgroundImage: `url('/images/background/spring.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : background == 1
            ? {
                backgroundImage: `url('/images/background/summer.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : background == 2
            ? {
                backgroundImage: `url('/images/background/autumn.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : background == 3
            ? {
                backgroundImage: `url('/images/background/winter.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { backgroundImage: `url('/images/background/spring.png')` }
        }
      >
        {/* Headline*/}
        <div className="flex flex-row justify-between mt-4 items-center gap-2">
          <Ad />
          <Pin pin={pin} />
          <div className="flex flex-col items-center justify-between h-full w-36 gap-3">
            <div className="flex flex-row justify-between h-full w-full gap-2">
              <PlayerCount count={players.length} />
              <Setting
                onClick={() => {
                  setSidebarVisible(!isSidebarVisible);
                }}
              />
            </div>
            <Start onClick={handleStart} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-row p-4 justify-center items-start mt-10 w-11/12">
          {players.map((player, index) => (
            <Player
              key={player}
              name={player}
              new_member={isNew}
              onClick1={() => onClickRemove(index)}
              index={index}
            />
          ))}
        </div>
      </div>
      <div>
        {isSidebarVisible && (
          <div className="w-96 p-5">
            <div className="font-bold text-2xl text-left">Settings</div>
            <div className="font-bold text-2xl mt-5 mb-2">Hosting</div>
            <span className="flex flex-row">
              <Image
                src={Image0}
                alt="SVG Icon"
                className="mr-2"
                width={20}
                height={20}
              />
              <span className="text-base font-semibold grow">
                Randomize order of answers
              </span>
              <input
                type="checkbox"
                className=" toggle toggle-success"
                onChange={() => {
                  console.log("shutthefukup");
                }}
              />
            </span>
            <div className="font-bold text-2xl mt-5 mb-2">Theme</div>
            <div className="grid overflow-x-scroll p-2">
              <div className="flex flex-row gap-2 ">
                <div
                  className="w-40  rounded-lg bg-yellow-100 hover:ring-4 ring-purple-400"
                  onClick={() => {
                    setBackground(0);
                  }}
                >
                  <Image
                    src={Image1}
                    alt="spring"
                    className="h-24 rounded-tl-lg rounded-tr-lg"
                  />
                  <div className="p-1 text-center tracking-wide">Spring</div>
                </div>
                <div
                  className="w-40  rounded-lg bg-blue-100 hover:ring-4 ring-purple-400 "
                  onClick={() => {
                    setBackground(1);
                  }}
                >
                  <Image
                    src={Image2}
                    alt="summer"
                    className="h-24 rounded-tl-lg rounded-tr-lg"
                  />
                  <div className="p-1 text-center tracking-wide">Summer</div>
                </div>
                <div
                  className="w-40  rounded-lg bg-red-100 hover:ring-4 ring-purple-400"
                  onClick={() => {
                    setBackground(2);
                  }}
                >
                  <Image
                    src={Image3}
                    alt="autumn"
                    className="h-24 rounded-tl-lg rounded-tr-lg"
                  />
                  <div className="p-1 text-center tracking-wide">Autumn</div>
                </div>
                <div
                  className="w-40  rounded-lg bg-gray-200 hover:ring-4 ring-purple-400"
                  onClick={() => {
                    setBackground(3);
                  }}
                >
                  <Image
                    src={Image4}
                    alt="winter"
                    className="h-24 rounded-tl-lg rounded-tr-lg"
                  />
                  <div className="p-1 text-center tracking-wide">Winter</div>
                </div>
              </div>
            </div>
            <div className="font-bold text-2xl mt-5 mb-2">Background Music</div>

            <select
              value={musicTitle}
              onChange={handleSelectChange}
              className="w-full ring-2 ring-gray-300 rounded-lg p-2 
          hover:ring-gray-400"
            >
              {musicTitles.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
