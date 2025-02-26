import { useUser } from "@clerk/clerk-react"
import React, { useEffect, useMemo, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/ui/Navbar";
import ReportIncidentForm from "../components/ui/ReportIncidentForm";
import { IReportIncident } from "../types";
import { useCreateIncidentMutation } from "../hooks/useReportIncident";

function SecureLayout() {
    const { isSignedIn, isLoaded } = useUser()
    const navigate = useNavigate();
    const { mutate } = useCreateIncidentMutation(handleonClose);
    const [isReport, setReport] = useState(false);
    const memoizeOutlet = useMemo(() => <Outlet />, [])
    useEffect(() => {
        if (!isSignedIn) {
            navigate("/auth")
        }
    }, [isLoaded, isSignedIn])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    function handleonClose(data: boolean) {
        setReport(data)
    }

    const handleReportIncident = (data: IReportIncident) => {
        mutate(data)
    }

    return (
        <React.Fragment>
            <Navbar setReport={setReport} />
            {memoizeOutlet}
            {isReport && <ReportIncidentForm onReportIncident={handleReportIncident} onClose={() => { setReport(false) }} />}
        </React.Fragment>
    )
}

export default SecureLayout