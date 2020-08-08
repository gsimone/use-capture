import React, { useRef } from 'react'
import { useFrame} from 'react-three-fiber'
import { Octahedron, PerspectiveCamera } from 'drei';

import { usePlayhead } from './Recorder'

import vert from './shaders/default.vert'
import frag from './shaders/default.frag'

function Box() {

  const ref = useRef()

  const { getProgress } = usePlayhead()
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y = (getProgress() / 2 ) * Math.PI 
  })

  return (
      <Octahedron args={[1, 2]} ref={ref}>
        <shaderMaterial vertexShader={vert} fragmentShader={frag} />
      </Octahedron>
    )
}

function AnimatedCamera() {

  const cam = useRef()

  const { getProgress } = usePlayhead()
  useFrame(() => {
    cam.current.position.z = Math.sin(getProgress() * Math.PI) * 12 + 1
    cam.current.lookAt(0, 0, 0)
  })
  
  return (
    <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={cam} />
  )
}

export default function Scene() {

  return (
    <>
      <AnimatedCamera />
      <Box />
    </>
  )

}
