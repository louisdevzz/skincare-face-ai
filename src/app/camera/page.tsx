import { CameraCaptureComponent } from "@/components/Camera"
import React from "react"
import NavBar from "@/components/NavBar"

const CameraPage = () => {
    return (
        <React.Fragment>
            <NavBar/>
            <div className="mx-auto px-6 py-3 flex justify-center items-center w-full h-screen">
                <CameraCaptureComponent/>
            </div>
        </React.Fragment>
    )
}

export default CameraPage