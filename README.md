# WIP 🎥 r3f-ccapture
Record react-three-fiber scenes with [ccapture.js](https://github.com/spite/ccapture.js)

<img src="https://raw.githubusercontent.com/gsimone/r3f-ccapture/master/octa.gif" width="200" />

Discussion: https://github.com/react-spring/drei/issues/84


## Notes

- the ccapture.js dependency is a git submodule of a fork, until the original is updated & published 
- Press R to start recording (customization for this behaviour coming)
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
duration: 2, // record time
framerate: 60, // frames per second
format: "webm", // output format ( webm, jpg, gif )
```

### usePlayhead

A hook to fetch the current playhead status

```js
const { getProgress, duration, playhead } = usePlayhead()
useFrame(() => {

   ref.current.rotation.x = Math.sin( getProgress() ) 

})
```


