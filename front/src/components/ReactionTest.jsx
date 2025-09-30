import React, { useState, useRef } from "react";

function ReactionTest() {
  const maxTrials = 5;

  const [trialCount, setTrialCount] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [message, setMessage] = useState('Click "Start" to begin the reaction time test.');
  const [showStart, setShowStart] = useState(true);
  const [showStimulus, setShowStimulus] = useState(false);
  const [result, setResult] = useState("");
  const [startButtonLabel, setStartButtonLabel] = useState("Start");

  // Tracking variables (not in state, to avoid resets during quick updates)
  const startTimeRef = useRef(null);
  const waitingForClickRef = useRef(false);

  // Start a single trial
  const startTrial = () => {
    setTrialCount((count) => count + 1);
    setMessage("Get ready...");
    setShowStart(false);
    setShowStimulus(false);
    setResult("");

    // Random delay: 1-3 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000;

    setTimeout(() => {
      setMessage("Click the green button NOW!");
      setShowStimulus(true);
      startTimeRef.current = performance.now();
      waitingForClickRef.current = true;
    }, delay);
  };

  // Handle green button click
  const handleStimulusClick = () => {
    if (!waitingForClickRef.current) return;

    const endTime = performance.now();
    const reactionTime = endTime - startTimeRef.current;
    setReactionTimes((times) => [...times, reactionTime]);
    waitingForClickRef.current = false;

    setShowStimulus(false);
    setMessage(`Trial ${trialCount} reaction time: ${reactionTime.toFixed(2)} ms`);

    if (trialCount < maxTrials) {
      setTimeout(startTrial, 1500);
    } else {
      setTimeout(showResult, 1500);
    }
  };

  // Handle start/retake button click
  const handleStart = () => {
    setTrialCount(0);
    setReactionTimes([]);
    setStartButtonLabel("Start");
    startTrial();
  };

  // Calculate and display result
  const showResult = () => {
    const sum = reactionTimes.reduce((a, b) => a + b, 0);
    const avg = sum / reactionTimes.length;

    let attentionLevel;
    if (avg < 250) {
      attentionLevel = "High Attention";
    } else if (avg < 400) {
      attentionLevel = "Medium Attention";
    } else {
      attentionLevel = "Low Attention";
    }
    setMessage("Test complete!");
    setResult(
      <>
        Average Reaction Time: <b>{avg.toFixed(2)} ms</b>
        <br />
        Attention Level: <b>{attentionLevel}</b>
      </>
    );
    setShowStart(true);
    setStartButtonLabel("Retake Test");
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "100px" }}>
      <div style={{ fontSize: "24px", marginBottom: "20px" }}>{message}</div>
      {showStart && (
        <button
          style={{ fontSize: "20px", padding: "15px 30px", cursor: "pointer" }}
          onClick={handleStart}
        >
          {startButtonLabel}
        </button>
      )}
      {showStimulus && (
        <button
          style={{
            fontSize: "20px",
            padding: "15px 30px",
            cursor: "pointer",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            display: "inline-block"
          }}
          onClick={handleStimulusClick}
        >
          Click me!
        </button>
      )}
      <div style={{ marginTop: "30px", fontSize: "22px" }}>{result}</div>
    </div>
  );
}

export default ReactionTest;
