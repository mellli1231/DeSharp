import "./form.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function Form() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="Form">
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
