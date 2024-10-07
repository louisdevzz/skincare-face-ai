
import React from "react"
import NavBar from "@/components/NavBar"
import FaceScanAnalysis from "@/components/FaceScanAnalysis"

const CameraPage = () => {
    return (
        <React.Fragment>
            <NavBar/>
            <div className="mx-auto px-6 py-3 flex justify-center items-center w-full h-screen">
                <FaceScanAnalysis/>
            </div>
        </React.Fragment>
    )
}

export default CameraPage