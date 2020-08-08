import * as React from 'react'
import { useRef, useMemo, useEffect, useCallback, createContext, useContext, Ref } from 'react'
import { useFrame } from 'react-three-fiber'
import CCapture from 'ccapture.js'

type RecorderContext = {
  playhead: Ref<number>
  duration: number
  startRecording: () => void
  stopRecording: () => void
  getProgress: () => number
  getPlayhead: () => number
}

const recorderContext = createContext<RecorderContext>({} as RecorderContext)

type RecorderProps = {
  format: 'webm' | 'gif' | 'jpeg'
  duration: number
  framerate: number
  verbose: boolean
  motionBlurFrames: number
  children: React.ReactNode
}

// convenience hook
export function useRecorder(): RecorderContext {
  return useContext(recorderContext)
}

export function Recorder({
  format = 'webm',
  duration = 2,
  framerate = 24,
  verbose = false,
  motionBlurFrames = 0,
  children,
}: RecorderProps): React.ReactNode {
  const capturer = useMemo(() => {
    return new CCapture({
      format,
      framerate,
      verbose,
      motionBlurFrames,
      display: true,
    })
  }, [format, framerate, motionBlurFrames, verbose])

  const state = useRef({
    shouldRecord: false,
    isRecording: false,
    prevPlayhead: 0,
  })

  const playhead = useRef(0)

  const startRecording = useCallback(() => {
    state.current.shouldRecord = true
    playhead.current = 0
  }, [state, playhead])

  const stopRecording = useCallback(() => {
    console.log('TBI')
  }, [])

  useFrame(({ clock, gl }) => {
    let currentPlayhead = clock.getElapsedTime() % duration

    if (state.current.isRecording && currentPlayhead < playhead.current) {
      state.current.shouldRecord = false
      state.current.isRecording = false
      capturer.stop()
      capturer.save()
    }

    if (!state.current.isRecording && state.current.shouldRecord && currentPlayhead < playhead.current) {
      state.current.isRecording = true
      capturer.start()
    }

    if (state.current.isRecording) {
      capturer.capture(gl.domElement)
    }

    playhead.current = currentPlayhead
  })

  const getProgress = useCallback(() => {
    return playhead.current / duration
  }, [playhead, duration])

  const getPlayhead = useCallback(() => {
    return playhead.current
  }, [playhead])

  return (
    <recorderContext.Provider value={{ playhead, duration, startRecording, stopRecording, getProgress, getPlayhead }}>
      {children}
    </recorderContext.Provider>
  )
}

export default Recorder
