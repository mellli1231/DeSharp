"use client";
import "./App.css";
import Form from "./components/Form.jsx"
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";
import {BrowserRouter as Router, Route, Routes, Link, Outlet} from "react-router-dom";


function App() {
  const tasks = useQuery(api.tasks.get);
  const position = { lat: 49.282756, lng: -123.120774};
  const position2 = { lat: 49.282142, lng: -123.121016 };
  const [open, setOpen] = useState(false);

  // Access environment variables using import.meta.env
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const googleMapsId = import.meta.env.VITE_GOOGLE_MAPS_ID;

  const addReport = useMutation(api.mutate.createTask);

  const [viewState, setViewState] = useState({
    longitude: -123,
    latitude: 49,
    zoom: 13.5
  });
  

  return (

    <div className="App">
      <Form></Form>
      <header>
        <h1>DeSharp</h1>

        <h3>
          Report any needles you've spotted in Vancouver and We'll send our folks to clean them
          up!
        </h3>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/form" element={<Form />} />
          </Route>
        </Routes>
      </Router>
      
      <APIProvider apiKey={googleMapsApiKey}>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map zoom={9} center={position} mapId={googleMapsId}>
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
              <Pin />
            </AdvancedMarker>
            {open && (
              <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                <p>Test</p>
              </InfoWindow>
            )}
          </Map>
        </div>

      <section className="form-link">
        <h2>
          Find another needle not on this map?{" "}
          
        </h2>
      </section>

      <section className="map-container">
        <APIProvider apiKey={googleMapsApiKey}>
          <div style={{height: "90vh", width: "60%" }}>
            <Map
              defaultCenter={position}
              defaultZoom={13}
              mapId={googleMapsId}
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              onZoomChanged={evt => setViewState(evt.viewState)}
              >
              <AdvancedMarker position={position} onClick={() => setOpen(true)}>
              </AdvancedMarker>
              
              <AdvancedMarker position={position2} onClick={() => setOpen(true)}>
              </AdvancedMarker>

              {open && (
                <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                  <p>Test</p>
                </InfoWindow>
              )}
            </Map>
          </div>
        </APIProvider>
      </section>


      {/* Add loading and error states for better UX */}
      {tasks ? (
        tasks.map(({ _id, text }) => <div key={_id}>{text}</div>)
      ) : (
        <div>Loading tasks...</div>
      )}
    </div>

  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/form">Add a Pin</Link>
          </li>
          
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
export default App;
