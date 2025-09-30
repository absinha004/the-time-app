import React, { useState } from "react";

const colorMap = {
  red: "Red",
  blue: "Blue",
  green: "Green",
  yellow: "Yellow"
};

const colors = Object.keys(colorMap); // ["red", "blue", "green", "yellow"];
const words = Object.values(colorMap); // ["Red", "Blue", "Green", "Yellow"];
const maxTrials = 10;

function StroopTest() {
  // State for test
  const [trialCount, setTrialCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentTrial, setCurrentTrial] = useState(null);
  const [message, setMessage] = useState(
    'Click the color of the word which comes on the screen. DO NOT click the color described by the word'
  );
  const [showStart, setShowStart] = useState(true);
  const [showWord, setShowWord] = useState(false);
  const [result, setResult] = useState("");
  const [startTime, setStartTime] = useState(0);

  // Create a trial object
  function createTrial() {
    const wordIndex = Math.floor(Math.random() * words.length);
    const word = words[wordIndex];

    // ~50% congruent/incongruent
    let colorIndex;
    do {
      colorIndex = Math.floor(Math.random() * colors.length);
    } while (colorIndex === wordIndex && Math.random() < 0.5);

    const color = colors[colorIndex];

    return { word, color, correctAnswer: color };
  }

  // Begin test
  const handleStart = () => {
    setTrialCount(0);
    setCorrectCount(0);
    setReactionTimes([]);
    setResult("");
    setShowStart(false);
    setShowWord(true);
    nextTrial(0);
  };

  // Show next trial
  function nextTrial(current) {
    if (current >= maxTrials) {
      setShowWord(false);
      setShowStart(true);
      showResult();
      return;
    }
    const trial = createTrial();
    setCurrentTrial(trial);
    setStartTime(performance.now());
    setTrialCount(current + 1);
  }

  // Handle color button click
  const handleColorClick = (color) => {
    if (!currentTrial) return;
    const reactionTime = performance.now() - startTime;
    setReactionTimes((prev) => [...prev, reactionTime]);

    if (color === currentTrial.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
    nextTrial(trialCount);
  };

  // Compute and show result
  function showResult() {
    const avgTime =
      reactionTimes.length > 0
        ? reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length
        : 0;
    const accuracy = (correctCount / maxTrials) * 100;
    setMessage("Test Complete!");
    setResult(
      <>
        <b>Accuracy:</b> {accuracy.toFixed(1)}%<br />
        <b>Average Reaction Time:</b> {avgTime.toFixed(2)} ms
      </>
    );
  }

  // Button configs for color options
  const buttonConfigs = [
    { color: "red", style: { backgroundColor: "red" } },
    { color: "blue", style: { backgroundColor: "blue" } },
    { color: "green", style: { backgroundColor: "green" } },
    { color: "yellow", style: { backgroundColor: "goldenrod" } }
  ];

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "100px" }}>
      <div style={{ fontSize: "24px", marginBottom: "20px" }}>{message}</div>
      {showStart && (
        <button
          style={{ fontSize: "20px", padding: "15px 40px", cursor: "pointer", marginBottom: "20px" }}
          onClick={handleStart}
        >
          Start Stroop Test
        </button>
      )}
      {showWord && currentTrial && (
        <div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "20px",
              height: "70px",
              color: currentTrial.color
            }}
          >
            {currentTrial.word}
          </div>
          <div>
            {buttonConfigs.map((btn) => (
              <button
                className="color-button"
                key={btn.color}
                style={{
                  ...btn.style,
                  fontSize: "20px",
                  padding: "15px 30px",
                  margin: "5px",
                  cursor: "pointer",
                  borderRadius: "8px",
                  border: "none",
                  color: "white"
                }}
                onClick={() => handleColorClick(btn.color)}
              >
                {colorMap[btn.color]}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginTop: "30px", fontSize: "22px" }}>{result}</div>
    </div>
  );
}

export default StroopTest;
