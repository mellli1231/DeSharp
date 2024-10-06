import "./form.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function Form() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="Form">
      <body>
        <h1>Help us DeSharp the city!</h1>
        <div className="map">
        <gmp-map center="-33.9,151.2" zoom="10" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="-33.890542, 151.274856" title="Bondi Beach">
        <img class="flag-icon"
             src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"/>
      </gmp-advanced-marker>
      <gmp-advanced-marker position="-33.923036, 151.259052" title="Coogee Beach">
        <img class="flag-icon"
             src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"/>
      </gmp-advanced-marker>
      <gmp-advanced-marker position="-34.028249, 151.157507" title="Cronulla Beach">
        <img class="flag-icon"
             src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"/>
      </gmp-advanced-marker>
      <gmp-advanced-marker position="-33.800101, 151.287478" title="Manly Beach">
        <img class="flag-icon"
             src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"/>
      </gmp-advanced-marker>
      <gmp-advanced-marker position="-33.950198, 151.259302" title="Maroubra Beach">
        <img class="flag-icon"
             src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"/>
      </gmp-advanced-marker>
    </gmp-map>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=INSERT_YOUR_API_KEY&loading=async&libraries=marker&v=beta&solution_channel=GMP_CCS_complexmarkers_v3"
      defer
    ></script>
        </div>
        <div className="locationChoice">
            <h2>Location</h2>
            <div className="options">
                <h3>Use My Location</h3>
                <h3>Manual Input</h3>
            </div>
            
        </div>
        {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))}
      </body>
    </div>
  );
}

export default App;
