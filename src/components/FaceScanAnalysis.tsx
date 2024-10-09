'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, RefreshCw, Droplet, Zap, Leaf } from 'lucide-react'
//import RadarChart from './RadarChart';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

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

  const data = [
    {
      data: {
        skinHealth: 0.8,
        firmness: 0.7,
        oiliness: 0.6,
        moisture: 0.9,
        redness: 0.5,
        acne: 0.4,
        wrinkles: 0.3,
        tearTrough: 0.6,
        droopyLowerEyelid: 0.5,
        droopyUpperEyelid: 0.4,
        pores: 0.7,
        darkCircles: 0.6,
        texture: 0.8,
        spots: 0.5,
        radiance: 0.9,
        eyeBags: 0.4
      },
      meta: { color: 'blue' }
    }
  ];

  const captions = {
    skinHealth: 'Skin Health 20%',
    firmness: 'Firmness',
    oiliness: 'Oiliness',
    moisture: 'Moisture',
    redness: 'Redness',
    acne: 'Acne',
    wrinkles: 'Wrinkles',
    tearTrough: 'Tear Trough',
    droopyLowerEyelid: 'Droopy Lower Eyelid',
    droopyUpperEyelid: 'Droopy Upper Eyelid',
    pores: 'Pores',
    darkCircles: 'Dark Circles',
    texture: 'Texture',
    spots: 'Spots',
    radiance: 'Radiance',
    eyeBags: 'Eye Bags'
  };


  return (
    <div className='flex flex-row items-center justify-center w-full h-screen'>
      <div className='flex flex-row overflow-hidden gap-40'>
        {isScanning && (
            <video ref={videoRef} autoPlay className='border border-gray-200 h-[600px] w-[400px] p-4 object-cover'></video>
        )}
        {
          !isScanning && (
            <div className='border border-gray-400 rounded-md h-[600px] w-[400px] p-4 flex flex-col items-center gap-4'>
              <div className='flex flex-col items-center mt-10'>
                <h2 className='text-lg'>Get Ready to Start Skin Analysis</h2>
                <h3 className='text-xl font-semibold'>INSTRUCTIONS</h3>
              </div>
              <ul className='list-none'>
                <li className='flex items-center mb-2 border border-gray-300 p-2 rounded-md text-sm gap-2'>
                  <span className='text-4xl'>👓</span>
                  <span className='ml-2'>Take off your glasses and make sure bangs are not covering your forehead</span>
                </li>
                <li className='flex items-center mb-2 text-sm gap-2 border border-gray-300 p-2 rounded-md'>
                  <span className='text-4xl'>💡</span>
                  <span className='ml-2'>Make sure that you&#39;re in a well-lit environment</span>
                </li>
                <li className='flex items-center mb-2 text-sm gap-2 border border-gray-300 p-2 rounded-md'>
                  <span className='text-4xl'>💄</span>
                  <span className='ml-2'>Remove makeup to get more accurate results</span>
                </li>
                <li className='flex items-center mb-2 text-sm gap-2 border border-gray-300 p-2 rounded-md'>
                  <span className='text-4xl'>📷</span>
                  <span className='ml-2'>Look straight into the camera and keep your face in the circle</span>
                </li>
              </ul>
              <Button onClick={() => setIsScanning(true)} className='mt-4 w-full'>
                GET STARTED
              </Button>
            </div>
          )
        }
        <div className='flex flex-col items-center h-[600px] w-[500px] gap-2'>
          <div className='flex flex-col items-center'>
            <h2 className='text-2xl font-bold'>YOUR SKIN REPORT</h2>
            <h3 className='text-2xl font-semibold'>Skin Health Matrix</h3>
          </div>
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h4 className="font-semibold mb-4">Skin Health Matrix</h4>
              
              <RadarChart
                captions={captions}
                data={data}
                size={400}
                options={{
                  scales: 5, // Number of concentric circles
                  zoomDistance: 1.2,
                  axes: true, // Show axes                
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className='hidden'></canvas>
    </div>
  )
}