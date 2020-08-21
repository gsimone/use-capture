import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Octahedron } from "drei";
import { useTweaks, makeButton, makeDirectory } from "use-tweaks";

import useCapture from "use-capture";

function Scene({ duration }) {
  const mesh = useRef();

  useFrame(({ clock }) => {
    const progress = clock.getElapsedTime() / duration;

    mesh.current.rotation.y = progress * Math.PI * 2;
    mesh.current.position.z = Math.sin(progress * Math.PI * 2) * 2;
  });

  return (
    <Octahedron ref={mesh} args={[2]} rotation={[Math.PI / 2, 0, 0]}>
      <meshNormalMaterial flatShadings />
    </Octahedron>
  );
}

const tweaks = {
  fps: { value: 60, min: 12, max: 120 },
  duration: { value: 2, min: 1, max: 4 },
  ...makeDirectory(
    "Advanced",
    {
      format: { value: "webm", options: { webm: "webm" } },
      motionBlurFrames: 0,
    },
    { expanded: false }
  ),
};

function App() {
  const { duration, fps } = useTweaks(tweaks);
  const [bind, startRecording] = useCapture({ duration, fps });
  useTweaks(makeButton("Start Recording", startRecording));

  return (
    <Canvas
      // 💡 preserveDrawingBuffer is mandatory
      gl={{
        preserveDrawingBuffer: true,
      }}
      onCreated={bind}
    >
      {/* 💡 not having a clear color would glitch the recording */}
      <color attach="background" args={["#000"]} />
      <Scene duration={duration} />
    </Canvas>
  );
}

export default App;
