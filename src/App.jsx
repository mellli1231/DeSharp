"use client";
import "./App.css";
import Form from "./components/Form.jsx"
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps"
import { useState } from "react";
import {BrowserRouter as Router, Route, Routes, Link, Outlet} from "react-router-dom";

function App() {
  const tasks = useQuery(api.tasks.get);
  const position = {lat:49.256104,lng: -123.113550}
  const [open,setOpen] = useState(false);

  return (
<<<<<<< HEAD

    <div className="App">
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
=======
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
  );
}

export default App;
>>>>>>> 44a00aa00d73012c0ae5a9fc6df989bfcdc15f08
