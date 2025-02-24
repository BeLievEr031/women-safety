import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layouts/RootLayout";
import { Auth } from "../pages/Auth/Auth";
import Home from "../pages/Home/Home";
import SecureLayout from "../layouts/SecureLayout";
import Alert from "../pages/Alert/Alert";
import Track from "../pages/Track/Track";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <Home />
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
                        path: "track",
                        element: <Track />
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