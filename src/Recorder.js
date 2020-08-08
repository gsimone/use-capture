import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { useFrame } from "react-three-fiber";
import CCapture from "ccapture.js";

const recorderContext = createContext({ playhead: 0 });

export function useRecorder() {
  const { playhead, duration, startRecording } = useContext(recorderContext);

  // this could be moved to the component, making this hook just a convenience thing
  const getProgress = useCallback(() => {
    return playhead.current / duration;
  }, [playhead, duration]);

  return { playhead, duration, getProgress, startRecording };
}

function Recorder({
  format = "webm",
  duration = 2,
  framerate = 24,
  verbose = false,
  motionBlurFrames,
  children,
}) {
  const capturer = useMemo(() => {
    return new CCapture({
      format,
      framerate,
      verbose,
      motionBlurFrames,
      display: true,
    });
  }, [format, framerate, motionBlurFrames, verbose]);

  const state = useRef({
    shouldRecord: false,
    isRecording: false,
    prevPlayhead: 0,
  });

  const playhead = useRef(0);

  const startRecording = useCallback(() => {
    state.current.shouldRecord = true;
    playhead.current = 0;
  }, [state, playhead]);

  useFrame(({ clock, gl }) => {
    let currentPlayhead = clock.getElapsedTime() % duration;

    if (state.current.isRecording && currentPlayhead < playhead.current) {
      state.current.shouldRecord = false;
      state.current.isRecording = false;
      capturer.stop();
      capturer.save();
    }

    if (
      !state.current.isRecording &&
      state.current.shouldRecord &&
      currentPlayhead < playhead.current
    ) {
      state.current.isRecording = true;
      capturer.start();
    }

    if (state.current.isRecording) {
      capturer.capture(gl.domElement);
    }

    playhead.current = currentPlayhead;
  });

  return (
    <recorderContext.Provider value={{ playhead, duration, startRecording }}>
      {children}
    </recorderContext.Provider>
  );
}

export default Recorder;
