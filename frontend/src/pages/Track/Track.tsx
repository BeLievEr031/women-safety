import { useUser } from '@clerk/clerk-react';
import PastAlerts from '../../components/ui/PastAlerts'
import { useFetchAlertQuery } from '../../hooks/useAlert'
import { useState } from 'react';
import { IPagination } from '../../types';
import PastIncidents from '../../components/ui/PastIncidents';
import { useFetchIncidentQuery } from '../../hooks/useReportIncident';

function Track() {
    const { user } = useUser();
    const [pagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        userId: user ? user!.id : ""
    })

    const { isPending, isError, error, data } = useFetchAlertQuery(pagination);
    const { data: IncidentData } = useFetchIncidentQuery(pagination);

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    console.log(data);

    return (
        <div>
            <PastAlerts alerts={data?.data?.data?.alerts || []} title='Alert' />
            <PastIncidents incidents={IncidentData?.data?.data?.incidents || []} title='Reported Incident' />
        </div>
    )
}

export default Track