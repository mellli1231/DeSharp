import "./App.css";
import Form from "./components/Form.jsx";
import Admin from "./Admin.jsx";
import Home from "./Home.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/form" element={<Form />} />
              </Routes>
      </Router>
    </div>
  );
};

export default App;