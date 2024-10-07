import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white bg-opacity-80 fixed w-full z-10">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link href="/" className="text-3xl font-bold text-gray-800">
                    glowy<sup className="text-sm">AI</sup>
                </Link>
                {/* <div className="hidden md:flex space-x-4">
                    <Link href="#" className="text-gray-600 hover:text-gray-900">Treatments</Link>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">Articles</Link>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">About us</Link>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">For Clinicians</Link>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">glowy AI app</Link>
                </div> */}
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                    Get Started
                </button>
                </nav>
            </header>

        <main className="flex-grow">
            <div className="relative h-screen">
            <video
                src="https://www.glowy.ai/wp-content/uploads/glowy-hero720.mp4"
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Your personalised path<br />to <span className="italic">smooth</span> skin
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                Treatment plans, tailored to your unique skincare needs and concerns.
                </p>
                <p className="text-lg md:text-xl mb-8 italic">
                Visible results in 8-12 weeks
                </p>
                <Link href="/camera" className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">
                Get started now
                </Link>
            </div>
            </div>
        </main>

        <footer className="bg-gray-100 py-4">
            <div className="container mx-auto px-6 text-center text-gray-600">
            © 2023 glowy AI. All rights reserved.
            </div>
        </footer>
        </div>
    )
}