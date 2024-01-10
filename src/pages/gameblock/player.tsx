import React, { useState, useEffect } from "react";
import Quiz from "./components/mini_components/quiz_player";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Loading from "./components/mini_components/waiting";
import TimeBar from "./components/mini_components/timeBar";
import Answer from "./components/mini_components/quiz_player_result";
import PlayerBar from "./components/mini_components/playerbar";
import router from "next/router";
import { Host } from "@/logic/host";
import { Socket } from "socket.io-client";
import { Player } from "@/logic/player";
import { extractQuestion, extractQuestionV2, getNextQuestionIteration } from "./helper/host";
import IQuestion from "./interface/iquestion";
import ChoosePowerUp from "./components/choose_powerup";
import RankUser from "../before_final";
import Home from "../get-ready";
const quiz = {
  content: "What is the capital of Thailand?",
  options: ["Bangkok", "Hanoi", "Jakarta", "Manila"],
  correct_ans: 1,
  time: 5,
  allow_power: true,
};

const powerupID = [0, 1, 2, 3];
var powerupUsed = [false, false, false, false];
const Quizzes_Player = () => {
  const [timeUp, setTimeUp] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameQuestion, setGameQuestion] = useState<IQuestion | null>(quiz);
  const [remainingTime, setRemainingTime] = useState(5);
  const [selection, setSelection] = useState(0);
  const [Phase, setPhase] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [result, setResult] = useState(false);
  const [point, setPoint] = useState(0);
  const [haveQuestion, setHaveQuestion] = useState(false);
  const handleAnswerSelect = (selectedAnswer: number | null) => {
    setSelection(selectedAnswer as number);
  };
  const name =
    // localStorage.getItem("username") ||
    "shut the fuk up";

  useEffect(() => {
    if (Phase) {
      setTimerKey((prevKey) => prevKey + 1); // Change the timer key to reset the timer
    }
  }, [Phase]);

  useEffect(() => {
    const newSocket = Player.getPlayerClient().socketClient;

    setSocket(newSocket);

    return () => {
      if (socket) {

        // socket.emit("disconnect", localStorage.getItem("pin"));

        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    const newSocket = Player.getPlayerClient().socketClient;
    if (newSocket) {
      newSocket.emit("join", {
        room: localStorage.getItem("pin"),
        username: localStorage.getItem("username"),
      });
    }


    setSocket(newSocket);
    return () => {
      if (socket) socket.close();
    };
  }, []);

  useEffect(() => {

    socket?.on('kicked', (message: any) => {
      router.replace('../join/pinInput')
    });

  })
  useEffect(() => {




    socket?.on("result", (message: any) => {
      setPhase(2);
    });
    socket?.on("final-ranking", (message: any) => {
      //TODO
    });

  });
  // socket?.on("ranking", (message: any) => {
  //   setPhase(3);
  // });
  socket?.on("result", (message: any) => {
    setPhase(2);
  });
  socket?.on("skipped", (message: any) => {
    switch (Phase) {
      case 0:
        setPhase(1);
        break;
      case 1:
        setPhase(2);
        break;
      case 2:
        setPhase(0);
        // setHaveQuestion(false);
        break;
    }
  });
  socket?.on("game-start", (message: any) => {
    const { partyid, question } = message;
    console.log("Start event received", message);
    const data: IQuestion = extractQuestionV2(question);
    console.log("The extracted questions are", data);
    setPhase(0);
    setGameQuestion(data);
    setHaveQuestion(true);

  }
  );

  useEffect(() => {
    setRemainingTime(gameQuestion?.time as number);
    setCurrentQuestion(currentQuestion + 1);
  }, [gameQuestion]);
  console.log(selection);
  console.log(timeUp);

  // console.log(Phase);
  return (
    <div>
      <div>
        {/*Phase 1*/}
        {!haveQuestion && <Home></Home>}

        {haveQuestion && Phase === 0 && (
          <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200">
            <div className="font-bold text-4xl text-center h-full align-middle flex items-center">
              <div className="bg-white p-4">{gameQuestion?.content}</div>
            </div>
            <div className="self-end w-full h-auto">
              <div className="col items-center justify-center">
                <TimeBar
                  duration={5000}
                  onFinished={() => {
                    setPhase(1);
                    setSelection(0);
                  }}
                />
                <PlayerBar point={2222} name={name} />
              </div>
            </div>
          </div>
        )}
        {/*Phase 1.5*/}
        {Phase === 0.5 && (
          <>
            <div className="absolute top-10 left-10">
              <CountdownCircleTimer
                key={timerKey}
                isPlaying
                duration={remainingTime}
                size={50}
                strokeWidth={10}
                colors={"#A30000"}
                onComplete={() => {

                  setPhase(1);
                }}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>
            <ChoosePowerUp powerupID={powerupID} powerupUsed={powerupUsed} />
          </>
        )}
        {/*Phase 2*/}
        {Phase === 1 && (
          <>
            <div className="absolute top-10 left-10">
              <CountdownCircleTimer
                key={timerKey}
                isPlaying
                duration={remainingTime}
                size={50}
                strokeWidth={10}
                colors={"#A30000"}
                onComplete={() => {
                  console.log("time up");
                  setTimeUp(true);

                  // setPhase(2);
                }}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>

            {(selection && !timeUp) ? (
              <Loading
                point={2222}
                name={name}
                index={currentQuestion + 1}
              />
            ) : (
              <Quiz
                quizData={gameQuestion}
                onAnswerSelect={handleAnswerSelect}
              />
            )}
          </>
        )}

        {/*Phase 3*/}
        {Phase === 2 && (
          <div>

            <Answer
              correctAnswer={(gameQuestion?.correct_ans) as number}
              isCorrect={result}
              plusPoint={point}
            />
          </div>
        )}
        {Phase === 4 && (
          <div>
            <RankUser points={point}></RankUser>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes_Player;
