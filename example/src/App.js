import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import {
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "react-postprocessing";

import { Recorder } from "use-ccapture";

import Scene from "./Scene";
import { Controls, useControl } from "react-three-gui";

function useIntControl(name, { value, ...opts }) {
  const [intVal, setVal] = React.useState(value);

  const setIntVal = React.useCallback(
    (val) => {
      setVal(parseInt(val, 10));
    },
    [setVal]
  );

  useControl(name, {
    type: "number",
    value: intVal,
    ...opts,
    state: [intVal, setIntVal],
  });

  return intVal;
}

function App() {
  const duration = useIntControl("Duration", { value: 4, max: 120 });
  const fps = useIntControl("Framerate", { value: 60, min: 12, max: 120 });
  const motionBlurFrames = useIntControl("Motion blur frames", {
    value: 0,
    max: 12,
  });
  const format = useControl("Format", {
    type: "select",
    value: "webm",
    items: ["webm", "gif", "jpg"],
  });

  return (
    <>
      <Canvas
        shadowMap
        colorManagement
        style={{
          background: "#121212",
        }}
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
          <Recorder
            duration={duration}
            framerate={fps}
            motionBlurFrames={motionBlurFrames}
            format={format}
          >
            <Scene />
          </Recorder>
        </Suspense>
        <EffectComposer>
          <ChromaticAberration offset={[0.004, 0.004]} />
        </EffectComposer>
      </Canvas>
      <Controls />
    </>
  );
}

export default App;
