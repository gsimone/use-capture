# 🎥 use-capture [![npm version](https://badge.fury.io/js/use-capture.svg)](https://badge.fury.io/js/use-capture)
Record react-three-fiber scenes with [ccapture.js](https://github.com/spite/ccapture.js)

## Notes

- Gif format doesn't work yet

## Usage

Basic example

```jsx
import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Recorder, useCapture } from 'use-capture';

function Scene() {
  const { getProgress } = useCapture()

  useFrame(() => {
     ref.current.rotation.x = Math.PI*2 * getProgress()
  })

  return <meshBufferGeometry ref={ref} />
}

export const App = () => {
  const { startRecording } = useCapture()
  
  return (<>
    <button onClick={startRecording}>Record</button>
    <Canvas
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({gl}) => gl.setClearColor('#000')}
      >
      <Scene />
      <Recorder duration={2} framerate={60} />
    </Canvas>
  <>);
}
```

*NOTE*: the Recorder component doesn't need to wrap around your app but make sure it's inside the `<Canvas />` because it relies on react-three-fiber's `useFrame`

## Requisites

- Set a clear color on the canvas
- set preserveDrawingBuffer=true on the renderer

```jsx
<Canvas
  // 💡 preserveDrawingBuffer is mandatory
  gl={{
    preserveDrawingBuffer: true,
  }}

  // 💡 not having a clear color would glitch the recording
  onCreated={({gl}) => {
    gl.setClearColor('#000')
  }}
>
```
