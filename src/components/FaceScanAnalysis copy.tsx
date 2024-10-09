'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, RefreshCw, Droplet, Zap, Leaf } from 'lucide-react'

export default function FaceScanAnalysisComponent() {
  const [isScanning, setIsScanning] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [analysisComplete, setAnalysisComplete] = useState(false)
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
        // Simulate analysis
        setTimeout(() => setAnalysisComplete(true), 2000)
      }
    }
  }

  const resetScan = () => {
    setCapturedImage(null)
    setIsScanning(true)
    setAnalysisComplete(false)
  }

  const AnalysisBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Face Scan Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            {isScanning ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-64 border-4 border-dashed border-white rounded-full opacity-50" />
                </div>
                <p className="absolute bottom-4 left-0 right-0 text-center text-white text-lg font-semibold">
                  Place your face inside the circle for a better result
                </p>
              </>
            ) : capturedImage ? (
              <img src={capturedImage} alt="Captured face" className="w-full h-[400px] object-cover" />
            ) : (
              <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Start scanning to capture your face</p>
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
          </div>
          <div className="p-4">
            {analysisComplete ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Skin Analysis Results</h3>
                <AnalysisBar label="Acne" value={20} color="bg-red-500" />
                <AnalysisBar label="Texture" value={60} color="bg-green-500" />
                <AnalysisBar label="Hydration" value={80} color="bg-blue-500" />
                <AnalysisBar label="Irritation" value={10} color="bg-yellow-500" />
                <Tabs defaultValue="morning" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="morning">Morning</TabsTrigger>
                    <TabsTrigger value="evening">Evening</TabsTrigger>
                  </TabsList>
                  <TabsContent value="morning">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Droplet className="h-6 w-6 text-blue-500" />
                        <div>
                          <h4 className="font-semibold">Cleanser</h4>
                          <p className="text-sm text-gray-600">Gentle Skin Facial Salicylic Acid Cleanser</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Zap className="h-6 w-6 text-purple-500" />
                        <div>
                          <h4 className="font-semibold">Serum</h4>
                          <p className="text-sm text-gray-600">Niacinamide 10% Zinc 1% Oil Control Serum</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Leaf className="h-6 w-6 text-green-500" />
                        <div>
                          <h4 className="font-semibold">Moisturizer</h4>
                          <p className="text-sm text-gray-600">Ultra Facial Oil-Free Gel Cream</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="evening">
                    <p>Evening routine recommendations will be provided soon.</p>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500 text-lg">Scan your face to see analysis results</p>
              </div>
            )}
          </div>
        </div>
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