import React from 'react';
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const PoiMarkers = (props) => {
    if (!props.pois || props.pois.length === 0) {
        return null;
    }
    return (
        <>
            {props.pois.map(({ _id, latitude, longitude }) => {
                const position = { lat: latitude, lng: longitude };
                return (
                    <AdvancedMarker
                        key={_id}
                        position={position}>
                    </AdvancedMarker>
                );
            })}
        </>
    );
};

export default PoiMarkers;
