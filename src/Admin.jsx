import "./App.css";
import PoiMarkers from "./components/PoiMarkers.jsx";
import Header from "./components/Header.jsx";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api.js";
import { APIProvider, Map, InfoWindow, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";

function Admin() {
  const [locations, setLocations] = useState(useQuery(api.tasks.get) || []);
  const position = { lat: 49.282756, lng: -123.120774 };
  const [open, setOpen] = useState(false);

  // Access environment variables using import.meta.env
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const googleMapsId = import.meta.env.VITE_GOOGLE_MAPS_ID;

  const [viewState, setViewState] = useState({
    longitude: -123,
    latitude: 49,
    zoom: 13.5
  });

  const deleteEntry = useMutation(api.myFunctions.deleteTask);
  const handleRightClick = async (location) => {
    try {
        await deleteEntry({ id: location._id });
    }
    catch (error) {
        console.error("Error deleting entry:", error);
    }
  };

  return (
    <>
      <Header />  
      <section className="map-container">
        <APIProvider apiKey={googleMapsApiKey}>
          <div style={{ height: "90vh", width: "60%" }}>
            <Map

              defaultCenter={position}
              defaultZoom={13}
              mapId={googleMapsId}
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              onZoomChanged={evt => setViewState(evt.viewState)}
            >
              {locations && locations.map((location) => (
                <Marker
                    key={location._id}
                    onRightClick={handleRightClick.bind(null, location._id)}
            />
            ))}
              <PoiMarkers pois={locations} />
              

              {open && (
                <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                  <p>Test</p>
                </InfoWindow>
              )}
            </Map>
              
          </div>
        </APIProvider>
      </section>
    </>
  );
};

export default Admin;