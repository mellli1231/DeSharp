import "./App.css";
import Form from "./components/Form.jsx";
import PoiMarkers from "./components/PoiMarkers.jsx";
import Header from "./components/Header.jsx";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link, Outlet} from "react-router-dom";

function App() {
  const locations = useQuery(api.tasks.get);
  const position = { lat: 49.282756, lng: -123.120774 };
  const [open, setOpen] = useState(false);

  // Access environment variables using import.meta.env
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const googleMapsId = import.meta.env.VITE_GOOGLE_MAPS_ID;

  const [viewState, setViewState] = useState({
    longitude: -123,
    latitude: 49,
    zoom: 11
  });

  return (
    <>
      <Header />  

      <section className="form-link">
       
        <h3>
          Report any needles you've spotted in Vancouver and we'll send our folks to clean them
          up!
        </h3>
        <h3>
          Find another needle not on this map?{" "}
        </h3>
      </section>

      <section className="map-container">
        <APIProvider apiKey={googleMapsApiKey}>
          <div className="map">
            <Map 
              defaultCenter={{lat:49.242532, lng:-123.007856}}
              defaultZoom={6}
              mapId={googleMapsId}
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              onZoomChanged={evt => setViewState(evt.viewState)}
            >
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
     
        <div className="form">                
          <h3>Help us DeSharp the city!</h3>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/form" element={<Form />} />
              </Route>
            </Routes>
          </Router>
        </div>
    </>
  );
};

function Layout() {
  return (
    <div className="form_link">
      <nav>
        <Link to="/form">Add a Pin</Link>
      </nav>
      <Outlet />
    </div>
  );
}
export default App;