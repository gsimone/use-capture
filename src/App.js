import React from "react";
import { Canvas } from "react-three-fiber";
import {
  EffectComposer,
  Noise,
  Vignette,
} from "react-postprocessing";

import Scene from "./Scene";
import Recorder from './Recorder';

function App() {
  return (
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
      onCreated={({gl}) => {
        gl.setClearColor('#000')
      }}
      concurrent
    >
      <Recorder>
        <EffectComposer
          duration={2} 
          framerate={60} 
          motionBlurFrames={4} 
          format={"webm"}
        >
          <Noise opacity={0.1} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
        <Scene />
      </Recorder>
    </Canvas>
  );
}

export default App;
