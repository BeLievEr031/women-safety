import { useUser } from "@clerk/clerk-react"
import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

function RootLayout() {
    const { isSignedIn, isLoaded } = useUser()
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate("/auth", { replace: true });
        }
    }, [isLoaded, isSignedIn, navigate]);

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}

export default RootLayout