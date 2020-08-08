import React, { useRef, useEffect } from "react";
import * as THREE from "three";

import { useFrame } from "react-three-fiber";
import {
  Box,
  Octahedron,
  OrbitControls,
  PerspectiveCamera,
  Torus,
  useTextureLoader,
} from "drei";

import { useCCapture } from "use-ccapture";
import { useControl } from "react-three-gui";

import vert from "./shaders/default.vert";
import frag from "./shaders/default.frag";

function Babb() {
  return <></>;
}

export default function Scene() {
  const { startRecording } = useCCapture();

  useControl("Start Recording", {
    type: "button",
    onClick: startRecording,
  });

  const { getProgress } = useCCapture();
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
