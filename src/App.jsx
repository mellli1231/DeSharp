import "./App.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="App">
      {tasks?.map(({ _id, lattitude, longitude, photo, user_name}) => (
        <div key={_id}>
          <p>{lattitude}</p>
          <p>{longitude}</p>
          <p>{photo}</p>
          <p>{user_name}</p>
          </div>
      ))}
    </div>
  );
}

export default App;
