import React, { useState } from 'react';
import Recorder from './components/Recorder';
import TranscriptDisplay from './components/TranscriptDisplay';

export default function App() {
  const [data, setData] = useState(null);

  const handleData = async (form) => {
    try {
      const res = await fetch('http://localhost:4000/api/process', {
        method: 'POST',
        body: form,
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App p-4">
      <h1 className="text-xl font-bold mb-4">Meeting Recorder</h1>
      <Recorder onRecorded={handleData} />
      {data && <TranscriptDisplay data={data} />}
    </div>
  );
}