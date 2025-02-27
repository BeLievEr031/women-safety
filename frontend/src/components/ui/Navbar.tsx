import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Button";
import { TbMessageCircleFilled } from "react-icons/tb";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-react";


interface INavbar {
    setReport?: React.Dispatch<React.SetStateAction<boolean>>
}

function Navbar({ setReport }: INavbar) {
    const { isSignedIn } = useUser();
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/", { replace: true })
        signOut();
    }
    return (
        <nav className="sticky top-0 z-[999] flex items-center justify-between px-6 py-3 border-b border-gray-200 shadow-sm bg-white">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-2">
                <TbMessageCircleFilled className="h-6 w-6 text-purple-500" />
                <h1 className="text-lg font-semibold text-gray-900">SafeGuard</h1>
            </div>

            {/* Center - Navigation Links */}
            <div className="flex space-x-6">
                <NavLink to="/" className={({ isActive }) =>
                    `text-sm font-bold ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`
                }>
                    Home
                </NavLink>
                <NavLink to="/safety/alert" className={({ isActive }) =>
                    `text-sm font-bold ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`
                }>
                    Emergency Alerts
                </NavLink>
                <NavLink to="/safety/geo-fencing" className={({ isActive }) =>
                    `text-sm font-bold ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`
                }>
                    Geo Fencing
                </NavLink>
                <NavLink to="/safety/history" className={({ isActive }) =>
                    `text-sm font-bold ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`
                }>
                    History
                </NavLink>
            </div>

            {/* Right Side - Button */}
            <div className="flex gap-2">
                <Button onClick={() => setReport!(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <span className="mr-2">📢</span> Report Incident
                </Button>
                {isSignedIn && <Button onClick={handleLogout} variant="danger" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    Logout
                </Button>}
            </div>
        </nav>
    );
}

export default Navbar;
