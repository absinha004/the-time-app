import React, { useState, useRef } from "react";

function DigitSpanTest() {
  // State variables
  const [currentLength, setCurrentLength] = useState(3);
  const [maxCorrectLength, setMaxCorrectLength] = useState(0);
  const [sequence, setSequence] = useState("");
  const [instruction, setInstruction] = useState('Click "Start" to begin the Digit Span Test.');
  const [showStart, setShowStart] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");
  const [inputEnabled, setInputEnabled] = useState(false);

  const inputRef = useRef(null);

  // Helper to generate sequence
  const generateSequence = (length) => {
    let seq = "";
    for (let i = 0; i < length; i++) seq += Math.floor(Math.random() * 10);
    return seq;
  };

  // Show sequence
  const showSequence = (seq) => {
    setSequence(seq);
    setTimeout(() => {
      setSequence("");
      setShowInput(true);
      setShowSubmit(true);
      setInstruction("Enter the sequence you saw:");
      setInputEnabled(true);
      setUserAnswer("");
      if (inputRef.current) inputRef.current.focus();
    }, 1500);
  };

  // Begin next trial
  const nextTrial = () => {
    const seq = generateSequence(currentLength);
    setSequence("");
    setInstruction(`Remember this ${currentLength}-digit sequence:`);
    setShowInput(false);
    setShowSubmit(false);
    setInputEnabled(false);
    setTimeout(() => showSequence(seq), 1000);
    setSequence(seq);
  };

  // On start (or retake)
  const handleStart = () => {
    setCurrentLength(3);
    setMaxCorrectLength(0);
    setResult("");
    setShowStart(false);
    nextTrial();
  };

  // On submit
  const handleSubmit = () => {
    if (!inputEnabled) return;
    setInputEnabled(false);

    if (userAnswer.trim() === sequence) {
      setMaxCorrectLength(currentLength);
      setCurrentLength(currentLength + 1);
      setInstruction("Correct! Get ready for the next sequence.");
      setShowInput(false);
      setShowSubmit(false);
      setTimeout(nextTrial, 1500);
    } else {
      setInstruction("Incorrect. Test complete.");
      setResult(<span><b>Longest correct sequence length:</b> {maxCorrectLength}</span>);
      setShowInput(false);
      setShowSubmit(false);
      setShowStart(true);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "100px" }}>
      <div style={{ fontSize: "24px", marginBottom: "20px" }}>{instruction}</div>
      {showStart && (
        <button
          style={{ fontSize: "20px", padding: "10px 25px", marginTop: "10px", cursor: "pointer" }}
          onClick={handleStart}
        >
          {maxCorrectLength > 0 ? "Retake Test" : "Start"}
        </button>
      )}
      <div style={{ fontSize: "24px", marginBottom: "20px", height: "40px" }}>{sequence && sequence}</div>
      {showInput && (
        <>
          <input
            ref={inputRef}
            type="text"
            style={{
              fontSize: "20px", padding: "5px 10px",
              width: "100px", textAlign: "center"
            }}
            maxLength={20}
            autoComplete="off"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            disabled={!inputEnabled}
          />
        </>
      )}
      <br />
      {showSubmit && (
        <button
          style={{ fontSize: "20px", padding: "10px 25px", marginTop: "10px", cursor: "pointer" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
      <div style={{ fontSize: "24px", marginBottom: "20px" }}>{result}</div>
    </div>
  );
}

export default DigitSpanTest;
