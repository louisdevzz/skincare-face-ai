'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function CameraCaptureComponent() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageInfo, setImageInfo] = useState<{ width: number; height: number; type: string } | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing the camera", err)
    }
  }, [])

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
        setImageSrc(imageDataUrl)

        // Get image information
        const img = new Image()
        img.onload = () => {
          setImageInfo({
            width: img.width,
            height: img.height,
            type: 'JPEG'
          })
        }
        img.src = imageDataUrl
      }
    }
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Camera Capture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!imageSrc && (
            <video ref={videoRef} autoPlay playsInline className="w-full h-64 bg-gray-200 rounded-lg" />
          )}
          {imageSrc && (
            <img src={imageSrc} alt="Captured" className="w-full h-64 object-cover rounded-lg" />
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!imageSrc ? (
          <>
            <Button onClick={startCamera}>Start Camera</Button>
            <Button onClick={capturePhoto}>Take Photo</Button>
          </>
        ) : (
          <Button onClick={() => setImageSrc(null)}>Retake</Button>
        )}
      </CardFooter>
      {imageInfo && (
        <CardContent>
          <h3 className="font-semibold mb-2">Image Information:</h3>
          <p>Width: {imageInfo.width}px</p>
          <p>Height: {imageInfo.height}px</p>
          <p>Type: {imageInfo.type}</p>
        </CardContent>
      )}
    </Card>
  )
}