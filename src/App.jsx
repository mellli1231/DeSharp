"use client";
import "./App.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps"

function App() {
  const tasks = useQuery(api.tasks.get);
  const position = {lat:49.256104,lng: -123.113550}
  return (
    <div className="App">
      <body>
        <header>
          <h1>DeSharp</h1>
          <h3>Report any needles you've spotted in Vancouver and We'll send our folks to clean them up!</h3>
        </header>
        
        {/*
        <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
          <div style={{height: "100vh", width:"100%"}}>
            <Map 
              zoom={9} 
              center={position} 
              mapId={process.env.GOOGLE_MAPS_ID}>
            </Map>
          </div>
          <a href="form.jsx">Report a sighting</a>
        </APIProvider>
        */}
        {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))}
      </body>
    </div>
  );
}

export default App;
