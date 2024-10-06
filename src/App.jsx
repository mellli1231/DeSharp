"use client";
import "./App.css";
import Form from "./components/Form.jsx"
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps"
import { useState } from "react";

function App() {
  const tasks = useQuery(api.tasks.get);
  const position = {lat:49.256104,lng: -123.113550}
  const [open,setOpen] = useState(false);

<<<<<<< HEAD
  // Access environment variables using import.meta.env
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const googleMapsId = import.meta.env.VITE_GOOGLE_MAPS_ID;

  const addReport = useMutation(api.mutate.createTask); // add to database
  
  return (

    <div className="App">
      <header>
        <h1>DeSharp</h1>
        <h3>
          Report any needles you've spotted in Vancouver and we'll send our folks to clean them
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
=======
  return (
    <Form />
    // <div className="App">
    //   <body>
    //     <header>
    //       <h1>DeSharp</h1>
    //       <h3>Report any needles you've spotted in Vancouver and We'll send our folks to clean them up!</h3>
    //     </header>
        
    //     {/*
    //     <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
    //       <div style={{height: "100vh", width:"100%"}}>
    //         <Map 
    //           zoom={9} 
    //           center={position} 
    //           mapId={process.env.GOOGLE_MAPS_ID}
    //         >
    //         <AdvancedMarker position=[position] onClick={() => setOpen(true)}>
    //           <Pin/>
    //         </AdvancedMarker>
    //         {open && (
    //           <InfoWindow position={position} onCloseCLick={() => setOpen(false)}>
    //             <p>Test</p>
    //           </InfoWindow>
    //         )}
    //         </Map>
    //       </div>
           
    //       <a href="form.jsx">Report a sighting</a>
    //     </APIProvider>
    //     */}
    //     {tasks?.map(({ _id, text }) => (
    //       <div key={_id}>{text}</div>
    //     ))}
    //   </body>
    // </div>
>>>>>>> 63fd3b400bf0303ad1c148ec2403059e3f54c1e7
  );
}

export default App;
