import * as THREE from 'three'
import * as React from 'react'
import { useRef, useCallback, useMemo, useEffect, useState } from 'react'
// @ts-ignore
import CCapture from './ccapture.js/src/CCapture.js'

type RecorderContext = [
  () => void, 
  {
    playhead: number
    duration: number
    isRecording: boolean
    startRecording: () => void
    stopRecording: () => void
    getProgress: () => number
    getPlayhead: () => number
  }
]

type RecorderProps = {
  format: 'webm' | 'gif' | 'jpeg'
  duration: number
  framerate: number
  verbose: boolean
  motionBlurFrames: number
  children: React.ReactNode
  showWidget: boolean
  filename: string
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

export function useCapture({
  format = 'webm',
  duration = 2,
  framerate = 24,
  fps = 24,
  verbose = false,
  motionBlurFrames = 0,
  showWidget = false,
  filename = 'recording',
  onFrame
}): RecorderContext {
  const [, setRecording] = useState(false)
  
  const capturer = useMemo(() => {
    return new CCapture({
      format,
      framerate: fps || framerate,
      verbose,
      motionBlurFrames,
      display: showWidget,
    })
  }, [format, fps, framerate, motionBlurFrames, showWidget, verbose])

  const [clock] = useState(new THREE.Clock())
  const gl = useRef()

  const bind = useCallback((context) => {
    context.clock.getElapsedTime = () => state.playhead % duration
    gl.current = context.gl
  }, [])

  const loop = useCallback((t) => {

    let currentPlayhead = clock.getElapsedTime() % duration

    if (state.isRecording && currentPlayhead < state.playhead) {
      state.shouldRecord = false
      state.isRecording = false
      capturer.stop()
      capturer.save((blob: Blob) => {
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
      capturer.capture(gl.current.domElement)
    }

    state.playhead = currentPlayhead

    requestAnimationFrame(loop)

  }, [])

  useEffect(() => {
    requestAnimationFrame(loop)
  }, [loop])


  return [
    bind, startRecording, {
    stopRecording,
    getProgress,
    getPlayhead,
    ...state,
  }]
}

function getExtension(format: string): string {
  if (format === 'webm' || format === 'gif') return format

  return 'tar'
}
