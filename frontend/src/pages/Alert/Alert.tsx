import React from 'react'
import EmergencyContacts from './EmergencyContact'
import Map from '../../components/ui/Map'

function Alert() {
    return (
        <React.Fragment>
            <EmergencyContacts />
            <div className='my-16 w-11/12 mx-auto'>
                <Map />
            </div>
        </React.Fragment>
    )
}

export default Alert