# 🎥 use-capture [![npm version](https://badge.fury.io/js/use-capture.svg)](https://badge.fury.io/js/use-capture)
Record react-three-fiber scenes with [ccapture.js](https://github.com/spite/ccapture.js)

## Notes

- Gif format doesn't work yet

## Usage

[Check a simple example on codesandbox](https://zgi8e.csb.app/)

1. Add the Render component to you react-three-fiber Canvas
```jsx
import { Recorder } from 'use-capture'

<Canvas>
  ...yourScene
  <Recorder duration={2} framerate={30} />
</Canvas>
```
*NOTE*: the Recorder component doesn't need to wrap around your app but make sure it's inside the `<Canvas />`

2. Animate using the recorder progress or playhead
```jsx
const { getProgress } = useCapture()

useFrame(() => {
  // eg. full rotation
  mesh.current.rotation.x = getProgress() * Math.PI * 2 
})
```

3. start recording by using the hook anywhere in your app
```jsx
const { startRecording } = useCapture()

<button onClick={startRecording}>Record</button>
```

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
