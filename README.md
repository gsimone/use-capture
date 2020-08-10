# WIP 🎥 use-ccapture
Record react-three-fiber scenes with [ccapture.js](https://github.com/spite/ccapture.js)

<img src="https://raw.githubusercontent.com/gsimone/use-ccapture/master/octa.gif" width="200" />

Discussion: https://github.com/react-spring/drei/issues/84

## Test local

```
yarn && yarn start
```

## Notes

- the ccapture.js dependency is a git submodule of a fork, until the original is updated & published 
- Gif format doesn't work yet

## Usage

Basic example

```jsx
import {Canvas, useFrame} from 'react-three-fiber'
import { Recorder, useCapture } from 'use-ccapture';

export const App = () => {

  const ref = useRef() 

  const { getProgress } = useCapture()
  useFrame(() => {
    ref.current.rotation.x = getProgress()
  }) 
  
  return (
     <>
      <Canvas
          gl={{ preserveDrawingBuffer: true }}
          onCreated={({gl}) => gl.setClearColor('#000')}
       >
         <mesh ref={ref} />
        <Recorder  duration={2} framerate={60} />
       </Canvas>
     </>
   );
}
```

*NOTE*: the Recorder component doesn't need to wrap around your app but make sure it's inside the `<Canvas />`

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
