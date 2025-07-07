
import React, { useRef, useState } from 'react';

export default function Recorder({ onRecorded }) {
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
    mediaRecorder.ondataavailable = e => setChunks(prev => [...prev, e.data]);
  };

  const stop = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', blob, 'meeting.webm');
      formData.append('targetLang', 'es');
      onRecorded(formData);
      setChunks([]);
    };
  };

  return (
    <div>
      <button
        onClick={recording ? stop : start}
        className="p-2 bg-blue-500 text-white rounded"
      >
        {recording ? 'Stop' : 'Record'}
      </button>
    </div>
  );
}
