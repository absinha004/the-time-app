import React, { useState, useRef, useEffect } from "react";

function SustainedAttentionTest() {
  const totalTrials = 30;
  const targetLetter = "X";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // State
  const [currentTrial, setCurrentTrial] = useState(0);
  const [trialSequence, setTrialSequence] = useState([]);
  const [currentLetter, setCurrentLetter] = useState("");
  const [reactionTimes, setReactionTimes] = useState([]);
  const [correctResponses, setCorrectResponses] = useState(0);
  const [falseAlarms, setFalseAlarms] = useState(0);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [result, setResult] = useState("");
  const [instruction, setInstruction] = useState('Press spacebar ONLY when you see the letter "X". Click Start to begin.');
  const [showStart, setShowStart] = useState(true);

  const stimulusStartTimeRef = useRef(0);
  const timeoutRef = useRef(null);

  // Generate trial sequence
  function generateSequence() {
    const seq = [];
    for (let i = 0; i < totalTrials; i++) {
      if (Math.random() < 0.3) {
        seq.push(targetLetter);
      } else {
        let letter;
        do {
          letter = letters[Math.floor(Math.random() * letters.length)];
        } while (letter === targetLetter);
        seq.push(letter);
      }
    }
    return seq;
  }

  // Show single letter and wait for spacebar
  function showLetter(letter) {
    setCurrentLetter(letter);
    stimulusStartTimeRef.current = performance.now();
    setWaitingForResponse(true);

    // Timeout for no response in 1500ms
    timeoutRef.current = setTimeout(() => {
      if (waitingForResponse) {
        setWaitingForResponse(false);
        nextTrial();
      }
    }, 1500);
  }

  // Begin next trial
  function nextTrial() {
    clearTimeout(timeoutRef.current);
    if (currentTrial >= totalTrials) {
      endTest();
      return;
    }
    showLetter(trialSequence[currentTrial]);
    setCurrentTrial(currentTrial + 1);
  }

  // End test and show results
  function endTest() {
    setCurrentLetter("");
    setInstruction("Test complete!");
    const avgReactionTime =
      reactionTimes.length > 0
        ? (reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length).toFixed(2)
        : "N/A";
    setResult(
      <>
        Correct Responses: {correctResponses}
        <br />
        False Alarms (incorrect presses): {falseAlarms}
        <br />
        Average Reaction Time (ms): {avgReactionTime}
      </>
    );
    setShowStart(true);
  }

  // On start
  const handleStart = () => {
    setTrialSequence(generateSequence());
    setCurrentTrial(0);
    setReactionTimes([]);
    setCorrectResponses(0);
    setFalseAlarms(0);
    setResult("");
    setInstruction('Press spacebar ONLY when you see the letter "X".');
    setShowStart(false);
  };

  // Listen for spacebar only during trials
  useEffect(() => {
    function handleKeyDown(e) {
      if (!waitingForResponse) return;
      if (e.code === "Space") {
        setWaitingForResponse(false);
        clearTimeout(timeoutRef.current);
        if (currentLetter === targetLetter) {
          setCorrectResponses((prev) => prev + 1);
          const reactionTime = performance.now() - stimulusStartTimeRef.current;
          setReactionTimes((prev) => [...prev, reactionTime]);
        } else {
          setFalseAlarms((prev) => prev + 1);
        }
        nextTrial();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [waitingForResponse, currentLetter, currentTrial, trialSequence]);

  // Start trial sequence after sequence is generated
  useEffect(() => {
    if (!showStart && trialSequence.length > 0 && currentTrial === 0) {
      nextTrial();
    }
    // eslint-disable-next-line
  }, [trialSequence, showStart]);

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "100px" }}>
      <div style={{ fontSize: "36px", marginBottom: "30px", height: "60px" }}>{instruction}</div>
      {showStart && (
        <button
          style={{
            fontSize: "24px",
            padding: "15px 40px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
          onClick={handleStart}
        >
          Start Test
        </button>
      )}
      <div style={{ fontSize: "36px", marginBottom: "30px", height: "60px" }}>
        {currentLetter}
      </div>
      <div style={{ fontSize: "36px", marginBottom: "30px", height: "60px" }}>{result}</div>
    </div>
  );
}

export default SustainedAttentionTest;
