import { SignIn } from "@clerk/clerk-react"

export const Auth = () => {
    return (
        <div className="h-[100vh] flex justify-center items-center">
            <SignIn />
        </div>
    )
}
