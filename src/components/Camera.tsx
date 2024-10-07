'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Camera, RefreshCw } from 'lucide-react'

export default function FaceScan() {
  const [isScanning, setIsScanning] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isScanning) {
      startCamera()
    } else {
      stopCamera()
    }
  }, [isScanning])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing the camera", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
        setCapturedImage(imageDataUrl)
        setIsScanning(false)
      }
    }
  }

  const resetScan = () => {
    setCapturedImage(null)
    setIsScanning(true)
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-0 relative">
        {isScanning ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-80 border-4 border-dashed border-white rounded-full opacity-50" />
            </div>
            <p className="absolute bottom-4 left-0 right-0 text-center text-white text-lg font-semibold">
              Place your face inside the circle for a better result
            </p>
          </>
        ) : capturedImage ? (
          <img src={capturedImage} alt="Captured face" className="w-full h-[600px] object-cover" />
        ) : (
          <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 text-lg">Start scanning to capture your face</p>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-gray-100">
        {!isScanning && !capturedImage && (
          <Button onClick={() => setIsScanning(true)} className="w-full">
            <Camera className="mr-2 h-4 w-4" /> Start Scan
          </Button>
        )}
        {isScanning && (
          <Button onClick={captureImage} className="w-full">
            <Camera className="mr-2 h-4 w-4" /> Capture
          </Button>
        )}
        {capturedImage && (
          <Button onClick={resetScan} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Rescan
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}