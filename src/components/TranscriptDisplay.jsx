import React from 'react';

export default function TranscriptDisplay({ data }) {
  return (
    <div>
      <section>
        <h2>Transcript</h2>
        <pre>{data.transcript}</pre>
      </section>
      <section>
        <h2>Summary</h2>
        <p>{data.summary}</p>
      </section>
      <section>
        <h2>Translation</h2>
        <p>{data.translation}</p>
      </section>
    </div>
  );
}