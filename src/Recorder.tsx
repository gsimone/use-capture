import * as React from 'react'
import { useMemo, useEffect, useState } from 'react'
import { useFrame, addAfterEffect } from 'react-three-fiber'
// @ts-ignore
import CCapture from './ccapture.js/src/CCapture.js'

type RecorderContext = {
  playhead: number
  duration: number
  isRecording: boolean
  startRecording: () => void
  stopRecording: () => void
  getProgress: () => number
  getPlayhead: () => number
}

type RecorderProps = {
  format: 'webm' | 'gif' | 'jpeg'
  duration: number
  framerate: number
  verbose: boolean
  motionBlurFrames: number
  children: React.ReactNode,
  showWidget: boolean,
}

const state = {
  shouldRecord: false,
  isRecording: false,
  prevPlayhead: 0,
  playhead: 0,
  duration: 0
}

const startRecording = () => {
  state.shouldRecord = true
  state.playhead = 0
}

const stopRecording =() => {
  console.log('TBI')
}

const getProgress = () => {
  return state.playhead / state.duration
}

const getPlayhead = () => {
  return state.playhead
}

export function useCapture(): RecorderContext {
  return { 
    startRecording, 
    stopRecording, 
    getProgress, 
    getPlayhead, 
    ...state,
  }
}

export function useRecordingState(): boolean {
  const [recording, setRecording] = useState(false)
  const { isRecording } = useCapture();

  addAfterEffect(() => {
    setRecording(isRecording)
    return false
  })

  return recording
}


export function Recorder({
  format = 'webm',
  duration = 2,
  framerate = 24,
  verbose = false,
  motionBlurFrames = 0,
  showWidget = false,
}: RecorderProps): React.ReactNode {

  const capturer = useMemo(() => {
    return new CCapture({
      format,
      framerate,
      verbose,
      motionBlurFrames,
      display: showWidget,
    })
  }, [format, framerate, motionBlurFrames, showWidget, verbose])

  useEffect(() => {
    state.duration = duration
  }, [duration])

  useFrame(({ clock, gl }) => {
    let currentPlayhead = clock.getElapsedTime() % duration

    if (state.isRecording && currentPlayhead < state.playhead) {
      state.shouldRecord = false
      state.isRecording = false
      capturer.stop()
      capturer.save()
    }

    if (!state.isRecording && state.shouldRecord && currentPlayhead < state.playhead) {
      state.isRecording = true
      capturer.start()
    }

    if (state.isRecording) {
      capturer.capture(gl.domElement)
    }

    state.playhead = currentPlayhead
  })

  return null
}

export default Recorder
