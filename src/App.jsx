"use client";
import "./App.css";
import Form from "./components/Form.jsx"
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";

function App() {
  const tasks = useQuery(api.tasks.get);
  const position = { lat: 49.256104, lng: -123.11355 };
  const [open, setOpen] = useState(false);

  // Access environment variables using import.meta.env
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const googleMapsId = import.meta.env.VITE_GOOGLE_MAPS_ID;

  return (

    <div className="App">
      <header>
        <h1>DeSharp</h1>
        <h3>
          Report any needles you've spotted in Vancouver and We'll send our folks to clean them
          up!
        </h3>
      </header>

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

        {/* Update the link to use React Router or appropriate navigation */}
      </APIProvider>

      {/* Add loading and error states for better UX */}
      {tasks ? (
        tasks.map(({ _id, text }) => <div key={_id}>{text}</div>)
      ) : (
        <div>Loading tasks...</div>
      )}
    </div>
  );
}

export default App;
