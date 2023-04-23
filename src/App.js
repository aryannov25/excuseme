import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./Product";
import Inspiration from "./Inspiration";
import Spin from "./Spin";
import Horror from "./Horror";

function App() {
  return (
    <div className="text-center app">
      <Router>
        <Routes>
          <Route path="/" exact element={<Product />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/spin" element={<Spin />} />
          <Route path="/horror" element={<Horror />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
