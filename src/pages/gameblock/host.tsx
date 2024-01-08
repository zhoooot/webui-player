import React, { useState, useEffect } from "react";
import TimeBar from "./components/mini_components/timeBar";
import Phase2 from "./components/phase_host_2";
import Phase3 from "./components/phase_host_3";
import Phase4 from "./components/phase_host_4";
import router from "next/router";
import { Socket } from "socket.io-client";
import { Host } from "@/logic/host";
import { Router } from "next/router";
import { extractQuestion, getNextQuestionIteration } from "./helper/host";
import  IQuestion  from './interface/iquestion'; // Import the missing type


const list: string | any[] = [
  { name: "a", score: 13 },
  { name: "b", score: 12 },
  { name: "c", score: 35 },
  { name: "d", score: 42 },
  { name: "e", score: 5 },
  { name: "f", score: 63 },
  { name: "g", score: 7 },
  { name: "h", score: 28 },
  { name: "i", score: 9 },
  { name: "j", score: 10 },
  { name: "k", score: 113 },
  { name: "l", score: 192 },
  { name: "m", score: 137 },
  { name: "n", score: 144 },
  { name: "o", score: 115 },
  { name: "p", score: 163 },
];


const Quizzes_Host = () => {

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
  const [phase, setPhase] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = Host.getHostClient().socketClient;

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      if (typeof window !== "undefined") {
        newSocket.emit("host", {
          room: localStorage.getItem("hostpin") as string,
          username: "host",
        });
      }
    });

    setSocket(newSocket);

    return () => {
      if (socket) socket.close();
    };
  }, []);

  useEffect(() => {
    socket?.on("join", (message: any) => {
      console.log("Join event received", message);
    });
    socket?.on("start", (message: any) => {
      console.log("Start event received", message);
    });
    socket?.on("skipped", (message: any) => {
      setPhase(getNextQuestionIteration(phase));
    });
    socket?.on("ranking", (message: any) => {
      setPhase(3);
    });
    socket?.on("question", (message: any) => {
      const question = extractQuestion(message);
      setCurrentQuestion(question);
    });
    socket?.on("result", (message: any) => {
      setPhase(2);
    });
    socket?.on("final-ranking", (message: any) => {
      router.replace("/gameover");
    });
  });

  // useEffect(() => {
  //   if (currentQuestion >= quizData.length) {
  //     router.push("/gameover"); // replace '/new-route' with the path you want to navigate to
  //   }
  // }, [currentQuestion]);

  return (
    <div>
      {
        <div>
          {/*Phase 1*/}
          {phase === 0 && (
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200">
              <div className="font-bold text-4xl text-center h-full  align-middle flex items-center">
                <div className="bg-white p-4">{currentQuestion?.content}</div>
              </div>
              <div className="self-end w-full h-auto mb-8">
                <div className="col items-center justify-center">
                  <TimeBar
                    duration={5000}
                    onFinished={() => {
                      setPhase(1);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/*Phase 2*/}
          {phase === 1 && (
            <>
              <Phase2
                onComplete={() => {

                }}
                next={() => {
                  if (typeof window !== "undefined") {
                    socket?.emit("skip", {
                      room: localStorage.getItem("hostpin") as string,
                    });
                  }
                  // setPhase(2);
                }}
                duration={(currentQuestion?.time) ? currentQuestion.time : 0}
                quizData={currentQuestion}
              />
            </>
          )}

          {/*Phase 3*/}
          {phase === 2 && (
            <div>
              <Phase3
                next={() => {setPhase(3)}}
                duration={5}
                quizData={currentQuestion}
                quizResult={[4, 3, 2, 5]}
              />
            </div>
          )}

          {/*Phase 4*/}
          {phase === 3 && (
            <div>
              <Phase4
                next={() => {
                  if (typeof window !== "undefined") {
                    socket?.emit("question", {
                      room: localStorage.getItem("hostpin") as string,
                    });
                  }
                  // setPhase(0);
                }}
                list={list}
              />
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default Quizzes_Host;