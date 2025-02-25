import { useUser } from "@clerk/clerk-react"
import React, { useEffect, useMemo, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/ui/Navbar";
import ReportIncidentForm from "../components/ui/ReportIncidentForm";

function SecureLayout() {
    const { isSignedIn, isLoaded } = useUser()
    const navigate = useNavigate();
    const [isReport, setReport] = useState(false);
    const memoizeOutlet = useMemo(() => <Outlet />, [])
    useEffect(() => {
        if (!isSignedIn) {
            navigate("/auth")
        }
    }, [isLoaded])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <React.Fragment>
            <Navbar setReport={setReport} />
            {memoizeOutlet}
            {isReport && <ReportIncidentForm onReportIncident={() => { }} onClose={() => { setReport(false) }} />}
        </React.Fragment>
    )
}

export default SecureLayout