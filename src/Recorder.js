import React, { useRef, useMemo, useEffect, createContext, useContext } from 'react'
import { useFrame} from 'react-three-fiber'
import CCapture from "ccapture.js";

const recorderContext = createContext({ playhead: 0 })

export function usePlayhead() {

  const { playhead, duration } = useContext(recorderContext)

  const getProgress = React.useCallback(() => {
    return playhead.current / duration
  }, [ playhead, duration ])

  return { playhead, duration, getProgress }

}

function Recorder({ 
  format = "webm",
  key = "r", 
  duration = 2, 
  framerate = 24, 
  verbose = false, 
  motionBlurFrames, 
  children
}) {
  const capturer = useMemo(() => {
    return new CCapture({
      format,
      framerate,
      verbose,
      motionBlurFrames,
      display: true
    })
  }, [format, framerate, motionBlurFrames, verbose])

  const state = useRef({
    shouldRecord: false,
    isRecording: false,
    prevPlayhead: 0
  })

  const handleKey = React.useCallback((e) => {
    if (e.key === key) {
      state.current.shouldRecord = true
      playhead.current = 0
    }
  }, [key])

  useEffect(() => {
    document.addEventListener('keyup', handleKey)

    return () => document.removeEventListener('keyup', handleKey)
  }, [handleKey])

  const playhead = useRef(0)
  useFrame(({ clock, gl }) => {

    let currentPlayhead = clock.getElapsedTime() % duration;

    if(state.current.isRecording && currentPlayhead < playhead.current){
      state.current.shouldRecord = false;
      state.current.isRecording = false;
      capturer.stop();
      capturer.save();
    }

    if(!state.current.isRecording && state.current.shouldRecord && currentPlayhead < playhead.current){
      state.current.isRecording = true;
      capturer.start();
    }

    if(state.current.isRecording){
      capturer.capture(gl.domElement)
    }

    playhead.current = currentPlayhead
  })
  
  return <recorderContext.Provider value={{ playhead, duration }}>{children}</recorderContext.Provider>
}


export default Recorder
