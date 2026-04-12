import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import PhysicsVideo from "./PhysicsVideo";
import LightVideo from "./LightVideo";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/physics" element={<PhysicsVideo />} />
      <Route path="/light" element={<LightVideo />} />
    </Routes>
  );
}