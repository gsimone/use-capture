# 🎥 use-capture [![npm version](https://badge.fury.io/js/use-capture.svg)](https://badge.fury.io/js/use-capture)
Record react-three-fiber scenes with [ccapture.js](https://github.com/spite/ccapture.js)

## Notes

- Gif format doesn't work yet

## Usage

[Check a simple example on codesandbox](https://zgi8e.csb.app/)

#### 1️⃣ bind useCapture to your `react-three-fiber` canvas:
```jsx
import useCapture from "use-capture";

function App() {
  
  const [bind, startRecording] = useCapture({ duration: 2, fps: 60 });

  return (
    <>
    <Canvas
      // 💡 preserveDrawingBuffer is mandatory
      gl={{
        preserveDrawingBuffer: true,
      }}
      onCreated={bind}
    >
      {/* 💡 not having a clear color would glitch the recording */}
      <color attach="background" args={["#000"]} />
      <Scene duration={duration} />
    </Canvas>
  );
}
```

#### 2️⃣ call the `startRecording` function
```jsx
<button onClick={startRecording}> ⏺️ Start Recording </button>
```

Your file will start downloading as soon as it's done.
