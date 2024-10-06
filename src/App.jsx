import "./App.css";
import Form from "./components/Form.jsx"
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const tasks = useQuery(api.tasks.get);
  return (
    <>
      <Form />
    </>
  );
}

export default App;
