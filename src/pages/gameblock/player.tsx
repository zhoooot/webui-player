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
import { extractQuestion, extractQuestionV2, extractQuestionV3, getNextQuestionIteration } from "./helper/host";
import IQuestion from "./interface/iquestion";
import ChoosePowerUp from "./components/choose_powerup";
import RankUser from "../before_final";
import Home from "../get-ready";
import { animate } from "framer-motion";
import { plugin } from "postcss";
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
  const [plusPoint, setPlusPoint] = useState(0);
  const [isChoose, setIsChoose] = useState(false);
const [isReceiveResult,setIsReceiveResult]=useState(false);
  const handleAnswerSelect = (selectedAnswer: number | null) => {
    // setSelection(1);
    if (gameQuestion) {
      socket?.emit("select-answer", {
        room: localStorage.getItem("pin"),
        username: localStorage.getItem("username"),
        answer: (selectedAnswer) ? selectedAnswer+1 : -1,
        correct_answer: gameQuestion?.correct_ans +1,
        point: 1000,
      })
      console.log( {
        room: localStorage.getItem("pin"),
        name: localStorage.getItem("username"),
        answer: selectedAnswer || -1,
        correct_answer: gameQuestion?.correct_ans +
        1,
        point: 1000,
      })
      setPhase(2.5);
    }
  };
  const name =
    localStorage.getItem("username") ||
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




    socket?.on("receive-result", (message: any) => {
      
      setPhase(2);
      
      const {plus_point,total_point,is_correct}=message;
      setPlusPoint(plus_point);
      setPoint(total_point);
      setResult(is_correct);
      // setIsReceiveResult(true);
      console.log("receive result");
    
  
  });
    socket?.on("final-ranking", (message: any) => {
      setPhase(4);
    });

  });
  // socket?.on("ranking", (message: any) => {
  //   setPhase(3);
  // });
  
  socket?.on("skipped", (message: any) => {
    switch (Phase) {
      case 0:
        setPhase(1);
        break;
      case 1:
        setPhase(2);
        handleAnswerSelect(null);
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
    const data: IQuestion = extractQuestionV3(question);
    console.log("The extracted questions are", data);
    setPhase(0);
    setGameQuestion(data);
    setHaveQuestion(true);
    setPlusPoint(0);
    // setIsReceiveResult(false);
  }

  );

  // socket?.on("result-released", (message: any) => {
  //     if (Phase !=2 && isReceiveResult==false)  
  //   { 
  //     setPhase(2);
  //     setPlusPoint(0);
  //     setResult(false);
      
      
  //   }
  //   }); 
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
        {!haveQuestion && <Home point={point} index={currentQuestion}></Home>}

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
                    setIsChoose(false);
                  }}
                />
                <PlayerBar point={point} name={name} />
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
                  handleAnswerSelect(null);
                  // setPhase(2);
                }}
              >
                {({ remainingTime }) =>  remainingTime}
              </CountdownCircleTimer>
            </div>

            <Quiz
                quizData={gameQuestion}
                onAnswerSelect={handleAnswerSelect} 
                point={point}
              />
          </>
        )}
        {Phase ===2.5 && (
          <div>
             <Loading
                point={point}
                name={name}
                index={currentQuestion + 1}
              /></div> 
        )  

        }
        {/*Phase 3*/}
        {Phase === 2 && (
          <div>

            <Answer
              correctAnswer={(gameQuestion?.correct_ans) as number}
              isCorrect={result}
              plusPoint={plusPoint}

              point={point}

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
