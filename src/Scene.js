import React, { useRef, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import { Octahedron, PerspectiveCamera } from "drei";

import { useRecorder } from "./Recorder";

import vert from "./shaders/default.vert";
import frag from "./shaders/default.frag";
import { useControl } from "react-three-gui";

function Box() {
  const ref = useRef();

  const { getProgress } = useRecorder();
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y =
      (getProgress() / 2) * Math.PI;
  });

  return (
    <Octahedron args={[1, 2]} ref={ref}>
      <shaderMaterial vertexShader={vert} fragmentShader={frag} />
    </Octahedron>
  );
}

function AnimatedCamera() {
  const cam = useRef();

  const { getProgress } = useRecorder();
  useFrame(() => {
    cam.current.position.z = Math.sin(getProgress() * Math.PI) * 12 + 1;
    cam.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={cam} />;
}

export default function Scene() {
  const { startRecording } = useRecorder();

  useControl("Start Recording", {
    type: "button",
    onClick: startRecording,
  });

  return (
    <>
      <AnimatedCamera />
      <Box />
    </>
  );
}
