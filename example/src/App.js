import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";

import { Recorder, useCapture } from "use-capture";

import Scene from "./Scene";

function App() {
  const { startRecording, isRecording } = useCapture();

  return (
    <>
      <div
        className={`recording ${isRecording && "active"}`}
        onClick={() => startRecording()}
      />
      <Canvas
        shadowMap
        colorManagement
        // 💡 preserveDrawingBuffer is mandatory
        gl={{
          preserveDrawingBuffer: true,
        }}
        // 💡 not having a clear color would glitch the recording
        onCreated={({ gl }) => {
          gl.setClearColor("#fff");
        }}
        concurrent
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        <Recorder
          duration={4}
          framerate={24}
          motionBlurFrames={0}
          format={"webm"}
          filename={"my-recording"}
        />
      </Canvas>
    </>
  );
}

export default App;
