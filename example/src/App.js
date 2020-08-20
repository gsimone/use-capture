import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { ChromaticAberration, EffectComposer } from "react-postprocessing";

import { Recorder } from "use-capture";
import { useCapture } from "use-capture";

import Tweakpane from "tweakpane";

import Scene from "./Scene";

const pane = new Tweakpane();

const SETTINGS = {
  duration: 2,
  framerate: 24,
  motionBlur: 0,
  format: "webm",
};

pane.addInput(SETTINGS, "duration", { min: 0, max: 10, step: 0.0001 });
pane.addInput(SETTINGS, "framerate");
pane.addInput(SETTINGS, "motionBlur");
pane.addInput(SETTINGS, "format", { options: { gif: "gif", webm: "webm" } });

function App() {
  const { startRecording } = useCapture();

  const [, set] = useState();
  const { duration, framerate, motionBlur, format } = SETTINGS;

  useEffect(() => {
    pane.on("change", (value) => {
      set(value);
      return value;
    });

    const btn = pane.addButton({ title: "Start Recording" });

    btn.on("click", () => {
      startRecording();
    });
  }, [startRecording]);

  return (
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
        duration={duration}
        framerate={framerate}
        motionBlurFrames={motionBlur}
        format={format}
      />
    </Canvas>
  );
}

export default App;
