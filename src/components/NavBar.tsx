import Link from "next/link"

const NavBar = () => {
    return(
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
    )
}
export default NavBar