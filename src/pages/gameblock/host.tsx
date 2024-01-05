import React, { useState, useEffect } from "react";
import TimeBar from "./components/mini_components/timeBar";
import Phase2 from "./components/phase_host_2";
import Phase3 from "./components/phase_host_3";
import Phase4 from "./components/phase_host_4";
import router from "next/router";
import { Socket } from "socket.io-client";
import { Host } from "@/logic/host";
import { Router } from "next/router";

// const quizData: string | any[] = [
//   {
//     question: "What is the capital of France?",
//     answers: ["Paris", "London", "Berlin", "Madrid"],
//     correctAnswer: 1,
//   },
//   {
//     question: "What is the ?",
//     answers: ["aaaa", "don", "bbb", "ssss"],
//     correctAnswer: 2,
//   },
//   {
//     question: "What is the capital of Germany?",
//     answers: ["Berlin", "Paris", "London", "Madrid"],
//     correctAnswer: 3,
//   },
// ];

// const list: string | any[] = [
//   { name: "a", score: 13 },
//   { name: "b", score: 12 },
//   { name: "c", score: 35 },
//   { name: "d", score: 42 },
//   { name: "e", score: 5 },
//   { name: "f", score: 63 },
//   { name: "g", score: 7 },
//   { name: "h", score: 28 },
//   { name: "i", score: 9 },
//   { name: "j", score: 10 },
//   { name: "k", score: 113 },
//   { name: "l", score: 192 },
//   { name: "m", score: 137 },
//   { name: "n", score: 144 },
//   { name: "o", score: 115 },
//   { name: "p", score: 163 },
// ];

const Quizzes_Host = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [phase, setPhase] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  console.log("The first question is ", router.query.answers);

  let questions: [
    {
      content: string;
      answers: [string];
      correctAnswer: number;
      time: number;
      permit: boolean;
    }
  ] = [{content: router.query.content as string, answers: router.query.answers as [string], correctAnswer: parseInt(router.query.correct_answer as string), time: parseInt(router.query.time as string), permit: router.query.allow_power as string === "true"}];

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

  useEffect(() => {
    socket?.on("join", (message: any) => {
      console.log("Join event received", message);
    });
    socket?.on("start", (message: any) => {
      console.log("Start event received", message);
    });
    socket?.on("skipped", (message: any) => {
      setPhase(phase + 1)
    });
    socket?.on("ranking", (message: any) => {
      console.log("Ranking event received", message);
    });
    socket?.on("show-question", (message: any) => {
      console.log("Question event received", message);
      const { partyid, msgcontent } = message;
      const { question, time, allow_power, url, answers, correct_answer } = msgcontent;
      questions.push({
        content: question,
        answers: answers,
        correctAnswer: correct_answer,
        time: time,
        permit: allow_power,
      });
    });
    socket?.on("result", (message: any) => {
      console.log("Result event received", message);
    });
    socket?.on("end", (message: any) => {
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
        <div key={currentQuestion}>
          {/*Phase 1*/}
          {phase === 0 && (
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200">
              <div className="font-bold text-4xl text-center h-full align-middle flex items-center">
                {questions[currentQuestion].content}
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

                  setPhase(2);
                }}
                next={() => {
                  socket?.emit("question-skip", {
                    room: router.query.pin as string,
                  });
                  setPhase(2);
                }}
                duration={questions[currentQuestion].time}
                quizData={questions[currentQuestion]}
              />
            </>
          )}

          {/*Phase 3*/}
          {phase === 2 && (
            <div>
              <Phase3
                next={() => {
                  setPhase(3);
                }}
                duration={-1}
                quizData={questions[currentQuestion]}
                quizResult={[4, 3, 2, 5]}
              />
            </div>
          )}

          {/*Phase 4*/}
          {phase === 3 && (
            <div>
              <Phase4
                next={() => {
                  setPhase(0);
                  setCurrentQuestion(currentQuestion + 1);
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