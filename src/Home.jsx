import "./App.css";
import PoiMarkers from "./components/PoiMarkers.jsx";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import vancouver from "./assets/sunset.webp"
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
            <section className="form-link">
                <div className="intro">
                  <div className="introText">
                    <p>Over recent years, Vancouver has experienced a sharp increase in substance abuse,
                        leading to a drug epidemic. Many have found the streets unsafe due to the presence of needles.
                        We have partnered with some company to help clean the streets. There is no one better to help locate these
                        needles than those that walk on the streets. With your help, we wll be able to restore a clean and safe
                        environment for our city
                    </p>
                  </div>
                </div>

                <h3>
                    Report any needles you've spotted in Vancouver and we'll send our folks to clean them
                    up!
                </h3>

            </section>


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
                                        <img
                                            src={clickedPOI.photoURL}
                                            alt={`Submitted by ${clickedPOI.user_name}`}
                                            height="100px"
                                            width="auto"
                                        />
                                        <p><strong>Submitted by:</strong> {clickedPOI.user_name}</p>
                                        <p><strong>Comment:</strong> {clickedPOI.comment}</p>

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
