import React, { useRef } from "react";
import * as THREE from "three";

import { useFrame } from "react-three-fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Torus,
  useTextureLoader,
} from "drei";

import { useCapture, useRecordingState } from "use-capture";
import { useControl } from "react-three-gui";

export default function Scene() {
  const { getProgress, startRecording, stopRecording } = useCapture();
  const isRecording = useRecordingState();

  useControl("Start Recording", {
    type: "button",
    onClick: React.useCallback(() => {
      console.log("rec");
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    }, [isRecording, stopRecording, startRecording]),
  });

  const map = useTextureLoader("./patt3.jpg");

  const texture = useRef();
  useFrame(() => {
    texture.current.offset.x = texture.current.offset.y = getProgress();
  });

  return (
    <>
      <primitive
        object={map}
        ref={texture}
        wrapS={THREE.RepeatWrapping}
        wrapT={THREE.RepeatWrapping}
        repeat={[2, 4]}
      />

      <Torus args={[2, 1.5, 120, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial map={map} color="white" side={THREE.BackSide} />
      </Torus>
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 0, -4]} />
      <directionalLight position={[0, 0, -2]} />
    </>
  );
}
