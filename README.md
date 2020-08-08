# WIP 🎥 r3f-ccapture
Record react-three-fiber scenes with [ccapture.js](https://github.com/spite/ccapture.js)

<img src="https://raw.githubusercontent.com/gsimone/r3f-ccapture/master/octa.gif" width="200" />

Discussion: https://github.com/react-spring/drei/issues/84

## Test local

```
yarn && yarn start
```

## Notes

- the ccapture.js dependency is a git submodule of a fork, until the original is updated & published 
- Gif format doesn't work yet

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

## API

### <Recorder />

A context provider, wrap around the components that need to access recording status

Props:
```js
<Recorder
  duration={2} // record time
  framerate={24} // frames per second
  format={webm} // output format ( webm, jpg, gif )
  motionBlurFrames={4} // number of frames used to generate motion blur
>
   ...yourScene
</Recorder>
```

### useRecorder

A hook to fetch the current playhead status

```js
const { getProgress, duration, playhead, startRecording } = useRecorder()

useFrame(() => {
   ref.current.rotation.x = Math.sin( getProgress() ) 
})
```


