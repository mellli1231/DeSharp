import "./App.css";
import Form from "./components/Form.jsx"
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";


function App() {
  const tasks = useQuery(api.tasks.get);
  const addReport = useMutation(api.mutate.createTask);
  
  return (

    <div className="App">
      <body>
        <h1>DeSharp</h1>
        <section><h3>Report any needles you've spotted in Vancouver and We'll send our folks to clean them up!</h3></section>
        {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))}
      </body>
    </div>
  );
}

export default App;