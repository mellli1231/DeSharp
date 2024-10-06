import "./App.css";
import PoiMarkers from "./components/PoiMarkers.jsx";
import Header from "./components/Header.jsx";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";

function Home() {
  const locations = useQuery(api.tasks.get); // Fetching POIs from the API
  const [open, setOpen] = useState(false);  // Controls whether the InfoWindow is open
  const [clickedPOI, setClickedPOI] = useState(null); // Stores clicked POI's data

  // Access environment variables using import.meta.env
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const googleMapsId = import.meta.env.VITE_GOOGLE_MAPS_ID;

  const [viewState, setViewState] = useState({
    longitude: -123,
    latitude: 49,
    zoom: 11
  });

  // Handler to update clicked POI data and open InfoWindow
  const handleMarkerClick = (poi) => {
    setClickedPOI(poi);  // Set the clicked marker's POI data
    setOpen(true);  // Open the InfoWindow
  };

  return (
    <>
      <Header />

      <section className="map-container">
        <APIProvider apiKey={googleMapsApiKey}>
          <div className="map">
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
                onMarkerClick={handleMarkerClick}  // Pass the handler function to PoiMarkers
              />

              {/* InfoWindow that opens when a marker is clicked */}
              {open && clickedPOI && (
                <InfoWindow
                  position={{ lat: clickedPOI.latitude, lng: clickedPOI.longitude }}  // Use the clicked position
                  onCloseClick={() => setOpen(false)}  // Close the InfoWindow when clicked
                >
                  <div>
                    <p><strong>ID:</strong> {clickedPOI._id}</p>
                    <p><strong>Submitted by:</strong> {clickedPOI.user_name}</p>
                    <p><strong>Comment:</strong> {clickedPOI.comment}</p>
                    {clickedPOI.imageInput && (
                      <img 
                        src={clickedPOI.imageInput} 
                        alt={`Submitted by ${clickedPOI.user_name}`} 
                        style={{ width: "100px", height: "100px" }} 
                      />
                    )}
                  </div>
                </InfoWindow>
              )}
            </Map>
          </div>
        </APIProvider>
      </section>

    <section>
        <h3>
          Find another needle not on this map?{" "}
        </h3>
      <h3 className="form">Help us DeSharp the city!</h3>
      <Form></Form>
    </section>
    </>
  );
}

export default Home;
