import { useUser } from "@clerk/clerk-react"
import React from "react"
import { Outlet } from "react-router-dom"

function RootLayout() {
    const { isLoaded } = useUser()
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (isLoaded && !isSignedIn) {
    //         navigate("/auth", { replace: true });
    //     }
    // }, [isLoaded, isSignedIn, navigate]);

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