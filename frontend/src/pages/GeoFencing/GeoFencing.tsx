import React, { useState } from 'react'
import GeoFencingMap from '../../components/ui/GeoFencingMap'
import DangerZones from './DangerZones'
import { useDangerZoneFetchQuery } from '../../hooks/useDangerZone';
import { IPagination } from '../../types';
import { useUser } from '@clerk/clerk-react';

function GeoFencing() {
    const { user } = useUser();
    const [pagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        userId: user ? user!.id : ""
    })

    const { data } = useDangerZoneFetchQuery(pagination);
    return (
        <React.Fragment>
            <div className='w-11/12 mt-12 mx-auto'>
                <GeoFencingMap locations={data?.data?.data?.zones ? data?.data?.data?.zones : []} />
            </div>

            <div className='w-11/12 mx-auto'>
                <DangerZones zones={data?.data?.data?.zones ? data?.data?.data?.zones : []} />
            </div>
        </React.Fragment>
    )
}

export default GeoFencing