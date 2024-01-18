import React, { useState, useEffect } from "react";
import TimeBar from "./components/mini_components/timeBar";
import Phase2 from "./components/phase_host_2";
import Phase3 from "./components/phase_host_3";
import Phase4 from "./components/phase_host_4";
import router from "next/router";
import { Socket } from "socket.io-client";
import { Host } from "@/logic/host";
import { Router } from "next/router";
import {
  extractCategorization,
  extractQuestion,
  extractQuestionV2,
  extractQuestionV3,
  getNextQuestionIteration,
} from "./helper/host";
import IQuestion from "./interface/iquestion"; // Import the missing type

// const list: string | any[] = [
//   { name: "What name is it?", score: 13 },
//   { name: "What name is it?", score: 12 },
//   { name: "What name is it?", score: 35 },
//   { name: "What name is it?", score: 42 },
//   { name: "What name is it?", score: 5 },
// ];

const Quizzes_Host = () => {
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  const [phase, setPhase] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [haveQuestion, setHaveQuestion] = useState(false);
  const [categorization, setCategorization] = useState<number[]>([
    -1, -1, -1, -1,
  ]);
  const [haveCategorization, setHaveCategorization] = useState(false);
  const [topFiveList, setTopFiveList] = useState([]);
  const [receiveFinalRanking, setReceiveFinalRanking] = useState(false);
  const [finalRanking, setFinalRanking] = useState([]);

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
      if (socket) {
        // socket.emit("disconnect", localStorage.getItem("pin"));

        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("join", (message: any) => {
        console.log("Join event received", message);
      });
      socket.on("game-start", (message: any) => {
        const { partyid, question } = message;
        console.log("Start event received", message);
        const data: IQuestion = extractQuestionV3(question);
        console.log("The extracted questions are", data);
        setCurrentQuestion(data);
        setHaveCategorization(false);
      });
      socket.on("skipped", (message: any) => {
        setPhase(getNextQuestionIteration(phase));
      });
      socket.on("ranking", (message: any) => {
        const { ranking } = message;
        setTopFiveList(ranking);
        setPhase(3);
      });
      socket.on("question", (message: any) => {
        console.log("Question created");
        const question: IQuestion = extractQuestionV3(message);
        console.log("I received the question ...", question);
        setCurrentQuestion(question);
      });
      socket.on("result", (message: any) => {
        const categorization = extractCategorization(message);
        setCategorization(categorization);
        setHaveCategorization(true);
      });
      socket.on("final-ranking", (message: any) => {
        setReceiveFinalRanking(true);
        const { ranking } = message;
        setFinalRanking(ranking);
      });
    }
  });

  useEffect(() => {
    setHaveQuestion(currentQuestion !== null);
  }, [currentQuestion]);

  useEffect(() => {
    if (haveCategorization) {
      setPhase(2);
    }
  }, [haveCategorization]);

  useEffect(() => {
    if (phase == 2) {
      socket?.emit("result", {
        room: localStorage.getItem("hostpin") as string,
      });
    }
  }, [phase, socket]);

  useEffect(() => {
    if (receiveFinalRanking && finalRanking.length > 0) {
      router.replace({
        pathname: "/gameover",
        query: { finalRanking: finalRanking },
      });
    }
  }, [finalRanking, receiveFinalRanking]);

  // useEffect(() => {
  //   if (currentQuestion >= quizData.length) {
  //     router.push("/gameover"); // replace '/new-route' with the path you want to navigate to
  //   }
  // }, [currentQuestion]);

  return (
    <div className="h-screen">
      {!haveQuestion && (
       <div className="flex flex-col justify-center items-center h-full">
       <div className="text-3xl text-black font-bold mb-2">Loading...</div>
       <div className="loading loading-lg loading-spinner">fuk up</div>
     </div>
      )}
      {/*Phase 1*/}
      {haveQuestion && phase === 0 && (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200">
          <div className="font-bold text-4xl text-center h-full  align-middle flex items-center">
            <div className="bg-white p-4">
              {currentQuestion && currentQuestion.content}
            </div>
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
            onComplete={() => {}}
            next={() => {
              if (typeof window !== "undefined") {
                socket?.emit("skip", {
                  room: localStorage.getItem("hostpin") as string,
                });
              }
              // setPhase(2);
            }}
            duration={currentQuestion?.time ? currentQuestion.time : 0}
            quizData={currentQuestion}
          />
        </>
      )}

      {/*Phase 3*/}
      {phase === 2 && (
        <div>
          <Phase3
            next={() => {
              socket?.emit("question-end", {
                room: localStorage.getItem("hostpin") as string,
              });
              setPhase(3);
            }}
            duration={5}
            quizData={currentQuestion}
            quizResult={categorization}
          />
        </div>
      )}

      {/*Phase 4*/}
      {phase === 3 && (
        <div>
          <Phase4
            next={() => {
              if (typeof window !== "undefined") {
                // socket?.emit("question", {
                //   room: localStorage.getItem("hostpin") as string,
                // });
                socket?.emit("game-start", {
                  room: localStorage.getItem("hostpin") as string,
                });
                setCurrentQuestion(null);
                setHaveQuestion(false);
              }
              setPhase(0);
            }}
            list={topFiveList}
          />
        </div>
      )}
    </div>
  );
};

export default Quizzes_Host;
