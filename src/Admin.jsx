import "./App.css";
import PoiMarkers from "./components/PoiMarkers.jsx";
import Header from "./components/Header.jsx";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api.js";
import { APIProvider, Map, InfoWindow, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";


function Admin() {
  const locations = useQuery(api.tasks.get);
  const [open, setOpen] = useState(false);
  const [clickedPOI, setClickedPOI] = useState(null);


  // Access environment variables using import.meta.env
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const googleMapsId = import.meta.env.VITE_GOOGLE_MAPS_ID;

  const [viewState, setViewState] = useState({
    longitude: -123,
    latitude: 49,
    zoom: 13.5
  });

  const deleteEntry = useMutation(api.myFunctions.deleteTask);
  
 

  const handleRightClick = async (locationId, photo) => {
    try {
      await deleteEntry({ _id: locationId, photo});
      setOpen(false);
    }
    catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

    // Handler to update clicked POI data and open InfoWindow
    const handleMarkerClick = (poi) => {
      setClickedPOI(poi);  // Set the clicked marker's POI data
      setOpen(true);  // Open the InfoWindow
    };

  return (
    <>
      <Header />
      <section className="map-admin">
        <APIProvider apiKey={googleMapsApiKey}>
          <div className="map" style={{ height: "90vh", width: "60%" }}>
            <Map

              defaultCenter={{ lat: 49.242532, lng: -123.007856 }}
              defaultZoom={6}
              mapId={googleMapsId}
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              onZoomChanged={evt => setViewState(evt.viewState)}
            >
              <PoiMarkers 
              pois={locations}
              onMarkerClick={handleMarkerClick}
              />


              {open && clickedPOI && (
                <InfoWindow
                  position={{ lat: clickedPOI.latitude, lng: clickedPOI.longitude }}  // Use the clicked position
                  onCloseClick={() => setOpen(false)}  // Close the InfoWindow when clicked
                >
                  <div>
                    <img src={clickedPOI.photoURL} alt={`Submitted by ${clickedPOI.user_name}`} height="100px" width="auto" />
                    <p><strong>Submitted by:</strong> {clickedPOI.user_name}</p>
                    <p><strong>Comment:</strong> {clickedPOI.comment}</p>
                    <button onClick={() => handleRightClick(clickedPOI._id, clickedPOI.photo)}>Delete</button>
                    
                  </div>
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