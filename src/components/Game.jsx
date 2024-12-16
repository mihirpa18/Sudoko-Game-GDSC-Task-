import React, { useEffect, useRef, useState } from "react";
import Board from "./Board/Board";
import { Lightbulb, LogIn, Pause, Play, RefreshCcw } from "lucide-react";
import { useGame } from "./store/gameStore";

function Game() {
  const {
    isStart,
    tryAgain,
    Hint,
    score,
    hint,
    startGame,
    mistake,
    time,
    isComplete,
    increaseTime,
    pause,
    isPause,
  } = useGame();

  function handleStart() {
    startGame();
  }

  function handleScore() {
    let sc = score();
    console.log(sc);
  }

  const timeref = useRef();

  useEffect(() => {
    if (isStart && !isPause && !isComplete) {
      timeref.current = setInterval(() => {
        increaseTime();
      }, 1000);
    } else {
      clearInterval(timeref.current);
    }

    return () => clearInterval(timeref.current);
  }, [isPause, time, isComplete, isStart]);

  function Time(sec) {
    sec = Math.max(0, Math.floor(sec));
    const min = Math.floor(sec / 60);
    const remSec = sec % 60;
    const minPad = String(min).padStart(2, "0");
    const secPad = String(remSec).padStart(2, "0");
    return `${minPad}:${secPad}`;
  }

  return (
    <div className="flex flex-col h-screen justify-center ">
      <div>
        <h1 className=" flex justify-center text-4xl md:text-6xl font-bold font-mono">
          Sudoko Game
        </h1>
      </div>
      <div className=" flex justify-center gap-2 md:gap-10 lg:gap-20 text-2xl mt-5 md:mt-0 md:text-4xl lg:text-5xl font-bold  text-indigo-400  md:mx-36">
        <p className="outline-double rounded-xl p-1  text-center items-center justify-center flex">
          {Time(time)}
        </p>
        <p className="outline-double rounded-xl p-1 text-center items-center justify-center flex">
          Mistakes: {mistake}
        </p>
        <p className="outline-double rounded-xl p-1 text-center items-center justify-center flex">
          Hints: {hint}{" "}
        </p>
      </div>
      <div className="flex justify-center mt-3 ">
        <Board />
      </div>
      <div className="flex justify-center gap-8 ">
        <button
          onClick={() => startGame()}
          className="option bg-black outline-double p-3 rounded-md hover:scale-110 active:scale-90"
        >
          Start Game
        </button>
        <button
          onClick={() => tryAgain()}
          className="option bg-black outline-double p-3 rounded-md hover:scale-110 active:scale-90"
        >
          <RefreshCcw />
        </button>
        <button
          onClick={() => {
            pause();
          }}
          className="option bg-black outline-double p-3 rounded-md hover:scale-110 active:scale-90"
        >
          {!isPause ? <Pause /> : <Play />}
        </button>
        <button
          onClick={Hint}
          className="option  bg-black outline-double p-3 rounded-md hover:scale-110 active:scale-90"
        >
          <Lightbulb />
        </button>
      </div>
    </div>
  );
}

export default Game;
