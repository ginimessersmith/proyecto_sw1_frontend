import { Mic, Send, Stop } from "@mui/icons-material";
import React, { useRef, useState } from "react";

const mimeType = "audio/webm";

export const SendMessage = ({ onSend }) => {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const mediaRecorder = useRef(null);

  const [mensaje, setMensaje] = useState('');

  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  let st;

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
        st = streamData;
        console.log(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const toggleRecording = () => {
    if (!recording) {
      if (!permission) getMicrophonePermission();
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    setRecording(true);
    const streamToUse = stream || st;

    if (streamToUse) {
      const media = new MediaRecorder(streamToUse, { type: mimeType });
      mediaRecorder.current = media;
      let localAudioChunks = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined" || event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(localAudioChunks, { type: mimeType });
        // console.log(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        onSend(audioBlob);
        setAudio(audioUrl);
        setAudioChunks([]);
      };

      mediaRecorder.current.start();
    } else {
      // Handle the case when the stream is not available
      console.error("Stream not available");
      setRecording(false);
    }
  };

  const stopRecording = () => {
    setRecording(false);
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  const handleInputChange = (event) => {
    setMensaje(event.target.value);
  };

  return (
    <div className="type_msg row">
      <div className="input_msg_write col-sm-9">
        <input
          type="text"
          className="write_msg"
          placeholder="Mensaje..."
          value={mensaje}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-sm-3 text-center">
        <button
          type="button"
          style={{ background: recording ? "red" : "" }}
          onClick={toggleRecording}
        >
          {recording ? <Stop /> : <Mic />}
        </button>

        <button
          className="msg_send_btn mt-3"
          type="button"
          onClick={() => onSend(mensaje)}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};
