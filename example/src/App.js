import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { ChromaticAberration, EffectComposer } from "react-postprocessing";

import { Recorder } from "use-capture";
import { useCapture } from "use-capture";

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
        camera={{
          position: [0, 0, -10],
        }}
        concurrent
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <EffectComposer>
          <ChromaticAberration offset={[0.004, 0.004]} />
        </EffectComposer>
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
