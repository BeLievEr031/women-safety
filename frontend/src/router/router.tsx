import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layouts/RootLayout";
import { Auth } from "../pages/Auth/Auth";
import Home from "../pages/Home/Home";
import SecureLayout from "../layouts/SecureLayout";
import Alert from "../pages/Alert/Alert";
import Track from "../pages/Track/Track";
import GeoFencing from "../pages/GeoFencing/GeoFencing";
import TrackUser from "../pages/TrackUser/TrackUser";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "track-user",
                element: <TrackUser />
            },
            {
                path: "/safety",
                element: <SecureLayout />,
                children: [
                    {
                        path: "alert",
                        element: <Alert />
                    },
                    {
                        path: "history",
                        element: <Track />
                    },
                    {
                        path: "geo-fencing",
                        element: <GeoFencing />
                    },
                ]
            },
            {
                path: "auth",
                element: <Auth />
            }
        ]

    },
    {
        path: "*",
        element: <div>Not Found</div>
    }
])

export default router;