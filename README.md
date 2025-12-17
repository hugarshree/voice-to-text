# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)



# Voice-to-Text Desktop App with Tauri + Deepgram

A cross-platform desktop application that allows users to transcribe voice into text in real-time using the **Deepgram API** and **Tauri Framework**. This project is inspired by Wispr Flow and demonstrates a functional push-to-talk voice transcription workflow.

---

## 🛠️ Features

- **Push-to-Talk Voice Input:** Hold a button to start recording your voice.  
- **Microphone Access & Audio Capture:** High-quality audio recording with proper permission handling.  
- **Real-Time Transcription:** Audio is streamed to Deepgram for near real-time transcription.  
- **Display & Insert Text:** Transcribed text is displayed in a text area for easy copying or insertion.  
- **Recording Controls:** Clear start/stop controls with visual feedback on recording state.  
- **Error Handling:** Handles common failures like network issues or permission denials gracefully.

---

## 💻 Technology Stack

- **Frontend:** React with TypeScript  
- **Desktop Framework:** Tauri  
- **Speech-to-Text:** Deepgram API  
- **Backend (Tauri side):** Rust  

---

## ⚡ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/voice-to-text-tauri-deepgram.git
   cd voice-to-text-tauri-deepgram


Install dependencies:

npm install


Run the development app:

npm run tauri dev


Build for production:

npm run tauri build

📝 Usage

Open the app.

Click and hold the "Push-to-Talk" button to start recording.

Speak into your microphone.

Release the button to stop recording.

The transcribed text will appear in the text area.

🎥 Demo

📹 Demo Video Link: [Insert your Google Drive or YouTube link here]

⚙️ Configuration

Deepgram API Key:
Make sure you have a valid Deepgram API key. Create a .env file in the root directory with:

REACT_APP_DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY


Tauri Configuration:
The Tauri project is already set up for cross-platform desktop builds.

📂 Project Structure
voice-to-text/
├─ src/
│  ├─ App.tsx           # Main React component
│  ├─ index.tsx         # App entry point
├─ src-tauri/
│  ├─ Cargo.toml        # Rust dependencies
│  ├─ tauri.conf.json   # Tauri configuration
├─ package.json          # Node project metadata
├─ README.md

🏗️ Architecture Decisions

Separation of Concerns: UI, audio capture, and transcription logic are modular.

Real-Time Streaming: Using Deepgram’s WebSocket/REST API for fast transcription.

Error Handling: Network and permission errors are caught and displayed to users.

💡 Known Limitations

UI is functional but not pixel-perfect.

Advanced edge-case handling is minimal.

Only supports English transcription by default (Deepgram can be configured for more languages).
