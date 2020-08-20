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
  children: React.ReactNode
  showWidget: boolean
}

const state = {
  shouldRecord: false,
  isRecording: false,
  prevPlayhead: 0,
  playhead: 0,
  duration: 0,
}

const startRecording = () => {
  state.shouldRecord = true
  state.playhead = 0
}

const stopRecording = () => {
  console.log('TBI')
}

const getProgress = () => {
  return state.playhead / state.duration
}

const getPlayhead = () => {
  return state.playhead
}

export function useCapture(): RecorderContext {
  const [, setRecording] = useState(false)

  addAfterEffect(() => {
    setRecording(state.isRecording)
    return false
  })

  return {
    startRecording,
    stopRecording,
    getProgress,
    getPlayhead,
    ...state,
  }
}

function getExtension(format: string): string {
  if (format === 'webm' || format === 'gif') return format

  return 'tar'
}

export function Recorder({
  format = 'webm',
  duration = 2,
  framerate = 24,
  verbose = false,
  motionBlurFrames = 0,
  showWidget = false,
  filename = 'recording',
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
      capturer.save((blob) => {
        const fileURL = window.URL.createObjectURL(blob)
        const tempLink = document.createElement('a')
        tempLink.href = fileURL
        tempLink.setAttribute('download', `${filename}.${getExtension(format)}`)
        tempLink.click()
      })
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
