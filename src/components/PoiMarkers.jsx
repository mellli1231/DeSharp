import React from 'react';
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const PoiMarkers = ({ pois, onMarkerClick }) => {
  if (!pois || pois.length === 0) {
    return null;
  }

  return (
    <>
      {pois.map(({ _id, latitude, longitude, user_name, photo, photoURL, comment }) => {
        const position = { lat: latitude, lng: longitude };

        return (
          <AdvancedMarker
            key={_id}
            position={position}
            onClick={() => onMarkerClick({ _id, latitude, longitude, user_name, photo, photoURL, comment})}  // Pass the entire POI data
          />
        );
      })}
    </>
  );
};

export default PoiMarkers;
