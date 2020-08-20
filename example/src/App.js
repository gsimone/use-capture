import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Octahedron } from "drei";
import { Recorder, useCapture } from "use-capture";

function Scene() {
  const { getProgress } = useCapture();

  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.x = getProgress() * Math.PI * 2;
    mesh.current.rotation.y = getProgress() * Math.PI * 4;
  });

  return (
    <Octahedron ref={mesh} args={[2]} rotation={[Math.PI / 2, 0, 0]}>
      <meshNormalMaterial flatShadings />
    </Octahedron>
  );
}

function App() {
  const { startRecording, isRecording } = useCapture();

  return (
    <>
      <button className="recording" onClick={startRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      <Canvas
        // 💡 preserveDrawingBuffer is mandatory
        gl={{
          preserveDrawingBuffer: true,
        }}
      >
        {/* 💡 not having a clear color would glitch the recording */}
        <color attach="background" args={["#000"]} />
        <Scene />
        <Recorder
          duration={2}
          framerate={60}
          motionBlurFrames={1}
          filename={"my-recording"}
        />
      </Canvas>
    </>
  );
}

export default App;
