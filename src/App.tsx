import { useEffect, useRef, useState } from "react";
import "./App.css";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let text = "";
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscript(text);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Speech Recognition not supported in this browser");
    }
  }, []);

  const startRecording = async () => {
    setTranscript("");
    setIsRecording(true);

    // Start speech recognition
    recognitionRef.current?.start();

    // Start audio recording
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current?.stop();
    mediaRecorderRef.current?.stop();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>🎤 Voice to Text</h1>

      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isRecording ? "Listening..." : "Hold to Speak"}
      </button>

      <h3 style={{ marginTop: "20px" }}>Recorded Audio:</h3>
      {audioUrl && <audio controls src={audioUrl}></audio>}

      <h3 style={{ marginTop: "20px" }}>Transcribed Text:</h3>
      <textarea
        rows={6}
        style={{ width: "100%", marginTop: "10px" }}
        value={transcript}
        readOnly
      />
    </div>
  );
}

export default App;
