import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your test components here
import Login from './components/Login';
import StartTest from './components/StartTest';
import ReactionTest from './components/ReactionTest';
import DigitSpanTest from './components/DigitSpanTest';
import StroopTest from './components/StroopTest';
import SustainedAttentionTest from './components/SustainedAttentionTest';
import Results from './components/Results';
import TimerSetup from './components/TimerSetup';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your app routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/start-test" element={<StartTest />} />
        <Route path="/test/reaction-time" element={<ReactionTest />} />
        <Route path="/test/digit-span" element={<DigitSpanTest />} />
        <Route path="/test/stroop" element={<StroopTest />} />
        <Route path="/test/sustained-attention" element={<SustainedAttentionTest />} />
        <Route path="/results" element={<Results />} />
        <Route path="/timer-setup" element={<TimerSetup />} />

        {/* Redirect root or unknown paths */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;