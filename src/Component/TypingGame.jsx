import React, { useEffect, useMemo, useRef, useState } from "react";

const TypingGame = () => {
  const wordList = useMemo(
    () => [
      "apple",
      "banana",
      "cherry",
      "date",
      "Mongodb",
      "React",
      "Serendipity",
      "Mellifluous",
      "Quixotic",
      "Ephemeral",
      "Luminous",
      "Ethereal",
      "Ineffable",
      "Halcyon",
      "Petrichor",
      "Susurrus",
      "effective",
      "outlet",
      "orchestra",
      "acute",
    ],
    []
  );

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [currListIndex, setCurrListIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [score, setScore] = useState(0);
  const [, setAccuracy] = useState(0);
  const [totalAccuracy, setTotalAccuracy] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(null);

  const handleInputValue = (e) => setInputValue(e.target.value);

  useEffect(() => {
    let timer = null;
    if (startTime !== null && endTime === null) {
      inputRef.current.focus();

      timer = setTimeout(() => {
        calculateAccuracy();
        setCurrListIndex(currListIndex + 1);
        setInputValue("");
      }, 2000);

      // const dataa = wordList[currListIndex].split("").filter((item,i)=>{
      //   if(item===inputValue[i]){
      //     if(inputRef.classList.contains('incorrect')){
      //       inputRef.classList.remove('incorrect');
      //     }
      //     inputRef.current.classList.add('correct')
          
      //   }else{
      //     inputRef.current.classList.add('incorrect');
      //   }
      // });

      if (currListIndex === wordList.length) {
        setEndTime(Date.now());
        const timeElapsed = formatTime(Date.now() - startTime);

        // const part = timeElapsed.split(":");
        // console.log("The minute is ", parseInt(part[0], 10));
        // console.log("The seconds is ", parseInt(part[1], 10));
        setElapsedTime(timeElapsed);
        calculateScore(
          (totalAccuracy / wordList.length).toFixed(2),
          timeElapsed
        );
      }
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inputValue,
    currListIndex,
    startTime,
    endTime,
    wordList,
    totalAccuracy,
    elapsedTime,
    score,
  ]);

  const handleStart = () => {
    setStartTime(Date.now());
    setEndTime(null);
    setCurrListIndex(0);
    setElapsedTime(null);
    setScore(0);
    setInputValue("");
    setAccuracy(0);
    setTotalAccuracy(0);
  };

  const handleRestart = () => {
    setInputValue("");
    setCurrListIndex(0);
    setStartTime(null);
    setEndTime(null);
    setElapsedTime(null);
    setScore(0);
    setAccuracy(0);
    setTotalAccuracy(0);
  };

  const handleNext = () => {
    calculateAccuracy();

    setCurrListIndex((prev) => prev + 1);
    setInputValue("");
  };

  const calculateScore = (yourAccuracy, yourTimeTaken) => {
    if (parseInt(yourAccuracy, 10) === 0) return 0;

    const [minutesStr, secondsStr] = yourTimeTaken.split(":");

    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);

    const timeTakenInSeconds = minutes * 60 + seconds;
    // if(timeTakenInSeconds <10) return 0;

    const accuracyScore = (yourAccuracy / 100) * 100;

    const timeTakenScore = (1 / timeTakenInSeconds) * 100;

    let totalScore = accuracyScore + timeTakenScore;
    // console.log(typeof(totalScore));

    if (totalScore > 100) {
      totalScore = 100;
    }

    setScore(totalScore.toFixed(2));
  };

  const calculateAccuracy = () => {
    const getCorrectChar = wordList[currListIndex]
      .split("")
      .filter((char, i) => char === inputValue[i]).length;
    const getAccuracy = (getCorrectChar / wordList[currListIndex].length) * 100;
    // console.log("single word accuracy",getAccuracy);

    setAccuracy(getAccuracy);

    setTotalAccuracy((prev) => prev + getAccuracy);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes.toString().padStart(2, "0")} :
    ${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="game-container">
      <div className="game-content">
        {startTime === null ? (
          <button onClick={handleStart}>Start</button>
        ) : endTime === null ? (
          <>
            <div className="list-of-words">
              <h1>{wordList[currListIndex]}</h1>
            </div>
            <div className="game-form">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputValue}
                ref={inputRef}
                onKeyDown={handleKey}
              />
              <button onClick={handleNext}>Next</button>
            </div>
          </>
        ) : (
          <>
            <div className="heading">
              <h1>Game-Over!</h1>
              <h2>
                Your Accuracy is :{" "}
                {(totalAccuracy / wordList.length).toFixed(2)}%
              </h2>
              <h2>Your total time taken is : {elapsedTime} seconds</h2>
              <h2>Your score is : {score}</h2>
            </div>
            <div className="game-restart-button">
              <button onClick={handleRestart}>Restart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TypingGame;
