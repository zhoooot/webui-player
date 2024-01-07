import React, { useState, useEffect } from "react";
import Quiz from "./components/mini_components/quiz_player";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Loading from "./components/mini_components/waiting";
import TimeBar from "./components/mini_components/timeBar";
import Answer from "./components/mini_components/quiz_player_result";
import PlayerBar from "./components/mini_components/playerbar";
import { Socket } from "socket.io-client";
import { Player } from "@/logic/player";
import { extractQuestion } from "./helper/host";
import IQuestion from "./interface/iquestion";
import ChoosePowerUp from "./components/choose_powerup";
import axios from "axios";

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
  const [finalPosition, setFinalPosition] = useState(0);

  const handleAnswerSelect = async (selectedAnswer: number | null) => {
    setSelection(selectedAnswer as number);
    await axios.post("/api/answer", {
      answer: selectedAnswer,
      room: localStorage.getItem("room"),
      username: localStorage.getItem("username"),
    });
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
      if (socket) socket.close();
    };
  }, []);

  useEffect(() => {
    socket?.on("ready", (message: any) => {
      const question = extractQuestion(message);
      setGameQuestion(question);
      setPhase(0);
      setTimeUp(false);
      setSelection(0);
      setResult(false);
      setPoint(0);
    });
    socket?.on("start", (message: any) => {
      setPhase(1);
    });
    socket?.on("result", (message: any) => {
      const { correct, point } = message;
      if (correct == true) {
        setResult(correct);
        setPoint(point);
      }
      setPhase(2);
    });
    socket?.on("final-ranking", (message: any) => {
      //TODO
    });
    socket?.on("reveal", (message: any) => {
      //TODO
    });
  });
  console.log(selection);
  console.log(timeUp);

  // console.log(Phase);
  return (
    <div>
      <div>
        {/*Phase 1*/}
        {Phase === 0 && (
          <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200">
            <div className="font-bold text-4xl text-center h-full align-middle flex items-center">
              {gameQuestion?.content}
            </div>
            <div className="self-end w-full h-auto">
              <div className="col items-center justify-center">
                <TimeBar
                  duration={5000}
                  onFinished={() => {
                    setPhase(0.5);
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
                duration={5}
                size={50}
                strokeWidth={10}
                colors={"#A30000"}
                onComplete={() => {
                  //setPhase(1);
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

                  setPhase(2);
                }}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>

            {selection && !timeUp ? (
              <Loading point={2222} name={name} index={currentQuestion + 1} />
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
            <div className="absolute top-10 left-10">
              <CountdownCircleTimer
                key={timerKey}
                isPlaying
                duration={remainingTime}
                size={50}
                strokeWidth={10}
                colors={"#A30000"}
                onComplete={() => {
                  // setSelection(0);
                  // setTimeUp(false);
                  // setPhase(0);
                }}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>
            <Answer
              correctAnswer={gameQuestion?.correct_ans as number}
              isCorrect={result}
              plusPoint={point}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes_Player;
