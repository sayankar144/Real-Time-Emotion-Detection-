import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const emotionList = ["Angry", "Fear", "Happy", "Neutral", "Sad", "Surprise"];

  // Capture frame every second
  useEffect(() => {
    const interval = setInterval(captureFrame, 1000);
    return () => clearInterval(interval);
  }, []);

  const captureFrame = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        image: imageSrc,
      });

      const data = res.data;

      if (data.error) {
        setError(data.error);
      } else {
        setEmotion(data.emotion);
        setConfidence(data.confidence);
        setError(null);

        const time = new Date().toLocaleTimeString();

        // 🧠 Keep previous emotion confidence values for continuity
        setHistory((prev) => {
          const lastData =
            prev.length > 0
              ? prev[prev.length - 1]
              : Object.fromEntries(emotionList.map((e) => [e, 0]));

          const newData = { time };
          emotionList.forEach((e) => {
            if (e === data.emotion) {
              newData[e] = data.confidence;
            } else {
              newData[e] = lastData[e]; // keep last known value
            }
          });

          return [...prev.slice(-14), newData];
        });
      }
    } catch (err) {
      setError("Cannot connect to Flask backend");
    }
  };

  return (
    <div className="app">
      <h1 className="title">🎥 Real-Time Emotion Detection</h1>

      <div className="main-container">
        {/* LEFT: Webcam */}
        <div className="camera-container">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
            className="webcam"
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: "user",
            }}
          />
          <div className="overlay">
            {error ? (
              <p className="error">{error}</p>
            ) : (
              <>
                <p className="emotion">Emotion: {emotion}</p>
                <p className="confidence">
                  Confidence: {confidence.toFixed(2)}%
                </p>
              </>
            )}
          </div>
        </div>

        {/* RIGHT: Emotion Chart */}
        <div className="chart-container">
          <h2>📊 Emotion Timeline</h2>
          {history.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time">
                  <Label
                    value="Time (hh:mm:ss)"
                    offset={-5}
                    position="insideBottom"
                    fill="#bbb"
                    style={{ fontSize: 14 }}
                  />
                </XAxis>
                <YAxis domain={[0, 100]}>
                  <Label
                    value="Confidence (%)"
                    angle={-90}
                    position="insideLeft"
                    fill="#bbb"
                    style={{ textAnchor: "middle", fontSize: 14 }}
                  />
                </YAxis>
                <Tooltip />
                <Legend />

                {/* 🎨 Multiple Emotion Lines */}
                <Line type="monotone" dataKey="Angry" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Fear" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Happy" stroke="#ffdd57" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Neutral" stroke="#9ca3af" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Sad" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Surprise" stroke="#a855f7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">Waiting for predictions...</p>
          )}
        </div>
      </div>

      <footer className="footer">Built with ❤️ by Sayan Kar</footer>
    </div>
  );
}

export default App;
