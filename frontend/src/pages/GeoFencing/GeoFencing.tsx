import React from 'react'
import GeoFencingMap from '../../components/ui/GeoFencingMap'
import DangerZones from './DangerZones'

function GeoFencing() {
    return (
        <React.Fragment>
            <div className='w-11/12 mt-12 mx-auto'>
                <GeoFencingMap />
            </div>

            <div className='w-11/12 mx-auto'>
                <DangerZones />
            </div>
        </React.Fragment>
    )
}

export default GeoFencing