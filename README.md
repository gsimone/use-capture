# WIP 🎥 r3f-ccapture

Record react-three-fiber scenes with [ccapture.js](https://github.com/spite/ccapture.js)

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
